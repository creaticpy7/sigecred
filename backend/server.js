const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;
const DB_FILE = './db.json';
const SECRET_KEY = process.env.JWT_SECRET || 'your_default_secret_key'; // Use environment variable

app.use(cors());
app.use(bodyParser.json());

// Helper function to read the database
const readDB = () => {
  const data = fs.readFileSync(DB_FILE);
  return JSON.parse(data);
};

// Helper function to write to the database
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// --- Auth API ---

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const db = readDB();
    if (db.users.find(u => u.username === username)) {
        return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), username, password: hashedPassword };
    db.users.push(newUser);
    writeDB(db);

    res.status(201).send('User registered successfully');
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const db = readDB();
    const user = db.users.find(u => u.username === username);

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
    return next();
};


// --- Clientes API ---

// GET all clientes
app.get('/api/clientes', verifyToken, (req, res) => {
  const db = readDB();
  res.json(db.clientes);
});

// GET cliente by cedula
app.get('/api/clientes/:cedula', verifyToken, (req, res) => {
  const db = readDB();
  const cliente = db.clientes.find(c => c.cedula === req.params.cedula);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).send('Cliente not found');
  }
});

// POST new cliente
app.post('/api/clientes', verifyToken, (req, res) => {
  const db = readDB();
  const newCliente = { id: Date.now(), ...req.body };
  db.clientes.push(newCliente);
  writeDB(db);
  res.status(201).json(newCliente);
});

// --- Prestamos API ---

// GET all prestamos
app.get('/api/prestamos', verifyToken, (req, res) => {
  const db = readDB();
  res.json(db.prestamos);
});

// GET prestamos by clienteCedula
app.get('/api/prestamos/cliente/:cedula', verifyToken, (req, res) => {
    const db = readDB();
    const prestamos = db.prestamos.filter(p => p.clienteCedula === req.params.cedula);
    res.json(prestamos);
});

// POST new prestamo
app.post('/api/prestamos', verifyToken, (req, res) => {
  const db = readDB();
  const prestamoData = req.body;
  const newPrestamo = { id: Date.now(), ...prestamoData };
  db.prestamos.push(newPrestamo);

  // Generate and save cuotas
  const { fechaPrimerPago, cantidadCuotas, frecuenciaPago, montoCuota } = prestamoData;
  let fechaActual = new Date(fechaPrimerPago + 'T00:00:00');

  for (let i = 1; i <= cantidadCuotas; i++) {
    const cuota = {
      id: Date.now() + i,
      prestamoId: newPrestamo.id,
      numeroCuota: i,
      montoCuota: montoCuota,
      fechaVencimiento: fechaActual.toISOString().split('T')[0],
      estado: 'PENDIENTE',
      fechaPago: null,
      montoPagado: null,
      saldo: montoCuota,
    };
    db.cuotas.push(cuota);

    switch (frecuenciaPago) {
      case 'D':
        fechaActual.setDate(fechaActual.getDate() + 1);
        break;
      case 'S':
        fechaActual.setDate(fechaActual.getDate() + 7);
        break;
      case 'Q':
        fechaActual.setDate(fechaActual.getDate() + 15);
        break;
      case 'M':
        fechaActual.setMonth(fechaActual.getMonth() + 1);
        break;
    }
  }

  writeDB(db);
  res.status(201).json(newPrestamo);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
