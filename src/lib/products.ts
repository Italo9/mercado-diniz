import { Product, Category } from "@/types"

// Catálogo de demonstração (fallback). Em produção, defina PRODUCTS_API_URL
// para consumir os produtos reais de cada mercado — veja getProducts().
export const MOCK_PRODUCTS: Product[] = [
  { id: "p001", title: "Banana Prata", price: 5.49, unit: "kg", category: "hortifruti", image: "https://loremflickr.com/400/400/banana?lock=1", description: "Banana prata madura, colhida fresquinha da região.", inStock: true, badge: "oferta" },
  { id: "p002", title: "Tomate Italiano", price: 6.99, unit: "kg", category: "hortifruti", image: "https://loremflickr.com/400/400/tomato?lock=2", description: "Tomate italiano firme e saboroso, ótimo para molhos e saladas.", inStock: true },
  { id: "p003", title: "Alface Crespa", price: 2.49, unit: "unid.", category: "hortifruti", image: "https://loremflickr.com/400/400/lettuce?lock=3", description: "Alface crespa hidropônica, bem lavada e pronta pro consumo.", inStock: true },
  { id: "p004", title: "Maçã Fuji", price: 8.90, unit: "kg", category: "hortifruti", image: "https://loremflickr.com/400/400/apple?lock=4", description: "Maçã Fuji crocante e doce.", inStock: true, badge: "destaque" },
  { id: "p005", title: "Cebola Branca", price: 3.79, unit: "kg", category: "hortifruti", image: "https://loremflickr.com/400/400/onion?lock=5", description: "Cebola branca fresca, ideal para refogar e temperar.", inStock: true },
  { id: "p006", title: "Leite Integral", price: 4.29, unit: "L", category: "laticinios", image: "https://loremflickr.com/400/400/milk?lock=6", description: "Leite integral UHT 1 litro, rico em cálcio.", inStock: true, badge: "oferta" },
  { id: "p007", title: "Queijo Minas Frescal", price: 18.90, unit: "500g", category: "laticinios", image: "https://loremflickr.com/400/400/cheese?lock=7", description: "Queijo minas frescal artesanal, produção local.", inStock: true, badge: "destaque" },
  { id: "p008", title: "Iogurte Natural", price: 3.49, unit: "170g", category: "laticinios", image: "https://loremflickr.com/400/400/yogurt?lock=8", description: "Iogurte natural integral, sem conservantes.", inStock: true },
  { id: "p009", title: "Manteiga com Sal", price: 9.99, unit: "200g", category: "laticinios", image: "https://loremflickr.com/400/400/butter?lock=9", description: "Manteiga cremosa com sal, 200g.", inStock: false },
  { id: "p010", title: "Pão Francês", price: 0.99, unit: "unid.", category: "padaria", image: "https://loremflickr.com/400/400/baguette?lock=10", description: "Pão francês fresquinho, assado toda manhã.", inStock: true, badge: "novidade" },
  { id: "p011", title: "Pão de Forma Integral", price: 7.49, unit: "500g", category: "padaria", image: "https://loremflickr.com/400/400/bread?lock=11", description: "Pão de forma integral com sementes, fonte de fibras.", inStock: true },
  { id: "p012", title: "Frango Inteiro", price: 13.90, unit: "kg", category: "carnes", image: "https://loremflickr.com/400/400/chicken?lock=12", description: "Frango inteiro resfriado, peso médio 1,8 kg.", inStock: true, badge: "oferta" },
  { id: "p013", title: "Carne Moída", price: 28.90, unit: "kg", category: "carnes", image: "https://loremflickr.com/400/400/beef?lock=13", description: "Carne moída patinho, fresca e sem gordura excessiva.", inStock: true },
  { id: "p014", title: "Suco de Laranja 1L", price: 6.49, unit: "L", category: "bebidas", image: "https://loremflickr.com/400/400/orange,juice?lock=14", description: "Suco de laranja integral, sem adição de açúcar.", inStock: true, badge: "novidade" },
  { id: "p015", title: "Refrigerante Cola 2L", price: 7.99, unit: "2L", category: "bebidas", image: "https://loremflickr.com/400/400/soda?lock=15", description: "Refrigerante sabor cola, garrafa 2 litros.", inStock: true },
  { id: "p016", title: "Água Mineral 500ml", price: 1.99, unit: "500ml", category: "bebidas", image: "https://loremflickr.com/400/400/water,bottle?lock=16", description: "Água mineral natural sem gás, garrafa 500 ml.", inStock: true, badge: "oferta" },
  { id: "p017", title: "Detergente Neutro", price: 2.29, unit: "500ml", category: "limpeza", image: "https://loremflickr.com/400/400/dishwashing?lock=17", description: "Detergente líquido neutro, 500 ml.", inStock: true },
  { id: "p018", title: "Sabão em Pó", price: 11.49, unit: "1kg", category: "limpeza", image: "https://loremflickr.com/400/400/detergent?lock=18", description: "Sabão em pó multiação, 1 kg.", inStock: true },
  { id: "p019", title: "Arroz Tipo 1", price: 4.89, unit: "1kg", category: "mercearia", image: "https://loremflickr.com/400/400/rice?lock=19", description: "Arroz branco tipo 1, grão longo e soltinho.", inStock: true, badge: "oferta" },
  { id: "p020", title: "Feijão Carioca", price: 6.99, unit: "1kg", category: "mercearia", image: "https://loremflickr.com/400/400/beans?lock=20", description: "Feijão carioca premium, nova safra.", inStock: true },
  { id: "p021", title: "Azeite Extra Virgem", price: 24.90, unit: "500ml", category: "mercearia", image: "https://loremflickr.com/400/400/olive,oil?lock=21", description: "Azeite extra virgem importado, acidez 0,3%.", inStock: true, badge: "destaque" },
  { id: "p022", title: "Macarrão Espaguete", price: 3.49, unit: "500g", category: "mercearia", image: "https://loremflickr.com/400/400/spaghetti?lock=22", description: "Macarrão espaguete nº 8, 500 g.", inStock: true },
]

