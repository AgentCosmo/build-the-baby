# 🍼 Build The Baby

> A PC Part Picker-style planner for new parents.

Build The Baby helps expectant parents assemble a complete, curated baby registry — category by category — without drowning in blog posts and "top 10" listicles.

---

## What It Does

- Browse gear organized by **6 categories**: Sleep, Feeding, Bathing, Travel, Nursery, and Clothing
- Each category shows **3–5 hand-curated products** with descriptions, price ranges, star ratings, and Amazon affiliate links
- Clean, warm, mobile-responsive design built for trust and ease of use

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase *(scaffolded, not connected)* |
| Affiliate | Amazon Associates style links |
| Fonts | Geist (via `next/font/google`) |

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with Nav + Footer
│   ├── page.tsx                # Homepage: hero + category cards
│   ├── globals.css             # Global styles + warm color palette
│   └── category/
│       └── [slug]/
│           └── page.tsx        # Dynamic category product listing
├── components/
│   ├── Nav.tsx                 # Sticky top nav with category links
│   └── ProductCard.tsx         # Product card with rating + CTA
└── lib/
    ├── data.ts                 # Hardcoded categories + product data
    └── supabase.ts             # Supabase client (scaffolded, commented out)
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root when you're ready to connect Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Then uncomment the code in `src/lib/supabase.ts`.

---

## Affiliate Links

All "View on Amazon" links use the `?tag=buildthebaby-20` Associates tag (placeholder). Replace with your actual Amazon Associates tag before launch.

Links include `rel="noopener noreferrer sponsored"` for SEO compliance.

---

## Roadmap

- [ ] Connect Supabase for dynamic product data
- [ ] User registry builder (save + share lists)
- [ ] Product comparison view
- [ ] Admin CMS for managing products
- [ ] Price tracking / deal alerts
- [ ] More categories (health & safety, toys & play, postpartum)

---

## License

MIT
