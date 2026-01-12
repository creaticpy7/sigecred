# Manual de Usuario de SIGECRED

## Introducción General

SIGECRED (Sistema de Gestión Crediticia) es una aplicación web diseñada para simplificar la administración de préstamos y clientes. Permite llevar un registro detallado de los préstamos otorgados, gestionar la información de los clientes y hacer un seguimiento de los planes de pago. La aplicación funciona de manera local en su navegador, lo que significa que todos sus datos se guardan de forma segura en su propio equipo, garantizando privacidad y acceso incluso sin conexión a internet.

A continuación, se detalla la operativa de cada una de las funciones principales del sistema.

---

## Operativa del Sistema

### Nuevo Préstamo

Esta función permite registrar un nuevo préstamo otorgado a un cliente. Puede acceder a ella desde el menú principal o el dashboard.

**Funcionalidades del formulario:**

1.  **Cédula:** Ingrese el número de cédula del cliente.
    *   **Si el cliente ya existe:** Al salir del campo de cédula, el sistema buscará automáticamente al cliente en sus registros y rellenará los campos "Nombres" y "Apellidos". Puede modificar estos campos si necesita actualizar la información del cliente. Al guardar el préstamo, los datos del cliente se actualizarán.
    *   **Si el cliente NO existe:** Puede rellenar los campos "Nombres" y "Apellidos" manualmente. Al guardar el préstamo, el sistema creará automáticamente un nuevo registro para este cliente y mostrará el mensaje "NUEVO CLIENTE REGISTRADO".

2.  **Nombres y Apellidos:** Campos para el nombre del cliente. Son autocompletados si el cliente existe, pero siempre pueden ser editados.

3.  **Capital, Cuotas y Montos:** Defina los detalles financieros del préstamo, como el capital otorgado, la frecuencia de los pagos (diario, semanal, etc.), la cantidad de cuotas y el monto de cada una.

4.  **Fechas:** Especifique la "Fecha de Desembolso" (cuándo se entregó el dinero) y la "Fecha de Primer Pago".

Al grabar el préstamo, el sistema generará automáticamente el plan de pagos completo.

### Ver Préstamos

Esta pantalla muestra una lista de todos los préstamos registrados.

**Funcionalidades de la pantalla:**

1.  **Información del Préstamo:** Cada registro muestra el nombre del cliente, capital, saldo pendiente, fecha de desembolso, frecuencia de pago y el estado actual del préstamo (ACTIVO o CANCELADO).

2.  **Búsqueda y Ordenamiento:**
    *   Puede **buscar** préstamos específicos ingresando la cédula o el nombre del cliente en los campos de búsqueda.
    *   Puede **ordenar** la lista por "Nombre y Apellido" o "Frecuencia de Pago" en orden "Ascendente" o "Descendente" usando los campos de selección.

**Botones de Acción:**

*   **Cobrar:** Abre la pantalla de "Plan de Pago", donde puede registrar los pagos de las cuotas.
*   **VER:** Abre un formulario con los detalles del préstamo. En esta vista, el único campo que puede modificar es el **ESTADO** (por ejemplo, para cambiar un préstamo a "CANCELADO"). El resto de los campos son de solo lectura.
*   **Eliminar:** Permite eliminar un préstamo. Esta acción solo es posible si el préstamo **no tiene ningún pago registrado**. Si intenta eliminar un préstamo con pagos, el sistema mostrará la alerta: `ERROR, PRÉSTAMO CON PAGOS VIGENTES.`

### Nuevo Cliente

Permite registrar a un nuevo cliente de forma independiente, sin necesidad de crear un préstamo. Es útil para tener una base de datos de clientes potenciales. El formulario le pedirá que complete información como cédula, nombres, apellidos, dirección y datos de contacto.

### Ver Clientes

Esta pantalla muestra una lista de todos sus clientes registrados.

**Botones de Acción:**

*   **VER:** Abre un formulario con los datos completos del cliente. En esta vista, los campos "Cédula", "Nombres" y "Apellidos" no se pueden modificar. Sin embargo, puede actualizar el resto de la información, como la dirección o los números de teléfono.
*   **ELIMINAR:** Permite eliminar a un cliente. Esta acción solo es posible si el cliente **no tiene ningún préstamo con estado "ACTIVO"**. Si intenta eliminar un cliente con préstamos activos, el sistema mostrará la alerta: `ERROR, CLIENTE CON PRESTAMOS ACTIVOS.` Al confirmar la eliminación, se borrará el cliente y todos sus préstamos asociados.
*   **PRESTAMOS:** Le redirige a la pantalla "Ver Préstamos", pero filtrando la lista para mostrar únicamente los préstamos que pertenecen a ese cliente. Si el cliente no tiene préstamos, el sistema le avisará con la alerta: `CLIENTE SIN PRESTAMOS`.
