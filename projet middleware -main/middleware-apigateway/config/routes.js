const ROUTES = [
    {
        url: '/produits',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:5000",
            changeOrigin: true,
            pathRewrite: {
                [`^/produits`]: '',
            },
        }
    },
    {
        url: '/commandes',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:5001",
            changeOrigin: true,
            pathRewrite: {
                [`^/commandes`]: '',
            },
        }
    },
    {
        url: '/paiement',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:5002",
            changeOrigin: true,
            pathRewrite: {
                [`^/paiement`]: '',
            },
        }
    },
    {
        url: '/email',
        auth: false,
        creditCheck: false,
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:5009",
            changeOrigin: true,
            pathRewrite: {
                [`^/email`]: '',
            },
        }
    },
]

exports.ROUTES = ROUTES;