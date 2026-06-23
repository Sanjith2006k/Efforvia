const topicLibrary = {
  react: {
    aliases: ["react", "frontend", "front end"],
    roadmap: [
      "HTML and semantic structure",
      "CSS layouts and responsive design",
      "Modern JavaScript",
      "React components and hooks",
      "Routing, forms, and API calls",
      "State management",
      "Testing and deployment",
      "Portfolio projects",
    ],
  },
  javascript: {
    aliases: ["javascript", "js", "programming"],
    roadmap: [
      "Syntax and data types",
      "Functions and scope",
      "DOM manipulation",
      "Async JavaScript",
      "APIs and fetch",
      "Modules and tooling",
      "Testing basics",
      "Real projects",
    ],
  },
  ai: {
    aliases: ["ai", "artificial intelligence", "machine learning", "ml"],
    roadmap: [
      "Python foundations",
      "Linear algebra and statistics",
      "Data cleaning",
      "Machine learning models",
      "Deep learning basics",
      "LLMs and prompt engineering",
      "Model evaluation",
      "AI capstone project",
    ],
  },
  cloud: {
    aliases: ["cloud", "aws", "devops"],
    roadmap: [
      "Linux basics",
      "Networking fundamentals",
      "Cloud compute and storage",
      "AWS core services",
      "Docker containers",
      "CI/CD pipelines",
      "Kubernetes basics",
      "Cloud deployment project",
    ],
  },
  cybersecurity: {
    aliases: ["cybersecurity", "cyber security", "security"],
    roadmap: [
      "Networking basics",
      "Linux and command line",
      "Web security fundamentals",
      "Cryptography basics",
      "Threat modeling",
      "OWASP Top 10",
      "Blue team and monitoring",
      "Security lab project",
    ],
  },
  data: {
    aliases: ["data science", "data", "analytics"],
    roadmap: [
      "Python for data",
      "Spreadsheets and SQL",
      "Statistics fundamentals",
      "Pandas and NumPy",
      "Data visualization",
      "Machine learning intro",
      "Dashboards",
      "Data portfolio project",
    ],
  },
  web: {
    aliases: ["web development", "web", "full stack"],
    roadmap: [
      "HTML and CSS",
      "JavaScript",
      "Frontend framework",
      "Node.js and Express",
      "Databases",
      "Authentication",
      "Deployment",
      "Full-stack project",
    ],
  },
};

const normalize = (value) => value.toLowerCase().trim();

exports.getRoadmap = (topic = "") => {
  const query = normalize(topic);
  const match = Object.values(topicLibrary).find((item) =>
    item.aliases.some((alias) => query.includes(alias)),
  );

  return (
    match?.roadmap || [
      `${topic} fundamentals`,
      `Core ${topic} concepts`,
      `Hands-on ${topic} practice`,
      `${topic} tools and workflows`,
      `Intermediate ${topic}`,
      `Advanced ${topic}`,
      `${topic} project`,
    ]
  );
};
