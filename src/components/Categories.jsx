import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import { categories } from '../data/mockData'
import { productImageUrl } from '../utils/images'

export default function Categories() {
  return (
    <section id="categorias" className="py-4 py-lg-5">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="fw-bold mb-0">
            <i className="bi bi-grid-fill text-fans3d-blue me-2"></i>
            Explorá por categorías
          </h2>
          <Link to="/catalogo" className="btn btn-sm btn-outline-dark rounded-pill btn-tap-target">
            Ver toda la tienda <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>

        <div className="row g-3">
          {categories.map((cat) => (
            <div className="col-6 col-md-4 col-lg-2" key={cat.id}>
              <Link
                // "Personalizados" no es un producto del catálogo, es el servicio
                // a medida, así que lleva a su propia página en vez de a una
                // categoría vacía en la tienda.
                to={
                  cat.id === 'personalizados'
                    ? '/personalizados'
                    : `/catalogo?categoria=${encodeURIComponent(cat.name)}`
                }
                className="category-card h-100 d-block text-decoration-none"
              >
                {cat.image ? (
                  <div className="cat-thumb cat-thumb-photo">
                    <LazyLoadImage
                      src={productImageUrl(cat.image)}
                      alt={cat.name}
                      effect="blur"
                      width="100%"
                      height="100%"
                    />
                    <div className="cat-label cat-label-overlay">{cat.name}</div>
                  </div>
                ) : (
                  <div className="cat-thumb" style={{ backgroundColor: cat.color }}>
                    <i className={`bi ${cat.icon} cat-thumb-icon`}></i>
                    <div className="cat-label cat-label-plain">{cat.name}</div>
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
