import { useEffect, useRef, useState } from 'react'
import SEO from '../components/SEO'
import { useReveal } from '../hooks'
import { skillGroups } from '../data/skills'

function SkillBar({ name, level }) {
  const ref = useRef(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setW(level)
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [level])
  return (
    <div className="skill-row" ref={ref}>
      <div className="skill-row__top">
        <span>{name}</span>
        <span style={{ color: 'var(--text-muted)' }}>{level}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-bar__fill" style={{ width: `${w}%` }} />
      </div>
    </div>
  )
}

export default function Skills() {
  useReveal()
  return (
    <div className="container page">
      <SEO title="Skills" path="/skills" description="Technical skills: languages, frontend, backend, databases, cloud, DevOps, AI/ML, embedded systems, and tools." />
      <div className="page-head">
        <span className="eyebrow">Capabilities</span>
        <h1>Skills & <span className="text-grad">proficiency</span></h1>
        <p>An honest snapshot of my toolkit across the stack, spanning embedded firmware to cloud and AI.</p>
      </div>

      <div className="grid grid--2">
        {skillGroups.map((g) => (
          <div key={g.category} className="card skill-card reveal">
            <h3><span aria-hidden>{g.icon}</span> {g.category}</h3>
            {g.skills.map((s) => (
              <SkillBar key={s.name} name={s.name} level={s.level} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
