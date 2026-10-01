import React, { useState, useMemo } from 'react';
import { EducationalResource, ResourceCategory, EducationLevel, DifficultyLevel } from '../../types';
import { Search, Filter, RotateCcw, BookOpen, Layers } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';

interface ResourcesCatalogProps {
  resources: EducationalResource[];
  activeSubcategory?: string;
  onSelectResource: (res: EducationalResource) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const ResourcesCatalog: React.FC<ResourcesCatalogProps> = ({
  resources,
  activeSubcategory,
  onSelectResource,
  searchQuery,
  onSearchChange
}) => {
  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>(activeSubcategory || 'all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  // Keep category in sync with sidebar subcategory if selected
  React.useEffect(() => {
    if (activeSubcategory) {
      setSelectedCategory(activeSubcategory);
    }
  }, [activeSubcategory]);

  const uniqueThemes = useMemo(() => {
    const set = new Set<string>();
    resources.forEach((r) => set.add(r.theme));
    return Array.from(set);
  }, [resources]);

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      // Category match
      if (selectedCategory !== 'all' && res.category !== selectedCategory) {
        return false;
      }
      // Level match
      if (selectedLevel !== 'all' && res.educationLevel !== selectedLevel) {
        return false;
      }
      // Difficulty match
      if (selectedDifficulty !== 'all' && res.difficulty !== selectedDifficulty) {
        return false;
      }
      // Theme match
      if (selectedTheme !== 'all' && res.theme !== selectedTheme) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = res.title.toLowerCase().includes(q);
        const matchesDesc = res.description.toLowerCase().includes(q);
        const matchesTag = res.tags.some((t) => t.toLowerCase().includes(q));
        const matchesCat = res.categoryLabel.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesTag && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [resources, selectedCategory, selectedLevel, selectedDifficulty, selectedTheme, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedDifficulty('all');
    setSelectedTheme('all');
    onSearchChange('');
  };

  const categoriesList: { id: string; label: string }[] = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'worksheet', label: 'Worksheet' },
    { id: 'lkpd', label: 'LKPD' },
    { id: 'media', label: 'Media Pembelajaran' },
    { id: 'game', label: 'Game Edukasi' },
    { id: 'comic', label: 'Komik Edukasi' },
    { id: 'flashcard', label: 'Flashcard' },
    { id: 'ebook', label: 'Buku & E-Book' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-display">Materi Edukasi</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Katalog bahan ajar terverifikasi: lembar kerja, modul inkuiri, permainan edukatif, dan e-book.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Menampilkan <span className="text-indigo-600 font-bold">{filteredResources.length}</span> dari {resources.length} materi
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        {/* Category Pills/Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Detailed Dropdown Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          {/* Search box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari judul, tag, atau tema..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400"
            />
          </div>

          {/* Jenjang */}
          <div>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-indigo-400"
            >
              <option value="all">Semua Jenjang (PAUD / SD / SMP)</option>
              <option value="PAUD/TK">PAUD / TK</option>
              <option value="SD">SD (Sekolah Dasar)</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
              <option value="Umum">Umum</option>
            </select>
          </div>

          {/* Tingkat Kesulitan */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-indigo-400"
            >
              <option value="all">Semua Tingkat Kesulitan</option>
              <option value="Mudah">Mudah</option>
              <option value="Sedang">Sedang</option>
              <option value="Tantangan">Tantangan</option>
            </select>
          </div>

          {/* Tema */}
          <div className="flex items-center gap-2">
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:border-indigo-400"
            >
              <option value="all">Semua Tema</option>
              {uniqueThemes.map((thm) => (
                <option key={thm} value={thm}>
                  {thm}
                </option>
              ))}
            </select>

            <button
              onClick={resetFilters}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors shrink-0"
              title="Reset semua filter"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid or EmptyState */}
      {filteredResources.length === 0 ? (
        <EmptyState
          title="Tidak ada materi yang sesuai"
          description="Coba ubah kata kunci pencarian atau bersihkan filter jenjang/kategori."
          actionText="Reset Semua Filter"
          onAction={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-md hover:border-indigo-200 transition-all flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={res.thumbnail}
                  alt={res.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-lg">
                  {res.categoryLabel}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-2 py-0.5 rounded-md">
                  {res.educationLevel}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 mb-1.5 flex items-center gap-2">
                    <span>{res.theme}</span>
                    <span>·</span>
                    <span>{res.ageRange}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 font-display mb-1.5 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {res.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Tingkat: <strong className="text-slate-600 font-medium">{res.difficulty}</strong>
                  </span>
                  <button
                    onClick={() => onSelectResource(res)}
                    className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
