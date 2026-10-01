import React, { useState } from 'react';
import { mockLuwakProject } from '../../data/mockInitialProject';
import {
  Film,
  Music,
  Play,
  Pause,
  Copy,
  Check,
  Clock,
  Sparkles,
  Camera,
  Layers,
  ArrowRight,
  BookOpen,
  Volume2
} from 'lucide-react';
import { MainTab } from '../common/Sidebar';

interface VideoAudioHubProps {
  activeSubcategory?: string;
  onNavigate: (tab: MainTab, subcat?: string) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const VideoAudioHub: React.FC<VideoAudioHubProps> = ({
  activeSubcategory,
  onNavigate,
  onNotify
}) => {
  const [activeCategory, setActiveCategory] = useState<string>(
    activeSubcategory || 'storyboard'
  );
  const [activeSceneIndex, setActiveSceneIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  React.useEffect(() => {
    if (activeSubcategory) {
      setActiveCategory(activeSubcategory);
    }
  }, [activeSubcategory]);

  const currentScene = mockLuwakProject.scenes[activeSceneIndex];

  const handleCopyScene = (idx: number) => {
    const s = mockLuwakProject.scenes[idx];
    const text = `SCENE ${s.sceneNumber} (${s.timestamp})
Visual: ${s.visualDescription}
Narasi: "${s.narration}"
Teks Layar: ${s.onScreenText}
Image Prompt: ${s.imagePrompt}
Video Prompt: ${s.videoPrompt}
Kamera: ${s.cameraMovement} | Transisi: ${s.transition}`;
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    onNotify(`Scene ${s.sceneNumber} disalin!`, 'success');
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const categories = [
    { id: 'storyboard', label: 'Storyboard Showcase (Mengenal Luwak)' },
    { id: 'video-pembelajaran', label: 'Video Pembelajaran' },
    { id: 'video-pengenalan', label: 'Video Pengenalan' },
    { id: 'storytelling', label: 'Storytelling Audio & Script' },
    { id: 'lagu-edukasi', label: 'Lagu Edukasi' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold">
          <Film className="w-3.5 h-3.5" />
          <span>Pusat Video & Audio Edukasi</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          Video, Storyboard & Musik Belajar
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
          Koleksi konsep audiovisual terstruktur. Pelajari bagaimana naskah dipecah menjadi adegan video terperinci dan audio pembelajaran interaktif.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCategory(c.id)}
            className={`px-3.5 py-2 text-xs font-medium rounded-t-xl transition-colors whitespace-nowrap cursor-pointer ${
              activeCategory === c.id
                ? 'border-b-2 border-purple-600 text-purple-700 font-bold bg-purple-50/50'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Main Content: Storyboard Showcase (Mengenal Luwak) */}
      {(activeCategory === 'storyboard' || activeCategory === 'video-pembelajaran' || activeCategory === 'video-pengenalan') && (
        <div className="space-y-8">
          {/* Featured Project Banner */}
          <div className="p-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl shadow-lg border border-purple-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-sky-400 bg-white/10 px-2.5 py-0.5 rounded-md">
                Featured Blueprint Edukasi
              </span>
              <span className="text-xs text-slate-300">
                Durasi: 60 detik · Rasio: 16:9 · Jenjang: SD
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                {mockLuwakProject.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Studi kasus komprehensif mengubah topik fauna lokal Nusantara menjadi konsep video sains interaktif ramah anak.
                Terbagi menjadi dua babak utama:
              </p>
            </div>

            {/* Part 1 & Part 2 Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1.5">
                <span className="text-xs font-bold text-amber-300">PART 1 (Scene 1-3)</span>
                <h4 className="text-xs font-semibold text-white">Pengenalan & Ciri Fisik Luwak</h4>
                <p className="text-[11px] text-slate-300">
                  Habitat hutan tropis, corak bulu bergaris, ekor penyeimbang dahan, dan sifat nokturnal pencari makan malam hari.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-1.5">
                <span className="text-xs font-bold text-emerald-300">PART 2 (Scene 4-7)</span>
                <h4 className="text-xs font-semibold text-white">Proses Biji Kopi & Peran Luwak</h4>
                <p className="text-[11px] text-slate-300">
                  Seleksi buah ceri kopi ranum, fermentasi enzim alami, pencucian higienis petani, dan pesan pelestarian satwa liar.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Scene Player Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Simulated Visual Stage */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-display">
                  <span>Scene {currentScene.sceneNumber} of 7</span>
                  <span className="text-slate-400">·</span>
                  <span className="font-mono text-slate-500">{currentScene.timestamp}</span>
                </div>
                <div className="text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md font-medium">
                  {currentScene.sceneNumber <= 3 ? 'Part 1: Morfologi Luwak' : 'Part 2: Proses Kopi'}
                </div>
              </div>

              {/* Simulated Screen Box */}
              <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 flex flex-col justify-between p-6 text-white overflow-hidden shadow-inner border border-slate-800">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

                {/* Top Overlay Badge */}
                <div className="relative z-10 flex items-center justify-between text-xs">
                  <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md text-slate-300">
                    Kamera: {currentScene.cameraMovement}
                  </span>
                  <span className="bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md text-slate-300">
                    Transisi: {currentScene.transition}
                  </span>
                </div>

                {/* Center Visual Mockup */}
                <div className="relative z-10 text-center space-y-2 py-4">
                  <span className="text-[10px] text-sky-400 uppercase tracking-widest font-semibold">
                    Simulasi Visual Adegan
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
                    {currentScene.visualDescription}
                  </p>
                </div>

                {/* Bottom On-Screen Text Overlay */}
                <div className="relative z-10 text-center">
                  <span className="inline-block px-4 py-1.5 bg-amber-400/90 text-slate-950 text-xs font-bold rounded-lg shadow-sm">
                    {currentScene.onScreenText}
                  </span>
                </div>
              </div>

              {/* Voice-Over Audio Strip */}
              <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-100 flex items-start gap-3">
                <Volume2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider">
                    Naskah Voice-Over Narator:
                  </span>
                  <p className="text-xs text-purple-950 italic leading-relaxed">
                    "{currentScene.narration}"
                  </p>
                </div>
              </div>

              {/* Playback Controls & Navigator */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => setActiveSceneIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeSceneIndex === 0}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 transition-colors"
                >
                  ← Scene Sebelumnya
                </button>

                <div className="flex items-center gap-1.5">
                  {mockLuwakProject.scenes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSceneIndex(i)}
                      className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                        activeSceneIndex === i
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setActiveSceneIndex((prev) =>
                      Math.min(mockLuwakProject.scenes.length - 1, prev + 1)
                    )
                  }
                  disabled={activeSceneIndex === mockLuwakProject.scenes.length - 1}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-40 transition-colors"
                >
                  Scene Berikutnya →
                </button>
              </div>
            </div>

            {/* Right: Technical AI Prompts for Current Scene */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider">
                    Prompt AI Scene #{currentScene.sceneNumber}
                  </h3>
                  <button
                    onClick={() => handleCopyScene(activeSceneIndex)}
                    className="text-xs font-semibold text-purple-600 hover:text-purple-800 flex items-center gap-1"
                  >
                    {copiedIndex === activeSceneIndex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedIndex === activeSceneIndex ? 'Tersalin' : 'Copy Scene'}</span>
                  </button>
                </div>

                {/* Image Prompt Box */}
                <div className="p-4 bg-slate-900 rounded-2xl text-slate-200 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-sky-400 font-sans font-semibold">
                    <span>Midjourney / Ideogram Prompt:</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentScene.imagePrompt);
                        onNotify('Image prompt disalin!', 'success');
                      }}
                      className="hover:text-white"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{currentScene.imagePrompt}</p>
                </div>

                {/* Video Prompt Box */}
                <div className="p-4 bg-slate-900 rounded-2xl text-slate-200 space-y-2 text-xs font-mono">
                  <div className="flex items-center justify-between text-purple-400 font-sans font-semibold">
                    <span>Kling AI / Runway Prompt:</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(currentScene.videoPrompt);
                        onNotify('Video prompt disalin!', 'success');
                      }}
                      className="hover:text-white"
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{currentScene.videoPrompt}</p>
                </div>

                {/* Creator CTA */}
                <div className="pt-2">
                  <button
                    onClick={() => onNavigate('tools', 'tool-storyboard')}
                    className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Buat Storyboard Baru untuk Topik Anda</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Storytelling Audio & Script */}
      {activeCategory === 'storytelling' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Naskah Storytelling Audio: "Misteri Biji Emas Hutan"
            </h3>
            <span className="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-md font-semibold">
              Karakter Suara: Hangat & Mengayomi
            </span>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
            <p>
              [Suara gemersik dedaunan hutan dan kicau burung di kejauhan]
            </p>
            <p>
              <strong>Narator:</strong> "Jauh di pedalaman lereng gunung yang hijau berkabut, ada rahasia kecil yang tersimpan di balik rindangnya dahan pepohonan. Seekor satwa lincah bermata bulat besar sedang mengintip. Namanya Lulu sang Luwak..."
            </p>
            <p>
              <strong>Lulu sang Luwak:</strong> "Hidungku tidak pernah salah! Buah merah yang paling manis di dahan paling tinggi... itu dia!"
            </p>
            <p>
              <strong>Narator:</strong> "Anak-anak hebat, tahukah kalian bahwa di dalam tubuh luwak yang mungil, terjadi keajaiban sains alami yang membantu petani kopi Nusantara menghasilkan cita rasa kopi paling harum di dunia?"
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => onNavigate('tools', 'tool-song')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
            >
              Ubah Jadi Lagu Edukasi →
            </button>
          </div>
        </div>
      )}

      {/* Lagu Edukasi Showcase */}
      {activeCategory === 'lagu-edukasi' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                Lagu Edukasi: "Luwak Sahabat Alam"
              </h3>
              <p className="text-xs text-slate-500">Irama Ceria Ukulele 115 BPM · Suno v3.5 Ready</p>
            </div>
            <button
              onClick={() => onNavigate('tools', 'tool-song')}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl"
            >
              + Buat Lagu Sendiri
            </button>
          </div>

          <div className="p-6 bg-rose-50/40 rounded-2xl border border-rose-100 space-y-4 text-xs sm:text-sm text-slate-800">
            <div>
              <span className="text-xs font-bold text-rose-700 font-mono">[Verse 1]</span>
              <p className="pl-3 border-l-2 border-rose-300 mt-1">
                Ekornya panjang memanjat dahan,<br />
                Mata bercahaya di waktu malam,<br />
                Memilih buah yang paling manis,<br />
                Luwak sahabat rimba yang harmonis!
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-rose-700 font-mono">[Chorus]</span>
              <p className="pl-3 border-l-2 border-rose-300 mt-1 font-semibold text-rose-950">
                Luwak, oh luwak penjaga hutan kita,<br />
                Bantu alam lestarikan semesta,<br />
                Jangan diganggu, biarkan bebas ceria,<br />
                Belajar bersama di bumi Indonesia!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
