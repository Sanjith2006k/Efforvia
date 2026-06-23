import { useEffect, useRef } from "react";

export default function FlowFieldBackground({
  color = "#818CF8",
  trailOpacity = 0.1,
  particleCount = 600,
  speed = 0.8,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");

    let width = container.clientWidth;
    let height = container.clientHeight;

    let particles = [];
    let animationFrameId;

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = 0;
        this.vy = 0;
        this.age = 0;
        this.life = Math.random() * 200 + 100;
      }

      update() {
        const angle =
          (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;

        this.vx += Math.cos(angle) * 0.2 * speed;
        this.vy += Math.sin(angle) * 0.2 * speed;

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.95;
        this.vy *= 0.95;

        this.age++;

        if (this.age > this.life) {
          this.reset();
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw(ctx) {
        ctx.fillStyle = color;

        const alpha = 1 - Math.abs(this.age / this.life - 0.5) * 2;

        ctx.globalAlpha = alpha;

        ctx.fillRect(this.x, this.y, 1.5, 1.5);
      }
    }

    function init() {
      canvas.width = width;
      canvas.height = height;

      particles = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      ctx.fillStyle = `rgba(0,0,0,${trailOpacity})`;

      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [color, trailOpacity, particleCount, speed]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
