// Centralized portfolio content. Update this file to keep copy in sync everywhere.

export const profile = {
  name: "Siddhartha Singh",
  role: "Full-Stack Developer",
  tagline: "Backend & Serverless Systems · Problem Solver",
  headline: "Full-Stack Developer building modern web applications and backend systems.",
  subhead:
    "I build end-to-end products with React, Node.js, Express, MongoDB and SQL — and I care just as much about what happens behind the API as what shows up on screen. Lately that means serverless systems on Cloudflare Workers, object storage, and the kind of sync bugs that only show up in production.",
  status: "Open to Software Engineering Opportunities",
  location: "Delhi, India",
  email: "siddharthasingh3112004@gmail.com",
  phone: "+91-8700696723",
  resumeUrl: "/Siddhartha-Singh-Resume.pdf",
  links: {
    github: "https://github.com/Siddhartha03112004",
    linkedin: "https://www.linkedin.com/in/siddhartha-singh-02928b255/",
    leetcode: "https://leetcode.com/u/SiddharthaSingh3112004/",
  },
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const aboutStats = [
  { value: "250+", label: "LeetCode Problems" },
  { value: "2026", label: "B.Tech Graduate" },
  { value: "Full-Stack", label: "Development" },
  { value: "3+", label: "Major Dev Experiences" },
];

export const aboutHighlights = [
  "MERN stack",
  "REST APIs",
  "JWT Authentication",
  "SQL",
  "Cloudflare Workers",
  "Object storage",
  "Debugging",
  "Data synchronization",
  "DSA",
];

export const experiences = [
  {
    id: "primrose",
    company: "Primrose Sphere Tech Pvt. Ltd.",
    role: "Full Stack Developer Intern",
    period: "June 2026 – Present",
    location: "Remote",
    size: "primary",
    summary:
      "Working on a serverless goal-tracking application — building Gmail synchronization and file attachment infrastructure on Cloudflare's edge platform.",
    stack: ["Cloudflare Workers", "Cloudflare D1", "Cloudflare R2", "SQL", "REST APIs", "Node.js"],
    stories: [
      {
        title: "Incremental Gmail Synchronization",
        summary:
          "Built incremental Gmail sync for the app: indexing email metadata in SQL, storing raw emails in object storage, and driving each sync with a timestamp cursor rather than Gmail's history ID — history IDs can expire weekly, and an expired ID means silently missed mail.",
        problem:
          "In already-merged code, the sync cursor could advance past emails the current batch hadn't actually fetched yet. It failed silently — no error surfaced — so skipped emails just disappeared from the sync with nothing to flag it.",
        solution:
          "Held cursor advancement until the batch was confirmed complete, so the cursor only moves forward once there's proof the emails behind it were actually saved.",
        result: "Closed a silent data-loss path already running in production and added a regression test to catch it if it comes back.",
        tags: ["SQL", "Object Storage", "Cursor-based Sync", "Regression Testing"],
      },
      {
        title: "File Attachments via Pre-signed URLs",
        summary:
          "Shipped file attachments using pre-signed URL uploads — files go straight from the client to object storage without passing through the app server, while the storage key and metadata are recorded in SQL as the source of truth for file lookup.",
        tags: ["Pre-signed URLs", "Cloudflare R2", "SQL", "Object Storage"],
      },
    ],
  },
  {
    id: "ibm",
    company: "IBM SkillsBuild",
    role: "Frontend Web Developer Trainee",
    period: "June 2024 – August 2024",
    location: "Remote",
    size: "secondary",
    summary:
      "Built Agency-AI, a responsive digital agency website, and worked through the details of state management and animation across a real multi-component UI.",
    stack: ["React.js", "Vite", "Tailwind CSS", "Vercel"],
    stories: [
      {
        title: "Agency-AI",
        summary:
          "Built and deployed a responsive digital agency website on Vercel with a dark/light theme toggle — lifting state to the parent and passing it via props across 10+ components — plus scroll-based animations built with Motion for a smooth experience across screen sizes.",
        tags: ["React.js", "Vite", "Tailwind CSS", "Vercel", "State Lifting"],
      },
    ],
  },
];

export const projects = [
  {
    id: "wanderlust",
    name: "WanderLust",
    tagline: "Travel Listing Web App",
    period: "Jan 2025",
    description:
      "A full-stack travel listing platform built on the MVC pattern — users can browse, create, and manage property listings with a proper authentication and authorization layer underneath.",
    stack: ["Node.js", "Express.js", "MongoDB", "EJS", "Passport.js", "Cloudinary"],
    features: [
      "MVC architecture with a RESTful API design across 10+ CRUD routes",
      "50+ active listings with full create / read / update / delete flows",
      "Secure authentication and role-based authorization with Passport.js, protecting all write operations from unauthenticated access",
      "Session-based auth to keep users signed in across requests",
      "Cloudinary integration for cloud-based listing image uploads",
    ],
    preview: "listing",
    links: {
      code: "https://github.com/Siddhartha03112004/wanderlust-mern",
      live: "https://wanderlust-mern-r3yi.onrender.com/listings",
    },
  },
  {
    id: "thumbnail-generator",
    name: "AI Thumbnail Generator",
    tagline: "AI-Powered Web App",
    period: "Nov 2025",
    description:
      "A full-stack MERN app that turns a text prompt into a custom thumbnail, backed by an external AI API and a clean REST layer for managing generation history.",
    stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
    features: [
      "5+ REST endpoints covering prompt submission, image generation, retrieval, and deletion",
      "External AI API integration for image generation from text prompts",
      "Structured error handling with correct HTTP status codes",
      "MongoDB metadata and prompt history storage so users can retrieve and manage past generations",
    ],
    preview: "generator",
    links: {
      code: profile.links.github,
    },
  },
];

export const skillGroups = [
  {
    title: "Languages",
    skills: ["C++", "JavaScript", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Redux", "Tailwind CSS", "EJS", "Responsive Web Design", "Framer Motion", "Vite"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Session Management", "Passport.js", "MVC Architecture"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "MySQL", "SQLite", "CRUD Operations"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "Cloudflare Workers", "Cloudflare D1", "Cloudflare R2", "Cloudinary", "Hoppscotch", "Render", "Vercel"],
  },
  {
    title: "Concepts",
    skills: ["Data Structures & Algorithms", "OOP", "SDLC", "Unit Testing", "Debugging", "Web Security", "Authentication"],
  },
];

export const education = [
  {
    id: "dav",
    school: "DAV Centenary Public School",
    fullName: "New Delhi — Paschim Vihar",
    degree: "Class XII",
    period: "2022",
    size: "secondary",
  },
  {
    id: "usict",
    school: "USICT, GGSIPU",
    fullName: "University School of Information, Communication & Technology",
    degree: "B.Tech — Electronics & Communication Engineering",
    period: "Nov 2022 – May 2026",
    detail: "CGPA: 7.33 / 10",
    coursework: ["Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks", "OOP"],
    size: "primary",
  },
];
