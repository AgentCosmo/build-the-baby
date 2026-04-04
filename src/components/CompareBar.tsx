'use client'

import Link from 'next/link'
import { useCompare } from '@/context/CompareContext'

export default function CompareBar() {
  const { compareItems, removeFromCompare, clearCompare } = useCompare()

  if (compareItems.length === 0) return null

  const ids = compareItems.map((p) => p.id).join(',')

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 pb-safe">
      <div className="bg-amber-900 text-white shadow-2xl border-t-2 border-amber-700">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap sm:flex-nowrap">
          <span className="text-amber-300 text-xs font-semibold uppercase tracking-wide shrink-0">
            Comparing {compareItems.length}/3
          </span>

          <div className="flex items-center gap-2 flex-1 min-w-0 flex-wrap">
            {compareItems.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-1 bg-amber-800 rounded-lg px-2.5 py-1 text-sm font-medium max-w-[200px]"
              >
                <span className="truncate">{product.name}</span>
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="text-amber-400 hover:text-white ml-1 text-base leading-none shrink-0"
                  aria-label={`Remove ${product.name} from comparison`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <button
              onClick={clearCompare}
              className="text-xs text-amber-400 hover:text-white transition-colors"
            >
              Clear all
            </button>
            {compareItems.length >= 2 ? (
              <Link
                href={`/compare?ids=${ids}`}
                className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold text-sm px-4 py-2 rounded-xl transition-colors"
              >
                Compare Now →
              </Link>
            ) : (
              <span className="text-amber-500 text-xs italic">Select 1 more to compare</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
