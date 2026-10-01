import React from 'react';
import {
  Sparkles,
  Search,
  FileText,
  FileSpreadsheet,
  Gamepad2,
  Image as ImageIcon,
  Film,
  Video,
  Music,
  ArrowRight,
  BookOpen,
  Compass,
  Lightbulb,
  Copy,
  Check,
  Heart,
  ExternalLink
} from 'lucide-react';
import { MainTab } from '../common/Sidebar';
import { EducationalResource, PromptTemplate } from '../../types';

interface DashboardProps {
  onNavigate: (tab: MainTab, subcat?: string) => void;
  resources: EducationalResource[];
  prompts: PromptTemplate[];
  onSelectResource: (res: EducationalResource) => void;
  onCopyPrompt: (text: string) => void;
  onToggleFavoritePrompt: (id: string) => void;
  favoritePromptIds: string[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenA4PromptStudio?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  resources,
  prompts,
  onSelectResource,
  onCopyPrompt,
  onToggleFavoritePrompt,
  favoritePromptIds,
  searchQuery,
  onSearchChange,
  onOpenA4PromptStudio,
}) => {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    onCopyPrompt(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const quickActions = [
    {
      id: 'tool-worksheet',
      label: 'Create Worksheet',
      sub: 'Latihan & Mewarnai',
      icon: FileText,
      color: 'from-blue-500 to-indigo-600',
      tab: 'tools' as MainTab
    },
    {
      id: 'tool-lkpd',
      label: 'Create LKPD',
      sub: 'Inkuiri & Eksplorasi',
      icon: FileSpreadsheet,
      color: 'from-teal-500 to-emerald-600',
      tab: 'tools' as MainTab
    },
    {
      id: 'tool-game',
      label: 'Create Game',
      sub: 'Board Game & Kuis',
      icon: Gamepad2,
      color: 'from-amber-500 to-orange-600',
      tab: 'tools' as MainTab
    },
    {
      id: 'tool-comic',
      label: 'Create Comic',
      sub: 'Strip Edukatif 6 Panel',
      icon: ImageIcon,
      color: 'from-fuchsia-500 to-pink-600',
      tab: 'tools' as MainTab
    },
    {
      id: 'tool-storyboard',
      label: 'Create Storyboard',
      sub: 'Konsep Video Multi-Scene',
      icon: Film,
      color: 'from-purple-600 to-indigo-700',
      tab: 'tools' as MainTab
    },
    {
      id: 'tool-video',
      label: 'Create Video',
      sub: 'Script & Visual Sequence',
      icon: Video,
      color: 'from-sky-500 to-blue-600',
      tab: 'tools' as MainTab
    },
    {
      id: 'tool-song',
      label: 'Create Educational Song',
      sub: 'Lirik & Musik Belajar',
      icon: Music,
      color: 'from-rose-500 to-red-600',
      tab: 'tools' as MainTab
    }
  ];

  const popularTools = [
    {
      id: 'tool-storyboard',
      title: 'Storyboard Generator',
      desc: 'Rancang adegan video pembelajaran berurutan lengkap dengan visual prompt, video prompt, dan naskah narasi.',
      badge: 'Fitur Utama',
      icon: Film,
      action: () => onNavigate('tools', 'tool-storyboard')
    },
    {
      id: 'tool-worksheet',
      title: 'Worksheet Generator',
      desc: 'Buat lembar latihan berjenjang dengan tujuan capaian jelas dan prompt ilustrasi ramah cetak fotokopi.',
      badge: 'Paling Populer',
      icon: FileText,
      action: () => onNavigate('tools', 'tool-worksheet')
    },
    {
      id: 'tool-song',
      title: 'Educational Song Generator',
      desc: 'Ubah topik pelajaran menjadi lagu anak yang riang gembira lengkap dengan struktur bait dan instruksi musik AI.',
      badge: 'Baru',
      icon: Music,
      action: () => onNavigate('tools', 'tool-song')
    },
    {
      id: 'tool-video',
      title: 'Video Production Guide',
      desc: 'Hubungkan storyboard dengan workflow pembuatan video: script, voiceover, dan sequence video AI.',
      badge: 'Terpadu',
      icon: Video,
      action: () => onNavigate('tools', 'tool-video')
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-indigo-900/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>EduSmart Lab • Create · Learn · Teach with AI</span>
            </div>
            {onOpenA4PromptStudio && (
              <button
                onClick={onOpenA4PromptStudio}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 text-xs font-semibold border border-sky-400/40 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                <span>Prompt A4 Worksheet (300 DPI · 4K)</span>
              </button>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white text-balance leading-tight">
            Bangun Produk Edukasi Lebih Cepat dengan AI
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Temukan materi, tools AI, prompt, storyboard, dan inspirasi untuk membuat produk edukasi berkualitas tinggi bagi siswa, anak, dan ruang belajar Anda.
          </p>

          {/* Large Hero Search Bar */}
          <div className="pt-4 max-w-2xl">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search materi, tools, prompt, atau ide..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    onNavigate('resources');
                  }
                }}
                className="w-full pl-12 pr-28 py-3.5 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 text-sm rounded-2xl border border-white/20 focus:border-indigo-400 focus:outline-none placeholder:text-slate-400 backdrop-blur-md transition-all shadow-inner"
              />
              <button
                onClick={() => onNavigate('resources')}
                className="absolute right-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
              >
                Cari Sekarang
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 font-display">Aksi Cepat Generator</h2>
          <span className="text-xs text-slate-500">Pilih jenis produk yang ingin Anda buat</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => onNavigate(action.tab, action.id)}
                className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all group cursor-pointer"
              >
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${action.color} flex items-center justify-center text-white mb-2.5 shadow-xs group-hover:scale-105 transition-transform`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 line-clamp-1">
                  {action.label.replace('Create ', '')}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{action.sub}</span>
              </button>
            );
          })}

          {onOpenA4PromptStudio && (
            <button
              onClick={onOpenA4PromptStudio}
              className="flex flex-col items-center text-center p-3.5 rounded-2xl bg-gradient-to-b from-indigo-50/80 to-sky-50/80 border-2 border-indigo-300 hover:border-indigo-500 hover:shadow-md transition-all group cursor-pointer"
            >
              <div
                className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-sky-600 to-indigo-700 flex items-center justify-center text-white mb-2.5 shadow-xs group-hover:scale-105 transition-transform"
              >
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-indigo-900 group-hover:text-indigo-600 line-clamp-1">
                Prompt A4
              </span>
              <span className="text-[10px] font-semibold text-indigo-600 mt-0.5 line-clamp-1">300 DPI · 4K</span>
            </button>
          )}
        </div>
      </section>

      {/* Mulai Dari Mana? (4 Cards: Learn, Explore, Create, Inspire) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 font-display">Mulai dari mana?</h2>
          <p className="text-xs text-slate-500 mt-0.5">Empat langkah terarah untuk mewujudkan ide produk edukasi Anda.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Learn */}
          <div
            onClick={() => onNavigate('landing')}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 font-display group-hover:text-sky-600 flex items-center justify-between">
              Learn
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Pahami struktur bahan ajar Kurikulum Merdeka, taksonomi berpikir kritis, dan panduan pedagogi ramah anak.
            </p>
          </div>

          {/* 2. Explore */}
          <div
            onClick={() => onNavigate('resources')}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 font-display group-hover:text-indigo-600 flex items-center justify-between">
              Explore
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Jelajahi ratusan materi contoh: lembar kerja anak, media presentasi, komik inspiratif, dan buku cerita interaktif.
            </p>
          </div>

          {/* 3. Create */}
          <div
            onClick={() => onNavigate('tools')}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 font-display group-hover:text-purple-600 flex items-center justify-between">
              Create
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Gunakan wizard 8 AI Generator untuk merancang storyboard, worksheet, video script, maupun lagu edukasi.
            </p>
          </div>

          {/* 4. Inspire */}
          <div
            onClick={() => onNavigate('prompts')}
            className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-900 font-display group-hover:text-amber-600 flex items-center justify-between">
              Inspire
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Salin prompt siap pakai untuk Midjourney, Suno, Canva, dan Kling AI guna mengeksekusi produk Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">Popular Tools</h2>
            <p className="text-xs text-slate-500">Paling sering digunakan oleh guru dan kreator konten edukasi</p>
          </div>
          <button
            onClick={() => onNavigate('tools')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Lihat Semua Tools →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={tool.action}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded-md">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 font-display mb-1">{tool.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-indigo-600">
                  <span>Gunakan Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Educational Resources */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">Featured Educational Resources</h2>
            <p className="text-xs text-slate-500">Bahan ajar siap pakai dengan kurikulum terstruktur</p>
          </div>
          <button
            onClick={() => onNavigate('resources')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Katalog Lengkap →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.slice(0, 6).map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden hover:shadow-md hover:border-slate-300 transition-all flex flex-col"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src={res.thumbnail}
                  alt={res.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-lg">
                  {res.categoryLabel}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md">
                  {res.educationLevel}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 mb-1 flex items-center gap-2">
                    <span>{res.theme}</span>
                    <span>·</span>
                    <span>{res.ageRange}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 font-display line-clamp-1 mb-1.5">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Tingkat: {res.difficulty}</span>
                  <button
                    onClick={() => onSelectResource(res)}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    Lihat Detail →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest Prompts */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">Latest Prompts</h2>
            <p className="text-xs text-slate-500">Prompt siap pakai untuk tools AI teks, gambar, video, dan audio</p>
          </div>
          <button
            onClick={() => onNavigate('prompts')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            Buka Prompt Library →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prompts.slice(0, 4).map((p) => {
            const isFav = favoritePromptIds.includes(p.id);
            const isCopied = copiedId === p.id;
            return (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                      {p.categoryLabel}
                    </span>
                    <button
                      onClick={() => onToggleFavoritePrompt(p.id)}
                      className={`p-1 rounded-lg transition-colors ${
                        isFav ? 'text-rose-500' : 'text-slate-300 hover:text-slate-600'
                      }`}
                      aria-label="Simpan ke favorit"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-900 font-display mb-1">{p.title}</h3>
                  <p className="text-xs text-slate-500 mb-3">{p.description}</p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs font-mono text-slate-700 line-clamp-3 leading-relaxed">
                    {p.promptText}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">Rekomendasi: {p.recommendedModel}</span>
                  <button
                    onClick={() => handleCopy(p.id, p.promptText)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Tersalin' : 'Copy Prompt'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
