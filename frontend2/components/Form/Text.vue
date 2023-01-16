<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :id="id"
    :placeholder="placeholder"
    class="w-full text-gray-700 border border-gray-200 py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500 disabled:opacity-50"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
  },
  id: {
    type: String,
  },
  placeholder: {
    type: String,
  },
});
</script>
