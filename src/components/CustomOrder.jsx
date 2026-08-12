import { useState } from 'react'

export default function CustomOrder() {
  const [fileName, setFileName] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  function handleFileChange(e) {
    const file = e.target.files?.[0]
    setFileName(file ? file.name : null)
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: conectar con backend / WhatsApp / email cuando exista.
    setSubmitted(true)
  }

  return (
    <section id="personalizados" className="py-5">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
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
          </div>

          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              {submitted ? (
                <div className="text-center py-4">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '2.5rem' }}></i>
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
          </div>
        </div>
      </div>
    </section>
  )
}
