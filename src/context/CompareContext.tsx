'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Product } from '@/lib/data'

interface CompareContextType {
  compareItems: Product[]
  addToCompare: (product: Product) => string | null
  removeFromCompare: (id: string) => void
  clearCompare: () => void
  isInCompare: (id: string) => boolean
}

const CompareContext = createContext<CompareContextType | null>(null)

function getCategorySlug(productId: string): string {
  return productId.replace(/-\d+$/, '')
}

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareItems, setCompareItems] = useState<Product[]>([])

  function addToCompare(product: Product): string | null {
    if (compareItems.some((p) => p.id === product.id)) return null

    if (compareItems.length >= 3) {
      return 'Remove one item to compare another'
    }

    if (compareItems.length > 0) {
      const existingCategory = getCategorySlug(compareItems[0].id)
      const newCategory = getCategorySlug(product.id)
      if (existingCategory !== newCategory) {
        return 'You can only compare products within the same category'
      }
    }

    setCompareItems((prev) => [...prev, product])
    return null
  }

  function removeFromCompare(id: string) {
    setCompareItems((prev) => prev.filter((p) => p.id !== id))
  }

  function clearCompare() {
    setCompareItems([])
  }

  function isInCompare(id: string) {
    return compareItems.some((p) => p.id === id)
  }

  return (
    <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error('useCompare must be used within CompareProvider')
  return ctx
}
