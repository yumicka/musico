import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let notes = [];

    class MusicNote {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 25 + 20; 
        this.speedX = Math.random() * 0.6 - 0.3;
        this.speedY = Math.random() * 0.6 - 0.3;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.color = `rgba(26, 165, 140, ${this.opacity})`;
        this.floatSpeed = Math.random() * 0.02 + 0.01;
        this.floatTime = Math.random() * Math.PI * 2;
      }

      update() {
        this.floatTime += this.floatSpeed;
        const floatOffset = Math.sin(this.floatTime) * 0.5;
        
        this.x += this.speedX;
        this.y += this.speedY + floatOffset;
        
        if (this.x < -30) {
          this.x = canvas.width + 30;
        } else if (this.x > canvas.width + 30) {
          this.x = -30;
        }
        
        if (this.y < -30) {
          this.y = canvas.height + 30;
        } else if (this.y > canvas.height + 30) {
          this.y = -30;
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        ctx.font = `${this.size}px "Segoe UI Emoji", "Apple Color Emoji", sans-serif`;
        ctx.fillStyle = this.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.fillText('♪', this.x, this.y);
        ctx.restore();
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNotes = () => {
      notes = [];
      const noteCount = Math.min(25, Math.floor(canvas.width * canvas.height / 30000));
      
      console.log(`Creating ${noteCount} notes`);
      
      for (let i = 0; i < noteCount; i++) {
        notes.push(new MusicNote());
      }
    };

    const animate = () => {
      if (Date.now() % 3 === 0) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      for (let i = 0; i < notes.length; i++) {
        notes[i].update();
        notes[i].draw();
      }

      setTimeout(() => {
        animationFrameId = requestAnimationFrame(animate);
      }, 33);
    };

    resizeCanvas();
    initNotes();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initNotes();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        imageRendering: 'optimizeQuality',
      }}
    />
  );
}