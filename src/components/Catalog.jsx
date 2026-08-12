import { useState } from 'react'
import { featuredProducts } from '../data/mockData'
import ProductModal from './ProductModal'

export default function Catalog({ filterCategory, onClearFilter }) {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const products = filterCategory
    ? featuredProducts.filter((p) => p.category === filterCategory)
    : featuredProducts

  return (
    <section id="catalogo" className="py-5 bg-light">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
          <h2 className="fw-bold mb-0">
            <i className="bi bi-bag-fill text-fans3d-red me-2"></i>
            Catálogo destacado
          </h2>
          {filterCategory && (
            <button className="btn btn-sm btn-outline-secondary rounded-pill" onClick={onClearFilter}>
              <i className="bi bi-x-circle me-1"></i>
              Quitar filtro: {filterCategory}
            </button>
          )}
        </div>

        <div className="row g-4">
          {products.map((product) => (
            <div className="col-6 col-md-4 col-lg-4" key={product.id}>
              <div
                className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                role="button"
                onClick={() => setSelectedProduct(product)}
              >
                <div
                  className="product-card-thumb"
                  style={{ backgroundColor: product.color }}
                >
                  <i className={`bi ${product.icon}`}></i>
                </div>
                <div className="card-body">
                  <span className="badge-pill-soft mb-2">{product.category}</span>
                  <h5 className="fw-bold mb-1">{product.name}</h5>
                  <p className="text-fans3d-red fw-bold mb-0">
                    {product.price.toLocaleString('es-AR', {
                      style: 'currency',
                      currency: 'ARS',
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <small className="text-secondary">{product.height}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <p className="text-secondary mt-3">No hay productos en esta categoría todavía.</p>
        )}
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  )
}
