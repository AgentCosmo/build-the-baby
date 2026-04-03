'use client'

import Link from 'next/link'
import { useRegistry } from '@/context/RegistryContext'

function extractASIN(url: string): string | null {
  const match = url.match(/\/dp\/([A-Z0-9]{10})/)
  return match ? match[1] : null
}

function buildCartUrl(products: { affiliateUrl: string }[]): string {
  const params = new URLSearchParams()
  let index = 1
  for (const product of products.slice(0, 20)) {
    const asin = extractASIN(product.affiliateUrl)
    if (asin) {
      params.set(`ASIN.${index}`, asin)
      params.set(`Quantity.${index}`, '1')
      index++
    }
  }
  params.set('tag', 'buildthebaby-20')
  return `https://www.amazon.com/gp/aws/cart/add.html?${params.toString()}`
}

function formatCurrency(cents: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(cents)
}

function getCategoryLabel(productId: string): string {
  const prefix = productId.replace(/-\d+$/, '')
  const labels: Record<string, string> = {
    sleep: 'Sleep',
    feeding: 'Feeding',
    bathing: 'Bathing',
    travel: 'Travel',
    nursery: 'Nursery',
    clothing: 'Clothing',
    diapering: 'Diapering',
    comfort: 'Comfort & Play',
  }
  return labels[prefix] ?? prefix
}

export default function RegistryPage() {
  const { selections, removeFromRegistry, clearRegistry, totalItems, estimatedTotal } = useRegistry()
  const products = Object.values(selections)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-stone-800">My Registry</h1>
          {totalItems > 0 && (
            <p className="text-stone-500 mt-1">
              {totalItems} item{totalItems === 1 ? '' : 's'} &middot; estimated from{' '}
              <span className="font-semibold text-stone-700">{formatCurrency(estimatedTotal)}</span>
            </p>
          )}
        </div>
        <Link
          href="/"
          className="text-sm font-medium text-amber-700 border border-amber-300 rounded-full px-4 py-1.5 hover:bg-amber-50 transition-colors"
        >
          ← Browse Categories
        </Link>
      </div>

      {/* Empty state */}
      {totalItems === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-stone-100 shadow-sm">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold text-stone-700 mb-2">Your registry is empty</h2>
          <p className="text-stone-500 mb-6">
            Browse categories and tap <strong>Add to Registry</strong> on the products you love.
          </p>
          <Link
            href="/"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
          >
            Start Building →
          </Link>
        </div>
      )}

      {/* Product list */}
      {totalItems > 0 && (
        <>
          <div className="space-y-3 mb-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-4 flex items-center gap-4"
              >
                <div className="bg-gradient-to-br from-amber-50 to-rose-50 w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-2xl opacity-60">
                  🍼
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-800 truncate">{product.name}</p>
                  <p className="text-sm text-stone-500">
                    <span className="text-stone-400">{getCategoryLabel(product.id)}</span>
                    {' · '}
                    <span className="font-medium text-stone-600">{product.priceRange}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                  >
                    View →
                  </a>
                  <button
                    onClick={() => removeFromRegistry(product.id)}
                    className="text-stone-300 hover:text-rose-400 transition-colors text-lg leading-none"
                    aria-label={`Remove ${product.name} from registry`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <a
              href={buildCartUrl(products)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-amber-500 hover:bg-amber-600 text-white font-bold text-base px-6 py-3.5 rounded-2xl shadow-sm transition-colors"
            >
              Add All to Amazon Cart →
            </a>
            <button
              onClick={clearRegistry}
              className="block w-full text-center text-sm font-medium text-stone-400 hover:text-rose-500 transition-colors py-2"
            >
              Clear Registry
            </button>
          </div>

          <p className="text-xs text-stone-400 mt-6 border-t border-stone-100 pt-5">
            Estimated total reflects starting prices only. Final prices may vary on Amazon.
            &ldquo;Add All to Amazon Cart&rdquo; and &ldquo;View&rdquo; links are affiliate links — we may earn a small commission at no extra cost to you.
          </p>
        </>
      )}
    </div>
  )
}
