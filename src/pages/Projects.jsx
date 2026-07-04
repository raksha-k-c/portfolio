import { useState, useMemo } from 'react'
import SEO from '../components/SEO'
import { ProjectCard } from '../components/cards'
import { useReveal } from '../hooks'
import { projects } from '../data/projects'

// Filters only earn their place once there are enough projects to sift through.
const FILTER_THRESHOLD = 6

export default function Projects() {
  useReveal()
  const [filter, setFilter] = useState('All')
  const tags = useMemo(() => ['All', ...new Set(projects.flatMap((p) => p.tags))], [])
  const showFilters = projects.length >= FILTER_THRESHOLD
  const shown = showFilters && filter !== 'All' ? projects.filter((p) => p.tags.includes(filter)) : projects

  return (
    <div className="container page">
      <SEO title="Projects" path="/projects" description="Projects by Raksha KC, spanning full-stack apps, AI systems, and embedded and biomedical builds." />
      <div className="page-head">
        <span className="eyebrow">Portfolio</span>
        <h1>Things I've <span className="text-grad">built</span></h1>
        <p>Full-stack products, applied-AI systems, and embedded prototypes. Click any project for the full case study.</p>
      </div>

      {showFilters && (
        <div className="gallery-filters">
          {tags.map((t) => (
            <button key={t} className={`filter-btn ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid--3">
        {shown.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  )
}
