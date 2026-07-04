import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { navLinks } from './Navbar'
import { projects } from '../data/projects'
import { posts } from '../data/blog'
import { useTheme } from '../context/ThemeProvider'

export default function CommandPalette({ open, onClose }) {
  const navigate = useNavigate()
  const { toggle } = useTheme()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)

  const commands = useMemo(() => {
    const nav = navLinks.map((l) => ({ group: 'Pages', label: l.label, hint: 'Go', action: () => navigate(l.to) }))
    const proj = projects.map((p) => ({ group: 'Projects', label: p.title, hint: 'Open', action: () => navigate(`/projects/${p.slug}`) }))
    const blog = posts.map((p) => ({ group: 'Blog', label: p.title, hint: 'Read', action: () => navigate(`/blog/${p.slug}`) }))
    const actions = [
      { group: 'Actions', label: 'Toggle theme', hint: '↵', action: () => toggle() },
      { group: 'Actions', label: 'Download résumé', hint: '↵', action: () => window.open('/resume.pdf', '_blank') },
    ]
    return [...nav, ...proj, ...blog, ...actions]
  }, [navigate, toggle])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q))
  }, [query, commands])

  useEffect(() => { setActive(0) }, [query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)) }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)) }
      else if (e.key === 'Enter') {
        const item = results[active]
        if (item) { item.action(); onClose() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, results, active, onClose])

  if (!open) return null

  let lastGroup = null
  return (
    <div className="cmdk-overlay" onClick={onClose}>
      <div className="cmdk" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Command palette">
        <div className="cmdk__input">
          <span aria-hidden>⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, projects, articles…"
            aria-label="Command palette search"
          />
          <kbd style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Esc</kbd>
        </div>
        <div className="cmdk__list">
          {results.length === 0 && <div className="cmdk__empty">No results for “{query}”.</div>}
          {results.map((item, i) => {
            const showGroup = item.group !== lastGroup
            lastGroup = item.group
            return (
              <div key={item.group + item.label}>
                {showGroup && <div className="cmdk__group">{item.group}</div>}
                <div
                  className={`cmdk__item ${i === active ? 'active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => { item.action(); onClose() }}
                >
                  <span>{item.label}</span>
                  <span className="k">{item.hint}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
