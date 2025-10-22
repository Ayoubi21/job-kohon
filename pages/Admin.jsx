import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Briefcase, FileText, Target, Database, 
  Mail, Settings, DollarSign, TrendingUp, Search, Filter,
  Plus, Edit, Trash2, Eye, Download, CheckCircle, XCircle, Clock,
  Shield, Home, Bell, Building2
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
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function Label({ children, className, ...props }) {
  return <label className={className} {...props}>{children}</label>;
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const user = await base44.auth.me();
      if (!user || user.user_role !== 'admin') {
        window.location.href = createPageUrl('Home');
        return;
      }
      setCurrentUser(user);
    } catch (error) {
      window.location.href = createPageUrl('Home');
    }
  };

  // Fetch all users
  const { data: users = [] } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      try {
        return await base44.asServiceRole.entities.User.list();
      } catch (error) {
        console.error('Error loading users:', error);
        return [];
      }
    },
    enabled: !!currentUser
  });

  // Fetch all jobs
  const { data: jobs = [] } = useQuery({
    queryKey: ['admin-jobs'],
    queryFn: async () => {
      try {
        return await base44.asServiceRole.entities.Job.list('-created_date');
      } catch (error) {
        console.error('Error loading jobs:', error);
        return [];
      }
    },
    enabled: !!currentUser
  });

  // Fetch all applications
  const { data: applications = [] } = useQuery({
    queryKey: ['admin-applications'],
    queryFn: async () => {
      try {
        return await base44.asServiceRole.entities.Application.list('-created_date');
      } catch (error) {
        console.error('Error loading applications:', error);
        return [];
      }
    },
    enabled: !!currentUser
  });

  // Fetch all campaigns
  const { data: campaigns = [] } = useQuery({
    queryKey: ['admin-campaigns'],
    queryFn: async () => {
      try {
        return await base44.asServiceRole.entities.Campaign.list('-created_date');
      } catch (error) {
        console.error('Error loading campaigns:', error);
        return [];
      }
    },
    enabled: !!currentUser
  });

  // Fetch all orders
  const { data: orders = [] } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: async () => {
      try {
        return await base44.asServiceRole.entities.Order.list('-created_date');
      } catch (error) {
        console.error('Error loading orders:', error);
        return [];
      }
    },
    enabled: !!currentUser
  });

  // Create User Mutation
  const createUserMutation = useMutation({
    mutationFn: async (userData) => {
      return await base44.asServiceRole.entities.User.create(userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setShowCreateUser(false);
    }
  });

  // Create Job Mutation
  const createJobMutation = useMutation({
    mutationFn: async (jobData) => {
      return await base44.asServiceRole.entities.Job.create(jobData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] });
      setShowCreateJob(false);
    }
  });

  // Create Campaign Mutation
  const createCampaignMutation = useMutation({
    mutationFn: async (campaignData) => {
      return await base44.asServiceRole.entities.Campaign.create(campaignData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
      setShowCreateCampaign(false);
    }
  });

  // Dashboard Stats
  const dashboardStats = [
    { label: 'Nutzer gesamt', value: users.length.toString(), icon: Users, color: '#5ab39d', trend: '+12%' },
    { label: 'Aktive Jobs', value: jobs.filter(j => j.status === 'live').length.toString(), icon: Briefcase, color: '#4a9b8a', trend: '+8%' },
    { label: 'Bewerbungen', value: applications.length.toString(), icon: FileText, color: '#3d7a6c', trend: '+24%' },
    { label: 'Kampagnen', value: campaigns.length.toString(), icon: Target, color: '#2e6054', trend: '+5%' }
  ];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Nutzer', icon: Users },
    { id: 'jobs', label: 'Jobs & Anzeigen', icon: Briefcase },
    { id: 'applications', label: 'Bewerbungen', icon: FileText },
    { id: 'orders', label: 'Aufträge', icon: Building2 },
    { id: 'campaigns', label: 'Kampagnen', icon: Target },
    { id: 'cvdatabase', label: 'CV-Datenbank', icon: Database },
    { id: 'templates', label: 'E-Mail-Vorlagen', icon: Mail },
    { id: 'settings', label: 'Einstellungen', icon: Settings }
  ];

  const handleCreateUser = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    createUserMutation.mutate({
      full_name: formData.get('name'),
      email: formData.get('email'),
      user_role: formData.get('role')
    });
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    createJobMutation.mutate({
      title: formData.get('title'),
      description: formData.get('description'),
      company: formData.get('company'),
      location: formData.get('location'),
      employment_type: formData.get('employment_type'),
      status: 'live',
      employer_id: currentUser.id
    });
  };

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    createCampaignMutation.mutate({
      title: formData.get('title'),
      duration: formData.get('duration'),
      budget: parseFloat(formData.get('budget')),
      status: 'active',
      employer_id: currentUser.id
    });
  };

  if (!currentUser) {
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
                <Shield className="w-5 h-5 text-[#5ab39d]" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white/90">Jobkorb</h1>
                <p className="text-xs text-white/60">Admin-Panel</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-xl transition-all hover:scale-105"
                style={{
                  background: 'rgba(90, 179, 157, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}>
                <Bell className="w-5 h-5 text-white/80" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)' }}>
                  {applications.filter(a => a.status === 'new').length}
                </span>
              </button>
              <Link to={createPageUrl('Home')}
                className="px-4 py-2 rounded-xl text-sm font-medium text-white/80 transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'rgba(90, 179, 157, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}>
                <Home className="w-4 h-4" />
                Zur Startseite
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="border-b border-white/10" style={{ background: 'rgba(45, 45, 45, 0.5)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition-all whitespace-nowrap text-sm ${
                  activeTab === item.id ? 'text-white' : 'text-white/60'
                }`}
                style={activeTab === item.id ? {
                  borderBottom: '2px solid #5ab39d',
                  background: 'rgba(90, 179, 157, 0.1)'
                } : {}}>
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
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white/90">Dashboard</h2>
              <button className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                }}>
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dashboardStats.map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl transition-all hover:scale-105"
                  style={{
                    background: 'rgba(90, 179, 157, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)'
                  }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${stat.color}20` }}>
                      <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <span className="text-xs font-semibold text-[#81c784]">{stat.trend}</span>
                  </div>
                  <div className="text-2xl font-bold text-white/90">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(90, 179, 157, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}>
                <div className="p-4 border-b border-white/10">
                  <h3 className="font-bold text-white/90">Neueste Bewerbungen</h3>
                </div>
                <div className="p-4 space-y-2">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="p-3 rounded-xl"
                      style={{ background: 'rgba(90, 179, 157, 0.05)' }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-semibold text-white/90">{app.candidate_name}</div>
                          <div className="text-xs text-white/60">{app.candidate_email}</div>
                        </div>
                        <Badge className="bg-[#5ab39d] text-white capitalize">{app.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(90, 179, 157, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}>
                <div className="p-4 border-b border-white/10">
                  <h3 className="font-bold text-white/90">Aktive Jobs</h3>
                </div>
                <div className="p-4 space-y-2">
                  {jobs.filter(j => j.status === 'live').slice(0, 5).map((job) => (
                    <div key={job.id} className="p-3 rounded-xl"
                      style={{ background: 'rgba(90, 179, 157, 0.05)' }}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-semibold text-white/90">{job.title}</div>
                          <div className="text-xs text-white/60">{job.company} • {job.location}</div>
                        </div>
                        <Badge className="bg-[#5ab39d] text-white">{job.views || 0} Views</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white/90">Nutzerverwaltung ({users.length})</h2>
              <button onClick={() => setShowCreateUser(true)}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
                }}>
                <Plus className="w-5 h-5" />
                Nutzer erstellen
              </button>
            </div>

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
                      <th className="text-left p-4 text-sm font-semibold text-white/70">E-Mail</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Rolle</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Registriert</th>
                      <th className="text-right p-4 text-sm font-semibold text-white/70">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-sm text-white/90 font-medium">{user.full_name || 'Unbekannt'}</td>
                        <td className="p-4 text-sm text-white/70">{user.email}</td>
                        <td className="p-4">
                          <Badge className="bg-[#4a9b8a] text-white capitalize">{user.user_role || 'kandidat'}</Badge>
                        </td>
                        <td className="p-4 text-sm text-white/70">
                          {new Date(user.created_date).toLocaleDateString()}
                        </td>
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
                                background: 'rgba(90, 179, 157, 0.2)',
                                border: '1px solid rgba(90, 179, 157, 0.3)'
                              }}>
                              <Eye className="w-4 h-4 text-[#5ab39d]" />
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

        {/* Jobs */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white/90">Jobs & Anzeigen ({jobs.length})</h2>
              <button onClick={() => setShowCreateJob(true)}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
                }}>
                <Plus className="w-5 h-5" />
                Job erstellen
              </button>
            </div>

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
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Titel</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Unternehmen</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Ort</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Status</th>
                      <th className="text-right p-4 text-sm font-semibold text-white/70">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-sm text-white/90 font-medium">{job.title}</td>
                        <td className="p-4 text-sm text-white/70">{job.company}</td>
                        <td className="p-4 text-sm text-white/70">{job.location}</td>
                        <td className="p-4">
                          <Badge 
                            className="text-white capitalize"
                            style={{ 
                              background: job.status === 'live' ? '#5ab39d' : 
                                         job.status === 'draft' ? '#6b7280' : '#e84f37'
                            }}>
                            {job.status}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-end">
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

        {/* Applications */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white/90">Bewerbungen ({applications.length})</h2>
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
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Kandidat</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">E-Mail</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Job ID</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Datum</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app) => (
                      <tr key={app.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-sm text-white/90 font-medium">{app.candidate_name}</td>
                        <td className="p-4 text-sm text-white/70">{app.candidate_email}</td>
                        <td className="p-4 text-sm text-white/70">{app.job_id.substring(0, 8)}...</td>
                        <td className="p-4">
                          <Badge className="bg-[#5ab39d] text-white capitalize">{app.status}</Badge>
                        </td>
                        <td className="p-4 text-sm text-white/70">
                          {new Date(app.created_date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white/90">Aufträge ({orders.length})</h2>
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
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Titel</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Kategorie</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Budget</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Status</th>
                      <th className="text-left p-4 text-sm font-semibold text-white/70">Erstellt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-sm text-white/90 font-medium">{order.title}</td>
                        <td className="p-4 text-sm text-white/70">{order.category || 'Allgemein'}</td>
                        <td className="p-4 text-sm text-white/70">
                          {order.budget_min && order.budget_max ? 
                            `${order.budget_min}-${order.budget_max}€` : 
                            'Nach Vereinbarung'}
                        </td>
                        <td className="p-4">
                          <Badge className="bg-[#5ab39d] text-white capitalize">{order.status}</Badge>
                        </td>
                        <td className="p-4 text-sm text-white/70">
                          {new Date(order.created_date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Campaigns */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white/90">Kampagnen ({campaigns.length})</h2>
              <button onClick={() => setShowCreateCampaign(true)}
                className="px-6 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
                }}>
                <Plus className="w-5 h-5" />
                Kampagne erstellen
              </button>
            </div>

            {campaigns.length > 0 ? (
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
                        <th className="text-left p-4 text-sm font-semibold text-white/70">Titel</th>
                        <th className="text-left p-4 text-sm font-semibold text-white/70">Laufzeit</th>
                        <th className="text-left p-4 text-sm font-semibold text-white/70">Budget</th>
                        <th className="text-left p-4 text-sm font-semibold text-white/70">Status</th>
                        <th className="text-right p-4 text-sm font-semibold text-white/70">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaigns.map((campaign) => (
                        <tr key={campaign.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="p-4 text-sm text-white/90 font-medium">{campaign.title}</td>
                          <td className="p-4 text-sm text-white/70">{campaign.duration}</td>
                          <td className="p-4 text-sm text-white/70">{campaign.budget}€</td>
                          <td className="p-4">
                            <Badge className="bg-[#5ab39d] text-white capitalize">{campaign.status}</Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2 justify-end">
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
            ) : (
              <div className="p-12 rounded-2xl text-center"
                style={{
                  background: 'rgba(90, 179, 157, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}>
                <Target className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 mb-4">Keine Kampagnen vorhanden</p>
                <Button onClick={() => setShowCreateCampaign(true)}
                  className="text-white"
                  style={{
                    background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                    boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                  }}>
                  Erste Kampagne erstellen
                </Button>
              </div>
            )}
          </div>
        )}

        {/* CV Database */}
        {activeTab === 'cvdatabase' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white/90">CV-Datenbank</h2>
            <div className="p-12 rounded-2xl text-center"
              style={{
                background: 'rgba(90, 179, 157, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(90, 179, 157, 0.2)'
              }}>
              <Database className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">CV-Datenbank Verwaltung</p>
            </div>
          </div>
        )}

        {/* Templates */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white/90">E-Mail-Vorlagen</h2>
            <div className="p-12 rounded-2xl text-center"
              style={{
                background: 'rgba(90, 179, 157, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(90, 179, 157, 0.2)'
              }}>
              <Mail className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">E-Mail-Vorlagen Verwaltung</p>
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white/90">Einstellungen</h2>
            <div className="p-8 rounded-2xl"
              style={{
                background: 'rgba(90, 179, 157, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(90, 179, 157, 0.2)'
              }}>
              <h3 className="text-lg font-semibold text-white/90 mb-4">Plattform-Einstellungen</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm text-white/70 mb-2 block">Plattformname</Label>
                  <Input defaultValue="Jobkorb" className="border-white/10 text-white/90"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }} />
                </div>
                <div>
                  <Label className="text-sm text-white/70 mb-2 block">Support E-Mail</Label>
                  <Input defaultValue="support@jobkorb.de" className="border-white/10 text-white/90"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }} />
                </div>
              </div>
              <div className="mt-6">
                <Button className="text-white"
                  style={{
                    background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                    boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                  }}>
                  Einstellungen speichern
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create User Dialog */}
      <Dialog open={showCreateUser} onOpenChange={setShowCreateUser}>
        <DialogContent className="sm:max-w-md border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">Neuen Nutzer erstellen</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Name</Label>
              <Input name="name" placeholder="Max Mustermann" required className="border-white/10 text-white/90"
                style={{ background: 'rgba(90, 179, 157, 0.05)' }} />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">E-Mail</Label>
              <Input name="email" type="email" placeholder="max@example.com" required className="border-white/10 text-white/90"
                style={{ background: 'rgba(90, 179, 157, 0.05)' }} />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Rolle</Label>
              <Select name="role" defaultValue="kandidat">
                <SelectTrigger className="border-white/10 text-white/90"
                  style={{ background: 'rgba(90, 179, 157, 0.05)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)' }} className="border-white/10">
                  <SelectItem value="kandidat" className="text-white/90">Kandidat</SelectItem>
                  <SelectItem value="arbeitgeber" className="text-white/90">Arbeitgeber</SelectItem>
                  <SelectItem value="auftraggeber" className="text-white/90">Auftraggeber</SelectItem>
                  <SelectItem value="admin" className="text-white/90">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Button type="button" onClick={() => setShowCreateUser(false)} variant="outline" className="flex-1 border-white/10 text-white/80">
                Abbrechen
              </Button>
              <Button type="submit" className="flex-1 text-white" style={{ background: '#5ab39d' }}>
                Erstellen
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create Job Dialog */}
      <Dialog open={showCreateJob} onOpenChange={setShowCreateJob}>
        <DialogContent className="sm:max-w-md border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">Neuen Job erstellen</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateJob} className="space-y-4">
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Jobtitel</Label>
              <Input name="title" placeholder="z.B. Senior Developer" required className="border-white/10 text-white/90"
                style={{ background: 'rgba(90, 179, 157, 0.05)' }} />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Unternehmen</Label>
              <Input name="company" placeholder="Firmenname" required className="border-white/10 text-white/90"
                style={{ background: 'rgba(90, 179, 157, 0.05)' }} />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Standort</Label>
              <Input name="location" placeholder="z.B. Berlin" required className="border-white/10 text-white/90"
                style={{ background: 'rgba(90, 179, 157, 0.05)' }} />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Beschreibung</Label>
              <Textarea name="description" rows={4} placeholder="Jobbeschreibung..." required className="border-white/10 text-white/90"
                style={{ background: 'rgba(90, 179, 157, 0.05)' }} />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Anstellungsart</Label>
              <Select name="employment_type" defaultValue="Vollzeit">
                <SelectTrigger className="border-white/10 text-white/90"
                  style={{ background: 'rgba(90, 179, 157, 0.05)' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)' }} className="border-white/10">
                  <SelectItem value="Vollzeit" className="text-white/90">Vollzeit</SelectItem>
                  <SelectItem value="Teilzeit" className="text-white/90">Teilzeit</SelectItem>
                  <SelectItem value="Freelance" className="text-white/90">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3">
              <Button type="button" onClick={() => setShowCreateJob(false)} variant="outline" className="flex-1 border-white/10 text-white/80">
                Abbrechen
              </Button>
              <Button type="submit" className="flex-1 text-white" style={{ background: '#5ab39d' }}>
                Erstellen
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Create Campaign Dialog */}
      <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
        <DialogContent className="sm:max-w-md border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white/90">Neue Kampagne erstellen</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateCampaign} className="space-y-4">
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Kampagnenname</Label>
              <Input name="title" placeholder="z.B. Developer Kampagne Q1" required className="border-white/10 text-white/90"
                style={{ background: 'rgba(90, 179, 157, 0.05)' }} />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Laufzeit</Label>
              <Input name="duration" placeholder="z.B. 30 Tage" required className="border-white/10 text-white/90"
                style={{ background: 'rgba(90, 179, 157, 0.05)' }} />
            </div>
            <div>
              <Label className="text-sm text-white/70 mb-2 block">Budget (€)</Label>
              <Input name="budget" type="number" placeholder="500" required className="border-white/10 text-white/90"
                style={{ background: 'rgba(90, 179, 157, 0.05)' }} />
            </div>
            <div className="flex gap-3">
              <Button type="button" onClick={() => setShowCreateCampaign(false)} variant="outline" className="flex-1 border-white/10 text-white/80">
                Abbrechen
              </Button>
              <Button type="submit" className="flex-1 text-white" style={{ background: '#5ab39d' }}>
                Erstellen
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}