import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getAllProducts, getProductById, getAmazonImageUrl, categories } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import ProductActions from '@/components/ProductActions'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return getAllProducts().map(({ product }) => ({ id: product.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = getProductById(id)
  if (!product) return {}
  return {
    title: `${product.name} — Build The Baby`,
    description: product.description.slice(0, 155),
  }
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full)
          return <span key={i} className="text-amber-400 text-2xl">★</span>
        if (i === full && half)
          return <span key={i} className="text-amber-300 text-2xl">★</span>
        return <span key={i} className="text-stone-200 text-2xl">★</span>
      })}
      <span className="ml-1.5 text-sm text-stone-500">{rating}</span>
    </span>
  )
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) notFound()

  const category = categories.find((c) => c.products.some((p) => p.id === id))!
  const related = category.products.filter((p) => p.id !== id).slice(0, 3)

  return (
    <>
      {/* Breadcrumb */}
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex items-center gap-2 text-sm text-stone-400 flex-wrap">
        <Link href="/" className="hover:text-stone-600 transition-colors">Home</Link>
        <span>›</span>
        <Link href={`/category/${category.slug}`} className="hover:text-stone-600 transition-colors">
          {category.name}
        </Link>
        <span>›</span>
        <span className="text-stone-600 font-medium">{product.name}</span>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Image */}
          <div className="bg-gradient-to-br from-amber-50 to-rose-50 rounded-2xl aspect-square flex items-center justify-center overflow-hidden relative">
            {product.asin ? (
              <Image
                src={getAmazonImageUrl(product.asin)}
                alt={product.name}
                fill
                className="object-contain p-8"
                unoptimized
              />
            ) : (
              <span className="text-9xl opacity-20">{category.emoji}</span>
            )}
            {product.tag && (
              <span className="absolute top-4 right-4 bg-amber-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full z-10">
                {product.tag}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            <div>
              <StarRating rating={product.rating} />
              <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mt-3 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-bold text-amber-600 mt-3">{product.priceRange}</p>
            </div>

            <ProductActions product={product} categorySlug={category.slug} />

            {/* Trust badge */}
            <p className="text-xs text-stone-400 border-t border-stone-100 pt-4 leading-relaxed">
              You pay the same price on Amazon. We earn a small commission that helps keep this site running.
            </p>
          </div>
        </div>
      </section>

      {/* Why We Picked This */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-stone-100">
        <h2 className="text-xl font-bold text-stone-800 mb-3">Why We Picked This</h2>
        <p className="text-stone-600 leading-relaxed text-base">
          {product.whyWePicked ?? product.description}
        </p>
      </section>

      {/* Specs */}
      {product.specs && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-stone-100">
          <h2 className="text-xl font-bold text-stone-800 mb-4">Specs</h2>
          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-sm">
              <tbody>
                {Object.entries(product.specs)
                  .filter(([, v]) => v != null)
                  .map(([key, value], i) => (
                    <tr key={key} className={i % 2 === 0 ? 'bg-stone-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-stone-500 capitalize w-1/3">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </td>
                      <td className="px-4 py-3 text-stone-800">{value}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Related products */}
      {related.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-stone-100">
          <h2 className="text-xl font-bold text-stone-800 mb-6">More from {category.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p, index) => (
              <ProductCard key={p.id} product={p} index={index} categorySlug={category.slug} />
            ))}
          </div>
          <div className="mt-6">
            <Link
              href={`/category/${category.slug}`}
              className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              See all {category.name} picks →
            </Link>
          </div>
        </section>
      )}

      {/* Affiliate disclosure */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <p className="text-xs text-stone-400 border-t border-stone-100 pt-6">
          <strong>Affiliate disclosure:</strong> &ldquo;View on Amazon&rdquo; links are Amazon
          Associates affiliate links. We earn a small commission on qualifying purchases at no extra
          cost to you. Prices and availability may vary.
        </p>
      </div>
    </>
  )
}
