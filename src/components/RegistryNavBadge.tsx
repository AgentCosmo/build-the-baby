'use client'

import Link from 'next/link'
import { useRegistry } from '@/context/RegistryContext'

export default function RegistryNavBadge() {
  const { totalItems } = useRegistry()

  return (
    <Link
      href="/registry"
      className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
      aria-label={`My Registry${totalItems > 0 ? ` — ${totalItems} item${totalItems === 1 ? '' : 's'}` : ''}`}
    >
      <span>🛒</span>
      <span className="hidden sm:inline">Registry</span>
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  )
}
