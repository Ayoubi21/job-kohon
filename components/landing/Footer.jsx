import React from 'react';
import { Briefcase, Mail, Linkedin, Twitter, Instagram, Facebook, Globe } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function Footer() {
  return (
    <footer className="border-t border-white/10"
      style={{
        background: '#2d2d2d'
      }}>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(90, 179, 157, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}
              >
                <Briefcase className="w-4 h-4 text-[#5ab39d]" />
              </div>
              <h3 className="text-lg font-bold text-white/90">JobKurb</h3>
            </div>
            <p className="text-xs text-white/60 leading-relaxed mb-3">
              Deutschlands modernste Jobplattform. Wir verbinden Talente mit Unternehmen – schnell, transparent und erfolgreich.
            </p>
            <div className="flex items-center gap-2 text-xs text-white/60 mb-3">
              <Mail className="w-3 h-3" />
              kontakt@jobkurb.de
            </div>
            <div className="flex gap-2">
              {[
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' }
              ].map((social, idx) => (
                <button
                  key={idx}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                  style={{
                    background: 'rgba(90, 179, 157, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)'
                  }}
                >
                  <social.icon className="w-4 h-4 text-white/60" />
                </button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold text-white/90 mb-3">Unternehmen</h4>
            <ul className="space-y-2">
              <li>
                <Dialog>
                  <DialogTrigger className="text-xs text-white/60 hover:text-[#5ab39d] transition-colors text-left">
                    Über uns
                  </DialogTrigger>
                  <DialogContent className="border-white/10"
                    style={{
                      background: 'rgba(45, 45, 45, 0.95)',
                      backdropFilter: 'blur(20px)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
                    }}>
                    <DialogHeader>
                      <DialogTitle className="text-xl font-bold text-white/90">Über JobKurb</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 text-white/70 text-sm">
                      <p>
                        JobKurb wurde 2024 mit der Vision gegründet, die Jobsuche in Deutschland zu revolutionieren. 
                        Wir glauben an Transparenz, Effizienz und faire Chancen für alle.
                      </p>
                      <p>
                        <strong className="text-white/90">Unsere Mission:</strong> Talente und Unternehmen auf die modernste und effektivste Weise zusammenbringen.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <button className="text-xs text-white/60 hover:text-[#5ab39d] transition-colors">
                  Partner werden
                </button>
              </li>
              <li>
                <button className="text-xs text-white/60 hover:text-[#5ab39d] transition-colors">
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold text-white/90 mb-3">Services</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-xs text-white/60 hover:text-[#5ab39d] transition-colors">
                  Lebenslauf erstellen
                </button>
              </li>
              <li>
                <button className="text-xs text-white/60 hover:text-[#5ab39d] transition-colors">
                  Hilfecenter
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold text-white/90 mb-3">Rechtliches</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-xs text-white/60 hover:text-[#5ab39d] transition-colors">
                  Impressum
                </button>
              </li>
              <li>
                <button className="text-xs text-white/60 hover:text-[#5ab39d] transition-colors">
                  Datenschutz
                </button>
              </li>
              <li>
                <button className="text-xs text-white/60 hover:text-[#5ab39d] transition-colors">
                  AGB
                </button>
              </li>
              <li>
                <button className="text-xs text-white/60 hover:text-[#5ab39d] transition-colors">
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/60">
            © 2024 JobKurb GmbH. Alle Rechte vorbehalten.
          </p>
          <button
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-white/60 transition-all hover:scale-105"
            style={{
              background: 'rgba(90, 179, 157, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(90, 179, 157, 0.2)'
            }}
          >
            <Globe className="w-3 h-3" />
            Deutsch
          </button>
        </div>
      </div>
    </footer>
  );
}