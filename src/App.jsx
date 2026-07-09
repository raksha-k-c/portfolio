import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeProvider'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import CustomCursor from './CustomCursor'
import StarField from './StarField'
import Loader from './components/Loader'
import { useSmoothScroll } from './hooks'

import PortfolioChatBot from './components/PortfolioChatBot'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Skills from './pages/Skills'
import Experience from './pages/Experience'
import Achievements from './pages/Achievements'
import Now from './pages/Now'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import './App.css'

function Shell() {
  const location = useLocation()
  const [cmdkOpen, setCmdkOpen] = useState(false)
  useSmoothScroll()

  // Prevent context menu / image drag glitches
  useEffect(() => {
    const onCtx = (e) => e.preventDefault()
    const onDrag = (e) => { if (e.target.tagName === 'IMG') e.preventDefault() }
    document.addEventListener('contextmenu', onCtx)
    document.addEventListener('dragstart', onDrag)
    return () => {
      document.removeEventListener('contextmenu', onCtx)
      document.removeEventListener('dragstart', onDrag)
    }
  }, [])

  // Global Ctrl/⌘ + K to open command palette
  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCmdkOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="portfolio-container">
      <Loader />
      <StarField />
      <CustomCursor />
      <Navbar onOpenCmdK={() => setCmdkOpen(true)} />
      <CommandPalette open={cmdkOpen} onClose={() => setCmdkOpen(false)} />

      <main key={location.pathname} className="route-view">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/now" element={<Now />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <PortfolioChatBot />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  )
}
