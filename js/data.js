/* ═══════════════════════════════════════════════════════════
   data.js — Personal data / content configuration
   ═══════════════════════════════════════════════════════════
   Edit this file to personalise your terminal portfolio.
   No other files need to change.
   ═══════════════════════════════════════════════════════════ */

const DATA = {
  /* ── Identity ──────────────────────────────────────────── */
  name:     "Roland",
  role:     "Software Engineer",
  location: "Earth",
  email:    "roland.krancz@gmail.com",
  github:   "https://github.com/rolandkrancz",
  linkedin: "https://www.linkedin.com/in/roland-krancz-ab8a08170/",
  /* ── About ─────────────────────────────────────────────── */
  about: [
"I'm a Software and DevOps Engineer, with a strong passion for technology and continuous learning.",
"I believe in lifelong learning and always strive to improve my craft, and motivate others to do the same.",
"Currently working in the medical sector, I’m focused on deepening my knowledge in AI and Cloud technologies, while maintaining my embedded development skills in C."
  ],

  /* ── Skills ────────────────────────────────────────────── */
  skills: {
    "Languages": ["C", "C++", "Python", "Bash", "PowerShell", "JavaScript"],
    "AI / ML":   ["LLMs", "PyTorch", "TensorFlow", "LangChain", "HuggingFace", "OpenAI API", "RAG"],
    "Backend":   ["FastAPI", "Node.js", "PostgreSQL"],
    "DevOps":    ["Azure", "Docker", "Terraform", "GitHub Actions"],
    "Tools":     ["Git", "VS Code", "Jira", "Polarion"],
  },

  /* ── Projects ──────────────────────────────────────────── */
  projects: [
    {
      name: "AI chatbot",
      desc: "An intelligent chatbot that answers questions based on your uploaded documents. Built with a RAG architecture, including full infrastructure deployment using Docker and Terraform.",
      tech: "Python, Chainlit, Langchain, ChromaDB, OpenAI API, Docker, Terraform",
      url:  "https://github.com/rolandkrancz/RAG-bot",
    }
  ],

  /* ── Experience ────────────────────────────────────────── */
  experience: [
    {
        role:    "DevOps developer",
        company: "B. Braun",
        period:  "2025 — Present",
        details: [
            "• Joined the DevOps team (part time, while continuing other responsibilities) to seek new challenges.",
            "• Focused on bringing AI and Cloud expertise to the team, and supporting day-to-day operations.",
            "• Supported the teams in migrating CI/CD pipelines from on-prem to Azure.",
            "• Developed internal tools to automate and streamline various processes, improving efficiency and reducing manual work.",
            "• Developed an internal RAG-based chatbot to assist developers in finding relevant requirements and documentation, significantly reducing the time spent searching for information and improving overall productivity.",
        ]
    },
    {
        role:    "Software Engineer",
        company: "B. Braun",
        period:  "2023 — Present",
        details: [
            "• Developing safety-critical infusion pump software in C.",
            "• Collaborating with cross-functional teams.",
            "• Mentoring colleagues, holding in-house training sessions and Coding Dojos to promote best practices and continuous learning.",
        ],
    },
    {
      role:    "Software Developer",
      company: "Effective Group Zrt.",
      period:  "2023 — 2023",
      details: [
        "• After a short break, rejoined medical software development as an external developer.",
      ],
    },
    {
      role:    "Software Engineer",
      company: "B. Braun",
      period:  "2020 — 2022",
      details: [
      ],
    },
    {
      role:    "Software Engineer Intern",
      company: "B. Braun",
      period:  "2019 — 2020",
      details: [
        "• Learned the nuances of software development in a regulated industry",
        "• Learned how to write clean, maintainable code and work effectively in a team",
        "• Unit-testing, TDD.",
        "• Contributed to the development of a medical device software component",
      ],
    },
  ],

  /* ── Education ─────────────────────────────────────────── */
  education: [
    {
      degree: "B.Sc. Electrical Engineering",
      school: "Óbuda University",
      year:   "2020",
      details: [
        "• Specializing in embedded software development and automation.",
        "• Graduated with grade: 5.0/5.0 (Excellent).",
      ],
    },
  ],
};
