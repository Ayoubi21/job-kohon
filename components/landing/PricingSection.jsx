import React from 'react';
import { Check, Star, Crown, Zap } from 'lucide-react';

export default function PricingSection() {
  const plans = [
    {
      name: 'Business',
      icon: Zap,
      description: 'Das ideale Paket für kleine Unternehmen und Einsatzbetriebe, die regelmäßig neue Mitarbeiter suchen.',
      price: '99',
      badge: null,
      color: '#5ab39d'
    },
    {
      name: 'Business Plus',
      icon: Star,
      description: 'Perfekt für wachsende Unternehmen mit regelmäßigen Personalbedarf.',
      price: '799',
      badge: 'Beliebt',
      color: '#4a9b8a'
    },
    {
      name: 'Business Max',
      icon: Crown,
      description: 'Unser Premium-Paket für Arbeitgeber mit höchsten Ansprüchen und umfangreichen Recruiting-Aktivitäten.',
      price: '1.499',
      badge: 'Premium',
      color: '#3d7a6c'
    }
  ];

  const features = {
    0: [
      '1 Stellenanzeige pro Monat',
      '30 Tage Laufzeit',
      '15 Tage Top-Sichtbarkeit inklusive',
      'Zugriff auf das Standard-Dashboard',
      'E-Mail-Support inklusive'
    ],
    1: [
      'Bis zu 10 Stellenanzeigen pro Monat',
      '30 Tage Laufzeit je Anzeige',
      '15 Tage Top-Sichtbarkeit je Anzeige',
      'Zugriff auf das Standard-Dashboard',
      'E-Mail-Support inklusive',
      'Erweiterte Analysefunktionen'
    ],
    2: [
      'Unbegrenzte Anzahl an Stellenanzeigen',
      '60 Tage Laufzeit je Anzeige',
      '30 Tage Top-Sichtbarkeit je Anzeige',
      'Voller Zugriff auf alle Plattformfunktionen',
      'Erweiterte Analyse & Statistiken',
      'Auftragsbereich und CV-Datenbank',
      'Premium-Support mit priorisierter Beratung'
    ]
  };

  return (
    <section className="py-16"
      style={{
        background: '#2d2d2d'
      }}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-white/90 mb-2">
            Transparente Preise
          </h2>
          <p className="text-base text-white/60 max-w-2xl mx-auto">
            Wähle das Paket, das zu deinem Unternehmen passt. Monatlich günstig.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative p-6 rounded-3xl transition-all duration-300 hover:scale-105`}
              style={{
                background: plan.badge
                  ? 'rgba(90, 179, 157, 0.15)'
                  : 'rgba(90, 179, 157, 0.1)',
                backdropFilter: 'blur(10px)',
                boxShadow: plan.badge
                  ? `0 12px 40px ${plan.color}40`
                  : 'none',
                border: `1px solid ${plan.color}30`
              }}
            >
              {plan.badge && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`,
                    boxShadow: `0 8px 24px ${plan.color}60`
                  }}
                >
                  {plan.badge}
                </div>
              )}

              <div className="mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                  style={{
                    background: `${plan.color}20`,
                    boxShadow: `0 8px 24px ${plan.color}20`
                  }}
                >
                  <plan.icon className="w-6 h-6" style={{ color: plan.color }} />
                </div>
                <h3 className="text-xl font-bold text-white/90 mb-2">{plan.name}</h3>
                <p className="text-xs text-white/60 leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-5">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white/90">{plan.price}</span>
                  <span className="text-lg text-white/60">€</span>
                  <span className="text-sm text-white/60">/ Monat</span>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-xs font-semibold text-white/70 mb-3">Enthalten:</div>
                {features[idx].map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex items-start gap-2">
                    <div
                      className="w-4 h-4 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: `${plan.color}20`
                      }}
                    >
                      <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
                    </div>
                    <span className="text-xs text-white/70 leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                className="w-full py-2.5 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-105"
                style={{
                  background: `linear-gradient(135deg, ${plan.color} 0%, ${plan.color}dd 100%)`,
                  boxShadow: `0 8px 24px ${plan.color}50`
                }}
              >
                {idx === 2 ? 'Kontakt aufnehmen' : idx === 1 ? 'Jetzt wählen' : 'Jetzt starten'}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center text-xs text-white/60 max-w-2xl mx-auto">
          <p>
            Alle Preise zzgl. MwSt. • Monatlich kündbar • Faire AGB • 
            Keine versteckten Kosten • Transparente Abrechnung
          </p>
        </div>
      </div>
    </section>
  );
}