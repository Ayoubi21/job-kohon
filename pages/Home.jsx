import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Header from '../components/landing/Header';
import Hero from '../components/landing/Hero';
import FilterPanel from '../components/landing/FilterPanel';
import StatsSection from '../components/landing/StatsSection';
import PricingSection from '../components/landing/PricingSection';
import LiveMonitoring from '../components/landing/LiveMonitoring';
import WhySection from '../components/landing/WhySection';
import Footer from '../components/landing/Footer';

export default function Home() {
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await base44.auth.me();
      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen"
      style={{
        background: '#2d2d2d'
      }}>
      <Header />
      
      {/* Admin Kachel - nur für Admins sichtbar */}
      {!loading && currentUser && currentUser.user_role === 'admin' && (
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            to={createPageUrl('Admin')}
            className="block p-4 rounded-2xl transition-all hover:scale-105"
            style={{
              background: 'rgba(90, 179, 157, 0.15)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(90, 179, 157, 0.3)',
              boxShadow: '0 8px 24px rgba(90, 179, 157, 0.2)'
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(90, 179, 157, 0.2)',
                  boxShadow: '0 4px 12px rgba(90, 179, 157, 0.3)'
                }}>
                <Shield className="w-6 h-6 text-[#5ab39d]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white/90">Admin-Panel</h3>
                <p className="text-sm text-white/60">Vollständiger Plattform-Zugriff</p>
              </div>
            </div>
          </Link>
        </div>
      )}

      <Hero onFilterOpen={() => setFilterPanelOpen(!filterPanelOpen)} />
      <FilterPanel isOpen={filterPanelOpen} onClose={() => setFilterPanelOpen(false)} />
      <StatsSection />
      <PricingSection />
      <LiveMonitoring />
      <WhySection />
      <Footer />
    </div>
  );
}