const encode = (value) => encodeURIComponent(value);

const noteLibrary = [
  {
    aliases: ["html", "css", "javascript", "web", "frontend", "react"],
    notes: [
      {
        title: "MDN Web Docs",
        description: "Clear, reliable browser and web development references.",
        url: "https://developer.mozilla.org/en-US/",
      },
      {
        title: "React Learn",
        description: "Official React lessons for components, state, and hooks.",
        url: "https://react.dev/learn",
      },
      {
        title: "web.dev Learn",
        description: "Modern frontend guides from the Chrome team.",
        url: "https://web.dev/learn",
      },
    ],
  },
  {
    aliases: ["node", "express", "backend", "api", "full stack"],
    notes: [
      {
        title: "Node.js Guides",
        description: "Official Node.js learning guides and API references.",
        url: "https://nodejs.org/en/learn",
      },
      {
        title: "Express Guide",
        description: "Official Express routing, middleware, and API notes.",
        url: "https://expressjs.com/en/guide/routing.html",
      },
      {
        title: "MongoDB Developer Center",
        description: "Practical MongoDB tutorials and data modeling guides.",
        url: "https://www.mongodb.com/developer/",
      },
    ],
  },
  {
    aliases: ["ai", "machine learning", "ml", "deep learning", "llm", "python"],
    notes: [
      {
        title: "Google Machine Learning Crash Course",
        description: "Structured ML notes, examples, and exercises.",
        url: "https://developers.google.com/machine-learning/crash-course",
      },
      {
        title: "scikit-learn User Guide",
        description: "Practical machine learning concepts and model guides.",
        url: "https://scikit-learn.org/stable/user_guide.html",
      },
      {
        title: "PyTorch Tutorials",
        description: "Hands-on deep learning tutorials and explanations.",
        url: "https://pytorch.org/tutorials/",
      },
    ],
  },
  {
    aliases: ["cloud", "aws", "devops", "docker", "kubernetes", "linux"],
    notes: [
      {
        title: "AWS Skill Builder",
        description: "AWS learning plans, cloud concepts, and service notes.",
        url: "https://skillbuilder.aws/",
      },
      {
        title: "Docker Docs",
        description: "Official container tutorials and reference material.",
        url: "https://docs.docker.com/get-started/",
      },
      {
        title: "Kubernetes Basics",
        description: "Official Kubernetes tutorials for deployments and services.",
        url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
      },
    ],
  },
  {
    aliases: ["cyber", "security", "owasp", "networking"],
    notes: [
      {
        title: "OWASP Web Security Testing Guide",
        description: "High-quality web security testing notes and methodology.",
        url: "https://owasp.org/www-project-web-security-testing-guide/",
      },
      {
        title: "PortSwigger Web Security Academy",
        description: "Free practical security labs with concise explanations.",
        url: "https://portswigger.net/web-security",
      },
      {
        title: "Cisco Networking Basics",
        description: "Networking concepts useful for security foundations.",
        url: "https://www.netacad.com/courses/networking-basics",
      },
    ],
  },
  {
    aliases: ["data", "analytics", "statistics", "pandas", "sql"],
    notes: [
      {
        title: "Kaggle Learn",
        description: "Short practical notes for Python, pandas, SQL, and ML.",
        url: "https://www.kaggle.com/learn",
      },
      {
        title: "Pandas User Guide",
        description: "Official pandas notes for data cleaning and analysis.",
        url: "https://pandas.pydata.org/docs/user_guide/",
      },
      {
        title: "Mode SQL Tutorial",
        description: "Readable SQL notes and business analytics practice.",
        url: "https://mode.com/sql-tutorial/",
      },
    ],
  },
];

const findCuratedNotes = (topic = "") => {
  const query = topic.toLowerCase();
  const match = noteLibrary.find((group) =>
    group.aliases.some((alias) => query.includes(alias)),
  );

  return match?.notes || [];
};

exports.getNotes = (topic) => {
  const q = encode(topic);
  const curatedNotes = findCuratedNotes(topic);

  return [
    ...curatedNotes,
    {
      title: `${topic} curated readings`,
      description: "A focused web search for strong notes when no official guide exists.",
      url: `https://www.google.com/search?q=${q}+best+notes+tutorial+guide`,
    },
  ].slice(0, 4);
};

exports.getStepNotes = (pathTopic, stepTopic) => {
  const notes = exports.getNotes(stepTopic);

  return notes.slice(0, 2);
};
