import { useState, useEffect, useRef } from 'react'
import './CartoonGirl.css'

/**
 * Interactive cartoon girl inspired by david-hckh.com.
 * She tracks the cursor with her eyes + a subtle head tilt, blinks on a
 * natural rhythm, waves periodically, and gently "breathes" while idle.
 */
export default function CartoonGirl() {
  const wrapRef = useRef(null)
  const [pupil, setPupil] = useState({ x: 0, y: 0 })
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [blink, setBlink] = useState(false)
  const [wave, setWave] = useState(true)

  // Track cursor: pupils drift toward it, head tilts slightly.
  useEffect(() => {
    const onMove = (e) => {
      const el = wrapRef.current
      if (!el) return
      const box = el.getBoundingClientRect()
      const cx = box.left + box.width / 2
      const cy = box.top + box.height * 0.32 // eye level
      const dx = (e.clientX - cx) / box.width
      const dy = (e.clientY - cy) / box.height

      const clamp = (v, m) => Math.max(-m, Math.min(m, v))
      setPupil({ x: clamp(dx * 26, 6), y: clamp(dy * 26, 5) })
      setTilt({ rx: clamp(-dy * 14, 8), ry: clamp(dx * 18, 12) })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Natural blinking on a randomized interval.
  useEffect(() => {
    let timeout
    const loop = () => {
      const next = 2200 + Math.random() * 3200
      timeout = setTimeout(() => {
        setBlink(true)
        setTimeout(() => setBlink(false), 150)
        loop()
      }, next)
    }
    loop()
    return () => clearTimeout(timeout)
  }, [])

  // Wave on load, then every so often.
  useEffect(() => {
    const start = setTimeout(() => setWave(false), 2600)
    const loop = setInterval(() => {
      setWave(true)
      setTimeout(() => setWave(false), 2400)
    }, 11000)
    return () => {
      clearTimeout(start)
      clearInterval(loop)
    }
  }, [])

  return (
    <div className="cg-stage" ref={wrapRef}>
      <div className="cg-glow" />
      <div
        className="cg-float"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <svg
          className="cg-svg"
          viewBox="0 0 300 380"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Animated cartoon illustration"
        >
          <defs>
            <linearGradient id="cgHair" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2a1748" />
              <stop offset="55%" stopColor="#3a1d63" />
              <stop offset="100%" stopColor="#1a1030" />
            </linearGradient>
            <linearGradient id="cgHairShine" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#8a2be2" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="cgTop" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8a2be2" />
              <stop offset="100%" stopColor="#4b1391" />
            </linearGradient>
            <radialGradient id="cgSkin" cx="50%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#ffe0cf" />
              <stop offset="100%" stopColor="#f6c3a8" />
            </radialGradient>
            <filter id="cgSoft" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* back hair */}
          <path
            className="cg-hair-back"
            d="M78 150 C60 90 95 40 150 40 C205 40 240 90 222 150 C236 210 232 300 210 330 L90 330 C68 300 64 210 78 150 Z"
            fill="url(#cgHair)"
          />

          {/* neck */}
          <rect x="132" y="196" width="36" height="44" rx="16" fill="url(#cgSkin)" />
          <path d="M132 214 q18 18 36 0 v22 h-36 Z" fill="#e9ac8e" opacity="0.5" />

          {/* torso / top */}
          <path
            d="M96 250 C110 226 130 232 150 232 C170 232 190 226 204 250 C216 276 222 320 222 360 L78 360 C78 320 84 276 96 250 Z"
            fill="url(#cgTop)"
          />
          <path
            d="M150 232 C168 244 176 300 172 360 L128 360 C124 300 132 244 150 232 Z"
            fill="#ffffff"
            opacity="0.08"
          />

          {/* waving arm (transform-origin set in CSS) */}
          <g className={`cg-arm ${wave ? 'cg-arm--wave' : ''}`}>
            <path
              d="M198 256 C226 250 252 214 258 176"
              stroke="url(#cgTop)"
              strokeWidth="26"
              strokeLinecap="round"
              fill="none"
            />
            <circle cx="260" cy="166" r="17" fill="url(#cgSkin)" />
          </g>

          {/* head */}
          <g
            style={{
              transform: `rotate(${tilt.ry * 0.12}deg)`,
              transformOrigin: '150px 190px',
            }}
          >
            <ellipse cx="150" cy="140" rx="66" ry="72" fill="url(#cgSkin)" />
            {/* ears */}
            <circle cx="86" cy="150" r="12" fill="url(#cgSkin)" />
            <circle cx="214" cy="150" r="12" fill="url(#cgSkin)" />

            {/* blush */}
            <ellipse cx="108" cy="162" rx="14" ry="9" fill="#ff9fb3" opacity="0.55" filter="url(#cgSoft)" />
            <ellipse cx="192" cy="162" rx="14" ry="9" fill="#ff9fb3" opacity="0.55" filter="url(#cgSoft)" />

            {/* eyebrows */}
            <path d="M112 112 q16 -10 32 -2" stroke="#3a1d63" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M156 110 q16 -8 32 2" stroke="#3a1d63" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* eyes */}
            <g className={blink ? 'cg-eyes cg-eyes--blink' : 'cg-eyes'}>
              <ellipse cx="126" cy="140" rx="16" ry="19" fill="#ffffff" />
              <ellipse cx="174" cy="140" rx="16" ry="19" fill="#ffffff" />
              <g style={{ transform: `translate(${pupil.x}px, ${pupil.y}px)` }}>
                <circle cx="126" cy="140" r="9" fill="#2a1748" />
                <circle cx="174" cy="140" r="9" fill="#2a1748" />
                <circle cx="129" cy="136" r="3" fill="#ffffff" />
                <circle cx="177" cy="136" r="3" fill="#ffffff" />
              </g>
              {/* lids for blink */}
              <rect className="cg-lid" x="108" y="118" width="36" height="0" rx="10" fill="url(#cgSkin)" />
              <rect className="cg-lid" x="156" y="118" width="36" height="0" rx="10" fill="url(#cgSkin)" />
            </g>

            {/* nose + mouth */}
            <path d="M148 156 q4 6 0 10" stroke="#e29a7a" strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M138 176 q12 12 24 0" stroke="#c0506a" strokeWidth="4" strokeLinecap="round" fill="none" />

            {/* front hair / bangs */}
            <path
              className="cg-hair-front"
              d="M84 138 C74 78 110 44 150 44 C190 44 226 78 216 138 C206 120 196 108 180 108 C186 122 184 130 176 136 C168 116 156 108 150 108 C144 108 132 116 124 136 C116 130 114 122 120 108 C104 108 94 120 84 138 Z"
              fill="url(#cgHair)"
            />
            {/* neon highlight strand */}
            <path
              d="M118 60 C104 84 98 116 100 138"
              stroke="url(#cgHairShine)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
