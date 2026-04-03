import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Build The Baby',
  description:
    'Have a question, suggestion, or product to recommend? We\'d love to hear from you at support@buildthebaby.com.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 via-rose-50 to-stone-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-amber-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-amber-200 rounded-full px-4 py-1.5 text-sm text-amber-700 font-medium mb-6">
            <span>✉️</span> Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-800 mb-4">
            We&apos;d love to hear from you
          </h1>
          <p className="text-lg text-stone-500 max-w-2xl mx-auto leading-relaxed">
            Have a question, suggestion, or a product you think we should feature? Drop us a line.
          </p>
        </div>
      </section>

      {/* Contact card */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8 sm:p-10 text-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl mx-auto mb-6">
            📬
          </div>
          <h2 className="text-xl font-bold text-stone-800 mb-3">Reach out anytime</h2>
          <p className="text-stone-500 leading-relaxed mb-6">
            Whether you&apos;ve spotted a product we missed, have feedback on one of our guides, or
            just want to say hello — we read every message and do our best to reply within a day or two.
          </p>
          <a
            href="mailto:support@buildthebaby.com"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-3.5 rounded-2xl transition-colors shadow-md text-lg"
          >
            ✉️ support@buildthebaby.com
          </a>
          <p className="text-sm text-stone-400 mt-6">We read every message. Promise.</p>
        </div>

        {/* What to reach out about */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 text-center">
            <div className="text-2xl mb-2">🔍</div>
            <p className="font-semibold text-stone-700 text-sm mb-1">Product suggestions</p>
            <p className="text-stone-400 text-xs leading-relaxed">Know something great we haven&apos;t covered? Tell us.</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 text-center">
            <div className="text-2xl mb-2">🐛</div>
            <p className="font-semibold text-stone-700 text-sm mb-1">Something broken?</p>
            <p className="text-stone-400 text-xs leading-relaxed">Broken link, wrong price, outdated info — we want to know.</p>
          </div>
          <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 text-center">
            <div className="text-2xl mb-2">💬</div>
            <p className="font-semibold text-stone-700 text-sm mb-1">General feedback</p>
            <p className="text-stone-400 text-xs leading-relaxed">Thoughts, ideas, or just want to connect? We&apos;re here.</p>
          </div>
        </div>
      </section>
    </>
  )
}
