import React from 'react';
import { Menu, Search, Sparkles, BookOpen, Heart } from 'lucide-react';
import { MainTab } from './Sidebar';

interface NavbarProps {
  onOpenMobileSidebar: () => void;
  currentTab: MainTab;
  currentSubcategory?: string;
  onNavigate: (tab: MainTab, subcategory?: string) => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMobileSidebar,
  currentTab,
  currentSubcategory,
  onNavigate,
  favoritesCount,
  onOpenFavorites,
  searchQuery,
  onSearchChange,
}) => {
  const getTabTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return 'Dashboard';
      case 'landing':
        return 'Overview Platform';
      case 'resources':
        return currentSubcategory ? `Materi Edukasi · ${currentSubcategory}` : 'Katalog Materi Edukasi';
      case 'tools':
        return currentSubcategory ? `Tools AI · ${currentSubcategory}` : 'AI Educational Tools Hub';
      case 'video-audio':
        return currentSubcategory ? `Video & Audio · ${currentSubcategory}` : 'Pusat Video & Audio Edukasi';
      case 'prompts':
        return currentSubcategory ? `Prompt Library · ${currentSubcategory}` : 'Prompt Library Edukasi';
      case 'directory':
        return currentSubcategory ? `AI Tools · ${currentSubcategory}` : 'AI Tools Directory';
      default:
        return 'EduSmart Creator Lab';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile trigger & breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 rounded-lg lg:hidden"
          aria-label="Buka menu navigasi"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:block">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hover:text-slate-600 cursor-pointer" onClick={() => onNavigate('dashboard')}>
              EduSmart
            </span>
            <span>/</span>
            <span className="text-slate-800 font-medium capitalize">{getTabTitle()}</span>
          </div>
        </div>
      </div>

      {/* Center: Search input */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search materi, tools, prompt, atau ide..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs text-slate-800 placeholder:text-slate-400 rounded-xl border border-transparent focus:border-indigo-400 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Favorites button */}
        <button
          onClick={onOpenFavorites}
          className="relative p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
          title="Lihat Item Favorit"
        >
          <Heart className="w-4 h-4" />
          {favoritesCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
        </button>

        {/* Quick Launch Creator */}
        <button
          onClick={() => onNavigate('tools', 'tool-worksheet')}
          className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mulai Buat Produk</span>
        </button>
      </div>
    </header>
  );
};
