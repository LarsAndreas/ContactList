export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  publicRuntimeConfig: {
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
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