// Rótulos e ícones para as categorias conhecidas. Categorias que vierem de uma
// integração e não estiverem aqui usam um rótulo/ícone padrão.
const CATEGORY_META: Record<string, { label: string; icon: string }> = {
  hortifruti: { label: "Hortifruti", icon: "🥦" },
  laticinios: { label: "Laticínios", icon: "🥛" },
  frios: { label: "Frios", icon: "🧀" },
  padaria: { label: "Padaria", icon: "🍞" },
  carnes: { label: "Carnes", icon: "🥩" },
  bebidas: { label: "Bebidas", icon: "🧃" },
  congelados: { label: "Congelados", icon: "🧊" },
  limpeza: { label: "Limpeza", icon: "🧹" },
  higiene: { label: "Higiene", icon: "🧴" },
  mercearia: { label: "Mercearia", icon: "🫙" },
  pet: { label: "Pet", icon: "🐾" },
}

const CATEGORY_ORDER = Object.keys(CATEGORY_META)

function titleCase(value: string): string {
  if (value.length === 0) {
    return value
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

// Monta as abas de categoria a partir dos produtos realmente presentes,
// então qualquer mercado vê apenas as categorias que possui.
export function buildCategories(products: Product[]): Category[] {
  const present = new Set(products.map((p) => p.category).filter(Boolean))
  const ordered = [
    ...CATEGORY_ORDER.filter((id) => present.has(id)),
    ...Array.from(present).filter((id) => !CATEGORY_ORDER.includes(id)).sort(),
  ]
  const tabs: Category[] = ordered.map((id) => ({
    id,
    label: CATEGORY_META[id]?.label ?? titleCase(id),
    icon: CATEGORY_META[id]?.icon ?? "🛒",
  }))
  return [{ id: "todos", label: "Todos", icon: "🛒" }, ...tabs]
}

// Normaliza um item vindo de uma API externa para o formato Product.
function normalizeProduct(raw: Record<string, unknown>): Product {
  const num = (v: unknown) => (typeof v === "number" ? v : Number(v) || 0)
  const str = (v: unknown, fallback = "") => (typeof v === "string" ? v : fallback)
  return {
    id: str(raw.id ?? raw.sku ?? raw.code, crypto.randomUUID()),
    title: str(raw.title ?? raw.name ?? raw.nome, "Produto"),
    price: num(raw.price ?? raw.preco ?? raw.valor),
    unit: str(raw.unit ?? raw.unidade, "unid."),
    category: str(raw.category ?? raw.categoria, "mercearia").toLowerCase(),
    image: str(raw.image ?? raw.imagem ?? raw.photo),
    description: str(raw.description ?? raw.descricao),
    inStock: raw.inStock ?? raw.disponivel ?? raw.emEstoque ? true : raw.inStock === undefined && raw.disponivel === undefined && raw.emEstoque === undefined ? true : false,
    badge: (["oferta", "novidade", "destaque"].includes(str(raw.badge)) ? str(raw.badge) : undefined) as Product["badge"],
  }
}

// Fonte única de produtos. Se PRODUCTS_API_URL estiver definida, consome a API
// real do mercado; caso contrário, usa o catálogo de demonstração.
// Em qualquer falha de rede ou status fora de 2xx, registra e cai no mock —
// o site nunca quebra por causa da integração.
export async function getProducts(): Promise<Product[]> {
  const url = process.env.PRODUCTS_API_URL

  if (!url) {
    return MOCK_PRODUCTS
  }

  try {
    const headers: Record<string, string> = { Accept: "application/json" }
    const apiKey = process.env.PRODUCTS_API_KEY

    if (apiKey) {
      headers.Authorization = `Bearer ${apiKey}`
    }

    const response = await fetch(url, { headers, next: { revalidate: 60 } })

    if (response.status < 200 || response.status > 299) {
      console.error("[PRODUCTS] API retornou status", response.status)
      return MOCK_PRODUCTS
    }

    const data = await response.json()
    const list: unknown = Array.isArray(data) ? data : data?.products ?? data?.items

    if (!Array.isArray(list)) {
      console.error("[PRODUCTS] formato inesperado da API")
      return MOCK_PRODUCTS
    }

    return list.map((item) => normalizeProduct(item as Record<string, unknown>))
  } catch (error) {
    console.error("[PRODUCTS] erro ao consumir a API:", error)
    return MOCK_PRODUCTS
  }
}
