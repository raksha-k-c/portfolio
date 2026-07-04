import SEO from '../components/SEO'
import { useReveal } from '../hooks'

const journey = [
  { year: '2023', title: 'Started B.E. in Medical Electronics', text: 'Began at BMS College of Engineering, drawn to the meeting point of hardware, signals, and software.' },
  { year: '2024', title: 'Fell for AI & research', text: 'Built my first medical-imaging model (retinal vessel segmentation) and got hooked on applied AI.' },
  { year: '2025', title: 'Clinical and embedded experience', text: 'Interned in biomedical engineering and prototyped the Smart Injector, which bridges devices and code.' },
  { year: '2026', title: 'Full-stack engineering', text: 'Joined Scoop Labs as an SDE intern, shipping production web systems and writing about the journey.' },
]

export default function About() {
  useReveal()
  return (
    <div className="container page">
      <SEO title="About" path="/about" description="The story, journey, education, and interests of Raksha KC, software developer and AI engineer." />

      <div className="page-head">
        <span className="eyebrow">About me</span>
        <h1>Engineer at the intersection of <span className="text-grad">software, AI & medicine</span></h1>
        <p>I like turning messy real-world problems into clean, reliable systems, and documenting what I learn so others can move faster.</p>
      </div>

      <section className="section">
        <div className="grid grid--2">
          <div className="card tile reveal">
            <h3>My story</h3>
            <p style={{ marginTop: '0.8rem' }}>
              I'm a Medical Electronics undergrad who found a home in software. What started as curiosity about how
              medical devices work became a love for building the software and AI that makes them smarter. Today I move
              fluidly between frontend, backend, and machine learning, always with a bias toward shipping.
            </p>
          </div>
          <div className="card tile reveal" data-reveal-delay="120">
            <h3>What I enjoy building</h3>
            <ul style={{ color: 'var(--text-muted)', marginTop: '0.8rem', paddingLeft: '1.2rem' }}>
              <li>Full-stack products with thoughtful, fast UIs</li>
              <li>Applied-AI systems for imaging and diagnostics</li>
              <li>Developer-friendly tools and clean architectures</li>
              <li>Anything that blends hardware, data, and software</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="grid grid--3">
          <div className="card tile reveal">
            <h3>🎓 Education</h3>
            <p style={{ marginTop: '0.6rem' }}>B.E. Medical Electronics Engineering at BMS College of Engineering (2023 to Present).</p>
          </div>
          <div className="card tile reveal" data-reveal-delay="100">
            <h3>🎯 Career goals</h3>
            <p style={{ marginTop: '0.6rem' }}>Grow into a strong software + AI engineer, contribute to impactful healthcare tech, and keep writing.</p>
          </div>
          <div className="card tile reveal" data-reveal-delay="200">
            <h3>🌱 Currently learning</h3>
            <p style={{ marginTop: '0.6rem' }}>Distributed systems, advanced PyTorch, and cloud-native development.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Growth</span>
          <h2 className="section-title">A timeline of my journey</h2>
        </div>
        <div className="timeline">
          {journey.map((j) => (
            <div key={j.year} className="tl-item reveal">
              <span className="tl-period">{j.year}</span>
              <h3>{j.title}</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>{j.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Beyond code</span>
          <h2 className="section-title">Interests</h2>
        </div>
        <div className="tech-grid reveal">
          {['Carnatic vocals', 'Classical dance', 'Medical devices', 'Open source', 'Technical writing', 'System design', 'Reading'].map((i) => (
            <span key={i} className="tech-pill">{i}</span>
          ))}
        </div>
      </section>
    </div>
  )
}
