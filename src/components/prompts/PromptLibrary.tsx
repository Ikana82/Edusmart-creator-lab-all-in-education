import React, { useState, useMemo } from 'react';
import { PromptTemplate, PromptCategory } from '../../types';
import { Search, Copy, Check, Heart, FileCode2, Sparkles, RotateCcw } from 'lucide-react';
import { EmptyState } from '../common/EmptyState';

interface PromptLibraryProps {
  prompts: PromptTemplate[];
  activeSubcategory?: string;
  favoritePromptIds: string[];
  onToggleFavorite: (id: string) => void;
  onCopyPrompt: (text: string) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
  onOpenA4PromptStudio?: () => void;
}

export const PromptLibrary: React.FC<PromptLibraryProps> = ({
  prompts,
  activeSubcategory,
  favoritePromptIds,
  onToggleFavorite,
  onCopyPrompt,
  onNotify,
  onOpenA4PromptStudio
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(activeSubcategory || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  React.useEffect(() => {
    if (activeSubcategory) {
      setSelectedCategory(activeSubcategory);
    }
  }, [activeSubcategory]);

  const categories = [
    { id: 'all', label: 'Semua Prompt' },
    { id: 'worksheet', label: 'Prompt Worksheet' },
    { id: 'lkpd', label: 'Prompt LKPD' },
    { id: 'game', label: 'Prompt Game' },
    { id: 'comic', label: 'Prompt Komik' },
    { id: 'video', label: 'Prompt Video' },
    { id: 'image', label: 'Prompt Gambar' },
    { id: 'audio', label: 'Prompt Audio' },
    { id: 'product', label: 'Prompt Produk Edukasi' }
  ];

  const filteredPrompts = useMemo(() => {
    return prompts.filter((p) => {
      if (showFavoritesOnly && !favoritePromptIds.includes(p.id)) {
        return false;
      }
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesText = p.promptText.toLowerCase().includes(q);
        const matchesCat = p.categoryLabel.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesText && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [prompts, selectedCategory, searchQuery, showFavoritesOnly, favoritePromptIds]);

  const handleCopy = (id: string, text: string) => {
    onCopyPrompt(text);
    setCopiedId(id);
    onNotify('Prompt berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold">
            <FileCode2 className="w-3.5 h-3.5" />
            <span>Prompt Library</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
            Prompt Siap Pakai Edukasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Kumpulan prompt teruji untuk Gemini, Midjourney, Suno, dan Kling AI guna mempercepat pembuatan produk edukasi.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {onOpenA4PromptStudio && (
            <button
              onClick={onOpenA4PromptStudio}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Prompt A4 (300 DPI · 4K)</span>
            </button>
          )}

          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
              showFavoritesOnly
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span>Hanya Favorit ({favoritePromptIds.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        {/* Category horizontal pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-xs'
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
            placeholder="Cari prompt berdasarkan judul, teks prompt, atau topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Grid of Prompt Cards */}
      {filteredPrompts.length === 0 ? (
        <EmptyState
          title="Tidak ada prompt yang ditemukan"
          description="Coba gunakan kata kunci pencarian yang lebih umum atau matikan filter favorit."
          actionText="Reset Pencarian"
          onAction={() => {
            setSearchQuery('');
            setSelectedCategory('all');
            setShowFavoritesOnly(false);
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredPrompts.map((p) => {
            const isFav = favoritePromptIds.includes(p.id);
            const isCopied = copiedId === p.id;

            return (
              <div
                key={p.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Meta */}
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {p.categoryLabel}
                    </span>

                    <button
                      onClick={() => onToggleFavorite(p.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isFav ? 'text-rose-500' : 'text-slate-300 hover:text-slate-600'
                      }`}
                      aria-label="Simpan ke favorit"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 font-display">
                    {p.title}
                  </h3>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Variables */}
                  {p.variables.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-400 font-medium">Variabel:</span>
                      {p.variables.map((v, i) => (
                        <span key={i} className="text-[10px] font-mono text-indigo-700 bg-indigo-50/70 px-1.5 py-0.5 rounded">
                          {v}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Prompt Text Preview Box */}
                  <div className="p-3.5 bg-slate-900 rounded-xl text-slate-200 font-mono text-xs leading-relaxed max-h-48 overflow-y-auto border border-slate-800">
                    <pre className="whitespace-pre-wrap font-mono">{p.promptText}</pre>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    Model: <strong className="text-slate-700 font-medium">{p.recommendedModel}</strong>
                  </span>

                  <button
                    onClick={() => handleCopy(p.id, p.promptText)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Tersalin' : 'Copy Prompt'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
