/* ==================================================================
   data.js — every piece of content on the site lives here.
   Edit this file; the components never need to change.
   ================================================================== */

export const PROFILE = {
  first: "Aansh",
  last: "Yadav",
  fullName: "Aansh Yadav",
  tagline: "TECHNOLOGY • MUSIC • SPORTS • PUBLIC SPEAKING",
  location: "Noida, India",
  email: "",
  phone: "",
  bio: [
    "I am Aansh Yadav, a Grade 10 student at Sommerville School, Noida, with a growing interest in Computer Science and technology. I enjoy exploring how technology works, learning programming languages and challenging myself through problem-solving.",
    "I am a curious and enthusiastic learner who enjoys exploring different areas of knowledge. My interest in technology has encouraged me to develop programming skills, particularly in Python, while my participation in extracurricular activities has helped me explore creativity, discipline and communication.",
    "Beyond academics, music has been an important part of my journey, with the tabla being one of my longest-standing interests. I have also participated in Model United Nations conferences and enjoy swimming, chess and badminton. I believe in building a diverse set of skills, staying curious and making the most of every learning opportunity.",
  ],
  quote:
    "My goal is to remain curious, keep learning and make meaningful progress in the areas I am passionate about.",
  socials: {
    github: "",
    scholar: "",
    linkedin: "",
    codeforces: "",
    fide: "",
    imo: "",
    wespa: "",
    twitter: "",
  },
  cv: "",
  photo: "/placeholder.png",
  aboutPhoto: "/photo.png",
};

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  {
    label: "Experience",
    children: [
      { label: "Activities", to: "/work" },
      { label: "Featured Projects", to: "/projects" },
      { label: "Areas of Interest", to: "/publications" },
    ],
  },

  { label: "Achievements", to: "/awards" },
  { label: "Future Directions", to: "/volunteering" },
  { label: "Personal Interests", to: "/sports" },
];

/* ---- Experience (renders as "Work Experience" cards) — Activities ---- */

export const EXPERIENCE = [
  {
    slug: "model-united-nations-delegate",
    role: "Delegate — Model United Nations",
    org: "MUN Conferences (Avyukta 2.0 & 3.0)",
    logo: "",
    location: "Noida, India",
    dates: "2025 – 26 · Grade 10",
    meta: "2025 – 26 · Grade 10 · Noida, India ·",
    badge: "Public Speaking",
    desc: "Began participating in Model United Nations conferences in Grade 10, discovering an interest in public speaking, international affairs and collaborative discussions. Through these first MUN experiences I have started developing my ability to engage with different perspectives, take part in debate and communicate ideas clearly.",
    bullets: [
      "Avyukta 2.0 — Special Mention and Participation Trophy",
      "Avyukta 3.0 — Participation Medal",
      "Aiming to attend more conferences and represent the school at future MUN events",
    ],
    tags: ["Public Speaking", "Research", "Diplomacy", "International Affairs"],
    featured: true,
  },
  {
    slug: "school-house-tabla-player",
    role: "School House Tabla Player",
    org: "Sommerville School",
    logo: "",
    location: "Noida, India",
    dates: "Grade 6 – Grade 10",
    meta: "Grade 6 – Grade 10 · Noida, India ·",
    badge: "Music & Performance",
    desc: "Learning and practising the tabla since 2017, now at an advanced level. Served as my school house's tabla player from Grade 6 through Grade 10 and have performed at school and community events.",
    bullets: [
      "Performed during the school's Independence Day ceremony in Grade 9",
      "Performed at a Durga Puja celebration",
      "Completed tabla examinations from PP1 through Year 3 (Practical and Theory)",
    ],
    tags: ["Tabla", "Rhythm", "Performance", "Consistent Practice"],
    featured: true,
  },
];

/* ---- Projects (Research & Projects) — Computer Science ---- */

