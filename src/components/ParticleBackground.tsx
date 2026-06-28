"use client";
import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = 0, h = 0;
    let particles: Particle[] = [];
    let anchors: { x: number; y: number }[] = [];
    let sweepProgress = 0;
    let animId: number;

    const PARTICLE_COUNT = 72;
    const MAX_DISTANCE = 160;
    const COLORS = ["#7c3aed", "#67e8f9", "#00d4aa"];

    const holoNodes = [
      [0.15, 0.25], [0.82, 0.20], [0.10, 0.72],
      [0.88, 0.68], [0.50, 0.15], [0.50, 0.85],
    ];

    function rand(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    class Particle {
      x: number; y: number;
      vx: number; vy: number;
      radius: number; color: string;
      pulse: number; nextPulse: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        const speed = rand(0.08, 0.35);
        const angle = rand(0, Math.PI * 2);
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = rand(1.2, 3.2);
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.pulse = 0;
        this.nextPulse = performance.now() + rand(1000, 8000);
      }

      update(time: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -10) this.x = w + 10;
        if (this.x > w + 10) this.x = -10;
        if (this.y < -10) this.y = h + 10;
        if (this.y > h + 10) this.y = -10;
        if (time > this.nextPulse) {
          this.pulse = 1;
          this.nextPulse = time + rand(2500, 9000);
        }
        this.pulse *= 0.97;
      }

      draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        if (this.pulse > 0.02) {
          const glow = 20 * this.pulse;
          const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glow);
          grad.addColorStop(0, "rgba(167,139,250,0.6)");
          grad.addColorStop(1, "rgba(167,139,250,0)");
          ctx.beginPath();
          ctx.fillStyle = grad;
          ctx.arc(this.x, this.y, glow, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function resize() {
      w = canvas!.width = window.innerWidth;
      h = canvas!.height = window.innerHeight;
      anchors = [
        { x: w * 0.18, y: h * 0.22 },
        { x: w * 0.78, y: h * 0.25 },
        { x: w * 0.25, y: h * 0.75 },
        { x: w * 0.80, y: h * 0.70 },
      ];
    }

    function createParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());
    }

    function drawConnections() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_DISTANCE) {
            const alpha = (1 - dist / MAX_DISTANCE) * 0.18;
            ctx.strokeStyle = `rgba(124,58,237,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function drawAnchorNodes(time: number) {
      anchors.forEach((a, index) => {
        const pulse = (Math.sin(time * 0.0005 + index * 2) + 1) * 0.5;
        const glowRadius = 40 + pulse * 20;
        const grad = ctx.createRadialGradient(a.x, a.y, 0, a.x, a.y, glowRadius);
        grad.addColorStop(0, "rgba(0,212,170,0.18)");
        grad.addColorStop(1, "rgba(0,212,170,0)");
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(a.x, a.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.fillStyle = "#00d4aa";
        ctx.arc(a.x, a.y, 4 + pulse * 2, 0, Math.PI * 2);
        ctx.fill();
        for (let k = 0; k < 6; k++) {
          const p = particles[(index * 17 + k * 5) % particles.length];
          const dist = Math.hypot(a.x - p.x, a.y - p.y);
          if (dist < 260) {
            const alpha = (1 - dist / 260) * 0.15;
            ctx.strokeStyle = `rgba(0,212,170,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      });
    }

    function drawSweepBeam() {
      sweepProgress += 0.0005;
      if (sweepProgress > 1.6) sweepProgress = -0.4;
      const diag = Math.sqrt(w * w + h * h);
      const pos = sweepProgress * diag;
      ctx.save();
      ctx.translate(pos - diag * 0.2, 0);
      ctx.rotate(-Math.PI / 4);
      const beamWidth = 180;
      const grad = ctx.createLinearGradient(-beamWidth, 0, beamWidth, 0);
      grad.addColorStop(0, "rgba(103,232,249,0)");
      grad.addColorStop(0.5, "rgba(103,232,249,0.035)");
      grad.addColorStop(1, "rgba(103,232,249,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(-beamWidth, -diag, beamWidth * 2, diag * 2);
      ctx.restore();
    }

    function drawHoloNetwork(time: number) {
      const pts = holoNodes.map((n) => ({ x: n[0] * w, y: n[1] * h }));
      ctx.strokeStyle = "rgba(103,232,249,0.10)";
      ctx.lineWidth = 1.2;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dist = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (dist < 320) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
            const p2 = ((time * 0.00015) + (i * 0.13)) % 1;
            const sx = pts[i].x + (pts[j].x - pts[i].x) * p2;
            const sy = pts[i].y + (pts[j].y - pts[i].y) * p2;
            ctx.fillStyle = "#67e8f9";
            ctx.beginPath();
            ctx.arc(sx, sy, 2, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      pts.forEach((p) => {
        const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 30);
        gr.addColorStop(0, "rgba(103,232,249,0.20)");
        gr.addColorStop(1, "rgba(103,232,249,0)");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#67e8f9";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function drawHoloReflections(time: number) {
      for (let i = 0; i < 2; i++) {
        const x = ((time * 0.018) + (i * 600)) % (w + 500) - 250;
        const g2 = ctx.createLinearGradient(x, 0, x + 160, 0);
        g2.addColorStop(0, "rgba(255,255,255,0)");
        g2.addColorStop(0.5, "rgba(103,232,249,0.025)");
        g2.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g2;
        ctx.fillRect(x, 0, 160, h);
      }
    }

    function drawAmbientGlow() {
      const g = ctx.createLinearGradient(0, 0, w, h);
      g.addColorStop(0, "rgba(103,232,249,0.05)");
      g.addColorStop(0.4, "rgba(124,58,237,0.03)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    }

    function animate(time: number) {
      ctx.clearRect(0, 0, w, h);
      drawSweepBeam();
      drawAmbientGlow();
      particles.forEach((p) => p.update(time));
      drawConnections();
      drawAnchorNodes(time);
      particles.forEach((p) => p.draw());
      drawHoloNetwork(time);
      drawHoloReflections(time);
      animId = requestAnimationFrame(animate);
    }

    resize();
    createParticles();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
