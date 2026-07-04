import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import { navLinks } from './Navbar'
import SocialLinks from './SocialLinks'

export default function Footer() {
  const year = new Date().getFullYear()
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="nav__logo" style={{ fontSize: '1.3rem' }}>Raksha<span> KC</span></div>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.8rem', maxWidth: 320 }}>
            {profile.role} building products and applied-AI systems. Always learning in public.
          </p>
          <SocialLinks />
        </div>

        <div>
          <h4>Navigate</h4>
          {navLinks.slice(0, 6).map((l) => (
            <Link key={l.to} to={l.to}>{l.label}</Link>
          ))}
        </div>

        <div>
          <h4>Quick contact</h4>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.resumeUrl} download>Download résumé</a>
          <Link to="/contact">Contact form</Link>
          <span
            className="back-to-top"
            onClick={toTop}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toTop()}
            style={{ display: 'block', color: 'var(--cyan)', paddingTop: '0.6rem' }}
          >
            ↑ Back to top
          </span>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {year} {profile.name}. Built with React & Vite.</span>
        <span>Designed & developed in Bengaluru.</span>
      </div>
    </footer>
  )
}
