import Link from 'next/link'
import Image from 'next/image'
import { categoryNavItems } from '@/lib/data'
import RegistryNavBadge from '@/components/RegistryNavBadge'

export default function Nav() {
  return (
    <header className="bg-white border-b border-amber-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="BuildTheBaby logo" width={40} height={60} className="object-contain" />
          </Link>

          {/* Category nav — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1 overflow-x-auto">
            {categoryNavItems.map(({ slug, name, emoji }) => (
              <Link
                key={slug}
                href={`/category/${slug}`}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors whitespace-nowrap"
              >
                <span>{emoji}</span>
                <span>{name}</span>
              </Link>
            ))}
          </nav>

          {/* Registry link */}
          <RegistryNavBadge />

          {/* Mobile: categories label */}
          <Link
            href="/#categories"
            className="md:hidden text-sm font-medium text-amber-700 border border-amber-300 rounded-full px-3 py-1.5 hover:bg-amber-50 transition-colors"
          >
            Categories
          </Link>
        </div>
      </div>
    </header>
  )
}
