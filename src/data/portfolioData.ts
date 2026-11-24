export type ProjectCategory = 'All' | 'Full-Stack' | 'AI & Vision' | 'Security & Data';

export interface LanguageStat {
  name: string;
  percent: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: Exclude<ProjectCategory, 'All'>;
  featured: boolean;
  repoUrl: string;
  repoName: string;
  liveUrl?: string;
  image: string;
  imageAlt: string;
  summary: string;
  impactMetric: string;
  techStack: string[];
  highlights: string[];
  architecture: string[];
  languages: LanguageStat[];
  repoFiles: string[];
  readmeOverview: string;
  setupCommands: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  items: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  grade: string;
  focus: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  organization: string;
  type: string;
  summary: string;
  contributions: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  period: string;
  focus: string;
  credentialCode: string;
  credentialNote: string;
  originalFilePath: string;
  originalFileType: 'image' | 'pdf';
}

export const PROFILE = {
  brand: 'sharnika.dev',
  name: 'Sharnika J',
  headline: 'Full-Stack Engineer & Applied AI Builder',
  kicker: 'Madurai, Tamil Nadu · MCA Candidate (2025–2027)',
  intro:
    'I design and ship full-stack web applications, machine-learning security consoles, and computer-vision tools using Python, Flask, React, TypeScript, PHP, and MySQL—pairing clean database architecture with clear client communication.',
  aboutParagraphs: [
    "I'm a Master of Computer Applications (MCA) student at Rathinam Technical Campus with hands-on engineering experience across Python, Flask, React, TypeScript, PHP, and MySQL. My work spans role-based web platforms, real-time computer vision pipelines, and ML-powered intrusion prevention systems.",
    "Beyond writing maintainable code, I enjoy translating complex technical requirements into intuitive user workflows and presenting clear solutions—making me well suited for full-stack software engineering, applied AI, and client-facing technical roles."
  ],
  email: 'sharnikaj.mca25@rathinam.in',
  phone: '+91 9597411576',
  location: 'Madurai, Tamil Nadu, India',
  githubUrl: 'https://github.com/sharnikaj-dev',
  linkedinUrl: 'https://linkedin.com/in/sharnika-j-475479387',
  heroImage: '/src/assets/images/hero_studio_v2_amber_1795544043667.jpg',
  heroMetrics: [
    { value: '8', label: 'Shipped Repositories' },
    { value: '8.4', label: 'MCA CGPA (Rathinam)' },
    { value: '5', label: 'Verified Certificates' },
    { value: '1', label: 'Live Cloud Deployment' },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ai-idps',
    title: 'AI-IDPS',
    subtitle: 'AI-Driven Cyber Threat Detection & Intrusion Prevention',
    year: '2026',
    category: 'Security & Data',
    featured: true,
    repoName: 'AI-IDPS',
    repoUrl: 'https://github.com/sharnikaj-dev/AI-IDPS',
    image: '/src/assets/images/proj_idps_v2_amber_1795544043430.jpg',
    imageAlt: 'Isometric amber cyber-defense shield lattice visualization',
    summary:
      'An MCA mini-project implementing machine-learning network intrusion detection and confidence-driven automated intrusion prevention trained on the NSL-KDD dataset.',
    impactMetric: '5-Class Threat Detection · 3 ML Models',
    techStack: ['Python', 'Scikit-learn', 'XGBoost', 'Flask', 'SQLite', 'Chart.js'],
    highlights: [
      'Multi-class classification across Normal, DoS, Probe, R2L, and U2R network traffic signatures',
      'Benchmarks Decision Tree, balanced Random Forest, and XGBoost classifiers for optimal precision-recall balance',
      '3-tier confidence prevention engine: auto-blocks at >= 0.90, rate-limits between 0.60–0.90, and logs low-confidence events',
      'Includes authenticated web console with live traffic replay, alert filtering, blocked IP management, and CSV export',
    ],
    architecture: [
      'ML training pipeline (ml/train.py) & serialized model artifacts',
      'Automated response engine (prevent.py) coupled to SQLite persistence',
      'Interactive Flask + Chart.js live monitoring & reporting dashboard',
    ],
    languages: [
      { name: 'Python', percent: 48.8 },
      { name: 'HTML', percent: 25.4 },
      { name: 'JavaScript', percent: 15.9 },
      { name: 'CSS', percent: 9.9 },
    ],
    repoFiles: [
      'app.py',
      'db.py',
      'prevent.py',
      'seed_demo.py',
      'schmea.sql',
      'ml/',
      'models/',
      'templates/',
      'static/',
      'requirements.txt',
      'SPEC.md',
    ],
    readmeOverview:
      'AI-IDPS combines offline supervised model training on NSL-KDD traffic features with an automated prevention loop and live Flask operator console. Incoming replayed flows are scored by the trained classifier, assigned a severity tier based on prediction confidence, persisted to SQLite, and visualized in real time with Chart.js.',
    setupCommands: [
      'git clone https://github.com/sharnikaj-dev/AI-IDPS.git',
      'pip install -r requirements.txt',
      'python ml/train.py && python seed_demo.py',
      'python app.py',
    ],
  },
  {
    id: 'multilingual-vqa',
    title: 'PrismVoice (Image VQA)',
    subtitle: 'Multilingual Visual Q&A & Speech Studio (Live on Render)',
    year: '2026',
    category: 'AI & Vision',
    featured: true,
    repoName: '-image-vqa-multilingual',
    repoUrl: 'https://github.com/sharnikaj-dev/-image-vqa-multilingual',
    liveUrl: 'https://image-vqa-multilingual.onrender.com/',
    image: '/src/assets/images/proj_prismvoice_v2_amber_1795544043814.jpg',
    imageAlt: 'Optical glass lens surrounded by golden acoustic soundwave rings',
    summary:
      'An installable Progressive Web App (PWA) and full-stack TypeScript studio deployed live on Render for visual question answering, focus-region OCR, 16-language translation, and neural text-to-speech playback.',
    impactMetric: 'Live on Render · 16 Languages · PWA',
    techStack: ['TypeScript', 'React', 'Express.js', 'Docker', 'PWA', 'Neural TTS'],
    highlights: [
      'Deployed live on Render at image-vqa-multilingual.onrender.com with Docker containerization',
      'Supports PNG/JPEG/WEBP/GIF uploads, live camera capture, and interactive bounding-box focus region selection',
      '4 specialized analysis modes: General Q&A, Read & Translate Text (OCR), Scene Accessibility, and Object Breakdown',
      'Instant re-translation across 16 languages paired with neural speech synthesis output',
    ],
    architecture: [
      'Full-stack React + TypeScript PWA client bundled via Vite',
      'Express.js server runtime (server.ts) containerized with Dockerfile for Render deployment',
      'Region-of-interest crop pipeline coupled to multilingual translation & TTS',
    ],
    languages: [
      { name: 'TypeScript', percent: 96.3 },
      { name: 'HTML', percent: 2.6 },
      { name: 'CSS', percent: 0.7 },
      { name: 'Dockerfile', percent: 0.4 },
    ],
    repoFiles: [
      'src/',
      'public/',
      'server.ts',
      'Dockerfile',
      'vite.config.ts',
      'tsconfig.json',
      'package.json',
      'README.md',
    ],
    readmeOverview:
      'PrismVoice is a production-deployed full-stack PWA enabling users to upload images or snap live camera frames, drag a focus bounding box over specific signs or objects, ask natural-language questions, and hear instant answers translated across 16 languages via neural text-to-speech.',
    setupCommands: [
      'git clone https://github.com/sharnikaj-dev/-image-vqa-multilingual.git',
      'npm install',
      'npm run dev',
      '# Live Production: https://image-vqa-multilingual.onrender.com/',
    ],
  },
  {
    id: 'speakup',
    title: 'SPEAKUP',
    subtitle: 'Conversational English Learning Platform',
    year: '2026',
    category: 'Full-Stack',
    featured: true,
    repoName: 'SPEAKUP',
    repoUrl: 'https://github.com/sharnikaj-dev/SPEAKUP',
    image: '/src/assets/images/proj_fullstack_v2_amber_1795544044428.jpg',
    imageAlt: 'Smoked obsidian glass panels and architectural gold columns',
    summary:
      'A modular conversational practice platform that helps learners build spoken English confidence through AI-guided dialogue scenarios, instant grammar corrections, and native-language explanations.',
    impactMetric: 'Multi-Level Guided Dialogues · MySQL',
    techStack: ['Python', 'Flask Blueprints', 'MySQL', 'Jinja2', 'LLM', 'Speech API'],
    highlights: [
      'Personalized learner profiles tracking native language, proficiency tier, and career communication goals',
      'Progressive scenarios spanning self-introductions, workplace standups, and technical interviews',
      'AI dialogue partner scoring grammar, vocabulary, fluency, pronunciation, and filler words with retry loops',
      'Secured with PBKDF2-SHA256 password hashing and parameterized mysql-connector queries',
    ],
    architecture: [
      'Modular Flask Blueprint factory pattern with environment-based config',
      'Parameterized MySQL schema for mistake history and progress tracking',
      'Vanilla CSS & JS client interface with zero heavy framework overhead',
    ],
    languages: [
      { name: 'Python', percent: 36.5 },
      { name: 'HTML', percent: 30.4 },
      { name: 'CSS', percent: 30.4 },
      { name: 'JavaScript', percent: 2.7 },
    ],
    repoFiles: [
      'app.py',
      'config.py',
      'db.py',
      'init_db.py',
      'routes/',
      'schema.sql',
      'seed.sql',
      'templates/',
      'static/',
      'requirements.txt',
    ],
    readmeOverview:
      'SPEAKUP uses a clean Flask application-factory architecture backed by raw parameterized MySQL queries (no ORM) and Werkzeug PBKDF2-SHA256 authentication. Learners progress through realistic dialogue levels while storing mistake histories and corrections.',
    setupCommands: [
      'git clone https://github.com/sharnikaj-dev/SPEAKUP.git',
      'pip install -r requirements.txt',
      'python init_db.py',
      'python app.py',
    ],
  },
  {
    id: 'student-notes',
    title: 'Student Notes Hub',
    subtitle: 'AI-Powered Academic Notes Sharing Platform',
    year: '2026',
    category: 'Full-Stack',
    featured: false,
    repoName: 'student-notes-sharing-platform',
    repoUrl: 'https://github.com/sharnikaj-dev/student-notes-sharing-platform',
    image: '/src/assets/images/proj_fullstack_v2_amber_1795544044428.jpg',
    imageAlt: 'Floating smoked glass study platform layers over dark carbon',
    summary:
      'A full-stack collaborative study platform enabling students to upload, organize, package, and study academic notes enhanced with Google Gemini AI synthesis.',
    impactMetric: 'React + Express + Gemini AI',
    techStack: ['React', 'TypeScript', 'Express.js', 'Tailwind CSS', 'Gemini AI', 'Node.js'],
    highlights: [
      'Unified React + TypeScript frontend served alongside a custom Express API server',
      'AI-powered note summarization, concept extraction, and study Q&A powered by @google/genai',
      'Structured subject categorization and downloadable ZIP bundle support via adm-zip',
    ],
    architecture: [
      'Full-stack Vite + Express server architecture (server.ts)',
      'Server-side Gemini API proxy keeping credentials strictly off the client',
      'Responsive TypeScript component system with Motion micro-interactions',
    ],
    languages: [
      { name: 'TypeScript', percent: 99.2 },
      { name: 'CSS', percent: 0.6 },
      { name: 'HTML', percent: 0.2 },
    ],
    repoFiles: [
      'server.ts',
      'src/',
      'index.html',
      'package.json',
      'tsconfig.json',
      'vite.config.ts',
      'README.md',
    ],
    readmeOverview:
      'A full-stack TypeScript application combining React on the client with an Express.js backend and server-side Google Gemini AI integration for organizing, summarizing, and archiving academic study materials.',
    setupCommands: [
      'git clone https://github.com/sharnikaj-dev/student-notes-sharing-platform.git',
      'npm install',
      'npm run dev',
    ],
  },
  {
    id: 'edunova-lms',
    title: 'EduNova LMS',
    subtitle: 'Internship Full-Stack Learning Management System',
    year: '2026',
    category: 'Full-Stack',
    featured: false,
    repoName: 'EduNova-LMS',
    repoUrl: 'https://github.com/sharnikaj-dev/EduNova-LMS',
    image: '/src/assets/images/proj_fullstack_v2_amber_1795544044428.jpg',
    imageAlt: 'Modular glass and gold architectural curriculum visualization',
    summary:
      'A role-based Learning Management System built during my software internship for 200+ students to browse courses, download learning materials, and manage academic records.',
    impactMetric: '200+ Students · 1,000+ Records',
    techStack: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'PHP', 'MySQL'],
    highlights: [
      'Role-based access control separating student and administrator workflows with session authentication',
      'Full CRUD course and material management handling 1,000+ database records reliably',
      'Server-side and client-side input validation tested locally on Apache/XAMPP',
    ],
    architecture: [
      'Responsive Bootstrap & Vanilla JS front-end views',
      'Modular client & server modules with relational authentication workflows',
    ],
    languages: [
      { name: 'CSS', percent: 61.4 },
      { name: 'JavaScript', percent: 19.4 },
      { name: 'HTML', percent: 19.2 },
    ],
    repoFiles: [
      'index.html',
      'auth.css',
      'auth.js',
      'style.css',
      'script.js',
      'client/',
      'server/',
      'package.json',
      'README.md',
    ],
    readmeOverview:
      'Developed as part of my software engineering internship, EduNova LMS provides a structured learning portal with dedicated authentication flows, responsive course catalogs, and role-based content management.',
    setupCommands: [
      'git clone https://github.com/sharnikaj-dev/EduNova-LMS.git',
      'cd EduNova-LMS && npm install',
    ],
  },
  {
    id: 'air-draw',
    title: 'Air Draw',
    subtitle: 'Real-Time Gesture Computer Vision Canvas',
    year: '2026',
    category: 'AI & Vision',
    featured: false,
    repoName: 'Air--Draw',
    repoUrl: 'https://github.com/sharnikaj-dev/Air--Draw',
    image: '/src/assets/images/proj_vision_v2_amber_1795544044517.jpg',
    imageAlt: 'Kinetic golden light ribbon sweeping through hand wireframe mesh',
    summary:
      'A real-time computer vision application enabling touchless mid-air sketching through webcam hand-landmark tracking using OpenCV and MediaPipe.',
    impactMetric: 'Real-Time 21-Point Hand Tracking',
    techStack: ['Python', 'OpenCV', 'MediaPipe', 'NumPy'],
    highlights: [
      'Index-finger-up gesture activates continuous smooth stroke rendering on live video feed',
      'Two-finger hover mode switches cleanly into top palette selection without accidental marks',
      'Supports Magenta, Blue, Green brushes, Eraser tool, and instant keyboard canvas reset (C/Q)',
    ],
    architecture: [
      'MediaPipe hand_landmarker.task detection pipeline mapped to OpenCV canvas masks',
      'Low-latency frame blending combining live webcam feed and persistent drawing layer',
    ],
    languages: [{ name: 'Python', percent: 100 }],
    repoFiles: ['src/', 'hand_landmarker.task', 'requirements.txt', 'README.md'],
    readmeOverview:
      'Air Draw translates 21-point MediaPipe hand landmarks from a standard webcam stream into intuitive mid-air drawing gestures—switching seamlessly between ink strokes, hover palette selection, and canvas clearing.',
    setupCommands: [
      'git clone https://github.com/sharnikaj-dev/Air--Draw.git',
      'pip install -r requirements.txt',
      'python src/main.py',
    ],
  },
  {
    id: 'adaptive-desktop-pet',
    title: 'Adaptive Desktop Pet',
    subtitle: 'Behavior-Aware AI Companion',
    year: '2026',
    category: 'AI & Vision',
    featured: false,
    repoName: 'adaptive-desktop-pet',
    repoUrl: 'https://github.com/sharnikaj-dev/adaptive-desktop-pet',
    image: '/src/assets/images/proj_prismvoice_v2_amber_1795544043814.jpg',
    imageAlt: 'Precision optical lens and suspended golden acoustic waves',
    summary:
      'A behavior-aware virtual desktop companion that observes user activity, work habits, and emotional cues to adapt its responses and interactions in real time.',
    impactMetric: 'Adaptive State Engine · Gemini AI',
    techStack: ['TypeScript', 'React', 'Python', 'Gemini AI', 'Tailwind CSS'],
    highlights: [
      'Models companion mood, energy, and focus states dynamically based on interaction patterns',
      'Combines Python desktop utility hooks with a reactive TypeScript interface',
      'Context-aware conversational nudges for study breaks and productivity encouragement',
    ],
    architecture: [
      'Reactive React + Motion state machine for character animations',
      'Python companion bridge (main.py) paired with Gemini behavioral responses',
    ],
    languages: [
      { name: 'TypeScript', percent: 88.6 },
      { name: 'Python', percent: 9.1 },
      { name: 'CSS', percent: 1.6 },
      { name: 'HTML', percent: 0.7 },
    ],
    repoFiles: [
      'src/',
      'main.py',
      'index.html',
      'package.json',
      'tsconfig.json',
      'vite.config.ts',
      'README.md',
    ],
    readmeOverview:
      'An adaptive desktop companion pairing a TypeScript + React interface with Python system hooks and Gemini AI to tailor companion moods, prompts, and focus habits to user routines.',
    setupCommands: [
      'git clone https://github.com/sharnikaj-dev/adaptive-desktop-pet.git',
      'npm install && npm run dev',
    ],
  },
  {
    id: 'ecommerce-insights',
    title: 'E-Commerce Insights',
    subtitle: 'Sales & Customer Cohort Analytics Pipeline',
    year: '2026',
    category: 'Security & Data',
    featured: false,
    repoName: 'E-Commerce-Sales-Customer-Insights',
    repoUrl: 'https://github.com/sharnikaj-dev/E-Commerce-Sales-Customer-Insights',
    image: '/src/assets/images/proj_idps_v2_amber_1795544043430.jpg',
    imageAlt: 'Architectural isometric data lattice with golden connections',
    summary:
      'An end-to-end business intelligence project combining Python data cleaning, SQL aggregation, and Power BI dashboards to uncover revenue drivers and customer retention patterns.',
    impactMetric: 'Python · SQL · Power BI',
    techStack: ['Python', 'SQL', 'Power BI', 'Pandas', 'Data Modeling'],
    highlights: [
      'Cleaned and normalized raw transactional datasets for cohort and repeat-purchase analysis',
      'Built SQL queries to segment high-value customer tiers, seasonal spikes, and category margins',
      'Designed executive Power BI KPI views translating raw rows into actionable merchandising insights',
    ],
    architecture: [
      'Automated Python preprocessing & feature engineering scripts',
      'Star-schema SQL tables feeding interactive Power BI visuals',
    ],
    languages: [{ name: 'Python', percent: 100 }],
    repoFiles: ['dataset/', 'analysis.py'],
    readmeOverview:
      'Data analytics pipeline transforming raw e-commerce order datasets into structured SQL cohorts and Power BI business KPIs for customer retention and category revenue analysis.',
    setupCommands: [
      'git clone https://github.com/sharnikaj-dev/E-Commerce-Sales-Customer-Insights.git',
      'cd E-Commerce-Sales-Customer-Insights',
    ],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'languages',
    title: 'Programming Languages',
    description: 'Core languages used across backend services, ML pipelines, and web applications.',
    items: ['Python', 'TypeScript', 'JavaScript', 'PHP', 'SQL', 'C++', 'C'],
  },
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    description: 'Accessible, responsive interfaces built with modern component and CSS systems.',
    items: ['React', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Chart.js', 'Responsive UI'],
  },
  {
    id: 'backend',
    title: 'Backend & Security',
    description: 'RESTful services, role-based access control, and server-side validation.',
    items: ['Flask', 'Django', 'Express.js', 'PHP', 'Docker', 'RBAC & Auth', 'CRUD Architecture'],
  },
  {
    id: 'ai-cv',
    title: 'Applied AI & Computer Vision',
    description: 'Practical machine learning, NLP, and real-time optical gesture pipelines.',
    items: ['Scikit-learn', 'XGBoost', 'OpenCV', 'MediaPipe', 'Gemini AI', 'Neural TTS', 'Deep Learning'],
  },
  {
    id: 'data',
    title: 'Databases & Analytics',
    description: 'Relational data modeling, query optimization, and executive BI dashboards.',
    items: ['MySQL', 'SQLite', 'Power BI', 'Pandas', 'Git / GitHub', 'XAMPP'],
  },
  {
    id: 'soft',
    title: 'Communication & Delivery',
    description: 'Bridging engineering execution with stakeholder clarity and user empathy.',
    items: ['Requirement Discovery', 'Client Communication', 'Technical Presentations', 'Team Collaboration', 'Rapid Prototyping'],
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    period: '2026',
    role: 'Software Development Intern — EduNova LMS',
    organization: 'Internship Project',
    type: 'Full-Stack Web Engineering',
    summary:
      'Designed and built EduNova, a full-stack Learning Management System supporting 200+ students and 1,000+ course and material records.',
    contributions: [
      'Implemented role-based access control and secure login flows separating student and admin capabilities',
      'Developed responsive UI modules in HTML5, CSS3, Bootstrap, and JavaScript backed by PHP and MySQL',
      'Validated end-to-end CRUD reliability, form sanitization, and database integrity in XAMPP environments',
    ],
  },
  {
    period: '2025 – Present',
    role: 'Applied AI & Full-Stack Builder (MCA Track)',
    organization: 'Rathinam Technical Campus · Independent Projects',
    type: 'Academic & Open Source',
    summary:
      'Shipping end-to-end software systems across network security (AI-IDPS), live cloud vision apps (PrismVoice on Render), conversational AI (SPEAKUP), and computer vision (Air Draw).',
    contributions: [
      'Engineered multi-model ML threat classification pipelines (XGBoost, Random Forest) with live Flask dashboards',
      'Deployed PrismVoice multilingual VQA studio live to Render using TypeScript, Express, and Docker',
      'Maintained clean Git histories, modular architectures, and reproducible documentation across 8+ public repositories',
    ],
  },
];

