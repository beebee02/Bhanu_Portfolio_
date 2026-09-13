// Mock data for Bhanu Teja's portfolio

// At the top of frontend/src/mock.js
const PUBLIC_URL = process.env.PUBLIC_URL || '/Bhanu_Portfolio_';
export const HELLO_LANGS = [
  'Hello',
  'నమస్తే',
  'नमस्ते',
  'Bonjour',
  'Hola',
  'こんにちは',
  '안녕하세요',
  '你好',
  'Ciao',
  'Hallo',
  'Olá',
  'Здравствуйте'
];

export const PERSONAL = {
  name: 'BHANUTEJA',
  firstName: 'Bhanu',
  role: 'Business Analyst',
  location: 'INDIA',
  timezone: 'UTC -6',
  email: 'Bhanu.nimmagadda02@gmail.com',
  linkedin: 'https://www.linkedin.com/in/bhanu-teja-n',
  vsco: 'https://vsco.co/worldofbee',
  formspreeId: 'xkjnljpa',
};

export const INTRO = {
  headline:
    "Turning chaotic operational data into decisions that move revenue.",
  sub:
    "Zero shelf dashboards. MS Business Analytics @ UNT · Ex-Uber Analytics · Published ML Researcher.",
  photo:
    'https://customer-assets-agu9un31.emergentagent.net/job_frosty-rhodes-10/artifacts/s0u7oltj_image.png',
  photoAlt:
    'https://customer-assets-jt897jd0.emergentagent.net/job_8485eb51-ee92-4eda-95c4-efd782cb751a/artifacts/3g185toi_image.png',
};

// Top floating pill status
export const NOW_PLAYING_TRACK = {
  track: 'I Was Never There',
  artist: 'The Weeknd',
  album: 'My Dear Melancholy,',
  cover: `${PUBLIC_URL}/weeknd-spotify.jpeg`,
  lyricsCard: `${PUBLIC_URL}/weeknd-spotify.jpeg`,
  href: 'https://open.spotify.com/track/1cKHdTo9u0ZymJdPGSh6nq',
  quote: "If I keep going, I won't make it. And it's all because of you.",
  progress: 68,
  elapsed: '2:41',
  total: '4:01',
};
export const HOBBIES = [
  { title: 'Photography', stat: '2.3K frames shot', hint: '35mm / street', icon: 'Camera', accent: '#ff8a3d' },
  { title: 'Cafe-hopping', stat: '47 spots mapped', hint: 'flat white obsessed', icon: 'Coffee', accent: '#d97706' },
  { title: 'Workout', stat: '5x a week', hint: 'push / pull / legs', icon: 'Dumbbell', accent: '#ef4444' },
  { title: 'Late drives', stat: 'past midnight', hint: 'no destination', icon: 'Car', accent: '#60a5fa' },
  { title: 'Overland Expeditions', stat: '10K+ miles routed', hint: 'national parks & trails', icon: 'Mountain', accent: '#06b6d4' },
  { title: 'DIY Crafts', stat: 'paper, crochet & design', hint: 'custom handcrafted builds', icon: 'Scissors', accent: '#ec4899' },
];

// Spotify music section card
export const NOW_PLAYING_TRACK = {
  track: 'I Was Never There',
  artist: 'The Weeknd',
  album: 'My Dear Melancholy,',
  cover: `${PUBLIC_URL}/weeknd-spotify.jpeg`,
  lyricsCard: `${PUBLIC_URL}/weeknd-spotify.jpeg`,
  audio: `${PUBLIC_URL}/music/i-was-never-there.mp3`, // Fixed for audio playback
  href: 'https://open.spotify.com/track/1cKHdTo9u0ZymJdPGSh6nq',
  quote: "If I keep going, I won't make it. And it's all because of you.",
  progress: 68,
  elapsed: '2:41',
  total: '4:01',
};

export const TAGS = ['SQL', 'PYTHON', 'TABLEAU', 'FORECASTING', 'MACHINE LEARNING'];

