import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Wand2,
  Video,
  FileCode2,
  FolderGit2,
  ChevronDown,
  Sparkles,
  Layers,
  Music,
  Gamepad2,
  MessageSquare,
  Compass,
  Film
} from 'lucide-react';

export type MainTab =
  | 'dashboard'
  | 'landing'
  | 'resources'
  | 'tools'
  | 'video-audio'
  | 'prompts'
  | 'directory';

interface SidebarProps {
  currentTab: MainTab;
  currentSubcategory?: string;
  onNavigate: (tab: MainTab, subcategory?: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  currentSubcategory,
  onNavigate,
  isOpenMobile,
  onCloseMobile
}) => {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    resources: true,
    tools: true,
    videoAudio: false,
    prompts: false,
    directory: false
  });

  const toggleMenu = (key: string) => {
    setExpandedMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubnav = (tab: MainTab, subcat?: string) => {
    onNavigate(tab, subcat);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
          <button
            onClick={() => handleSubnav('dashboard')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 font-display tracking-tight flex items-center gap-1.5">
                EduSmart
                <span className="text-[10px] uppercase font-bold text-sky-600 tracking-wider">LAB</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Create • Learn • Teach with AI</p>
            </div>
          </button>
        </div>

        {/* Scrollable Navigation List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
          {/* Dashboard */}
          <button
            onClick={() => handleSubnav('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              currentTab === 'dashboard'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Dashboard</span>
          </button>

          {/* Landing / Explore */}
          <button
            onClick={() => handleSubnav('landing')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
              currentTab === 'landing'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span>Tentang & Fitur Utama</span>
          </button>

          <div className="pt-3 pb-1">
            <span className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              Katalog & Generator
            </span>
          </div>

          {/* 1. Materi Edukasi */}
          <div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleSubnav('resources')}
                className={`flex-1 flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  currentTab === 'resources' && !currentSubcategory
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <BookOpen className="w-4 h-4 shrink-0 text-sky-600" />
                <span>Materi Edukasi</span>
              </button>
              <button
                onClick={() => toggleMenu('resources')}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
                aria-label="Toggle Submenu Materi"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    expandedMenus.resources ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            {expandedMenus.resources && (
              <div className="mt-1 ml-6 pl-3 border-l border-slate-200 space-y-0.5">
                {[
                  { id: 'worksheet', label: 'Worksheet' },
                  { id: 'lkpd', label: 'LKPD' },
                  { id: 'media', label: 'Media Pembelajaran' },
                  { id: 'game', label: 'Game Edukasi' },
                  { id: 'comic', label: 'Komik Edukasi' },
                  { id: 'flashcard', label: 'Flashcard' },
                  { id: 'ebook', label: 'Buku & E-Book' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSubnav('resources', item.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                      currentTab === 'resources' && currentSubcategory === item.id
                        ? 'text-indigo-600 font-semibold bg-indigo-50/60'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Tools AI Edukasi */}
          <div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleSubnav('tools')}
                className={`flex-1 flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  currentTab === 'tools' && !currentSubcategory
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Wand2 className="w-4 h-4 shrink-0 text-indigo-600" />
                <span>Tools AI Edukasi</span>
              </button>
              <button
                onClick={() => toggleMenu('tools')}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
                aria-label="Toggle Submenu Tools"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    expandedMenus.tools ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            {expandedMenus.tools && (
              <div className="mt-1 ml-6 pl-3 border-l border-slate-200 space-y-0.5">
                {[
                  { id: 'tool-worksheet', label: 'Worksheet Studio (13 Menu)', badge: 'Utama' },
                  { id: 'tool-coding-worksheet', label: 'Coding Guide (12 Subjenis)', badge: 'Spesial' },
                  { id: 'tool-media', label: 'Media Pembelajaran Studio', badge: 'Baru' },
                  { id: 'tool-lkpd', label: 'LKPD Generator' },
                  { id: 'tool-game', label: 'Game Generator' },
                  { id: 'tool-comic', label: 'Komik Generator' },
                  { id: 'tool-flashcard', label: 'Flashcard Generator' },
                  { id: 'tool-storyboard', label: 'Storyboard Generator' },
                  { id: 'tool-video', label: 'Video Generator' },
                  { id: 'tool-song', label: 'Lagu Edukasi Generator' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSubnav('tools', item.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-colors flex items-center justify-between ${
                      currentTab === 'tools' && currentSubcategory === item.id
                        ? 'text-indigo-600 font-semibold bg-indigo-50/60'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-100 text-indigo-700 font-bold">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Video & Audio */}
          <div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleSubnav('video-audio')}
                className={`flex-1 flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  currentTab === 'video-audio' && !currentSubcategory
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Film className="w-4 h-4 shrink-0 text-purple-600" />
                <span>Video & Audio</span>
              </button>
              <button
                onClick={() => toggleMenu('videoAudio')}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
                aria-label="Toggle Submenu Video Audio"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    expandedMenus.videoAudio ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            {expandedMenus.videoAudio && (
              <div className="mt-1 ml-6 pl-3 border-l border-slate-200 space-y-0.5">
                {[
                  { id: 'video-pembelajaran', label: 'Video Pembelajaran' },
                  { id: 'video-pengenalan', label: 'Video Pengenalan' },
                  { id: 'storytelling', label: 'Storytelling' },
                  { id: 'storyboard', label: 'Storyboard Showcase' },
                  { id: 'lagu-edukasi', label: 'Lagu Edukasi' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSubnav('video-audio', item.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                      currentTab === 'video-audio' && currentSubcategory === item.id
                        ? 'text-indigo-600 font-semibold bg-indigo-50/60'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pt-3 pb-1">
            <span className="px-3 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
              Direktori & Library
            </span>
          </div>

          {/* 4. Prompt Library */}
          <div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleSubnav('prompts')}
                className={`flex-1 flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  currentTab === 'prompts' && !currentSubcategory
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FileCode2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>Prompt Library</span>
              </button>
              <button
                onClick={() => toggleMenu('prompts')}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
                aria-label="Toggle Submenu Prompts"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    expandedMenus.prompts ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            {expandedMenus.prompts && (
              <div className="mt-1 ml-6 pl-3 border-l border-slate-200 space-y-0.5">
                {[
                  { id: 'worksheet', label: 'Prompt Worksheet' },
                  { id: 'lkpd', label: 'Prompt LKPD' },
                  { id: 'game', label: 'Prompt Game' },
                  { id: 'comic', label: 'Prompt Komik' },
                  { id: 'video', label: 'Prompt Video' },
                  { id: 'image', label: 'Prompt Gambar' },
                  { id: 'audio', label: 'Prompt Audio' },
                  { id: 'product', label: 'Prompt Produk Edukasi' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSubnav('prompts', item.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                      currentTab === 'prompts' && currentSubcategory === item.id
                        ? 'text-indigo-600 font-semibold bg-indigo-50/60'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. AI Tools Directory */}
          <div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleSubnav('directory')}
                className={`flex-1 flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  currentTab === 'directory' && !currentSubcategory
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <FolderGit2 className="w-4 h-4 shrink-0 text-amber-600" />
                <span>AI Tools Directory</span>
              </button>
              <button
                onClick={() => toggleMenu('directory')}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded"
                aria-label="Toggle Submenu Directory"
              >
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform ${
                    expandedMenus.directory ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
            {expandedMenus.directory && (
              <div className="mt-1 ml-6 pl-3 border-l border-slate-200 space-y-0.5">
                {[
                  { id: 'text', label: 'AI untuk Teks' },
                  { id: 'image', label: 'AI untuk Gambar' },
                  { id: 'video', label: 'AI untuk Video' },
                  { id: 'audio', label: 'AI untuk Audio' },
                  { id: 'presentation', label: 'AI untuk Presentasi' },
                  { id: 'design', label: 'AI untuk Desain' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSubnav('directory', item.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-colors ${
                      currentTab === 'directory' && currentSubcategory === item.id
                        ? 'text-indigo-600 font-semibold bg-indigo-50/60'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Featured Card at bottom of sidebar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="p-3 bg-gradient-to-br from-indigo-50 to-sky-50 rounded-xl border border-indigo-100/70">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-semibold text-indigo-900">Featured Showcase</span>
            </div>
            <p className="text-[11px] text-slate-600 line-clamp-2">
              Proyek video & storyboard "Mengenal Luwak" siap dipelajari.
            </p>
            <button
              onClick={() => handleSubnav('video-audio', 'storyboard')}
              className="mt-2 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              Buka Storyboard Luwak →
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
