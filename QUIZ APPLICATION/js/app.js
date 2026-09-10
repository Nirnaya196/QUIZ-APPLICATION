/**
 * QuizMaster Pro - Primary Game Application Controller
 */

class QuizApp {
  constructor() {
    // Current Session Settings
    this.selectedCategory = "all";
    this.selectedDifficulty = "easy";
    this.selectedLength = 5;

    // Active Game State
    this.activeQuestions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.xpEarned = 0;
    this.isAnswered = false;
    this.userAnswers = []; // Records for review

    // Lifelines
    this.lifelines = {
      fiftyFifty: 1,
      hint: 1,
      freeze: 1,
      skip: 1
    };

    // Timer variables
    this.timer = null;
    this.timePerQuestion = 15;
    this.timeRemaining = 15;
    this.questionStartTime = 0;
    this.quizStartTime = 0;

    // DOM Elements Cache
    this.cacheDOMElements();

    // Initialize UI and Events
    this.init();
  }

  cacheDOMElements() {
    // Views
    this.viewHome = document.getElementById("view-home");
    this.viewQuiz = document.getElementById("view-quiz");
    this.viewResults = document.getElementById("view-results");

    // Header elements
    this.brandHomeBtn = document.getElementById("brand-home-btn");
    this.headerLevelBadge = document.getElementById("header-level-badge");
    this.headerLevelText = document.getElementById("header-level-text");
    this.btnToggleSound = document.getElementById("btn-toggle-sound");
    this.btnToggleTheme = document.getElementById("btn-toggle-theme");
    this.btnOpenStats = document.getElementById("btn-open-stats");
    this.btnOpenCustom = document.getElementById("btn-open-custom");

    // Home elements
    this.categoryGrid = document.getElementById("category-grid");
    this.difficultySelector = document.getElementById("difficulty-selector");
    this.lengthSelector = document.getElementById("length-selector");
    this.btnStartQuiz = document.getElementById("btn-start-quiz");
    this.selectedCategoryCount = document.getElementById("selected-category-count");

    // Quick Stats Home elements
    this.statQuizzesCompleted = document.getElementById("stat-quizzes-completed");
    this.statAccuracy = document.getElementById("stat-accuracy");
    this.statBestStreak = document.getElementById("stat-best-streak");
    this.statTotalXP = document.getElementById("stat-total-xp");

    // Quiz HUD elements
    this.quizHudCategory = document.getElementById("quiz-hud-category");
    this.quizHudDifficulty = document.getElementById("quiz-hud-difficulty");
    this.quizHudStreak = document.getElementById("quiz-hud-streak");
    this.quizStreakCount = document.getElementById("quiz-streak-count");
    this.quizTimerPill = document.getElementById("quiz-timer-pill");
    this.quizTimerSeconds = document.getElementById("quiz-timer-seconds");
    this.quizProgressBar = document.getElementById("quiz-progress-bar");
    this.questionTimerBar = document.getElementById("question-timer-bar");
    this.quizHudPoints = document.getElementById("quiz-hud-points");

    // Quiz Question elements
    this.quizQuestionNumber = document.getElementById("quiz-question-number");
    this.quizQuestionText = document.getElementById("quiz-question-text");
    this.quizHintBox = document.getElementById("quiz-hint-box");
    this.quizHintText = document.getElementById("quiz-hint-text");
    this.quizOptionsContainer = document.getElementById("quiz-options-container");
    this.quizExplanationCard = document.getElementById("quiz-explanation-card");
    this.quizExplanationText = document.getElementById("quiz-explanation-text");
    this.btnNextQuestion = document.getElementById("btn-next-question");

    // Lifeline elements
    this.btnLifeline5050 = document.getElementById("lifeline-5050");
    this.btnLifelineHint = document.getElementById("lifeline-hint");
    this.btnLifelineFreeze = document.getElementById("lifeline-freeze");
    this.btnLifelineSkip = document.getElementById("lifeline-skip");
    this.count5050 = document.getElementById("count-5050");
    this.countHint = document.getElementById("count-hint");
    this.countFreeze = document.getElementById("count-freeze");
    this.countSkip = document.getElementById("count-skip");

    // Results elements
    this.resultGrade = document.getElementById("result-grade");
    this.resultTitle = document.getElementById("result-title");
    this.resultSubtitle = document.getElementById("result-subtitle");
    this.resultScore = document.getElementById("result-score");
    this.resultAccuracy = document.getElementById("result-accuracy");
    this.resultMaxStreak = document.getElementById("result-max-streak");
    this.resultTimeTaken = document.getElementById("result-time-taken");
    this.resultXpText = document.getElementById("result-xp-text");
    this.resultBadgesTray = document.getElementById("result-badges-tray");
    this.btnPlayAgain = document.getElementById("btn-play-again");
    this.btnReviewAnswers = document.getElementById("btn-review-answers");
    this.btnRetryMissed = document.getElementById("btn-retry-missed");
    this.btnShareScore = document.getElementById("btn-share-score");
    this.btnBackHome = document.getElementById("btn-back-home");

    // Modals
    this.modalReview = document.getElementById("modal-review");
    this.modalStats = document.getElementById("modal-stats");
    this.modalCustom = document.getElementById("modal-custom");
    this.reviewListContainer = document.getElementById("review-list-container");

    // Stats Modal elements
    this.statsModalLevelTitle = document.getElementById("stats-modal-level-title");
    this.statsModalXpCounter = document.getElementById("stats-modal-xp-counter");
    this.statsModalXpBar = document.getElementById("stats-modal-xp-bar");
    this.statsCategoryBreakdown = document.getElementById("stats-category-breakdown");
    this.statsBadgesGrid = document.getElementById("stats-badges-grid");
    this.btnResetStats = document.getElementById("btn-reset-stats");

    // Custom Deck elements
    this.formCustomQuestion = document.getElementById("form-custom-question");
    this.customDeckCount = document.getElementById("custom-deck-count");
    this.customQuestionsList = document.getElementById("custom-questions-list");
    this.btnExportDeck = document.getElementById("btn-export-deck");
    this.inputImportDeck = document.getElementById("input-import-deck");

    // Toast Container
    this.toastContainer = document.getElementById("toast-container");
  }

