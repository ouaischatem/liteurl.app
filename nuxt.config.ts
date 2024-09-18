// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
            title: 'LiteURL - Shorten & Track URLs',
            meta: [
                {
                    name: 'description',
                    content: 'LiteURL is a minimalist tool that shortens URLs and tracks metrics, providing a simple and efficient way to manage, share, and monitor your links.'
                },
                {
                    name: 'keywords',
                    content: 'URL shortener, link tracker, URL shortening and tracking, short links, LiteURL, click analytics, link management, metrics tracking'
                },
                {name: 'author', content: 'https://hatemobeidine.fr/'},
                {name: 'robots', content: 'index, follow'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1.0'},
                {name: 'theme-color', content: '#3f38dc'},
                {name: 'language', content: 'en'},
                {property: 'og:title', content: 'LiteURL - Shorten & Track URLs'},
                {
                    property: 'og:description',
                    content: 'LiteURL offers URL shortening and tracking features, making it easy to share, manage, and monitor link performance with real-time analytics.'
                },
                {property: 'og:image', content: '/logo.png'},
                {property: 'og:url', content: 'https://liteurl.app'},
                {property: 'og:type', content: 'website'},
                {property: 'twitter:card', content: 'summary_large_image'},
                {property: 'twitter:title', content: 'LiteURL - Shorten and Track Your URLs Instantly'},
                {
                    property: 'twitter:description',
                    content: 'LiteURL is a minimalist tool for shortening URLs and tracking metrics. Easily manage, share, and analyze link performance with real-time insights.'
                },
                {property: 'twitter:image', content: '/logo.png'},
                {property: 'twitter:site', content: '@LiteURL'}
            ],
            link: [
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
                {rel: 'canonical', href: 'https://liteurl.app'}
            ]
        }
    },

    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    css: ['~/assets/css/main.css'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    runtimeConfig: {
        public: {
            baseURL: process.env.BASE_URL
        }
    },

    supabase: {
        redirect: false
    },

    site: {
        url: 'https://www.liteurl.app',
        name: 'LiteURL - Shorten & Track URLs',
    },

    modules: ['@nuxtjs/supabase', '@nuxtjs/sitemap'],
})