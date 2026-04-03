import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Link from 'next/link'
import { RegistryProvider } from '@/context/RegistryContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Build The Baby — Your Complete Baby Registry Planner',
  description:
    'The one-stop planner for new parents. Build your perfect baby registry by category with expert-curated picks and affiliate links.',
  openGraph: {
    title: 'Build The Baby',
    description: 'Build your complete baby registry, category by category.',
    siteName: 'Build The Baby',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased bg-[#fdfaf6] text-stone-900">
        <RegistryProvider>
        <Nav />
        <main className="flex-1">{children}</main>
        </RegistryProvider>
        <footer className="border-t border-amber-100 bg-white mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-stone-400">
            <nav className="flex items-center justify-center gap-6 mb-4 text-stone-500">
              <Link href="/about" className="hover:text-amber-600 transition-colors font-medium">
                About
              </Link>
              <span className="text-stone-300">|</span>
              <Link href="/contact" className="hover:text-amber-600 transition-colors font-medium">
                Contact
              </Link>
              <span className="text-stone-300">|</span>
              <Link href="/privacy" className="hover:text-amber-600 transition-colors font-medium">
                Privacy Policy
              </Link>
            </nav>
            <p className="mb-1">
              🍼 <span className="font-semibold text-stone-500">Build The Baby</span> — your complete baby registry planner
            </p>
            <p>
              Links marked &quot;View on Amazon&quot; are affiliate links. We may earn a small commission at no extra cost to you.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
