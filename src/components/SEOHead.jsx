import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'StickKhoo'
const SITE_URL = 'https://stickkhoo.com' // 🔁 update to your actual domain
const DEFAULT_DESC =
  'Cute hand-drawn stickers from Singapore. Ducks, otters, food characters & more — shipped with love via PayNow & PayLah!'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg` // 🔁 add an og-image.jpg to your /public folder

export default function SEOHead({
  title,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  noIndex = false,
}) {
  const fullTitle = title ? `${title} · ${SITE_NAME}` : `${SITE_NAME} — Cute Stickers from Singapore`
  const canonicalUrl = url ? `${SITE_URL}${url}` : SITE_URL

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Extras */}
      <meta name="theme-color" content="#FAF8F4" />
    </Helmet>
  )
}
