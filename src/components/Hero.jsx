import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <span className="badge-pill-soft mb-3">
              <i className="bi bi-stars me-1"></i> Impresión 3D para verdaderos fans
            </span>
            <h1 className="hero-title fw-bold mb-3">
              Tus fandoms,<br />
              <span className="text-fans3d-red">impresos</span> en 3D
            </h1>
            <p className="hero-subtitle text-secondary mb-4">
              Figuras, accesorios y piezas únicas de tus universos favoritos.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <Link to="/catalogo" className="btn btn-fans3d-red rounded-pill px-4 py-2 fs-6">
                <i className="bi bi-bag-fill me-2"></i>Ver catálogo
              </Link>
              <Link to="/personalizados" className="btn btn-outline-dark rounded-pill px-4 py-2 fs-6">
                <i className="bi bi-send-fill me-2"></i>Cotizar personalizado
              </Link>
            </div>

            <div className="hero-features d-flex flex-wrap gap-4 text-secondary">
              <span><i className="bi bi-gem me-1 text-fans3d-blue"></i>Impresión 3D de alta calidad</span>
              <span><i className="bi bi-brush-fill me-1 text-fans3d-red"></i>Pintado artesanal detallado</span>
              <span><i className="bi bi-truck me-1 text-warning"></i>Envíos a todo el país</span>
            </div>
          </div>

          {/* La columna derecha queda vacía a propósito: el banner (public/img/banner.png)
              ya trae las figuras y las formas de color, y se muestra como fondo de la
              sección (ver .hero-section en index.css) en vez de una imagen "flotando". */}
          <div className="col-lg-5"></div>
        </div>
      </div>
    </section>
  )
}
