import SEO from '../components/SEO'
import { useReveal } from '../hooks'
import { now } from '../data/now'

export default function Now() {
  useReveal()
  return (
    <div className="container page">
      <SEO title="Now" path="/now" description="What Raksha KC is focused on right now, including learning, building, reading, and exploring." />
      <div className="page-head">
        <span className="eyebrow">Updated {now.lastUpdated}</span>
        <h1>What I'm doing <span className="text-grad">now</span></h1>
        <p>{now.intro}</p>
      </div>

      <div className="grid grid--3">
        {now.sections.map((s) => (
          <div key={s.title} className="card tile reveal">
            <h3><span aria-hidden>{s.icon}</span> {s.title}</h3>
            <ul style={{ color: 'var(--text-muted)', marginTop: '0.8rem', paddingLeft: '1.2rem' }}>
              {s.items.map((it, i) => (
                <li key={i} style={{ marginBottom: '0.4rem' }}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="center" style={{ color: 'var(--text-muted)', marginTop: '3rem', fontSize: '0.9rem' }}>
        This is a <a className="text-grad" href="https://nownownow.com/about" target="_blank" rel="noreferrer">/now page</a>, a living snapshot that updates as things change.
      </p>
    </div>
  )
}
