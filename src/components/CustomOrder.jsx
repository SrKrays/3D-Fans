import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsapSetup'
import Reveal from './Reveal'

export default function CustomOrder() {
  const [fileName, setFileName] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const circleRef = useRef(null)
  const checkRef = useRef(null)
  const successWrapRef = useRef(null)

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    setFileName(file ? file.name : null)
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: conectar con backend / WhatsApp / email cuando exista.
    setSubmitted(true)
  }

  // Cuando se envía el formulario, el círculo y el tilde del ícono de éxito
  // se "dibujan" solos en vez de aparecer de golpe.
  useEffect(() => {
    if (!submitted) return
    const ctx = gsap.context(() => {
      gsap.from(successWrapRef.current, { opacity: 0, y: 10, duration: 0.3 })
      const tl = gsap.timeline({ delay: 0.1 })
      if (circleRef.current) {
        tl.fromTo(circleRef.current, { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.5, ease: 'power2.out' })
      }
      if (checkRef.current) {
        tl.fromTo(
          checkRef.current,
          { drawSVG: '0%' },
          { drawSVG: '100%', duration: 0.35, ease: 'power2.out' },
          '-=0.1'
        )
      }
    })
    return () => ctx.revert()
  }, [submitted])

  return (
    <section id="personalizados" className="py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          <Reveal as="div" className="col-lg-5">
            <span className="badge-pill-soft mb-2">
              <i className="bi bi-stars me-1"></i>¿Tenés un modelo o una idea simple?
            </span>
            <h2 className="fw-bold mb-3">Imprimimos tu pedido a medida</h2>
            <p className="text-secondary">
              Enviános tu archivo 3D (STL) o contanos qué objeto necesitás — cajas, marcos,
              piezas, accesorios — y te lo imprimimos y pintamos si lo pedís.
            </p>

            <div className="alert alert-light border small mt-3 mb-0">
              <i className="bi bi-info-circle-fill text-fans3d-blue me-2"></i>
              Por ahora no ofrecemos escultura o diseño digital de personajes ni personas.
              Si ya tenés el modelo (STL) o es un objeto simple, lo imprimimos sin problema.
            </div>

            <div className="d-flex flex-wrap gap-4 text-secondary small mt-4">
              <span><i className="bi bi-gift-fill me-1 text-fans3d-red"></i>Ideal para regalos</span>
              <span><i className="bi bi-gem me-1 text-fans3d-blue"></i>Piezas únicas</span>
              <span><i className="bi bi-rulers me-1 text-warning"></i>A medida</span>
            </div>
          </Reveal>

          <Reveal as="div" className="col-lg-7" delay={0.15}>
            <div className="card border-0 shadow-sm rounded-4 p-4">
              {submitted ? (
                <div className="text-center py-4" ref={successWrapRef}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto d-block">
                    <circle
                      ref={circleRef}
                      cx="32"
                      cy="32"
                      r="28"
                      stroke="#28a745"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      ref={checkRef}
                      d="M20 33L28 41L45 24"
                      stroke="#28a745"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                  <h5 className="fw-bold mt-3">¡Listo! Recibimos tu pedido.</h5>
                  <p className="text-secondary mb-0">Te vamos a contactar a la brevedad con la cotización.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Subí tu archivo (STL) o una imagen de referencia
                    </label>
                    <label
                      htmlFor="refFile"
                      className="d-flex flex-column align-items-center justify-content-center border border-2 border-dashed rounded-4 p-4"
                      style={{ cursor: 'pointer', borderStyle: 'dashed' }}
                    >
                      <i className="bi bi-cloud-arrow-up fs-3 text-fans3d-blue"></i>
                      <span className="small text-secondary mt-1">
                        {fileName ? fileName : 'Arrastrá o hacé clic para subir (.stl, .obj, imagen)'}
                      </span>
                    </label>
                    <input
                      id="refFile"
                      type="file"
                      accept=".stl,.obj,image/*"
                      className="d-none"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Contanos qué necesitás *</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      required
                      placeholder="Ej: Necesito imprimir esta caja organizadora, tamaño 15x10cm, en color negro."
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Detalles adicionales (opcional)</label>
                    <input type="text" className="form-control" placeholder="Colores, cantidad, pintado o sin pintar, etc." />
                  </div>

                  <button type="submit" className="btn btn-fans3d-red rounded-pill w-100 py-2">
                    <i className="bi bi-send-fill me-2"></i>Solicitar cotización
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
