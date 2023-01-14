<template>
  <span>this is the contacts id page {{ id }}</span>
</template>

<script setup lang="ts">
const route = useRoute();

const id = route.params.id;
</script>
