<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg m-4">
      <h2 class="text-2xl font-bold mb-4">Nuevo Préstamo</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="cedula" class="block text-sm font-medium text-gray-700">Cédula</label>
            <input v-model="form.clienteCedula" type="text" id="cedula" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
          </div>
          <div>
            <label for="capital" class="block text-sm font-medium text-gray-700">Capital (Gs.)</label>
            <input v-model="form.capital" type="number" id="capital" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label for="frecuenciaPago" class="block text-sm font-medium text-gray-700">Frecuencia de Pago</label>
            <select v-model="form.frecuenciaPago" id="frecuenciaPago" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm">
              <option value="D">Diario</option>
              <option value="S">Semanal</option>
              <option value="Q">Quincenal</option>
              <option value="M">Mensual</option>
            </select>
          </div>
          <div>
            <label for="cantidadCuotas" class="block text-sm font-medium text-gray-700">Cantidad de Cuotas</label>
            <input v-model="form.cantidadCuotas" type="number" id="cantidadCuotas" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
          </div>
          <div>
            <label for="montoCuota" class="block text-sm font-medium text-gray-700">Monto de Cuota (Gs.)</label>
            <input v-model="form.montoCuota" type="number" id="montoCuota" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="fechaDesembolso" class="block text-sm font-medium text-gray-700">Fecha de Desembolso</label>
            <input v-model="form.fechaDesembolso" type="date" id="fechaDesembolso" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
          </div>
          <div>
            <label for="fechaPrimerPago" class="block text-sm font-medium text-gray-700">Fecha de Primer Pago</label>
            <input v-model="form.fechaPrimerPago" type="date" id="fechaPrimerPago" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
          </div>
        </div>
        <div class="flex justify-end space-x-4 pt-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Grabar Préstamo</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'loan-saved']);

const form = ref({
  clienteCedula: '',
  capital: 0,
  frecuenciaPago: 'D',
  cantidadCuotas: 0,
  montoCuota: 0,
  fechaDesembolso: '',
  fechaPrimerPago: '',
  estado: 'ACTIVO',
});

async function submitForm() {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:3000/api/prestamos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(form.value),
    });

    if (response.ok) {
      emit('loan-saved');
      emit('close');
    } else {
      console.error('Error saving loan:', await response.text());
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}
</script>