  init() {
    this.loadTheme();
    this.updateSoundButtonUI();
    this.updateHeaderLevel();
    this.updateHomeStats();
    this.renderCategoryCards();
    this.bindEvents();
    this.renderCustomQuestionsList();
  }

  // ==========================================
  // Event Bindings
  // ==========================================
  bindEvents() {
    // Navigation / Brand
    this.brandHomeBtn.addEventListener("click", () => {
      Sound.playClick();
      this.switchView("view-home");
    });

    // Theme Toggle
    this.btnToggleTheme.addEventListener("click", () => {
      Sound.playClick();
      this.toggleTheme();
    });

    // Sound Toggle
    this.btnToggleSound.addEventListener("click", () => {
      const isMuted = Sound.toggleMute();
      this.updateSoundButtonUI();
      if (!isMuted) Sound.playCorrect();
      this.showToast(isMuted ? "Audio muted" : "Audio enabled", "🔊");
    });

    // Modals open triggers
    this.btnOpenStats.addEventListener("click", () => {
      Sound.playClick();
      this.openStatsModal();
    });

    this.btnOpenCustom.addEventListener("click", () => {
      Sound.playClick();
      this.openCustomDeckModal();
    });

    // Modal Close buttons
    document.querySelectorAll(".close-modal").forEach(btn => {
      btn.addEventListener("click", (e) => {
        Sound.playClick();
        const targetId = e.currentTarget.getAttribute("data-target");
        if (targetId) this.closeModal(targetId);
      });
    });

    // Close modals on overlay backdrop click
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          overlay.classList.remove("show");
        }
      });
    });

    // Difficulty selection
    this.difficultySelector.querySelectorAll(".segment-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        Sound.playClick();
        this.difficultySelector.querySelectorAll(".segment-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.selectedDifficulty = e.currentTarget.getAttribute("data-diff");
      });
    });

    // Length selection
    this.lengthSelector.querySelectorAll(".segment-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        Sound.playClick();
        this.lengthSelector.querySelectorAll(".segment-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        const val = e.currentTarget.getAttribute("data-length");
        this.selectedLength = val === "all" ? "all" : parseInt(val, 10);
      });
    });

    // Start Quiz Button
    this.btnStartQuiz.addEventListener("click", () => {
      Sound.playClick();
      this.startQuiz();
    });

    // Next Question Button
    this.btnNextQuestion.addEventListener("click", () => {
      Sound.playClick();
      this.nextQuestion();
    });

    // Lifeline buttons
    this.btnLifeline5050.addEventListener("click", () => this.useLifeline5050());
    this.btnLifelineHint.addEventListener("click", () => this.useLifelineHint());
    this.btnLifelineFreeze.addEventListener("click", () => this.useLifelineFreeze());
    this.btnLifelineSkip.addEventListener("click", () => this.useLifelineSkip());

    // Result buttons
    this.btnPlayAgain.addEventListener("click", () => {
      Sound.playClick();
      this.startQuiz();
    });

    this.btnBackHome.addEventListener("click", () => {
      Sound.playClick();
      this.switchView("view-home");
      this.updateHomeStats();
      this.updateHeaderLevel();
    });

    this.btnReviewAnswers.addEventListener("click", () => {
      Sound.playClick();
      this.openReviewModal();
    });

    this.btnRetryMissed.addEventListener("click", () => {
      Sound.playClick();
      this.retryMissedQuestions();
    });

    this.btnShareScore.addEventListener("click", () => {
      this.shareScoreCard();
    });

    // Custom Quiz Form
    this.formCustomQuestion.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addCustomQuestion();
    });

    // Export / Import Custom Deck
    this.btnExportDeck.addEventListener("click", () => this.exportCustomDeck());
    this.inputImportDeck.addEventListener("change", (e) => this.importCustomDeck(e));

    // Reset Data button
    this.btnResetStats.addEventListener("click", () => {
      if (confirm("Are you sure you want to reset all quiz statistics and history?")) {
        Storage.resetAllData();
        this.updateHomeStats();
        this.updateHeaderLevel();
        this.closeModal("modal-stats");
        this.showToast("All data successfully reset.", "🗑️");
      }
    });

    // Keyboard Shortcuts
    document.addEventListener("keydown", (e) => {
      if (this.viewQuiz.classList.contains("active") && !this.isAnswered) {
        const key = e.key.toUpperCase();
        const keyMap = { "1": 0, "A": 0, "2": 1, "B": 1, "3": 2, "C": 2, "4": 3, "D": 3 };
        if (key in keyMap) {
          const optBtns = this.quizOptionsContainer.querySelectorAll(".option-btn");
          const targetBtn = optBtns[keyMap[key]];
          if (targetBtn && !targetBtn.disabled && !targetBtn.classList.contains("eliminated")) {
            targetBtn.click();
          }
        }
      } else if (this.viewQuiz.classList.contains("active") && this.isAnswered) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.nextQuestion();
        }
      }
    });
  }

  // ==========================================
  // Category Selection
  // ==========================================
  renderCategoryCards() {
    this.categoryGrid.innerHTML = "";

    const allQuestions = [...DEFAULT_QUESTIONS, ...Storage.customDecks];

    const categoryKeys = Object.keys(CATEGORIES);
    categoryKeys.forEach(catKey => {
      const cat = CATEGORIES[catKey];

      // Count questions
      let count = 0;
      if (catKey === "all") {
        count = allQuestions.length;
      } else if (catKey === "custom") {
        count = Storage.customDecks.length;
      } else {
        count = allQuestions.filter(q => q.category === catKey).length;
      }

      const card = document.createElement("div");
      card.className = `category-card ${catKey === this.selectedCategory ? "selected" : ""}`;
      card.setAttribute("data-category", catKey);

      const iconEmoji = {
        sparkles: "✨",
        code: "💻",
        flask: "🔬",
        globe: "🌍",
        compass: "🗺️",
        film: "🎬",
        puzzle: "🧩",
        "folder-plus": "🛠️"
      }[cat.icon] || "⭐";

      card.innerHTML = `
        <div class="category-check">✓</div>
        <div class="category-icon-box" style="background: ${cat.color}20; color: ${cat.color};">
          ${iconEmoji}
        </div>
        <div class="category-name">${cat.name}</div>
        <div class="category-meta">${count} Questions Available</div>
      `;

      card.addEventListener("click", () => {
        Sound.playClick();
        this.categoryGrid.querySelectorAll(".category-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");
        this.selectedCategory = catKey;
        this.selectedCategoryCount.textContent = `${cat.name} (${count} Qs)`;
      });

      this.categoryGrid.appendChild(card);
    });
  }

  // ==========================================
  // Quiz Lifecycle & Gameplay
  // ==========================================
  startQuiz(customQuestionList = null) {
    // 1. Gather questions
    let questionsPool = [];

    if (customQuestionList) {
      questionsPool = [...customQuestionList];
    } else {
      const allQuestions = [...DEFAULT_QUESTIONS, ...Storage.customDecks];
      if (this.selectedCategory === "all") {
        questionsPool = [...allQuestions];
      } else if (this.selectedCategory === "custom") {
        questionsPool = [...Storage.customDecks];
        if (questionsPool.length === 0) {
          this.showToast("Custom deck is empty! Add questions in Custom Deck builder.", "⚠️");
          this.openCustomDeckModal();
          return;
        }
      } else {
        questionsPool = allQuestions.filter(q => q.category === this.selectedCategory);
      }
    }

    if (questionsPool.length === 0) {
      this.showToast("No questions available in this category.", "⚠️");
      return;
    }

    // Shuffle question pool
    this.shuffleArray(questionsPool);

    // Limit length
    const limit = this.selectedLength === "all" ? questionsPool.length : Math.min(this.selectedLength, questionsPool.length);
    this.activeQuestions = questionsPool.slice(0, limit);

    // Reset Game State
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.xpEarned = 0;
    this.userAnswers = [];
    this.lifelines = { fiftyFifty: 1, hint: 1, freeze: 1, skip: 1 };
    this.updateLifelinesUI();

    // Set time limits based on difficulty
    const timeLimits = {
      easy: 15,
      medium: 12,
      hard: 8,
      survival: 5
    };
    this.timePerQuestion = timeLimits[this.selectedDifficulty] || 15;
    this.quizStartTime = Date.now();

    // Update HUD tags
    const currentCatMeta = CATEGORIES[this.selectedCategory] || CATEGORIES.all;
    this.quizHudCategory.textContent = currentCatMeta.name;
    this.quizHudDifficulty.textContent = this.selectedDifficulty.toUpperCase();

    // Switch view
    this.switchView("view-quiz");

    // Load first question
    this.loadQuestion(this.currentIndex);
  }

  loadQuestion(index) {
    if (index >= this.activeQuestions.length) {
      this.finishQuiz();
      return;
    }

    this.isAnswered = false;
    const q = this.activeQuestions[index];
    this.questionStartTime = Date.now();

    // Update Progress Bar
    const progressPercent = ((index) / this.activeQuestions.length) * 100;
    this.quizProgressBar.style.width = `${progressPercent}%`;

    // Question number & text
    this.quizQuestionNumber.textContent = `Question ${index + 1} of ${this.activeQuestions.length}`;
    this.quizQuestionText.textContent = q.question;

    // Reset Hint & Explanation Boxes
    this.quizHintBox.classList.remove("show");
    this.quizExplanationCard.classList.remove("show");
    this.btnNextQuestion.style.display = "none";

    // Dynamic XP indicator
    const baseXP = this.getBaseXP();
    this.quizHudPoints.textContent = `+${baseXP} XP`;

    // Render Options
    this.quizOptionsContainer.innerHTML = "";
    const keyLabels = ["A", "B", "C", "D"];

    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.setAttribute("data-index", optIdx);

      btn.innerHTML = `
        <span class="option-key">${keyLabels[optIdx] || optIdx + 1}</span>
        <span class="option-text">${optText}</span>
      `;

      btn.addEventListener("click", () => this.handleAnswerSelect(optIdx, btn));
      this.quizOptionsContainer.appendChild(btn);
    });

    // Start Timer
    this.startQuestionTimer();
  }

  startQuestionTimer() {
    if (this.timer) clearInterval(this.timer);

    this.timeRemaining = this.timePerQuestion;
    this.updateTimerDisplay();

    this.timer = setInterval(() => {
      this.timeRemaining -= 1;
      this.updateTimerDisplay();

      if (this.timeRemaining <= 3 && this.timeRemaining > 0) {
        Sound.playWarningTick();
      } else if (this.timeRemaining > 3) {
        Sound.playTick();
      }

      if (this.timeRemaining <= 0) {
        clearInterval(this.timer);
        this.handleTimeOut();
      }
    }, 1000);
  }

  updateTimerDisplay() {
    this.quizTimerSeconds.textContent = `${this.timeRemaining}s`;

    const percentage = Math.max(0, (this.timeRemaining / this.timePerQuestion) * 100);
    this.questionTimerBar.style.width = `${percentage}%`;

    if (this.timeRemaining <= 4) {
      this.quizTimerPill.classList.add("urgent");
      this.questionTimerBar.classList.add("urgent");
    } else {
      this.quizTimerPill.classList.remove("urgent");
      this.questionTimerBar.classList.remove("urgent");
    }
  }

  handleAnswerSelect(selectedIndex, selectedBtn) {
    if (this.isAnswered) return;
    this.isAnswered = true;
    clearInterval(this.timer);

    const q = this.activeQuestions[this.currentIndex];
    const isCorrect = selectedIndex === q.correct;
    const timeSpent = Math.round((Date.now() - this.questionStartTime) / 1000);

    // Record answer
    this.userAnswers.push({
      question: q,
      selectedIndex,
      isCorrect,
      timeSpent
    });

    // Disable all option buttons
    const optButtons = this.quizOptionsContainer.querySelectorAll(".option-btn");
    optButtons.forEach(btn => btn.disabled = true);

    if (isCorrect) {
      // Correct!
      Sound.playCorrect();
      selectedBtn.classList.add("correct");
      this.score += 1;
      this.streak += 1;
      if (this.streak > this.maxStreak) this.maxStreak = this.streak;

      // Speed demon check
      if (this.timeRemaining >= this.timePerQuestion * 0.8) {
        Storage.recordSpeedAnswer();
      }

      // Calculate XP
      const earned = this.calculateQuestionXP();
      this.xpEarned += earned;

      // Streak Chime
      if (this.streak >= 3) {
        setTimeout(() => Sound.playStreak(), 200);
      }
    } else {
      // Wrong!
      Sound.playWrong();
      selectedBtn.classList.add("wrong");
      this.streak = 0; // Reset streak

      // Highlight correct answer
      const correctBtn = optButtons[q.correct];
      if (correctBtn) correctBtn.classList.add("correct");
    }

    // Update Streak HUD
    this.updateStreakHUD();

    // Show Explanation
    if (q.explanation) {
      this.quizExplanationText.textContent = q.explanation;
      this.quizExplanationCard.classList.add("show");
    }

    // Show Next Question Button
    this.btnNextQuestion.style.display = "inline-flex";
    if (this.currentIndex === this.activeQuestions.length - 1) {
      this.btnNextQuestion.innerHTML = `<span>Finish Quiz</span><span>🏁</span>`;
    } else {
      this.btnNextQuestion.innerHTML = `<span>Next Question</span><span>➔</span>`;
    }
  }

  handleTimeOut() {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const q = this.activeQuestions[this.currentIndex];
    this.streak = 0;
    this.updateStreakHUD();
    Sound.playWrong();

    this.userAnswers.push({
      question: q,
      selectedIndex: -1, // Timed out
      isCorrect: false,
      timeSpent: this.timePerQuestion
    });

    // Highlight correct answer
    const optButtons = this.quizOptionsContainer.querySelectorAll(".option-btn");
    optButtons.forEach(btn => btn.disabled = true);
    if (optButtons[q.correct]) {
      optButtons[q.correct].classList.add("correct");
    }

    // Show Explanation
    if (q.explanation) {
      this.quizExplanationText.textContent = `Time's up! ${q.explanation}`;
      this.quizExplanationCard.classList.add("show");
    }

    this.btnNextQuestion.style.display = "inline-flex";
    if (this.currentIndex === this.activeQuestions.length - 1) {
      this.btnNextQuestion.innerHTML = `<span>Finish Quiz</span><span>🏁</span>`;
    } else {
      this.btnNextQuestion.innerHTML = `<span>Next Question</span><span>➔</span>`;
    }
  }

  nextQuestion() {
    this.currentIndex += 1;
    this.loadQuestion(this.currentIndex);
  }

  // ==========================================
  // Scoring & XP Calculation
  // ==========================================
  getBaseXP() {
    const diffXP = { easy: 100, medium: 150, hard: 200, survival: 250 };
    return diffXP[this.selectedDifficulty] || 100;
  }

  calculateQuestionXP() {
    const base = this.getBaseXP();
    // Streak multiplier: 1x, 1.25x, 1.5x, 1.75x, 2x...
    const multiplier = 1 + Math.min(1.5, (this.streak - 1) * 0.25);
    return Math.round(base * multiplier);
  }

  updateStreakHUD() {
    if (this.streak >= 2) {
      this.quizHudStreak.style.display = "inline-flex";
      this.quizStreakCount.textContent = this.streak;
    } else {
      this.quizHudStreak.style.display = "none";
    }
  }

  // ==========================================
  // Lifelines
  // ==========================================
  useLifeline5050() {
    if (this.isAnswered || this.lifelines.fiftyFifty <= 0) return;
    this.lifelines.fiftyFifty -= 1;
    this.updateLifelinesUI();
    Sound.playLifeline();

    const q = this.activeQuestions[this.currentIndex];
    const optButtons = Array.from(this.quizOptionsContainer.querySelectorAll(".option-btn"));

    // Find wrong buttons
    const wrongButtons = optButtons.filter((btn, idx) => idx !== q.correct);
    this.shuffleArray(wrongButtons);

    // Strike out 2 wrong buttons
    wrongButtons.slice(0, 2).forEach(btn => {
      btn.classList.add("eliminated");
      btn.disabled = true;
    });

    this.showToast("50:50 Used: 2 incorrect answers eliminated!", "✂️");
  }

  useLifelineHint() {
    if (this.isAnswered || this.lifelines.hint <= 0) return;
    const q = this.activeQuestions[this.currentIndex];

    this.lifelines.hint -= 1;
    this.updateLifelinesUI();
    Sound.playLifeline();

    const hintMsg = q.hint || "Think carefully about the key concepts in this question.";
    this.quizHintText.textContent = hintMsg;
    this.quizHintBox.classList.add("show");
    this.showToast("Clue revealed!", "💡");
  }

  useLifelineFreeze() {
    if (this.isAnswered || this.lifelines.freeze <= 0) return;
    this.lifelines.freeze -= 1;
    this.updateLifelinesUI();
    Sound.playLifeline();

    this.timeRemaining += 15;
    this.updateTimerDisplay();
    this.showToast("+15 Seconds Added to Timer!", "⏱️");
  }

  useLifelineSkip() {
    if (this.isAnswered || this.lifelines.skip <= 0) return;
    this.lifelines.skip -= 1;
    this.updateLifelinesUI();
    Sound.playLifeline();

    clearInterval(this.timer);
    this.showToast("Question skipped!", "⏭️");
    this.nextQuestion();
  }

  updateLifelinesUI() {
    this.count5050.textContent = this.lifelines.fiftyFifty;
    this.countHint.textContent = this.lifelines.hint;
    this.countFreeze.textContent = this.lifelines.freeze;
    this.countSkip.textContent = this.lifelines.skip;

    this.btnLifeline5050.disabled = this.lifelines.fiftyFifty <= 0;
    this.btnLifelineHint.disabled = this.lifelines.hint <= 0;
    this.btnLifelineFreeze.disabled = this.lifelines.freeze <= 0;
    this.btnLifelineSkip.disabled = this.lifelines.skip <= 0;
  }

  // ==========================================
  // Results & Summary
  // ==========================================
  finishQuiz() {
    if (this.timer) clearInterval(this.timer);

    const totalQuestions = this.activeQuestions.length;
    const accuracy = Math.round((this.score / totalQuestions) * 100);
    const timeTakenSeconds = Math.round((Date.now() - this.quizStartTime) / 1000);

    // Save record to Storage & Check Badges
    const { newBadges } = Storage.recordQuizFinished({
      category: this.selectedCategory,
      difficulty: this.selectedDifficulty,
      score: this.score,
      totalQuestions,
      xpEarned: this.xpEarned,
      maxStreak: this.maxStreak,
      accuracy,
      timeTakenSeconds
    });

    // Calculate Grade
    let grade = "C";
    let title = "Quiz Completed!";
    let subtitle = "Good effort! Keep practicing to improve your score.";

    if (accuracy === 100) {
      grade = "S";
      title = "Flawless Victory!";
      subtitle = "Absolute perfection! You mastered every single question.";
    } else if (accuracy >= 80) {
      grade = "A";
      title = "Outstanding Performance!";
      subtitle = "Impressive trivia skills! You rank among the top scorers.";
    } else if (accuracy >= 60) {
      grade = "B";
      title = "Great Job!";
      subtitle = "Solid performance! You have a strong grasp of the material.";
    } else if (accuracy >= 40) {
      grade = "C";
      title = "Good Attempt!";
      subtitle = "You are on the right track! Review the answers to level up.";
    } else {
      grade = "F";
      title = "Keep Practicing!";
      subtitle = "Trivia takes time and study. Try reviewing your mistakes!";
    }

    // Populate Results Screen
    this.resultGrade.textContent = grade;
    this.resultTitle.textContent = title;
    this.resultSubtitle.textContent = subtitle;
    this.resultScore.textContent = `${this.score}/${totalQuestions}`;
    this.resultAccuracy.textContent = `${accuracy}%`;
    this.resultMaxStreak.textContent = `${this.maxStreak}x`;
    this.resultTimeTaken.textContent = `${timeTakenSeconds}s`;
    this.resultXpText.textContent = `+${this.xpEarned} XP Earned`;

    // Render Unlocked Badges in Result Screen
    this.resultBadgesTray.innerHTML = "";
    if (newBadges && newBadges.length > 0) {
      newBadges.forEach(b => {
        const badgeElem = document.createElement("div");
        badgeElem.className = "badge-pill";
        badgeElem.innerHTML = `<span>${b.icon}</span><span>Unlocked: ${b.title}</span>`;
        this.resultBadgesTray.appendChild(badgeElem);
      });
    }

    // Enable / Disable "Practice Missed" button
    const missedQuestions = this.userAnswers.filter(a => !a.isCorrect).map(a => a.question);
    if (missedQuestions.length > 0) {
      this.btnRetryMissed.style.display = "inline-flex";
      this.btnRetryMissed.innerHTML = `<span>🎯</span> Practice Missed (${missedQuestions.length})`;
    } else {
      this.btnRetryMissed.style.display = "none";
    }

    // Switch view
    this.switchView("view-results");

    // Play Victory sounds and shoot confetti if grade S or A
    if (accuracy >= 70) {
      Sound.playVictory();
      Confetti.start(4000, accuracy === 100 ? 180 : 120);
    } else {
      Sound.playCorrect();
    }
  }

  retryMissedQuestions() {
    const missedQuestions = this.userAnswers.filter(a => !a.isCorrect).map(a => a.question);
    if (missedQuestions.length === 0) return;
    this.startQuiz(missedQuestions);
  }

  // ==========================================
  // Review Modal
  // ==========================================
  openReviewModal() {
    this.reviewListContainer.innerHTML = "";

    if (this.userAnswers.length === 0) {
      this.reviewListContainer.innerHTML = `<p style="color: var(--text-secondary);">No completed questions to review yet.</p>`;
    } else {
      this.userAnswers.forEach((record, idx) => {
        const item = document.createElement("div");
        item.className = `review-item ${record.isCorrect ? "is-correct" : "is-wrong"}`;

        const chosenText = record.selectedIndex >= 0 ? record.question.options[record.selectedIndex] : "Timed Out";
        const correctText = record.question.options[record.question.correct];

        item.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <div class="review-question">Q${idx + 1}. ${record.question.question}</div>
            <span class="badge-tag" style="background: ${record.isCorrect ? "var(--success-bg)" : "var(--danger-bg)"}; color: ${record.isCorrect ? "var(--success)" : "var(--danger)"};">
              ${record.isCorrect ? "✓ Correct" : "✗ Incorrect"}
            </span>
          </div>
          <div class="review-answer-row">
            <strong>Your Answer:</strong> <span style="color: ${record.isCorrect ? "var(--success)" : "var(--danger)"};">${chosenText}</span>
          </div>
          ${!record.isCorrect ? `<div class="review-answer-row"><strong>Correct Answer:</strong> <span style="color: var(--success);">${correctText}</span></div>` : ""}
          ${record.question.explanation ? `<div class="review-explanation"><strong>💡 Explanation:</strong> ${record.question.explanation}</div>` : ""}
        `;
        this.reviewListContainer.appendChild(item);
      });
    }

    this.openModal("modal-review");
  }

  // ==========================================
  // Stats & Badges Modal
  // ==========================================
  openStatsModal() {
    const levelInfo = Storage.getLevelInfo();

    this.statsModalLevelTitle.textContent = `Level ${levelInfo.level} • ${levelInfo.title}`;
    this.statsModalXpCounter.textContent = `${levelInfo.currentXP} / ${levelInfo.nextLevelXP} XP`;
    this.statsModalXpBar.style.width = `${levelInfo.progress}%`;

    // Render Category Breakdown Bars
    this.statsCategoryBreakdown.innerHTML = "";
    Object.keys(CATEGORIES).forEach(catKey => {
      if (catKey === "all") return;
      const cat = CATEGORIES[catKey];
      const statsObj = Storage.stats.categories[catKey] || { total: 0, correct: 0 };
      const catAccuracy = statsObj.total > 0 ? Math.round((statsObj.correct / statsObj.total) * 100) : 0;

      const item = document.createElement("div");
      item.className = "category-progress-item";
      item.innerHTML = `
        <div class="cat-progress-meta">
          <span>${cat.name}</span>
          <span>${statsObj.correct}/${statsObj.total} (${catAccuracy}%)</span>
        </div>
        <div class="cat-progress-bg">
          <div class="cat-progress-bar" style="width: ${catAccuracy}%; background: ${cat.color};"></div>
        </div>
      `;
      this.statsCategoryBreakdown.appendChild(item);
    });

    // Render Badges Grid
    this.statsBadgesGrid.innerHTML = "";
    ACHIEVEMENTS_LIST.forEach(badge => {
      const isUnlocked = Storage.stats.unlockedBadges.includes(badge.id);
      const card = document.createElement("div");
      card.className = `badge-card ${isUnlocked ? "unlocked" : "locked"}`;
      card.innerHTML = `
        <div class="badge-card-icon">${badge.icon}</div>
        <div class="badge-card-title">${badge.title}</div>
        <div class="badge-card-desc">${badge.description}</div>
      `;
      this.statsBadgesGrid.appendChild(card);
    });

    this.openModal("modal-stats");
  }

  // ==========================================
  // Custom Quiz Deck Builder
  // ==========================================
  openCustomDeckModal() {
    this.renderCustomQuestionsList();
    this.openModal("modal-custom");
  }

  renderCustomQuestionsList() {
    const decks = Storage.customDecks;
    this.customDeckCount.textContent = decks.length;
    this.customQuestionsList.innerHTML = "";

    if (decks.length === 0) {
      this.customQuestionsList.innerHTML = `
        <p style="font-size: 0.85rem; color: var(--text-muted); text-align: center; padding: 1rem;">
          No custom questions yet. Add some using the form above!
        </p>
      `;
      return;
    }

    decks.forEach((q, idx) => {
      const item = document.createElement("div");
      item.className = "review-item";
      item.style.padding = "0.85rem 1rem";
      item.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-weight: 600; font-size: 0.9rem; max-width: 80%;">Q${idx + 1}. ${q.question}</div>
          <button class="icon-btn btn-delete-custom" data-index="${idx}" style="width: 32px; height: 32px; color: var(--danger);" title="Delete Question">🗑️</button>
        </div>
        <div style="font-size: 0.8rem; color: var(--success); margin-top: 0.35rem;">
          Correct: ${q.options[q.correct]}
        </div>
      `;

      item.querySelector(".btn-delete-custom").addEventListener("click", () => {
        this.deleteCustomQuestion(idx);
      });

      this.customQuestionsList.appendChild(item);
    });
  }

  addCustomQuestion() {
    const qText = document.getElementById("custom-q-text").value.trim();
    const opt0 = document.getElementById("custom-opt-0").value.trim();
    const opt1 = document.getElementById("custom-opt-1").value.trim();
    const opt2 = document.getElementById("custom-opt-2").value.trim();
    const opt3 = document.getElementById("custom-opt-3").value.trim();
    const hint = document.getElementById("custom-q-hint").value.trim();
    const explanation = document.getElementById("custom-q-explanation").value.trim();

    const correctRadio = document.querySelector('input[name="custom-correct"]:checked');
    const correctIndex = correctRadio ? parseInt(correctRadio.value, 10) : 0;

    if (!qText || !opt0 || !opt1 || !opt2 || !opt3) {
      this.showToast("Please fill in the question and all 4 options.", "⚠️");
      return;
    }

    const newQuestion = {
      id: `custom-${Date.now()}`,
      category: "custom",
      difficulty: "medium",
      question: qText,
      options: [opt0, opt1, opt2, opt3],
      correct: correctIndex,
      hint: hint || undefined,
      explanation: explanation || undefined
    };

    const updatedDecks = [...Storage.customDecks, newQuestion];
    Storage.saveCustomDecks(updatedDecks);

    // Reset Form
    this.formCustomQuestion.reset();
    document.querySelector('input[name="custom-correct"][value="0"]').checked = true;

    this.renderCustomQuestionsList();
    this.renderCategoryCards();
    this.showToast("Question added to Custom Deck!", "✅");
    Sound.playCorrect();
  }

  deleteCustomQuestion(index) {
    const updated = Storage.customDecks.filter((_, i) => i !== index);
    Storage.saveCustomDecks(updated);
    this.renderCustomQuestionsList();
    this.renderCategoryCards();
    this.showToast("Question deleted.", "🗑️");
  }

  exportCustomDeck() {
    const decks = Storage.customDecks;
    if (decks.length === 0) {
      this.showToast("No custom questions to export.", "⚠️");
      return;
    }

    const jsonStr = JSON.stringify(decks, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quizmaster-custom-deck-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast("Custom deck downloaded as JSON!", "📥");
  }

  importCustomDeck(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!Array.isArray(imported)) {
          throw new Error("Invalid JSON format: Expected an array of questions.");
        }

        // Validate basic structure
        const validQuestions = imported.filter(q => q.question && Array.isArray(q.options) && q.options.length >= 2 && typeof q.correct === "number");

        if (validQuestions.length === 0) {
          throw new Error("No valid questions found in file.");
        }

        const combined = [...Storage.customDecks, ...validQuestions];
        Storage.saveCustomDecks(combined);
        this.renderCustomQuestionsList();
        this.renderCategoryCards();
        this.showToast(`Imported ${validQuestions.length} custom questions!`, "🎉");
        Sound.playVictory();
      } catch (err) {
        alert("Failed to import quiz deck: " + err.message);
      }
    };
    reader.readAsText(file);
    event.target.value = ""; // Reset file input
  }

  // ==========================================
  // Social Share & Scorecard
  // ==========================================
  shareScoreCard() {
    const accuracy = this.resultAccuracy.textContent;
    const score = this.resultScore.textContent;
    const grade = this.resultGrade.textContent;

    const shareText = `🎯 I scored ${score} (${accuracy} - Rank ${grade}) on QuizMaster Pro! Test your trivia knowledge at: https://github.com/`;

    if (navigator.share) {
      navigator.share({
        title: "QuizMaster Pro Scorecard",
        text: shareText
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText).then(() => {
        this.showToast("Scorecard copied to clipboard!", "📋");
      });
    } else {
      alert(shareText);
    }
  }

  // ==========================================
  // View & UI Utilities
  // ==========================================
  switchView(viewId) {
    document.querySelectorAll(".view-screen").forEach(v => v.classList.remove("active"));
    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("show");
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("show");
  }

  updateHeaderLevel() {
    const levelInfo = Storage.getLevelInfo();
    this.headerLevelText.textContent = `Lvl ${levelInfo.level} • ${levelInfo.title}`;
  }

  updateHomeStats() {
    const stats = Storage.stats;
    this.statQuizzesCompleted.textContent = stats.quizzesCompleted;
    const accuracy = stats.totalQuestions > 0 ? Math.round((stats.totalCorrect / stats.totalQuestions) * 100) : 0;
    this.statAccuracy.textContent = `${accuracy}%`;
    this.statBestStreak.textContent = `${stats.highestStreak}x`;
    this.statTotalXP.textContent = stats.totalXP.toLocaleString();
  }

  loadTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME) || "dark";
    document.documentElement.setAttribute("data-theme", saved);
    this.btnToggleTheme.textContent = saved === "dark" ? "🌙" : "☀️";
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEYS.THEME, next);
    this.btnToggleTheme.textContent = next === "dark" ? "🌙" : "☀️";
  }

  updateSoundButtonUI() {
    this.btnToggleSound.textContent = Sound.isMuted ? "🔇" : "🔊";
  }

  showToast(message, icon = "⚡") {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}

// Instantiate QuizApp on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  window.quizApp = new QuizApp();
});
