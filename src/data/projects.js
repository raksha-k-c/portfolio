export const projects = [
  {
    slug: 'portfolio-website',
    title: 'Personal Portfolio & Blog Platform',
    tagline: 'A fast, multi-page personal site with a data-driven blog and command palette.',
    year: '2026',
    status: 'Live',
    featured: true,
    cover: 'grad-1',
    tech: ['React', 'Vite', 'React Router', 'Canvas', 'CSS'],
    tags: ['Web Development', 'Frontend'],
    links: { github: 'https://github.com/raksha-k-c/portfolio', demo: 'https://rakshakc.xyz' },
    problem:
      'I needed a single home for my projects, writing, and learning journey that felt personal and premium rather than a cookie-cutter template, and that I could extend for years without friction.',
    solution:
      'A multi-page React SPA with a design-system foundation, animated space backdrop, theme switching, and a fully data-driven content layer so new projects and posts are just objects in a file.',
    architecture:
      'Vite + React Router with a persistent layout shell (nav, footer, cursor, starfield). Content lives in plain JS data modules; pages render from that data. Route-level code is kept lean and reveal animations run via IntersectionObserver.',
    features: [
      'Multi-page routing with animated transitions',
      'System-aware dark/light theming',
      'Command palette (Ctrl/⌘ + K) for instant navigation',
      'Data-driven projects & blog with search, tags and categories',
      'Reading progress + table of contents on articles',
      'Accessible, responsive, reduced-motion friendly',
    ],
    challenges:
      'Getting smooth momentum scroll, per-route reveal animations, and a custom cursor to coexist without jank, which I solved with event delegation and rAF-batched work.',
    lessons:
      'A tiny, well-structured data layer beats a CMS for a personal site. Investing in a design system up front made every new page trivial.',
  },
  {
    slug: 'healthcare-dashboard',
    title: 'Healthcare Management Dashboard',
    tagline: 'A hospital themed Java Swing desktop app for patients, appointments, billing, and analytics.',
    year: '2025',
    status: 'Live',
    featured: true,
    cover: 'grad-2',
    tech: ['Java 21', 'Java Swing', 'CardLayout', 'Swing Charts'],
    tags: ['Healthcare', 'Java', 'Desktop Application'],
    links: { github: 'https://github.com/raksha-k-c/healthcare_analytics_dashboard', demo: '' },
    problem:
      'Small clinics and hospital teams often rely on scattered records for patients, doctors, appointments, billing, and pharmacy inventory, which makes day to day operations slow and error prone.',
    solution:
      'A professional hospital themed desktop dashboard built with Java Swing that centralizes patient, doctor, appointment, billing, pharmacy, emergency, and reporting workflows in one modern interface with light and dark themes.',
    architecture:
      'A modular Java Swing app organized into model, view, util, and UI component packages. LoginFrame and DashboardFrame use CardLayout for multi panel navigation, DataManager handles persistence, and ThemeManager powers light and dark mode switching across panels like PatientPanel, DoctorPanel, BillingPanel, and ReportsPanel.',
    features: [
      'Animated splash screen and secure Admin or Doctor login',
      'Patient and doctor management with full CRUD and availability tracking',
      'Appointment scheduling with booking and cancellation',
      'Billing, pharmacy inventory, and emergency ICU bed monitoring',
      'Reports and analytics with visual charts for patient count and revenue',
      'Live notifications and theme switching between light and dark modes',
    ],
    challenges:
      'Keeping a large Swing UI responsive while wiring many panels through CardLayout, and making analytics charts and theme switching feel cohesive across every screen.',
    lessons:
      'Strong package structure and reusable panels matter more than flashy UI tricks in desktop apps. Separating models, views, and utilities early made each new hospital module much easier to add.',
  },
  {
    slug: 'smart-injector',
    title: 'AI-Enabled Smart Auto Injector',
    tagline: 'A syringe-based auto injector that adapts stroke length and speed to real-time depth sensing.',
    year: '2026',
    status: 'Prototype',
    featured: true,
    cover: 'grad-3',
    tech: ['ESP32', 'C++', 'HC-SR04 Ultrasonic', 'A4988 Stepper Driver', 'OLED'],
    tags: ['Embedded Systems', 'Medical Electronics'],
    links: { github: 'https://github.com/raksha-k-c/ai-enabled-smart-injector-prototype', demo: '' },
    problem:
      'Manual injections risk inconsistent depth, stroke length, and speed, which can affect dosing accuracy and patient comfort, especially outside controlled clinical settings.',
    solution:
      'An automated, syringe-based auto injector that measures depth in real time and dynamically adapts its stroke length and injection speed, with live feedback on an OLED display. Built as a mini project at BMS College of Engineering (2025 to 2026).',
    architecture:
      'An ESP32 microcontroller reads depth from an HC-SR04 ultrasonic sensor, then drives a stepper motor on a lead-screw mechanism through an A4988 stepper driver to regulate precise linear actuation. An OLED shield displays depth, stroke length, and speed while the firmware (C++) runs the control loop.',
    features: [
      'Adaptive depth sensing with the HC-SR04 ultrasonic sensor',
      'Precision actuation via ESP32, A4988 driver, and a stepper + lead-screw setup',
      'Live OLED readout of depth, stroke length, and speed',
      'High accuracy, with an error margin under 0.5 mm versus manual injection',
    ],
    challenges:
      'Converting noisy real-time depth readings into smooth, safe stepper motion, and tuning the lead-screw actuation so stroke length and speed stayed accurate to within half a millimetre.',
    lessons:
      'Tight coupling between sensing and actuation is where embedded systems get hard. Calibrating the ultrasonic-to-motion pipeline early was the key to hitting sub-millimetre accuracy.',
  },
]

export const getProject = (slug) => projects.find((p) => p.slug === slug)