export const PROJECTS = [
  {
    name: "Programming Foundations — Structured Coding Classes",
    org: "Individual Learning",
    meta: "1+ year · Ongoing",
    desc: "My introduction to programming began through coding classes, where I developed foundational knowledge of different programming languages and technologies over more than a year. Along the way I became familiar with different coding environments, from block-based Scratch to Python and web development with HTML, CSS and JavaScript.",
    tags: ["Python", "JavaScript", "HTML", "CSS", "Scratch"],
    featured: true,
  },
  {
    name: "Python & Problem-Solving Goals",
    org: "Individual Learning",
    meta: "2025 – 26 · Ongoing",
    desc: "I am interested in how ideas can be translated into technology-based solutions. My current focus is strengthening Python, improving logical reasoning and computational problem-solving, practising coding challenges regularly on HackerRank, exploring interschool programming competitions, and building practical projects that apply what I have learned.",
    tags: ["Python", "Problem-Solving", "HackerRank", "Logical Reasoning"],
    featured: true,
  },
];

/* ---- Achievements ---- */

export const AWARDS = [
  {
    icon: "🏅",
    title: "Special Mention & Participation Trophy — Avyukta 2.0 MUN",
    meta: "Model United Nations · Avyukta 2.0 · 2025 – 26",
    detail: "Received a Special Mention and Participation Trophy at Avyukta 2.0, in my first year of participating in Model United Nations conferences.",
    link: "",
    featured: true,
  },
  {
    icon: "🎖️",
    title: "Participation Medal — Avyukta 3.0 MUN",
    meta: "Model United Nations · Avyukta 3.0 · 2025 – 26",
    detail: "Took part as a delegate at Avyukta 3.0, continuing to build experience in public speaking, research and diplomacy.",
    link: "",
    featured: true,
  },
  {
    icon: "🥁",
    title: "Tabla Examinations — PP1 to Year 3",
    meta: "Music · Practical and Theory · 2017 – Present",
    detail: "Completed tabla examinations PP1, PP2, and Years 1, 2 and 3 in both practical and theory, reflecting years of regular learning and consistent practice.",
    link: "",
    featured: true,
  },
  {
    icon: "🎶",
    title: "School House Tabla Player",
    meta: "School · Sommerville School · Grade 6 – Grade 10",
    detail: "Represented my house as its tabla player for five consecutive years, including a performance at the school's Independence Day ceremony in Grade 9.",
    link: "",
    featured: true,
  },
  {
    icon: "🤖",
    title: "Artificial Intelligence — 91/100",
    meta: "School · Grade 9 Academic Performance",
    detail: "Highest Grade 9 score, in Artificial Intelligence — one of the subjects that sparked my interest in Computer Science.",
    link: "",
    featured: false,
  },
];

/* ---- Areas of Interest ---- */

export const ARTICLES = [
  {
    title: "Computer Science & Programming",
    outlet: "Python, JavaScript, HTML, CSS and turning ideas into technology-based solutions",
    link: "",
  },
  {
    title: "Artificial Intelligence",
    outlet: "Exploring how technology can be used to solve real-world problems",
    link: "",
  },
  {
    title: "Mathematics & Science",
    outlet: "Subjects that encourage logical thinking, problem-solving and understanding how things work",
    link: "",
  },
  {
    title: "Public Speaking & International Affairs",
    outlet: "Model United Nations, diplomacy, research and engaging with different perspectives",
    link: "",
  },
  {
    title: "Music & Rhythm",
    outlet: "Tabla performance, musical expression and the discipline of regular practice",
    link: "",
  },
];

/* ---- Leadership, community & personal growth ---- */

export const VOLUNTEER = {
  stats: [
    { value: "9+", label: "Years Learning Tabla" },
    { value: "2", label: "MUN Conferences" },
    { value: "5", label: "Programming Languages Explored" },
  ],
  orgs: [
    {
      name: "Qualities I'm Developing",
      role: "Across technology, music, MUN & sport",
      desc: "Whether it is learning a new programming concept, practising the tabla, participating in an MUN conference or playing a sport, I enjoy experiences that challenge me to develop new skills — curiosity in exploring new subjects and technologies, consistency through regular practice, creativity through music and technology, communication by expressing perspectives with confidence, and problem-solving by approaching challenges logically.",
    },
    {
      name: "Looking Ahead",
      role: "Goals for the rest of high school",
      desc: "I hope to build a stronger foundation in Computer Science and explore its practical applications. My immediate goals include advancing my Python skills, taking part in technology-related competitions, gaining more experience through MUN conferences, and continuing my involvement in music and school activities — including annual functions and interschool performances.",
    },
  ],
};

/* ---- Beyond Academics (renders on the /sports route) ---- */

