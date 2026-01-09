<template>
  <div>
    <!-- Navbar -->
    <nav class="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <h1 class="text-xl font-bold">SIGECRED - Sistema de Gestión Crediticia</h1>
      <div class="relative">
        <button @click="toggleMenu" class="text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
        <div v-if="isMenuOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <a href="#" @click.prevent="showLoanModal = true; isMenuOpen = false" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Nuevo Préstamo</a>
          <a href="#" @click.prevent="showClientModal = true; isMenuOpen = false" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Nuevo Cliente</a>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="p-4">
      <div class="w-full max-w-4xl mx-auto">
        <h2 class="text-2xl font-bold mb-4">Préstamos Activos</h2>
        <div class="bg-white shadow-md rounded-lg p-4">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula Cliente</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capital</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuotas</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="prestamo in prestamos" :key="prestamo.id">
                <td class="px-6 py-4 whitespace-nowrap">{{ prestamo.clienteCedula }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ prestamo.capital }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ prestamo.cantidadCuotas }}</td>
                <td class="px-6 py-4 whitespace-nowrap">{{ prestamo.estado }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
    
    <NewClientModal v-if="showClientModal" @close="showClientModal = false" @client-saved="fetchPrestamos" />
    <NewLoanModal v-if="showLoanModal" @close="showLoanModal = false" @loan-saved="fetchPrestamos" />

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import NewClientModal from '../components/NewClientModal.vue';
import NewLoanModal from '../components/NewLoanModal.vue';

const isMenuOpen = ref(false);
const showClientModal = ref(false);
const showLoanModal = ref(false);
const prestamos = ref([]);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

async function fetchPrestamos() {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:3000/api/prestamos', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (response.ok) {
      prestamos.value = await response.json();
    }
  } catch (error) {
    console.error('Error fetching prestamos:', error);
  }
}

onMounted(fetchPrestamos);
</script>
