import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsapSetup'

const fandoms = [
  'Dragon Ball',
  'Star Wars',
  'Stranger Things',
  'Pokémon',
  'Disney',
  'Nintendo',
  'Marvel',
  'DC Comics',
  'Masters of the Universe',
  'Matchbox',
]

export default function FandomMarquee() {
  const trackRef = useRef(null)
  const tweenRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // El track tiene la lista duplicada (ver JSX), así que animar hasta
      // -50% del ancho total y repetir da la sensación de loop infinito
      // sin salto ni corte.
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 22,
        ease: 'none',
        repeat: -1,
      })
    }, trackRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      className="fandom-marquee"
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.resume()}
    >
      <div className="fandom-marquee-track" ref={trackRef}>
        {[...fandoms, ...fandoms].map((name, i) => (
          <span className="fandom-marquee-item" key={`${name}-${i}`}>
            <i className="bi bi-stars me-2"></i>
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
