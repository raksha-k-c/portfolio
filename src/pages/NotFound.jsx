import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFound() {
  return (
    <div className="container page">
      <SEO title="404 · Not found" description="This page drifted off into space." />
      <div className="notfound">
        <h1 className="text-grad">404</h1>
        <h2>Lost in space</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: 420 }}>
          The page you're looking for has drifted beyond the stars. Let's get you back on course.
        </p>
        <div className="hero__cta" style={{ justifyContent: 'center', marginTop: '1rem' }}>
          <Link to="/" className="btn btn--primary">Back home</Link>
          <Link to="/projects" className="btn btn--ghost">See projects</Link>
        </div>
      </div>
    </div>
  )
}
