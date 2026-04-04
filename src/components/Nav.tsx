'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { categoryNavItems } from '@/lib/data'
import RegistryNavBadge from '@/components/RegistryNavBadge'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-white border-b border-amber-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.png" alt="BuildTheBaby logo" width={160} height={143} className="object-contain h-16 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">

            {/* Products dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                🛍️ Products
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {open && (
                <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-2xl border border-stone-100 shadow-xl py-2 z-50">
                  {categoryNavItems.map(({ slug, name, emoji }) => (
                    <Link
                      key={slug}
                      href={`/category/${slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                    >
                      <span className="text-base">{emoji}</span>
                      <span className="font-medium">{name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Starter Builds */}
            <Link
              href="/starter-builds"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
            >
              ✨ Starter Builds
            </Link>

            {/* Guides */}
            <Link
              href="/guides"
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              📖 Guides
            </Link>
          </nav>

          {/* Right side: registry badge + mobile hamburger */}
          <div className="flex items-center gap-2">
            <RegistryNavBadge />

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg text-stone-500 hover:bg-amber-50 hover:text-amber-700 transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-amber-100 py-3 space-y-1">
            <p className="px-3 pb-1 text-xs font-semibold text-stone-400 uppercase tracking-wider">Products</p>
            {categoryNavItems.map(({ slug, name, emoji }) => (
              <Link
                key={slug}
                href={`/category/${slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                <span>{emoji}</span>
                <span className="font-medium">{name}</span>
              </Link>
            ))}
            <div className="border-t border-stone-100 pt-2 mt-1 space-y-1">
              <Link
                href="/starter-builds"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                <span>✨</span>
                <span>Starter Builds</span>
              </Link>
              <Link
                href="/guides"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-amber-700 hover:bg-amber-50 transition-colors"
              >
                <span>📖</span>
                <span>Guides</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
