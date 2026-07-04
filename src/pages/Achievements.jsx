import SEO from '../components/SEO'
import { useReveal } from '../hooks'
import { achievements } from '../data/achievements'
import { profile } from '../data/profile'

export default function Achievements() {
  useReveal()
  return (
    <div className="container page">
      <SEO title="Achievements" path="/achievements" description="Certifications, LeetCode practice, research, arts, and professional milestones of Raksha KC." />
      <div className="page-head">
        <span className="eyebrow">Milestones</span>
        <h1>Achievements & <span className="text-grad">recognition</span></h1>
        <p>Certifications, consistent practice, research, and the moments that mark the journey.</p>
      </div>

      <div className="grid grid--2">
        {achievements.map((group) => (
          <div key={group.group} className={`card ach-group reveal ${group.leetcode ? 'ach-group--leetcode' : ''}`}>
            <h3><span aria-hidden>{group.icon}</span> {group.group}</h3>
            {group.summary && <p className="ach-summary">{group.summary}</p>}
            {group.items.map((it, i) => {
              const href = it.linkKey ? profile.socials[it.linkKey] : it.link
              return (
                <div key={i} className="ach-item">
                  <div>
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" className="ach-link">
                        {it.title} ↗
                      </a>
                    ) : (
                      <div style={{ color: 'var(--text-h)', fontWeight: 500 }}>{it.title}</div>
                    )}
                    <div className="ach-meta">{it.meta}</div>
                  </div>
                  {it.year && <span className="ach-year">{it.year}</span>}
                </div>
              )
            })}
            {group.leetcode && (
              <a
                href={profile.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="btn btn--ghost ach-cta"
              >
                Open LeetCode profile ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
