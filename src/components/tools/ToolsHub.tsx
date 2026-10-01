import React from 'react';
import {
  FileText,
  FileSpreadsheet,
  Gamepad2,
  Image as ImageIcon,
  Layers,
  Film,
  Video,
  Music,
  ArrowRight,
  Sparkles,
  MonitorPlay
} from 'lucide-react';

interface ToolsHubProps {
  onSelectTool: (toolId: string) => void;
  onOpenA4PromptStudio?: () => void;
  onOpenMediaStudio?: () => void;
}

export const ToolsHub: React.FC<ToolsHubProps> = ({ onSelectTool, onOpenA4PromptStudio, onOpenMediaStudio }) => {
  const tools = [
    {
      id: 'tool-media',
      name: 'Media Pembelajaran Studio',
      desc: 'Wizard 8-step generator prompt slide presentasi media pembelajaran interaktif (20 halaman standar, 14 gaya visual, dan maskot kustom).',
      icon: MonitorPlay,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      badge: 'Spesial Baru'
    },
    {
      id: 'tool-worksheet',
      name: 'Worksheet Generator',
      desc: 'Hasilkan lembar kerja siap cetak: latihan motorik, berhitung, maze, dan tracing dengan instruksi terstruktur.',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      badge: 'Populer'
    },
    {
      id: 'tool-lkpd',
      name: 'LKPD Generator',
      desc: 'Rancang Lembar Kerja Peserta Didik berbasis inkuiri kurikulum merdeka dengan rubrik asesmen autentik.',
      icon: FileSpreadsheet,
      color: 'bg-teal-50 text-teal-600 border-teal-200',
      badge: 'Pedagogi'
    },
    {
      id: 'tool-game',
      name: 'Game Edukasi Studio',
      desc: 'Wizard 9-step generator prompt layar game (Pilihan Ganda, Petualangan, Cerita), 12 gaya visual, layout 16:9/9:16, dan maskot pemandu.',
      icon: Gamepad2,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      badge: '9-Step Baru'
    },
    {
      id: 'tool-comic',
      name: 'Comic Generator',
      desc: 'Susun naskah komik edukasi 4-6 panel dengan balon dialog jenaka, pesan moral, dan prompt visual Midjourney.',
      icon: ImageIcon,
      color: 'bg-pink-50 text-pink-600 border-pink-200',
      badge: 'Visual Story'
    },
    {
      id: 'tool-flashcard',
      name: 'Flashcard Generator',
      desc: 'Ciptakan set kartu kilas kosakata bilingual, fakta unik sains, dan prompt ilustrasi Montessori minimalis.',
      icon: Layers,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      badge: 'Daya Ingat'
    },
    {
      id: 'tool-storyboard',
      name: 'Storyboard Generator',
      desc: 'Rancang timeline video edukasi scene-by-scene: visual, narasi, on-screen text, kamera, dan prompt video AI.',
      icon: Film,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      badge: 'Fitur Unggulan'
    },
    {
      id: 'tool-video',
      name: 'Video Generator',
      desc: 'Alur lengkap pembuatan video edukasi: script, storyboard, voice-over cue, subtitle, dan panduan produksi.',
      icon: Video,
      color: 'bg-sky-50 text-sky-600 border-sky-200',
      badge: 'All-In-One'
    },
    {
      id: 'tool-song',
      name: 'Educational Song Generator',
      desc: 'Tulis lirik lagu anak berirama ceria lengkap dengan struktur bait, reff catchy, dan prompt musik Suno AI.',
      icon: Music,
      color: 'bg-rose-50 text-rose-600 border-rose-200',
      badge: 'Audio AI'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>AI Educational Tools</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          Tools AI Edukasi
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Pilih salah satu dari 8 generator AI di bawah untuk mulai merancang materi dan media edukasi Anda. Setiap tool dilengkapi wizard bertahap yang mudah diikuti.
        </p>
      </div>

      {/* Featured Media Pembelajaran Presentation Slide Studio Banner */}
      <div className="p-6 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 rounded-3xl text-white shadow-lg border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
            <MonitorPlay className="w-3.5 h-3.5 text-emerald-300" />
            <span>Fitur Baru · Wizard 8-Step Slide Interaktif</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
            Media Pembelajaran Studio (Prompt Slide Presentasi)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Rancang presentasi interaktif lengkap: Cover, Navigasi, Materi, Video, Rangkuman, Kuis 5 Level, hingga Respon Benar/Salah. Dilengkapi <strong className="text-white">14 pilihan gaya visual (3D Pixar, Clay, Felt Toy, Watercolor, Flat Cartoon)</strong>, layout 16:9 atau 9:16, dan karakter maskot edukasi.
          </p>
        </div>

        <div className="relative z-10 flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
          <button
            onClick={() => onSelectTool('tool-media')}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-md shadow-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Mulai Wizard Media (8 Step)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <span className="text-[11px] text-slate-400 font-mono">1920×1080 px · 300 DPI · 8K</span>
        </div>
      </div>

      {/* Featured A4 Worksheet Prompt Studio Banner */}
      <div className="p-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl text-white shadow-lg border border-indigo-500/20 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Fitur Spesial · 300 DPI Cetak Siap Pakai</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white tracking-tight">
            A4 Worksheet Text-to-Image Prompt Studio (4K · 300 DPI)
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Hasilkan prompt gambar siap cetak untuk Midjourney, DALL-E, dan Ideogram. Lengkap dengan 8 kategori: <strong className="text-white">Coding Unplugged, Mewarnai, Matching, Tracing, Cut & Paste, Berhitung, Literasi, dan Maze</strong> beserta preview visual hasil desainnya.
          </p>
        </div>

        <div className="relative z-10 flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
          {onOpenA4PromptStudio && (
            <button
              onClick={onOpenA4PromptStudio}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white text-xs sm:text-sm font-semibold rounded-2xl shadow-md shadow-indigo-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Buka Prompt Studio A4</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
          <span className="text-[11px] text-slate-400 font-mono">Format A4 (210×297mm) · --ar 1:1.414</span>
        </div>
      </div>

      {/* Grid of 8 Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl ${tool.color} border flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-600 text-white uppercase tracking-wider">
                      AI
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {tool.badge}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-slate-900 font-display mb-1.5 group-hover:text-indigo-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {tool.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => onSelectTool(tool.id)}
                  className="w-full py-2 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-700 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Gunakan Tool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
