<template>
  <label
    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    :for="forId"
  >
    <slot></slot>
    <span class="text-red-900 bold ml-2" v-if="requiredField">*</span>
  </label>
</template>

<script setup lang="ts">
const props = defineProps({
  requiredField: {
    type: Boolean,
    default: false,
  },
  forId: {
    type: String,
  },
});
</script>
