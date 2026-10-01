import React from 'react';
import {
  Sparkles,
  FileText,
  FileSpreadsheet,
  Gamepad2,
  Image as ImageIcon,
  Layers,
  Video,
  Film,
  Music,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  Users,
  Compass
} from 'lucide-react';
import { MainTab } from '../common/Sidebar';

interface LandingPageProps {
  onNavigate: (tab: MainTab, subcat?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const whatYouCanCreate = [
    {
      id: 'tool-worksheet',
      title: 'Worksheet Printable',
      desc: 'Lembar aktivitas tracing, berhitung, maze, dan mewarnai dengan prompt grafis ramah cetak fotokopi.',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      id: 'tool-lkpd',
      title: 'LKPD Kurikulum Merdeka',
      desc: 'Lembar Kerja Peserta Didik berbasis Problem & Project Based Learning lengkap dengan capaian dan rubrik asesmen.',
      icon: FileSpreadsheet,
      color: 'bg-teal-50 text-teal-600 border-teal-200'
    },
    {
      id: 'tool-game',
      title: 'Game Edukasi & Board Game',
      desc: 'Rancangan permainan papan cetak mandiri (Print & Play) dengan kuis bertingkat dan aturan bermain sederhana.',
      icon: Gamepad2,
      color: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      id: 'tool-comic',
      title: 'Komik Strip Edukatif',
      desc: 'Naskah komik 4-6 panel dengan balon dialog bernuansa humor, pesan karakter baik, dan prompt generator Midjourney.',
      icon: ImageIcon,
      color: 'bg-pink-50 text-pink-600 border-pink-200'
    },
    {
      id: 'tool-flashcard',
      title: 'Flashcard Kosakata & Fonik',
      desc: 'Kartu kilas bilingual dengan foto fauna/objek, fakta unik memikat, dan petunjuk stimulasi daya ingat anak.',
      icon: Layers,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      id: 'tool-video',
      title: 'Video Pembelajaran Lengkap',
      desc: 'Pipeline video edukasi dari hook 3 detik, penjelasan sains analogis, visual B-roll AI, hingga subtitle on-screen.',
      icon: Video,
      color: 'bg-sky-50 text-sky-600 border-sky-200'
    },
    {
      id: 'tool-storyboard',
      title: 'Storyboard Timeline Interaktif',
      desc: 'Format per adegan (scene-by-scene) dengan durasi, kamera, transisi, audio cue, serta prompt video Kling & Runway.',
      icon: Film,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      id: 'tool-song',
      title: 'Lagu Edukasi & Jingle Belajar',
      desc: 'Konsep lirik berima berulang, struktur [Verse/Chorus], dan prompt genre musik siap di-paste ke Suno AI / Udio.',
      icon: Music,
      color: 'bg-rose-50 text-rose-600 border-rose-200'
    }
  ];

  const features = [
    {
      title: 'Dirancang Sesuai Kurikulum & Pedagogi',
      desc: 'Bukan sekadar teks acak. Output AI distrukturkan sesuai kaidah pembelajaran: taksonomi Bloom, diferensiasi usia, dan capaian pembelajaran terukur.',
      icon: Target
    },
    {
      title: 'Workflow Cepat Berbasis Wizard',
      desc: 'Cukup 4-5 langkah sederhana: pilih jenjang, tentukan topik, atur gaya visual, dan dapatkan konsep matang siap pakai dalam hitungan detik.',
      icon: Zap
    },
    {
      title: 'Multi-Role Friendly',
      desc: 'Dibuat untuk guru sekolah, orang tua homeschooling, tutor bimbel, educator digital, serta kreator yang ingin menjual produk digital edukasi.',
      icon: Users
    }
  ];

  return (
    <div className="space-y-16 py-4">
      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>EduSmart Creator Lab</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.15] text-balance">
          Create Better Educational Products with AI
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Worksheet, LKPD, game, comic, video, storyboard, lagu edukasi, prompt, dan AI tools dalam satu tempat.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('tools', 'tool-worksheet')}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Mulai Membuat</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('tools')}
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl border border-slate-200 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-slate-500" />
            <span>Explore Tools</span>
          </button>
        </div>
      </section>

      {/* What You Can Create */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 font-display">What You Can Create</h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Pilih dari 8 format produk edukasi terlengkap yang siap diproduksi dan dibagikan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whatYouCanCreate.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => onNavigate('tools', item.id)}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl ${item.color} border flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 font-display mb-1.5 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-indigo-600">
                  <span>Buat Sekarang</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Showcase: Mengenal Luwak */}
      <section className="rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-8 sm:p-10 border border-indigo-800 shadow-xl overflow-hidden relative">
        <div className="absolute right-0 top-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-semibold tracking-wider text-sky-400 uppercase">
              Proyek Edukasi Unggulan
            </span>
            <h3 className="text-xl sm:text-3xl font-bold font-display leading-tight">
              Mengenal Luwak: Dari Rimba Nusantara Menjadi Video Edukasi
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Pelajari bagaimana satu topik edukasi fauna lokal diubah menjadi 7 scene storyboard interaktif:
              mulai dari pengenalan ciri fisik, aktivitas nokturnal, seleksi ceri kopi, hingga pesan konservasi satwa liar.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigate('video-audio', 'storyboard')}
                className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <span>Buka Storyboard Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('tools', 'tool-storyboard')}
                className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors"
              >
                Buat Storyboard Baru
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-xs space-y-3">
            <div className="text-xs font-semibold text-slate-200">Struktur Blueprint:</div>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Part 1: Pengenalan habitat & ciri fisik luwak</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Part 2: Proses biji kopi & peran enzim fermentasi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prompt gambar Midjourney & prompt video Kling AI</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Naskah voice-over & teks on-screen terkoordinasi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Everything You Need to Create Educational Content */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold text-slate-900 font-display">
            Everything You Need to Create Educational Content
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Ekosistem terintegrasi untuk menghemat waktu pengajar dan melipatgandakan dampak pembelajaran.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 hover:shadow-xs transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 font-display">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to action footer banner */}
      <section className="text-center p-8 sm:p-12 rounded-3xl bg-slate-100 border border-slate-200/70 space-y-4">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
          Siap Mewujudkan Ide Produk Edukasi Anda?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Mulai dari ide sederhana, kembangkan menjadi storyboard, lalu hasilkan worksheet, video, dan lagu dengan bantuan AI.
        </p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Buka Dashboard Utama
        </button>
      </section>
    </div>
  );
};
