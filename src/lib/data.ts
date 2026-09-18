export type Bio = {
  name: string
  nameLines: string[]
  location: string
  role: string
  available: boolean
  about: string[]
}

export type Stat = {
  number: string
  label: string
}

export type ProjectImage = {
  src?: string
  caption: string
  tag?: string
}

export type Project = {
  id: number
  title: string
  description: string
  tags: string[]
  year: string
  outcome: string
  github?: string
  viewProject?: string
  link?: string
  longDescription: string[]
  images?: ProjectImage[]
}

export type SkillCategory = {
  category: string
  items: string
}

export type Experience = {
  year: string
  company: string
  role: string
  description: string
}

export type Education = {
  year: string
  institution: string
  degree: string
  description: string
}

export type ContactLink = {
  label: string
  href: string
}

export const bio: Bio = {
  name: 'Fauzya Shubhi Nalendrasidi',
  nameLines: ['Fauzya', 'Nalendrasidi'],
  location: 'Karawang, Indonesia · Remote',
  role: 'Software Developer & System Integration specializing in backend architectures, RESTful APIs, and data-driven systems.',
  available: true,
  about: [
    'Final-year Informatics student at University Buana Perjuangan Karawang with hands-on experience in software development, backend architectures, RESTful API integrations, and data-driven systems using Python, Laravel, and Go.',
    'At PT Data Center Indonesia Sukses Makmur, I built data-driven backend services, configured Docker environments for consistent staging deployments, and developed real-time responsive monitoring dashboards within Agile workflows.',
    'Previously maintained network and computing infrastructure for 10+ nodes at PKBM Bina Sejahtera and mentored over 50 students in computer operations, programming fundamentals, and networking.',
  ],
}

export const stats: Stat[] = [
  { number: '3.74', label: 'Informatics GPA' },
  { number: '3+', label: 'Core systems built' },
  { number: '50+', label: 'Students mentored' },
  { number: '5+', label: 'Industry certs' },
]

export const projects: Project[] = [
  {
    id: 1,
    title: 'Akfaza — Holiday Ticket Booking',
    description: 'PHP-based ticket booking web application with end-to-end reservation workflows and interactive user interfaces.',
    tags: ['PHP', 'JavaScript', 'HTML/CSS', 'MySQL'],
    year: '2023',
    outcome: 'Full booking lifecycle & reservation workflow',
    github: 'https://github.com/Nalendr/Akfaza',
    longDescription: [
      'Akfaza is a fullstack holiday ticket reservation web platform developed to streamline customer bookings, seat allocation, and holiday schedule management.',
      'Built using PHP, JavaScript, HTML, and CSS with MySQL database architecture. Implemented core reservation business logic, interactive form validations, and transactional booking status management.',
      'Extensively debugged and tested during development to handle edge cases, resolve state discrepancies, and ensure reliable user booking confirmation.',
    ],
    images: [
      {
        caption: '',
        tag: '',
        src: '/projects/Akfaza1.jpg',
      },
      {
        caption: '',
        tag: '',
        src: '/projects/Akfaza2.jpg',
      },
      {
        caption: '',
        tag: '',
        src: '/projects/Akfaza3.jpg',
      },
      {
        caption: '',
        tag: '',
        src: '/projects/Akfaza4.jpg',
      },
    ],
  },
  {
    id: 2,
    title: 'AdaKami — Cooperative Management',
    description: 'Cross-platform web and mobile cooperative ERP management system built with Laravel and Ionic framework.',
    tags: ['Laravel', 'Ionic', 'MySQL', 'REST API'],
    year: '2024',
    outcome: 'Multi-platform cooperative ERP & unified DB',
    github: 'https://github.com/Kalvseveryone/Koperasi_19',
    longDescription: [
      'AdaKami is a cooperative business management application spanning web administrative portals and mobile member access to handle cooperative financial operations and member accounts.',
      'Served as Database Developer, designing and optimizing relational schema in MySQL to ensure transactional integrity across loans, savings, and member balances.',
      'Integrated backend Laravel RESTful services with Ionic frontend components, enabling real-time member balance synchronization and automated financial reporting.',
    ],
    images: [
      {
        caption: '',
        tag: '',
        src: '/projects/Adakami1.jpg',
      },
      {
        caption: '',
        tag: '',
        src: '/projects/Adakami2.jpg',
      },
      {
        caption: '',
        tag: '',
        src: '/projects/Adakami3.jpg',
      },
      {
        caption: '',
        tag: '',
        src: '/projects/Adakami4.jpg',
      },
    ],
  },
  {
    id: 3,
    title: 'Portal DC-INDO — Enterprise Datacenter Operations ERP',
    description: 'Enterprise datacenter operations and facility management portal streamlining multi-level approvals, warehouse asset tracking, HSE safety compliance, and corporate logistics.',
    tags: ['Laravel', 'MySQL', 'Bootstrap', 'REST API', 'Pusher'],
    year: '2026',
    outcome: 'Unified datacenter operations ERP with automated deployments & audit compliance',
    viewProject: '',
    longDescription: [
      'Portal DC-INDO is an enterprise management and internal operations ERP built for PT Datacenter Indonesia Sukses Makmur (DISM), centralizing datacenter facility bookings, warehouse inventory, corporate logistics, and HSE safety permits.',
      'Architected complex relational database schemas in MySQL and multi-tier approval workflows in Laravel for Incidents Reoorts, Change Request Forms (CRF), and Safety First.',
      'Implemented automated deployements, dynamic PDF report generation for safety inspections, and real-time event notifications.',
    ],
     images: [
      {
        caption: '',
        tag: '',
        src: '/projects/DCIndo1.png',
      },
      {
        caption: '',
        tag: '',
        src: '/projects/DCIndo2.png',
      },
      {
        caption: '',
        tag: '',
        src: '/projects/DCIndo3.png',
      },
      {
        caption: '',
        tag: '',
        src: '/projects/DCIndo4.png',
      },
      {
        caption: '',
        tag: '',
        src: '/projects/DCIndo5.png',
      },
    ],
  },
  {
    id: 4,
    title: 'Autonomous Gas Plume Tracking',
    description: 'Robotics simulation and real-time sensor processing system for autonomous environmental hazard tracking.',
    tags: ['Python', 'Robotics', 'Sensors', 'Simulation'],
    year: '2026',
    outcome: 'Autonomous hazard tracking navigation algorithms',
    longDescription: [
      'An autonomous robotic navigation and tracking system engineered in Python to identify, trace, and locate gas plume emissions in simulated hazardous environments.',
      'Constructed algorithmic data-processing pipelines analyzing real-time sensor inputs and gradient vectors to govern autonomous navigation decision-making.',
      'Benchmarked and simulated navigation behaviors under varying atmospheric dispersions, tuning processing algorithms to maximize tracking speed and reliability.',
    ],
  },
]

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    items: 'Go, PHP, JavaScript, TypeScript, Python, SQL, C++',
  },
  {
    category: 'Backend',
    items: 'Laravel, Express.js, Gin, PHP, Node.js, REST APIs, JWT',
  },
  {
    category: 'Frontend',
    items: 'React, Next.js, Vue.js, Ionic, HTML, Tailwind CSS',
  },
  {
    category: 'Databases',
    items: 'MySQL, PostgreSQL, JSON, Database Management, DBeaver',
  },
  {
    category: 'Infrastructure',
    items: 'Docker, Linux, Git, GitHub, Postman, Figma, XAMPP, Laragon',
  },
  {
    category: 'Engineering',
    items: 'Agile SDLC, System Integration, Requirements Analysis, Functional Testing',
  },
]

