// Cliente HTTP para o relay WhatsApp. O relay é um servidor standalone (Railway,
// Docker) que mantém a conexão Baileys viva. O Next.js (Vercel, serverless)
// apenas encaminha as requisições para ele.
//
// Se RELAY_URL não estiver definida, as funções retornam fallback indicando
// que o atendimento humano está indisponível, mantendo o bot ativo.

const RELAY_URL = process.env.RELAY_URL
const RELAY_AUTH_TOKEN = process.env.RELAY_AUTH_TOKEN || "change-me"

async function relayFetch(path: string, options: RequestInit = {}) {
  if (!RELAY_URL) {
    return null
  }
  try {
    const url = `${RELAY_URL}${path}`
    console.log("[RELAY] fetch", url.substring(0, 60))
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RELAY_AUTH_TOKEN}`,
        ...options.headers,
      },
    })
    const data = await res.json()
    console.log("[RELAY] response", path.substring(0, 20), "status:", res.status, "msgs:", data?.messages?.length ?? "N/A")
    return data
  } catch (e: any) {
    console.error("[RELAY] fetch error", path.substring(0, 20), e?.message || e)
    return null
  }
}

export async function relayPost(path: string, body: unknown) {
  return relayFetch(path, {
    method: "POST",
    body: JSON.stringify(body),
  })
}

export async function relayGet(path: string) {
  return relayFetch(path)
}

export function relayEnabled(): boolean {
  return !!RELAY_URL
}
