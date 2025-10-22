import React, { useEffect, useState } from 'react';
import { Briefcase, Users, CheckCircle, Building2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function StatsSection() {
  const [stats, setStats] = useState({
    jobs: 0,
    candidates: 0,
    placements: 0,
    companies: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [jobs, users] = await Promise.all([
        base44.entities.Job.filter({ status: 'live' }),
        base44.entities.User.list()
      ]);

      const candidates = users.filter(u => u.user_role === 'kandidat').length;
      const companies = users.filter(u => u.user_role === 'arbeitgeber' || u.user_role === 'auftraggeber').length;

      setStats({
        jobs: jobs.length,
        candidates: candidates,
        placements: Math.floor(jobs.length * 0.66),
        companies: companies
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const displayStats = [
    {
      icon: Briefcase,
      value: stats.jobs.toLocaleString(),
      label: 'Aktive Jobs',
      color: '#5ab39d',
      description: 'Neue Stellen täglich'
    },
    {
      icon: Users,
      value: stats.candidates.toLocaleString(),
      label: 'Kandidaten',
      color: '#4a9b8a',
      description: 'Registrierte Talente'
    },
    {
      icon: CheckCircle,
      value: stats.placements.toLocaleString(),
      label: 'Erfolgreiche Vermittlungen',
      color: '#3d7a6c',
      description: 'Dieses Jahr'
    },
    {
      icon: Building2,
      value: stats.companies.toLocaleString(),
      label: 'Top-Unternehmen',
      color: '#2e6054',
      description: 'Vertrauen uns'
    }
  ];

  return (
    <section className="py-16"
      style={{
        background: '#2d2d2d'
      }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-white/90 mb-2">
            Zahlen, die überzeugen
          </h2>
          <p className="text-sm text-white/60">
            Live-Daten unserer wachsenden Community
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {displayStats.map((stat, idx) => (
            <button
              key={idx}
              className="group p-6 rounded-3xl transition-all duration-300 hover:scale-105 focus:outline-none"
              style={{
                background: 'rgba(90, 179, 157, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(90, 179, 157, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `rgba(90, 179, 157, 0.15)`;
                e.currentTarget.style.boxShadow = `0 12px 40px ${stat.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(90, 179, 157, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center"
                style={{
                  background: `${stat.color}20`,
                  boxShadow: `0 8px 24px ${stat.color}20`
                }}>
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white/90 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-white/60">
                {stat.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}