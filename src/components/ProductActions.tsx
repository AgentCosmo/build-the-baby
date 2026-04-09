'use client'

import { useRegistry } from '@/context/RegistryContext'
import type { Product } from '@/lib/data'

interface Props {
  product: Product
  categorySlug: string
}

export default function ProductActions({ product, categorySlug }: Props) {
  const { selections, addToRegistry, removeFromRegistry } = useRegistry()
  const isSelected = Boolean(selections[product.id])

  function handleAmazonClick() {
    ;(window as Window & { gtag?: (...args: unknown[]) => void }).gtag?.('event', 'affiliate_click', {
      product_id: product.id,
      product_name: product.name,
      category: categorySlug,
      destination: 'amazon',
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <a
        href={product.affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={handleAmazonClick}
        className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-lg px-8 py-4 rounded-2xl transition-colors shadow-md"
      >
        View on Amazon →
      </a>
      <button
        onClick={() =>
          isSelected ? removeFromRegistry(product.id) : addToRegistry(product)
        }
        className={`w-full font-semibold text-base px-6 py-3 rounded-xl border transition-colors ${
          isSelected
            ? 'bg-green-500 hover:bg-green-600 text-white border-green-500'
            : 'bg-white hover:bg-amber-50 text-amber-600 border-amber-400 hover:border-amber-500'
        }`}
      >
        {isSelected ? '✓ Added to Registry' : '+ Add to Registry'}
      </button>
    </div>
  )
}