export const EDUCATION: EducationItem[] = [
  {
    period: '2025 – 2027',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Rathinam Technical Campus',
    grade: 'CGPA 8.4',
    focus: 'Full-Stack Systems, Machine Learning, Network Security & Data Analytics',
  },
  {
    period: '2022 – 2025',
    degree: 'B.Sc. Computer Science',
    institution: "EMG Yadava Women's College",
    grade: 'CGPA 7.8',
    focus: 'Core Algorithms, Relational Databases, Operating Systems & Software Engineering',
  },
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'cert-deep-learning',
    title: 'Deep Learning for Beginners',
    issuer: 'Simplilearn SkillUP',
    period: '23 Sep 2026',
    focus: 'Neural network architectures & applied deep learning workflows',
    credentialCode: 'Code: 10775261',
    credentialNote: 'Completed intensive neural network modeling, backpropagation, and applied deep learning assessments.',
    originalFilePath: '/assets/aistudio/deep_learning_certificate_68e07c56.pdf',
    originalFileType: 'pdf',
  },
  {
    id: 'cert-power-bi',
    title: 'Data Analysis and Visualization with Power BI',
    issuer: 'Microsoft · Coursera',
    period: '25 Aug 2026',
    focus: 'BI data modeling, DAX calculations & executive reporting',
    credentialCode: 'ID: 5JCIWY839MTC',
    credentialNote: 'Completed end-to-end Power BI star schema modeling, DAX measures, and business reporting dashboards.',
    originalFilePath: '/assets/aistudio/Coursera_certificate_d6b20cf7.pdf',
    originalFileType: 'pdf',
  },
  {
    id: 'cert-git',
    title: 'Git Training',
    issuer: 'Simplilearn SkillUP',
    period: '13 Aug 2026',
    focus: 'Branching workflows, pull requests & collaborative version control',
    credentialCode: 'Code: 10594551',
    credentialNote: 'Completed Git branching strategies, merge conflict resolution, and GitHub collaboration workflows.',
    originalFilePath: '/assets/aistudio/git_certiicatee_b48c9c0b.pdf',
    originalFileType: 'pdf',
  },
  {
    id: 'cert-opencv',
    title: 'Introduction to Python OpenCV',
    issuer: 'Simplilearn SkillUP',
    period: '07 Aug 2026',
    focus: 'Image processing pipelines & real-time video frame manipulation',
    credentialCode: 'Code: 10565842',
    credentialNote: 'Completed hands-on OpenCV image filtering, contour tracking, and live camera frame processing.',
    originalFilePath: '/assets/aistudio/cv_.sharni_c46ab28d.pdf',
    originalFileType: 'pdf',
  },
  {
    id: 'cert-python-dev',
    title: 'Python Developer (C, C++, Python)',
    issuer: 'ACE Training Software Training Center · Madurai',
    period: 'Mar 2025 – Jun 2025',
    focus: 'Core Python programming, OOP & backend scripting foundations',
    credentialCode: 'Adm: 1B24-213 · Grade A+',
    credentialNote: 'Completed structured C, C++, and Python engineering program with A+ distinction in Madurai.',
    originalFilePath: '/assets/aistudio/pythondeveloper_e068bcf1.jpeg',
    originalFileType: 'image',
  },
];