export const SPORTS = [
  {
    icon: "🏊",
    name: "Swimming — Since 2016",
    desc: "Swimming has been part of my life since childhood. I was introduced to it at an early age by my father, who captained his school swimming team. Over the years I have learned all four major strokes — freestyle, breaststroke, backstroke and butterfly — and breaststroke is the one I enjoy and feel most confident in.",
  },
  {
    icon: "♟️",
    name: "Chess — Intermediate, Since 2020",
    desc: "I began learning chess in 2020 through academy sessions before continuing to play independently. Today I play as a hobby on Chess.com, and I aim to play more consistently and gradually build my rating.",
  },
  {
    icon: "🏸",
    name: "Badminton — Since 2025",
    desc: "I started playing badminton in 2025 as a recreational activity with my father — a way to stay active, enjoy the game and explore a new sport.",
  },
  {
    icon: "🏀",
    name: "Basketball — 2023",
    desc: "I explored basketball for about a year, building familiarity with the sport and its fundamentals. Although I moved on from structured participation, it gave me the chance to try a new sporting discipline.",
  },
  {
    icon: "🏓",
    name: "Table Tennis — 2023",
    desc: "I received around five months of coaching in table tennis, learning the fundamentals and developing an understanding of the game.",
  },
];

/* ---- Skills ---- */

export const SKILLS = [
  {
    group: "Programming",
    items: ["Python", "JavaScript", "HTML", "CSS", "Scratch"],
  },
  {
    group: "Music & Performance",
    items: ["Tabla (Advanced)", "Rhythm", "Live Performance"],
  },
  {
    group: "Languages",
    items: ["Hindi", "English", "German (Intermediate)"],
  },
  {
    group: "Core Strengths",
    items: ["Curiosity", "Consistency", "Creativity", "Communication", "Problem-Solving", "Public Speaking", "Research", "Diplomacy"],
  },
];

/* ---- Photo gallery (Home page) ----
   HOW TO ADD IMAGES
   1. Copy the image file into  public/images/
   2. Add a line below:  { src: "/images/<filename>", caption: "..." }
   The path works exactly like PROFILE.aboutPhoto ("/photo.png" = public/photo.png).
   Optional: alt (screen-reader text; defaults to the caption).
   Files that are missing are hidden automatically, so the filenames below are
   placeholders — rename them to match your real files and edit the captions.

   The same { src, caption } objects can also be added as an  images: [ ... ]
   array on any item in EXPERIENCE (shown on its detail page), PROJECTS or
   SPORTS (shown as small thumbnails inside the card). */

export const GALLERY = [
  { src: "/images/tabla_performance.jpg", caption: "" },
  { src: "/images/independence_day.jpg", caption: "" },
  { src: "/images/mun_avyukta.jpg", caption: "" },
  { src: "/images/mun_trophy.jpg", caption: "" },
  { src: "/images/coding.jpg", caption: "" },
  { src: "/images/swimming.jpg", caption: "" },
  { src: "/images/chess.jpg", caption: "" },
];

/* ---- Education ---- */

export const EDUCATION = [
  {
    school: "Sommerville School, Noida",
    location: "Noida, India",
    level: "CBSE — Grade 10",
    dates: "2025 – 26 · Expected Graduation 2028",
    gpa: "",
    coursework: [
      "Artificial Intelligence",
      "Mathematics",
      "Science",
      "Social Science",
      "English",
      "German",
    ],
  },
];

export const TEST_SCORES = [
  {
    exam: "Grade 9 Academic Performance",
    date: "2024 – 25",
    breakdown: [
      { label: "Artificial Intelligence", value: "91/100" },
      { label: "German", value: "86/100" },
      { label: "Social Science", value: "86/100" },
      { label: "Mathematics", value: "81/100" },
      { label: "English", value: "78/100" },
      { label: "Science", value: "73/100" },
    ],
  },
];

export const FOOTER_NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Activities", to: "/work" },
  { label: "Featured Projects", to: "/projects" },
  { label: "Areas of Interest", to: "/publications" },
  { label: "Achievements", to: "/awards" },
  { label: "Future Directions", to: "/volunteering" },
  { label: "Personal Interests", to: "/sports" },
];

export const FOOTER_PROFILES = [
  { label: "LinkedIn", href: PROFILE.socials.linkedin },
];
