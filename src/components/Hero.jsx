import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap, ScrollTrigger, SplitText, DrawSVGPlugin } from '../lib/gsapSetup'

const sparkles = [
  { top: '14%', left: '78%', size: '1.1rem', delay: 0 },
  { top: '30%', left: '92%', size: '0.8rem', delay: 0.4 },
  { top: '55%', left: '84%', size: '1.4rem', delay: 0.8 },
  { top: '72%', left: '95%', size: '0.9rem', delay: 1.2 },
  { top: '10%', left: '60%', size: '0.7rem', delay: 1.6 },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const squigglePathRef = useRef(null)
  const glowRef = useRef(null)
  const sparkleRefs = useRef([])

  useEffect(() => {
    let split

    const ctx = gsap.context(() => {
      // Estas dos corren siempre, en cualquier tamaño de pantalla: son
      // animaciones de entrada (una sola vez al cargar), no de scroll/mouse,
      // así que no tienen costo de rendimiento en celular.
      split = new SplitText(titleRef.current, { type: 'chars,words' })
      gsap.from(split.chars, {
        opacity: 0,
        y: 24,
        rotateX: -60,
        transformOrigin: '50% 100%',
        stagger: 0.02,
        duration: 0.7,
        ease: 'back.out(1.6)',
        delay: 0.15,
      })

      if (squigglePathRef.current) {
        gsap.fromTo(
          squigglePathRef.current,
          { drawSVG: '0%' },
          { drawSVG: '100%', duration: 1, ease: 'power2.inOut', delay: 1 }
        )
      }

      // gsap.matchMedia separa lo que corre en desktop de lo que corre en
      // celular/tablet, y se reajusta solo si el usuario rota la pantalla o
      // cambia el tamaño de ventana entre medio.
      const mm = gsap.matchMedia()

      mm.add('(min-width: 992px)', () => {
        // Parallax sutil del texto al scrollear.
        gsap.to(contentRef.current, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        // Destellos titilando sobre las figuras del banner.
        sparkleRefs.current.forEach((el, i) => {
          if (!el) return
          gsap.to(el, {
            opacity: 0.25,
            scale: 0.6,
            duration: 1.1 + (i % 3) * 0.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: sparkles[i].delay,
          })
        })

        // Brillo que sigue al mouse — solo tiene sentido con cursor, por eso
        // va únicamente en el breakpoint de escritorio.
        if (!glowRef.current) return
        const xTo = gsap.quickTo(glowRef.current, 'left', { duration: 0.7, ease: 'power3' })
        const yTo = gsap.quickTo(glowRef.current, 'top', { duration: 0.7, ease: 'power3' })

        const handleMove = (e) => {
          const rect = sectionRef.current.getBoundingClientRect()
          xTo(e.clientX - rect.left)
          yTo(e.clientY - rect.top)
          gsap.to(glowRef.current, { opacity: 1, duration: 0.3 })
        }
        const handleLeave = () => gsap.to(glowRef.current, { opacity: 0, duration: 0.4 })

        sectionRef.current.addEventListener('mousemove', handleMove)
        sectionRef.current.addEventListener('mouseleave', handleLeave)

        // gsap.matchMedia limpia esto solo (listeners incluidos) apenas la
        // media query deja de cumplirse o el componente se desmonta.
        return () => {
          sectionRef.current?.removeEventListener('mousemove', handleMove)
          sectionRef.current?.removeEventListener('mouseleave', handleLeave)
        }
      })

      mm.add('(max-width: 991px)', () => {
        // En celular/tablet: nada de parallax por scroll ni efectos de
        // mouse. El garabato y el título ya animaron arriba, con eso alcanza.
        gsap.set(glowRef.current, { opacity: 0 })
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      split?.revert()
    }
  }, [])

  return (
    <section id="inicio" className="hero-section hero-kenburns" ref={sectionRef}>
      {/* Capas de fondo, en orden: foto (siempre "cover", nunca se deforma,
          el zoom Ken Burns se hace con transform:scale) → degradé de
          legibilidad → fade inferior → velo blanco extra en celular. */}
      <div className="hero-bg-image"></div>
      <div className="hero-legibility-gradient"></div>
      <div className="hero-bottom-fade"></div>
      <div className="hero-mobile-overlay"></div>

      {/* Brillo que sigue al cursor + destellos titilando — puramente
          decorativo, no bloquea clicks (pointer-events: none), y solo se
          activan en desktop (ver gsap.matchMedia arriba + CSS). */}
      <div className="hero-glow" ref={glowRef}></div>
      {sparkles.map((s, i) => (
        <i
          key={i}
          ref={(el) => (sparkleRefs.current[i] = el)}
          className="bi bi-stars hero-sparkle"
          style={{ top: s.top, left: s.left, fontSize: s.size }}
        ></i>
      ))}

      <div className="container" ref={contentRef}>
        <div className="row">
          <div className="col-lg-7">
            <span className="badge-pill-soft mb-3">
              <i className="bi bi-stars me-1"></i> Impresión 3D para verdaderos fans
            </span>
            <h1 className="hero-title fw-bold mb-2" ref={titleRef}>
              Tus fandoms,<br />
              <span className="text-fans3d-red">impresos</span> en 3D
            </h1>

            {/* Garabato decorativo que se "imprime" solo al cargar la página. */}
            <svg
              className="hero-squiggle mb-3"
              width="220"
              height="20"
              viewBox="0 0 220 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                ref={squigglePathRef}
                d="M2 14C22 4 42 4 62 12C82 20 102 20 122 10C142 2 162 2 182 10C192 14 202 16 218 8"
                stroke="var(--f3d-red)"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>

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