export const experience: Experience[] = [
  {
    year: '2025–26',
    company: 'PT Data Center Indonesia Sukses Makmur',
    role: 'Web Developer & System Integration (Intern)',
    description: 'Developed data-driven applications using Python and Laravel RESTful integrations. Built responsive real-time monitoring dashboards and configured Docker staging environments.',
  },
  {
    year: '2023–25',
    company: 'PKBM Bina Sejahtera',
    role: 'IT Infrastructure & Lecturer (Part-Time)',
    description: 'Maintained network and hardware infrastructure across 10+ computing nodes. Instructed over 50 students in computer operations, programming fundamentals, and networking.',
  },
]

export const education: Education[] = [
  {
    year: '2023–27',
    institution: 'University Buana Perjuangan Karawang',
    degree: 'Bachelor of Informatics (GPA: 3.74/4.00)',
    description: 'Coursework in Algorithms & Data Structures, Computer Vision, Embedded Systems, Robotics & Automation, Real-Time Operating Systems (RTOS), and Computer Networking.',
  },
]

export const contact: ContactLink[] = [
  { label: 'Email', href: 'mailto:fauzyasn@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/Nalendr' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nalendrs/' },
  { label: 'Resume', href: '/resume/Fauzya-Shubhi-Nalendrasidi.pdf' },
]

export type ChessConfig = {
  sectionTitle:string
  subtitle:string
  chessComUrl:string
  statsLabels: {
    totalGames: string
    currentRating: string
    winRate: string
    bestRating: string
  }
  intensityLabels: {
    less: string
    more: string
  }
}

export const chessConfig: ChessConfig = {
  sectionTitle: 'Chess Activity',
  subtitle: 'Chess.com / FauzySn',
  chessComUrl: 'https://www.chess.com/member/fauzysn',
  statsLabels: {
    totalGames: 'Total Games',
    currentRating: 'Rating',
    winRate: 'Win Rate',
    bestRating: 'Peak Rating',
  },
  intensityLabels: {
    less: 'Less',
    more: 'More',
  },
}
