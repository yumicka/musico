import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let notes = [];

    // Только символы нот без палок
    const noteSymbols = ['♪', '♪', '♪', '♪', '♪']; // Много восьмых нот
    
    // Цвета в оттенках #1aa58c
    const noteColors = [
      'rgba(26, 165, 140, 0.8)',   // основной прозрачный
      'rgba(26, 165, 140, 0.6)',
      'rgba(38, 185, 154, 0.7)',
      'rgba(20, 143, 119, 0.7)',
      'rgba(45, 214, 182, 0.6)'
    ];

    class MusicNote {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.symbol = '♪'; // Всегда простая нота
        this.size = Math.random() * 24 + 20; // Размер 20-44px
        this.speedX = Math.random() * 1.2 - 0.6; // Более медленное движение
        this.speedY = Math.random() * 1.2 - 0.6;
        this.color = noteColors[Math.floor(Math.random() * noteColors.length)];
        this.opacity = Math.random() * 0.5 + 0.3; // Более видимые
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = Math.random() * 0.02 - 0.01; // Медленное вращение
        this.floatAmplitude = Math.random() * 2 + 1; // Амплитуда парения
        this.floatSpeed = Math.random() * 0.02 + 0.01;
        this.floatTime = Math.random() * Math.PI * 2;
        this.pulseAmplitude = Math.random() * 0.2 + 0.1; // Пульсация размера
        this.pulseSpeed = Math.random() * 0.03 + 0.02;
        this.pulseTime = Math.random() * Math.PI * 2;
      }

      update() {
        // Движение по прямой
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Парение (синусоидальное движение)
        this.floatTime += this.floatSpeed;
        this.y += Math.sin(this.floatTime) * this.floatAmplitude;
        
        // Медленное вращение
        this.rotation += this.rotationSpeed;
        
        // Пульсация размера
        this.pulseTime += this.pulseSpeed;
        const pulseFactor = Math.sin(this.pulseTime) * this.pulseAmplitude;
        this.currentSize = this.size * (1 + pulseFactor);
        
        // Появление с другой стороны при выходе за границы
        if (this.x < -50) this.x = canvas.width + 50;
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.y < -50) this.y = canvas.height + 50;
        if (this.y > canvas.height + 50) this.y = -50;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        
        // Рисуем символ ноты с тенью
        ctx.font = `bold ${this.currentSize}px 'Segoe UI Emoji', 'Apple Color Emoji', sans-serif`;
        ctx.fillStyle = this.color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Мягкая тень для объема
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fillText(this.symbol, 0, 0);
        
        // Убираем тень для следующего элемента
        ctx.shadowBlur = 0;
        
        ctx.restore();
      }
    }

    // Частицы для дополнительного эффекта
    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = color;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.life = 1;
        this.decay = Math.random() * 0.02 + 0.01;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;
        this.opacity = this.life * this.opacity;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initNotes = () => {
      notes = [];
      // Больше нот для эффекта
      const noteCount = Math.min(Math.floor(canvas.width * canvas.height / 20000), 50);
      for (let i = 0; i < noteCount; i++) {
        notes.push(new MusicNote());
      }
    };

    const createParticles = () => {
      // Создаем частицы от нот время от времени
      if (Math.random() < 0.3) {
        const note = notes[Math.floor(Math.random() * notes.length)];
        const particleCount = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(note.x, note.y, note.color));
        }
      }
    };

    const updateParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        if (particles[i].life <= 0) {
          particles.splice(i, 1);
        }
      }
    };

    const drawParticles = () => {
      particles.forEach(particle => particle.draw());
    };

    const drawConnections = () => {
      // Соединения между близкими нотами
      for (let i = 0; i < notes.length; i++) {
        for (let j = i + 1; j < notes.length; j++) {
          const dx = notes[i].x - notes[j].x;
          const dy = notes[i].y - notes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            const opacity = 0.1 * (1 - distance / 180);
            
            ctx.beginPath();
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(26, 165, 140, ${opacity})`;
            
            // Кривая Безье для изогнутого соединения
            const cp1x = notes[i].x + (dx * 0.3);
            const cp1y = notes[i].y + (dy * 0.3);
            const cp2x = notes[j].x - (dx * 0.3);
            const cp2y = notes[j].y - (dy * 0.3);
            
            ctx.moveTo(notes[i].x, notes[i].y);
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, notes[j].x, notes[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      // Полупрозрачный черный фон для эффекта шлейфа
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Создаем новые частицы
      createParticles();
      
      // Обновляем частицы
      updateParticles();
      
      // Рисуем частицы
      drawParticles();

      // Обновляем и рисуем ноты
      notes.forEach(note => {
        note.update();
        note.draw();
      });

      // Рисуем соединения
      drawConnections();

      animationFrameId = requestAnimationFrame(animate);
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
      className="absolute inset-0 w-full h-full"
      style={{ 
        position: 'fixed', 
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}