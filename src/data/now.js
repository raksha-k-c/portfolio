/**
 * The "Now" page, a snapshot of what I'm currently focused on.
 * Update `lastUpdated` and the arrays whenever things change.
 */
export const now = {
  lastUpdated: 'July 2026',
  intro:
    "Here's what has my attention right now, a living snapshot inspired by Derek Sivers' /now movement.",
  sections: [
    {
      title: 'Learning',
      icon: '📚',
      items: [
        'Distributed systems & system design fundamentals',
        'Advanced PyTorch for medical imaging',
        'Kubernetes beyond the basics',
      ],
    },
    {
      title: 'Building',
      icon: '🔨',
      items: [
        'Healthcare Analytics Dashboard (full-stack)',
        'This personal site & technical blog',
      ],
    },
    {
      title: 'Reading',
      icon: '📖',
      items: ['Designing Data-Intensive Applications', 'Deep Learning with PyTorch'],
    },
    {
      title: 'Courses',
      icon: '🎓',
      items: ['Cloud-native development on Azure', 'Advanced React patterns'],
    },
    {
      title: 'Exploring',
      icon: '🧪',
      items: ['Edge AI on embedded devices', 'Vector databases & RAG', 'WebGPU'],
    },
    {
      title: 'Current goals',
      icon: '🎯',
      items: ['Ship the healthcare dashboard v1', 'Publish two articles a month', 'Contribute to an open-source project'],
    },
  ],
}
