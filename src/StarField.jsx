import { useEffect, useRef } from 'react'
import { useTheme } from './context/ThemeProvider'
import './StarField.css'

/**
 * Deep-space backdrop inspired by the SpaceX ISS docking simulator:
 * a dense field of twinkling, slowly-drifting stars over a black void,
 * with the glowing blue limb of Earth curving across the bottom.
 */
export default function StarField() {
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const themeRef = useRef(theme)
  themeRef.current = theme

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h, dpr
    let stars = []
    let raf
    let t = 0

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.floor((w * h) / 1400)
      stars = []
      for (let i = 0; i < count; i++) {
        const depth = Math.random()
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: depth * 1.4 + 0.25,
          baseAlpha: depth * 0.6 + 0.15,
          twSpeed: Math.random() * 0.03 + 0.006,
          twPhase: Math.random() * Math.PI * 2,
          drift: depth * 0.14 + 0.02,
          // faint blue/warm tint on a few stars
          tint: Math.random() > 0.85 ? (Math.random() > 0.5 ? 'cyan' : 'warm') : 'white',
        })
      }
    }

    const tintColor = (tint, a, light) => {
      if (light) {
        if (tint === 'cyan') return `rgba(8, 145, 178, ${a})`
        if (tint === 'warm') return `rgba(180, 120, 60, ${a})`
        return `rgba(90, 80, 140, ${a})`
      }
      if (tint === 'cyan') return `rgba(150, 235, 255, ${a})`
      if (tint === 'warm') return `rgba(255, 226, 200, ${a})`
      return `rgba(255, 255, 255, ${a})`
    }

    const draw = () => {
      t += 0.016
      const light = themeRef.current === 'light'

      // backdrop void
      const bg = ctx.createLinearGradient(0, 0, 0, h)
      if (light) {
        bg.addColorStop(0, '#eef2fb')
        bg.addColorStop(0.55, '#e7ecf8')
        bg.addColorStop(1, '#dfe6f5')
      } else {
        bg.addColorStop(0, '#02010a')
        bg.addColorStop(0.55, '#04030f')
        bg.addColorStop(1, '#070516')
      }
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)
      ctx.globalAlpha = light ? 0.5 : 1

      // stars
      stars.forEach((s) => {
        s.y += s.drift
        if (s.y > h + 2) {
          s.y = -2
          s.x = Math.random() * w
        }
        const tw = Math.sin(t * s.twSpeed * 60 + s.twPhase) * 0.4 + 0.6
        const a = Math.max(0, Math.min(1, s.baseAlpha * tw))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = tintColor(s.tint, a, light)
        ctx.fill()
        // glow on the brightest stars
        if (s.r > 1.1 && !light) {
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 3.5, 0, Math.PI * 2)
          ctx.fillStyle = tintColor(s.tint, a * 0.08, light)
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1
      drawEarth(light)
      raf = requestAnimationFrame(draw)
    }

    // Earth's limb curving across the bottom of the view
    const drawEarth = (light) => {
      const cx = w * 0.5
      const cy = h + w * 0.85 // center well below the viewport
      const radius = w * 0.95

      // planet body
      const body = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.35,
        radius * 0.1,
        cx,
        cy,
        radius
      )
      if (light) {
        body.addColorStop(0, '#cfe0f5')
        body.addColorStop(0.5, '#bcd0ee')
        body.addColorStop(0.85, '#aec6ea')
        body.addColorStop(1, '#a4bfe6')
      } else {
        body.addColorStop(0, '#1a4a7a')
        body.addColorStop(0.5, '#0a2547')
        body.addColorStop(0.85, '#04101f')
        body.addColorStop(1, '#020814')
      }
      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.fillStyle = body
      ctx.fill()

      // atmospheric glow along the limb
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      const atmo = ctx.createRadialGradient(cx, cy, radius * 0.97, cx, cy, radius * 1.08)
      const glow = light ? '120, 180, 255' : '0, 200, 255'
      atmo.addColorStop(0, `rgba(${glow}, 0)`)
      atmo.addColorStop(0.6, `rgba(${glow}, ${light ? 0.1 : 0.18})`)
      atmo.addColorStop(0.85, `rgba(90, 170, 255, ${light ? 0.15 : 0.28})`)
      atmo.addColorStop(1, `rgba(${glow}, 0)`)
      ctx.beginPath()
      ctx.arc(cx, cy, radius * 1.08, 0, Math.PI * 2)
      ctx.fillStyle = atmo
      ctx.fill()
      ctx.restore()
    }

    build()
    draw()
    window.addEventListener('resize', build)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', build)
    }
  }, [])

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />
}
