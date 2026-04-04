'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface RegistryItem {
  id: string
  registry_id: string
  product_name: string
  category_slug: string
  price_range: string
  affiliate_url: string
  status: 'available' | 'pending' | 'purchased'
  claimer_name: string | null
  updated_at: string
  created_at: string
}

interface Registry {
  id: string
  name: string
  created_at: string
}

const categoryLabels: Record<string, string> = {
  sleep: 'Sleep',
  feeding: 'Feeding',
  bathing: 'Bathing',
  travel: 'Travel',
  nursery: 'Nursery',
  clothing: 'Clothing',
  diapering: 'Diapering',
  comfort: 'Comfort & Play',
}

function getCategoryLabel(slug: string): string {
  return categoryLabels[slug] ?? slug
}

function StatusBadge({ status }: { status: RegistryItem['status'] }) {
  if (status === 'available') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
        Available
      </span>
    )
  }
  if (status === 'pending') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
        Pending 🛒
      </span>
    )
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-500">
      Purchased ✓
    </span>
  )
}

function RegistryItemCard({
  item,
  onRefresh,
}: {
  item: RegistryItem
  onRefresh: () => void
}) {
  const [claimingName, setClaimingName] = useState('')
  const [showNameInput, setShowNameInput] = useState(false)
  const [updating, setUpdating] = useState(false)

  async function handleClaim() {
    if (!claimingName.trim()) return
    setUpdating(true)
    await supabase
      .from('registry_items')
      .update({ status: 'pending', claimer_name: claimingName.trim() })
      .eq('id', item.id)
    setUpdating(false)
    setShowNameInput(false)
    setClaimingName('')
    onRefresh()
  }

  async function handlePurchased() {
    setUpdating(true)
    await supabase
      .from('registry_items')
      .update({ status: 'purchased' })
      .eq('id', item.id)
    setUpdating(false)
    onRefresh()
  }

  const isPurchased = item.status === 'purchased'

  return (
    <div className={`bg-white rounded-2xl border border-stone-100 shadow-sm p-4 ${isPurchased ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-amber-50 to-rose-50 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl opacity-70">
          🍼
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <p className={`font-semibold text-stone-800 ${isPurchased ? 'line-through text-stone-400' : ''}`}>
              {item.product_name}
            </p>
            <StatusBadge status={item.status} />
          </div>
          <p className="text-sm text-stone-500 mb-2">
            <span className="text-stone-400">{getCategoryLabel(item.category_slug)}</span>
            {' · '}
            <span className="font-medium text-stone-600">{item.price_range}</span>
          </p>

          {/* Pending: show claimer */}
          {item.status === 'pending' && item.claimer_name && (
            <p className="text-xs text-amber-600 mb-2">
              🛒 {item.claimer_name} is getting this
            </p>
          )}

          {/* Links & actions */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {item.affiliate_url && (
              <a
                href={item.affiliate_url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors"
              >
                View on Amazon →
              </a>
            )}

            {/* Available: show claim button */}
            {item.status === 'available' && !showNameInput && (
              <button
                onClick={() => setShowNameInput(true)}
                className="text-sm font-medium text-emerald-600 hover:text-emerald-700 border border-emerald-200 rounded-lg px-3 py-1 transition-colors"
              >
                I&apos;m getting this
              </button>
            )}

            {/* Pending: show purchased button */}
            {item.status === 'pending' && (
              <button
                onClick={handlePurchased}
                disabled={updating}
                className="text-sm font-medium text-stone-600 hover:text-stone-700 border border-stone-200 rounded-lg px-3 py-1 transition-colors disabled:opacity-50"
              >
                {updating ? 'Updating...' : 'I bought it! ✓'}
              </button>
            )}
          </div>

          {/* Inline name input */}
          {showNameInput && item.status === 'available' && (
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                value={claimingName}
                onChange={(e) => setClaimingName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleClaim()}
                placeholder="Your name"
                className="flex-1 text-sm border border-stone-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-transparent"
                autoFocus
              />
              <button
                onClick={handleClaim}
                disabled={updating || !claimingName.trim()}
                className="text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg px-3 py-1.5 transition-colors disabled:opacity-50"
              >
                {updating ? '...' : 'Confirm'}
              </button>
              <button
                onClick={() => { setShowNameInput(false); setClaimingName('') }}
                className="text-sm text-stone-400 hover:text-stone-600"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function SharedRegistryPage() {
  const params = useParams()
  const id = params?.id as string

  const [registry, setRegistry] = useState<Registry | null>(null)
  const [items, setItems] = useState<RegistryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  async function fetchRegistry() {
    if (!id) return

    const { data: reg, error: regError } = await supabase
      .from('registries')
      .select('*')
      .eq('id', id)
      .single()

    if (regError || !reg) {
      setNotFound(true)
      setLoading(false)
      return
    }

    const { data: registryItems, error: itemsError } = await supabase
      .from('registry_items')
      .select('*')
      .eq('registry_id', id)
      .order('created_at', { ascending: true })

    if (itemsError) {
      setNotFound(true)
      setLoading(false)
      return
    }

    setRegistry(reg)
    setItems(registryItems ?? [])
    setLoading(false)
  }

  useEffect(() => {
    fetchRegistry()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4 animate-pulse">👶</div>
        <p className="text-stone-500">Loading registry...</p>
      </div>
    )
  }

  if (notFound || !registry) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-xl font-semibold text-stone-700 mb-2">Registry not found</h2>
        <p className="text-stone-500 mb-8">
          This registry link may have expired or been removed.
        </p>
        <Link
          href="/"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Build Your Own Registry →
        </Link>
      </div>
    )
  }

  const availableCount = items.filter((i) => i.status === 'available').length
  const purchasedCount = items.filter((i) => i.status === 'purchased').length

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">👶</div>
        <h1 className="text-3xl font-bold text-stone-800 mb-1">{registry.name}</h1>
        <p className="text-stone-500 text-base">
          Help them get ready for baby! Pick something from the list below.
        </p>
        {items.length > 0 && (
          <p className="text-sm text-stone-400 mt-2">
            {availableCount} item{availableCount !== 1 ? 's' : ''} still available
            {purchasedCount > 0 && ` · ${purchasedCount} already purchased`}
          </p>
        )}
      </div>

      {/* Items */}
      {items.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl border border-stone-100 shadow-sm">
          <p className="text-stone-500">No items in this registry yet.</p>
        </div>
      ) : (
        <div className="space-y-3 mb-12">
          {items.map((item) => (
            <RegistryItemCard
              key={item.id}
              item={item}
              onRefresh={fetchRegistry}
            />
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="text-center border-t border-stone-100 pt-8">
        <p className="text-sm text-stone-400 mb-3">Want to create your own baby registry?</p>
        <Link
          href="/"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Build your own registry →
        </Link>
      </div>
    </div>
  )
}
