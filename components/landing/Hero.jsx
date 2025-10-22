import React, { useEffect, useRef } from 'react';
import { Sparkles, ChevronDown } from 'lucide-react';

export default function Hero({ onFilterOpen }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Large organic circles
    const circles = [
      { x: canvas.width * 0.2, y: canvas.height * 0.3, radius: 300, opacity: 0.03 },
      { x: canvas.width * 0.7, y: canvas.height * 0.6, radius: 250, opacity: 0.04 },
      { x: canvas.width * 0.5, y: canvas.height * 0.8, radius: 200, opacity: 0.03 }
    ];

    // Abstract lines and shapes
    const drawAbstractShapes = () => {
      // Vertical lines
      ctx.strokeStyle = 'rgba(90, 179, 157, 0.08)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const x = (canvas.width / 6) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let i = 0; i < 4; i++) {
        const y = (canvas.height / 5) * (i + 1);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Diagonal lines
      ctx.strokeStyle = 'rgba(90, 179, 157, 0.05)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.2);
      ctx.lineTo(canvas.width, canvas.height * 0.8);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.3, 0);
      ctx.lineTo(canvas.width * 0.7, canvas.height);
      ctx.stroke();

      // Small decorative circles
      ctx.fillStyle = 'rgba(90, 179, 157, 0.1)';
      const smallCircles = [
        { x: canvas.width * 0.1, y: canvas.height * 0.15, r: 3 },
        { x: canvas.width * 0.85, y: canvas.height * 0.25, r: 4 },
        { x: canvas.width * 0.15, y: canvas.height * 0.7, r: 2 },
        { x: canvas.width * 0.9, y: canvas.height * 0.6, r: 3 },
      ];
      smallCircles.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Abstract rectangles
      ctx.strokeStyle = 'rgba(90, 179, 157, 0.06)';
      ctx.lineWidth = 1;
      ctx.strokeRect(canvas.width * 0.1, canvas.height * 0.4, 60, 40);
      ctx.strokeRect(canvas.width * 0.8, canvas.height * 0.2, 50, 50);
      ctx.strokeRect(canvas.width * 0.15, canvas.height * 0.75, 40, 30);
    };

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw abstract shapes first
      drawAbstractShapes();

      // Draw organic circles on top
      circles.forEach((circle) => {
        const gradient = ctx.createRadialGradient(
          circle.x, circle.y, 0,
          circle.x, circle.y, circle.radius
        );
        gradient.addColorStop(0, `rgba(90, 179, 157, ${circle.opacity * 2})`);
        gradient.addColorStop(0.5, `rgba(74, 155, 138, ${circle.opacity})`);
        gradient.addColorStop(1, 'rgba(61, 122, 108, 0)');

        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{
        background: '#2d2d2d'
      }}>
      {/* Animated Background with Abstract Shapes */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Additional Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Corner Decoration */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-[#5ab39d]/10 rounded-full" />
        <div className="absolute top-24 left-14 w-24 h-24 border border-[#5ab39d]/5 rounded-full" />
        
        {/* Top Right Decoration */}
        <div className="absolute top-32 right-20">
          <div className="w-16 h-16 border-2 border-[#5ab39d]/10 rotate-45" />
        </div>

        {/* Bottom Left Abstract Lines */}
        <svg className="absolute bottom-20 left-10 w-32 h-32 opacity-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#5ab39d" strokeWidth="1" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#4a9b8a" strokeWidth="1" />
          <circle cx="50" cy="50" r="20" fill="none" stroke="#3d7a6c" strokeWidth="1" />
        </svg>

        {/* Bottom Right Decoration */}
        <div className="absolute bottom-32 right-16">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#5ab39d]/20 rounded-full" />
            <div className="w-2 h-2 bg-[#4a9b8a]/20 rounded-full" />
            <div className="w-2 h-2 bg-[#3d7a6c]/20 rounded-full" />
          </div>
        </div>

        {/* Middle Decorative Elements */}
        <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-20 h-20 border border-[#5ab39d]/5 rounded-2xl rotate-12" />
        </div>

        <div className="absolute top-1/3 right-1/4">
          <svg className="w-24 h-24 opacity-5" viewBox="0 0 100 100">
            <path d="M50 10 L90 90 L10 90 Z" fill="none" stroke="#5ab39d" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5ab39d] rounded-full opacity-10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4a9b8a] rounded-full opacity-10 blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        {/* USP Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6"
          style={{
            background: 'rgba(90, 179, 157, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(90, 179, 157, 0.3)',
            boxShadow: '0 8px 32px rgba(90, 179, 157, 0.2)',
            color: '#5ab39d'
          }}>
          <Sparkles className="w-3 h-3" />
          Bis zu 45 % günstiger als vergleichbare Anbieter
        </div>

        {/* Headlines */}
        <div className="space-y-3 mb-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white/95 leading-tight">
            Deutschlands modernste<br />Jobplattform
          </h1>
          <h2 className="text-lg lg:text-xl text-white/70 font-medium">
            für Kandidaten, Arbeitgeber und Auftraggeber
          </h2>
        </div>

        {/* Value Proposition */}
        <p className="text-base text-white/60 mb-8 max-w-lg mx-auto">
          Finde deinen Traumjob. Schnell, einfach, kostenlos.
        </p>

        {/* CTA Button */}
        <button
          onClick={onFilterOpen}
          className="group px-8 py-3 rounded-2xl font-semibold text-base text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#5ab39d]/30"
          style={{
            background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
            boxShadow: '0 8px 32px rgba(90, 179, 157, 0.4), 0 0 40px rgba(90, 179, 157, 0.2)'
          }}
        >
          <span className="flex items-center gap-2">
            Job entdecken
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </span>
        </button>

        {/* Trust Indicators */}
        <div className="flex flex-wrap gap-3 justify-center mt-8 text-xs text-white/60">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{
              background: 'rgba(90, 179, 157, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(90, 179, 157, 0.2)'
            }}>
            <svg className="w-3 h-3 text-[#5ab39d]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            SSL-gesichert
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl"
            style={{
              background: 'rgba(90, 179, 157, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(90, 179, 157, 0.2)'
            }}>
            <svg className="w-3 h-3 text-[#5ab39d]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            DSGVO-konform
          </div>
        </div>

        {/* Stats Pills */}
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <div className="px-4 py-2 rounded-2xl"
            style={{
              background: 'rgba(90, 179, 157, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(90, 179, 157, 0.2)',
              border: '1px solid rgba(90, 179, 157, 0.3)'
            }}>
            <div className="text-xl font-bold text-[#5ab39d]">12.847</div>
            <div className="text-xs text-white/60">Offene Stellen</div>
          </div>

          <div className="px-4 py-2 rounded-2xl"
            style={{
              background: 'rgba(74, 155, 138, 0.15)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px rgba(74, 155, 138, 0.2)',
              border: '1px solid rgba(74, 155, 138, 0.3)'
            }}>
            <div className="text-xl font-bold text-[#4a9b8a]">98%</div>
            <div className="text-xs text-white/60">Zufriedenheit</div>
          </div>
        </div>
      </div>
    </section>
  );
}