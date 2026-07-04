import SEO from '../components/SEO'
import { useReveal } from '../hooks'
import { experience } from '../data/experience'

export default function Experience() {
  useReveal()
  return (
    <div className="container page">
      <SEO title="Experience" path="/experience" description="Professional experience of Raksha KC: internships, research, leadership, and open-source work." />
      <div className="page-head">
        <span className="eyebrow">Track record</span>
        <h1>Experience & <span className="text-grad">roles</span></h1>
        <p>Internships, research, and leadership, with room to grow this list every year.</p>
      </div>

      <section className="section">
        <div className="timeline">
          {experience.map((e, i) => (
            <div key={i} className="tl-item reveal">
              <span className="chip chip--accent" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>{e.type}</span>
              <span className="tl-period" style={{ display: 'block' }}>{e.period}</span>
              <h3>{e.role}</h3>
              <span className="tl-org">{e.org} · {e.location}</span>
              <ul>
                {e.points.map((p, j) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
