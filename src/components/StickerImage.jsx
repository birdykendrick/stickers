export default function StickerImage({ product, className = '', size = 'md' }) {
  if (product.imageUrl) {
    return (
      <div
        className={`relative flex items-center justify-center overflow-hidden ${className}`}
        style={{ backgroundColor: product.color || '#FAF8F4' }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain select-none"
          draggable={false}
        />
      </div>
    )
  }

  // Fallback for any products without images
  const sizeMap = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-8xl',
    xl: 'text-9xl',
  }

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ backgroundColor: product.color || '#FAF8F4' }}
    >
      <div className="flex flex-col items-center justify-center gap-1 select-none">
        <span className={`${sizeMap[size]} drop-shadow-sm`}>{product.emoji}</span>
        {product.emojiOverlay && (
          <span className={`${size === 'xl' ? 'text-5xl' : size === 'lg' ? 'text-4xl' : 'text-2xl'} -mt-2 drop-shadow-sm`}>
            {product.emojiOverlay}
          </span>
        )}
      </div>
    </div>
  )
}
