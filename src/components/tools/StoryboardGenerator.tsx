import React, { useState } from 'react';
import { geminiService } from '../../services/geminiService';
import { StoryboardProject, StoryboardScene, EducationLevel } from '../../types';
import {
  Film,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  Save,
  Edit2,
  Clock,
  Video,
  Image as ImageIcon,
  Camera,
  Layers,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface StoryboardGeneratorProps {
  onBack: () => void;
  onSaveProject: (project: StoryboardProject) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const StoryboardGenerator: React.FC<StoryboardGeneratorProps> = ({
  onBack,
  onSaveProject,
  onNotify
}) => {
  // Inputs
  const [topic, setTopic] = useState('Mengenal Luwak');
  const [audience, setAudience] = useState<EducationLevel>('SD');
  const [videoType, setVideoType] = useState('Video Pembelajaran');
  const [duration, setDuration] = useState('60 detik');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');
  const [visualStyle, setVisualStyle] = useState('Cute Educational');

  // Generator & Scene states
  const [isGenerating, setIsGenerating] = useState(false);
  const [storyboard, setStoryboard] = useState<StoryboardProject | null>(null);
  const [editingSceneIdx, setEditingSceneIdx] = useState<number | null>(null);
  const [copiedSceneIdx, setCopiedSceneIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Audience options
  const audienceOptions: EducationLevel[] = ['PAUD/TK', 'SD', 'SMP', 'Umum'];

  // Video types
  const videoTypes = [
    'Video Pembelajaran',
    'Video Pengenalan',
    'Fakta Menarik',
    'Storytelling',
    'Video Promosi Edukasi'
  ];

  // Durations
  const durations = ['10 detik', '20 detik', '30 detik', '60 detik', 'Custom (90s)'];

  // Visual styles
  const visualStyles = [
    '2D Cartoon',
    '3D Cartoon',
    'Cute Educational',
    'Cinematic',
    'Illustrated',
    'Kawaii'
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const generated = await geminiService.generateStoryboard({
        topic,
        audience,
        videoType,
        duration,
        aspectRatio,
        visualStyle
      });
      setStoryboard(generated);
      onNotify('Storyboard berhasil dibuat dengan format timeline!', 'success');
    } catch {
      onNotify('Gagal membuat storyboard.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyScene = (scene: StoryboardScene, idx: number) => {
    const text = `SCENE ${scene.sceneNumber} (${scene.timestamp})
Visual: ${scene.visualDescription}
Narration: "${scene.narration}"
On-Screen Text: ${scene.onScreenText}
Image Prompt: ${scene.imagePrompt}
Video Prompt: ${scene.videoPrompt}
Camera: ${scene.cameraMovement} | Transition: ${scene.transition}`;
    navigator.clipboard.writeText(text);
    setCopiedSceneIdx(idx);
    onNotify(`Scene ${scene.sceneNumber} disalin ke clipboard!`, 'success');
    setTimeout(() => setCopiedSceneIdx(null), 1800);
  };

  const handleCopyAllPrompts = () => {
    if (!storyboard) return;
    const allPrompts = storyboard.scenes
      .map(
        (s) =>
          `--- SCENE ${s.sceneNumber} (${s.timestamp}) ---
IMAGE PROMPT:
${s.imagePrompt}

VIDEO PROMPT:
${s.videoPrompt}

NARRATION:
${s.narration}
`
      )
      .join('\n\n');
    navigator.clipboard.writeText(allPrompts);
    setCopiedAll(true);
    onNotify('Semua prompt gambar & video berhasil disalin!', 'success');
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleRegenerateScene = (sceneIdx: number) => {
    if (!storyboard) return;
    const scene = storyboard.scenes[sceneIdx];
    const updatedScenes = [...storyboard.scenes];
    updatedScenes[sceneIdx] = {
      ...scene,
      visualDescription: `[Variasi Baru] ${scene.visualDescription}`,
      narration: `[Alternatif Narasi] ${scene.narration}`,
      imagePrompt: `${scene.imagePrompt}, alternative angle, dynamic daylight --ar ${storyboard.aspectRatio}`
    };
    setStoryboard({ ...storyboard, scenes: updatedScenes });
    onNotify(`Scene ${scene.sceneNumber} telah diperbarui dengan variasi baru!`, 'info');
  };

  const handleSave = () => {
    if (storyboard) {
      onSaveProject(storyboard);
      setSavedSuccess(true);
      onNotify('Storyboard tersimpan di proyek lokal Anda!', 'success');
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Tools</span>
        </button>
        <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
          Core Feature
        </span>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold">
          <Film className="w-3.5 h-3.5" />
          <span>Storyboard Generator</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">
          Rancang Storyboard Video Edukasi
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Ubah topik edukasi menjadi alur adegan terstruktur (timeline) dengan naskah narasi, prompt Midjourney, dan prompt Kling/Runway.
        </p>
      </div>

      {/* Input Configuration Card */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-slate-900 font-display">
          Konfigurasi Storyboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Topic */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Topik Video Edukasi
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Contoh: Mengenal Luwak, Rahasia Fotosintesis, Sistem Tata Surya..."
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white transition-colors"
              />
              <button
                type="button"
                onClick={() => setTopic('Mengenal Luwak')}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-xl whitespace-nowrap"
              >
                Pilih: Mengenal Luwak
              </button>
            </div>
          </div>

          {/* Target Audience */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Target Audience
            </label>
            <div className="grid grid-cols-2 gap-2">
              {audienceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAudience(opt)}
                  className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition-colors cursor-pointer ${
                    audience === opt
                      ? 'bg-purple-50 border-purple-500 text-purple-700 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Video Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Tipe Video
            </label>
            <select
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-purple-500"
            >
              {videoTypes.map((vt) => (
                <option key={vt} value={vt}>
                  {vt}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Durasi Video
            </label>
            <div className="flex flex-wrap gap-2">
              {durations.map((dur) => (
                <button
                  key={dur}
                  type="button"
                  onClick={() => setDuration(dur)}
                  className={`py-1.5 px-3 text-xs rounded-lg border transition-colors cursor-pointer ${
                    duration === dur
                      ? 'bg-purple-50 border-purple-500 text-purple-700 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          {/* Aspect Ratio */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Aspect Ratio
            </label>
            <div className="flex gap-2">
              {(['16:9', '9:16', '1:1'] as const).map((ar) => (
                <button
                  key={ar}
                  type="button"
                  onClick={() => setAspectRatio(ar)}
                  className={`flex-1 py-1.5 text-xs rounded-lg border text-center transition-colors cursor-pointer ${
                    aspectRatio === ar
                      ? 'bg-purple-50 border-purple-500 text-purple-700 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {ar} {ar === '16:9' ? '(Landscape)' : ar === '9:16' ? '(Reels/Shorts)' : '(Square)'}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Style */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Gaya Visual (Visual Style)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {visualStyles.map((vs) => (
                <button
                  key={vs}
                  type="button"
                  onClick={() => setVisualStyle(vs)}
                  className={`py-2 px-2 text-xs rounded-xl border text-center transition-colors cursor-pointer ${
                    visualStyle === vs
                      ? 'bg-purple-50 border-purple-500 text-purple-700 font-semibold'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  {vs}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-purple-200 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Menghasilkan Storyboard...' : 'Generate Storyboard Timeline'}</span>
          </button>
        </div>
      </div>

      {/* Generated Storyboard Timeline */}
      {isGenerating ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin" />
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-slate-900 font-display">
              Menyusun Naskah Adegan & Timeline Video...
            </h3>
            <p className="text-xs text-slate-500">
              Memecah topik "{topic}" menjadi sequence visual, narasi suara, dan prompt AI.
            </p>
          </div>
        </div>
      ) : storyboard ? (
        <div className="space-y-6">
          {/* Action Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {storyboard.title}
                </h3>
              </div>
              <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-2">
                <span>{storyboard.audience}</span>
                <span>·</span>
                <span>{storyboard.videoType}</span>
                <span>·</span>
                <span>{storyboard.duration}</span>
                <span>·</span>
                <span>Rasio: {storyboard.aspectRatio}</span>
                <span>·</span>
                <span className="text-purple-600 font-medium">{storyboard.visualStyle}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleCopyAllPrompts}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors cursor-pointer"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? 'Semua Tersalin' : 'Copy All Prompts'}</span>
              </button>

              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
              >
                {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                <span>{savedSuccess ? 'Tersimpan' : 'Save Storyboard'}</span>
              </button>

              <button
                onClick={handleGenerate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Regenerate All</span>
              </button>
            </div>
          </div>

          {/* Timeline Sequence */}
          <div className="relative pl-6 sm:pl-8 border-l-2 border-purple-200 space-y-8">
            {storyboard.scenes.map((scene, idx) => {
              const isEditing = editingSceneIdx === idx;
              const isCopied = copiedSceneIdx === idx;

              return (
                <div key={scene.sceneNumber} className="relative group">
                  {/* Timeline Badge Dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-4 w-7 h-7 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    {scene.sceneNumber}
                  </div>

                  {/* Scene Card */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-purple-300 transition-all p-5 sm:p-6 space-y-4">
                    {/* Scene Top Info */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-purple-700 font-display tracking-wider">
                          SCENE {String(scene.sceneNumber).padStart(2, '0')}
                        </span>
                        <div className="inline-flex items-center gap-1 text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded-md">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{scene.timestamp}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopyScene(scene, idx)}
                          className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                          title="Copy Scene Ini"
                        >
                          {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => handleRegenerateScene(idx)}
                          className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                          title="Regenerate Scene Ini"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingSceneIdx(isEditing ? null : idx)}
                          className="p-1.5 text-slate-400 hover:text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                          title="Edit Scene"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Visual & Narration Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Visual */}
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
                        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                          <span>Visual Description</span>
                        </div>
                        {isEditing ? (
                          <textarea
                            value={scene.visualDescription}
                            onChange={(e) => {
                              const updated = [...storyboard.scenes];
                              updated[idx].visualDescription = e.target.value;
                              setStoryboard({ ...storyboard, scenes: updated });
                            }}
                            className="w-full text-xs text-slate-800 bg-white border border-slate-300 rounded p-2"
                            rows={3}
                          />
                        ) : (
                          <p className="text-xs text-slate-700 leading-relaxed">
                            {scene.visualDescription}
                          </p>
                        )}
                      </div>

                      {/* Narration */}
                      <div className="p-3.5 bg-purple-50/50 rounded-xl border border-purple-100/60 space-y-1.5">
                        <div className="text-[11px] font-bold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                          <Video className="w-3.5 h-3.5 text-purple-400" />
                          <span>Voice-Over Narration</span>
                        </div>
                        {isEditing ? (
                          <textarea
                            value={scene.narration}
                            onChange={(e) => {
                              const updated = [...storyboard.scenes];
                              updated[idx].narration = e.target.value;
                              setStoryboard({ ...storyboard, scenes: updated });
                            }}
                            className="w-full text-xs text-slate-800 bg-white border border-slate-300 rounded p-2"
                            rows={3}
                          />
                        ) : (
                          <p className="text-xs text-purple-950 font-medium italic leading-relaxed">
                            "{scene.narration}"
                          </p>
                        )}
                      </div>
                    </div>

                    {/* On Screen Text, Camera & Transition */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
                      <div className="px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/60 rounded-md font-medium">
                        Teks Layar: "{scene.onScreenText}"
                      </div>
                      <div className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md flex items-center gap-1">
                        <Camera className="w-3 h-3 text-slate-400" />
                        <span>Kamera: {scene.cameraMovement}</span>
                      </div>
                      <div className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md flex items-center gap-1">
                        <Layers className="w-3 h-3 text-slate-400" />
                        <span>Transisi: {scene.transition}</span>
                      </div>
                    </div>

                    {/* Prompts Boxes (Image & Video) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {/* Image Prompt */}
                      <div className="p-3 bg-slate-900 rounded-xl text-slate-200 text-xs font-mono space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-sky-400 font-sans font-semibold">
                          <span>Image Prompt (Midjourney / Ideogram):</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(scene.imagePrompt);
                              onNotify('Image prompt disalin!', 'success');
                            }}
                            className="hover:text-white"
                          >
                            Copy
                          </button>
                        </div>
                        <p className="line-clamp-2 text-slate-300">{scene.imagePrompt}</p>
                      </div>

                      {/* Video Prompt */}
                      <div className="p-3 bg-slate-900 rounded-xl text-slate-200 text-xs font-mono space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-purple-400 font-sans font-semibold">
                          <span>Video Prompt (Kling / Runway / Luma):</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(scene.videoPrompt);
                              onNotify('Video prompt disalin!', 'success');
                            }}
                            className="hover:text-white"
                          >
                            Copy
                          </button>
                        </div>
                        <p className="line-clamp-2 text-slate-300">{scene.videoPrompt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};
