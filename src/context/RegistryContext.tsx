'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Product } from '@/lib/data'

const STORAGE_KEY = 'btb-registry'

function parseMinPrice(priceRange: string): number {
  const match = priceRange.match(/\$[\d,]+/)
  if (!match) return 0
  return parseInt(match[0].replace(/[$,]/g, ''), 10)
}

function getCategoryFromId(productId: string): string {
  // "sleep-1" → "sleep", "comfort-1" → "comfort"
  return productId.replace(/-\d+$/, '')
}

interface RegistryContextValue {
  selections: Record<string, Product>
  addToRegistry: (product: Product) => void
  removeFromRegistry: (productId: string) => void
  clearRegistry: () => void
  loadRegistry: (products: Product[]) => void
  totalItems: number
  estimatedTotal: number
}

const RegistryContext = createContext<RegistryContextValue | null>(null)

export function RegistryProvider({ children }: { children: ReactNode }) {
  const [selections, setSelections] = useState<Record<string, Product>>({})

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setSelections(JSON.parse(stored))
    } catch {
      // ignore parse errors
    }
  }, [])

  function persist(next: Record<string, Product>) {
    setSelections(next)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }
  }

  function addToRegistry(product: Product) {
    const category = getCategoryFromId(product.id)
    // Remove any existing product in the same category
    const without = Object.fromEntries(
      Object.entries(selections).filter(
        ([id]) => getCategoryFromId(id) !== category
      )
    )
    persist({ ...without, [product.id]: product })
  }

  function removeFromRegistry(productId: string) {
    const next = { ...selections }
    delete next[productId]
    persist(next)
  }

  function clearRegistry() {
    persist({})
  }

  function loadRegistry(products: Product[]) {
    const next = Object.fromEntries(products.map((p) => [p.id, p]))
    persist(next)
  }

  const totalItems = Object.keys(selections).length
  const estimatedTotal = Object.values(selections).reduce(
    (sum, p) => sum + parseMinPrice(p.priceRange),
    0
  )

  return (
    <RegistryContext.Provider
      value={{ selections, addToRegistry, removeFromRegistry, clearRegistry, loadRegistry, totalItems, estimatedTotal }}
    >
      {children}
    </RegistryContext.Provider>
  )
}

export function useRegistry(): RegistryContextValue {
  const ctx = useContext(RegistryContext)
  if (!ctx) throw new Error('useRegistry must be used within RegistryProvider')
  return ctx
}
