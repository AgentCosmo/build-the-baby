import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getCategoryBySlug, categories } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = getCategoryBySlug(slug)
  if (!category) return {}
  return {
    title: `${category.emoji} ${category.name} Essentials — Build The Baby`,
    description: `${category.tagline}. Browse our curated ${category.name.toLowerCase()} picks for your baby registry.`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = getCategoryBySlug(slug)

  if (!category) notFound()

  return (
    <>
      {/* Category hero */}
      <section
        className={`border-b border-stone-100 py-12 px-4 sm:px-6 lg:px-8 ${category.color} bg-opacity-30`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-stone-400 mb-6">
            <Link href="/" className="hover:text-stone-600 transition-colors">
              Home
            </Link>
            <span>›</span>
            <span className="text-stone-600 font-medium">{category.name}</span>
          </nav>

          <div className="flex items-start gap-5">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center text-5xl border-2 bg-white shadow-sm ${category.color}`}
            >
              {category.emoji}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-stone-800">
                {category.name} Essentials
              </h1>
              <p className="text-stone-500 text-lg mt-2">{category.tagline}</p>
              <p className="text-stone-400 text-sm mt-1">
                {category.products.length} curated picks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </section>

      {/* Affiliate disclosure */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <p className="text-xs text-stone-400 border-t border-stone-100 pt-6">
          <strong>Affiliate disclosure:</strong> &ldquo;View on Amazon&rdquo; links are Amazon
          Associates affiliate links. We earn a small commission on qualifying purchases at no extra
          cost to you. Prices and availability may vary.
        </p>
      </div>

      {/* Other categories */}
      <section className="bg-gradient-to-br from-amber-50 to-rose-50 border-t border-amber-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-stone-700 mb-6">Browse Other Categories</h2>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="flex items-center gap-2 bg-white border border-stone-200 rounded-full px-4 py-2 text-sm font-medium text-stone-600 hover:border-amber-300 hover:text-amber-700 hover:bg-amber-50 transition-colors shadow-sm"
                >
                  <span>{c.emoji}</span>
                  <span>{c.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  )
}
