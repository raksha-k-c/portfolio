import { useState } from 'react'
import SEO from '../components/SEO'
import SocialLinks from '../components/SocialLinks'
import { useReveal } from '../hooks'
import { profile } from '../data/profile'

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 7 10 7 10-7" />
  </svg>
)
const FileIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
)
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)

export default function Contact() {
  useReveal()
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    // No backend in this stack, so this opens the user's mail client with a prefilled message.
    const subject = encodeURIComponent(`Portfolio contact from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\nfrom ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="container page">
      <SEO title="Contact" path="/contact" description="Get in touch with Raksha KC through email, LinkedIn, GitHub, résumé, and a contact form." />
      <div className="page-head">
        <span className="eyebrow">Say hello</span>
        <h1>Let's <span className="text-grad">connect</span></h1>
        <p>Open to software & AI roles, freelance work, and collaborations. I usually reply within a day.</p>
      </div>

      <div className="contact-grid">
        <div className="card tile reveal">
          <h3>Send a message</h3>
          <form onSubmit={onSubmit} style={{ marginTop: '1rem' }}>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" required value={form.name} onChange={onChange} placeholder="Your name" />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" required value={form.email} onChange={onChange} placeholder="you@example.com" />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required value={form.message} onChange={onChange} placeholder="What would you like to build together?" />
            </div>
            <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>Send message</button>
            {sent && <p className="form-note">Opening your mail app… if nothing happens, email me directly at {profile.email}.</p>}
            <p className="form-note">This form opens your email client (no backend needed in this stack).</p>
          </form>
        </div>

        <div>
          <div className="card contact-link reveal">
            <span className="contact-link__icon"><MailIcon /></span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
          <div className="card contact-link reveal" style={{ marginTop: '1rem' }}>
            <span className="contact-link__icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
            </span>
            <a href={profile.socials.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
          <div className="card contact-link reveal" style={{ marginTop: '1rem' }}>
            <span className="contact-link__icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58A12 12 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </span>
            <a href={profile.socials.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <div className="card contact-link reveal" style={{ marginTop: '1rem' }}>
            <span className="contact-link__icon"><FileIcon /></span>
            <a href={profile.resumeUrl} download>Download résumé</a>
          </div>
          <SocialLinks style={{ marginTop: '1.25rem' }} />
          <div className="map-placeholder reveal">
            <PinIcon />
            <span>{profile.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
