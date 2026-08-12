const steps = [
  {
    n: 1,
    title: 'Diseño e impresión',
    text: 'Modelamos o adaptamos tu pieza y la imprimimos en 3D con alta precisión.',
    icon: 'bi-printer-fill',
    color: '#2a6fdb',
  },
  {
    n: 2,
    title: 'Pintado artesanal',
    text: 'Cada pieza se pinta a mano con detalle y dedicación para un acabado premium.',
    icon: 'bi-brush-fill',
    color: '#e63946',
  },
  {
    n: 3,
    title: 'Revisión y envío',
    text: 'Revisamos la calidad, embalamos con cuidado y la enviamos hasta tu casa.',
    icon: 'bi-box-seam-fill',
    color: '#ffc93c',
  },
]

export default function HowWeDoIt() {
  return (
    <section id="nosotros" className="py-5 bg-light">
      <div className="container">
        <h2 className="fw-bold mb-4">
          <i className="bi bi-gear-fill text-fans3d-blue me-2"></i>
          Cómo lo hacemos
        </h2>

        <div className="row g-4">
          {steps.map((step) => (
            <div className="col-md-4" key={step.n}>
              <div className="card h-100 border-0 shadow-sm rounded-4 p-3">
                <div
                  className="d-flex align-items-center justify-content-center rounded-4 mb-3"
                  style={{ height: '160px', backgroundColor: step.color }}
                >
                  <i className={`bi ${step.icon} text-white`} style={{ fontSize: '3rem' }}></i>
                </div>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="step-circle" style={{ backgroundColor: step.color }}>
                    {step.n}
                  </span>
                  <h5 className="fw-bold mb-0">{step.title}</h5>
                </div>
                <p className="text-secondary mb-0">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
