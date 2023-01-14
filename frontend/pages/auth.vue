<template></template>

<script setup lang="ts">
import Oidc from "oidc-client";
import { AuthService } from "~/services/AuthService";

var mgr = new AuthService();
mgr.userManager.signinRedirectCallback().then(
  () => {
    window.history.replaceState(
      {},
      window.document.title,
      window.location.origin
    );
    window.location = "/dashboard";
  },
  (error) => {
    console.error(error);
  }
);
</script>
