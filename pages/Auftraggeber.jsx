import React, { useState } from 'react';
import { 
  LayoutDashboard, Briefcase, FileText, Settings, 
  Plus, Edit, Trash2, Search, Filter, TrendingUp,
  Calendar, DollarSign, Users, CheckCircle, Clock,
  LogOut, Home, Eye, Mail, Phone, MapPin
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

// Label component helper
function Label({ children, className, ...props }) {
  return <label className={className} {...props}>{children}</label>;
}

export default function Auftraggeber() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [showApplicationDetails, setShowApplicationDetails] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);

  const dashboardStats = [
    { label: 'Gesamtaufträge', value: '18', icon: Briefcase, color: '#5ab39d' },
    { label: 'Aktive Aufträge', value: '12', icon: Clock, color: '#4a9b8a' },
    { label: 'Bewerbungen', value: '47', icon: Users, color: '#3d7a6c' },
    { label: 'Gesamtbudget', value: '85k€', icon: DollarSign, color: '#2e6054' }
  ];

  const orders = [
    { id: 1, title: 'Website Redesign', category: 'IT & Design', status: 'Offen', budget: '5.000-8.000€', duration: '3 Monate', applications: 8, date: '15.12.2024', statusColor: '#5ab39d' },
    { id: 2, title: 'Social Media Kampagne', category: 'Marketing', status: 'Aktiv', budget: '3.000-5.000€', duration: '2 Monate', applications: 12, date: '10.12.2024', statusColor: '#4a9eff' },
    { id: 3, title: 'App Entwicklung', category: 'IT', status: 'In Bearbeitung', budget: '15.000-25.000€', duration: '6 Monate', applications: 5, date: '05.12.2024', statusColor: '#81c784' },
    { id: 4, title: 'Logo Design', category: 'Design', status: 'Abgeschlossen', budget: '2.000-4.000€', duration: '1 Monat', applications: 15, date: '01.12.2024', statusColor: '#6b7280' }
  ];

  const applications = [
    { id: 1, name: 'Max Mustermann', order: 'Website Redesign', date: '20.12.2024', status: 'Neu', statusColor: '#5ab39d', email: 'max@example.com', experience: '5 Jahre', portfolio: 'portfolio.com' },
    { id: 2, name: 'Anna Schmidt', order: 'Social Media Kampagne', date: '19.12.2024', status: 'Gelesen', statusColor: '#4a9eff', email: 'anna@example.com', experience: '3 Jahre', portfolio: 'annadesigns.com' },
    { id: 3, name: 'Tom Weber', order: 'App Entwicklung', date: '18.12.2024', status: 'Angenommen', statusColor: '#81c784', email: 'tom@example.com', experience: '8 Jahre', portfolio: 'tomdev.com' },
    { id: 4, name: 'Lisa Müller', order: 'Website Redesign', date: '17.12.2024', status: 'Abgelehnt', statusColor: '#e84f37', email: 'lisa@example.com', experience: '2 Jahre', portfolio: 'lisamueller.de' }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'marktplatz', label: 'Marktplatz', icon: Briefcase },
    { id: 'bewerbungen', label: 'Bewerbungen', icon: FileText },
    { id: 'einstellungen', label: 'Einstellungen', icon: Settings }
  ];

  return (
    <div className="min-h-screen" style={{ background: '#2d2d2d' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10"
        style={{ background: 'rgba(45, 45, 45, 0.8)' }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(90, 179, 157, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}>
                <Briefcase className="w-5 h-5 text-[#5ab39d]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white/90">JobKorb</h1>
                <p className="text-xs text-white/60">Auftraggeber-Dashboard</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Link
                to={createPageUrl('Home')}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white/80 transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'rgba(90, 179, 157, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}
              >
                <Home className="w-4 h-4" />
                Zur Startseite
              </Link>
              <button
                className="px-4 py-2 rounded-xl text-sm font-medium text-white/80 transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'rgba(232, 79, 55, 0.2)',
                  border: '1px solid rgba(232, 79, 55, 0.3)'
                }}
              >
                <LogOut className="w-4 h-4" />
                Abmelden
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="border-b border-white/10"
        style={{
          background: 'rgba(45, 45, 45, 0.5)',
          backdropFilter: 'blur(10px)'
        }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all whitespace-nowrap text-sm ${
                  activeTab === item.id ? 'text-white' : 'text-white/60'
                }`}
                style={
                  activeTab === item.id
                    ? {
                        borderBottom: '2px solid #5ab39d',
                        background: 'rgba(90, 179, 157, 0.1)'
                      }
                    : {}
                }
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCreateOrder(true)}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
                }}
              >
                <Plus className="w-5 h-5" />
                Neuer Auftrag
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl transition-all hover:scale-105"
                  style={{
                    background: 'rgba(90, 179, 157, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)',
                    boxShadow: `0 8px 24px ${stat.color}20`
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${stat.color}20`,
                        boxShadow: `0 4px 12px ${stat.color}30`
                      }}>
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white/90">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(90, 179, 157, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}>
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-5 h-5 text-[#5ab39d]" />
                  <h3 className="font-semibold text-white/90">Bewerbungstrend (7 Tage)</h3>
                </div>
                <div className="h-48 flex items-center justify-center text-white/40 text-sm">
                  [Diagramm Platzhalter]
                </div>
              </div>

              <div className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(90, 179, 157, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-5 h-5 text-[#5ab39d]" />
                  <h3 className="font-semibold text-white/90">Auftragsstatus</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Offen', value: '6', color: '#5ab39d' },
                    { label: 'In Bearbeitung', value: '4', color: '#4a9eff' },
                    { label: 'Abgeschlossen', value: '2', color: '#81c784' },
                    { label: 'Abgerechnet', value: '6', color: '#6b7280' }
                  ].map((status, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg"
                      style={{ background: 'rgba(90, 179, 157, 0.05)' }}>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ background: status.color }} />
                        <span className="text-sm text-white/80">{status.label}</span>
                      </div>
                      <span className="text-sm font-bold text-white/90">{status.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Current Orders List */}
            <div className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(90, 179, 157, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(90, 179, 157, 0.2)'
              }}>
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white/90">Aktuelle Aufträge</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Titel</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Kategorie</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Datum</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Bewerbungen</th>
                      <th className="text-right p-4 text-sm font-semibold text-white/70">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-sm text-white/90 font-medium">{order.title}</td>
                        <td className="p-4 text-sm text-white/70">{order.category}</td>
                        <td className="p-4 text-sm text-white/70">{order.date}</td>
                        <td className="p-4">
                          <Badge style={{ background: order.statusColor }} className="text-white">
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-white/90 font-semibold">{order.applications}</td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-end">
                            <button className="p-2 rounded-lg transition-all hover:scale-110"
                              style={{
                                background: 'rgba(90, 179, 157, 0.2)',
                                border: '1px solid rgba(90, 179, 157, 0.3)'
                              }}>
                              <Eye className="w-4 h-4 text-[#5ab39d]" />
                            </button>
                            <button className="p-2 rounded-lg transition-all hover:scale-110"
                              style={{
                                background: 'rgba(90, 179, 157, 0.2)',
                                border: '1px solid rgba(90, 179, 157, 0.3)'
                              }}>
                              <Edit className="w-4 h-4 text-[#5ab39d]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Marktplatz */}
        {activeTab === 'marktplatz' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white/90">Meine Aufträge</h2>
              <div className="flex gap-3">
                <Select defaultValue="all">
                  <SelectTrigger className="w-40 border-white/10 text-white/90"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                    <SelectItem value="all" className="text-white/90">Alle Status</SelectItem>
                    <SelectItem value="open" className="text-white/90">Offen</SelectItem>
                    <SelectItem value="active" className="text-white/90">Aktiv</SelectItem>
                    <SelectItem value="completed" className="text-white/90">Abgeschlossen</SelectItem>
                  </SelectContent>
                </Select>
                <button
                  onClick={() => setShowCreateOrder(true)}
                  className="px-6 py-2 rounded-xl font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                    boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Neuer Auftrag
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(90, 179, 157, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)'
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white/90 mb-1">{order.title}</h3>
                      <p className="text-sm text-white/60">{order.category}</p>
                    </div>
                    <Badge style={{ background: order.statusColor }} className="text-white">
                      {order.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <DollarSign className="w-4 h-4" />
                      {order.budget}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Clock className="w-4 h-4" />
                      {order.duration}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Users className="w-4 h-4" />
                      {order.applications} Bewerbungen
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Calendar className="w-4 h-4" />
                      {order.date}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                        boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                      }}
                    >
                      Details anzeigen
                    </button>
                    <button
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{
                        background: 'rgba(90, 179, 157, 0.2)',
                        border: '1px solid rgba(90, 179, 157, 0.3)'
                      }}
                    >
                      <Edit className="w-4 h-4 text-[#5ab39d]" />
                    </button>
                    <button
                      className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{
                        background: 'rgba(232, 79, 55, 0.2)',
                        border: '1px solid rgba(232, 79, 55, 0.3)'
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-[#e84f37]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bewerbungen */}
        {activeTab === 'bewerbungen' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white/90">Bewerbungen</h2>

            {/* Filters */}
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="w-48 border-white/10 text-white/90"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}>
                  <SelectValue placeholder="Auftrag" />
                </SelectTrigger>
                <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                  <SelectItem value="all" className="text-white/90">Alle Aufträge</SelectItem>
                  {orders.map(order => (
                    <SelectItem key={order.id} value={order.id.toString()} className="text-white/90">
                      {order.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-48 border-white/10 text-white/90"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                  <SelectItem value="all" className="text-white/90">Alle Status</SelectItem>
                  <SelectItem value="new" className="text-white/90">Neu</SelectItem>
                  <SelectItem value="read" className="text-white/90">Gelesen</SelectItem>
                  <SelectItem value="accepted" className="text-white/90">Angenommen</SelectItem>
                  <SelectItem value="rejected" className="text-white/90">Abgelehnt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Applications Table */}
            <div className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(90, 179, 157, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(90, 179, 157, 0.2)'
              }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Name</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Auftragstitel</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Datum</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Status</th>
                      <th className="text-right p-4 text-sm font-semibold text-white/70">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-sm text-white/90 font-medium">{app.name}</td>
                        <td className="p-4 text-sm text-white/70">{app.order}</td>
                        <td className="p-4 text-sm text-white/70">{app.date}</td>
                        <td className="p-4">
                          <Badge style={{ background: app.statusColor }} className="text-white">
                            {app.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-end">
                            <button 
                              onClick={() => {
                                setSelectedApplication(app);
                                setShowApplicationDetails(true);
                              }}
                              className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                              style={{
                                background: 'rgba(90, 179, 157, 0.2)',
                                border: '1px solid rgba(90, 179, 157, 0.3)',
                                color: '#5ab39d'
                              }}>
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Einstellungen */}
        {activeTab === 'einstellungen' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white/90">Einstellungen</h2>
              <button
                onClick={() => setShowSettings(true)}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
                }}
              >
                <Edit className="w-5 h-5" />
                Bearbeiten
              </button>
            </div>

            <div className="p-8 rounded-2xl"
              style={{
                background: 'rgba(90, 179, 157, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(90, 179, 157, 0.2)'
              }}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-2">Firmenname / Name</label>
                  <p className="text-white/90">ProjectHub GmbH</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-2">Ansprechpartner</label>
                  <p className="text-white/90">Michael Schmidt</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-2">E-Mail</label>
                  <p className="text-white/90">kontakt@projecthub.de</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-2">Telefon</label>
                  <p className="text-white/90">+49 30 98765432</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-white/70 block mb-2">Adresse</label>
                  <p className="text-white/90">Projektstraße 456, 10117 Berlin, Deutschland</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Neuer Auftrag Dialog */}
      <Dialog open={showCreateOrder} onOpenChange={setShowCreateOrder}>
        <DialogContent className="sm:max-w-2xl border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">Neuen Auftrag erstellen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Auftragsname</Label>
              <Input
                placeholder="z.B. Website Redesign"
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Kategorie</Label>
              <Select>
                <SelectTrigger className="border-white/10 text-white/90"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}>
                  <SelectValue placeholder="Kategorie wählen" />
                </SelectTrigger>
                <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                  <SelectItem value="it" className="text-white/90">IT & Software</SelectItem>
                  <SelectItem value="design" className="text-white/90">Design</SelectItem>
                  <SelectItem value="marketing" className="text-white/90">Marketing</SelectItem>
                  <SelectItem value="writing" className="text-white/90">Schreiben & Übersetzung</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Beschreibung</Label>
              <Textarea
                placeholder="Beschreiben Sie Ihren Auftrag..."
                className="border-white/10 text-white/90 placeholder:text-white/40 min-h-32"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-white/70 mb-2 block">Budget</Label>
                <Input
                  placeholder="z.B. 5000-8000€"
                  className="border-white/10 text-white/90 placeholder:text-white/40"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              <div>
                <Label className="text-sm text-white/70 mb-2 block">Laufzeit</Label>
                <Input
                  placeholder="z.B. 3 Monate"
                  className="border-white/10 text-white/90 placeholder:text-white/40"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Standort</Label>
              <Input
                placeholder="z.B. Berlin oder Remote"
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Arbeitsmodell</Label>
              <Select>
                <SelectTrigger className="border-white/10 text-white/90"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}>
                  <SelectValue placeholder="Auswählen" />
                </SelectTrigger>
                <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                  <SelectItem value="remote" className="text-white/90">Remote</SelectItem>
                  <SelectItem value="onsite" className="text-white/90">Vor Ort</SelectItem>
                  <SelectItem value="hybrid" className="text-white/90">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowCreateOrder(false)}
                variant="outline"
                className="flex-1 border-white/10 text-white/80"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)'
                }}
              >
                Abbrechen
              </Button>
              <Button
                className="flex-1 text-white"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                }}
              >
                Veröffentlichen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bewerbungsdetails Dialog */}
      <Dialog open={showApplicationDetails} onOpenChange={setShowApplicationDetails}>
        <DialogContent className="sm:max-w-2xl border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">Bewerbungsdetails</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-white/70 mb-1 block">Name</Label>
                  <p className="text-white/90">{selectedApplication.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-white/70 mb-1 block">Auftrag</Label>
                  <p className="text-white/90">{selectedApplication.order}</p>
                </div>
                <div>
                  <Label className="text-sm text-white/70 mb-1 block">E-Mail</Label>
                  <p className="text-white/90">{selectedApplication.email}</p>
                </div>
                <div>
                  <Label className="text-sm text-white/70 mb-1 block">Erfahrung</Label>
                  <p className="text-white/90">{selectedApplication.experience}</p>
                </div>
                <div>
                  <Label className="text-sm text-white/70 mb-1 block">Portfolio</Label>
                  <a href={`https://${selectedApplication.portfolio}`} target="_blank" rel="noopener noreferrer" 
                    className="text-[#5ab39d] hover:underline">
                    {selectedApplication.portfolio}
                  </a>
                </div>
                <div>
                  <Label className="text-sm text-white/70 mb-1 block">Status</Label>
                  <Badge style={{ background: selectedApplication.statusColor }} className="text-white">
                    {selectedApplication.status}
                  </Badge>
                </div>
              </div>
              
              <div className="p-4 rounded-xl" style={{ background: 'rgba(90, 179, 157, 0.05)' }}>
                <Label className="text-sm text-white/70 mb-2 block">Bewerbungsschreiben</Label>
                <p className="text-sm text-white/80 leading-relaxed">
                  Sehr geehrte Damen und Herren,<br /><br />
                  mit großem Interesse habe ich Ihre Ausschreibung für {selectedApplication.order} gelesen. 
                  Mit meiner {selectedApplication.experience} Erfahrung in diesem Bereich bin ich überzeugt, 
                  dass ich die perfekte Wahl für dieses Projekt bin...
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowApplicationDetails(false)}
                  variant="outline"
                  className="flex-1 border-white/10 text-white/80"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)'
                  }}
                >
                  Schließen
                </Button>
                <Button
                  className="flex-1 text-white"
                  style={{
                    background: 'rgba(232, 79, 55, 0.8)'
                  }}
                >
                  Ablehnen
                </Button>
                <Button
                  className="flex-1 text-white"
                  style={{
                    background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                    boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                  }}
                >
                  Annehmen
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Einstellungen Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-2xl border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">Einstellungen bearbeiten</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-white/70 mb-2 block">Firmenname / Name</Label>
                <Input
                  defaultValue="ProjectHub GmbH"
                  className="border-white/10 text-white/90"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              <div>
                <Label className="text-sm text-white/70 mb-2 block">Ansprechpartner</Label>
                <Input
                  defaultValue="Michael Schmidt"
                  className="border-white/10 text-white/90"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              <div>
                <Label className="text-sm text-white/70 mb-2 block">E-Mail</Label>
                <Input
                  type="email"
                  defaultValue="kontakt@projecthub.de"
                  className="border-white/10 text-white/90"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
              <div>
                <Label className="text-sm text-white/70 mb-2 block">Telefon</Label>
                <Input
                  defaultValue="+49 30 98765432"
                  className="border-white/10 text-white/90"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </div>
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Adresse</Label>
              <Input
                defaultValue="Projektstraße 456, 10117 Berlin, Deutschland"
                className="border-white/10 text-white/90"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Neues Passwort (optional)</Label>
              <Input
                type="password"
                placeholder="Neues Passwort eingeben"
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowSettings(false)}
                variant="outline"
                className="flex-1 border-white/10 text-white/80"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)'
                }}
              >
                Abbrechen
              </Button>
              <Button
                className="flex-1 text-white"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                }}
              >
                Speichern
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}