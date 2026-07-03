import { useState, useEffect, useRef } from 'react'
import hero3D from './assets/hero-3d.png'
import './App.css'

function App() {
  const canvasRef = useRef(null)

  // HOOK 1: Handles right-click and image-dragging security guards
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  // HOOK 2: Handles the custom browser tab title and 3D Canvas matrix loop
  useEffect(() => {
    document.title = "Raksha K C | SDE"

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.offsetWidth
      canvas.height = canvas.parentElement.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const cubeVertices = [
      {x: -1, y: -1, z: -1}, {x: 1, y: -1, z: -1}, {x: 1, y: 1, z: -1}, {x: -1, y: 1, z: -1},
      {x: -1, y: -1, z: 1},  {x: 1, y: -1, z: 1},  {x: 1, y: 1, z: 1},  {x: -1, y: 1, z: 1}
    ]
    const cubeFaces = [
      [0,1], [1,2], [2,3], [3,0],
      [4,5], [5,6], [6,7], [7,4],
      [0,4], [1,5], [2,6], [3,7]
    ]

    const geometricAssets = []
    const assetCount = 14

    for (let i = 0; i < assetCount; i++) {
      geometricAssets.push({
        x: Math.random() * 400 - 150, 
        y: Math.random() * 500 - 250,
        z: Math.random() * 300 - 150,
        size: Math.random() * 18 + 12,
        angleX: Math.random() * Math.PI,
        angleY: Math.random() * Math.PI,
        rotSpeedX: Math.random() * 0.008 + 0.003,
        rotSpeedY: Math.random() * 0.008 + 0.003,
        color: i % 2 === 0 ? '#00ffff' : '#8a2be2',
        floatOffset: Math.random() * Math.PI
      })
    }

    let time = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += 0.015

      const centerX = canvas.width > 968 ? canvas.width * 0.72 : canvas.width * 0.5
      const centerY = canvas.height * 0.52

      geometricAssets.forEach((obj) => {
        obj.angleX += obj.rotSpeedX
        obj.angleY += obj.rotSpeedY

        const currentY = centerY + obj.y + Math.sin(time + obj.floatOffset) * 20
        const currentX = centerX + obj.x

        const projectedPoints = cubeVertices.map(v => {
          let dy1 = v.y * Math.cos(obj.angleX) - v.z * Math.sin(obj.angleX)
          let dz1 = v.y * Math.sin(obj.angleX) + v.z * Math.cos(obj.angleX)
          let dx2 = v.x * Math.cos(obj.angleY) + dz1 * Math.sin(obj.angleY)
          let dz2 = -v.x * Math.sin(obj.angleY) + dz1 * Math.cos(obj.angleY)

          const perspective = 300 / (300 + dz2 + obj.z)
          return {
            x: currentX + dx2 * obj.size * perspective,
            y: currentY + dy1 * obj.size * perspective
          }
        })

        ctx.strokeStyle = obj.color
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.2

        cubeFaces.forEach(edge => {
          ctx.beginPath()
          ctx.moveTo(projectedPoints[edge[0]].x, projectedPoints[edge[0]].y)
          ctx.lineTo(projectedPoints[edge[1]].x, projectedPoints[edge[1]].y)
          ctx.stroke()
        })

        ctx.fillStyle = obj.color
        projectedPoints.forEach(p => {
          ctx.globalAlpha = 0.5
          ctx.fillRect(p.x - 1.5, p.y - 1.5, 3, 3)
        })
      })
    }

    const interval = setInterval(draw, 24)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="portfolio-container">
      {/* IMPROVED MOBILE-SAFE NAVBAR */}
      <header className="navbar">
        <div className="logo">Raksha K C</div>
        <nav className="nav-links">
          <a href="#hero">Home</a>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#talent">Art</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="hero-3d-section">
        <canvas ref={canvasRef} className="matrix-canvas"></canvas>

        <div className="hero-3d-container">
          <div className="hero-text-side">
            <div className="badge3d">Software Development Engineer • Medical Electronics</div>
            <h1 className="main-title">
              Writing Elegant Code, <br />
              <span className="gradient-text">Engineering Full Ecosystems</span>
            </h1>
            <p className="tagline">
              Software Development Engineer Intern at Scoop Labs and Medical Electronics Undergrad at BMS College of Engineering. Moving fluidly between script logic, deep data layout systems, and raw performance engineering.
            </p>
            <div className="cta-buttons-3d">
              <a href="#experience" className="btn-3d btn-primary-3d">Explore Shipments</a>
              <a href="#talent" className="btn-3d btn-secondary-3d">Rhythm & Arts</a>
            </div>
          </div>
          
          <div className="hero-visual-side">
            <div className="scene3d">
              <div className="card3d">
                <img src={hero3D} alt="Raksha K C" className="avatar-img" />
                <div className="layer-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRACK DETAILS */}
      <section className="tracks-section">
        <div className="track-card blue-track">
          <div className="track-icon">⚡</div>
          <h3>Software Engineering</h3>
          <p>Deploying production workflows, assembling end-to-end component trees, and scaling reactive client-side code structures.</p>
        </div>
        <div className="track-card purple-track">
          <div className="track-icon">🥁</div>
          <h3>Performing Arts</h3>
          <p>Trained Carnatic classical vocalist and solo performer translating complex mathematical rhythm frameworks onto live stages.</p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section dark-bg">
        <div className="section-content">
          <h2 className="section-title">The Blueprint</h2>
          <div className="biography-layout">
            <p className="bio-highlight">
              Fast execution, strict architectural patterns, and a mindset built for debugging complex systems.
            </p>
            <p className="bio-body">
              Currently engineering at the intersection of medical systems logic and full-stack environments at BMS College of Engineering. I specialize in breaking down large problems into micro-modular components, building flawless interactions, and weaving structural discipline directly into the code base.
            </p>
            <div className="skills-matrix">
              <div className="matrix-col">
                <h4>Engineering Stack</h4>
                <ul>
                  <li>JavaScript (ES6+) & Core React Architecture</li>
                  <li>HTML5 & Complex Layout Geometry (Grid / Flex)</li>
                  <li>Application Optimization & State Pipelines</li>
                  <li>Git Version Control & Deployment Engineering</li>
                </ul>
              </div>
              <div className="matrix-col">
                <h4>Analytical & Creative Systems</h4>
                <ul>
                  <li>Medical Instrumentation Engineering</li>
                  <li>Biomedical Signals & Analytical Logic</li>
                  <li>Carnatic Vocal Patterns & Melodic Improvisation</li>
                  <li>Classical Indian Dance & Spatial Coordination</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK HISTORY TIMELINE */}
      <section id="experience" className="section System-bg">
        <div className="section-content">
          <h2 className="section-title">Professional Stunts</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="date">Apr 2026 — Present</span>
              <h3>Software Development Engineer Intern</h3>
              <span className="timeline-company">Scoop Labs — Bengaluru, India</span>
              <p>Architecting client platforms, shipping modular frontend systems, and deploying pixel-perfect web properties using modern engineering methodologies.</p>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot"></div>
              <span className="date">Jul 2025 — Aug 2025</span>
              <h3>Biomedical Engineering Intern</h3>
              <span className="timeline-company">Sri Jayadeva Institute of Cardiovascular Sciences and Research — Bengaluru, India</span>
              <p>Analyzed mission-critical clinical gear workflows, reverse-engineered device interface metrics, and tracked signal integrity on live hardware systems.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMICS */}
      <section id="education" className="section dark-bg">
        <div className="section-content">
          <h2 className="section-title">Academic Origins</h2>
          <div className="project-grid" style={{ gridTemplateColumns: '1fr' }}>
            <div className="project-card">
              <div className="proj-tech">Sep 2023 — Present</div>
              <h3>B.E. in Medical Electronics Engineering</h3>
              <h4 className="card-sub-inst" style={{ color: 'var(--cyan-glow)', margin: '0.5rem 0' }}>BMS College of Engineering</h4>
              <p>Focusing on biological signal processing architectures, computational circuitry blueprints, and foundational hardware systems integration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FINE ARTS MEDIA */}
      <section id="talent" className="section gallery-bg">
        <div className="section-content">
          <h2 className="section-title">The Creative Engine</h2>
          <p className="subtitle">Visual performance and acoustic math in motion.</p>
          <div className="talent-grid">
            <div className="talent-card video-card">
              <div className="talent-icon">🎤</div>
              <h3>Classical Vocals</h3>
              <p>Exploring complex rhythmic structures and timeless arrangements from the Carnatic music paradigm.</p>
              <div className="media-frame-container">
                <div className="media-placeholder-elite">
                  <span className="play-icon">▶</span>
                  <span>Initialize Audio Vault</span>
                </div>
              </div>
            </div>
            <div className="talent-card video-card">
              <div className="talent-icon">🩰</div>
              <h3>Classical Dance</h3>
              <p>Stage performances built on high-precision geometry, storytelling mudras, and syncopated time cycles.</p>
              <div className="media-frame-container">
                <div className="media-placeholder-elite">
                  <span className="play-icon">▶</span>
                  <span>Stream Performance Reel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CHANNELS */}
      <section id="contact" className="section contact-section">
        <h2>Interlock Pipelines</h2>
        <p>Looking to ship features, accelerate builds, or collaborate on creative systems engineering? Let's connect.</p>
        <div className="contact-links">
          <a href="mailto:raksha.chandru66@gmail.com" className="btn-3d btn-primary-3d">Ping Me</a>
          <a href="https://github.com/raksha-k-c" target="_blank" rel="noreferrer" className="btn-3d btn-secondary-3d">GitHub Core</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Raksha K C. Rendered with React & Canvas 2D Vector Pipelines.</p>
      </footer>
    </div>
  )
}

export default App