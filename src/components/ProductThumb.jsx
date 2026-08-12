import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { productImageUrl } from '../utils/images'

export default function ProductThumb({ product, className = 'product-card-thumb' }) {
  if (product.image) {
    return (
      <div className={className}>
        <LazyLoadImage
          src={productImageUrl(product.image)}
          alt={product.name}
          effect="blur"
          width="100%"
          height="100%"
        />
      </div>
    )
  }

  // Fallback por si un producto todavía no tiene foto cargada.
  return (
    <div
      className={className}
      style={{
        backgroundColor: product.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: '2.5rem',
      }}
    >
      <i className={`bi ${product.icon}`}></i>
    </div>
  )
}
