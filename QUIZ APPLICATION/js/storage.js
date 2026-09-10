/**
 * Storage and Game State Manager
 * Handles local persistence, analytics, achievements, and custom decks
 */

const STORAGE_KEYS = {
  STATS: "quizmaster_stats_v2",
  HISTORY: "quizmaster_history_v2",
  CUSTOM_DECKS: "quizmaster_custom_decks_v2",
  THEME: "quizmaster_theme_v2"
};

const ACHIEVEMENTS_LIST = [
  {
    id: "first_quiz",
    title: "First Steps",
    description: "Complete your very first quiz",
    icon: "🎯",
    condition: (stats) => stats.quizzesCompleted >= 1
  },
  {
    id: "perfect_score",
    title: "Flawless Victory",
    description: "Score 100% accuracy on any standard quiz",
    icon: "👑",
    condition: (stats) => stats.perfectScores >= 1
  },
  {
    id: "streak_5",
    title: "On Fire",
    description: "Achieve an uninterrupted streak of 5 correct answers",
    icon: "🔥",
    condition: (stats) => stats.highestStreak >= 5
  },
  {
    id: "streak_10",
    title: "Untouchable",
    description: "Achieve an incredible 10 question answer streak",
    icon: "⚡",
    condition: (stats) => stats.highestStreak >= 10
  },
  {
    id: "xp_1000",
    title: "Scholar",
    description: "Accumulate 1,000 total XP points",
    icon: "📜",
    condition: (stats) => stats.totalXP >= 1000
  },
  {
    id: "xp_5000",
    title: "Grandmaster",
    description: "Accumulate 5,000 total XP points",
    icon: "🔮",
    condition: (stats) => stats.totalXP >= 5000
  },
  {
    id: "speed_demon",
    title: "Speed Demon",
    description: "Answer a question correctly with >80% time remaining",
    icon: "🏎️",
    condition: (stats) => stats.speedAnswers >= 1
  },
  {
    id: "deck_creator",
    title: "Quiz Architect",
    description: "Create your own custom quiz deck",
    icon: "🛠️",
    condition: (stats, customDecks) => customDecks && customDecks.length > 0
  }
];

class StorageManager {
  constructor() {
    this.stats = this.loadStats();
    this.history = this.loadHistory();
    this.customDecks = this.loadCustomDecks();
  }

  loadStats() {
    const raw = localStorage.getItem(STORAGE_KEYS.STATS);
    const defaults = {
      quizzesCompleted: 0,
      totalQuestions: 0,
      totalCorrect: 0,
      highestStreak: 0,
      perfectScores: 0,
      speedAnswers: 0,
      totalXP: 0,
      categories: {
        technology: { total: 0, correct: 0 },
        science: { total: 0, correct: 0 },
        general: { total: 0, correct: 0 },
        history: { total: 0, correct: 0 },
        entertainment: { total: 0, correct: 0 },
        logic: { total: 0, correct: 0 },
        custom: { total: 0, correct: 0 }
      },
      unlockedBadges: []
    };

    if (!raw) return defaults;
    try {
      return { ...defaults, ...JSON.parse(raw) };
    } catch {
      return defaults;
    }
  }

  saveStats() {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(this.stats));
  }

  loadHistory() {
    const raw = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  saveHistory(record) {
    this.history.unshift(record);
    if (this.history.length > 30) this.history.pop(); // Keep recent 30
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(this.history));
  }

  loadCustomDecks() {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_DECKS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  saveCustomDecks(decks) {
    this.customDecks = decks;
    localStorage.setItem(STORAGE_KEYS.CUSTOM_DECKS, JSON.stringify(this.customDecks));
    this.checkBadges();
  }

  recordQuizFinished({ category, difficulty, score, totalQuestions, xpEarned, maxStreak, accuracy, timeTakenSeconds }) {
    this.stats.quizzesCompleted += 1;
    this.stats.totalQuestions += totalQuestions;
    this.stats.totalCorrect += score;
    this.stats.totalXP += xpEarned;
    if (maxStreak > this.stats.highestStreak) {
      this.stats.highestStreak = maxStreak;
    }
    if (accuracy === 100) {
      this.stats.perfectScores += 1;
    }

    if (this.stats.categories[category]) {
      this.stats.categories[category].total += totalQuestions;
      this.stats.categories[category].correct += score;
    }

    // Save history record
    const historyItem = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      category,
      difficulty,
      score,
      totalQuestions,
      accuracy,
      xpEarned,
      maxStreak,
      timeTakenSeconds
    };
    this.saveHistory(historyItem);

    // Check newly unlocked badges
    const newBadges = this.checkBadges();
    this.saveStats();

    return { historyItem, newBadges };
  }

  recordSpeedAnswer() {
    this.stats.speedAnswers += 1;
    this.saveStats();
  }

  checkBadges() {
    const newlyUnlocked = [];
    ACHIEVEMENTS_LIST.forEach(badge => {
      if (!this.stats.unlockedBadges.includes(badge.id)) {
        if (badge.condition(this.stats, this.customDecks)) {
          this.stats.unlockedBadges.push(badge.id);
          newlyUnlocked.push(badge);
        }
      }
    });
    return newlyUnlocked;
  }

  getLevelInfo() {
    const xp = this.stats.totalXP;
    // Level bracket: 0 -> 250 -> 600 -> 1200 -> 2500 -> 5000 -> 10000
    const thresholds = [0, 250, 600, 1200, 2500, 5000, 10000];
    const titles = ["Novice", "Learner", "Apprentice", "Scholar", "Expert", "Grandmaster", "Legend"];

    let level = 1;
    for (let i = 0; i < thresholds.length; i++) {
      if (xp >= thresholds[i]) {
        level = i + 1;
      }
    }

    const currentThreshold = thresholds[level - 1] || 0;
    const nextThreshold = thresholds[level] || thresholds[level - 1] + 5000;
    const progress = Math.min(100, Math.round(((xp - currentThreshold) / (nextThreshold - currentThreshold)) * 100));

    return {
      level,
      title: titles[level - 1] || "Master",
      currentXP: xp,
      nextLevelXP: nextThreshold,
      progress
    };
  }

  resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_DECKS);
    this.stats = this.loadStats();
    this.history = [];
    this.customDecks = [];
  }
}

const Storage = new StorageManager();
