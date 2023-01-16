<template></template>

<script setup lang="ts">
import { AuthService } from "~/services/AuthService";

var mgr = new AuthService();
mgr.userManager.signinSilentCallback().catch((err) => {
  console.log(err);
});
</script>
