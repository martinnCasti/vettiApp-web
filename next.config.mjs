export async function rewrites() {
  return [
    {
      source: "/api/:path*",
      destination: "https://vetti-app.onrender.com/:path*",
    },
  ];
}
