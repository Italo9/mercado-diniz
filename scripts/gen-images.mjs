// Gera as imagens dos produtos do catálogo de demonstração usando a NVIDIA NIM
// (FLUX.1-dev) e salva em public/products/. Use a MESMA chave do site.
//
// Rode UMA vez, na raiz do projeto:
//   node scripts/gen-images.mjs
//
// A chave é lida de NVIDIA_API_KEY (ambiente) ou do arquivo .env.local.
// O script é idempotente: pula imagens que já existem (dá pra rodar de novo
// só para preencher as que faltaram).

import { writeFile, mkdir, readFile } from "node:fs/promises"
import { existsSync } from "node:fs"

// Endpoint hospedado da NIM (sua chave chama direto, sem GPU).
// Se a sua conta não tiver o FLUX habilitado e der 404/403, troque pela linha
// do Stable Diffusion abaixo (o resto do script funciona igual).
const MODEL_URL = "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-dev"
// const MODEL_URL = "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-3.5-large"

const OUT_DIR = "public/products"

// id do produto -> descrição do que a imagem deve mostrar (em inglês, que os
// modelos entendem melhor). Embalados pedem "genérico, sem texto/marca" para
// evitar rótulo borrado.
const PRODUCTS = [
  ["p001", "a bunch of ripe yellow bananas"],
  ["p002", "fresh red italian plum tomatoes"],
  ["p003", "a fresh green crisp curly lettuce head"],
  ["p004", "shiny red fuji apples"],
  ["p005", "fresh white onions"],
  ["p006", "a carton of milk, generic plain packaging, no text"],
  ["p007", "a block of fresh white cheese (queijo minas)"],
  ["p008", "a cup of plain natural white yogurt, generic plain cup, no text"],
  ["p009", "a block of butter on a small dish"],
  ["p010", "fresh brazilian bread rolls, pao frances, golden crust"],
  ["p011", "a loaf of sliced whole wheat bread"],
  ["p012", "a whole raw fresh chicken"],
  ["p013", "fresh raw ground beef on a tray"],
  ["p014", "a glass of orange juice next to a generic bottle, no text"],
  ["p015", "a bottle of cola soft drink, generic unbranded, no text"],
  ["p016", "a 500ml clear plastic water bottle, generic, no text"],
  ["p017", "a bottle of liquid dish soap, generic unbranded plain label, no text"],
  ["p018", "a box of laundry detergent powder, generic unbranded, no text"],
  ["p019", "a bowl of white long-grain rice next to a generic bag, no text"],
  ["p020", "raw carioca beans, brown speckled dried beans"],
  ["p021", "a bottle of extra virgin olive oil, generic unbranded, no text"],
  ["p022", "dry spaghetti pasta"],
]

function promptFor(subject) {
  return `Professional product photography of ${subject}, centered, plain white seamless background, soft studio lighting, sharp focus, high detail, photorealistic, appetizing, no text, no watermark, no logo`
}

async function loadKey() {
  if (process.env.NVIDIA_API_KEY && process.env.NVIDIA_API_KEY.trim() !== "") {
    return process.env.NVIDIA_API_KEY.trim()
  }
  try {
    const env = await readFile(".env.local", "utf8")
    const match = env.match(/^\s*NVIDIA_API_KEY\s*=\s*(.+)\s*$/m)
    if (match) {
      return match[1].trim()
    }
  } catch {
    // sem .env.local
  }
  throw new Error("Defina NVIDIA_API_KEY no ambiente ou em .env.local")
}

async function generate(key, subject) {
  const response = await fetch(MODEL_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: promptFor(subject),
      mode: "base",
      width: 1024,
      height: 1024,
      steps: 40,
      cfg_scale: 3.5,
      seed: 0,
    }),
  })

  const text = await response.text()

  if (response.status < 200 || response.status > 299) {
    console.error(`  ! HTTP ${response.status}: ${text.slice(0, 400)}`)
    return null
  }

  let data
  try {
    data = JSON.parse(text)
  } catch {
    console.error("  ! resposta não-JSON:", text.slice(0, 200))
    return null
  }

  // A NIM pode devolver o base64 em formatos diferentes; tenta os conhecidos.
  const b64 =
    data?.artifacts?.[0]?.base64 ??
    data?.data?.[0]?.b64_json ??
    data?.image ??
    (typeof data?.images?.[0] === "string" ? data.images[0] : data?.images?.[0]?.base64)

  if (!b64) {
    console.error("  ! base64 não encontrado na resposta. Chaves recebidas:", Object.keys(data))
    return null
  }

  return Buffer.from(b64, "base64")
}

async function main() {
  const key = await loadKey()
  await mkdir(OUT_DIR, { recursive: true })

  let ok = 0
  let fail = 0

  for (const [id, subject] of PRODUCTS) {
    const out = `${OUT_DIR}/${id}.jpg`

    if (existsSync(out)) {
      console.log(`= ${id} já existe, pulando`)
      continue
    }

    console.log(`> gerando ${id} (${subject})`)
    const buf = await generate(key, subject)

    if (buf) {
      await writeFile(out, buf)
      console.log(`  ok -> ${out} (${(buf.length / 1024).toFixed(0)} KB)`)
      ok++
    } else {
      fail++
    }

    // respeita o rate limit do plano gratuito
    await new Promise((r) => setTimeout(r, 1500))
  }

  console.log(`\nConcluído. Geradas: ${ok}, falhas: ${fail}.`)
  console.log("Confira public/products/, rode 'npm run dev' e depois:")
  console.log("  git add public/products && git commit -m \"feat: imagens dos produtos\" && git push")
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
