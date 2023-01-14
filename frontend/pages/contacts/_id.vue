<template>
  <span>this is the contacts id page {{ id }}</span>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router/types/composables";

const route = useRoute();

const id = route.params.id;
</script>
