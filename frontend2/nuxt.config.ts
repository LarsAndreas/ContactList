
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    runtimeConfig: {
      public: {
        base_url: 'https://test.softrig.com/api/',
        authority: 'https://test-login.softrig.com',
        client_id: '9abfff16-5e55-4c08-af1b-9dc711aa6d8d',
        redirect_uri: 'http://localhost:3000/auth',
        post_logout_redirect_uri: 'http://localhost:3000/login',
        silent_redirect_uri: 'http://localhost:3000/silent_renew',
        automaticSilentRenew: true,
        response_type: 'code',
        scope: 'openid profile AppFramework',
        filterProtocolClaims: true, // prevents protocol level claims such as nbf, iss, at_hash, and nonce from being extracted from the identity token as profile data
        loadUserInfo: true 
      }
    },
  
    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
      '@/assets/css/main.css'
    ],
  
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],
  
    // Auto import components: https://go.nuxtjs.dev/config-components
    components: {
        global: true,
        dirs: ['~/components']
    },
  
    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
    ],
  
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    },

    postcss: {
      plugins: {
          tailwindcss: {},
          autoprefixer: {},
      },
    },

    router: {
      middleware: 'authenticated'
    }
  })
