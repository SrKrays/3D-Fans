import Reveal from './Reveal'

export default function AboutSection() {
  return (
    <section id="nosotros" className="py-5 bg-light">
      <div className="container">
        <div className="row g-4 align-items-center">
          <Reveal as="div" className="col-lg-6">
            <span className="badge-pill-soft mb-2">
              <i className="bi bi-info-circle-fill me-1"></i>Sobre nosotros
            </span>
            <h2 className="fw-bold mb-3">Fans3D</h2>
            <p className="text-secondary">
              Somos una tienda de impresión 3D especializada en piezas de tus fandoms favoritos:
              figuras, llaveros, posavasos, vasos y objetos de colección. Nos podés encontrar en
              Expos y convenciones de cultura pop, además de acá online.
            </p>
            <p className="text-secondary mb-0">
              Trabajamos sobre modelos ya existentes y también imprimimos tus propios diseños
              listos (archivos STL) de objetos simples: cajas, marcos, piezas y accesorios.
            </p>
          </Reveal>

          <Reveal as="div" className="col-lg-6" delay={0.15}>
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h6 className="fw-bold mb-3">
                <i className="bi bi-clipboard-check-fill text-fans3d-blue me-2"></i>
                Qué hacemos
              </h6>
              <ul className="list-unstyled mb-4">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Impresión 3D de figuras y piezas ya modeladas</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Impresión de tus propios archivos STL (objetos, cajas, marcos)</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-success me-2"></i>Pintado artesanal de piezas</li>
              </ul>
              <h6 className="fw-bold mb-3">
                <i className="bi bi-x-circle-fill text-fans3d-red me-2"></i>
                Qué no hacemos (por ahora)
              </h6>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><i className="bi bi-dash-circle text-secondary me-2"></i>Escultura o diseño digital de personajes o personas</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
