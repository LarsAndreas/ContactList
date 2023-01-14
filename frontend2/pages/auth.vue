<template></template>

<script setup lang="ts">
import { User } from "oidc-client";
import { AuthService } from "~/services/AuthService";

const router = useRouter();

var mgr = new AuthService();
mgr.userManager.signinRedirectCallback().then(
  async (user: User) => {
    const cookie = useCookie("accessToken");
    cookie.value = user.access_token;
    router.push("/");
  },
  (error) => {
    console.error(error);
  }
);
</script>
