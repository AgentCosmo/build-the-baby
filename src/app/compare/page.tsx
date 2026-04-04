'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Suspense } from 'react'
import { categories, getAmazonImageUrl, Product } from '@/lib/data'
import { useRegistry } from '@/context/RegistryContext'

function getAllProducts(): Product[] {
  return categories.flatMap((c) => c.products)
}

const SPEC_LABELS: Record<string, string> = {
  ageRange: 'Age Range',
  weight: 'Weight',
  foldDimensions: 'Fold/Dimensions',
  material: 'Material',
  certifications: 'Certifications',
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="flex items-center gap-0.5 justify-center" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full) return <span key={i} className="text-amber-400 text-sm">★</span>
        if (i === full && half) return <span key={i} className="text-amber-300 text-sm">★</span>
        return <span key={i} className="text-stone-200 text-sm">★</span>
      })}
      <span className="ml-1 text-xs text-stone-500">{rating}</span>
    </span>
  )
}

function CompareContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { selections, addToRegistry, removeFromRegistry } = useRegistry()

  const idsParam = searchParams.get('ids') ?? ''
  const ids = idsParam.split(',').filter(Boolean)

  const allProducts = getAllProducts()
  const products = ids.map((id) => allProducts.find((p) => p.id === id)).filter(Boolean) as Product[]

  if (products.length < 2) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-stone-800 mb-2">Not enough products to compare</h1>
        <p className="text-stone-500 mb-6">Select at least 2 products using the Compare button on product cards.</p>
        <button
          onClick={() => router.back()}
          className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          ← Go Back
        </button>
      </div>
    )
  }

  // Collect all spec keys present in any product
  const specKeys = Array.from(
    new Set(products.flatMap((p) => Object.keys(p.specs ?? {})))
  )

  const rows: { label: string; values: (string | null)[] }[] = [
    {
      label: 'Price Range',
      values: products.map((p) => p.priceRange),
    },
    {
      label: 'Rating',
      values: products.map((p) => String(p.rating)),
    },
    {
      label: 'Tag',
      values: products.map((p) => p.tag ?? null),
    },
    ...specKeys.map((key) => ({
      label: SPEC_LABELS[key] ?? key,
      values: products.map((p) => p.specs?.[key] ?? null),
    })),
  ]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="text-sm font-medium text-amber-700 border border-amber-300 rounded-full px-4 py-1.5 hover:bg-amber-50 transition-colors"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold text-stone-800">Compare Products</h1>
      </div>

      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left text-xs uppercase tracking-wide text-stone-400 font-semibold p-4 w-32">
                &nbsp;
              </th>
              {products.map((product) => (
                <th key={product.id} className="p-4 text-center align-top">
                  {/* Image */}
                  <div className="bg-gradient-to-br from-amber-50 to-rose-50 h-36 flex items-center justify-center rounded-xl mb-3 relative overflow-hidden mx-auto w-full max-w-[180px]">
                    {product.asin ? (
                      <Image
                        src={getAmazonImageUrl(product.asin)}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                        unoptimized
                      />
                    ) : (
                      <span className="text-5xl opacity-30">🍼</span>
                    )}
                    {product.tag && (
                      <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        {product.tag}
                      </span>
                    )}
                  </div>
                  <p className="font-semibold text-stone-800 text-sm leading-snug mb-3 mx-auto max-w-[180px]">
                    {product.name}
                  </p>
                  {/* Add to Registry button */}
                  <button
                    onClick={() =>
                      selections[product.id]
                        ? removeFromRegistry(product.id)
                        : addToRegistry(product)
                    }
                    className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
                      selections[product.id]
                        ? 'bg-green-500 hover:bg-green-600 text-white border-green-500'
                        : 'bg-white hover:bg-amber-50 text-amber-600 border-amber-400'
                    }`}
                  >
                    {selections[product.id] ? '✓ In Registry' : '+ Add to Registry'}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const allNull = row.values.every((v) => v === null)
              if (allNull) return null
              return (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-stone-50/50' : 'bg-white'}>
                  <td className="p-4 text-xs font-semibold text-stone-500 uppercase tracking-wide align-top whitespace-nowrap">
                    {row.label}
                  </td>
                  {row.values.map((val, j) => (
                    <td key={j} className="p-4 text-center text-sm text-stone-700 align-top">
                      {row.label === 'Rating' && val ? (
                        <div className="flex justify-center">
                          <StarRating rating={Number(val)} />
                        </div>
                      ) : val ? (
                        val
                      ) : (
                        <span className="text-stone-300">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              )
            })}
            {/* Amazon links row */}
            <tr className="border-t border-stone-100">
              <td className="p-4 text-xs font-semibold text-stone-500 uppercase tracking-wide">
                View
              </td>
              {products.map((product) => (
                <td key={product.id} className="p-4 text-center">
                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors"
                  >
                    View on Amazon →
                  </a>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-xs text-stone-400 mt-6 text-center">
        "View on Amazon" links are affiliate links — we may earn a small commission at no extra cost to you.
      </p>
    </div>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-stone-400">Loading comparison...</div>}>
      <CompareContent />
    </Suspense>
  )
}
