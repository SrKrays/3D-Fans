import ProductThumb from './ProductThumb'

export default function ProductModal({ product, onClose }) {
  if (!product) return null

  const priceFormatted = product.price.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  })

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" onClick={onClose}>
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content border-0 rounded-4 overflow-hidden">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">{product.name}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="row g-4">
                <div className="col-md-5">
                  <ProductThumb product={product} className="product-photo-lg" />
                  <small className="text-secondary d-block mt-2">
                    Foto de referencia del producto.
                  </small>
                </div>

                <div className="col-md-7">
                  <span className="badge-pill-soft mb-2">{product.category}</span>
                  <h3 className="text-fans3d-red fw-bold mb-3">{priceFormatted}</h3>

                  <p className="text-secondary">{product.description}</p>

                  <ul className="list-unstyled mt-3 mb-4">
                    <li className="mb-2">
                      <i className="bi bi-rulers me-2 text-fans3d-blue"></i>
                      <strong>Altura / tamaño:</strong> {product.height}
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-layers-fill me-2 text-fans3d-blue"></i>
                      <strong>Material / acabado:</strong> {product.material}
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-truck me-2 text-fans3d-blue"></i>
                      <strong>Entrega estimada:</strong> {product.deliveryDays}
                    </li>
                  </ul>

                  <div className="d-flex gap-2 flex-wrap">
                    <button className="btn btn-fans3d-red rounded-pill px-4">
                      <i className="bi bi-whatsapp me-2"></i>Consultar / Cotizar
                    </button>
                    <button className="btn btn-outline-dark rounded-pill px-4" onClick={onClose}>
                      Seguir viendo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  )
}
