import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { useReveal } from '../hooks'
import { getProject, projects } from '../data/projects'
import NotFound from './NotFound'
import CartoonGirl from '../CartoonGirl'

const Block = ({ title, children }) => (
  <section className="section reveal" style={{ padding: '1.5rem 0' }}>
    <span className="eyebrow">{title}</span>
    <div style={{ marginTop: '0.6rem', color: 'var(--text)', lineHeight: 1.8 }}>{children}</div>
  </section>
)

export default function ProjectDetail() {
  const { slug } = useParams()
  useReveal()
  const project = getProject(slug)
  if (!project) return <NotFound />

  const idx = projects.findIndex((p) => p.slug === slug)
  const next = projects[(idx + 1) % projects.length]

  return (
    <div className="container page">
      <SEO
        title={project.title}
        path={`/projects/${project.slug}`}
        description={project.tagline}
        type="article"
      />
      <Link to="/projects" style={{ color: 'var(--text-muted)' }}>← All projects</Link>

      {project.slug === 'portfolio-website' ? (
        <div
          style={{
            height: 260,
            borderRadius: 'var(--r-lg)',
            margin: '1.5rem 0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 2rem',
            position: 'relative',
            border: '1px solid var(--line, rgba(255,255,255,0.08))',
            overflow: 'hidden',
          }}
        >
          <span className="chip" style={{ position: 'absolute', left: '1.5rem', bottom: '1.5rem' }}>{project.year}</span>
          <div style={{ transform: 'scale(0.85)', transformOrigin: 'right center' }}>
            <CartoonGirl />
          </div>
        </div>
      ) : project.coverImage ? (
        <div
          style={{
            height: 260,
            borderRadius: 'var(--r-lg)',
            margin: '1.5rem 0 2rem',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '1.5rem',
            backgroundImage: `url(${project.coverImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <span className="chip">{project.year}</span>
        </div>
      ) : (
        <div className={`grad-cover ${project.cover}`} style={{ height: 260, borderRadius: 'var(--r-lg)', margin: '1.5rem 0 2rem', display: 'flex', alignItems: 'flex-end', padding: '1.5rem' }}>
          <span className="chip">{project.year}</span>
        </div>
      )}

      <h1>{project.title}</h1>
      <p className="section-sub" style={{ maxWidth: 720 }}>{project.tagline}</p>

      <div className="tile__foot" style={{ margin: '1.2rem 0' }}>
        {project.tech.map((t) => <span key={t} className="chip">{t}</span>)}
      </div>
      <div className="hero__cta" style={{ marginBottom: '1rem' }}>
        {project.links.github && <a className="btn btn--ghost" href={project.links.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
        {project.links.demo && <a className="btn btn--primary" href={project.links.demo} target="_blank" rel="noreferrer">Live Demo ↗</a>}
      </div>

      <Block title="Problem statement">{project.problem}</Block>
      <Block title="Solution">{project.solution}</Block>
      <Block title="Architecture">{project.architecture}</Block>
      <Block title="Key features">
        <ul style={{ paddingLeft: '1.2rem' }}>
          {project.features.map((f, i) => <li key={i} style={{ marginBottom: '0.4rem' }}>{f}</li>)}
        </ul>
      </Block>
      <Block title="Challenges">{project.challenges}</Block>
      <Block title="Lessons learned">{project.lessons}</Block>


      <div className="card cta-band reveal">
        <span className="eyebrow">Next project</span>
        <h2 className="section-title" style={{ marginBottom: '1rem' }}>{next.title}</h2>
        <Link to={`/projects/${next.slug}`} className="btn btn--primary">View project →</Link>
      </div>
    </div>
  )
}
