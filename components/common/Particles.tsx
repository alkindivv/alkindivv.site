import React, { useEffect, useRef } from 'react';

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    // Ukuran partikel lebih kecil dan opacity lebih rendah untuk efek lebih halus
    const createParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth * 0.03), 60);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.12 + 0.03,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Gradasi warna emerald yang lebih halus
        ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Batasi partikel ke dalam area tampilan dengan efek "bounce"
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX = -particle.speedX * 0.5;
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY = -particle.speedY * 0.5;
        }

        // Jika partikel terlalu lambat, berikan sedikit kecepatan baru
        if (Math.abs(particle.speedX) < 0.05) {
          particle.speedX = (Math.random() - 0.5) * 0.3;
        }
        if (Math.abs(particle.speedY) < 0.05) {
          particle.speedY = (Math.random() - 0.5) * 0.3;
        }
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles.length = 0;
      createParticles();
    };

    createParticles();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none opacity-60"
      style={{ zIndex: -1 }}
    />
  );
};

export default Particles;
