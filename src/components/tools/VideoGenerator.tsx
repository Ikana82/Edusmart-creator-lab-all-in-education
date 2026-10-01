import React, { useState } from 'react';
import { geminiService } from '../../services/geminiService';
import { VideoScriptProject, EducationLevel } from '../../types';
import {
  Video,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  Save,
  Film,
  Mic,
  Subtitles,
  ListOrdered,
  FileCheck2,
  Download
} from 'lucide-react';

interface VideoGeneratorProps {
  onBack: () => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const VideoGenerator: React.FC<VideoGeneratorProps> = ({ onBack, onNotify }) => {
  const [topic, setTopic] = useState('Proses Kopi Luwak & Ekosistem Hutan');
  const [audience, setAudience] = useState<EducationLevel>('SD');
  const [videoType, setVideoType] = useState('Video Pembelajaran');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');

  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<VideoScriptProject | null>(null);
  const [activeTab, setActiveTab] = useState<'script' | 'storyboard' | 'prompts' | 'voiceover' | 'subtitles' | 'guide'>('script');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await geminiService.generateVideoScript({
        topic,
        targetAudience: audience,
        videoType,
        aspectRatio
      });
      setResult(res);
      onNotify('Paket produksi video edukasi berhasil disusun!', 'success');
    } catch {
      onNotify('Gagal membuat paket video.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onNotify(`${label} berhasil disalin!`, 'success');
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Tools</span>
        </button>
        <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2.5 py-1 rounded-md">
          Video Production Pipeline
        </span>
      </div>

      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-50 text-sky-700 text-xs font-semibold">
          <Video className="w-3.5 h-3.5" />
          <span>Video Generator & Production Guide</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">
          Alur Lengkap Pembuatan Video Edukasi
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Hubungkan ide topik edukasi dengan naskah narasi, storyboard, prompt Midjourney & Kling AI, serta panduan editing akhir.
        </p>
      </div>

      {/* Input Form */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Topik Video Edukasi
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Proses Kopi Luwak & Ekosistem Hutan, Siklus Air, Planet Mars..."
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Target Audiens
            </label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as EducationLevel)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            >
              <option value="PAUD/TK">PAUD / TK (3-6 Tahun)</option>
              <option value="SD">SD (7-12 Tahun)</option>
              <option value="SMP">SMP (13-15 Tahun)</option>
              <option value="Umum">Umum / Semua Usia</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Format Rasio Video
            </label>
            <div className="flex gap-2">
              {(['16:9', '9:16', '1:1'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setAspectRatio(r)}
                  className={`flex-1 py-1.5 text-xs rounded-xl border text-center transition-colors cursor-pointer ${
                    aspectRatio === r
                      ? 'bg-sky-50 border-sky-500 text-sky-700 font-semibold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Menyusun Pipeline Video...' : 'Generate Full Video Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* Output Pipeline */}
      {isGenerating ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-sky-200 border-t-sky-600 animate-spin" />
          <p className="text-xs text-slate-500">
            Menghasilkan naskah, urutan scene, subtitle, dan panduan editing...
          </p>
        </div>
      ) : result ? (
        <div className="space-y-6">
          {/* Workflow Step Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-200">
            {[
              { id: 'script', label: '1. Script & Hook', icon: Film },
              { id: 'storyboard', label: '2. Storyboard Timeline', icon: ListOrdered },
              { id: 'prompts', label: '3. Image & Video Prompts', icon: Sparkles },
              { id: 'voiceover', label: '4. Voice-Over Narration', icon: Mic },
              { id: 'subtitles', label: '5. Subtitles', icon: Subtitles },
              { id: 'guide', label: '6. Production Guide', icon: FileCheck2 }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-xl transition-colors whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'border-b-2 border-sky-600 text-sky-700 font-bold bg-sky-50/50'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Script */}
          {activeTab === 'script' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Naskah Video Edukatif Berdasarkan Alur Waktu
                </h3>
                <button
                  onClick={() => copyToClipboard(result.script, 'script', 'Naskah')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1.5"
                >
                  {copiedKey === 'script' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Script</span>
                </button>
              </div>
              <pre className="p-4 bg-slate-900 text-slate-200 rounded-xl font-mono text-xs whitespace-pre-wrap leading-relaxed">
                {result.script}
              </pre>
            </div>
          )}

          {/* Tab 2: Storyboard */}
          {activeTab === 'storyboard' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Urutan Scene Video (Timeline)
              </h3>
              <div className="space-y-3">
                {result.storyboard.map((s) => (
                  <div key={s.sceneNumber} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>SCENE {s.sceneNumber} ({s.timestamp})</span>
                      <span className="text-[11px] font-normal text-slate-500">Kamera: {s.cameraMovement}</span>
                    </div>
                    <p className="text-xs text-slate-700"><strong>Visual:</strong> {s.visualDescription}</p>
                    <p className="text-xs text-sky-800 italic"><strong>Narasi:</strong> "{s.narration}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Prompts */}
          {activeTab === 'prompts' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Daftar Prompt AI Visual (Midjourney, Kling, Runway)
                </h3>
                <button
                  onClick={() =>
                    copyToClipboard(
                      result.imagePrompts.concat(result.videoPrompts).join('\n\n'),
                      'allPrompts',
                      'Semua Prompt'
                    )
                  }
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1.5"
                >
                  {copiedKey === 'allPrompts' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Semua Prompt</span>
                </button>
              </div>

              <div className="space-y-4">
                {result.imagePrompts.map((imgPrompt, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 text-slate-200 space-y-2 text-xs font-mono">
                    <div className="flex items-center justify-between text-sky-400 font-sans font-semibold">
                      <span>Scene {idx + 1} Image Prompt:</span>
                      <button
                        onClick={() => copyToClipboard(imgPrompt, `img-${idx}`, `Image Prompt Scene ${idx + 1}`)}
                        className="hover:text-white"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-slate-300">{imgPrompt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Voiceover */}
          {activeTab === 'voiceover' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Naskah Pengisi Suara (Voice-Over untuk ElevenLabs)
                </h3>
                <button
                  onClick={() => copyToClipboard(result.voiceOverScript, 'vo', 'Naskah Voice-Over')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center gap-1.5"
                >
                  {copiedKey === 'vo' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy VO Script</span>
                </button>
              </div>
              <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100 space-y-3">
                <p className="text-xs text-purple-900 font-mono whitespace-pre-wrap leading-relaxed">
                  {result.voiceOverScript}
                </p>
              </div>
            </div>
          )}

          {/* Tab 5: Subtitles */}
          {activeTab === 'subtitles' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Daftar Subtitle & Teks On-Screen Pop-up
              </h3>
              <div className="divide-y divide-slate-100">
                {result.subtitles.map((sub, i) => (
                  <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {sub.time}
                    </span>
                    <span className="font-semibold text-slate-800">{sub.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 6: Guide */}
          {activeTab === 'guide' && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 font-display">
                Panduan Produksi & Rekomendasi Tools
              </h3>
              <div className="space-y-3">
                {result.productionGuide.map((step, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700">
                    {step}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
