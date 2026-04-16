// ============================================================
// PRODUCT DATA — StickKhoo
// Images live in /src/assets/<folder>/<filename>.png
// Folders: ducks / otter / teleduck / withoutseries
// ============================================================

// Duck Series
import bareminimum from '../assets/ducks/bareminimum.png'
import coffeeduck from '../assets/ducks/coffeeduck.png'
import lowbat from '../assets/ducks/lowbat.png'
import pajama from '../assets/ducks/pajama.png'
import producktive from '../assets/ducks/producktive.png'
import sleepingduck from '../assets/ducks/sleepingduck.png'
import sunglassduck from '../assets/ducks/sunglassduck.png'
import swingingduck from '../assets/ducks/swingingduck.png'
import unproducktive from '../assets/ducks/unproducktive.png'

// Otter Series
import bbtcup from '../assets/otter/bbtcup.png'
import crossinghands from '../assets/otter/crossinghands.png'
import otter from '../assets/otter/otter.png'
import rushing from '../assets/otter/rushing.png'
import sleepyotter from '../assets/otter/sleepyotter.png'
import otterThumbsup from '../assets/otter/thumbsup.png'

// Telegram Duck Series
import cool from '../assets/teleduck/cool.png'
import crosshands from '../assets/teleduck/crosshands.png'
import imokay from '../assets/teleduck/imokay.png'
import mindblown from '../assets/teleduck/mindblown.png'
import shocked from '../assets/teleduck/shocked.png'
import sleeping from '../assets/teleduck/sleeping.png'
import thinking from '../assets/teleduck/thinking.png'
import teleduckThumbsup from '../assets/teleduck/thumbsup.png'

// Mini Series (withoutseries folder)
import blahaj from '../assets/withoutseries/BLÅHAJ.png'
import dragon from '../assets/withoutseries/dragon.png'
import dumdog from '../assets/withoutseries/dumdog.png'

// ── SERIES ────────────────────────────────────────────────────

export const SERIES = [
  {
    id: 'duck',
    name: 'Duck Series',
    slug: 'duck',
    description: 'Dark silhouette ducks living their most relatable lives. Bare minimum energy only.',
    color: 'charcoal',
    bgColor: '#F5F0E8',
    accentColor: '#E8C87A',
    coverImage: sleepingduck,
    tagline: 'Doing the bare minimum. Respectfully.',
  },
  {
    id: 'otter',
    name: 'Otter Series',
    slug: 'otter',
    description: 'Chubby otters with big feelings and bigger personalities. Sian but still cute.',
    color: 'brown',
    bgColor: '#F5EDE0',
    accentColor: '#C4956A',
    coverImage: otterThumbsup,
    tagline: 'Soft on the outside, sian on the inside.',
  },
  {
    id: 'teleduck',
    name: 'Telegram Duck',
    slug: 'teleduck',
    description: 'The classic glowy rubber duck, now with all your favourite Telegram emotions.',
    color: 'butter',
    bgColor: '#FFFBEA',
    accentColor: '#FFD84D',
    coverImage: imokay,
    tagline: 'Every mood. One duck.',
  },
  {
    id: 'mini',
    name: 'Mini Series',
    slug: 'mini',
    description: "One-of-a-kind characters that don't fit in a box. In a good way.",
    color: 'sage',
    bgColor: '#EEF5EE',
    accentColor: '#A8C4B0',
    coverImage: dumdog,
    tagline: 'Standalone. Iconic. No notes.',
  },
]

// ── SHARED SIZES ──────────────────────────────────────────────

const SIZES = [
  { label: 'Small (3.5 × 3.5 cm)', price: 1.50 },
  { label: 'Medium (4.5 × 4.5 cm)', price: 2.00 },
]

// ── PRODUCTS ──────────────────────────────────────────────────

