import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsapSetup'

// Copy honesta: solo lo que el cliente confirmó que hace (imprimir piezas ya
// modeladas o archivos STL que le manda el cliente). Nada de "diseñamos tu
// personaje", eso lo sacamos de la web hace unas vueltas atrás.
const steps = [
  {
    n: 1,
    title: 'Elegís o nos mandás el modelo',
    text: 'Elegís una pieza del catálogo o nos pasás tu archivo STL de un objeto simple.',
    icon: 'bi-search',
    color: '#2a6fdb',
  },
  {
    n: 2,
    title: 'La imprimimos en 3D',
    text: 'Impresión capa por capa con el material y color que corresponda a la pieza.',
    icon: 'bi-printer-fill',
    color: '#e63946',
  },
  {
    n: 3,
    title: 'Pintamos y entregamos',
    text: 'Pintado artesanal si la pieza lo lleva, embalaje con cuidado y entrega o envío.',
    icon: 'bi-box-seam-fill',
    color: '#ffc93c',
  },
]

export default function ProcessSection() {
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const cardRefs = useRef([])
  const fillRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean)
      const mm = gsap.matchMedia()

      // Desktop: la sección se fija en pantalla y los pasos se van
      // revelando a medida que se scrollea (scrollytelling con pin).
      mm.add('(min-width: 992px)', () => {
        gsap.set(cards, { opacity: 0.25, y: 40, scale: 0.94 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=1200',
            scrub: 1,
            pin: pinRef.current,
          },
        })

        cards.forEach((card, i) => {
          tl.to(card, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }, i)
          if (i > 0) {
            tl.to(cards[i - 1], { opacity: 0.4, scale: 0.96, duration: 1 }, i)
          }
        })

        if (fillRef.current) {
          gsap.to(fillRef.current, {
            width: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '+=1200',
              scrub: true,
            },
          })
        }
      })

      // Celular/tablet: nada de pin (scrollear "atrapado" en una pantalla
      // chica se siente incómodo). Cada card entra con un fade+slide simple
      // apenas aparece, y la barra de progreso se completa de una.
      mm.add('(max-width: 991px)', () => {
        gsap.set(cards, { opacity: 1, y: 0, scale: 1 })

        cards.forEach((card, i) => {
          gsap.from(card, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
            },
          })
        })

        if (fillRef.current) {
          gsap.set(fillRef.current, { width: '0%' })
          gsap.to(fillRef.current, {
            width: '100%',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          })
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-4 py-lg-5 process-section">
      <div className="container" ref={pinRef}>
        <h2 className="fw-bold mb-2">
          <i className="bi bi-gear-fill text-fans3d-blue me-2"></i>
          Cómo trabajamos
        </h2>
        <p className="text-secondary mb-4">
          Del pedido a tu casa: así es el recorrido de tu pieza.
        </p>

        <div className="process-progress mb-4">
          <div className="process-progress-fill" ref={fillRef}></div>
        </div>

        <div className="row g-4">
          {steps.map((step, i) => (
            <div className="col-12 col-md-4" key={step.n}>
              <div
                className="process-step-card h-100"
                ref={(el) => (cardRefs.current[i] = el)}
              >
                <div className="process-step-top">
                  <div className="process-step-icon" style={{ backgroundColor: step.color }}>
                    <i className={`bi ${step.icon}`}></i>
                  </div>
                  <div className="step-circle" style={{ backgroundColor: step.color }}>
                    {step.n}
                  </div>
                </div>
                <h5 className="fw-bold">{step.title}</h5>
                <p className="text-secondary mb-0">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
