import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="portfolio-container">
      {/* 1. NAVIGATION BAR */}
      <header className="navbar">
        <div className="logo">Raksha K C</div>
        <nav>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* 2. HERO SECTION */}
      <section id="hero" className="hero-section">
        <h1>Hi, I'm Raksha 👋</h1>
        <h2>AI Engineer & Software Developer</h2>
        <p className="tagline">
          Building intelligent applications and modern web experiences in Bengaluru, India.
        </p>
        <div className="cta-buttons">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="section">
        <h2>About Me</h2>
        <p>
          I am passionate about creating impactful digital solutions combining robust software engineering 
          practices with cutting-edge Artificial Intelligence. 
        </p>
        <div className="skills-tags">
          <span>React</span>
          <span>JavaScript</span>
          <span>Python</span>
          <span>Artificial Intelligence</span>
          <span>Vite & Vercel</span>
        </div>
      </section>

      {/* 4. PROJECTS SECTION */}
      <section id="projects" className="section">
        <h2>Featured Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>Project Title 1</h3>
            <p>A brief description of an amazing AI tool or application you built.</p>
            <span className="tech-stack">React • Python</span>
          </div>
          <div className="project-card">
            <h3>Project Title 2</h3>
            <p>A beautiful dashboard or frontend web application showcasing clean UI components.</p>
            <span className="tech-stack">JavaScript • CSS</span>
          </div>
        </div>
      </section>

      {/* 5. CONTACT SECTION */}
      <section id="contact" className="section contact-section">
        <h2>Let's Connect</h2>
        <p>I'm always open to talking about development, AI engineering roles, or collaborations.</p>
        <div className="contact-links">
          <a href="mailto:raksha.chandru66@gmail.com">Email Me</a>
          <a href="https://github.com/raksha-k-c" target="_blank" rel="noreferrer">GitHub Profile</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 Raksha K C. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App