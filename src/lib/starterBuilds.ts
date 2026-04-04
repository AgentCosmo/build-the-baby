import { categories, Product } from '@/lib/data'

export interface StarterBuild {
  id: string
  title: string
  tagline: string
  priceRange: string
  accent: {
    badge: string
    heading: string
    button: string
    border: string
    bg: string
    icon: string
  }
  productIds: string[]
}

// Flatten all products for easy lookup
const allProducts: Record<string, Product> = Object.fromEntries(
  categories.flatMap((c) => c.products.map((p) => [p.id, p]))
)

export function resolveProducts(ids: string[]): Product[] {
  return ids.flatMap((id) => (allProducts[id] ? [allProducts[id]] : []))
}

export const starterBuilds: StarterBuild[] = [
  {
    id: 'budget',
    title: 'The Budget Build',
    tagline: "Every practical essential — nothing you'll regret buying.",
    priceRange: '$340–$470',
    accent: {
      badge: 'bg-amber-100 text-amber-700 border-amber-200',
      heading: 'text-amber-700',
      button: 'bg-amber-500 hover:bg-amber-600 text-white',
      border: 'border-amber-200',
      bg: 'bg-amber-50',
      icon: '💛',
    },
    // sleep-2: Halo Bassinest, sleep-5: Love to Dream Swaddle,
    // feeding-2: Haakaa, feeding-4: Boppy,
    // bathing-2: Frida Baby Tub, diapering-1: Pampers,
    // comfort-1: Philips Soothie Pacifier
    productIds: ['sleep-2', 'sleep-5', 'feeding-2', 'feeding-4', 'bathing-2', 'diapering-1', 'comfort-1'],
  },
  {
    id: 'premium',
    title: 'The Premium Build',
    tagline: 'Best-of-the-best editor picks — worth every penny.',
    priceRange: '$3,100+',
    accent: {
      badge: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      heading: 'text-indigo-700',
      button: 'bg-indigo-500 hover:bg-indigo-600 text-white',
      border: 'border-indigo-200',
      bg: 'bg-indigo-50',
      icon: '💜',
    },
    // sleep-1: SNOO, sleep-3: Newton Mattress,
    // feeding-1: Spectra S2, feeding-3: Dr. Brown's Bottles,
    // travel-1: UPPAbaby VISTA, travel-2: Chicco KeyFit 35,
    // nursery-5: Nanit Pro Monitor, bathing-1: Angelcare Bath Support
    productIds: ['sleep-1', 'sleep-3', 'feeding-1', 'feeding-3', 'travel-1', 'travel-2', 'nursery-5', 'bathing-1'],
  },
  {
    id: 'minimalist',
    title: 'The Minimalist Build',
    tagline: 'Only what you truly need. Ruthlessly edited.',
    priceRange: '$690–$980',
    accent: {
      badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      heading: 'text-emerald-700',
      button: 'bg-emerald-500 hover:bg-emerald-600 text-white',
      border: 'border-emerald-200',
      bg: 'bg-emerald-50',
      icon: '💚',
    },
    // sleep-2: Halo Bassinest, sleep-3: Newton Mattress,
    // feeding-2: Haakaa (lean pump), feeding-4: Boppy,
    // diapering-1: Pampers, travel-2: Chicco KeyFit 35
    productIds: ['sleep-2', 'sleep-3', 'feeding-2', 'feeding-4', 'diapering-1', 'travel-2'],
  },
]
