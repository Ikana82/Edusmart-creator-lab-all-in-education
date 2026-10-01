import React, { useState, useMemo } from 'react';
import { AITool, AIDirectoryCategory } from '../../types';
import {
  FolderGit2,
  Search,
  ExternalLink,
  Heart,
  Sparkles,
  Bot,
  Image as ImageIcon,
  Video,
  Music,
  Presentation,
  PenTool
} from 'lucide-react';
import { EmptyState } from '../common/EmptyState';

interface AIDirectoryProps {
  tools: AITool[];
  activeSubcategory?: string;
  favoriteToolIds: string[];
  onToggleFavorite: (id: string) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const AIDirectory: React.FC<AIDirectoryProps> = ({
  tools,
  activeSubcategory,
  favoriteToolIds,
  onToggleFavorite,
  onNotify
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    activeSubcategory || 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  React.useEffect(() => {
    if (activeSubcategory) {
      setSelectedCategory(activeSubcategory);
    }
  }, [activeSubcategory]);

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'text', label: 'AI untuk Teks' },
    { id: 'image', label: 'AI untuk Gambar' },
    { id: 'video', label: 'AI untuk Video' },
    { id: 'audio', label: 'AI untuk Audio' },
    { id: 'presentation', label: 'AI untuk Presentasi' },
    { id: 'design', label: 'AI untuk Desain' }
  ];

  const getCategoryIcon = (cat: AIDirectoryCategory) => {
    switch (cat) {
      case 'text':
        return Bot;
      case 'image':
        return ImageIcon;
      case 'video':
        return Video;
      case 'audio':
        return Music;
      case 'presentation':
        return Presentation;
      case 'design':
        return PenTool;
      default:
        return Sparkles;
    }
  };

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      if (showFavoritesOnly && !favoriteToolIds.includes(tool.id)) {
        return false;
      }
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesDesc = tool.description.toLowerCase().includes(q);
        const matchesBest = tool.bestFor.toLowerCase().includes(q);
        const matchesCat = tool.categoryLabel.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesBest && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [tools, selectedCategory, searchQuery, showFavoritesOnly, favoriteToolIds]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-semibold">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>AI Tools Directory</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Rekomendasi AI Tools Edukasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Daftar terkurasi perangkat AI global terbaik untuk teks, gambar, video, musik, dan desain presentasi mengajar.
          </p>
        </div>

        <button
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
            showFavoritesOnly
              ? 'bg-rose-50 text-rose-700 border border-rose-200'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-rose-500 text-rose-500' : ''}`} />
          <span>Tersimpan ({favoriteToolIds.length})</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari tools (misal: Gemini, Midjourney, Suno, Canva...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Directory Grid */}
      {filteredTools.length === 0 ? (
        <EmptyState
          title="Tidak ada tools yang sesuai"
          description="Coba gunakan kata kunci pencarian yang lain atau pilih kategori yang berbeda."
          actionText="Reset Pencarian"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('all');
            setShowFavoritesOnly(false);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => {
            const isFav = favoriteToolIds.includes(tool.id);
            const Icon = getCategoryIcon(tool.category);

            return (
              <div
                key={tool.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-amber-50 group-hover:text-amber-700 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex items-center gap-1.5">
                      {tool.popular && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                          Populer
                        </span>
                      )}
                      <button
                        onClick={() => onToggleFavorite(tool.id)}
                        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                          isFav ? 'text-rose-500' : 'text-slate-300 hover:text-slate-600'
                        }`}
                        aria-label="Simpan ke favorit"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider mb-1">
                    {tool.categoryLabel}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-display mb-1.5">
                    {tool.name}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed mb-3">
                    {tool.description}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Paling Cocok Untuk:
                    </span>
                    <p className="text-xs text-slate-700 font-medium">
                      {tool.bestFor}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {tool.pricing || 'Freemium'}
                  </span>

                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium rounded-lg transition-colors cursor-pointer"
                  >
                    <span>Kunjungi Situs</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
