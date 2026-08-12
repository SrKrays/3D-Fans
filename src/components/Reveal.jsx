import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsapSetup'

/**
 * Envoltorio reutilizable: hace fade-in + slide-up del contenido cuando
 * entra en pantalla al scrollear. Es la misma "onda" del hero, aplicada
 * a cualquier bloque (cards, columnas, listas) sin repetir la lógica de
 * GSAP en cada componente.
 */
export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0, y = 30, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0,
        y,
        duration: 0.7,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 88%',
        },
      })
    })
    return () => ctx.revert()
  }, [delay, y])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
