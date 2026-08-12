// Registro centralizado de GSAP y sus plugins.
// Desde GSAP 3.13 (2025) todos los plugins —incluidos los que antes eran de
// pago en Club GSAP, como SplitText, DrawSVGPlugin y Flip— son gratis y
// vienen dentro del mismo paquete "gsap" de npm. No hace falta ninguna
// licencia ni paquete extra.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, Flip)

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, Flip }
