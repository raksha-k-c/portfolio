import { useEffect, useState } from 'react'

export default function Loader() {
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 650)
    return () => clearTimeout(t)
  }, [])
  if (gone) return null
  return (
    <div className="loader" style={{ transition: 'opacity 0.4s', opacity: gone ? 0 : 1 }}>
      <div className="loader__ring" />
    </div>
  )
}
