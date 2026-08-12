import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-2 py-lg-1">
      <div className="container">
        <Link className="navbar-brand navbar-brand-fans3d d-flex align-items-center gap-2" to="/">
          <img src="/img/logo.jpeg" alt="Fans3D" className="navbar-logo-img" style={{ width: 48, height: 48 }} />
          <span>
            Fans<span className="text-fans3d-blue">3D</span>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav navbar-nav-fans3d mx-auto gap-lg-4 mt-10 mt-lg-1">
            <li className="nav-item">
              <Link className="nav-link fw-semibold text-fans3d-red" to="/">
                <i className="bi bi-house-door-fill me-1"></i>Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/catalogo">Catálogo</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/personalizados">Personalizados</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link fw-semibold" to="/expos">Expos</Link>
            </li>
            <li className="nav-item">
              <a
                className="nav-link fw-semibold"
                href="https://www.instagram.com/fans3d_impresiones/"
                target="_blank"
                rel="noreferrer"
              >
                Nosotros <i className="bi bi-box-arrow-up-right small"></i>
              </a>
            </li>
          </ul>

          <Link to="/personalizados" className="btn btn-fans3d-yellow rounded-pill px-3 py-2 mt-3 mt-lg-0">
            <i className="bi bi-rocket-takeoff-fill me-1"></i> Cotizar pieza
          </Link>
        </div>
      </div>
    </nav>
  )
}
