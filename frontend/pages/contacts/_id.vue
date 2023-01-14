<template>
  <span>this is the contacts id page {{ id }}</span>
</template>

<script setup lang="js">
import { useRoute } from "vue-router";

console.log(useRoute);

const route = useRoute();

const id = route.params.id;
</script>
