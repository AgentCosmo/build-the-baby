'use client'

import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

const THEMES = {
  pink: {
    bg: 'linear-gradient(160deg, #fff5f7 0%, #fdf0ff 100%)',
    envelopeBody: '#fce7f3',
    envelopeBorder: '#f9a8d4',
    envelopeInner: '#fbcfe8',
    flapFill: '#f9a8d4',
    flapLine: '#f472b6',
    tagColor: '#d4a0b5',
  },
  blue: {
    bg: 'linear-gradient(160deg, #eff6ff 0%, #f0f9ff 100%)',
    envelopeBody: '#dbeafe',
    envelopeBorder: '#93c5fd',
    envelopeInner: '#bfdbfe',
    flapFill: '#93c5fd',
    flapLine: '#60a5fa',
    tagColor: '#93b4d4',
  },
  surprise: {
    bg: 'linear-gradient(160deg, #fefce8 0%, #f0fdf4 100%)',
    envelopeBody: '#fef9c3',
    envelopeBorder: '#fde047',
    envelopeInner: '#fef08a',
    flapFill: '#fde047',
    flapLine: '#facc15',
    tagColor: '#a3a34a',
  },
}

function EnvelopeReveal({
  registryName,
  gender,
  onDone,
}: {
  registryName: string
  gender: 'girl' | 'boy' | 'surprise' | null
  onDone: () => void
}) {
  const [phase, setPhase] = useState(0)
  const theme = THEMES[gender === 'boy' ? 'blue' : gender === 'surprise' ? 'surprise' : 'pink']
  // 0 = sealed, 1 = flap opening, 2 = card rising, 3 = fading out

  const skip = useCallback(() => {
    setPhase(3)
    setTimeout(onDone, 700)
  }, [onDone])

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 700)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => setPhase(3), 3400)
    const t4 = setTimeout(onDone, 4100)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const W = 320
  const H = 200
  const flapH = 116

  return (
    <div
      onClick={skip}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.bg,
        zIndex: 50,
        cursor: 'pointer',
        opacity: phase === 3 ? 0 : 1,
        transition: 'opacity 0.7s ease',
        pointerEvents: phase === 3 ? 'none' : 'auto',
      }}
    >
      <div style={{ position: 'relative', width: W, height: H + 40 }}>

        {/* Envelope body */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: 0,
          width: W,
          height: H,
          backgroundColor: theme.envelopeBody,
          borderRadius: 10,
          border: `2px solid ${theme.envelopeBorder}`,
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          overflow: 'hidden',
        }}>
          {/* Bottom-left inner triangle */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 0,
            height: 0,
            borderBottom: `${Math.round(H * 0.55)}px solid ${theme.envelopeInner}`,
            borderRight: `${W / 2}px solid transparent`,
          }} />
          {/* Bottom-right inner triangle */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 0,
            height: 0,
            borderBottom: `${Math.round(H * 0.55)}px solid ${theme.envelopeInner}`,
            borderLeft: `${W / 2}px solid transparent`,
          }} />
        </div>

        {/* Letter / card */}
        <div style={{
          position: 'absolute',
          left: 24,
          right: 24,
          top: 30,
          height: H - 20,
          backgroundColor: 'white',
          borderRadius: 8,
          border: `1px solid ${theme.envelopeInner}`,
          boxShadow: phase >= 2 ? '0 8px 32px rgba(0,0,0,0.14)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          zIndex: phase >= 1 ? 5 : 1,
          transform: phase >= 2 ? `translateY(-${Math.round(H * 0.72)}px)` : 'translateY(0)',
          transition: phase >= 2
            ? 'transform 1s cubic-bezier(0.34, 1.5, 0.64, 1), box-shadow 0.4s ease'
            : 'none',
        }}>
          <div style={{ fontSize: 34 }}>👶</div>
          <p style={{
            fontSize: 17,
            fontWeight: 700,
            color: '#1c1917',
            textAlign: 'center',
            lineHeight: 1.3,
            padding: '0 8px',
          }}>
            {registryName}
          </p>
          <p style={{
            fontSize: 11,
            color: theme.tagColor,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            Baby Registry
          </p>
        </div>

        {/* Flap */}
        <div style={{
          position: 'absolute',
          top: 20,
          left: 0,
          width: W,
          height: flapH,
          transformOrigin: 'center bottom',
          transform: phase >= 1
            ? 'perspective(600px) rotateX(-178deg)'
            : 'perspective(600px) rotateX(0deg)',
          transition: 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: phase >= 1 ? 2 : 6,
        }}>
          <svg
            width={W}
            height={flapH}
            viewBox={`0 0 ${W} ${flapH}`}
            style={{ display: 'block' }}
          >
            <polygon
              points={`0,0 ${W},0 ${W / 2},${flapH}`}
              fill={theme.flapFill}
            />
            <line x1="0" y1="0" x2={W / 2} y2={flapH} stroke={theme.flapLine} strokeWidth="1.5" opacity="0.4" />
            <line x1={W} y1="0" x2={W / 2} y2={flapH} stroke={theme.flapLine} strokeWidth="1.5" opacity="0.4" />
          </svg>
        </div>
      </div>

      <p style={{
        marginTop: 28,
        fontSize: 13,
        color: theme.tagColor,
        opacity: phase >= 2 ? 1 : 0,
        transition: 'opacity 0.5s ease 0.5s',
      }}>
        Tap anywhere to continue
      </p>
    </div>
  )
}

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
  gender: 'girl' | 'boy' | 'surprise' | null
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
  const [showEnvelope, setShowEnvelope] = useState(true)

  async function fetchRegistry() {
    if (!id) return

    const { data: reg, error: regError } = await supabase
      .from('registries')
      .select('id, name, gender, created_at')
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
    <>
      {showEnvelope && (
        <EnvelopeReveal
          registryName={registry.name}
          gender={registry.gender}
          onDone={() => setShowEnvelope(false)}
        />
      )}
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
    </>
  )
}
