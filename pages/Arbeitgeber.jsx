import React, { useState } from 'react';
import { 
  LayoutDashboard, TrendingUp, Target, Users, FileText, Database, 
  UserCircle, Mail, Plus, Edit, Trash2, Download, Search, Filter,
  Calendar, BarChart3, PieChart, Activity, Bell, Settings, LogOut, Home
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

export default function Arbeitgeber() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showInviteMember, setShowInviteMember] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);

  const dashboardStats = [
    { label: 'Alle Anzeigen', value: '24', icon: FileText, color: '#5ab39d' },
    { label: 'Live-Anzeigen', value: '18', icon: Activity, color: '#4a9b8a' },
    { label: 'Entwürfe', value: '6', icon: Edit, color: '#3d7a6c' },
    { label: 'Bewerbungen', value: '147', icon: Users, color: '#2e6054' }
  ];

  const activeJobs = [
    { id: 1, title: 'Senior Developer', location: 'Berlin', date: '15.12.2024', status: 'Live', applications: 23 },
    { id: 2, title: 'Marketing Manager', location: 'München', date: '10.12.2024', status: 'Live', applications: 15 },
    { id: 3, title: 'UX Designer', location: 'Hamburg', date: '05.12.2024', status: 'Entwurf', applications: 0 }
  ];

  const applications = [
    { id: 1, name: 'Max Mustermann', job: 'Senior Developer', date: '20.12.2024', status: 'Neu', statusColor: '#5ab39d' },
    { id: 2, name: 'Anna Schmidt', job: 'Marketing Manager', date: '19.12.2024', status: 'Gelesen', statusColor: '#4a9eff' },
    { id: 3, name: 'Tom Weber', job: 'Senior Developer', date: '18.12.2024', status: 'Eingeladen', statusColor: '#81c784' },
    { id: 4, name: 'Lisa Müller', job: 'UX Designer', date: '17.12.2024', status: 'Abgelehnt', statusColor: '#e84f37' }
  ];

  const campaigns = [
    { id: 1, title: 'Developer Kampagne Q1', duration: '30 Tage', budget: '500€', status: 'Aktiv', statusColor: '#5ab39d' },
    { id: 2, title: 'Marketing Boost', duration: '14 Tage', budget: '300€', status: 'Inaktiv', statusColor: '#6b7280' }
  ];

  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah@firma.de', role: 'Administrator' },
    { id: 2, name: 'Michael Brown', email: 'michael@firma.de', role: 'Recruiter' },
    { id: 3, name: 'Emma Davis', email: 'emma@firma.de', role: 'Betrachter' }
  ];

  const cvDatabase = [
    { id: 1, name: 'John Doe', title: 'Senior Developer', location: 'Berlin', experience: '8 Jahre', skills: ['React', 'Node.js', 'TypeScript'] },
    { id: 2, name: 'Jane Smith', title: 'Marketing Manager', location: 'München', experience: '5 Jahre', skills: ['SEO', 'Social Media', 'Analytics'] }
  ];

  const emailTemplates = [
    { id: 1, name: 'Bewerbungseingang', subject: 'Ihre Bewerbung bei uns', type: 'Bestätigung' },
    { id: 2, name: 'Einladung zum Gespräch', subject: 'Einladung zum Interview', type: 'Einladung' },
    { id: 3, name: 'Absage', subject: 'Absage Ihrer Bewerbung', type: 'Absage' }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'kampagnen', label: 'Kampagnen', icon: Target },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'bewerbungen', label: 'Bewerbungen', icon: FileText },
    { id: 'cv-datenbank', label: 'CV-Datenbank', icon: Database },
    { id: 'profil', label: 'Profil', icon: UserCircle },
    { id: 'email-vorlagen', label: 'E-Mail-Vorlagen', icon: Mail }
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
                <LayoutDashboard className="w-5 h-5 text-[#5ab39d]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white/90">JobKorb</h1>
                <p className="text-xs text-white/60">Arbeitgeber-Dashboard</p>
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
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
                }}
              >
                <Calendar className="w-5 h-5" />
                Aufgaben
              </button>
              <button
                onClick={() => setShowCreateJob(true)}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #4a9b8a 0%, #3d7a6c 100%)',
                  boxShadow: '0 8px 24px rgba(74, 155, 138, 0.4)'
                }}
              >
                <Plus className="w-5 h-5" />
                Job erstellen
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

            {/* Active Jobs Table */}
            <div className="rounded-2xl overflow-hidden"
              style={{
                background: 'rgba(90, 179, 157, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(90, 179, 157, 0.2)'
              }}>
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white/90">Aktive Stellenanzeigen</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Titel</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Ort</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Datum</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Bewerbungen</th>
                      <th className="text-right p-4 text-sm font-semibold text-white/70">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeJobs.map((job) => (
                      <tr key={job.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-sm text-white/90 font-medium">{job.title}</td>
                        <td className="p-4 text-sm text-white/70">{job.location}</td>
                        <td className="p-4 text-sm text-white/70">{job.date}</td>
                        <td className="p-4">
                          <Badge className={job.status === 'Live' ? 'bg-[#5ab39d] text-white' : 'bg-[#6b7280] text-white'}>
                            {job.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-sm text-white/90 font-semibold">{job.applications}</td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-end">
                            <button className="p-2 rounded-lg transition-all hover:scale-110"
                              style={{
                                background: 'rgba(90, 179, 157, 0.2)',
                                border: '1px solid rgba(90, 179, 157, 0.3)'
                              }}>
                              <Edit className="w-4 h-4 text-[#5ab39d]" />
                            </button>
                            <button className="p-2 rounded-lg transition-all hover:scale-110"
                              style={{
                                background: 'rgba(232, 79, 55, 0.2)',
                                border: '1px solid rgba(232, 79, 55, 0.3)'
                              }}>
                              <Trash2 className="w-4 h-4 text-[#e84f37]" />
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

        {/* Performance */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white/90">Performance & Analytics</h2>
              <div className="flex gap-2">
                <Select defaultValue="30">
                  <SelectTrigger className="w-32 border-white/10 text-white/90"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                    <SelectItem value="7" className="text-white/90">7 Tage</SelectItem>
                    <SelectItem value="30" className="text-white/90">30 Tage</SelectItem>
                    <SelectItem value="90" className="text-white/90">90 Tage</SelectItem>
                  </SelectContent>
                </Select>
                <button
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105 flex items-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                    boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                  }}
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Performance Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Aktive Jobs', value: '18', icon: Activity, trend: '+12%' },
                { label: 'Bewerbungen', value: '147', icon: Users, trend: '+8%' },
                { label: 'Sichtbarkeit', value: '8.4k', icon: TrendingUp, trend: '+24%' },
                { label: 'Budget', value: '1.2k€', icon: Target, trend: '-5%' }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(90, 179, 157, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)'
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <stat.icon className="w-5 h-5 text-[#5ab39d]" />
                    <span className={`text-xs font-semibold ${stat.trend.startsWith('+') ? 'text-[#81c784]' : 'text-[#e84f37]'}`}>
                      {stat.trend}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white/90">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Bewerbungsverlauf', icon: BarChart3 },
                { title: 'Bewerbungsstatus', icon: PieChart },
                { title: 'Top Jobs', icon: TrendingUp },
                { title: 'Kampagnen-Performance', icon: Target }
              ].map((chart, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(90, 179, 157, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <chart.icon className="w-5 h-5 text-[#5ab39d]" />
                    <h3 className="font-semibold text-white/90">{chart.title}</h3>
                  </div>
                  <div className="h-48 flex items-center justify-center text-white/40 text-sm">
                    [Diagramm Platzhalter]
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Kampagnen */}
        {activeTab === 'kampagnen' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white/90">Kampagnen</h2>
              <button
                onClick={() => setShowCreateCampaign(true)}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
                }}
              >
                <Plus className="w-5 h-5" />
                Neue Kampagne erstellen
              </button>
            </div>

            {campaigns.length > 0 ? (
              <div className="grid gap-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="p-6 rounded-2xl"
                    style={{
                      background: 'rgba(90, 179, 157, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(90, 179, 157, 0.2)'
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white/90 mb-2">{campaign.title}</h3>
                        <div className="flex gap-4 text-sm text-white/60">
                          <span>⏱ {campaign.duration}</span>
                          <span>💰 {campaign.budget}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge style={{ background: campaign.statusColor }} className="text-white">
                          {campaign.status}
                        </Badge>
                        <button className="p-2 rounded-lg transition-all hover:scale-110"
                          style={{
                            background: 'rgba(90, 179, 157, 0.2)',
                            border: '1px solid rgba(90, 179, 157, 0.3)'
                          }}>
                          <Edit className="w-4 h-4 text-[#5ab39d]" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-2xl"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}>
                <Target className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Keine Kampagnen vorhanden</p>
                <button
                  onClick={() => setShowCreateCampaign(true)}
                  className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                    boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
                  }}
                >
                  Erste Kampagne erstellen
                </button>
              </div>
            )}
          </div>
        )}

        {/* Team */}
        {activeTab === 'team' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white/90">Team</h2>
              <button
                onClick={() => setShowInviteMember(true)}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
                }}
              >
                <Plus className="w-5 h-5" />
                Mitglied einladen
              </button>
            </div>

            <div className="grid gap-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-6 rounded-2xl flex items-center justify-between"
                  style={{
                    background: 'rgba(90, 179, 157, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{
                        background: 'rgba(90, 179, 157, 0.2)'
                      }}>
                      <UserCircle className="w-7 h-7 text-[#5ab39d]" />
                    </div>
                    <div>
                      <div className="font-semibold text-white/90">{member.name}</div>
                      <div className="text-sm text-white/60">{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-[#4a9b8a] text-white">{member.role}</Badge>
                    <button className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{
                        background: 'rgba(232, 79, 55, 0.2)',
                        border: '1px solid rgba(232, 79, 55, 0.3)'
                      }}>
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
                  <SelectValue placeholder="Jobtitel" />
                </SelectTrigger>
                <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                  <SelectItem value="all" className="text-white/90">Alle Jobs</SelectItem>
                  <SelectItem value="dev" className="text-white/90">Senior Developer</SelectItem>
                  <SelectItem value="marketing" className="text-white/90">Marketing Manager</SelectItem>
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
                  <SelectItem value="invited" className="text-white/90">Eingeladen</SelectItem>
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
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Jobtitel</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Datum</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Status</th>
                      <th className="text-right p-4 text-sm font-semibold text-white/70">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-sm text-white/90 font-medium">{app.name}</td>
                        <td className="p-4 text-sm text-white/70">{app.job}</td>
                        <td className="p-4 text-sm text-white/70">{app.date}</td>
                        <td className="p-4">
                          <Badge style={{ background: app.statusColor }} className="text-white">
                            {app.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-end">
                            <button className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
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

        {/* CV-Datenbank */}
        {activeTab === 'cv-datenbank' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white/90">CV-Datenbank</h2>

            {/* Search & Filters */}
            <div className="p-6 rounded-2xl"
              style={{
                background: 'rgba(90, 179, 157, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(90, 179, 157, 0.2)'
              }}>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Name, Titel oder Skill"
                    className="pl-10 border-white/10 text-white/90 placeholder:text-white/40"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                </div>
                <Input
                  placeholder="Standort"
                  className="border-white/10 text-white/90 placeholder:text-white/40"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Select>
                  <SelectTrigger className="border-white/10 text-white/90"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <SelectValue placeholder="Erfahrungslevel" />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                    <SelectItem value="junior" className="text-white/90">Junior</SelectItem>
                    <SelectItem value="mid" className="text-white/90">Mid-Level</SelectItem>
                    <SelectItem value="senior" className="text-white/90">Senior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* CV Results */}
            <div className="grid gap-4">
              {cvDatabase.map((cv) => (
                <div
                  key={cv.id}
                  className="p-6 rounded-2xl"
                  style={{
                    background: 'rgba(90, 179, 157, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)'
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white/90">{cv.name}</h3>
                      <p className="text-sm text-white/60">{cv.title} • {cv.location}</p>
                      <p className="text-sm text-white/60">Erfahrung: {cv.experience}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105 flex items-center gap-2"
                        style={{
                          background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                          boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                        }}
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button
                        className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                        style={{
                          background: 'rgba(90, 179, 157, 0.2)',
                          border: '1px solid rgba(90, 179, 157, 0.3)'
                        }}
                      >
                        Kontakt
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cv.skills.map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="border-white/20 text-[#5ab39d]">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profil */}
        {activeTab === 'profil' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white/90">Firmenprofil</h2>
              <button
                onClick={() => setShowEditProfile(true)}
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
                  <label className="text-sm font-medium text-white/70 block mb-2">Firmenname</label>
                  <p className="text-white/90">TechCorp GmbH</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-2">Ansprechpartner</label>
                  <p className="text-white/90">Sarah Johnson</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-2">E-Mail</label>
                  <p className="text-white/90">kontakt@techcorp.de</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-white/70 block mb-2">Telefon</label>
                  <p className="text-white/90">+49 30 12345678</p>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-white/70 block mb-2">Adresse</label>
                  <p className="text-white/90">Musterstraße 123, 10115 Berlin, Deutschland</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* E-Mail-Vorlagen */}
        {activeTab === 'email-vorlagen' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white/90">E-Mail-Vorlagen</h2>
              <button
                onClick={() => setShowCreateTemplate(true)}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
                }}
              >
                <Plus className="w-5 h-5" />
                Neue Vorlage erstellen
              </button>
            </div>

            <div className="grid gap-4">
              {emailTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-6 rounded-2xl flex items-center justify-between"
                  style={{
                    background: 'rgba(90, 179, 157, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)'
                  }}
                >
                  <div>
                    <h3 className="font-semibold text-white/90 mb-1">{template.name}</h3>
                    <p className="text-sm text-white/60">Betreff: {template.subject}</p>
                    <Badge className="mt-2 bg-[#4a9b8a] text-white">{template.type}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{
                        background: 'rgba(90, 179, 157, 0.2)',
                        border: '1px solid rgba(90, 179, 157, 0.3)'
                      }}>
                      <Edit className="w-4 h-4 text-[#5ab39d]" />
                    </button>
                    <button className="p-2 rounded-lg transition-all hover:scale-110"
                      style={{
                        background: 'rgba(232, 79, 55, 0.2)',
                        border: '1px solid rgba(232, 79, 55, 0.3)'
                      }}>
                      <Trash2 className="w-4 h-4 text-[#e84f37]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Job erstellen Dialog */}
      <Dialog open={showCreateJob} onOpenChange={setShowCreateJob}>
        <DialogContent className="sm:max-w-2xl border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">Neue Stellenanzeige erstellen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Jobtitel</Label>
              <Input
                placeholder="z.B. Senior Developer"
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Standort</Label>
              <Input
                placeholder="z.B. Berlin"
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Beschreibung</Label>
              <Textarea
                placeholder="Beschreiben Sie die Stelle..."
                className="border-white/10 text-white/90 placeholder:text-white/40 min-h-32"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowCreateJob(false)}
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
                Erstellen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Kampagne erstellen Dialog */}
      <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
        <DialogContent className="sm:max-w-md border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">Neue Kampagne erstellen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Kampagnentitel</Label>
              <Input
                placeholder="z.B. Q1 Developer Kampagne"
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Laufzeit (Tage)</Label>
              <Input
                type="number"
                placeholder="30"
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Budget (€)</Label>
              <Input
                type="number"
                placeholder="500"
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowCreateCampaign(false)}
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
                Erstellen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mitglied einladen Dialog */}
      <Dialog open={showInviteMember} onOpenChange={setShowInviteMember}>
        <DialogContent className="sm:max-w-md border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">Teammitglied einladen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Name</Label>
              <Input
                placeholder="Max Mustermann"
                className="border-white/10 text-white/90 placeholder:text-white/40"
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
                placeholder="max@firma.de"
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Rolle</Label>
              <Select>
                <SelectTrigger className="border-white/10 text-white/90"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}>
                  <SelectValue placeholder="Rolle wählen" />
                </SelectTrigger>
                <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                  <SelectItem value="admin" className="text-white/90">Administrator</SelectItem>
                  <SelectItem value="recruiter" className="text-white/90">Recruiter</SelectItem>
                  <SelectItem value="viewer" className="text-white/90">Betrachter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowInviteMember(false)}
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
                Einladen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Profil bearbeiten Dialog */}
      <Dialog open={showEditProfile} onOpenChange={setShowEditProfile}>
        <DialogContent className="sm:max-w-2xl border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">Firmenprofil bearbeiten</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-white/70 mb-2 block">Firmenname</Label>
                <Input
                  defaultValue="TechCorp GmbH"
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
                  defaultValue="Sarah Johnson"
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
                  defaultValue="kontakt@techcorp.de"
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
                  defaultValue="+49 30 12345678"
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
                defaultValue="Musterstraße 123, 10115 Berlin, Deutschland"
                className="border-white/10 text-white/90"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowEditProfile(false)}
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

      {/* E-Mail-Vorlage erstellen Dialog */}
      <Dialog open={showCreateTemplate} onOpenChange={setShowCreateTemplate}>
        <DialogContent className="sm:max-w-2xl border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">Neue E-Mail-Vorlage erstellen</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Vorlagenname</Label>
              <Input
                placeholder="z.B. Bewerbungsbestätigung"
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Betreff</Label>
              <Input
                placeholder="z.B. Ihre Bewerbung bei uns"
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Nachricht</Label>
              <Textarea
                placeholder="Schreiben Sie Ihre Nachricht..."
                className="border-white/10 text-white/90 placeholder:text-white/40 min-h-40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Typ</Label>
              <Select>
                <SelectTrigger className="border-white/10 text-white/90"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}>
                  <SelectValue placeholder="Typ wählen" />
                </SelectTrigger>
                <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                  <SelectItem value="confirmation" className="text-white/90">Bestätigung</SelectItem>
                  <SelectItem value="invitation" className="text-white/90">Einladung</SelectItem>
                  <SelectItem value="rejection" className="text-white/90">Absage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowCreateTemplate(false)}
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
                Erstellen
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}