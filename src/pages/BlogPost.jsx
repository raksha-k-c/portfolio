import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import ReadingProgress from '../components/ReadingProgress'
import { useReveal } from '../hooks'
import { getPost, posts } from '../data/blog'
import { profile } from '../data/profile'
import authorPhoto from '../assets/author.jpg'
import NotFound from './NotFound'

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function Content({ blocks }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === 'h2') return <h2 key={i} id={slugify(b.text)}>{b.text}</h2>
        if (b.type === 'code')
          return (
            <pre key={i}><code>{b.text}</code></pre>
          )
        if (b.type === 'ul')
          return (
            <ul key={i}>
              {b.items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
          )
        return <p key={i}>{b.text}</p>
      })}
    </>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  useReveal()
  const post = getPost(slug)
  if (!post) return <NotFound />

  const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date))
  const idx = sorted.findIndex((p) => p.slug === slug)
  const prev = sorted[idx - 1]
  const next = sorted[idx + 1]
  const related = posts.filter((p) => p.slug !== slug && p.category === post.category).slice(0, 3)
  const toc = post.content.filter((b) => b.type === 'h2')
  const date = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const shareUrl = `https://rakshakc.xyz/blog/${post.slug}`

  return (
    <div className="container page">
      <ReadingProgress />
      <SEO
        title={post.title}
        path={`/blog/${post.slug}`}
        description={post.excerpt}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          author: { '@type': 'Person', name: profile.name },
          datePublished: post.date,
          keywords: post.tags.join(', '),
        }}
      />

      <Link to="/blog" style={{ color: 'var(--text-muted)' }}>← All articles</Link>

      <div className="article-layout" style={{ marginTop: '1.5rem' }}>
        <aside className="toc" aria-label="Table of contents">
          <div style={{ textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.6rem' }}>On this page</div>
          {toc.map((h) => (
            <a key={h.text} href={`#${slugify(h.text)}`}>{h.text}</a>
          ))}
        </aside>

        <article className="article">
          <span className="chip chip--accent">{post.category}</span>
          <h1 style={{ margin: '1rem 0' }}>{post.title}</h1>
          <div className="article__meta">
            <span>{date}</span>
            <span>·</span>
            <span>{post.readingTime} min read</span>
            <span>·</span>
            <span>{post.tags.map((t) => `#${t}`).join(' ')}</span>
          </div>
          <div
            className={post.coverImage ? '' : `grad-cover ${post.cover} article__cover`}
            style={
              post.coverImage
                ? {
                    backgroundImage: `url(${post.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 'var(--r-lg)',
                    height: 320,
                    margin: '1.5rem 0 2rem',
                  }
                : undefined
            }
          />

          <div className="article__body">
            <Content blocks={post.content} />
          </div>

          <div className="share-row">
            <span style={{ color: 'var(--text-muted)', alignSelf: 'center' }}>Share:</span>
            <a className="btn btn--ghost" href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer">Twitter</a>
            <a className="btn btn--ghost" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer">LinkedIn</a>
            <button className="btn btn--ghost" onClick={() => navigator.clipboard?.writeText(shareUrl)}>Copy link</button>
          </div>

          <div className="card author-box">
            <img src={authorPhoto} alt={profile.name} className="author-avatar" style={{ objectFit: 'cover' }} />
            <div>
              <div style={{ color: 'var(--text-h)', fontWeight: 600 }}>{profile.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{profile.role}. {profile.short}</div>
            </div>
          </div>

          <div className="prevnext">
            {prev ? (
              <Link to={`/blog/${prev.slug}`} className="card tile">
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>← Previous</span>
                <strong style={{ color: 'var(--text-h)' }}>{prev.title}</strong>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/blog/${next.slug}`} className="card tile" style={{ textAlign: 'right' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Next →</span>
                <strong style={{ color: 'var(--text-h)' }}>{next.title}</strong>
              </Link>
            ) : <span />}
          </div>

          {related.length > 0 && (
            <section className="section">
              <h2 className="section-title" style={{ fontSize: '1.4rem', marginBottom: '1.2rem' }}>Related articles</h2>
              <div className="grid grid--3">
                {related.map((r) => (
                  <Link key={r.slug} to={`/blog/${r.slug}`} className="card tile">
                    <h3 style={{ fontSize: '1.05rem' }}>{r.title}</h3>
                    <p style={{ fontSize: '0.9rem' }}>{r.excerpt.slice(0, 80)}…</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  )
}
