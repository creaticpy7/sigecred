<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg m-4">
      <h2 class="text-2xl font-bold mb-4">Nuevo Cliente</h2>
      <form @submit.prevent="submitForm" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="cedula" class="block text-sm font-medium text-gray-700">Cédula</label>
            <input v-model="form.cedula" type="text" id="cedula" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
          </div>
          <div>
            <label for="nombres" class="block text-sm font-medium text-gray-700">Nombres</label>
            <input v-model="form.nombres" type="text" id="nombres" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
          </div>
        </div>
        <div>
          <label for="apellidos" class="block text-sm font-medium text-gray-700">Apellidos</label>
          <input v-model="form.apellidos" type="text" id="apellidos" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" required>
        </div>
        <div class="flex justify-end space-x-4 pt-4">
          <button type="button" @click="$emit('close')" class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">Cancelar</button>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Grabar Cliente</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['close', 'client-saved']);

const form = ref({
  cedula: '',
  nombres: '',
  apellidos: '',
});

async function submitForm() {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('http://localhost:3000/api/clientes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ ...form.value, nombreApellido: `${form.value.nombres} ${form.value.apellidos}` }),
    });

    if (response.ok) {
      emit('client-saved');
      emit('close');
    } else {
      console.error('Error saving client:', await response.text());
    }
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}
</script>
