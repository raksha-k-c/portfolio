import SEO from '../components/SEO'
import { BlogCard } from '../components/cards'
import { useReveal } from '../hooks'
import { posts } from '../data/blog'

export default function Blog() {
  useReveal()
  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="container page">
      <SEO title="Blog" path="/blog" description="Technical writing on AI, software engineering, web development, cloud, DevOps, and system design." />
      <div className="page-head">
        <span className="eyebrow">Writing</span>
        <h1>The <span className="text-grad">Blog</span></h1>
        <p>Deep dives and field notes on AI, engineering, and building reliable software.</p>
      </div>

      {sorted.length === 0 ? (
        <p className="center" style={{ color: 'var(--text-muted)', padding: '3rem 0' }}>
          First article coming soon. Check back shortly.
        </p>
      ) : (
        <div className="grid grid--3">
          {sorted.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  )
}
