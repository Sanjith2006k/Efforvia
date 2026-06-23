import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Award,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Timer,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   QUESTION BANK  – each question has:
     question  : string
     options   : string[4]
     answer    : index of correct option
     explanation: short "why" shown after answering
   ───────────────────────────────────────────────────────────── */
const questionBank = {
  /* ── WEB BASICS ─────────────────────────────────────────── */
  html: [
    {
      question: "Which tag defines the main heading on a page?",
      options: ["<h1>", "<main>", "<title>", "<header>"],
      answer: 0,
      explanation: "<h1> is the top-level heading; every page should have exactly one.",
    },
    {
      question: "What does semantic HTML improve most directly?",
      options: ["Meaning & accessibility", "Server speed", "Database size", "Image quality"],
      answer: 0,
      explanation: "Semantic elements like <article> and <nav> give machines and assistive tech meaningful context.",
    },
    {
      question: "Which attribute describes an image for screen readers?",
      options: ["alt", "src", "href", "role"],
      answer: 0,
      explanation: "The alt attribute provides a text alternative when an image cannot be displayed.",
    },
    {
      question: "Which HTML element groups inline content?",
      options: ["<span>", "<div>", "<section>", "<article>"],
      answer: 0,
      explanation: "<span> is an inline container; <div> is a block-level container.",
    },
    {
      question: "Which tag creates a hyperlink?",
      options: ["<a>", "<link>", "<href>", "<url>"],
      answer: 0,
      explanation: "The anchor tag <a> with an href attribute creates clickable hyperlinks.",
    },
    {
      question: "What is the correct way to comment in HTML?",
      options: ["<!-- comment -->", "// comment", "/* comment */", "# comment"],
      answer: 0,
      explanation: "HTML comments use <!-- --> syntax.",
    },
    {
      question: "Which attribute specifies the URL of an image?",
      options: ["src", "href", "alt", "title"],
      answer: 0,
      explanation: "The src attribute specifies the URL of the image to display.",
    },
    {
      question: "What does the <br> tag do?",
      options: ["Creates a line break", "Makes text bold", "Creates a hyperlink", "Defines a button"],
      answer: 0,
      explanation: "The <br> tag creates a line break in text content.",
    },
  ],

  css: [
    {
      question: "Which layout system is best for one-dimensional rows or columns?",
      options: ["Flexbox", "CSS Grid", "Float", "Position"],
      answer: 0,
      explanation: "Flexbox excels at laying out items along a single axis (row or column).",
    },
    {
      question: "Which property changes text color?",
      options: ["color", "font-style", "background-color", "opacity"],
      answer: 0,
      explanation: "The color property sets the foreground (text) color; background-color sets the background.",
    },
    {
      question: "Which unit is relative to the root font size?",
      options: ["rem", "em", "px", "vh"],
      answer: 0,
      explanation: "rem (root em) is always relative to the <html> element's font size, making it predictable.",
    },
    {
      question: "Which property controls spacing inside an element's border?",
      options: ["padding", "margin", "gap", "border-spacing"],
      answer: 0,
      explanation: "Padding is the space between content and the border; margin is outside the border.",
    },
    {
      question: "Which CSS property makes an element invisible but still takes up space?",
      options: ["visibility: hidden", "display: none", "opacity: 0", "z-index: -1"],
      answer: 0,
      explanation: "visibility:hidden hides the element but keeps its space; display:none removes it from layout.",
    },
    {
      question: "What is the default position value for HTML elements?",
      options: ["static", "relative", "absolute", "fixed"],
      answer: 0,
      explanation: "static is the default position value; elements follow the normal document flow.",
    },
    {
      question: "Which property controls the space between lines of text?",
      options: ["line-height", "letter-spacing", "word-spacing", "font-size"],
      answer: 0,
      explanation: "line-height controls the vertical spacing between lines of text.",
    },
    {
      question: "What does the CSS property 'float' do?",
      options: ["Places an element to the left or right of its container", "Makes an element float above others", "Changes the element's color", "Makes the element invisible"],
      answer: 0,
      explanation: "The float property places an element on the left or right side of its container, allowing text and inline elements to wrap around it.",
    },
  ],

  /* ── JAVASCRIPT ─────────────────────────────────────────── */
  javascript: [
    {
      question: "Which keyword declares a block-scoped variable?",
      options: ["let", "var", "function", "return"],
      answer: 0,
      explanation: "let and const are block-scoped; var is function-scoped and hoisted.",
    },
    {
      question: "What does async/await help manage?",
      options: ["Asynchronous code", "CSS animations", "HTML headings", "Database indexes"],
      answer: 0,
      explanation: "async/await is syntactic sugar over Promises for cleaner asynchronous code.",
    },
    {
      question: "Which method converts JSON text to a JavaScript object?",
      options: ["JSON.parse()", "JSON.stringify()", "Array.from()", "Object.assign()"],
      answer: 0,
      explanation: "JSON.parse() deserializes a JSON string; JSON.stringify() does the reverse.",
    },
    {
      question: "Which array method returns a new array with each element transformed?",
      options: [".map()", ".filter()", ".reduce()", ".find()"],
      answer: 0,
      explanation: ".map() creates a new array by applying a callback to every element.",
    },
    {
      question: "What is a closure in JavaScript?",
      options: [
        "A function that remembers its outer scope",
        "A CSS class name",
        "An HTML attribute",
        "A type of loop",
      ],
      answer: 0,
      explanation: "Closures allow inner functions to access variables from their containing (outer) scope even after it has returned.",
    },
    {
      question: "Which event occurs when a user clicks an HTML element?",
      options: ["onclick", "onmouseover", "onkeydown", "onload"],
      answer: 0,
      explanation: "The onclick event triggers when the user clicks on an HTML element.",
    },
    {
      question: "What is the correct way to write a comment in JavaScript?",
      options: ["// comment", "/* comment */", "<!-- comment -->", "# comment"],
      answer: 0,
      explanation: "JavaScript supports // for single-line and /* */ for multi-line comments.",
    },
    {
      question: "Which keyword is used to exit a function and return a value?",
      options: ["return", "break", "continue", "exit"],
      answer: 0,
      explanation: "The return statement exits a function and optionally returns a value to the caller.",
    },
  ],

  /* ── REACT ──────────────────────────────────────────────── */
  react: [
    {
      question: "What is a React component?",
      options: ["Reusable UI piece", "Database table", "CSS compiler", "HTTP method"],
      answer: 0,
      explanation: "Components are independent, reusable pieces of UI that can accept props and manage state.",
    },
    {
      question: "Which hook stores component state?",
      options: ["useState", "useEffect", "useRef", "useMemo"],
      answer: 0,
      explanation: "useState returns a state variable and a setter; updating the setter triggers a re-render.",
    },
    {
      question: "What is JSX used for?",
      options: [
        "Writing UI markup in JavaScript",
        "Encrypting passwords",
        "Querying databases",
        "Styling images only",
      ],
      answer: 0,
      explanation: "JSX is a syntax extension that lets you write HTML-like markup inside JavaScript files.",
    },
    {
      question: "Which hook runs a side effect after render?",
      options: ["useEffect", "useState", "useCallback", "useContext"],
      answer: 0,
      explanation: "useEffect runs after the DOM is painted; you control when it re-runs via the dependency array.",
    },
    {
      question: "What is the purpose of the React key prop?",
      options: [
        "Helps React identify which list items changed",
        "Sets an element's CSS class",
        "Stores authentication tokens",
        "Defines routing paths",
      ],
      answer: 0,
      explanation: "Keys help React's reconciler efficiently update, add, or remove items in a list.",
    },
    {
      question: "Which hook is used to optimize expensive calculations?",
      options: ["useMemo", "useState", "useEffect", "useRef"],
      answer: 0,
      explanation: "useMemo memoizes the result of a function, preventing expensive recalculations on every render.",
    },
    {
      question: "What does the useContext hook do?",
      options: ["Access React context", "Manage state", "Handle side effects", "Reference DOM elements"],
      answer: 0,
      explanation: "useContext allows you to subscribe to React context and access its value.",
    },
    {
      question: "Which method is used to update state in a class component?",
      options: ["this.setState()", "this.updateState()", "this.setStateValue()", "this.changeState()"],
      answer: 0,
      explanation: "In class components, setState() is used to update the component's state.",
    },
  ],

  /* ── PYTHON ─────────────────────────────────────────────── */
  python: [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["def", "func", "function", "lambda"],
      answer: 0,
      explanation: "def starts a function definition; lambda is used for short anonymous functions.",
    },
    {
      question: "How do you start a comment in Python?",
      options: ["#", "//", "/*", "--"],
      answer: 0,
      explanation: "Python uses # for single-line comments and triple quotes for docstrings.",
    },
    {
      question: "Which data structure stores key-value pairs in Python?",
      options: ["dict", "list", "tuple", "set"],
      answer: 0,
      explanation: "Dictionaries (dict) map unique keys to values and are O(1) on average for lookups.",
    },
    {
      question: "What does list comprehension do?",
      options: [
        "Creates a list from an expression",
        "Imports a module",
        "Declares a class",
        "Handles exceptions",
      ],
      answer: 0,
      explanation: "[x*2 for x in range(5)] is more Pythonic than building a list with a for-loop and .append().",
    },
    {
      question: "Which built-in function returns the length of a list?",
      options: ["len()", "size()", "count()", "length()"],
      answer: 0,
      explanation: "len() works on strings, lists, tuples, dicts, and any object that implements __len__.",
    },
    {
      question: "Which keyword is used to import a module in Python?",
      options: ["import", "include", "require", "use"],
      answer: 0,
      explanation: "The import statement is used to import modules in Python.",
    },
    {
      question: "What is the correct way to create a list in Python?",
      options: ["[]", "list()", "{}", "()"],
      answer: 0,
      explanation: "Both [] and list() create empty lists in Python.",
    },
    {
      question: "Which loop is used to iterate over a list in Python?",
      options: ["for", "while", "do-while", "foreach"],
      answer: 0,
      explanation: "The for loop is used to iterate over sequences like lists, tuples, and strings in Python.",
    },
  ],

  /* ── NODE.JS ─────────────────────────────────────────────── */
  node: [
    {
      question: "Which module in Node.js is used to create an HTTP server?",
      options: ["http", "net", "fs", "os"],
      answer: 0,
      explanation: "The built-in http module lets you create servers; https adds TLS support.",
    },
    {
      question: "What does npm stand for?",
      options: ["Node Package Manager", "New Project Module", "Node Process Manager", "None of these"],
      answer: 0,
      explanation: "npm is the default package manager for Node.js and hosts millions of open-source packages.",
    },
    {
      question: "Which file holds a Node.js project's dependencies?",
      options: ["package.json", "node_modules/", "index.js", "server.js"],
      answer: 0,
      explanation: "package.json lists dependencies, scripts, version, and metadata for the project.",
    },
    {
      question: "What is the event loop in Node.js responsible for?",
      options: [
        "Handling asynchronous callbacks",
        "Storing files on disk",
        "Compiling TypeScript",
        "Managing CSS styles",
      ],
      answer: 0,
      explanation: "Node.js is single-threaded; the event loop offloads I/O and dispatches callbacks when done.",
    },
    {
      question: "Which keyword imports a module in CommonJS?",
      options: ["require()", "import", "include()", "use()"],
      answer: 0,
      explanation: "require() is the CommonJS way; ES Modules use import/export syntax.",
    },
    {
      question: "Which method is used to read a file in Node.js?",
      options: ["fs.readFile()", "fs.readfile()", "file.read()", "readfile()"],
      answer: 0,
      explanation: "The fs module's readFile() method is used to read files asynchronously in Node.js.",
    },
    {
      question: "What is the purpose of middleware in Express.js?",
      options: ["Execute code during request/response cycle", "Style HTML elements", "Manage database connections", "Compile TypeScript"],
      answer: 0,
      explanation: "Middleware functions have access to the request and response objects and can execute code during the request-response cycle.",
    },
    {
      question: "Which method is used to send a response in Express.js?",
      options: ["res.send()", "response.send()", "reply.send()", "answer.send()"],
      answer: 0,
      explanation: "In Express.js, res.send() is used to send a response back to the client.",
    },
    {
      question: "What does the --save flag do when installing npm packages?",
      options: ["Saves package to dependencies", "Installs globally", "Shows installation progress", "Removes the package"],
      answer: 0,
      explanation: "The --save flag adds the package to your project's dependencies in package.json.",
    },
  ],

  /* ── AI / MACHINE LEARNING ──────────────────────────────── */
  "artificial intelligence": [
    {
      question: "What is supervised learning?",
      options: [
        "Training on labelled data",
        "Training without any data",
        "Training using rewards",
        "Clustering similar items",
      ],
      answer: 0,
      explanation: "Supervised learning maps inputs to known outputs; the model learns from labelled examples.",
    },
    {
      question: "Which algorithm is the foundation of many neural networks?",
      options: ["Gradient descent", "Binary search", "Merge sort", "Dijkstra's algorithm"],
      answer: 0,
      explanation: "Gradient descent minimises the loss function by iteratively adjusting weights.",
    },
    {
      question: "What is overfitting?",
      options: [
        "Model memorises training data, fails on new data",
        "Model is too simple",
        "Model trains too slowly",
        "Model uses too little memory",
      ],
      answer: 0,
      explanation: "Overfitting happens when a model fits noise in training data rather than general patterns.",
    },
    {
      question: "Which technique prevents overfitting by randomly dropping neurons?",
      options: ["Dropout", "Batch normalisation", "Pooling", "Embedding"],
      answer: 0,
      explanation: "Dropout randomly sets a fraction of activations to zero during training, acting as regularisation.",
    },
    {
      question: "What does NLP stand for?",
      options: [
        "Natural Language Processing",
        "Neural Layer Propagation",
        "Node Loop Protocol",
        "Numeric Learning Pipeline",
      ],
      answer: 0,
      explanation: "NLP enables computers to understand, interpret, and generate human language.",
    },
    {
      question: "Which type of machine learning uses rewards to train models?",
      options: ["Supervised learning", "Unsupervised learning", "Reinforcement learning", "Semi-supervised learning"],
      answer: 2,
      explanation: "Reinforcement learning uses rewards and penalties to train agents to make decisions.",
    },
    {
      question: "What is the purpose of activation functions in neural networks?",
      options: ["Introduce non-linearity", "Reduce overfitting", "Increase training speed", "Decrease model size"],
      answer: 0,
      explanation: "Activation functions introduce non-linearity, allowing neural networks to learn complex patterns.",
    },
    {
      question: "Which metric is commonly used to evaluate classification models?",
      options: ["Accuracy", "Mean Squared Error", "R-squared", "Mean Absolute Error"],
      answer: 0,
      explanation: "Accuracy measures the percentage of correct predictions made by a classification model.",
    },
    {
      question: "What is the difference between AI and ML?",
      options: [
        "AI is the broader concept; ML is a subset of AI",
        "ML is the broader concept; AI is a subset of ML",
        "They are the same thing",
        "AI is only for robots; ML is only for computers",
      ],
      answer: 0,
      explanation: "Artificial Intelligence is the broader concept of machines performing smart tasks; Machine Learning is a subset of AI focused on learning from data.",
    },
  ],

  /* ── CLOUD COMPUTING ────────────────────────────────────── */
  cloud: [
    {
      question: "What does IaaS stand for?",
      options: [
        "Infrastructure as a Service",
        "Interface as a Service",
        "Integration and Software",
        "Index as a System",
      ],
      answer: 0,
      explanation: "IaaS provides virtualized computing resources (VMs, storage, networks) over the internet.",
    },
    {
      question: "Which cloud model is shared between public and private?",
      options: ["Hybrid cloud", "Multi cloud", "Community cloud", "Serverless"],
      answer: 0,
      explanation: "Hybrid cloud combines on-premises infrastructure with public cloud services.",
    },
    {
      question: "What is auto-scaling?",
      options: [
        "Automatically adjusting resources based on load",
        "Deleting old servers",
        "Backing up databases",
        "Encrypting network traffic",
      ],
      answer: 0,
      explanation: "Auto-scaling adds or removes compute capacity automatically to meet demand.",
    },
    {
      question: "Which AWS service provides object storage?",
      options: ["S3", "EC2", "Lambda", "RDS"],
      answer: 0,
      explanation: "Amazon S3 (Simple Storage Service) is used for storing and retrieving any amount of data.",
    },
    {
      question: "What is a CDN used for?",
      options: [
        "Delivering content from servers closer to users",
        "Storing SQL tables",
        "Running machine learning models",
        "Writing serverless functions",
      ],
      answer: 0,
      explanation: "A Content Delivery Network caches content at edge locations worldwide to reduce latency.",
    },
    {
      question: "Which cloud provider offers Azure services?",
      options: ["Microsoft", "Amazon", "Google", "IBM"],
      answer: 0,
      explanation: "Microsoft Azure is Microsoft's cloud computing platform and infrastructure.",
    },
    {
      question: "What does SaaS stand for?",
      options: ["Software as a Service", "Storage as a Service", "Security as a Service", "Server as a Service"],
      answer: 0,
      explanation: "SaaS delivers software applications over the internet on a subscription basis.",
    },
    {
      question: "Which cloud deployment model is owned by a single organization?",
      options: ["Private cloud", "Public cloud", "Hybrid cloud", "Community cloud"],
      answer: 0,
      explanation: "A private cloud is dedicated to a single organization and not shared with others.",
    },
    {
      question: "What is the main advantage of cloud computing?",
      options: ["Scalability and flexibility", "Lower security", "Limited accessibility", "Higher costs"],
      answer: 0,
      explanation: "Cloud computing provides on-demand scalability and flexibility in resource allocation.",
    },
  ],

  /* ── CYBER SECURITY ─────────────────────────────────────── */
  "cyber security": [
    {
      question: "What is a SQL injection attack?",
      options: [
        "Inserting malicious SQL via user input",
        "Flooding a server with traffic",
        "Intercepting HTTPS traffic",
        "Stealing cookies via JavaScript",
      ],
      answer: 0,
      explanation: "SQL injection exploits unsanitised inputs to run arbitrary database commands.",
    },
    {
      question: "What does HTTPS add over HTTP?",
      options: ["TLS encryption", "Faster load times", "HTML compression", "Database support"],
      answer: 0,
      explanation: "HTTPS uses TLS to encrypt data in transit, preventing eavesdropping and tampering.",
    },
    {
      question: "Which attack type overwhelms a server with traffic?",
      options: ["DDoS", "Phishing", "SQL Injection", "Man-in-the-middle"],
      answer: 0,
      explanation: "A Distributed Denial of Service (DDoS) attack uses many sources to exhaust server resources.",
    },
    {
      question: "What is multi-factor authentication (MFA)?",
      options: [
        "Requiring two or more proofs of identity",
        "Hashing passwords twice",
        "Using a long password",
        "Encrypting the database",
      ],
      answer: 0,
      explanation: "MFA combines something you know (password), have (phone), or are (biometric) to reduce risk.",
    },
    {
      question: "Which hashing algorithm is considered cryptographically broken?",
      options: ["MD5", "SHA-256", "bcrypt", "Argon2"],
      answer: 0,
      explanation: "MD5 is fast but vulnerable to collision attacks; use bcrypt/Argon2 for passwords.",
    },
    {
      question: "What is the main purpose of a firewall?",
      options: ["Monitor and control network traffic", "Store data", "Increase internet speed", "Display graphics"],
      answer: 0,
      explanation: "A firewall monitors and controls incoming and outgoing network traffic based on security rules.",
    },
    {
      question: "What does VPN stand for?",
      options: ["Virtual Private Network", "Virtual Public Network", "Virtual Processing Network", "Virtual Private Node"],
      answer: 0,
      explanation: "A VPN creates a secure, encrypted connection over a less secure network, such as the internet.",
    },
    {
      question: "Which principle states that users should only have the access they need?",
      options: ["Principle of Least Privilege", "Defense in Depth", "Fail Safe", "Complete Mediation"],
      answer: 0,
      explanation: "The Principle of Least Privilege states that users should only have the minimum levels of access needed to perform their job functions.",
    },
    {
      question: "What is the main goal of cryptography?",
      options: ["Ensure confidentiality, integrity, and authenticity", "Increase processing speed", "Reduce storage space", "Improve user interface"],
      answer: 0,
      explanation: "Cryptography aims to ensure confidentiality (secrecy), integrity (accuracy), and authenticity (genuineness) of data.",
    },
  ],

  /* ── DATA SCIENCE ───────────────────────────────────────── */
  "data science": [
    {
      question: "What is the purpose of exploratory data analysis (EDA)?",
      options: [
        "Understand patterns and anomalies in data",
        "Train neural networks",
        "Deploy APIs",
        "Design databases",
      ],
      answer: 0,
      explanation: "EDA uses statistics and visualisations to summarise datasets before formal modelling.",
    },
    {
      question: "Which library is commonly used for data manipulation in Python?",
      options: ["pandas", "NumPy", "Matplotlib", "scikit-learn"],
      answer: 0,
      explanation: "pandas provides DataFrame structures for loading, cleaning, and transforming tabular data.",
    },
    {
      question: "What does a correlation coefficient of 1 mean?",
      options: [
        "Perfect positive linear relationship",
        "No relationship",
        "Perfect negative relationship",
        "Random noise",
      ],
      answer: 0,
      explanation: "A correlation of +1 means as one variable increases, the other increases proportionally.",
    },
    {
      question: "Which chart is best for showing data distribution?",
      options: ["Histogram", "Pie chart", "Line chart", "Scatter plot"],
      answer: 0,
      explanation: "Histograms display frequency distributions by grouping data into bins.",
    },
    {
      question: "What is feature engineering?",
      options: [
        "Creating or transforming input variables to improve models",
        "Writing database queries",
        "Designing API endpoints",
        "Compressing image files",
      ],
      answer: 0,
      explanation: "Good features capture the signal that matters; poor features add noise that hurts model performance.",
    },
    {
      question: "Which technique is used to prevent overfitting in machine learning models?",
      options: ["Regularization", "Overfitting", "Underfitting", "Overconfidence"],
      answer: 0,
      explanation: "Regularization techniques like L1 and L2 help prevent overfitting by penalizing complex models.",
    },
    {
      question: "What is the difference between supervised and unsupervised learning?",
      options: [
        "Supervised uses labeled data; unsupervised finds patterns in unlabeled data",
        "Supervised is faster; unsupervised is slower",
        "Supervised uses neural networks; unsupervised uses decision trees",
        "They are the same thing",
      ],
      answer: 0,
      explanation: "Supervised learning uses labeled data to learn a mapping function; unsupervised learning finds hidden patterns in unlabeled data.",
    },
    {
      question: "Which statistical measure shows the middle value of a dataset?",
      options: ["Median", "Mean", "Mode", "Range"],
      answer: 0,
      explanation: "The median is the middle value when data is ordered from least to greatest.",
    },
    {
      question: "What is the purpose of data visualization?",
      options: ["Communicate insights from data", "Store data securely", "Increase data size", "Make data less readable"],
      answer: 0,
      explanation: "Data visualization helps communicate insights from data through graphical representation.",
    },
  ],

  /* ── SQL ────────────────────────────────────────────────── */
  sql: [
    {
      question: "Which SQL clause filters rows after grouping?",
      options: ["HAVING", "WHERE", "ORDER BY", "LIMIT"],
      answer: 0,
      explanation: "WHERE filters before grouping; HAVING filters after GROUP BY.",
    },
    {
      question: "Which JOIN returns all rows from both tables?",
      options: ["FULL OUTER JOIN", "INNER JOIN", "LEFT JOIN", "CROSS JOIN"],
      answer: 0,
      explanation: "FULL OUTER JOIN includes all rows from both sides, filling NULLs where there is no match.",
    },
    {
      question: "What does the PRIMARY KEY constraint enforce?",
      options: [
        "Uniqueness and non-null values for a column",
        "Default values",
        "Foreign key relationships",
        "Index on text columns",
      ],
      answer: 0,
      explanation: "A primary key uniquely identifies each row and cannot be NULL.",
    },
    {
      question: "Which SQL keyword removes duplicate rows from a result?",
      options: ["DISTINCT", "UNIQUE", "GROUP BY", "ORDER BY"],
      answer: 0,
      explanation: "SELECT DISTINCT eliminates duplicate rows in the output.",
    },
    {
      question: "Which aggregate function returns the total number of rows?",
      options: ["COUNT()", "SUM()", "AVG()", "MAX()"],
      answer: 0,
      explanation: "COUNT(*) counts all rows; COUNT(column) counts non-null values in that column.",
    },
    {
      question: "Which SQL clause is used to sort the result set?",
      options: ["ORDER BY", "WHERE", "GROUP BY", "HAVING"],
      answer: 0,
      explanation: "ORDER BY sorts the result set in ascending or descending order.",
    },
    {
      question: "What is the purpose of the GROUP BY clause in SQL?",
      options: ["Group rows that have the same values", "Filter rows", "Sort rows", "Limit rows"],
      answer: 0,
      explanation: "GROUP BY groups rows that have the same values in specified columns into summary rows.",
    },
    {
      question: "Which JOIN returns only matching rows from both tables?",
      options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
      answer: 0,
      explanation: "INNER JOIN returns only the rows that have matching values in both tables.",
    },
    {
      question: "What does the WHERE clause do in SQL?",
      options: ["Filters rows", "Sorts rows", "Groups rows", "Joins tables"],
      answer: 0,
      explanation: "The WHERE clause filters rows based on specified conditions.",
    },
  ],

  /* ── MONGODB ────────────────────────────────────────────── */
  mongodb: [
    {
      question: "What is the basic unit of storage in MongoDB?",
      options: ["Document", "Row", "Table", "Tuple"],
      answer: 0,
      explanation: "MongoDB stores data as BSON documents (like JSON objects) inside collections.",
    },
    {
      question: "Which method inserts a single document?",
      options: ["insertOne()", "save()", "push()", "create()"],
      answer: 0,
      explanation: "insertOne() inserts a single document; insertMany() inserts an array.",
    },
    {
      question: "Which operator matches documents where a field exists?",
      options: ["$exists", "$in", "$gt", "$set"],
      answer: 0,
      explanation: "{ field: { $exists: true } } matches documents that have the specified field.",
    },
    {
      question: "What is an index used for in MongoDB?",
      options: [
        "Speeding up queries",
        "Encrypting data",
        "Backing up collections",
        "Creating relationships",
      ],
      answer: 0,
      explanation: "Indexes allow MongoDB to locate documents quickly without scanning every document.",
    },
    {
      question: "Which aggregation stage limits the number of output documents?",
      options: ["$limit", "$match", "$project", "$group"],
      answer: 0,
      explanation: "$limit restricts the number of documents passed to the next stage in the pipeline.",
    },
    {
      question: "Which method is used to update a single document in MongoDB?",
      options: ["updateOne()", "updateMany()", "replaceOne()", "findAndModify()"],
      answer: 0,
      explanation: "updateOne() updates a single document that matches the filter.",
    },
    {
      question: "What does the $gte operator do in MongoDB?",
      options: ["Greater than or equal", "Greater than", "Less than or equal", "Less than"],
      answer: 0,
      explanation: "The $gte operator matches values that are greater than or equal to a specified value.",
    },
    {
      question: "Which database command shows all databases?",
      options: ["show dbs", "show databases", "list databases", "db.list()"],
      answer: 0,
      explanation: "The 'show dbs' command displays all databases in the MongoDB server.",
    },
    {
      question: "What is the purpose of MongoDB's aggregation framework?",
      options: ["Process data records and return computed results", "Store data", "Create indexes", "Backup data"],
      answer: 0,
      explanation: "The aggregation framework processes data records and returns computed results.",
    },
  ],

  /* ── DOCKER ─────────────────────────────────────────────── */
  docker: [
    {
      question: "What is a Docker image?",
      options: [
        "A read-only template used to create containers",
        "A running process",
        "A cloud server",
        "A virtual machine",
      ],
      answer: 0,
      explanation: "Images are immutable snapshots; running an image creates a container.",
    },
    {
      question: "Which command builds a Docker image from a Dockerfile?",
      options: ["docker build", "docker run", "docker pull", "docker push"],
      answer: 0,
      explanation: "docker build reads the Dockerfile in the current directory and produces an image.",
    },
    {
      question: "What is the purpose of docker-compose?",
      options: [
        "Define and run multi-container applications",
        "Push images to Docker Hub",
        "Monitor container health",
        "Create Docker volumes",
      ],
      answer: 0,
      explanation: "docker-compose lets you define services, networks, and volumes in a single YAML file.",
    },
    {
      question: "Which Dockerfile instruction sets the working directory?",
      options: ["WORKDIR", "RUN", "ENV", "COPY"],
      answer: 0,
      explanation: "WORKDIR sets the directory for subsequent RUN, CMD, ENTRYPOINT, COPY, and ADD instructions.",
    },
    {
      question: "What does the -p flag do in docker run?",
      options: [
        "Maps a container port to a host port",
        "Pulls the latest image",
        "Runs in privileged mode",
        "Prints container logs",
      ],
      answer: 0,
      explanation: "-p 8080:80 maps host port 8080 to container port 80.",
    },
    {
      question: "What is the purpose of a Docker volume?",
      options: ["Persist data generated by containers", "Increase container speed", "Decrease isolation", "Share host memory"],
      answer: 0,
      explanation: "Docker volumes are used to persist data generated by and used by Docker containers.",
    },
    {
      question: "Which command stops a running Docker container?",
      options: ["docker stop", "docker kill", "docker pause", "docker wait"],
      answer: 0,
      explanation: "docker stop stops a running container by sending SIGTERM and then SIGKILL after a grace period.",
    },
    {
      question: "What does the docker images command do?",
      options: ["Lists Docker images", "Shows running containers", "Builds an image", "Removes images"],
      answer: 0,
      explanation: "The docker images command lists all Docker images on the system.",
    },
    {
      question: "What is the difference between a Docker image and a container?",
      options: [
        "Image is read-only template; container is running instance",
        "Image is for storage; container is for networking",
        "They are the same thing",
        "Image is for Windows; container is for Linux",
      ],
      answer: 0,
      explanation: "A Docker image is a read-only template; a container is a runnable instance of an image.",
    },
  ],

  /* ── KUBERNETES ─────────────────────────────────────────── */
  kubernetes: [
    {
      question: "What is the smallest deployable unit in Kubernetes?",
      options: ["Pod", "Node", "Service", "Deployment"],
      answer: 0,
      explanation: "A Pod wraps one or more containers that share network and storage.",
    },
    {
      question: "Which resource ensures a specified number of Pod replicas always run?",
      options: ["ReplicaSet", "Service", "ConfigMap", "Ingress"],
      answer: 0,
      explanation: "A ReplicaSet (and Deployment, which manages it) maintains the desired replica count.",
    },
    {
      question: "What does a Kubernetes Service do?",
      options: [
        "Exposes Pods with a stable IP/DNS",
        "Stores configuration data",
        "Schedules workloads on nodes",
        "Manages container images",
      ],
      answer: 0,
      explanation: "Services provide stable endpoints so other parts of the system can reach Pods even as they restart.",
    },
    {
      question: "Which Kubernetes object stores non-secret configuration?",
      options: ["ConfigMap", "Secret", "PersistentVolume", "Ingress"],
      answer: 0,
      explanation: "ConfigMaps store key-value configuration; Secrets store sensitive data (base64-encoded).",
    },
    {
      question: "What is kubectl?",
      options: [
        "The CLI tool for interacting with Kubernetes clusters",
        "A container runtime",
        "A service mesh",
        "A cloud provider CLI",
      ],
      answer: 0,
      explanation: "kubectl communicates with the Kubernetes API server to manage cluster resources.",
    },
    {
      question: "Which type of service exposes an application externally using a cloud provider's load balancer?",
      options: ["LoadBalancer", "NodePort", "ClusterIP", "ExternalName"],
      answer: 0,
      explanation: "LoadBalancer services expose applications externally using a cloud provider's load balancer.",
    },
    {
      question: "What is the purpose of a Kubernetes namespace?",
      options: ["Divide cluster resources between users", "Increase container size", "Decrease security", "Store images"],
      answer: 0,
      explanation: "Namespaces provide a scope for names and a way to divide cluster resources between users.",
    },
    {
      question: "Which Kubernetes controller manages replica sets and provides declarative updates?",
      options: ["Deployment", "StatefulSet", "DaemonSet", "Job"],
      answer: 0,
      explanation: "A Deployment provides declarative updates for Pods and ReplicaSets.",
    },
    {
      question: "What is the purpose of a pod's container port?",
      options: ["Expose the container's network service", "Store data", "Increase CPU usage", "Decrease memory usage"],
      answer: 0,
      explanation: "The container port exposes the container's network service to make it accessible.",
    },
    {
      question: "How does Kubernetes achieve high availability?",
      options: ["By distributing workloads across multiple nodes", "By using a single powerful node", "By decreasing redundancy", "By using a single point of failure"],
      answer: 0,
      explanation: "Kubernetes achieves high availability by distributing workloads across multiple nodes in a cluster.",
    },
  ],

  /* ── UI/UX DESIGN ───────────────────────────────────────── */
  "ui ux": [
    {
      question: "What is the purpose of wireframing?",
      options: [
        "Sketch layout and structure before visual design",
        "Write backend code",
        "Set up CI/CD pipelines",
        "Perform load testing",
      ],
      answer: 0,
      explanation: "Wireframes are low-fidelity blueprints that focus on layout and information hierarchy.",
    },
    {
      question: "Which design principle ensures important elements stand out?",
      options: ["Visual hierarchy", "Accessibility", "Consistency", "Affordance"],
      answer: 0,
      explanation: "Visual hierarchy guides users' eyes by varying size, colour, and spacing to signal importance.",
    },
    {
      question: "What does accessibility (a11y) mean in design?",
      options: [
        "Designing for all users, including those with disabilities",
        "Making animations faster",
        "Reducing file sizes",
        "Using dark mode",
      ],
      answer: 0,
      explanation: "Accessible design ensures products are usable by people with visual, motor, or cognitive differences.",
    },
    {
      question: "Which colour contrast ratio is WCAG AA minimum for normal text?",
      options: ["4.5:1", "3:1", "7:1", "2:1"],
      answer: 0,
      explanation: "WCAG 2.1 Level AA requires at least 4.5:1 contrast for normal text and 3:1 for large text.",
    },
    {
      question: "What is a user persona?",
      options: [
        "A fictional user profile representing a target audience segment",
        "A CSS animation",
        "A database schema",
        "A type of API request",
      ],
      answer: 0,
      explanation: "Personas summarise goals, frustrations, and behaviour patterns to keep design user-centred.",
    },
    {
      question: "Which principle states that design should be consistent across similar elements?",
      options: ["Consistency", "Contrast", "Alignment", "Proximity"],
      answer: 0,
      explanation: "Consistency in design means that similar elements should have similar appearance and behavior.",
    },
    {
      question: "What is the purpose of usability testing?",
      options: ["Evaluate how easy a design is to use", "Make designs more complex", "Increase development time", "Decrease user satisfaction"],
      answer: 0,
      explanation: "Usability testing evaluates how easy a design is to use by testing it with real users.",
    },
    {
      question: "Which color is typically used for warnings in UI design?",
      options: ["Red", "Green", "Blue", "Yellow"],
      answer: 0,
      explanation: "Red is commonly used for warnings, errors, and important notifications in UI design.",
    },
    {
      question: "What does responsive web design do?",
      options: ["Adapts layout to different screen sizes", "Makes websites slower", "Increases server load", "Requires separate mobile site"],
      answer: 0,
      explanation: "Responsive web design ensures that web pages render well on a variety of devices and window sizes.",
    },
  ],

  /* ── WEB DEVELOPMENT (generic) ──────────────────────────── */
  "web development": [
    {
      question: "Which protocol does the browser use to fetch web pages?",
      options: ["HTTP/HTTPS", "FTP", "SMTP", "WebSocket"],
      answer: 0,
      explanation: "HTTP(S) is the request/response protocol that powers the World Wide Web.",
    },
    {
      question: "What is a REST API?",
      options: [
        "An API using HTTP methods to interact with resources",
        "A type of database",
        "A CSS framework",
        "A JavaScript runtime",
      ],
      answer: 0,
      explanation: "REST uses standard HTTP verbs (GET, POST, PUT, DELETE) and stateless communication.",
    },
    {
      question: "What does CORS stand for?",
      options: [
        "Cross-Origin Resource Sharing",
        "Client Object Routing System",
        "Compressed Output Response Service",
        "Centralised Origin Request Standard",
      ],
      answer: 0,
      explanation: "CORS is a browser security mechanism that controls which origins can make cross-domain requests.",
    },
    {
      question: "What is the purpose of a cookie?",
      options: [
        "Store small pieces of data on the client",
        "Compile JavaScript",
        "Manage server memory",
        "Minify CSS files",
      ],
      answer: 0,
      explanation: "Cookies are sent with every HTTP request to the origin, commonly used for sessions and preferences.",
    },
    {
      question: "Which tool bundles JavaScript modules for the browser?",
      options: ["Vite / Webpack", "Node.js", "Express", "ESLint"],
      answer: 0,
      explanation: "Bundlers like Vite and Webpack combine many JS/CSS files into optimised bundles for production.",
    },
    {
      question: "Which HTTP method is used to retrieve data from a server?",
      options: ["GET", "POST", "PUT", "DELETE"],
      answer: 0,
      explanation: "The GET method requests data from a specified resource.",
    },
    {
      question: "What does HTML stand for?",
      options: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Markup Language"],
      answer: 0,
      explanation: "HTML is the standard markup language for creating web pages and web applications.",
    },
    {
      question: "Which CSS property is used to change the background color of an element?",
      options: ["background-color", "color", "font-size", "margin"],
      answer: 0,
      explanation: "The background-color property sets the background color of an element.",
    },
    {
      question: "What is the purpose of a meta tag in HTML?",
      options: ["Provide metadata about the HTML document", "Create hyperlinks", "Define JavaScript functions", "Style HTML elements"],
      answer: 0,
      explanation: "Meta tags provide metadata about the HTML document, such as character set, viewport, and description.",
    },
  ],

  /* ── DEFAULT (fallback) ─────────────────────────────────── */
  default: [
    {
      question: "What is the best first step when learning a new topic?",
      options: ["Understand fundamentals", "Jump to advanced tools", "Avoid practice", "Memorise names only"],
      answer: 0,
      explanation: "Building a strong foundation prevents confusion when concepts become more complex.",
    },
    {
      question: "What technique best helps you retain a concept?",
      options: ["Building small examples", "Only watching videos", "Never reviewing", "Ignoring mistakes"],
      answer: 0,
      explanation: "Active recall through practice is far more effective than passive re-reading or watching.",
    },
    {
      question: "What should you do after studying theory?",
      options: ["Apply it in a project", "Stop learning immediately", "Delete your notes", "Avoid feedback"],
      answer: 0,
      explanation: "Project-based learning cements knowledge and reveals gaps that theory alone doesn't expose.",
    },
    {
      question: "Which study method is most effective for long-term retention?",
      options: ["Spaced repetition", "Cramming", "Reading once", "Highlighting only"],
      answer: 0,
      explanation: "Spaced repetition revisits material at increasing intervals, leveraging how memory consolidates.",
    },
    {
      question: "What should you do when you encounter a bug or error?",
      options: [
        "Read the error message carefully and debug step-by-step",
        "Restart the computer",
        "Delete all your code",
        "Switch to a different topic",
      ],
      answer: 0,
      explanation: "Methodical debugging — reading errors, adding logs, isolating the problem — is a core dev skill.",
    },
    {
      question: "Which principle states that you should write code for humans first?",
      options: ["Readability", "Performance", "Complexity", "Optimization"],
      answer: 0,
      explanation: "Writing readable code means future developers (including you) can understand and maintain it easily.",
    },
    {
      question: "What is the purpose of version control systems?",
      options: ["Track changes to code over time", "Increase code execution speed", "Decrease code readability", "Require manual backups"],
      answer: 0,
      explanation: "Version control systems track changes to files over time so you can recall specific versions later.",
    },
    {
      question: "Which principle states that early optimization is the root of all evil?",
      options: ["Premature optimization", "Premature generalization", "Premature abstraction", "Premature generalization"],
      answer: 0,
      explanation: "Premature optimization refers to optimizing code before it's necessary, often leading to complex, harder-to-maintain code.",
    },
    {
      question: "What is the purpose of documentation in software development?",
      options: ["Explain how to use and maintain the code", "Increase file size", "Make code harder to read", "Require additional compensation"],
      answer: 0,
      explanation: "Documentation explains how to use, operate, and maintain software systems.",
    },
  ],
};

