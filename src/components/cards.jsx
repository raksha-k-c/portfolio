import { Link } from 'react-router-dom'

const statusClass = (s) =>
  ({ Live: 'status--live', 'In progress': 'status--progress', Prototype: 'status--prototype', Research: 'status--research' }[s] || 'status--research')

export function ProjectCard({ project }) {
  
  // Interactive 3D element matrix orientation computations
  const handleMouseMove = (e) => {
    const card = e.currentTarget
    const box = card.getBoundingClientRect()
    const x = (e.clientX - box.left) / box.width - 0.5
    const y = (e.clientY - box.top) / box.height - 0.5
    
    card.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.01)`
    
    const visual = card.querySelector('.project-viewport-visual')
    if (visual) {
      visual.style.transform = `translateX(${x * 10}px) translateY(${y * 10}px) translateZ(15px)`
    }
  }

  const handleMouseLeave = (e) => {
    const card = e.currentTarget
    card.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`
    
    const visual = card.querySelector('.project-viewport-visual')
    if (visual) {
      visual.style.transform = `translateX(0px) translateY(0px) translateZ(0px)`
    }
  }

  return (
    <Link 
      to={`/projects/${project.slug}`} 
      className="card tile reveal premium-interactive-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Immersive Viewport Layout Container instead of abstract flat colors */}
      <div className={`project-viewport-container ${project.bgClass || ''}`}>
        <div className={project.layerClass || ''}></div>
        {project.image && (
          <img 
            src={project.image} 
            alt={project.title} 
            className={`project-viewport-visual ${project.imgClass || ''}`} 
          />
        )}
        <span className={`status ${statusClass(project.status)}`} style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
          {project.status}
        </span>
      </div>

      <h3>{project.title}</h3>
      <p>{project.tagline}</p>
      <div className="tile__foot">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
        <span className="chip chip--accent" style={{ marginLeft: 'auto' }}>{project.year}</span>
      </div>
    </Link>
  )
}

export function BlogCard({ post }) {
  const date = new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  return (
    <Link to={`/blog/${post.slug}`} className="card tile reveal">
      <div className={`tile__cover grad-cover ${post.cover}`}>
        <span className="chip chip--accent">{post.category}</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="tile__foot meta-row">
        <span>{date}</span>
        <span style={{ marginLeft: 'auto' }}>{post.readingTime} min read</span>
      </div>
    </Link>
  )
}