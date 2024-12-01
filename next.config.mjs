// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://vetti-app.onrender.com/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              // Default y fuentes
              "default-src 'self';",

              // Scripts permitidos
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' " +
                "https://*.calendly.com " +
                "https://assets.calendly.com " +
                "https://cdn.segment.io " +
                "https://connect.facebook.net " +
                "https://m.stripe.network " +
                "https://www.google-analytics.com " +
                "https://ssl.google-analytics.com;",

              // Estilos permitidos
              "style-src 'self' 'unsafe-inline' " +
                "https://*.calendly.com " +
                "https://assets.calendly.com " +
                "https://fonts.googleapis.com;",

              // Frames permitidos
              "frame-src 'self' " +
                "https://*.calendly.com " +
                "https://calendly.com " +
                "https://js.stripe.com " +
                "https://hooks.stripe.com;",

              // Imágenes permitidas
              "img-src 'self' data: blob: " +
                "https://*.calendly.com " +
                "https://assets.calendly.com " +
                "https://www.google-analytics.com " +
                "https://www.facebook.com;",

              // Conexiones permitidas
              "connect-src 'self' " +
                "https://*.calendly.com " +
                "https://vetti-app.onrender.com " +
                "https://assets.calendly.com " +
                "wss://*.calendly.com " +
                "https://api.segment.io " +
                "https://api.stripe.com " +
                "https://www.google-analytics.com;",

              // Fuentes permitidas
              "font-src 'self' data: " +
                "https://*.calendly.com " +
                "https://assets.calendly.com " +
                "https://fonts.gstatic.com;",

              // Media permitida
              "media-src 'self' " +
                "https://*.calendly.com " +
                "https://assets.calendly.com;",

              // Workers permitidos
              "worker-src 'self' blob: " + "https://*.calendly.com;",

              // Manifests permitidos
              "manifest-src 'self' " + "https://*.calendly.com;",

              // Objetos permitidos
              "object-src 'none';",

              // Base URI permitida
              "base-uri 'self';",
            ].join(" "),
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "X-Requested-With, Content-Type, Authorization",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ];
  },

  poweredByHeader: false,
  reactStrictMode: true,

  // Deshabilitamos optimizeCss para evitar problemas con critters
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
  },

  images: {
    domains: ["assets.calendly.com"],
  },
};

export default nextConfig;
