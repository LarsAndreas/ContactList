/*
export default function ({ next, router }) {
    const cookie = useCookie("accessToken");

    console.log("Test");

    if (!cookie.value) {
        return router.push('/login');
    }

    return next();
}
*/

export default defineNuxtRouteMiddleware((to, from) => {
    const cookie = useCookie("accessToken");

    if (!cookie.value) {
        return navigateTo('/login');
    }
  });