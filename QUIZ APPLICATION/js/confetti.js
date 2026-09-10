/**
 * Lightweight HTML5 Canvas Confetti Animation Engine
 */

class ConfettiManager {
  constructor(canvasId = "confetti-canvas") {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext("2d") : null;
    this.particles = [];
    this.animationFrame = null;
    this.isActive = false;

    this.colors = [
      "#6366f1", "#a855f7", "#ec4899", "#10b981",
      "#f59e0b", "#06b6d4", "#3b82f6", "#f43f5e"
    ];

    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  start(durationMs = 3500, particleCount = 140) {
    if (!this.canvas) {
      this.canvas = document.getElementById("confetti-canvas");
      if (this.canvas) this.ctx = this.canvas.getContext("2d");
    }
    if (!this.canvas || !this.ctx) return;

    this.resize();
    this.particles = [];
    this.isActive = true;

    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * -this.canvas.height * 0.5,
        size: Math.random() * 8 + 6,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * 4 + 3,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        shape: Math.random() > 0.4 ? "rect" : "circle"
      });
    }

    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);
    this.animate();

    setTimeout(() => {
      this.stop();
    }, durationMs);
  }

  stop() {
    this.isActive = false;
  }

  animate() {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let hasVisibleParticles = false;

    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.vy += 0.05; // gravity

      if (p.y > this.canvas.height - 20) {
        p.opacity -= 0.02;
      }

      if (p.opacity > 0 && p.y < this.canvas.height + 50) {
        hasVisibleParticles = true;
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = Math.max(0, p.opacity);
        this.ctx.fillStyle = p.color;

        if (p.shape === "rect") {
          this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.ctx.restore();
      }
    }

    if (hasVisibleParticles && (this.isActive || this.particles.some(p => p.opacity > 0))) {
      this.animationFrame = requestAnimationFrame(() => this.animate());
    } else {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.particles = [];
    }
  }
}

const Confetti = new ConfettiManager();