export const PROJECTS = [
{
    id: 'marketplace-pulse',
    slug: 'marketplace-pulse',
    badge: '20+ KPIs',
    role: 'BUSINESS ANALYST INTERN',
    company: 'UBER',
    title: 'MARKETPLACE PULSE',
    subtitle: 'Uber Corporate Headquarters',
    caption:
      'Built at Uber: Centralized 20+ operational and customer KPIs into a unified framework to detect driver-rider performance gaps before they impacted bottom-line revenue.',
    image: `${PUBLIC_URL}/uber-project.jpg`,
    year: '2026',
    duration: '12 WEEKS',
    stack: ['SQL', 'Python', 'Tableau', 'Snowflake'],
    context:
      'Operating out of Uber, the rides marketplace tracked healthy top-line volume but masked micro-level inefficiencies: ballooning pickup ETAs in target metro clusters, localized driver churn, and untracked promo retention.',
    problem:
      'Cross-team performance disparities were caught weeks late during retrospectives. Ops teams needed a real-time, unified lens into marketplace health.',
    approach: [
      'Partnered directly with Supply, Demand, and Driver Operations leads to define critical marketplace health indicators.',
      'Architected governed tables in Snowflake via dbt, establishing single-source-of-truth logic across regional dashboards.',
      'Engineered interactive Tableau reporting suites monitoring 20+ core metrics with instant drill-downs into localized city segments.',
    ],
    results: [
      { metric: '20+', label: 'KPIs unified across teams' },
      { metric: '48h', label: 'faster gap detection vs. before' },
      { metric: '6', label: 'ops teams on a single source of truth' },
    ],
    takeaway:
      'Aligning cross-functional leadership on identical data definitions turned endless metric debates into actionable operational calls.',
  },
  {
    id: 'behavioral-longevity-capstone',
    slug: 'behavioral-longevity-capstone',
    badge: '225K+ Records',
    role: 'LEAD ANALYTICS RESEARCHER',
    company: 'MS CAPSTONE',
    title: 'BEHAVIORAL RISK & LONGEVITY',
    subtitle: 'Predictive Mental Health & Treatment Engagement',
    caption:
      'Master’s Capstone: Analyzed 225,058 survey records using an end-to-end CRISP-DM pipeline to predict mental health treatment-seeking actions through observable behavioral factors.',
    image:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1400&auto=format&fit=crop&q=80',
    year: '2026',
    duration: '16 WEEKS',
    stack: ['Python', 'CRISP-DM', 'XGBoost', 'Random Forest', 'SHAP'],
    context:
      'Conducted as a Master’s capstone analytics study at the University of North Texas, investigating how lifestyle habits, social indicators, and behavioral flags forecast clinical treatment-seeking decisions.',
    problem:
      'Public behavioral health surveys suffer from high dimensionality, missing values, and skewed distributions, obscuring key preventative intervention levers.',
    approach: [
      'Executed structured CRISP-DM methodology across data cleaning, iterative missingness imputation, and multi-collinearity pruning.',
      'Trained, benchmarked, and validated Logistic Regression, Random Forest, and XGBoost classifiers.',
      'Applied SHAP (SHapley Additive exPlanations) values to extract global and local feature contributions.',
    ],
    results: [
      { metric: '225K+', label: 'survey records modeled' },
      { metric: '89.4%', label: 'model test ROC-AUC' },
      { metric: '4', label: 'ML architectures benchmarked' },
    ],
    takeaway:
      'Combining robust statistical modeling with explainable AI transforms raw survey records into concrete healthcare interventions.',
  },
  {
    id: 'qlikview-retail-engine',
    slug: 'qlikview-retail-engine',
    badge: 'In-Memory OLAP',
    role: 'BI & DATA MODELER',
    company: 'GRADUATE PROJECT',
    title: 'IN-MEMORY RETAIL ENGINE',
    subtitle: 'Enterprise Associative Modeling & Script Optimization',
    caption:
      'Architected an associative in-memory retail analytical engine in QlikView, authoring complex multi-tiered ETL scripts and resolving synthetic keys for real-time sales drill-downs.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&auto=format&fit=crop&q=80',
    year: '2026',
    duration: '6 WEEKS',
    stack: ['QlikView', 'SQL', 'Data Modeling', 'ETL Scripting'],
    context:
      'Multi-store retail transaction streams, supply ledgers, and inventory logs suffered from aggregation lag and broken associations in traditional reporting setups.',
    problem:
      'Circular loops and synthetic table keys degraded dashboard reload speeds, preventing merchandising analysts from performing fluid cross-category comparisons.',
    approach: [
      'Authored modular QlikView load scripts utilizing resident loads, composite keys, and mapping tables to clean raw transactional layers.',
      'Designed a unified star schema data model to eliminate circular references and ensure lossless in-memory associative search.',
      'Constructed analytical sheets featuring dynamic Set Analysis expressions, alternate states, and KPI threshold heatmaps.',
    ],
    results: [
      { metric: '4.5x', label: 'faster data reload & refresh' },
      { metric: '0', label: 'synthetic keys / circular references' },
      { metric: '100%', label: 'associative search indexing' },
    ],
    takeaway:
      'Disciplined data architecture at the script load layer always creates faster, more intuitive user drill-downs than cosmetic front-end workarounds.',
  },
  {
    id: 'cardiovascular-risk-ml',
    slug: 'cardiovascular-risk-ml',
    badge: '~90% Accuracy',
    role: 'ML RESEARCHER',
    company: 'PREDICTIVE HEALTH',
    title: 'CARDIO RISK PREDICTOR',
    subtitle: 'Multi-Model Comparative Diagnostics',
    caption:
      'Engineered a multi-algorithm diagnostic framework evaluating Logistic Regression, Artificial Neural Networks (ANN), and Support Vector Machines (SVM) to detect cardiovascular risk profiles.',
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1400&auto=format&fit=crop&q=80',
    year: '2025',
    duration: '8 WEEKS',
    stack: ['Python', 'ANN', 'SVM', 'Scikit-Learn', 'Statistical Modeling'],
    context:
      'Early cardiovascular detection relies on complex interactions across biometric risk markers including blood glucose, cholesterol levels, demographic traits, and lifestyle metrics.',
    problem:
      'Isolated biomarker thresholds fail to capture nonlinear dependencies, leading to false negatives during preliminary diagnostic screenings.',
    approach: [
      'Standardized and normalized clinical biomarker matrices with outlier treatment and feature scaling.',
      'Trained and comparatively evaluated Logistic Regression, Deep Multi-Layer Perceptrons (ANN), and Radial Basis SVMs.',
      'Conducted threshold optimization on ROC curves to prioritize recall and minimize false negative rates.',
    ],
    results: [
      { metric: '~90%', label: 'classification accuracy' },
      { metric: '3', label: 'supervised ML architectures' },
      { metric: '-18%', label: 'reduction in false negatives' },
    ],
    takeaway:
      'Model precision in clinical data means nothing without tuning the classification threshold specifically around sensitivity and patient safety.',
  },
  {
    id: 'mst-ann-optimization',
    slug: 'mst-ann-optimization',
    badge: 'Published Paper',
    role: 'AUTHOR & RESEARCHER',
    company: 'RESEARCH PUBLICATION',
    title: 'GRAPH THEORY ANN ENGINE',
    subtitle: 'Minimum Spanning Tree Optimization via Neural Networks',
    caption:
      'Published research formulating an Artificial Neural Network methodology to accelerate Minimum Spanning Tree computation across complex large-scale topological graphs.',
    image:
      'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1400&auto=format&fit=crop&q=80',
    year: '2024',
    duration: 'IJARESM',
    stack: ['Neural Networks', 'Graph Theory', 'Python', 'Algorithms'],
    context:
      'Traditional deterministic graph algorithms (Kruskal’s, Prim’s) face computational bottlenecks when scaling to dense, high-node graph topologies in telecommunications and logistics.',
    problem:
      'High time complexity on massive edge sets limits real-time topological routing and distributed network optimization.',
    approach: [
      'Formulated an ANN heuristic architecture capable of predicting optimal edge weights and adjacency mappings.',
      'Benchmarked computational convergence times against classical combinatorial baseline algorithms.',
      'Peer-reviewed and published in the International Journal of All Research Education and Scientific Methods (IJARESM).',
    ],
    results: [
      { metric: 'IJARESM', label: 'peer-reviewed publication' },
      { metric: 'O(log N)', label: 'accelerated computational efficiency' },
      { metric: '100%', label: 'topological tree validity' },
    ],
    takeaway:
      'Applying heuristic neural architectures to classical algorithmic bottlenecks can unlock dramatic computational speedups at scale.',
  },
  {
    id: 'automated-pipeline-orchestration',
    slug: 'automated-pipeline-orchestration',
    badge: '-30% Prep',
    role: 'DATA ENGINEER',
    company: 'ENTERPRISE AUTOMATION',
    title: 'ZERO-TOUCH ETL ENGINE',
    subtitle: 'Automated Data Extraction & Scheduled Pipelines',
    caption:
      'Designed end-to-end Python, SQL, and scheduled orchestration pipelines that replaced manual preparation routines, saving six hours of repetitive engineering every week.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&auto=format&fit=crop&q=80',
    year: '2025',
    duration: '4 WEEKS',
    stack: ['Python', 'SQL', 'Airflow', 'ETL Automation', 'APIs'],
    context:
      'Cross-functional reporting suffered from weekly manual spreadsheets, human copy-paste risks, and brittle data handoffs between disconnected systems.',
    problem:
      'Analysts lost over 6 hours every single week on redundant data staging, leading to delivery delays and reporting discrepancies.',
    approach: [
      'Engineered automated extraction scripts in Python interfacing directly with database APIs and cloud data stores.',
      'Structured parameterized SQL staging queries to automate transformations and data hygiene validations.',
      'Deployed automated alert triggers to instantly detect pipeline failures and data drift.',
    ],
    results: [
      { metric: '6h/wk', label: 'engineering time saved' },
      { metric: '-30%', label: 'manual preparation latency' },
      { metric: '0', label: 'manual copy-paste errors' },
    ],
    takeaway:
      'Automating foundational data plumbing frees analytics teams to solve actual business and operational problems.',
  },
];