export const PRODUCTS = [

  // ── DUCK SERIES ───────────────────────────────────────────
  {
    id: 'duck-001',
    name: 'Bare Minimum',
    slug: 'bare-minimum',
    price: 1.50,
    series: 'duck',
    seriesName: 'Duck Series',
    imageUrl: bareminimum,
    description: 'Holding a sign that says "bare minimum" and honestly thriving. A whole mood.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F5F0E8',
  },
  {
    id: 'duck-002',
    name: 'Coffee Duck',
    slug: 'coffee-duck',
    price: 1.50,
    series: 'duck',
    seriesName: 'Duck Series',
    imageUrl: coffeeduck,
    description: 'Star pyjamas, zero plans for the day. Living the dream.',
    featured: true,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#EAE0F5',
  },
  {
    id: 'duck-003',
    name: 'Low Bat',
    slug: 'low-bat',
    price: 1.50,
    series: 'duck',
    seriesName: 'Duck Series',
    imageUrl: lowbat,
    description: 'Laptop open. One single bar of will to live remaining.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F0F0F0',
  },
  {
    id: 'duck-004',
    name: 'Pajama Duck',
    slug: 'pajama-duck',
    price: 1.50,
    series: 'duck',
    seriesName: 'Duck Series',
    imageUrl: pajama,
    description: 'Just standing there. No thoughts. Head empty.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F5F0E8',
  },
  {
    id: 'duck-005',
    name: 'Producktive',
    slug: 'producktive',
    price: 1.50,
    series: 'duck',
    seriesName: 'Duck Series',
    imageUrl: producktive,
    description: 'Laptop. Focus. Technically productive. Kind of.',
    featured: true,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#E8EEF5',
  },
  {
    id: 'duck-006',
    name: 'Sleeping Duck',
    slug: 'sleeping-duck',
    price: 1.50,
    series: 'duck',
    seriesName: 'Duck Series',
    imageUrl: sleepingduck,
    description: 'Flat on the floor. Fully cooked. Not getting back up.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F5F0E8',
  },
  {
    id: 'duck-007',
    name: 'Sunglass Duck',
    slug: 'sunglass-duck',
    price: 1.50,
    series: 'duck',
    seriesName: 'Duck Series',
    imageUrl: sunglassduck,
    description: 'Drip on. The most unbothered duck in existence.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F5F0E8',
  },
  {
    id: 'duck-008',
    name: 'Swinging Duck',
    slug: 'swinging-duck',
    price: 1.50,
    series: 'duck',
    seriesName: 'Duck Series',
    imageUrl: swingingduck,
    description: 'Quietly having the time of its life.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F5F0E8',
  },
  {
    id: 'duck-009',
    name: 'Unproducktive',
    slug: 'unproducktive',
    price: 1.50,
    series: 'duck',
    seriesName: 'Duck Series',
    imageUrl: unproducktive,
    description: "Nothing is happening and that's fine.",
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F5F0E8',
  },

  // ── OTTER SERIES ──────────────────────────────────────────
  {
    id: 'otter-001',
    name: 'BBT Otter',
    slug: 'bbt-otter',
    price: 1.50,
    series: 'otter',
    seriesName: 'Otter Series',
    imageUrl: bbtcup,
    description: 'Holding boba... This otter has found its purpose.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F5EDE0',
  },
  {
    id: 'otter-002',
    name: 'Crossing Hands Otter',
    slug: 'crossing-hands-otter',
    price: 1.50,
    series: 'otter',
    seriesName: 'Otter Series',
    imageUrl: crossinghands,
    description: 'Smug level: maximum. Do not approach.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F5EDE0',
  },
  {
    id: 'otter-003',
    name: 'Cool Otter',
    slug: 'cool-otter',
    price: 1.50,
    series: 'otter',
    seriesName: 'Otter Series',
    imageUrl: otter,
    description: 'Sunglasses on. This otter has never had a bad day.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F5EDE0',
  },
  {
    id: 'otter-004',
    name: 'Rushing Otter',
    slug: 'rushing-otter',
    price: 1.50,
    series: 'otter',
    seriesName: 'Otter Series',
    imageUrl: rushing,
    description: 'Late. Classic school morning energy.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#EAF2FA',
  },
  {
    id: 'otter-005',
    name: 'Sleepy Otter',
    slug: 'sleepy-otter',
    price: 1.50,
    series: 'otter',
    seriesName: 'Otter Series',
    imageUrl: sleepyotter,
    description: "Sian",
    featured: true,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F5EDE0',
  },
  {
    id: 'otter-006',
    name: 'Thumbs Up Otter',
    slug: 'thumbs-up-otter',
    price: 1.50,
    series: 'otter',
    seriesName: 'Otter Series',
    imageUrl: otterThumbsup,
    description: 'Peak otter confidence. We stan.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F5EDE0',
  },

  // ── TELEGRAM DUCK SERIES ──────────────────────────────────
  {
    id: 'teleduck-001',
    name: 'Cool Duck',
    slug: 'cool-duck',
    price: 1.50,
    series: 'teleduck',
    seriesName: 'Telegram Duck',
    imageUrl: cool,
    description: 'Just vibes. Absolute icon.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#FFFBEA',
  },
  {
    id: 'teleduck-002',
    name: 'Cross Hands Duck',
    slug: 'cross-hands-duck',
    price: 1.50,
    series: 'teleduck',
    seriesName: 'Telegram Duck',
    imageUrl: crosshands,
    description: 'Arms folded. Eyes closed. Send this to anyone who tests you.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#FFFBEA',
  },
  {
    id: 'teleduck-003',
    name: "I'm Okay Duck",
    slug: 'imokay-duck',
    price: 1.50,
    series: 'teleduck',
    seriesName: 'Telegram Duck',
    imageUrl: imokay,
    description: "It's not okay. We're not okay.",
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F0EAF8',
  },
  {
    id: 'teleduck-004',
    name: 'Mind Blown Duck',
    slug: 'mindblown-duck',
    price: 1.50,
    series: 'teleduck',
    seriesName: 'Telegram Duck',
    imageUrl: mindblown,
    description: 'Exploding duck',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#FFFBEA',
  },
  {
    id: 'teleduck-005',
    name: 'Shocked Duck',
    slug: 'shocked-duck',
    price: 1.50,
    series: 'teleduck',
    seriesName: 'Telegram Duck',
    imageUrl: shocked,
    description: 'The face you make when you realise how expensive you are',
    featured: true,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#FFFBEA',
  },
  {
    id: 'teleduck-006',
    name: 'Sleeping Duck',
    slug: 'sleeping-teleduck',
    price: 1.50,
    series: 'teleduck',
    seriesName: 'Telegram Duck',
    imageUrl: sleeping,
    description: "Absolutely do not disturb.",
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#EAF5EA',
  },
  {
    id: 'teleduck-007',
    name: 'Thinking Duck',
    slug: 'thinking-duck',
    price: 1.50,
    series: 'teleduck',
    seriesName: 'Telegram Duck',
    imageUrl: thinking,
    description: 'This duck is done with your shit.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#FFFBEA',
  },
  {
    id: 'teleduck-008',
    name: 'Thumbs Up Duck',
    slug: 'thumbsup-duck',
    price: 1.50,
    series: 'teleduck',
    seriesName: 'Telegram Duck',
    imageUrl: teleduckThumbsup,
    description: 'Approves of your life choices. Mostly...',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#FFFBEA',
  },

  // ── MINI SERIES ───────────────────────────────────────────
  {
    id: 'mini-001',
    name: 'BLÅHAJ',
    slug: 'blahaj',
    price: 1.50,
    series: 'mini',
    seriesName: 'Mini Series',
    imageUrl: blahaj,
    description: 'Shark :)',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#E0EEFA',
  },
  {
    id: 'mini-002',
    name: 'Baby Dragon',
    slug: 'baby-dragon',
    price: 1.50,
    series: 'mini',
    seriesName: 'Mini Series',
    imageUrl: dragon,
    description: 'Round green dragon with rosy cheeks and tiny horns.',
    featured: false,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#EAF5EA',
  },
  {
    id: 'mini-003',
    name: 'Dum Dog',
    slug: 'dum-dog',
    price: 1.50,
    series: 'mini',
    seriesName: 'Mini Series',
    imageUrl: dumdog,
    description: 'Chubby Dum Pug',
    featured: true,
    newArrival: false,
    popular: false,
    sizeOptions: SIZES,
    color: '#F5EDE0',
  },
]

// ── HELPERS ───────────────────────────────────────────────────

export const getFeaturedProducts = () => PRODUCTS.filter(p => p.featured)
export const getNewArrivals = () => PRODUCTS.filter(p => p.newArrival)
export const getPopularProducts = () => PRODUCTS.filter(p => p.popular)
export const getProductsBySeries = (seriesId) => PRODUCTS.filter(p => p.series === seriesId)
export const getProductBySlug = (slug) => PRODUCTS.find(p => p.slug === slug)
export const getSeriesBySlug = (slug) => SERIES.find(s => s.slug === slug)
export const getRelatedProducts = (product, limit = 4) =>
  PRODUCTS.filter(p => p.series === product.series && p.id !== product.id).slice(0, limit)
