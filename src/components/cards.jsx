import { Link } from 'react-router-dom'

const statusClass = (s) =>
  ({ Live: 'status--live', 'In progress': 'status--progress', Prototype: 'status--prototype', Research: 'status--research' }[s] || 'status--research')

export function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="card tile reveal">
      <div className={`tile__cover grad-cover ${project.cover}`}>
        <span className={`status ${statusClass(project.status)}`}>{project.status}</span>
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
