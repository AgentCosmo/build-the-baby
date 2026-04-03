import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.buildthebaby.com'

const categorySlugs = [
  'sleep',
  'feeding',
  'bathing',
  'travel',
  'nursery',
  'clothing',
  'diapering',
  'comfort-play',
]

const guideSlugs = [
  'best-baby-monitors-under-100',
  'best-budget-baby-registry',
  'safest-baby-car-seats-under-200',
  'baby-registry-under-1000',
  'best-white-noise-machines-babies',
  'best-strollers-newborns-2026',
  'best-baby-bouncers-swings-2026',
  'how-to-choose-baby-carrier',
  'best-diaper-bags-2026',
  'newborn-sleep-guide',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/registry`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${BASE_URL}/guides/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...categoryPages, ...guidePages]
}
