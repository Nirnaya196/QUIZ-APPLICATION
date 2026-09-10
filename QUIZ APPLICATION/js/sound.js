/**
 * Sound Synthesizer using Native Web Audio API
 * 100% offline, zero external audio asset dependencies.
 */

class SoundEngine {
  constructor() {
    this.audioCtx = null;
    this.isMuted = localStorage.getItem("quizmaster_muted") === "true";
  }

  // Lazy initialize AudioContext on user interaction
  init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem("quizmaster_muted", this.isMuted);
    return this.isMuted;
  }

  playTone(freq, type = "sine", duration = 0.1, gainVal = 0.15, startTime = 0) {
    if (this.isMuted) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + startTime);

      gain.gain.setValueAtTime(gainVal, this.audioCtx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + startTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(this.audioCtx.currentTime + startTime);
      osc.stop(this.audioCtx.currentTime + startTime + duration);
    } catch (e) {
      console.warn("Audio synthesis error:", e);
    }
  }

  playClick() {
    this.playTone(800, "sine", 0.05, 0.08);
  }

  playCorrect() {
    if (this.isMuted) return;
    this.init();
    // Ascending arpeggio C5 -> E5 -> G5 -> C6
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, "triangle", 0.18, 0.12, idx * 0.07);
    });
  }

  playWrong() {
    if (this.isMuted) return;
    this.init();
    // Low harsh buzzer
    this.playTone(180, "sawtooth", 0.25, 0.15, 0);
    this.playTone(140, "sawtooth", 0.35, 0.15, 0.1);
  }

  playTick() {
    this.playTone(1200, "triangle", 0.03, 0.04);
  }

  playWarningTick() {
    this.playTone(1600, "square", 0.05, 0.06);
  }

  playLifeline() {
    if (this.isMuted) return;
    this.init();
    // Shimmering chime
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      this.playTone(freq, "sine", 0.2, 0.08, idx * 0.05);
    });
  }

  playStreak() {
    if (this.isMuted) return;
    this.init();
    // Energetic fanfare chime
    const notes = [587.33, 739.99, 880, 1174.66];
    notes.forEach((freq, idx) => {
      this.playTone(freq, "sine", 0.22, 0.12, idx * 0.06);
    });
  }

  playVictory() {
    if (this.isMuted) return;
    this.init();
    // Triumphant victory chord progression
    const chord1 = [523.25, 659.25, 783.99]; // C Major
    const chord2 = [587.33, 739.99, 880.00]; // D Major
    const chord3 = [659.25, 830.61, 987.77]; // E Major
    const chord4 = [1046.50, 1318.51, 1567.98]; // High C Major

    const chords = [
      { notes: chord1, start: 0, dur: 0.18 },
      { notes: chord2, start: 0.15, dur: 0.18 },
      { notes: chord3, start: 0.30, dur: 0.22 },
      { notes: chord4, start: 0.50, dur: 0.6 }
    ];

    chords.forEach(c => {
      c.notes.forEach(note => {
        this.playTone(note, "triangle", c.dur, 0.1, c.start);
      });
    });
  }
}

// Global instance
const Sound = new SoundEngine();