/* ─── Fuzzy topic matching ─────────────────────────────────── */

/* Fisher-Yates shuffle */
const shuffleArray = (array) => {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const getQuizQuestions = (title) => {
  const topic = title.toLowerCase();
  // Try exact key contains first, then partial word match
  const key = Object.keys(questionBank).find((k) => topic.includes(k));
  const pool = questionBank[key ?? "default"];
  // Shuffle and pick 5
  const shuffledPool = [...pool].sort(() => Math.random() - 0.5).slice(0, 5);
  // For each question, shuffle options and compute new answer index
  return shuffledPool.map((q) => {
    const shuffledOptions = shuffleArray(q.options);
    const originalAnswerText = q.options[q.answer];
    const newAnswerIndex = shuffledOptions.indexOf(originalAnswerText);
    // Safety fallback (should not happen)
    const answerIndex = newAnswerIndex !== -1 ? newAnswerIndex : 0;
    return {
      ...q,
      options: shuffledOptions,
      answer: answerIndex,
    };
  });
};

/* ─── Grade helper ─────────────────────────────────────────── */
const getGrade = (score, total) => {
  const pct = score / total;
  if (pct === 1) return { label: "Perfect!", color: "text-amber-300", icon: "🏆" };
  if (pct >= 0.8) return { label: "Excellent!", color: "text-emerald-300", icon: "🎉" };
  if (pct >= 0.6) return { label: "Good job!", color: "text-indigo-300", icon: "👍" };
  if (pct >= 0.4) return { label: "Keep going!", color: "text-orange-300", icon: "💪" };
  return { label: "Keep practising!", color: "text-rose-300", icon: "📚" };
};

/* ══════════════════════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════════════════════ */
function QuizModal({ stepTitle, onClose, onComplete }) {
  const questions = useMemo(() => getQuizQuestions(stepTitle), [stepTitle]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [finished, setFinished] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]); // tracks answer selected for each question
  const [isReviewing, setIsReviewing] = useState(false); // tracks if user is reviewing the quiz

  // Interactive feedback state
  const [selected, setSelected] = useState(null); // index of chosen option
  const [revealed, setRevealed] = useState(false); // show correct/wrong colours
  const [animating, setAnimating] = useState(false); // fade-out between questions

  const current = questions[index];
  const earnedXp = score * 100;
  const grade = getGrade(score, questions.length);

  /* ── Advance to next question (after reveal delay) ─────── */
  const goNext = useCallback(
    (chosenIndex) => {
      setUserAnswers((prev) => [...prev, chosenIndex]);
      setAnimating(true);
      setTimeout(() => {
        setSelected(null);
        setRevealed(false);
        setAnimating(false);
        if (index === questions.length - 1) {
          setFinished(true);
        } else {
          setIndex((v) => v + 1);
          setTimeLeft(20);
        }
      }, 900);
    },
    [index, questions.length],
  );

  /* ── Handle answer selection ───────────────────────────── */
  const handleAnswer = (optionIndex) => {
    if (revealed) return; // prevent double-click
    const isCorrect = optionIndex === current.answer;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setSelected(optionIndex);
    setRevealed(true);
    // Auto-advance after 1.4 s
    setTimeout(() => goNext(optionIndex), 1400);
  };

  /* ── Timer countdown (pauses while revealed) ───────────── */
  useEffect(() => {
    if (finished || revealed) return undefined;

    const timer = window.setTimeout(() => {
      if (timeLeft <= 1) {
        // Time's up — reveal and move on without scoring
        setSelected(-1);
        setRevealed(true);
        setTimeout(() => goNext(-1), 1400);
        return;
      }
      setTimeLeft((v) => v - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [finished, goNext, revealed, timeLeft]);

  /* ── Option button style ───────────────────────────────── */
  const optionStyle = (i) => {
    const base =
      "relative w-full rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-300 ";
    if (!revealed) {
      return (
        base +
        "border-slate-700 bg-slate-900/70 hover:border-indigo-400 hover:bg-indigo-500/10 cursor-pointer"
      );
    }
    if (i === current.answer) {
      return base + "border-emerald-400 bg-emerald-400/20 text-emerald-200 cursor-default";
    }
    if (i === selected && i !== current.answer) {
      return base + "border-rose-400 bg-rose-400/20 text-rose-200 cursor-default";
    }
    return base + "border-slate-800 bg-slate-900/40 text-slate-500 cursor-default";
  };

  /* ── Timer bar colour ──────────────────────────────────── */
  const timerColor =
    timeLeft > 12 ? "bg-emerald-500" : timeLeft > 6 ? "bg-amber-400" : "bg-rose-500";

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/85 px-4 backdrop-blur-xl">
      <div
        className={`w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950 p-6 text-white shadow-[20px_20px_0_#312e81] transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}
      >
        {!finished ? (
          <>
            {/* ── Header ─────────────────────────────────────── */}
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">
                  Stage Quiz · {index + 1}/{questions.length}
                </p>
                <h2 className="mt-1 text-xl font-bold leading-tight">{stepTitle}</h2>
              </div>

              {/* Timer ring */}
              <div
                className={`flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-2xl border ${timeLeft <= 6
                    ? "border-rose-400/30 bg-rose-400/10"
                    : "border-amber-300/20 bg-amber-300/10"
                  }`}
              >
                <Timer size={16} className={timeLeft <= 6 ? "text-rose-300" : "text-amber-200"} />
                <span className="text-lg font-bold leading-none">{timeLeft}</span>
              </div>
            </div>

            {/* ── Timer bar ──────────────────────────────────── */}
            <div className="mb-1 h-1.5 rounded-full bg-slate-800">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${timerColor}`}
                style={{ width: `${(timeLeft / 20) * 100}%` }}
              />
            </div>

            {/* ── Progress bar ───────────────────────────────── */}
            <div className="mb-5 h-1.5 rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${((index + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* ── Question ───────────────────────────────────── */}
            <p className="mb-5 text-base font-semibold leading-snug">{current.question}</p>

            {/* ── Options ────────────────────────────────────── */}
            <div className="grid gap-2.5">
              {current.options.map((option, i) => (
                <button
                  key={option}
                  type="button"
                  disabled={revealed}
                  onClick={() => handleAnswer(i)}
                  className={optionStyle(i)}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-current text-xs font-bold opacity-60">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                    {revealed && i === current.answer && (
                      <CheckCircle2 className="ml-auto text-emerald-300" size={16} />
                    )}
                    {revealed && i === selected && i !== current.answer && (
                      <XCircle className="ml-auto text-rose-300" size={16} />
                    )}
                  </span>
                </button>
              ))}
            </div>

            {/* ── Explanation (shown after answering) ────────── */}
            <div
              className={`overflow-hidden transition-all duration-500 ${revealed ? "mt-4 max-h-24 opacity-100" : "max-h-0 opacity-0"
                }`}
            >
              <div className="flex items-start gap-2 rounded-xl border border-indigo-300/20 bg-indigo-400/10 px-4 py-3 text-sm text-indigo-100">
                <Lightbulb size={16} className="mt-0.5 flex-shrink-0 text-indigo-300" />
                <span>{current.explanation}</span>
              </div>
            </div>

            {/* ── Score chip ─────────────────────────────────── */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Score: {score}/{index + (revealed ? 1 : 0)}</span>
              <span className="flex items-center gap-1">
                <Zap size={12} className="text-amber-300" />
                {score * 100} XP so far
              </span>
            </div>
          </>
        ) : (
          /* ── Results screen with review option ──────────────── */
          <div className="py-2 text-center">
            <p className="text-5xl">{grade.icon}</p>
            <h2 className={`mt-3 text-3xl font-bold ${grade.color}`}>{grade.label}</h2>

            <div className="mt-4 flex items-center justify-center gap-2 text-slate-300">
              <Trophy size={18} className="text-amber-300" />
              <span className="text-lg font-semibold">
                {score} / {questions.length} correct
              </span>
            </div>

            <p className="mt-1 text-slate-400">
              You earned{" "}
              <span className="font-bold text-amber-300">{earnedXp} XP</span>
            </p>

            {/* Score breakdown */}
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/70">
              <div className="grid grid-cols-3 divide-x divide-slate-800">
                <div className="p-4">
                  <p className="text-2xl font-bold text-emerald-300">{score}</p>
                  <p className="mt-1 text-xs text-slate-400">Correct</p>
                </div>
                <div className="p-4">
                  <p className="text-2xl font-bold text-rose-300">{questions.length - score}</p>
                  <p className="mt-1 text-xs text-slate-400">Wrong</p>
                </div>
                <div className="p-4">
                  <p className="text-2xl font-bold text-amber-300">{earnedXp}</p>
                  <p className="mt-1 text-xs text-slate-400">XP earned</p>
                </div>
              </div>
            </div>

            {/* XP progress bar */}
            <div className="mt-4 rounded-xl border border-indigo-300/20 bg-indigo-400/10 px-4 py-3 text-left">
              <div className="mb-2 flex justify-between text-xs text-indigo-200">
                <span>Quiz performance</span>
                <span>{Math.round((score / questions.length) * 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-700"
                  style={{ width: `${(score / questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Review quiz button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setIsReviewing(true)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-[0_8px_0_#312e81] transition-all hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-[0_12px_0_#312e81] active:translate-y-1 active:shadow-[0_4px_0_#312e81]"
              >
                <CheckCircle2 size={18} />
                Review Quiz Answers
              </button>
            </div>

            {/* Action buttons */}
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => onComplete(earnedXp)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-[0_8px_0_#312e81] transition-all hover:-translate-y-1 hover:bg-indigo-500 hover:shadow-[0_12px_0_#312e81] active:translate-y-1 active:shadow-[0_4px_0_#312e81]"
              >
                <ChevronRight size={18} />
                Claim XP & Continue
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
              >
                Finish Later
              </button>
            </div>
          </div>
        )}
        {/* Quiz Review Modal */}
        {isReviewing && (
          <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl">
            <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-white">Quiz Review</h2>
                <button
                  type="button"
                  onClick={() => setIsReviewing(false)}
                  className="rounded-full bg-slate-800/50 p-1 hover:bg-slate-800 transition-colors"
                >
                  <XCircle size={20} className="text-slate-300" />
                </button>
              </div>

              <div className="space-y-4">
                {questions.map((q, i) => {
                  const userAnswerIndex = userAnswers[i] ?? -1;
                  const isCorrect = userAnswerIndex === q.answer;

                  return (
                    <div key={i} className="border border-slate-700/30 rounded-xl p-4 bg-slate-950/50">
                      <div className="mb-2 flex items-start">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-slate-800 text-xs font-bold mr-3">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <p className="flex-1 text-base">{q.question}</p>
                      </div>

                      <div className="space-y-2">
                        {q.options.map((option, optIndex) => {
                          const isUserSelected = userAnswerIndex === optIndex;
                          const isCorrectAnswer = optIndex === q.answer;

                          return (
                            <div key={optIndex} className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${isUserSelected && !isCorrectAnswer ? "bg-rose-400/20 text-rose-200" : isCorrectAnswer ? "bg-emerald-400/20 text-emerald-200" : "bg-slate-800/20 text-slate-300"}`}>
                              <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-md bg-slate-700 text-xs font-bold mr-2">
                                {String.fromCharCode(65 + optIndex)}
                              </span>
                              <span className="flex-1 text-sm">{option}</span>
                              {isCorrectAnswer && !isUserSelected && (
                                <span className="ml-2 text-xs text-emerald-400">Correct answer</span>
                              )}
                              {isUserSelected && !isCorrectAnswer && (
                                <span className="ml-2 text-xs text-rose-400">Your answer</span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-700/20 text-sm text-indigo-300">
                        <Lightbulb size={14} className="mr-2" />
                        <span>{q.explanation}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/20">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Score: {score}/{questions.length}</span>
                  <span>{Math.round((score / questions.length) * 100)}%</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizModal;