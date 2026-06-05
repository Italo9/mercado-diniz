/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    // White-label: as imagens dos produtos vêm do feed de cada mercado (host
    // variável) e do serviço de demonstração. unoptimized evita ter que
    // cadastrar cada host em remotePatterns e aceita qualquer URL https.
    unoptimized: true,
  },
}

module.exports = nextConfig
