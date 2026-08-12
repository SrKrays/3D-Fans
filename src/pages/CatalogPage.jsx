import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { categories, featuredProducts } from '../data/mockData'
import ProductModal from '../components/ProductModal'
import ProductThumb from '../components/ProductThumb'
import { gsap, Flip } from '../lib/gsapSetup'

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState(searchParams.get('categoria') || 'Todos')
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const gridRef = useRef(null)
  const flipStateRef = useRef(null)

  // Si llegamos con ?categoria=... desde Home, respetarlo.
  useEffect(() => {
    const fromUrl = searchParams.get('categoria')
    if (fromUrl) setActiveCategory(fromUrl)
  }, [searchParams])

  function captureFlipState() {
    if (gridRef.current) {
      flipStateRef.current = Flip.getState(gridRef.current.querySelectorAll('.flip-card'))
    }
  }

  function handleCategoryClick(name) {
    captureFlipState()
    setActiveCategory(name)
    if (name === 'Todos') {
      searchParams.delete('categoria')
    } else {
      searchParams.set('categoria', name)
    }
    setSearchParams(searchParams)
  }

  const filteredProducts = useMemo(() => {
    return featuredProducts.filter((p) => {
      const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, search])

  // Cuando cambia el resultado filtrado (por click en categoría), las cards
  // que se reacomodan lo hacen animadas en vez de "saltar" a su lugar nuevo.
  useLayoutEffect(() => {
    if (!flipStateRef.current) return
    Flip.from(flipStateRef.current, {
      duration: 0.5,
      ease: 'power1.inOut',
      stagger: 0.03,
      absolute: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.03 }),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.3 }),
    })
    flipStateRef.current = null
  }, [filteredProducts])

  return (
    <>
      <section className="py-5 bg-light">
        <div className="container">
          <h1 className="fw-bold mb-1">
            <i className="bi bi-bag-fill text-fans3d-red me-2"></i>
            Tienda
          </h1>
          <p className="text-secondary mb-4">Explorá todos nuestros productos.</p>

          <div className="row g-4">
            {/* Filtros: en celular/tablet van debajo del grid, para que los
                productos se vean apenas se entra a la tienda. */}
            <div className="col-lg-3 order-2 order-lg-1">
              <div className="card border-0 shadow-sm rounded-4 p-3 mb-3">
                <label className="form-label fw-semibold small">Buscar</label>
                <div className="input-group">
                  <span className="input-group-text bg-white border-end-0">
                    <i className="bi bi-search"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Nombre del producto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="card border-0 shadow-sm rounded-4 p-3">
                <h6 className="fw-bold mb-3">Categorías</h6>
                <div className="d-flex flex-row flex-wrap flex-lg-column gap-2 gap-lg-1">
                  <button
                    className={`btn btn-sm text-start rounded-pill ${
                      activeCategory === 'Todos' ? 'btn-fans3d-red' : 'btn-light'
                    }`}
                    onClick={() => handleCategoryClick('Todos')}
                  >
                    Todos
                  </button>
                  {categories.map((cat) =>
                    // "Personalizados" es el servicio a medida, no hay que
                    // filtrarlo acá — lleva a su propia página.
                    cat.id === 'personalizados' ? (
                      <Link
                        key={cat.id}
                        to="/personalizados"
                        className="btn btn-sm text-start rounded-pill btn-light"
                      >
                        <i className={`bi ${cat.icon} me-2`}></i>
                        {cat.name}
                      </Link>
                    ) : (
                      <button
                        key={cat.id}
                        className={`btn btn-sm text-start rounded-pill ${
                          activeCategory === cat.name ? 'btn-fans3d-red' : 'btn-light'
                        }`}
                        onClick={() => handleCategoryClick(cat.name)}
                      >
                        <i className={`bi ${cat.icon} me-2`}></i>
                        {cat.name}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Grid de productos */}
            <div className="col-lg-9 order-1 order-lg-2">
              <div className="row g-4" ref={gridRef}>
                {filteredProducts.map((product) => (
                  <div className="col-6 col-md-4 flip-card" key={product.id}>
                    <div
                      className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden"
                      role="button"
                      onClick={() => setSelectedProduct(product)}
                    >
                      <ProductThumb product={product} />
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

              {filteredProducts.length === 0 && (
                <p className="text-secondary mt-3">No encontramos productos con ese filtro.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </>
  )
}
