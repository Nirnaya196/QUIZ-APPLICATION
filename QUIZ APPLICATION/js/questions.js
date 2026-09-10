/**
 * Curated Question Bank for QuizMaster Pro
 * Categories: Web & Tech, Science & Nature, General Knowledge, History & Geography, Movies & Pop Culture, Logic & Brainteasers
 * Each question has: id, category, difficulty, question, options, correct (index 0-3), hint, explanation
 */

const DEFAULT_QUESTIONS = [
  // ==========================================
  // 1. Web & Tech
  // ==========================================
  {
    id: "tech-1",
    category: "technology",
    difficulty: "easy",
    question: "What does HTML stand for in web development?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Logic",
      "Home Tool Management Language"
    ],
    correct: 0,
    hint: "It is the standard markup language used to structure web pages.",
    explanation: "HTML stands for Hyper Text Markup Language and provides the structural backbone of websites."
  },
  {
    id: "tech-2",
    category: "technology",
    difficulty: "easy",
    question: "Which CSS property is used to create flexible and responsive layouts along one dimension?",
    options: [
      "display: block",
      "display: flex",
      "float: left",
      "position: absolute"
    ],
    correct: 1,
    hint: "Introduced in CSS3, it aligns items horizontally or vertically with ease.",
    explanation: "Flexbox (`display: flex`) provides a flexible layout model designed for distributing space and aligning items in 1D."
  },
  {
    id: "tech-3",
    category: "technology",
    difficulty: "medium",
    question: "In JavaScript, what will `typeof NaN` return?",
    options: [
      "\"undefined\"",
      "\"nan\"",
      "\"number\"",
      "\"object\""
    ],
    correct: 2,
    hint: "Even though it stands for 'Not-a-Number', IEEE 754 classifies it under a specific numeric type.",
    explanation: "In JavaScript, `NaN` is a special numeric value representing an unrepresentable math operation, so its `typeof` is 'number'."
  },
  {
    id: "tech-4",
    category: "technology",
    difficulty: "medium",
    question: "What is the primary purpose of the `git rebase` command?",
    options: [
      "To permanently delete a remote branch",
      "To move or combine a sequence of commits to a new base commit",
      "To initialize a fresh Git repository",
      "To create an SSH key for GitHub authentication"
    ],
    correct: 1,
    hint: "It helps maintain a cleaner, linear commit history by rewriting commit bases.",
    explanation: "Git rebase reapplies commits on top of another base tip, creating a linear history without merge commit bubbles."
  },
  {
    id: "tech-5",
    category: "technology",
    difficulty: "hard",
    question: "Which HTTP status code corresponds to '429 Too Many Requests'?",
    options: [
      "Rate Limiting / Throttling",
      "Payment Required",
      "Service Unavailable",
      "Gateway Timeout"
    ],
    correct: 0,
    hint: "APIs return this code when a user exceeds their quota within a timeframe.",
    explanation: "HTTP 429 Too Many Requests indicates the user has sent too many requests in a given amount of time (Rate Limiting)."
  },
  {
    id: "tech-6",
    category: "technology",
    difficulty: "hard",
    question: "What is the time complexity of searching an element in a balanced Binary Search Tree (AVL/Red-Black)?",
    options: [
      "O(1)",
      "O(n)",
      "O(log n)",
      "O(n log n)"
    ],
    correct: 2,
    hint: "At each step, the search cuts the remaining nodes in half.",
    explanation: "Because the tree is balanced with height ~ log2(n), lookup, insertion, and deletion take O(log n) time."
  },

  // ==========================================
  // 2. Science & Nature
  // ==========================================
  {
    id: "sci-1",
    category: "science",
    difficulty: "easy",
    question: "What is the chemical symbol for the element Gold?",
    options: ["Ag", "Au", "Fe", "Gd"],
    correct: 1,
    hint: "Derived from the Latin word 'Aurum'.",
    explanation: "The chemical symbol for gold is Au, coming from the Latin word 'Aurum' meaning shining dawn."
  },
  {
    id: "sci-2",
    category: "science",
    difficulty: "easy",
    question: "Which planet in our Solar System has the most prominent and extensive ring system?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correct: 1,
    hint: "It is the sixth planet from the Sun and second largest.",
    explanation: "Saturn is famous for its vast, bright ring system made primarily of ice particles and rocky debris."
  },
  {
    id: "sci-3",
    category: "science",
    difficulty: "medium",
    question: "What is the powerhouse organelle of eukaryotic cells responsible for producing ATP?",
    options: ["Ribosome", "Endoplasmic Reticulum", "Mitochondria", "Golgi Apparatus"],
    correct: 2,
    hint: "It generates most of the chemical energy needed to power biochemical reactions.",
    explanation: "Mitochondria produce adenosine triphosphate (ATP), the primary energy currency of the cell."
  },
  {
    id: "sci-4",
    category: "science",
    difficulty: "medium",
    question: "What is the speed of light in a vacuum (approximate value)?",
    options: [
      "150,000 km/s",
      "300,000 km/s",
      "500,000 km/s",
      "1,000,000 km/s"
    ],
    correct: 1,
    hint: "It is approximately 299,792,458 meters per second.",
    explanation: "Light travels at roughly 300,000 kilometers per second (or ~186,282 miles per second) in a vacuum."
  },
  {
    id: "sci-5",
    category: "science",
    difficulty: "hard",
    question: "Which subatomic particle is exchanged or shared to form chemical covalent bonds?",
    options: ["Protons", "Neutrons", "Electrons", "Quarks"],
    correct: 2,
    hint: "These negatively charged particles orbit the atomic nucleus.",
    explanation: "Covalent chemical bonds are formed when pairs of electrons are shared between atoms."
  },

  // ==========================================
  // 3. General Knowledge
  // ==========================================
  {
    id: "gen-1",
    category: "general",
    difficulty: "easy",
    question: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    hint: "Asia, Africa, North America, South America, Antarctica, Europe, Australia.",
    explanation: "Earth is traditionally divided into seven major continents."
  },
  {
    id: "gen-2",
    category: "general",
    difficulty: "medium",
    question: "Which currency is officially used in Japan?",
    options: ["Yuan", "Won", "Yen", "Ringgit"],
    correct: 2,
    hint: "Represented by the symbol ¥.",
    explanation: "The Japanese Yen (JPY / ¥) is the official currency of Japan."
  },
  {
    id: "gen-3",
    category: "general",
    difficulty: "medium",
    question: "Who painted the famous masterpiece 'Girl with a Pearl Earring'?",
    options: [
      "Vincent van Gogh",
      "Johannes Vermeer",
      "Rembrandt",
      "Claude Monet"
    ],
    correct: 1,
    hint: "A Dutch Golden Age master active in Delft.",
    explanation: "'Girl with a Pearl Earring' is an oil painting by Dutch painter Johannes Vermeer, dated c. 1665."
  },
  {
    id: "gen-4",
    category: "general",
    difficulty: "hard",
    question: "In what year was the United Nations officially established?",
    options: ["1919", "1939", "1945", "1950"],
    correct: 2,
    hint: "Founded right at the end of World War II.",
    explanation: "The UN Charter was signed on 26 June 1945 and entered into force on 24 October 1945."
  },

  // ==========================================
  // 4. History & Geography
  // ==========================================
  {
    id: "hist-1",
    category: "history",
    difficulty: "easy",
    question: "Which is the longest river in the world by general consensus?",
    options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    correct: 1,
    hint: "Flows northward through northeastern Africa.",
    explanation: "The Nile River (~6,650 km) in Africa is traditionally recognized as the world's longest river."
  },
  {
    id: "hist-2",
    category: "history",
    difficulty: "medium",
    question: "Which ancient civilization built the legendary Machu Picchu in Peru?",
    options: ["Aztecs", "Mayans", "Incas", "Olmecs"],
    correct: 2,
    hint: "Their empire spanned the Andean mountain ranges in South America.",
    explanation: "Machu Picchu is a 15th-century Inca citadel situated on a mountain ridge in Peru."
  },
  {
    id: "hist-3",
    category: "history",
    difficulty: "medium",
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correct: 2,
    hint: "It was selected as a compromise between Sydney and Melbourne in 1908.",
    explanation: "Canberra is the federal capital city of the Commonwealth of Australia."
  },
  {
    id: "hist-4",
    category: "history",
    difficulty: "hard",
    question: "Who was the first emperor of a unified China, known for his terracotta army?",
    options: [
      "Qin Shi Huang",
      "Han Wudi",
      "Kublai Khan",
      "Sun Yat-sen"
    ],
    correct: 0,
    hint: "He standardized weights, measures, and the Chinese script.",
    explanation: "Qin Shi Huang founded the Qin dynasty and unified China in 221 BC."
  },

  // ==========================================
  // 5. Movies & Pop Culture
  // ==========================================
  {
    id: "pop-1",
    category: "entertainment",
    difficulty: "easy",
    question: "Which fictional superhero is known as the 'Dark Knight' of Gotham City?",
    options: ["Superman", "Batman", "Iron Man", "Spider-Man"],
    correct: 1,
    hint: "Bruce Wayne's alter ego.",
    explanation: "Batman, created by Bob Kane and Bill Finger for DC Comics, is the Dark Knight of Gotham City."
  },
  {
    id: "pop-2",
    category: "entertainment",
    difficulty: "medium",
    question: "Who directed the critically acclaimed sci-fi film 'Interstellar' (2014)?",
    options: [
      "Steven Spielberg",
      "Christopher Nolan",
      "Denis Villeneuve",
      "Ridley Scott"
    ],
    correct: 1,
    hint: "Known for Oppenheimer, Inception, and The Dark Knight trilogy.",
    explanation: "Christopher Nolan directed, co-wrote, and produced the space epic 'Interstellar'."
  },
  {
    id: "pop-3",
    category: "entertainment",
    difficulty: "medium",
    question: "Which studio created the animated movie 'Spirited Away'?",
    options: ["Pixar", "Studio Ghibli", "DreamWorks", "Toei Animation"],
    correct: 1,
    hint: "Co-founded by legendary Japanese director Hayao Miyazaki.",
    explanation: "Studio Ghibli released Spirited Away in 2001, winning the Academy Award for Best Animated Feature."
  },
  {
    id: "pop-4",
    category: "entertainment",
    difficulty: "hard",
    question: "Which musical key is Queen's legendary 'Bohemian Rhapsody' primarily written in?",
    options: ["B-flat Major", "C Major", "E Minor", "G Major"],
    correct: 0,
    hint: "The iconic intro and operatic section open in B-flat major.",
    explanation: "The introduction and balladic verses of 'Bohemian Rhapsody' are composed in B-flat major before modulating."
  },

  // ==========================================
  // 6. Logic & Brainteasers
  // ==========================================
  {
    id: "logic-1",
    category: "logic",
    difficulty: "easy",
    question: "A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How much does the ball cost?",
    options: ["$0.10", "$0.05", "$0.15", "$0.01"],
    correct: 1,
    hint: "Let ball = x. Then bat = x + 1.00. Total = x + (x + 1.00) = 1.10.",
    explanation: "2x + 1.00 = 1.10 => 2x = 0.10 => x = $0.05 (5 cents). The bat costs $1.05."
  },
  {
    id: "logic-2",
    category: "logic",
    difficulty: "medium",
    question: "What comes next in the sequence: 2, 6, 12, 20, 30, ___?",
    options: ["36", "40", "42", "48"],
    correct: 2,
    hint: "Differences between terms are +4, +6, +8, +10, ...",
    explanation: "Differences increase by 2 each time (+4, +6, +8, +10, +12). 30 + 12 = 42 (also n*(n+1): 1*2, 2*3, 3*4, 4*5, 5*6, 6*7 = 42)."
  },
  {
    id: "logic-3",
    category: "logic",
    difficulty: "hard",
    question: "If 5 machines take 5 minutes to make 5 widgets, how many minutes does it take 100 machines to make 100 widgets?",
    options: ["100 minutes", "5 minutes", "1 minute", "20 minutes"],
    correct: 1,
    hint: "Focus on how long ONE machine takes to make ONE widget.",
    explanation: "1 machine takes 5 minutes to make 1 widget. With 100 machines running in parallel, 100 widgets will still take 5 minutes."
  }
];

// Helper: Get question categories metadata
const CATEGORIES = {
  all: { name: "All Categories", icon: "sparkles", color: "#6366f1" },
  technology: { name: "Web & Tech", icon: "code", color: "#3b82f6" },
  science: { name: "Science & Nature", icon: "flask", color: "#10b981" },
  general: { name: "General Knowledge", icon: "globe", color: "#f59e0b" },
  history: { name: "History & Geography", icon: "compass", color: "#ec4899" },
  entertainment: { name: "Movies & Pop Culture", icon: "film", color: "#8b5cf6" },
  logic: { name: "Logic & Puzzles", icon: "puzzle", color: "#06b6d4" },
  custom: { name: "Custom Deck", icon: "folder-plus", color: "#14b8a6" }
};
