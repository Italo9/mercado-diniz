// Configuração white-label do site.
//
// Tudo que aparece na tela vem daqui, e cada valor pode ser sobrescrito por
// variável de ambiente — assim o mesmo código serve para vários mercados,
// bastando trocar as variáveis a cada deploy (na Vercel: Project → Settings →
// Environment Variables; depois Redeploy).
//
// Regras:
// - Variáveis exibidas no NAVEGADOR precisam do prefixo NEXT_PUBLIC_ (o Next
//   injeta esses valores no build do client).
// - Variáveis só de servidor (chaves de API, URL de integração) NÃO usam o
//   prefixo (ex.: NVIDIA_API_KEY, PRODUCTS_API_URL).
// - Os defaults abaixo são os dados da DINIZ, então o deploy atual continua
//   funcionando mesmo sem nenhuma variável setada. Um novo mercado só precisa
//   preencher as variáveis.

function readEnv(key: string, fallback: string): string {
  const value = process.env[key]
  if (value && value.trim() !== "") {
    return value.trim()
  }
  return fallback
}

function readList(key: string, fallback: string): string[] {
  return readEnv(key, fallback)
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "")
}

export const market = {
  name: readEnv("NEXT_PUBLIC_MARKET_NAME", "DINIZ Comercial e Frios"),
  shortName: readEnv("NEXT_PUBLIC_MARKET_SHORT_NAME", "DINIZ"),
  tagline: readEnv("NEXT_PUBLIC_MARKET_TAGLINE", "Comercial e Frios"),
  description: readEnv(
    "NEXT_PUBLIC_MARKET_DESCRIPTION",
    "frios selecionados, produtos frescos e o melhor preço do bairro",
  ),
  city: readEnv("NEXT_PUBLIC_MARKET_CITY", "Irecê – BA"),
  address: readEnv("NEXT_PUBLIC_MARKET_ADDRESS", "Lagoa Nova, Irecê – BA"),
  cep: readEnv("NEXT_PUBLIC_MARKET_CEP", "44900-000"),
  hours: readEnv("NEXT_PUBLIC_MARKET_HOURS", "Seg a Sáb · fecha às 20h"),
  // Opcionais — quando vazios, o componente correspondente é ocultado.
  rating: readEnv("NEXT_PUBLIC_MARKET_RATING", "4,6 ★ no Google"),
  whatsapp: readEnv("NEXT_PUBLIC_MARKET_WHATSAPP", "5574999995365"), // só dígitos
  phoneDisplay: readEnv("NEXT_PUBLIC_MARKET_PHONE", "(74) 99999-5365"),
  payments: readList("NEXT_PUBLIC_MARKET_PAYMENTS", "Visa,Mastercard,Elo,Hipercard,Pix"),
  developerName: readEnv("NEXT_PUBLIC_DEVELOPER_NAME", "Ítalo Lima"),
  developerUrl: readEnv("NEXT_PUBLIC_DEVELOPER_URL", "https://italolima.com.br"),
}

export const assistant = {
  name: readEnv("NEXT_PUBLIC_ASSISTANT_NAME", "Dinizinho"),
  role: readEnv("NEXT_PUBLIC_ASSISTANT_ROLE", "seu assistente virtual"),
}

export function whatsappUrl(): string | null {
  if (!market.whatsapp) {
    return null
  }
  return `https://wa.me/${market.whatsapp}`
}
