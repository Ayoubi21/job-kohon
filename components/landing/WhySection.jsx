import React from 'react';
import { Zap, Target, Heart, Headphones } from 'lucide-react';

export default function WhySection() {
  const benefits = [
    {
      icon: Zap,
      title: 'Blitzschnelle Bewerbung',
      description: 'Mit nur wenigen Klicks zu deiner Bewerbung. Kein kompliziertes Formular, keine lange Wartezeit.',
      color: '#5ab39d'
    },
    {
      icon: Target,
      title: 'Perfektes Matching',
      description: 'Unsere KI findet die Jobs, die wirklich zu dir passen. Basierend auf deinen Skills und Präferenzen.',
      color: '#4a9b8a'
    },
    {
      icon: Heart,
      title: '100 % kostenlos für Kandidaten',
      description: 'Vollkommen kostenfrei. Keine versteckten Gebühren, keine Abonnements.',
      color: '#3d7a6c'
    },
    {
      icon: Headphones,
      title: 'Persönlicher Support',
      description: 'Unser Team ist jederzeit für dich da – freundlich, kompetent und schnell.',
      color: '#2e6054'
    }
  ];

  return (
    <section className="py-16"
      style={{
        background: '#2d2d2d'
      }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-white/90 mb-2">
            Warum JobKurb?
          </h2>
          <p className="text-base text-white/60 max-w-2xl mx-auto">
            Wir machen Jobsuche einfach, transparenter und erfolgreicher.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, idx) => (
            <button
              key={idx}
              className="group text-left p-6 rounded-3xl transition-all duration-300 hover:scale-105 focus:outline-none"
              style={{
                background: 'rgba(90, 179, 157, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(90, 179, 157, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(90, 179, 157, 0.15)';
                e.currentTarget.style.boxShadow = `0 12px 40px ${benefit.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(90, 179, 157, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{
                  background: `${benefit.color}20`,
                  boxShadow: `0 8px 24px ${benefit.color}20`
                }}
              >
                <benefit.icon className="w-6 h-6" style={{ color: benefit.color }} />
              </div>
              <h3 className="text-lg font-bold text-white/90 mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {benefit.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}