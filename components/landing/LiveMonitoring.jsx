import React, { useState, useEffect } from 'react';
import { Building2, FileText, Clock, MapPin, Euro } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function LiveMonitoring() {
  const [jobListings, setJobListings] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadLiveData();
  }, []);

  const loadLiveData = async () => {
    try {
      const [jobs, orders] = await Promise.all([
        base44.entities.Job.filter({ status: 'live' }, '-created_date', 5),
        base44.entities.Order.filter({ status: 'open' }, '-created_date', 5)
      ]);

      setJobListings(jobs.map(job => ({
        company: job.company,
        title: job.title,
        location: job.location,
        time: getTimeAgo(job.created_date)
      })));

      setProjects(orders.map(order => ({
        title: order.title,
        category: order.category || 'Allgemein',
        budget: order.budget_min && order.budget_max ? `${order.budget_min}-${order.budget_max}€` : 'Nach Vereinbarung',
        time: getTimeAgo(order.created_date)
      })));
    } catch (error) {
      console.error('Error loading live data:', error);
    }
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMinutes = Math.floor((now - date) / 60000);
    
    if (diffMinutes < 60) return `${diffMinutes} Min`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)} Std`;
    return `${Math.floor(diffMinutes / 1440)} Tag${Math.floor(diffMinutes / 1440) > 1 ? 'e' : ''}`;
  };

  return (
    <section className="py-16"
      style={{
        background: '#2d2d2d'
      }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-white/90 mb-3">
            Live Monitoring
          </h2>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-white/60"
            style={{
              background: 'rgba(90, 179, 157, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(90, 179, 157, 0.3)'
            }}>
            <span className="w-2 h-2 bg-[#5ab39d] rounded-full animate-pulse" style={{ boxShadow: '0 0 8px #5ab39d' }} />
            Echtzeit-Übersicht • Live-Daten
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Arbeitgeber - Jobs */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(90, 179, 157, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(90, 179, 157, 0.2)'
            }}
          >
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'rgba(90, 179, 157, 0.2)',
                    boxShadow: '0 8px 24px rgba(90, 179, 157, 0.2)'
                  }}
                >
                  <Building2 className="w-5 h-5 text-[#5ab39d]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white/90">Arbeitgeber</h3>
                  <p className="text-xs text-white/60">Live veröffentlichte Jobanzeigen</p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-2 max-h-80 overflow-y-auto">
              {jobListings.length > 0 ? (
                jobListings.map((job, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <div className="font-semibold text-sm text-white/90">{job.title}</div>
                        <div className="text-xs text-white/60">{job.company}</div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-white/60">
                        <Clock className="w-2.5 h-2.5" />
                        {job.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-white/60">
                      <MapPin className="w-2.5 h-2.5" />
                      {job.location}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-white/60 text-sm">
                  Keine aktuellen Jobs
                </div>
              )}
            </div>
          </div>

          {/* Auftraggeber - Projects */}
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(90, 179, 157, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(90, 179, 157, 0.2)'
            }}
          >
            <div className="p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'rgba(74, 155, 138, 0.2)',
                    boxShadow: '0 8px 24px rgba(74, 155, 138, 0.2)'
                  }}
                >
                  <FileText className="w-5 h-5 text-[#4a9b8a]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white/90">Auftraggeber</h3>
                  <p className="text-xs text-white/60">Live veröffentlichte Aufträge</p>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-2 max-h-80 overflow-y-auto">
              {projects.length > 0 ? (
                projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl"
                    style={{
                      background: 'rgba(74, 155, 138, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <div>
                        <div className="font-semibold text-sm text-white/90">{project.title}</div>
                        <div className="text-xs text-white/60">{project.category}</div>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-white/60">
                        <Clock className="w-2.5 h-2.5" />
                        {project.time}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-white/60">
                      <Euro className="w-2.5 h-2.5" />
                      {project.budget}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-white/60 text-sm">
                  Keine aktuellen Aufträge
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}