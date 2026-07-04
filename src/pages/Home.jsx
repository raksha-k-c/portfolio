import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import CartoonGirl from '../CartoonGirl'
import { ProjectCard, BlogCard } from '../components/cards'
import { useReveal } from '../hooks'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { posts } from '../data/blog'
import { techStack } from '../data/tech'

export default function Home() {
  useReveal()
  const featured = projects.filter((p) => p.featured).slice(0, 3)
  const latest = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2)

  return (
    <div className="container">
      <SEO
        description={profile.short}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.name,
          jobTitle: profile.role,
          url: 'https://rakshakc.xyz',
          sameAs: Object.values(profile.socials),
        }}
      />

      {/* HERO */}
      <section className="hero">
        <div>
          <span className="hero__eyebrow"><span className="dot" /> Available for opportunities</span>
          <h1 className="hero__title">
            Hi, I'm {profile.name.split(' ')[0]}, a<br />
            <span className="text-grad">{profile.role}</span>
          </h1>
          <p className="hero__desc">{profile.short}</p>
          <div className="hero__cta">
            <Link to="/projects" className="btn btn--primary">View Projects</Link>
            <Link to="/blog" className="btn btn--ghost">Read Blog</Link>
            <Link to="/contact" className="btn btn--ghost">Contact Me</Link>
          </div>
        </div>
        <div className="hero__visual">
          <CartoonGirl />
        </div>
      </section>

      {/* QUICK STATS */}
      <section className="section">
        <div className="grid grid--4">
          {profile.stats.map((s) => (
            <div key={s.label} className="card stat reveal">
              <div className="stat__value text-grad">{s.value}</div>
              <div className="stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Selected work</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-sub">A few things I've designed, built, and shipped.</p>
        </div>
        <div className="grid grid--3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <div className="center mt-3">
          <Link to="/projects" className="btn btn--ghost">All projects →</Link>
        </div>
      </section>

      {/* LATEST BLOGS */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Writing</span>
          <h2 className="section-title">Latest from the Blog</h2>
          <p className="section-sub">Notes on AI, engineering, and building things.</p>
        </div>
        <div className="grid grid--2">
          {latest.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
        <div className="center mt-3">
          <Link to="/blog" className="btn btn--ghost">Read all articles →</Link>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Toolbox</span>
          <h2 className="section-title">Technology Stack</h2>
        </div>
        <div className="tech-grid reveal">
          {techStack.map((t) => (
            <span key={t.name} className="tech-pill"><span aria-hidden>{t.icon}</span> {t.name}</span>
          ))}
        </div>
      </section>

      {/* CURRENT FOCUS */}
      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Right now</span>
          <h2 className="section-title">Current Focus</h2>
        </div>
        <ul className="focus-list reveal">
          {profile.currentFocus.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      {/* FOOTER CTA */}
      <section className="section">
        <div className="card cta-band reveal">
          <span className="eyebrow">Let's build together</span>
          <h2 className="section-title" style={{ marginBottom: '0.6rem' }}>Have a project or role in mind?</h2>
          <p className="section-sub" style={{ margin: '0 auto 1.8rem' }}>
            I'm open to software engineering and AI opportunities, freelance work, and collaborations.
          </p>
          <Link to="/contact" className="btn btn--primary">Get in touch</Link>
        </div>
      </section>
    </div>
  )
}
