<template></template>

<script setup>
import { AuthService } from "~/services/AuthService";

const auth = new AuthService();

auth.login();
</script>
