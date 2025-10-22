import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X, Filter, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function FilterPanel({ isOpen, onClose }) {
  const [filters, setFilters] = useState({
    search: '',
    location: '',
    radius: [50],
    employmentType: [],
    contractType: '',
    remote: '',
    salaryMin: '',
    salaryMax: '',
    experience: '',
    category: '',
    languages: [],
    published: 'all'
  });

  const employmentTypes = ['Vollzeit', 'Teilzeit', 'Werkstudent', 'Freelance', 'Praktikum'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-white/10 overflow-hidden"
          style={{
            background: 'rgba(45, 45, 45, 0.95)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'rgba(90, 179, 157, 0.2)',
                    boxShadow: '0 8px 24px rgba(90, 179, 157, 0.2)'
                  }}>
                  <Filter className="w-5 h-5 text-[#5ab39d]" />
                </div>
                <h3 className="text-2xl font-bold text-white/90">Erweiterte Jobsuche</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl transition-all hover:scale-110"
                style={{
                  background: 'rgba(90, 179, 157, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}
                aria-label="Schließen"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Jobtitel / Skill</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="z.B. Softwareentwickler"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="pl-10 border-white/10 text-white/90 placeholder:text-white/40 focus:border-[#5ab39d]"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Ort</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="z.B. Berlin"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    className="pl-10 border-white/10 text-white/90 placeholder:text-white/40 focus:border-[#5ab39d]"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                </div>
              </div>

              {/* Radius */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">
                  Umkreis: {filters.radius[0]} km
                </label>
                <div className="px-4 py-4 rounded-xl"
                  style={{
                    background: 'rgba(90, 179, 157, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(90, 179, 157, 0.1)'
                  }}>
                  <Slider
                    value={filters.radius}
                    onValueChange={(value) => setFilters({ ...filters, radius: value })}
                    max={200}
                    step={10}
                    className="w-full [&_[role=slider]]:bg-[#5ab39d] [&_[role=slider]]:border-[#5ab39d]"
                  />
                </div>
              </div>

              {/* Employment Types */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-white/70">Anstellungsart</label>
                <div className="flex flex-wrap gap-2">
                  {employmentTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        const isSelected = filters.employmentType.includes(type);
                        setFilters({
                          ...filters,
                          employmentType: isSelected
                            ? filters.employmentType.filter(t => t !== type)
                            : [...filters.employmentType, type]
                        });
                      }}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                        filters.employmentType.includes(type)
                          ? 'text-white'
                          : 'text-white/60'
                      }`}
                      style={
                        filters.employmentType.includes(type)
                          ? {
                              background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                              boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
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

              {/* Contract Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Vertragsart</label>
                <Select
                  value={filters.contractType}
                  onValueChange={(value) => setFilters({ ...filters, contractType: value })}
                >
                  <SelectTrigger className="border-white/10 text-white/90"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <SelectValue placeholder="Auswählen" />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                    <SelectItem value="unlimited" className="text-white/90">Unbefristet</SelectItem>
                    <SelectItem value="limited" className="text-white/90">Befristet</SelectItem>
                    <SelectItem value="project" className="text-white/90">Projektbasiert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Remote */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Arbeitsmodell</label>
                <Select
                  value={filters.remote}
                  onValueChange={(value) => setFilters({ ...filters, remote: value })}
                >
                  <SelectTrigger className="border-white/10 text-white/90"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <SelectValue placeholder="Auswählen" />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                    <SelectItem value="onsite" className="text-white/90">Vor Ort</SelectItem>
                    <SelectItem value="hybrid" className="text-white/90">Hybrid</SelectItem>
                    <SelectItem value="remote" className="text-white/90">Remote</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Erfahrungslevel</label>
                <Select
                  value={filters.experience}
                  onValueChange={(value) => setFilters({ ...filters, experience: value })}
                >
                  <SelectTrigger className="border-white/10 text-white/90"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <SelectValue placeholder="Auswählen" />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                    <SelectItem value="junior" className="text-white/90">Junior</SelectItem>
                    <SelectItem value="mid" className="text-white/90">Mid-Level</SelectItem>
                    <SelectItem value="senior" className="text-white/90">Senior</SelectItem>
                    <SelectItem value="lead" className="text-white/90">Lead</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Salary Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Gehalt (€)</label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={filters.salaryMin}
                    onChange={(e) => setFilters({ ...filters, salaryMin: e.target.value })}
                    className="border-white/10 text-white/90 placeholder:text-white/40"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Input
                    placeholder="Max"
                    type="number"
                    value={filters.salaryMax}
                    onChange={(e) => setFilters({ ...filters, salaryMax: e.target.value })}
                    className="border-white/10 text-white/90 placeholder:text-white/40"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Branche</label>
                <Select
                  value={filters.category}
                  onValueChange={(value) => setFilters({ ...filters, category: value })}
                >
                  <SelectTrigger className="border-white/10 text-white/90"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <SelectValue placeholder="Auswählen" />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                    <SelectItem value="it" className="text-white/90">IT & Software</SelectItem>
                    <SelectItem value="marketing" className="text-white/90">Marketing</SelectItem>
                    <SelectItem value="finance" className="text-white/90">Finanzwesen</SelectItem>
                    <SelectItem value="healthcare" className="text-white/90">Gesundheitswesen</SelectItem>
                    <SelectItem value="engineering" className="text-white/90">Ingenieurwesen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Published */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Veröffentlicht</label>
                <Select
                  value={filters.published}
                  onValueChange={(value) => setFilters({ ...filters, published: value })}
                >
                  <SelectTrigger className="border-white/10 text-white/90"
                    style={{
                      background: 'rgba(90, 179, 157, 0.05)',
                      backdropFilter: 'blur(10px)'
                    }}>
                    <SelectValue placeholder="Alle" />
                  </SelectTrigger>
                  <SelectContent style={{ background: 'rgba(45, 45, 45, 0.95)', backdropFilter: 'blur(20px)' }} className="border-white/10">
                    <SelectItem value="all" className="text-white/90">Alle</SelectItem>
                    <SelectItem value="today" className="text-white/90">Heute</SelectItem>
                    <SelectItem value="week" className="text-white/90">Letzte 7 Tage</SelectItem>
                    <SelectItem value="2weeks" className="text-white/90">Letzte 14 Tage</SelectItem>
                    <SelectItem value="month" className="text-white/90">Letzte 30 Tage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              <button
                className="px-8 py-3 rounded-xl font-semibold text-white transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                  boxShadow: '0 8px 24px rgba(90, 179, 157, 0.4)'
                }}
              >
                <Filter className="w-4 h-4 inline mr-2" />
                Jobs filtern
              </button>
              <button
                onClick={() => setFilters({
                  search: '',
                  location: '',
                  radius: [50],
                  employmentType: [],
                  contractType: '',
                  remote: '',
                  salaryMin: '',
                  salaryMax: '',
                  experience: '',
                  category: '',
                  languages: [],
                  published: 'all'
                })}
                className="px-8 py-3 rounded-xl font-semibold text-white/80 transition-all hover:scale-105"
                style={{
                  background: 'rgba(90, 179, 157, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(90, 179, 157, 0.2)'
                }}
              >
                <RotateCcw className="w-4 h-4 inline mr-2" />
                Zurücksetzen
              </button>
            </div>

            {/* Results Preview */}
            <div className="mt-8 space-y-4">
              <h4 className="text-lg font-semibold text-white/90">Gefundene Jobs (247)</h4>
              <div className="grid gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl transition-all hover:scale-102"
                    style={{
                      background: 'rgba(90, 179, 157, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(90, 179, 157, 0.2)'
                    }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h5 className="text-lg font-bold text-white/90">Senior Frontend Developer</h5>
                        <p className="text-sm text-white/60">TechCorp GmbH • Berlin</p>
                      </div>
                      <Badge className="bg-[#4a9b8a] text-white border-none">Remote</Badge>
                    </div>
                    <p className="text-sm text-white/60 mb-3">
                      Wir suchen einen erfahrenen Frontend Developer mit React-Kenntnissen...
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="outline" className="border-white/20 text-[#5ab39d]">React</Badge>
                      <Badge variant="outline" className="border-white/20 text-[#5ab39d]">TypeScript</Badge>
                      <Badge variant="outline" className="border-white/20 text-[#5ab39d]">Tailwind</Badge>
                    </div>
                    <button
                      className="px-6 py-2 rounded-xl font-medium text-white"
                      style={{
                        background: 'linear-gradient(135deg, #5ab39d 0%, #4a9b8a 100%)',
                        boxShadow: '0 4px 12px rgba(90, 179, 157, 0.4)'
                      }}
                    >
                      Jetzt bewerben
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}