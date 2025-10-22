import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Bell, Briefcase, Bookmark, FileText, Search, MapPin, Filter, X, Plus } from 'lucide-react';
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

function Label({ children, className, ...props }) {
  return <label className={className} {...props}>{children}</label>;
}

export default function Kandidaten() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showJobalarm, setShowJobalarm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    employmentType: '',
    contractType: '',
    remote: ''
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const user = await base44.auth.me();
      setCurrentUser(user);
      setLoading(false);
    } catch (error) {
      console.error("Error loading user:", error);
      setLoading(false);
    }
  };

  // Fetch Applications
  const { data: applications = [] } = useQuery({
    queryKey: ['applications', currentUser?.id],
    queryFn: async () => {
      if (!currentUser) return [];
      try {
        return await base44.entities.Application.filter({ candidate_id: currentUser.id }, '-created_date');
      } catch (error) {
        console.error("Error loading applications:", error);
        return [];
      }
    },
    enabled: !!currentUser
  });

  // Fetch Saved Jobs
  const { data: savedJobs = [] } = useQuery({
    queryKey: ['savedJobs', currentUser?.id],
    queryFn: async () => {
      if (!currentUser) return [];
      try {
        return await base44.entities.SavedJob.filter({ candidate_id: currentUser.id }, '-created_date');
      } catch (error) {
        console.error("Error loading saved jobs:", error);
        return [];
      }
    },
    enabled: !!currentUser
  });

  // Fetch Jobs
  const { data: jobs = [] } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      try {
        const filterObj = { status: 'live' };
        if (filters.employmentType) filterObj.employment_type = filters.employmentType;
        if (filters.contractType) filterObj.contract_type = filters.contractType;
        if (filters.remote) filterObj.remote = filters.remote;
        
        return await base44.entities.Job.filter(filterObj, '-created_date', 50);
      } catch (error) {
        console.error("Error loading jobs:", error);
        return [];
      }
    }
  });

  // Fetch Notifications
  const { data: notifications = [] } = useQuery({
    queryKey: ['notifications', currentUser?.id],
    queryFn: async () => {
      if (!currentUser) return [];
      try {
        return await base44.entities.Notification.filter({ user_id: currentUser.id }, '-created_date', 10);
      } catch (error) {
        console.error("Error loading notifications:", error);
        return [];
      }
    },
    enabled: !!currentUser
  });

  // Save Job Mutation
  const saveJobMutation = useMutation({
    mutationFn: async (jobId) => {
      return await base44.entities.SavedJob.create({
        job_id: jobId,
        candidate_id: currentUser.id
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedJobs'] });
    }
  });

  // Apply for Job Mutation
  const applyMutation = useMutation({
    mutationFn: async (applicationData) => {
      return await base44.entities.Application.create(applicationData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['applications'] });
      setShowApplicationForm(false);
      setSelectedJob(null);
    }
  });

  const handleLogout = async () => {
    try {
      await base44.auth.logout();
      window.location.href = createPageUrl('Home');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleSaveJob = (jobId) => {
    if (!currentUser) {
      alert('Bitte melden Sie sich an, um Jobs zu speichern');
      return;
    }
    saveJobMutation.mutate(jobId);
  };

  const handleApply = (job) => {
    if (!currentUser) {
      alert('Bitte melden Sie sich an, um sich zu bewerben');
      return;
    }
    setSelectedJob(job);
    setShowApplicationForm(true);
  };

  const submitApplication = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    applyMutation.mutate({
      job_id: selectedJob.id,
      candidate_id: currentUser.id,
      candidate_name: currentUser.full_name || currentUser.email,
      candidate_email: currentUser.email,
      cover_letter: formData.get('cover_letter'),
      cv_url: formData.get('cv_url') || '',
      status: 'new'
    });
  };

  const dashboardStats = [
    { icon: FileText, label: 'Bewerbungen', value: applications.length.toString(), color: '#5ab39d' },
    { icon: Bookmark, label: 'Gespeichert', value: savedJobs.length.toString(), color: '#4a9b8a' },
    { icon: Briefcase, label: 'Verfügbare Jobs', value: jobs.length.toString(), color: '#3d7a6c' }
  ];

  const employmentTypes = ['Vollzeit', 'Teilzeit', 'Werkstudent', 'Freelance', 'Praktikum'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#2d2d2d' }}>
        <p className="text-white/60">Laden...</p>
      </div>
    );
  }

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
                <h1 className="text-xl font-bold text-white/90">Jobkorb</h1>
                <p className="text-xs text-white/60">Kandidaten-Dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currentUser && (
                <>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-xl transition-all hover:scale-105"
                    style={{
                      background: 'rgba(90, 179, 157, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(90, 179, 157, 0.2)'
                    }}
                  >
                    <Bell className="w-5 h-5 text-white/80" />
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)' }}>
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </button>
                  
                  <span className="text-sm text-white/70 hidden md:inline">
                    {currentUser.full_name || currentUser.email}
                  </span>
                </>
              )}
              
              <Link
                to={createPageUrl('Home')}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white/80 transition-all hover:scale-105"
                style={{
                  background: 'rgba(90, 179, 157, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}
              >
                Zur Startseite
              </Link>
              
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white/80 transition-all hover:scale-105"
                  style={{
                    background: 'rgba(232, 79, 55, 0.2)',
                    border: '1px solid rgba(232, 79, 55, 0.3)'
                  }}
                >
                  Abmelden
                </button>
              ) : (
                <button
                  onClick={() => base44.auth.redirectToLogin()}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                  style={{
                    background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                    boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                  }}
                >
                  Anmelden
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="fixed top-20 right-4 w-96 rounded-2xl overflow-hidden z-50"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(90, 179, 157, 0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}>
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white/90">Benachrichtigungen</h3>
              <button onClick={() => setShowNotifications(false)}>
                <X className="w-4 h-4 text-white/60" />
              </button>
            </div>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#5ab39d] mt-2"></span>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-white/90">{notif.title}</p>
                      <p className="text-xs text-white/60 mt-1">{notif.message}</p>
                      <span className="text-xs text-white/40 mt-1 block">
                        {new Date(notif.created_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-white/60 text-center">Keine neuen Benachrichtigungen.</div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      {currentUser && (
        <div className="border-b border-white/10"
          style={{ background: 'rgba(45, 45, 45, 0.5)', backdropFilter: 'blur(10px)' }}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Briefcase },
                { id: 'applications', label: 'Bewerbungen', icon: FileText },
                { id: 'saved', label: 'Gespeichert', icon: Bookmark },
                { id: 'jobalarm', label: 'Jobalarm', icon: Bell }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'jobalarm') {
                      setShowJobalarm(true);
                    } else {
                      setActiveTab(tab.id);
                    }
                  }}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id ? 'text-white' : 'text-white/60'
                  }`}
                  style={
                    activeTab === tab.id
                      ? {
                          borderBottom: '2px solid #5ab39d',
                          background: 'rgba(90, 179, 157, 0.1)'
                        }
                      : {}
                  }
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-white/90">Dashboard</h2>
            
            {/* Stats Cards */}
            {currentUser && (
              <div className="grid md:grid-cols-3 gap-6">
                {dashboardStats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl transition-all hover:scale-105"
                    style={{
                      background: 'rgba(90, 179, 157, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(90, 179, 157, 0.2)',
                      boxShadow: `0 8px 24px ${stat.color}20`
                    }}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                          background: `${stat.color}20`,
                          boxShadow: `0 4px 12px ${stat.color}30`
                        }}
                      >
                        <stat.icon className="w-7 h-7" style={{ color: stat.color }} />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-white/90">{stat.value}</div>
                        <div className="text-sm text-white/60">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Job Search */}
            <div className="p-8 rounded-3xl"
              style={{
                background: 'rgba(90, 179, 157, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(90, 179, 157, 0.2)'
              }}>
              <h2 className="text-2xl font-bold text-white/90 mb-6">Job-Suche</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Jobtitel oder Skill"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="pl-10 border-white/10 text-white/90 placeholder:text-white/40"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                </div>

                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Ort"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="pl-10 border-white/10 text-white/90 placeholder:text-white/40"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                </div>

                <Select
                  value={filters.contractType}
                  onValueChange={(value) => setFilters({ ...filters, contractType: value })}
                >
                  <SelectTrigger className="border-white/10 text-white/90"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <SelectValue placeholder="Vertragsart" />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                    <SelectItem value="unlimited" className="text-white/90">Unbefristet</SelectItem>
                    <SelectItem value="limited" className="text-white/90">Befristet</SelectItem>
                    <SelectItem value="project" className="text-white/90">Projektbasiert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {employmentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilters({ ...filters, employmentType: filters.employmentType === type ? '' : type })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      filters.employmentType === type ? 'text-white' : 'text-white/60'
                    }`}
                    style={
                      filters.employmentType === type
                        ? {
                            background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                            boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                          }
                        : {
                            background: 'rgba(90, 179, 157, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(90, 179, 157, 0.2)'
                          }
                    }
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Jobs */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white/90">Verfügbare Jobs ({jobs.length})</h3>
              {jobs.length > 0 ? (
                jobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 rounded-2xl transition-all hover:scale-[1.01]"
                    style={{
                      background: 'rgba(90, 179, 157, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(90, 179, 157, 0.2)'
                    }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-white/90">{job.title}</h4>
                        <p className="text-sm text-white/60">{job.company} • {job.location}</p>
                      </div>
                      <Badge className="bg-[#4a9b8a] text-white border-none">
                        {job.remote === 'remote' ? 'Remote' : job.remote === 'hybrid' ? 'Hybrid' : 'Vor Ort'}
                      </Badge>
                    </div>
                    {job.description && (
                      <p className="text-sm text-white/70 mb-3 line-clamp-2">{job.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.tags && job.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="border-white/20 text-[#5ab39d]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white/80">
                        {job.salary_min && job.salary_max ? `${job.salary_min}-${job.salary_max}€` : 'Nach Vereinbarung'}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveJob(job.id)}
                          disabled={!currentUser}
                          className="p-2 rounded-lg transition-all hover:scale-110 disabled:opacity-50"
                          style={{
                            background: 'rgba(90, 179, 157, 0.2)',
                            border: '1px solid rgba(90, 179, 157, 0.3)'
                          }}
                        >
                          <Bookmark className="w-4 h-4 text-[#5ab39d]" />
                        </button>
                        <button
                          onClick={() => handleApply(job)}
                          disabled={!currentUser}
                          className="px-6 py-2 rounded-xl font-medium text-white transition-all hover:scale-105 disabled:opacity-50"
                          style={{
                            background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                            boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                          }}
                        >
                          Bewerben
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 rounded-2xl text-center"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)'
                  }}>
                  <Briefcase className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <p className="text-white/60">Keine Jobs gefunden.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Applications */}
        {activeTab === 'applications' && currentUser && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white/90">Meine Bewerbungen ({applications.length})</h2>
            {applications.length > 0 ? (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="p-6 rounded-2xl transition-all hover:scale-[1.01]"
                  style={{
                    background: 'rgba(90, 179, 157, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)'
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-white/90">Bewerbung #{app.id.substring(0, 8)}</h4>
                      <p className="text-sm text-white/60">Job ID: {app.job_id.substring(0, 8)}</p>
                      <p className="text-xs text-white/40 mt-1">
                        Beworben am {new Date(app.created_date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      className="border-none text-white capitalize"
                      style={{
                        background: app.status === 'new' ? '#5ab39d' : 
                                   app.status === 'read' ? '#4a9eff' :
                                   app.status === 'invited' ? '#81c784' :
                                   app.status === 'rejected' ? '#e84f37' : '#6b7280'
                      }}
                    >
                      {app.status}
                    </Badge>
                  </div>
                  {app.cover_letter && (
                    <p className="text-sm text-white/70 mb-3 line-clamp-3">{app.cover_letter}</p>
                  )}
                </div>
              ))
            ) : (
              <div className="p-12 rounded-2xl text-center"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}>
                <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">Sie haben sich noch nicht beworben.</p>
              </div>
            )}
          </div>
        )}

        {/* Saved Jobs */}
        {activeTab === 'saved' && currentUser && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white/90">Gespeicherte Jobs ({savedJobs.length})</h2>
            {savedJobs.length > 0 ? (
              savedJobs.map((savedJob) => (
                <div
                  key={savedJob.id}
                  className="p-6 rounded-2xl transition-all hover:scale-[1.01]"
                  style={{
                    background: 'rgba(90, 179, 157, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)'
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-white/90">Job ID: {savedJob.job_id.substring(0, 8)}</h4>
                      <p className="text-xs text-white/40 mt-1">
                        Gespeichert am {new Date(savedJob.created_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="px-6 py-2 rounded-xl font-medium text-white transition-all hover:scale-105"
                        style={{
                          background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                          boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                        }}
                      >
                        Bewerben
                      </button>
                      <button
                        className="p-2 rounded-lg transition-all hover:scale-110"
                        style={{
                          background: 'rgba(232, 79, 55, 0.2)',
                          border: '1px solid rgba(232, 79, 55, 0.3)'
                        }}
                      >
                        <X className="w-4 h-4 text-[#e84f37]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 rounded-2xl text-center"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}>
                <Bookmark className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60">Sie haben noch keine Jobs gespeichert.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Application Form Dialog */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="sm:max-w-md border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">
              Bewerbung für {selectedJob?.title}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submitApplication} className="space-y-4">
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Anschreiben</Label>
              <Textarea
                name="cover_letter"
                placeholder="Warum sind Sie der ideale Kandidat?"
                rows={6}
                required
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Lebenslauf URL (optional)</Label>
              <Input
                name="cv_url"
                type="url"
                placeholder="https://..."
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => setShowApplicationForm(false)}
                variant="outline"
                className="flex-1 border-white/10 text-white/80"
              >
                Abbrechen
              </Button>
              <Button
                type="submit"
                className="flex-1 text-white"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                }}
              >
                Bewerbung absenden
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Jobalarm Dialog */}
      <Dialog open={showJobalarm} onOpenChange={setShowJobalarm}>
        <DialogContent className="sm:max-w-md border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">Jobalarm einrichten</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-sm text-white/70 mb-2 block">E-Mail</Label>
              <Input
                type="email"
                defaultValue={currentUser?.email}
                className="border-white/10 text-white/90 placeholder:text-white/40"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)'
                }}
              />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Jobkategorie</Label>
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
                  <SelectItem value="marketing" className="text-white/90">Marketing</SelectItem>
                  <SelectItem value="finance" className="text-white/90">Finanzwesen</SelectItem>
                </SelectContent>
              </Select>
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
            <Button
              className="w-full rounded-xl text-white"
              style={{
                background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
              }}
            >
              Jobalarm speichern
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}