export const EXPERIENCE = [
  {
    company: 'Uber',
    role: 'Business Analyst Intern',
    period: '2026',
    bullets: [
      'Built a marketplace analytics framework integrating 20+ operational and customer KPIs, improving performance gap identification across teams.',
      'Automated reporting workflows using SQL and Python, cutting manual data preparation by 30% and saving 6 hours weekly.',
      'Developed 4 interactive Tableau dashboards, consolidating fragmented reporting into a centralized view for 25+ KPIs.',
    ],
  },
  {
    company: 'University of North Texas',
    role: 'Graduate Assistant',
    period: '2025 — 2026',
    bullets: [
      'Assisted faculty with course delivery for a graduate analytics course, grading assignments and holding office hours for 40+ students.',
      'Supported research data collection and cleaning using Python and SQL, prepping datasets for faculty-led analytics projects.',
      'Created supplementary lab material and walkthroughs that improved student comprehension of statistical modeling concepts.',
    ],
  },
];

export const LETS_WORK_IMAGE =
  'https://customer-assets-jt897jd0.emergentagent.net/job_8485eb51-ee92-4eda-95c4-efd782cb751a/artifacts/3g185toi_image.png';

export const SKILLS = [
  {
    title: 'Data Storytelling',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  },
  {
    title: 'SQL & Modeling',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80',
  },
  {
    title: 'Dashboards & BI',
    image: 'https://images.unsplash.com/photo-1686061593213-98dad7c599b9?w=1200&q=80',
  },
  {
    title: 'Forecasting & ML',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
  },
  {
    title: 'Automation & Pipelines',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
  },
  {
    title: 'Stakeholder Ops',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
  },
];