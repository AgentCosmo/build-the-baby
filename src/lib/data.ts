export interface Product {
  id: string
  name: string
  description: string
  priceRange: string
  affiliateUrl: string
  rating: number
  tag?: string
}

export interface Category {
  slug: string
  name: string
  emoji: string
  tagline: string
  color: string
  products: Product[]
}

export const categories: Category[] = [
  {
    slug: 'sleep',
    name: 'Sleep',
    emoji: '🌙',
    tagline: 'Safe, restful sleep for your little one',
    color: 'bg-indigo-50 border-indigo-200',
    products: [
      {
        id: 'sleep-1',
        name: 'SNOO Smart Sleeper Bassinet',
        description:
          'Award-winning responsive bassinet that automatically soothes your baby back to sleep with gentle rocking and white noise.',
        priceRange: '$1,295–$1,695',
        affiliateUrl: 'https://www.amazon.com/s?k=SNOO+Smart+Sleeper+Bassinet&tag=buildthebaby-20',
        rating: 4.8,
        tag: "Editor's Pick",
      },
      {
        id: 'sleep-2',
        name: 'Halo Bassinest Swivel Sleeper',
        description:
          'Swivels 360° for easy access from bed. Includes soothing sounds, vibration, and a night light.',
        priceRange: '$179–$249',
        affiliateUrl: 'https://www.amazon.com/s?k=Halo+Bassinest+Swivel+Sleeper&tag=buildthebaby-20',
        rating: 4.6,
      },
      {
        id: 'sleep-3',
        name: 'Newton Baby Crib Mattress',
        description:
          '100% breathable, washable crib mattress with Wovenaire core. GREENGUARD Gold certified.',
        priceRange: '$199–$329',
        affiliateUrl: 'https://www.amazon.com/s?k=Newton+Baby+Crib+Mattress&tag=buildthebaby-20',
        rating: 4.7,
        tag: 'Best for Safety',
      },
      {
        id: 'sleep-4',
        name: 'Yogasleep Dohm Classic White Noise Machine',
        description:
          'The original fan-based sound machine. Natural white noise masks disruptive sounds for better sleep.',
        priceRange: '$34–$44',
        affiliateUrl: 'https://www.amazon.com/s?k=Yogasleep+Dohm+Classic+White+Noise+Machine&tag=buildthebaby-20',
        rating: 4.6,
      },
      {
        id: 'sleep-5',
        name: 'Love to Dream Swaddle UP',
        description:
          'Unique arms-up swaddle design that mimics the womb while allowing natural self-soothing.',
        priceRange: '$29–$39',
        affiliateUrl: 'https://www.amazon.com/s?k=Love+to+Dream+Swaddle+UP&tag=buildthebaby-20',
        rating: 4.5,
      },
    ],
  },
  {
    slug: 'feeding',
    name: 'Feeding',
    emoji: '🍼',
    tagline: 'Everything you need to nourish your baby',
    color: 'bg-yellow-50 border-yellow-200',
    products: [
      {
        id: 'feeding-1',
        name: 'Spectra S2 Plus Electric Breast Pump',
        description:
          'Hospital-strength double electric pump with customizable settings and quiet motor.',
        priceRange: '$149–$199',
        affiliateUrl: 'https://www.amazon.com/s?k=Spectra+S2+Plus+Electric+Breast+Pump&tag=buildthebaby-20',
        rating: 4.7,
        tag: 'Top Rated',
      },
      {
        id: 'feeding-2',
        name: 'Haakaa Manual Breast Pump',
        description:
          'Simple silicone pump that works via suction — perfect for catching letdown on the other side.',
        priceRange: '$13–$18',
        affiliateUrl: 'https://www.amazon.com/s?k=Haakaa+Manual+Breast+Pump+Silicone&tag=buildthebaby-20',
        rating: 4.6,
        tag: 'Budget Pick',
      },
      {
        id: 'feeding-3',
        name: "Dr. Brown's Original Wide-Neck Baby Bottles",
        description:
          'Clinically proven to reduce colic, gas, and spit-up. Internal vent system mimics breastfeeding.',
        priceRange: '$22–$35',
        affiliateUrl: 'https://www.amazon.com/s?k=Dr+Browns+Original+Wide+Neck+Baby+Bottles&tag=buildthebaby-20',
        rating: 4.6,
      },
      {
        id: 'feeding-4',
        name: 'Boppy Original Nursing Pillow',
        description:
          'Iconic C-shaped nursing and infant support pillow. Versatile enough for tummy time too.',
        priceRange: '$40–$55',
        affiliateUrl: 'https://www.amazon.com/s?k=Boppy+Original+Nursing+Pillow&tag=buildthebaby-20',
        rating: 4.7,
      },
      {
        id: 'feeding-5',
        name: 'Lansinoh Breastmilk Storage Bags',
        description:
          'Pre-sterilized, BPA-free bags with double zipper seal. Easy write-on labels for date & volume.',
        priceRange: '$14–$22',
        affiliateUrl: 'https://www.amazon.com/s?k=Lansinoh+Breastmilk+Storage+Bags&tag=buildthebaby-20',
        rating: 4.8,
      },
      {
        id: 'feeding-6',
        name: 'Enfamil NeuroPro Infant Formula',
        description:
          'Brain-building formula with MFGM & DHA. Closest to breast milk available. Gentle on tiny tummies.',
        priceRange: '$39–$49',
        affiliateUrl: 'https://www.amazon.com/s?k=Enfamil+NeuroPro+Infant+Formula&tag=buildthebaby-20',
        rating: 4.7,
        tag: 'Top Formula',
      },
      {
        id: 'feeding-7',
        name: 'Happy Baby Organics Stage 1 Pouches',
        description:
          'USDA organic single-ingredient fruit & veggie purees. BPA-free pouches, no added salt or sugar.',
        priceRange: '$18–$24',
        affiliateUrl: 'https://www.amazon.com/s?k=Happy+Baby+Organics+Stage+1+Pouches&tag=buildthebaby-20',
        rating: 4.6,
      },
    ],
  },
  {
    slug: 'bathing',
    name: 'Bathing',
    emoji: '🛁',
    tagline: 'Make bath time safe and splashy fun',
    color: 'bg-sky-50 border-sky-200',
    products: [
      {
        id: 'bathing-1',
        name: 'Angelcare Soft Touch Baby Bath Support',
        description:
          'Mesh sling-style bath seat that supports newborns hands-free in the tub at the perfect angle.',
        priceRange: '$32–$42',
        affiliateUrl: 'https://www.amazon.com/s?k=Angelcare+Soft+Touch+Baby+Bath+Support&tag=buildthebaby-20',
        rating: 4.5,
        tag: "Editor's Pick",
      },
      {
        id: 'bathing-2',
        name: 'Frida Baby 4-in-1 Grow-with-Me Baby Bathtub',
        description:
          'Converts from newborn to toddler. Includes removable newborn insert and non-slip base.',
        priceRange: '$39–$49',
        affiliateUrl: 'https://www.amazon.com/s?k=Frida+Baby+4+in+1+Grow+with+Me+Bathtub&tag=buildthebaby-20',
        rating: 4.6,
      },
      {
        id: 'bathing-3',
        name: 'Aveeno Baby Wash & Shampoo',
        description:
          'Tear-free, hypoallergenic formula with natural oat extract. Gentle enough for daily use.',
        priceRange: '$9–$14',
        affiliateUrl: 'https://www.amazon.com/s?k=Aveeno+Baby+Wash+Shampoo&tag=buildthebaby-20',
        rating: 4.8,
      },
      {
        id: 'bathing-4',
        name: 'Summer Infant Digital Bath Thermometer',
        description:
          'Floating duck thermometer with digital readout. Alerts when water is too hot (>104°F).',
        priceRange: '$9–$14',
        affiliateUrl: 'https://www.amazon.com/s?k=Summer+Infant+Digital+Bath+Thermometer&tag=buildthebaby-20',
        rating: 4.5,
      },
    ],
  },
  {
    slug: 'travel',
    name: 'Travel',
    emoji: '✈️',
    tagline: 'Hit the road (and skies) with confidence',
    color: 'bg-green-50 border-green-200',
    products: [
      {
        id: 'travel-1',
        name: 'UPPAbaby VISTA V2 Stroller',
        description:
          'Premium full-size stroller that grows with your family. Converts to double stroller for a second child.',
        priceRange: '$899–$999',
        affiliateUrl: 'https://www.amazon.com/s?k=UPPAbaby+VISTA+V2+Stroller&tag=buildthebaby-20',
        rating: 4.8,
        tag: 'Best Overall',
      },
      {
        id: 'travel-2',
        name: 'Chicco KeyFit 35 Infant Car Seat',
        description:
          'Easy-to-install infant seat with SuperCinch LATCH tightener and bubble level indicator.',
        priceRange: '$229–$279',
        affiliateUrl: 'https://www.amazon.com/s?k=Chicco+KeyFit+35+Infant+Car+Seat&tag=buildthebaby-20',
        rating: 4.7,
        tag: 'Safety Certified',
      },
      {
        id: 'travel-3',
        name: 'Ergobaby Omni 360 Baby Carrier',
        description:
          'All-position carrier suitable from newborn (7 lbs) through toddler (45 lbs). Lumbar support included.',
        priceRange: '$160–$180',
        affiliateUrl: 'https://www.amazon.com/s?k=Ergobaby+Omni+360+Baby+Carrier&tag=buildthebaby-20',
        rating: 4.7,
      },
      {
        id: 'travel-4',
        name: 'Skip Hop Forma Diaper Backpack',
        description:
          'Stylish backpack with 16+ pockets, insulated bottle pockets, and stroller straps.',
        priceRange: '$99–$119',
        affiliateUrl: 'https://www.amazon.com/s?k=Skip+Hop+Forma+Diaper+Backpack&tag=buildthebaby-20',
        rating: 4.6,
      },
    ],
  },
  {
    slug: 'nursery',
    name: 'Nursery',
    emoji: '🏡',
    tagline: 'Create the perfect cozy space',
    color: 'bg-rose-50 border-rose-200',
    products: [
      {
        id: 'nursery-1',
        name: 'Delta Children Emery 4-in-1 Convertible Crib',
        description:
          'Converts from crib → toddler bed → daybed → full-size bed. JPMA certified, solid pine construction.',
        priceRange: '$219–$279',
        affiliateUrl: 'https://www.amazon.com/s?k=Delta+Children+Emery+4+in+1+Convertible+Crib&tag=buildthebaby-20',
        rating: 4.7,
        tag: 'Best Value',
      },
      {
        id: 'nursery-2',
        name: 'Graco Blossom 6-in-1 Convertible High Chair',
        description:
          'Grows from infant to toddler with 6 unique seating configurations. Easy to clean seat pad.',
        priceRange: '$169–$199',
        affiliateUrl: 'https://www.amazon.com/s?k=Graco+Blossom+6+in+1+Convertible+High+Chair&tag=buildthebaby-20',
        rating: 4.6,
      },
      {
        id: 'nursery-3',
        name: 'Nursery Glider & Ottoman',
        description:
          'Upholstered glider with smooth gliding motion and matching ottoman. Perfect for late-night feeds.',
        priceRange: '$199–$499',
        affiliateUrl: 'https://www.amazon.com/s?k=nursery+glider+ottoman+rocking+chair&tag=buildthebaby-20',
        rating: 4.5,
        tag: 'Splurge Pick',
      },
      {
        id: 'nursery-4',
        name: 'Fridababy NoseFrida Snotsucker',
        description:
          'The original snot sucker. Pediatrician recommended — no more bulb syringes.',
        priceRange: '$16–$22',
        affiliateUrl: 'https://www.amazon.com/s?k=Fridababy+NoseFrida+Snotsucker&tag=buildthebaby-20',
        rating: 4.7,
      },
      {
        id: 'nursery-5',
        name: 'Nanit Pro Smart Baby Monitor',
        description:
          'HD wall-mounted monitor with sleep tracking, breathing motion band, and two-way audio.',
        priceRange: '$299–$349',
        affiliateUrl: 'https://www.amazon.com/s?k=Nanit+Pro+Smart+Baby+Monitor&tag=buildthebaby-20',
        rating: 4.6,
      },
    ],
  },
  {
    slug: 'clothing',
    name: 'Clothing',
    emoji: '👕',
    tagline: 'Soft, practical, and absolutely adorable',
    color: 'bg-purple-50 border-purple-200',
    products: [
      {
        id: 'clothing-1',
        name: "Burt's Bees Baby Snap-Front Footie PJs",
        description:
          '100% organic cotton snap-front footies. No struggling with zippers in the middle of the night.',
        priceRange: '$35–$45',
        affiliateUrl: "https://www.amazon.com/s?k=Burt%27s+Bees+Baby+Snap+Front+Footie+Pajamas&tag=buildthebaby-20",
        rating: 4.7,
        tag: 'Best Seller',
      },
      {
        id: 'clothing-2',
        name: "Carter's Baby Neutral Layette Set",
        description:
          'Complete starter wardrobe: bodysuits, pants, hats, and socks in gender-neutral colors.',
        priceRange: '$38–$50',
        affiliateUrl: "https://www.amazon.com/s?k=Carter%27s+Baby+Neutral+Layette+Set&tag=buildthebaby-20",
        rating: 4.8,
      },
      {
        id: 'clothing-3',
        name: 'Gerber Baby Onesies Bodysuits',
        description:
          'Soft 100% cotton lap-shoulder bodysuits. Easy diaper changes with triple snap closure.',
        priceRange: '$22–$30',
        affiliateUrl: 'https://www.amazon.com/s?k=Gerber+Baby+Onesies+Bodysuits+multipack&tag=buildthebaby-20',
        rating: 4.7,
      },
      {
        id: 'clothing-4',
        name: "Simple Joys by Carter's Fleece Sleeper",
        description:
          'Plush fleece one-piece pajamas with zipper for easy night changes. Covers feet.',
        priceRange: '$24–$32',
        affiliateUrl: "https://www.amazon.com/s?k=Simple+Joys+by+Carter%27s+Fleece+Sleeper+3+Pack&tag=buildthebaby-20",
        rating: 4.6,
      },
      {
        id: 'clothing-5',
        name: 'Columbia Baby Bunting Fleece Coverall',
        description:
          'Warm full-zip fleece bunting bag with fold-over mittens and booties. Perfect for stroller rides in cool weather.',
        priceRange: '$35–$50',
        affiliateUrl: 'https://www.amazon.com/s?k=Columbia+Baby+Bunting+Fleece+Coverall&tag=buildthebaby-20',
        rating: 4.6,
        tag: 'Cold Weather Pick',
      },
    ],
  },
  {
    slug: 'diapering',
    name: 'Diapering',
    emoji: '🧷',
    tagline: 'Keep baby clean, dry, and comfortable',
    color: 'bg-orange-50 border-orange-200',
    products: [
      {
        id: 'diapering-1',
        name: 'Pampers Swaddlers Newborn Diapers',
        description:
          'The #1 choice of US hospitals. Wetness indicator changes color when wet, and umbilical cord notch for newborns.',
        priceRange: '$32–$42',
        affiliateUrl: 'https://www.amazon.com/s?k=Pampers+Swaddlers+Newborn+Diapers+Size+1&tag=buildthebaby-20',
        rating: 4.8,
        tag: 'Best Seller',
      },
      {
        id: 'diapering-2',
        name: 'WaterWipes Original Baby Wipes',
        description:
          '99.9% purified water and a drop of fruit extract. The purest baby wipes for sensitive newborn skin.',
        priceRange: '$28–$36',
        affiliateUrl: 'https://www.amazon.com/s?k=WaterWipes+Original+Baby+Wipes&tag=buildthebaby-20',
        rating: 4.7,
        tag: 'Sensitive Skin',
      },
      {
        id: 'diapering-3',
        name: 'Ubbi Steel Diaper Pail',
        description:
          'Powder-coated steel pail with sliding lid lock that seals in odors. Uses any tall kitchen bag — no proprietary refills.',
        priceRange: '$79–$99',
        affiliateUrl: 'https://www.amazon.com/s?k=Ubbi+Steel+Diaper+Pail&tag=buildthebaby-20',
        rating: 4.6,
        tag: "Editor's Pick",
      },
      {
        id: 'diapering-4',
        name: 'Contoured Baby Changing Pad',
        description:
          'Contoured foam changing pad with safety strap and waterproof cover. Non-slip bottom keeps it secure on any dresser.',
        priceRange: '$22–$32',
        affiliateUrl: 'https://www.amazon.com/s?k=contoured+baby+changing+pad+waterproof&tag=buildthebaby-20',
        rating: 4.7,
      },
      {
        id: 'diapering-5',
        name: 'Desitin Maximum Strength Diaper Rash Cream',
        description:
          '40% zinc oxide formula provides instant relief and protects against diaper rash. Pediatrician recommended.',
        priceRange: '$8–$13',
        affiliateUrl: 'https://www.amazon.com/s?k=Desitin+Maximum+Strength+Diaper+Rash+Cream&tag=buildthebaby-20',
        rating: 4.8,
      },
    ],
  },
  {
    slug: 'comfort-play',
    name: 'Comfort & Play',
    emoji: '🧸',
    tagline: 'Soothe, entertain, and spark early development',
    color: 'bg-pink-50 border-pink-200',
    products: [
      {
        id: 'comfort-1',
        name: 'Philips Avent Soothie Pacifier',
        description:
          'One-piece hospital-grade silicone pacifier used in newborn nurseries nationwide. BPA-free, dishwasher safe.',
        priceRange: '$9–$14',
        affiliateUrl: 'https://www.amazon.com/s?k=Philips+Avent+Soothie+Pacifier+Newborn&tag=buildthebaby-20',
        rating: 4.7,
        tag: 'Hospital Approved',
      },
      {
        id: 'comfort-2',
        name: 'Sophie la Girafe Teether',
        description:
          'Iconic natural rubber giraffe teether with squeaker. 100% natural rubber and food paint — safe for gnawing.',
        priceRange: '$22–$28',
        affiliateUrl: 'https://www.amazon.com/s?k=Sophie+la+Girafe+Teether&tag=buildthebaby-20',
        rating: 4.6,
        tag: 'Classic',
      },
      {
        id: 'comfort-3',
        name: '4moms mamaRoo Baby Swing',
        description:
          'Mimics the natural motions parents use — car ride, kangaroo, ocean, and more. Bluetooth controlled via app.',
        priceRange: '$229–$279',
        affiliateUrl: 'https://www.amazon.com/s?k=4moms+mamaRoo+Baby+Swing&tag=buildthebaby-20',
        rating: 4.5,
        tag: 'Splurge Pick',
      },
      {
        id: 'comfort-4',
        name: 'Skip Hop Baby Activity Play Mat',
        description:
          'Soft foam activity mat with detachable toys, a tummy time pillow, and mirror. Folds for easy storage.',
        priceRange: '$69–$89',
        affiliateUrl: 'https://www.amazon.com/s?k=Skip+Hop+Baby+Activity+Play+Mat&tag=buildthebaby-20',
        rating: 4.7,
      },
    ],
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export const categoryNavItems = categories.map(({ slug, name, emoji }) => ({
  slug,
  name,
  emoji,
}))
