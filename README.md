NAME : NIRNAYA RAJPUT 

DOAMIN : JAVA PROGRAMMING 

INTERN ID : CITS8563
# QUIZ-APPLICATION
An interactive Quiz Application that allows users to answer multiple-choice questions, track their scores, and receive instant feedback through a simple and user-friendly interface.
<div align="center">

# ⚡ QuizMaster Pro
### *The Ultimate Gamified Trivia & Quiz Web Platform*

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript_ES6+-F7DF1E?logo=javascript&logoColor=black)](js/app.js)
[![HTML5 & CSS3](https://img.shields.io/badge/Modern-HTML5_%26_CSS3-E34F26?logo=html5&logoColor=white)](css/style.css)
[![Offline Ready](https://img.shields.io/badge/Offline-100%25_Ready-blueviolet.svg)](#technical-highlights)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

An ultra-modern, responsive, and gamified Quiz Web Application built with clean Vanilla JavaScript, CSS Glassmorphism, and Native Web Audio API synthesis. Designed for smooth gameplay, custom quiz authoring, and instant deployment.

[🎮 Live Demo](#-quick-start) • [✨ Key Features](#-features) • [🛠️ Custom Quiz Deck Builder](#-custom-quiz-builder) • [🚀 Deploy to GitHub Pages](#-deploy-to-github-pages)

---

</div>

## 🌟 Overview

**QuizMaster Pro** delivers an arcade-quality trivia challenge right in your browser. Whether you are studying web development, testing science trivia, or hosting a custom trivia night with friends, QuizMaster Pro provides a polished and responsive experience without any heavy dependencies or build steps.

---

## ✨ Features

### 🎮 Gamified Gameplay & Dynamics
- **6 Diverse Categories**: Web & Tech, Science & Nature, General Knowledge, History & Geography, Movies & Pop Culture, and Logic Puzzles.
- **Dynamic Difficulty Modes**:
  - `Easy`: 15s timer per question
  - `Medium`: 12s timer per question
  - `Hard`: 8s high-pressure timer
  - `🔥 Survival Mode`: 5s rapid-fire countdown!
- **Streak Multipliers & XP Progression**: Build answer streaks for combo multipliers (`x1.25` up to `x2.5`) and unlock Player Levels (Novice ➔ Scholar ➔ Grandmaster).
- **Interactive Lifelines**:
  - ✂️ **50:50**: Striking out two incorrect options.
  - 💡 **Clue / Hint**: Reveals contextual hints without spoiling the answer.
  - ⏱️ **+15s Time Boost**: Extra breathing room on tricky questions.
  - ⏭️ **Skip**: Move forward without breaking your streak.

### 🔊 Audio & Visual Polish
- **Web Audio API Synthesizer**: 100% offline procedural audio chimes, buzzer sounds, victory fanfares, and countdown ticks. **Zero external MP3 dependencies** or broken links.
- **Particle Confetti Engine**: High-performance HTML5 Canvas particle confetti system for high score and flawless victory celebrations.
- **Glassmorphism Design System**: Modern frosted-glass aesthetics with customizable Light / Dark mode themes and smooth micro-animations.

### 📊 Analytics & Review
- **In-Depth Answer Review**: Post-quiz breakdown displaying your chosen answer, the correct answer, and in-depth educational explanations.
- **🎯 Practice Missed Questions**: One-click targeted retry session containing only questions you got wrong.
- **Profile & Mastery Stats**: Track total win rate, category accuracy bars, highest streaks, and unlockable achievement badges.
- **Shareable Scorecard**: Share your score directly via Web Share API or copy a formatted scorecard snippet.

### 🛠️ Custom Quiz Builder & Portability
- **Interactive Quiz Creator**: Create custom trivia sets directly inside the browser.
- **JSON Export & Import**: Download your custom quiz sets as JSON files to share with teammates, students, or friends.

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
| :---: | :--- |
| <kbd>1</kbd> / <kbd>A</kbd> | Select Option A |
| <kbd>2</kbd> / <kbd>B</kbd> | Select Option B |
| <kbd>3</kbd> / <kbd>C</kbd> | Select Option C |
| <kbd>4</kbd> / <kbd>D</kbd> | Select Option D |
| <kbd>Space</kbd> / <kbd>Enter</kbd> | Advance to Next Question / Finish Quiz |

---

## 📁 Repository Structure

```
QUIZ-APPLICATION/
├── index.html                 # Semantic HTML5 app markup and modal shells
├── css/
│   ├── style.css              # Core design system, glassmorphism, animations & tokens
│   └── responsive.css         # Mobile & tablet layout optimizations
├── js/
│   ├── app.js                 # Primary game orchestrator & event controller
│   ├── questions.js           # Curated question dataset across 6 categories
│   ├── sound.js               # Zero-dependency Web Audio API sound synthesizer
│   ├── storage.js             # LocalStorage state, badges, and analytics manager
│   └── confetti.js            # HTML5 Canvas confetti particle engine
├── sample-decks/
│   └── javascript-mastery.json # Ready-to-import custom quiz deck
├── .gitignore                 # Standard git ignore patterns
├── LICENSE                    # MIT License
└── README.md                  # Project documentation & GitHub showcase
```

---

## 🚀 Quick Start

No Node.js or build steps required! Run it immediately:

### Option 1: Direct in Browser
Simply clone or download this repository and double click `index.html` to open it in any modern web browser.

### Option 2: Local Web Server (VS Code / Python)
```bash
# Clone the repository
git clone https://github.com/your-username/quiz-application.git

# Navigate to the project directory
cd quiz-application

# Start a local server with Python 3
python -m http.server 8000

# Or start with Node's npx serve
npx serve .
```
Visit `http://localhost:8000` in your browser.

---

## 📦 Custom Quiz JSON Format

You can author custom decks in a `.json` file and import them directly into QuizMaster Pro:

```json
[
  {
    "id": "custom-1",
    "category": "custom",
    "difficulty": "medium",
    "question": "What is the primary function of DNS on the internet?",
    "options": [
      "Translates domain names to IP addresses",
      "Encrypts network traffic",
      "Stores database records",
      "Compresses images for web delivery"
    ],
    "correct": 0,
    "hint": "Think of it as the internet's phonebook.",
    "explanation": "DNS (Domain Name System) translates human-readable domain names (like github.com) into machine-readable IP addresses."
  }
]
```

---

## 🌐 Deploy to GitHub Pages in 1 Minute

1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: Initial commit of QuizMaster Pro"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** ➔ **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select **`main`** branch and `/ (root)` folder.
   - Click **Save**.
3. Your quiz app will be live at: `https://<your-username>.github.io/<your-repo-name>/`!

---

## 🏅 Unlocked Badges & Achievements

- 🎯 **First Steps**: Complete your very first quiz.
- 👑 **Flawless Victory**: Achieve a 100% score on any quiz.
- 🔥 **On Fire**: Reach a 5-question answer streak.
- ⚡ **Untouchable**: Reach a 10-question streak.
- 🏎️ **Speed Demon**: Answer correctly with >80% time remaining.
- 🛠️ **Quiz Architect**: Create your own custom quiz deck.
- 📜 **Scholar**: Accumulate 1,000 total XP points.
- 🔮 **Grandmaster**: Accumulate 5,000 total XP points.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to add new question sets, categories, or features:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/NewCategory`).
3. Commit your Changes (`git commit -m 'Add New Category'`).
4. Push to the Branch (`git push origin feature/NewCategory`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

<div align="center">
  <sub>Built with ❤️ for quiz enthusiasts and developers. Star ⭐ this repository if you found it helpful!</sub>
</div>
