"use client"

import Image from "next/image"
import { Product } from "@/types"
import { clsx } from "clsx"

const BADGE_STYLES = {
  oferta: "bg-brand-500 text-white",
  novidade: "bg-sage-500 text-white",
  destaque: "bg-amber-500 text-white",
}

const BADGE_LABELS = {
  oferta: "Oferta",
  novidade: "Novidade",
  destaque: "Destaque",
}

interface ProductCardProps {
  product: Product
  style?: React.CSSProperties
}

export function ProductCard({ product, style }: ProductCardProps) {
  const priceFormatted = product.price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return (
    <article
      className={clsx(
        "group relative bg-white rounded-2xl overflow-hidden shadow-sm",
        "border border-cream-300 transition-all duration-300 ease-out animate-fade-up",
        "hover:shadow-lg hover:-translate-y-1",
        !product.inStock && "opacity-70",
      )}
      style={style}
    >
      {/* Badge */}
      {product.badge && (
        <span
          className={clsx(
            "absolute top-3 left-3 z-10 text-[10px] sm:text-xs font-body font-semibold",
            "px-2.5 py-1 rounded-full tracking-wide uppercase",
            BADGE_STYLES[product.badge],
          )}
        >
          {BADGE_LABELS[product.badge]}
        </span>
      )}

      {/* Out of stock overlay */}
      {!product.inStock && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
          <span className="bg-gray-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Sem estoque
          </span>
        </div>
      )}

      {/* Image */}
      <div className="relative h-36 sm:h-44 overflow-hidden bg-cream-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl text-cream-400">🛒</div>
        )}
      </div>

      {/* Body */}
      <div className="p-3 sm:p-4">
        <p className="text-[10px] sm:text-xs text-sage-600 font-body font-medium uppercase tracking-widest mb-1">
          {product.category}
        </p>
        <h3 className="font-display text-gray-900 text-sm sm:text-base font-bold leading-snug mb-1 text-balance">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 font-body line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-end justify-between gap-2">
          <div>
            <span className="font-display text-brand-600 text-lg sm:text-xl font-bold">
              {priceFormatted}
            </span>
            <span className="text-gray-400 text-xs ml-1 font-body">/ {product.unit}</span>
          </div>

          {/* Indicador de disponibilidade (site informacional, sem pedido) */}
          <span
            className={clsx(
              "flex-shrink-0 inline-flex items-center gap-1 text-[11px] font-body font-semibold px-2 py-1 rounded-full",
              product.inStock
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-gray-100 text-gray-500 border border-gray-200",
            )}
          >
            <span className={clsx("w-1.5 h-1.5 rounded-full", product.inStock ? "bg-emerald-500" : "bg-gray-400")} />
            {product.inStock ? "Disponível" : "Indisponível"}
          </span>
        </div>
      </div>
    </article>
  )
}
