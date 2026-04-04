'use client'

import { useRouter } from 'next/navigation'
import { starterBuilds, resolveProducts } from '@/lib/starterBuilds'
import { useRegistry } from '@/context/RegistryContext'

export default function StarterBuildsPage() {
  const router = useRouter()
  const { addToRegistry } = useRegistry()

  function loadBuild(productIds: string[]) {
    const products = resolveProducts(productIds)
    for (const product of products) {
      addToRegistry(product)
    }
    router.push('/registry')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-amber-50">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-white border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-medium mb-5">
          <span>✨</span> Pre-built for you
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 mb-4">
          Starter Builds
        </h1>
        <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
          Not sure where to begin? Pick a starter build and load it into your registry instantly — then customize from there.
        </p>
      </section>

      {/* Build cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {starterBuilds.map((build) => {
          const products = resolveProducts(build.productIds)
          return (
            <div
              key={build.id}
              className={`bg-white rounded-2xl border shadow-sm flex flex-col overflow-hidden ${build.accent.border}`}
            >
              {/* Card header */}
              <div className={`px-6 py-5 ${build.accent.bg}`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{build.accent.icon}</span>
                  <span className={`text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${build.accent.badge}`}>
                    {build.id === 'budget' ? 'Best Value' : build.id === 'premium' ? "Editor's Choice" : 'No Fluff'}
                  </span>
                </div>
                <h2 className={`text-xl font-bold mb-1 ${build.accent.heading}`}>{build.title}</h2>
                <p className="text-stone-500 text-sm leading-snug">{build.tagline}</p>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-4 px-6 py-3 border-b border-stone-100 bg-white">
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wide font-semibold">Items</p>
                  <p className="text-lg font-bold text-stone-800">{products.length}</p>
                </div>
                <div className="w-px h-8 bg-stone-100" />
                <div>
                  <p className="text-xs text-stone-400 uppercase tracking-wide font-semibold">Est. Total</p>
                  <p className="text-lg font-bold text-stone-800">{build.priceRange}</p>
                </div>
              </div>

              {/* Product list */}
              <ul className="flex-1 px-6 py-4 space-y-2.5">
                {products.map((product) => (
                  <li key={product.id} className="flex items-start gap-2.5">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-stone-100 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-stone-700 leading-tight">{product.name}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{product.priceRange}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => loadBuild(build.productIds)}
                  className={`w-full py-3 rounded-2xl font-semibold text-sm transition-colors shadow-sm ${build.accent.button}`}
                >
                  Load This Registry →
                </button>
              </div>
            </div>
          )
        })}
      </section>

      {/* Footer note */}
      <section className="max-w-2xl mx-auto px-4 pb-16 text-center">
        <p className="text-sm text-stone-400">
          Loading a build replaces your current pick in each category with the build&apos;s selection. You can swap any item after loading.
        </p>
      </section>
    </div>
  )
}
