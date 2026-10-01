import React, { useState } from 'react';
import { geminiService } from '../../services/geminiService';
import { SongProject } from '../../types';
import {
  Music,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  Save,
  Mic,
  Disc3,
  Play,
  Volume2
} from 'lucide-react';

interface SongGeneratorProps {
  onBack: () => void;
  onSaveSong: (song: SongProject) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const SongGenerator: React.FC<SongGeneratorProps> = ({
  onBack,
  onSaveSong,
  onNotify
}) => {
  const [topic, setTopic] = useState('Mengenal Angka 1-10');
  const [age, setAge] = useState('4-6 Tahun');
  const [language, setLanguage] = useState('Bahasa Indonesia');
  const [songStyle, setSongStyle] = useState('Cheerful Ukulele & Kids Pop');
  const [duration, setDuration] = useState('2 Menit');
  const [learningObjective, setLearningObjective] = useState(
    'Membantu anak menghafal angka 1 sampai 10 secara riang berima'
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [song, setSong] = useState<SongProject | null>(null);
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const styles = [
    'Cheerful Ukulele & Kids Pop',
    'Playful Acoustic Guitar',
    'Upbeat Electronic Nursery (Cocomelon style)',
    'Traditional Nusantara Jingle',
    'Calm Lullaby Bedtime Rhyme'
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await geminiService.generateSong({
        topic,
        age,
        language,
        songStyle,
        duration,
        learningObjective
      });
      setSong(res);
      onNotify('Lagu edukasi berhasil digenerate!', 'success');
    } catch {
      onNotify('Gagal membuat lagu edukasi.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyLyrics = () => {
    if (!song) return;
    const text = song.lyrics
      .map((sec) => `${sec.sectionTitle}\n${sec.lines.join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedLyrics(true);
    onNotify('Lirik lagu disalin ke clipboard!', 'success');
    setTimeout(() => setCopiedLyrics(false), 2000);
  };

  const handleCopyPrompt = () => {
    if (!song) return;
    navigator.clipboard.writeText(song.musicStylePrompt);
    setCopiedPrompt(true);
    onNotify('Prompt musik Suno AI disalin ke clipboard!', 'success');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleSave = () => {
    if (song) {
      onSaveSong(song);
      setSavedSuccess(true);
      onNotify('Lagu edukasi berhasil disimpan ke proyek Anda!', 'success');
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Tools</span>
        </button>
        <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
          Suno / Udio / Lyria Ready
        </span>
      </div>

      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-700 text-xs font-semibold">
          <Music className="w-3.5 h-3.5" />
          <span>Educational Song Generator</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">
          Rancang Lagu Edukasi & Jingle Belajar
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Ubah materi pelajaran menjadi lirik lagu berima yang mudah dihafal anak, lengkap dengan prompt musik AI untuk Suno v3.5 dan Udio.
        </p>
      </div>

      {/* Input Card */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <h2 className="text-sm font-bold text-slate-900 font-display">
          Konfigurasi Lagu
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Topik Lagu Belajar
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Contoh: Mengenal Angka 1-10, Menggosok Gigi, Cuci Tangan..."
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-rose-500 focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setTopic('Mengenal Angka 1-10')}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl whitespace-nowrap"
              >
                Angka 1-10
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Target Usia
            </label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Contoh: 3-5 Tahun, SD Kelas 1-3"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Bahasa Lirik
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            >
              <option value="Bahasa Indonesia">Bahasa Indonesia</option>
              <option value="Bilingual (Indonesia - Inggris)">Bilingual (Indonesia - Inggris)</option>
              <option value="English Only">English Only</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Gaya Aransemen Musik (Genre)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {styles.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSongStyle(s)}
                  className={`p-2.5 text-xs text-left rounded-xl border transition-colors cursor-pointer ${
                    songStyle === s
                      ? 'bg-rose-50 border-rose-500 text-rose-800 font-semibold'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tujuan Capaian Pembelajaran Lagu
            </label>
            <input
              type="text"
              value={learningObjective}
              onChange={(e) => setLearningObjective(e.target.value)}
              placeholder="Apa yang diharapkan dihafal/dipahami anak dari lagu ini?"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Menyusun Lirik & Harmoni...' : 'Generate Lagu Edukasi'}</span>
          </button>
        </div>
      </div>

      {/* Generated Song Result */}
      {isGenerating ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-rose-200 border-t-rose-600 animate-spin" />
          <p className="text-xs text-slate-500">
            Menulis bait rima, refrain yang catchy, dan konfigurasi vokal ramah anak...
          </p>
        </div>
      ) : song ? (
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {song.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {song.age} · {song.language} · {song.duration}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyLyrics}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
              >
                {copiedLyrics ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLyrics ? 'Lirik Tersalin' : 'Copy Lyrics'}</span>
              </button>

              <button
                onClick={handleCopyPrompt}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Music Prompt</span>
              </button>

              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
              >
                {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                <span>{savedSuccess ? 'Tersimpan' : 'Save'}</span>
              </button>

              <button
                onClick={handleGenerate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
            </div>
          </div>

          {/* Lyrics and Music Spec Sheet */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Full Lyrics */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider">
                  Naskah Lirik Lagu
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {song.songStructure}
                </span>
              </div>

              <div className="space-y-6">
                {song.lyrics.map((sec, i) => (
                  <div key={i} className="space-y-1.5">
                    <span className="text-xs font-bold text-rose-700 font-mono">
                      {sec.sectionTitle}
                    </span>
                    <div className="pl-3 border-l-2 border-rose-200 space-y-1">
                      {sec.lines.map((line, lIdx) => (
                        <p key={lIdx} className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Music Specs */}
            <div className="lg:col-span-5 space-y-4">
              {/* Music prompt box */}
              <div className="p-5 bg-slate-900 text-slate-100 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                    <Disc3 className="w-4 h-4 animate-spin-slow" />
                    <span>Prompt Suno v3.5 / Udio:</span>
                  </div>
                  <button
                    onClick={handleCopyPrompt}
                    className="text-xs text-slate-300 hover:text-white"
                  >
                    Copy
                  </button>
                </div>
                <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                  {song.musicStylePrompt}
                </p>
              </div>

              {/* Voice Direction */}
              <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <Mic className="w-4 h-4 text-purple-600" />
                  <span>Petunjuk Karakter Vokal</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {song.voiceDirection}
                </p>
              </div>

              {/* Learning Objective */}
              <div className="p-5 bg-rose-50/60 rounded-2xl border border-rose-100 space-y-2">
                <span className="text-xs font-bold text-rose-900">
                  Tujuan Pembelajaran Lagu
                </span>
                <p className="text-xs text-rose-800 leading-relaxed">
                  {song.learningObjective}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
