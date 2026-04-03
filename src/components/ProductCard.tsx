'use client'

import { useRegistry } from '@/context/RegistryContext'
import { Product } from '@/lib/data'

interface ProductCardProps {
  product: Product
  index: number
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full)
          return (
            <span key={i} className="text-amber-400 text-sm">
              ★
            </span>
          )
        if (i === full && half)
          return (
            <span key={i} className="text-amber-300 text-sm">
              ★
            </span>
          )
        return (
          <span key={i} className="text-stone-200 text-sm">
            ★
          </span>
        )
      })}
      <span className="ml-1 text-xs text-stone-500">{rating}</span>
    </span>
  )
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { selections, addToRegistry, removeFromRegistry } = useRegistry()
  const isSelected = Boolean(selections[product.id])

  return (
    <div className="bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
      {/* Image placeholder */}
      <div className="bg-gradient-to-br from-amber-50 to-rose-50 h-48 flex items-center justify-center relative">
        <span className="text-6xl opacity-30">🍼</span>
        <span className="absolute top-3 left-3 text-xs text-stone-400 font-mono">
          #{String(index + 1).padStart(2, '0')}
        </span>
        {product.tag && (
          <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {product.tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-stone-800 text-lg leading-snug mb-2">
          {product.name}
        </h3>
        <p className="text-stone-500 text-sm leading-relaxed flex-1 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <StarRating rating={product.rating} />
            <p className="text-stone-700 font-semibold mt-1">{product.priceRange}</p>
          </div>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-4 py-2 rounded-xl transition-colors"
          >
            View on Amazon →
          </a>
        </div>

        <button
          onClick={() =>
            isSelected ? removeFromRegistry(product.id) : addToRegistry(product)
          }
          className={`mt-3 w-full font-semibold text-sm px-4 py-2 rounded-xl border transition-colors ${
            isSelected
              ? 'bg-green-500 hover:bg-green-600 text-white border-green-500'
              : 'bg-white hover:bg-amber-50 text-amber-600 border-amber-400 hover:border-amber-500'
          }`}
        >
          {isSelected ? '✓ Added to Registry' : '+ Add to Registry'}
        </button>
      </div>
    </div>
  )
}
