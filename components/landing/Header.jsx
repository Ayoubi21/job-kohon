import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Building2, Handshake, UserCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { base44 } from '@/api/base44Client';

function Label({ children, className, ...props }) {
  return <label className={className} {...props}>{children}</label>;
}

export default function Header() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', role: '' });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const user = await base44.auth.me();
      setCurrentUser(user);
    } catch (error) {
      setCurrentUser(null);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await base44.auth.redirectToLogin();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await base44.auth.logout();
      setCurrentUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const roleCards = [
    {
      icon: UserCircle,
      title: 'Kandidaten',
      description: 'Jobs finden',
      color: '#5ab39d',
      link: 'Kandidaten'
    },
    {
      icon: Building2,
      title: 'Arbeitgeber',
      description: 'Mitarbeiter finden',
      color: '#4a9b8a',
      link: 'Arbeitgeber'
    },
    {
      icon: Handshake,
      title: 'Auftraggeber',
      description: 'Projekte vergeben',
      color: '#3d7a6c',
      link: 'Auftraggeber'
    }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/10"
        style={{
          background: 'rgba(45, 45, 45, 0.8)'
        }}>
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'rgba(90, 179, 157, 0.15)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)',
                  boxShadow: '0 8px 32px rgba(90, 179, 157, 0.1)'
                }}>
                <Briefcase className="w-4 h-4 text-[#5ab39d]" />
              </div>
              <h1 className="text-xl font-bold text-white/90">Jobkorb</h1>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              {currentUser ? (
                <>
                  <span className="text-sm text-white/70">{currentUser.full_name || currentUser.email}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-1.5 rounded-xl text-sm font-medium text-white/80 transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'rgba(232, 79, 55, 0.2)',
                      border: '1px solid rgba(232, 79, 55, 0.3)'
                    }}
                  >
                    Abmelden
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="px-4 py-1.5 rounded-xl text-sm font-medium text-white/80 transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'rgba(90, 179, 157, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(90, 179, 157, 0.2)'
                    }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('register');
                      setShowAuthDialog(true);
                    }}
                    className="px-4 py-1.5 rounded-xl text-sm font-medium text-white transition-all duration-300 hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                      boxShadow: '0 8px 24px rgba(90, 179, 157, 0.3)'
                    }}
                  >
                    Registrieren
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Role Cards - Centered Below */}
          <div className="flex justify-center gap-3 mt-4">
            {roleCards.map((role, idx) => {
              const CardContent = (
                <div className="flex items-center gap-2">
                  <role.icon className="w-4 h-4 transition-colors group-hover:drop-shadow-lg" style={{ color: role.color }} />
                  <div className="text-left">
                    <div className="font-semibold text-xs text-white/90">{role.title}</div>
                    <div className="text-[10px] text-white/60">{role.description}</div>
                  </div>
                </div>
              );

              if (role.link) {
                return (
                  <Link
                    key={idx}
                    to={createPageUrl(role.link)}
                    className="px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105 group"
                    style={{
                      background: 'rgba(90, 179, 157, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(90, 179, 157, 0.2)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `rgba(90, 179, 157, 0.2)`;
                      e.currentTarget.style.boxShadow = `0 8px 24px ${role.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(90, 179, 157, 0.1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {CardContent}
                  </Link>
                );
              }

              return (
                <button
                  key={idx}
                  className="px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105 group"
                  style={{
                    background: 'rgba(90, 179, 157, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `rgba(90, 179, 157, 0.2)`;
                    e.currentTarget.style.boxShadow = `0 8px 24px ${role.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(90, 179, 157, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {CardContent}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md border-white/10"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
          }}>
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-bold text-white/90">
              Willkommen bei Jobkorb
            </DialogTitle>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4 p-1 rounded-xl"
              style={{
                background: 'rgba(90, 179, 157, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
              <TabsTrigger value="login" className="rounded-lg text-xs data-[state=active]:bg-[#5ab39d] data-[state=active]:text-white data-[state=active]:shadow-lg text-white/60">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg text-xs data-[state=active]:bg-[#5ab39d] data-[state=active]:text-white data-[state=active]:shadow-lg text-white/60">
                Registrieren
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="login-email" className="text-sm text-white/80">E-Mail</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="ihre@email.de"
                  className="border-white/10 text-white/90 placeholder:text-white/40 text-sm h-9"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="login-password" className="text-sm text-white/80">Passwort</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  className="border-white/10 text-white/90 placeholder:text-white/40 text-sm h-9"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
              </div>
              <button className="text-xs text-[#5ab39d] hover:underline">
                Passwort vergessen?
              </button>
              <Button
                onClick={handleLogin}
                className="w-full rounded-xl text-sm h-9 text-white"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 8px 24px rgba(90, 179, 157, 0.3)'
                }}
              >
                Anmelden
              </Button>
            </TabsContent>

            <TabsContent value="register" className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="role" className="text-sm text-white/80">Ich bin...</Label>
                <Select
                  value={registerData.role}
                  onValueChange={(value) => setRegisterData({ ...registerData, role: value })}
                >
                  <SelectTrigger className="border-white/10 text-white/90 text-sm h-9"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <SelectValue placeholder="Rolle auswählen" />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                    <SelectItem value="kandidat" className="text-white/90 text-sm">Kandidat</SelectItem>
                    <SelectItem value="arbeitgeber" className="text-white/90 text-sm">Arbeitgeber</SelectItem>
                    <SelectItem value="auftraggeber" className="text-white/90 text-sm">Auftraggeber</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm text-white/80">Name</Label>
                <Input
                  id="name"
                  placeholder="Max Mustermann"
                  className="border-white/10 text-white/90 placeholder:text-white/40 text-sm h-9"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="register-email" className="text-sm text-white/80">E-Mail</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="ihre@email.de"
                  className="border-white/10 text-white/90 placeholder:text-white/40 text-sm h-9"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="register-password" className="text-sm text-white/80">Passwort</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  className="border-white/10 text-white/90 placeholder:text-white/40 text-sm h-9"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)'
                  }}
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="terms" className="border-white/20 data-[state=checked]:bg-[#5ab39d] mt-0.5" />
                <label htmlFor="terms" className="text-xs text-white/60 leading-tight">
                  Ich akzeptiere die AGB und Datenschutzbestimmungen
                </label>
              </div>
              <Button
                className="w-full rounded-xl text-sm h-9 text-white"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 8px 24px rgba(90, 179, 157, 0.3)'
                }}
              >
                Konto erstellen
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}