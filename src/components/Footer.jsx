import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="contacto" className="bg-dark text-light pt-5 pb-3 mt-4">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <img src="/img/logo.jpeg" alt="Fans3D" className="navbar-logo-img" style={{ width: 36, height: 36 }} />
              <span className="fw-bold fs-5">
                Fans<span className="text-fans3d-blue">3D</span>
              </span>
            </div>
            <p className="text-secondary small">
              Impresión 3D para fans, coleccionistas y amantes de la cultura pop.
            </p>
            <div className="d-flex gap-3 fs-5 mt-3">
              <a href="https://www.instagram.com/fans3d_impresiones/" target="_blank" rel="noreferrer">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#"><i className="bi bi-tiktok"></i></a>
              <a href="#"><i className="bi bi-facebook"></i></a>
            </div>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3">Navegación</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/">Inicio</Link></li>
              <li className="mb-2"><Link to="/catalogo">Catálogo</Link></li>
              <li className="mb-2"><Link to="/personalizados">Personalizados</Link></li>
              <li className="mb-2"><Link to="/expos">Expos</Link></li>
              <li className="mb-2">
                <a href="https://www.instagram.com/fans3d_impresiones/" target="_blank" rel="noreferrer">
                  Nosotros
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3">
            <h6 className="fw-bold text-white mb-3">Ayuda</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><a href="#">Preguntas frecuentes</a></li>
              <li className="mb-2"><a href="#">Envíos y pagos</a></li>
              <li className="mb-2"><a href="#">Cambios y devoluciones</a></li>
              <li className="mb-2"><a href="#">Términos y condiciones</a></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h6 className="fw-bold text-white mb-3">Contacto</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><i className="bi bi-whatsapp me-2"></i>+54 9 11 1234-5678</li>
              <li className="mb-2"><i className="bi bi-envelope-fill me-2"></i>hola@fans3d.com.ar</li>
              <li className="mb-2"><i className="bi bi-geo-alt-fill me-2"></i>Buenos Aires, Argentina</li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary mt-4" />

        <div className="d-flex justify-content-between flex-wrap small text-secondary pt-2">
          <span>&copy; {new Date().getFullYear()} Fans3D. Todos los derechos reservados.</span>
          <span>Hecho con <i className="bi bi-heart-fill text-danger"></i> por fans, para fans.</span>
        </div>
      </div>
    </footer>
  )
}
