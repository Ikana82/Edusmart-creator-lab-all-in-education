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
  onNavigateToWorksheetStudio?: (catId?: string) => void;
  onNavigateToMediaStudio?: () => void;
  onNavigateToGameStudio?: () => void;
}

export const ResourcesCatalog: React.FC<ResourcesCatalogProps> = ({
  resources,
  activeSubcategory,
  onSelectResource,
  searchQuery,
  onSearchChange,
  onNavigateToWorksheetStudio,
  onNavigateToMediaStudio,
  onNavigateToGameStudio
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

      {/* Worksheet Studio Callout Banner when in Worksheet tab */}
      {selectedCategory === 'worksheet' && onNavigateToWorksheetStudio && (
        <div className="p-5 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl text-white shadow-md border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 font-mono">
              EduSmart Worksheet Studio · 13 Menu Utama
            </span>
            <h3 className="text-base font-bold font-display text-white">
              Ingin Membuat Worksheet Edukatif Siap Cetak Sendiri?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Gunakan wizard bertahap untuk menghasilkan lembar kerja A4 Portrait (300 DPI · 4K) lengkap dengan pilihan format: Coding (12 subjenis), Mewarnai, Matching, Tracing, dan lainnya.
            </p>
          </div>
          <button
            onClick={() => onNavigateToWorksheetStudio()}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Buka Worksheet Studio</span>
          </button>
        </div>
      )}

      {/* Media Pembelajaran Studio Callout Banner when in Media tab */}
      {selectedCategory === 'media' && onNavigateToMediaStudio && (
        <div className="p-5 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 rounded-2xl text-white shadow-md border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 font-mono">
              EduSmart Media Pembelajaran Studio · 8-Step Wizard
            </span>
            <h3 className="text-base font-bold font-display text-white">
              Buat Prompt Slide Presentasi Media Pembelajaran Interaktif
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hasilkan seluruh prompt slide presentasi (20 halaman standar, pilihan layout 16:9 atau 9:16, 14 gaya visual, dan maskot kustom) siap pakai untuk generator gambar AI.
            </p>
          </div>
          <button
            onClick={() => onNavigateToMediaStudio()}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Buka Media Pembelajaran Studio</span>
          </button>
        </div>
      )}

      {/* Game Edukasi Studio Callout Banner when in Game tab */}
      {selectedCategory === 'game' && onNavigateToGameStudio && (
        <div className="p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 rounded-2xl text-white shadow-md border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 max-w-xl">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300 border border-amber-400/30 font-mono">
              EduSmart Game Edukasi Studio · 9-Step Wizard
            </span>
            <h3 className="text-base font-bold font-display text-white">
              Rancang Game Edukasi Interaktif & Prompt Layar Game
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Buat game edukasi bertingkat: Game Pilihan Ganda, Petualangan Misi, atau Game Cerita. Lengkap dengan 12 gaya visual, karakter maskot pemandu, simulasi layar interaktif, dan prompt siap pakai!
            </p>
          </div>
          <button
            onClick={() => onNavigateToGameStudio()}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Buka Game Edukasi Studio</span>
          </button>
        </div>
      )}

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
