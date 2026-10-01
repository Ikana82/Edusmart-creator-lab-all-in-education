import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Gamepad2,
  Copy,
  Check,
  Download,
  FileText,
  Upload,
  RefreshCw,
  Plus,
  Trash2,
  ChevronRight,
  ChevronLeft,
  Monitor,
  Smartphone,
  CheckCircle2,
  Play,
  RotateCcw,
  Settings,
  HelpCircle,
  Eye,
  Sliders
} from 'lucide-react';
import {
  GAME_VISUAL_STYLES,
  GAME_TYPES,
  GAME_AGE_GROUPS,
  GAME_PRESETS,
  GameQuestionItem,
  GameVisualOption,
  GameTypeOption,
  GameAgeOption,
  buildDefaultQuestionsForGame,
  generateGameScreenPrompt
} from '../../data/gameEduData';

interface GameEduStudioProps {
  onBack: () => void;
  onNotify?: (msg: string, type: 'success' | 'info' | 'error') => void;
  onSaveGame?: () => void;
}

export const GameEduStudio: React.FC<GameEduStudioProps> = ({
  onBack,
  onNotify,
  onSaveGame
}) => {
  // Wizard Step (1 through 9, or 'result')
  const [currentStep, setCurrentStep] = useState<number | 'result'>(1);

  // STEP 1: Topik & Dokumen
  const [topic, setTopic] = useState('Matematika (Berhitung, Mengenal Angka & Bentuk, Perbandingan, Pola Sederhana)');
  const [uploadedDocName, setUploadedDocName] = useState<string | null>(null);

  // STEP 2: Jenis Game
  const [selectedGameTypeId, setSelectedGameTypeId] = useState<'pilihan-ganda' | 'petualangan' | 'cerita'>('pilihan-ganda');

  // STEP 3: Target Usia
  const [selectedAgeId, setSelectedAgeId] = useState('4-6');

  // STEP 4: Struktur Halaman (Default 6 atau 10 soal)
  const [screens, setScreens] = useState<GameQuestionItem[]>(() =>
    GAME_PRESETS[0].screens
  );
  const [targetQuestionCount, setTargetQuestionCount] = useState<number>(6);
  const [editingScreenId, setEditingScreenId] = useState<string | null>(null);

  // STEP 5: Layout Orientasi
  const [layout, setLayout] = useState<'landscape' | 'portrait'>('landscape');

  // STEP 6: Gaya Visual
  const [selectedStyleId, setSelectedStyleId] = useState('3d-pixar');

  // STEP 7: Bahasa Narasi
  const [language, setLanguage] = useState<'id' | 'en' | 'bilingual'>('id');

  // STEP 8: Karakter Maskot
  const [mascotOption, setMascotOption] = useState<'none' | 'ai' | 'custom' | 'upload'>('ai');
  const [mascotName, setMascotName] = useState('Owi');
  const [mascotDesc, setMascotDesc] = useState(
    'Owi, seekor burung hantu kecil yang sangat imut memakai kacamata bundar besar, berwarna pastel cerah, dan selalu tersenyum ramah memandu permainan.'
  );
  const [uploadedMascotUrl, setUploadedMascotUrl] = useState<string | null>(null);

  // Result & Output states
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [viewMode, setViewMode] = useState<'cards' | 'playable' | 'raw'>('cards');
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

  // Active object references
  const currentGameType = useMemo(() => {
    return GAME_TYPES.find((g) => g.id === selectedGameTypeId) || GAME_TYPES[0];
  }, [selectedGameTypeId]);

  const currentAgeGroup = useMemo(() => {
    return GAME_AGE_GROUPS.find((a) => a.id === selectedAgeId) || GAME_AGE_GROUPS[0];
  }, [selectedAgeId]);

  const currentVisualStyle = useMemo(() => {
    return GAME_VISUAL_STYLES.find((s) => s.id === selectedStyleId) || GAME_VISUAL_STYLES[0];
  }, [selectedStyleId]);

  // Generate prompts
  const generatedPrompts = useMemo(() => {
    return screens.map((screen) => {
      const prompt = generateGameScreenPrompt(screen, screens.length, {
        topic,
        gameType: currentGameType,
        ageGroup: currentAgeGroup,
        layout,
        visualStyle: currentVisualStyle,
        language,
        mascotOption,
        mascotName,
        mascotDesc
      });
      return {
        screenNumber: screen.screenNumber,
        title: screen.subtopicTitle,
        type: screen.screenType,
        promptText: prompt,
        screenData: screen
      };
    });
  }, [screens, topic, currentGameType, currentAgeGroup, layout, currentVisualStyle, language, mascotOption, mascotName, mascotDesc]);

  // Handler load preset
  const handleLoadPreset = (preset: typeof GAME_PRESETS[0]) => {
    setTopic(preset.title);
    setSelectedGameTypeId(preset.gameTypeId);
    setSelectedAgeId(preset.ageId);
    setSelectedStyleId(preset.styleId);
    setMascotName(preset.mascotName);
    setMascotDesc(preset.mascotDesc);
    setMascotOption('ai');
    setScreens(preset.screens);
    setTargetQuestionCount(preset.screens.filter((s) => s.screenType === 'soal').length);
    if (onNotify) onNotify(`Preset "${preset.title}" berhasil dimuat!`, 'success');
  };

  // Rebuild structure based on count
  const handleAdjustCount = (newCount: number) => {
    setTargetQuestionCount(newCount);
    const newScreens = buildDefaultQuestionsForGame(
      topic,
      selectedGameTypeId,
      currentAgeGroup.range,
      mascotName,
      newCount
    );
    setScreens(newScreens);
    if (onNotify) onNotify(`Susunan soal disesuaikan menjadi ${newCount} soal! 🌟`, 'info');
  };

  // Move screen up/down
  const handleMoveScreen = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index <= 1) return; // don't move above title
    if (direction === 'down' && index >= screens.length - 2) return; // don't move below penutup

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const copy = [...screens];
    const temp = copy[index];
    copy[index] = copy[newIndex];
    copy[newIndex] = temp;

    const renumbered = copy.map((s, idx) => ({ ...s, screenNumber: idx + 1 }));
    setScreens(renumbered);
  };

  // Remove screen
  const handleRemoveScreen = (id: string) => {
    if (screens.length <= 3) {
      if (onNotify) onNotify('Game minimal memiliki 1 soal tantangan!', 'error');
      return;
    }
    const filtered = screens.filter((s) => s.id !== id).map((s, idx) => ({ ...s, screenNumber: idx + 1 }));
    setScreens(filtered);
    setTargetQuestionCount(filtered.filter((s) => s.screenType === 'soal').length);
  };

  // Handle document upload
  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedDocName(file.name);
      const cleanTitle = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTopic(cleanTitle);
      if (onNotify) onNotify(`File "${file.name}" diunggah. AI mengekstrak materi!`, 'success');
    }
  };

  // Handle mascot upload
  const handleMascotImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedMascotUrl(url);
      setMascotName(file.name.split('.')[0]);
      setMascotDesc(`Karakter berdasarkan gambar referensi ${file.name}`);
      if (onNotify) onNotify('Gambar maskot berhasil diunggah!', 'success');
    }
  };

  // Copy single prompt
  const handleCopyPrompt = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
    if (onNotify) onNotify(`Prompt Halaman ${idx + 1} disalin ke clipboard!`, 'success');
  };

  // Copy all prompts
  const handleCopyAll = () => {
    const text = generatedPrompts.map((p) => p.promptText).join('\n\n-------------------------------------------------------\n\n');
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
    if (onNotify) onNotify('Semua prompt layar game berhasil disalin!', 'success');
  };

  // Download .txt
  const handleDownloadTxt = () => {
    const all = `RINGKASAN KONSEP GAME EDUKASI
Topik          : ${topic}
Jenis Game     : ${currentGameType.name}
Struktur       : 1 Halaman Judul, ${screens.filter((s) => s.screenType === 'soal').length} Halaman Soal, 1 Halaman Penutup
Target Usia    : ${currentAgeGroup.label} (${currentAgeGroup.range})
Layout         : ${layout === 'landscape' ? 'Landscape (1920x1080)' : 'Portrait (1080x1920)'}
Gaya Visual    : ${currentVisualStyle.name}
Bahasa Narasi  : ${language === 'id' ? 'Bahasa Indonesia' : language === 'en' ? 'English' : 'Dwibahasa'}
Maskot         : ${mascotOption === 'none' ? 'Tanpa Maskot' : `${mascotName} (${mascotDesc})`}

=======================================================
PROMPT LAYAR SIAP PAKAI (AI IMAGE GENERATOR)
=======================================================

${generatedPrompts.map((p) => p.promptText).join('\n\n-------------------------------------------------------\n\n')}
`;
    const blob = new Blob([all], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Prompt_Game_Edukasi_${topic.slice(0, 20).replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    if (onNotify) onNotify('File prompt game berhasil diunduh!', 'success');
  };

  // Trigger Final Generation
  const handleConfirmAndGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep('result');
      if (onNotify) onNotify('Game prompts berhasil disusun dan siap dipakai!', 'success');
    }, 600);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            aria-label="Kembali"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                Studio Game Edukasi
              </span>
              <span className="text-xs text-slate-400 font-mono">9-Step Interactive Wizard</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-0.5">
              Generator Prompt Layar Game Edukasi
            </h1>
          </div>
        </div>

        {/* Step indicator breadcrumbs */}
        {currentStep !== 'result' && (
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((s) => (
              <button
                key={s}
                onClick={() => setCurrentStep(s)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                  currentStep === s
                    ? 'bg-amber-600 text-white shadow-xs scale-105'
                    : currentStep > s
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
                title={`Lompat ke Step ${s}`}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {currentStep === 'result' && (
          <button
            onClick={() => setCurrentStep(9)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Kembali ke Konfigurasi</span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: JUDUL ATAU TOPIK GAME */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                STEP 1: Judul atau Topik Game
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Kira-kira, apa topik materi yang ingin kamu jadikan game edukasi kali ini? Kamu bisa langsung menyebutkan topiknya, memilih preset, atau mengunggah file materi jika ingin saya mengambil materinya dari sana!
              </p>
            </div>
          </div>

          {/* Topic Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Topik Materi Game Edukasi
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Matematika (Berhitung, Mengenal Angka & Bentuk, Perbandingan, Pola)..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>

          {/* Presets Quick Pick */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500">Pilih Contoh Preset Siap Pakai:</span>
            <div className="flex flex-wrap gap-2">
              {GAME_PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleLoadPreset(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                    topic === p.title
                      ? 'bg-amber-50 text-amber-800 border-amber-300 font-bold shadow-2xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  🎮 {p.title}
                </button>
              ))}
            </div>
          </div>

          {/* Upload file area */}
          <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-amber-400 bg-slate-50/60 transition-colors">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                    Upload Dokumen Materi (Opsional)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Format: Word (.docx), PDF (.pdf), PPT (.pptx), atau Text (.txt)
                  </p>
                </div>
              </div>

              <label className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-2xs cursor-pointer flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>{uploadedDocName ? 'Ganti Dokumen' : 'Pilih File Materi'}</span>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                  onChange={handleDocUpload}
                  className="hidden"
                />
              </label>
            </div>

            {uploadedDocName && (
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4" />
                <span>Dokumen aktif: {uploadedDocName}</span>
              </div>
            )}
          </div>

          {/* Next Button */}
          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              disabled={!topic.trim()}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke STEP 2: Jenis Game</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: JENIS GAME */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                STEP 2: Jenis Game
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Ada tiga pilihan format game yang bisa kita gunakan sesuai panduan. Kamu ingin menggunakan format yang mana untuk materi <strong>"{topic}"</strong> ini?
              </p>
            </div>
          </div>

          {/* 3 Game Format Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {GAME_TYPES.map((type) => {
              const isSelected = selectedGameTypeId === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedGameTypeId(type.id)}
                  className={`p-5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-amber-700 border border-amber-100">
                        {type.badge}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {type.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {type.shortDesc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">Struktur:</span> {type.defaultStructureDesc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke STEP 3: Target Usia</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: TARGET USIA */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                STEP 3: Target Usia Pemain
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Mengetahui usia pemain sangat penting agar kita bisa menyesuaikan tingkat kesulitan soal, gaya bahasa, dan tampilan visualnya nanti. Silakan pilih target usia untuk game ini:
              </p>
            </div>
          </div>

          {/* Age Selection Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {GAME_AGE_GROUPS.map((age) => {
              const isSelected = selectedAgeId === age.id;
              return (
                <button
                  key={age.id}
                  onClick={() => setSelectedAgeId(age.id)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/70 shadow-xs ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                        {age.range}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 pt-1">{age.label}</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                      {age.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke STEP 4: Struktur Halaman</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: STRUKTUR HALAMAN & SOAL */}
      {/* ========================================================================= */}
      {currentStep === 4 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  STEP 4: Struktur Halaman & Daftar Soal
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Format {currentGameType.name} memiliki <strong>1 Halaman Judul</strong>, <strong>{screens.filter((s) => s.screenType === 'soal').length} Halaman Soal</strong>, dan <strong>1 Halaman Penutup</strong>. Total {screens.length} Layar.
                </p>
              </div>
            </div>

            {/* Quick adjust question count */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl shrink-0">
              <span className="text-xs font-bold text-slate-500 px-2">Jumlah Soal:</span>
              {[5, 6, 8, 10].map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => handleAdjustCount(cnt)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    targetQuestionCount === cnt
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:bg-white'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>
          </div>

          {/* List of screens */}
          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {screens.map((screen, idx) => (
              <div
                key={screen.id}
                className="p-3 bg-slate-50 hover:bg-slate-100/70 rounded-xl border border-slate-200 flex items-center justify-between gap-3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                      screen.screenType === 'judul'
                        ? 'bg-indigo-600 text-white'
                        : screen.screenType === 'penutup'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    {screen.screenNumber}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900">{screen.subtopicTitle}</h4>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 capitalize">
                        {screen.screenType}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-1">
                      Pertanyaan/Header: "{screen.questionText}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {screen.screenType === 'soal' && (
                    <>
                      <button
                        onClick={() => handleMoveScreen(idx, 'up')}
                        disabled={idx <= 1}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-white cursor-pointer"
                        title="Geser Naik"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => handleMoveScreen(idx, 'down')}
                        disabled={idx >= screens.length - 2}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-white cursor-pointer"
                        title="Geser Turun"
                      >
                        ▼
                      </button>
                      <button
                        onClick={() => handleRemoveScreen(screen.id)}
                        className="p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50 cursor-pointer"
                        title="Hapus Soal Ini"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke STEP 5: Layout Layar</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: LAYOUT ORIENTASI LAYAR */}
      {/* ========================================================================= */}
      {currentStep === 5 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0">
              5
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                STEP 5: Layout (Orientasi Layar)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Untuk mengoptimalkan antarmuka (interface) game edukasi ini, orientasi layar mana yang ingin kamu gunakan?
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Landscape 1920x1080 */}
            <button
              onClick={() => setLayout('landscape')}
              className={`p-6 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                layout === 'landscape'
                  ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-2 ring-amber-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-amber-800 border border-amber-200 font-mono">
                    16:9 Aspect Ratio
                  </span>
                  {layout === 'landscape' && <Check className="w-5 h-5 text-amber-600" />}
                </div>

                <div className="w-full h-32 rounded-xl bg-white border border-slate-200 flex flex-col justify-between p-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <div className="h-2 w-20 bg-slate-200 rounded" />
                    <div className="h-2 w-8 bg-amber-200 rounded" />
                  </div>
                  <div className="flex items-center justify-center gap-3">
                    <Monitor className="w-8 h-8 text-amber-500" />
                    <div className="space-y-1">
                      <div className="h-2 w-24 bg-slate-200 rounded" />
                      <div className="h-1.5 w-16 bg-slate-100 rounded" />
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="h-2 w-16 bg-amber-300 rounded-full" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">Landscape (1920x1080)</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Ideal untuk tampilan lebar seperti bermain di tablet, layar laptop, komputer kelas, atau Smartboard interaktif.
                  </p>
                </div>
              </div>
            </button>

            {/* Portrait 1080x1920 */}
            <button
              onClick={() => setLayout('portrait')}
              className={`p-6 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                layout === 'portrait'
                  ? 'border-amber-600 bg-amber-50/70 shadow-sm ring-2 ring-amber-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-amber-800 border border-amber-200 font-mono">
                    9:16 Aspect Ratio
                  </span>
                  {layout === 'portrait' && <Check className="w-5 h-5 text-amber-600" />}
                </div>

                <div className="w-full h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 shadow-2xs">
                  <div className="w-20 h-28 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between p-1.5">
                    <div className="h-1 w-8 bg-slate-200 rounded" />
                    <div className="flex justify-center">
                      <Smartphone className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="h-1 w-10 bg-amber-200 rounded-full self-center" />
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">Portrait (1080x1920)</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Sangat pas untuk mobile-first experience (dimainkan di smartphone) atau jika ingin dibagikan sebagai konten vertikal.
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <button
              onClick={() => setCurrentStep(6)}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke STEP 6: Gaya Visual</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 6: GAYA VISUAL (12 PILIHAN RESMI) */}
      {/* ========================================================================= */}
      {currentStep === 6 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0">
              6
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                STEP 6: Silakan Pilih Gaya Visual
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Agar game terlihat memikat, mari tentukan gaya ilustrasinya. Berikut adalah 12 pilihan gaya visual resmi:
              </p>
            </div>
          </div>

          {/* Tip Box for Children */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>Tips Rekomendasi:</strong> Untuk anak usia 4–6 tahun, gaya seperti <span className="font-bold underline">3D Clay Glossy (Vibrant & Colorful)</span>, <span className="font-bold underline">3D Soft Clay Pastel</span>, atau <span className="font-bold underline">3D Pixar Style</span> biasanya sangat disukai karena bentuknya bulat lembut dan warnanya ceria.
            </p>
          </div>

          {/* Grid Styles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {GAME_VISUAL_STYLES.map((style) => {
              const isSelected = selectedStyleId === style.id;
              return (
                <button
                  key={style.id}
                  onClick={() => setSelectedStyleId(style.id)}
                  className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/70 shadow-xs ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${style.gradient} flex items-center justify-center text-white text-xs font-bold`}
                      >
                        ✦
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 pt-1">
                      {style.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                      {style.description}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-amber-800 font-medium">
                    {style.recommendedFor}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(5)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <button
              onClick={() => setCurrentStep(7)}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke STEP 7: Bahasa Narasi</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 7: BAHASA NARASI */}
      {/* ========================================================================= */}
      {currentStep === 7 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0">
              7
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                STEP 7: Bahasa Narasi
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Kamu ingin teks, soal, dan instruksi di dalam game ini menggunakan bahasa apa? Berikut adalah pilihannya:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                id: 'id',
                title: 'Bahasa Indonesia',
                desc: 'Seluruh teks soal, tombol navigasi, dan instruksi ramah anak dalam Bahasa Indonesia yang ceria.',
                flag: '🇮🇩'
              },
              {
                id: 'en',
                title: 'English',
                desc: 'Full English game question text, interactive buttons, and encouraging congratulatory feedback.',
                flag: '🇬🇧'
              },
              {
                id: 'bilingual',
                title: 'Dwibahasa (Bilingual)',
                desc: 'Teks instruksi bahasa Indonesia disertai padanan kosakata bahasa Inggris untuk pengayaan.',
                flag: '🌐'
              }
            ].map((lang) => {
              const isSelected = language === lang.id;
              return (
                <button
                  key={lang.id}
                  onClick={() => setLanguage(lang.id as any)}
                  className={`p-5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-amber-600 bg-amber-50/70 shadow-xs ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xl">{lang.flag}</span>
                      {isSelected && <Check className="w-4 h-4 text-amber-600" />}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{lang.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{lang.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(6)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <button
              onClick={() => setCurrentStep(8)}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke STEP 8: Karakter Maskot</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 8: KARAKTER MASKOT */}
      {/* ========================================================================= */}
      {currentStep === 8 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0">
              8
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                STEP 8: Karakter Maskot Pemandu
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Adanya maskot atau karakter pemandu bisa bikin game edukasi terasa lebih hidup, bersahabat, dan makin seru untuk anak. Untuk maskot ini, kamu punya beberapa pilihan:
              </p>
            </div>
          </div>

          {/* 4 Mascot Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* AI Auto Mascot */}
            <button
              onClick={() => setMascotOption('ai')}
              className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                mascotOption === 'ai'
                  ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🦉</span>
                  <h4 className="text-sm font-bold text-slate-900">Biarkan AI Merancang Maskot</h4>
                </div>
                {mascotOption === 'ai' && <Check className="w-4 h-4 text-amber-600" />}
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Saya akan bantu buatkan konsep maskot yang paling cocok untuk materi "{topic}" dengan gaya {currentVisualStyle.name}.
              </p>
            </button>

            {/* Custom Description */}
            <button
              onClick={() => setMascotOption('custom')}
              className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                mascotOption === 'custom'
                  ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">✍️</span>
                  <h4 className="text-sm font-bold text-slate-900">Deskripsikan Sendiri</h4>
                </div>
                {mascotOption === 'custom' && <Check className="w-4 h-4 text-amber-600" />}
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Kamu bisa ceritakan wujud maskot yang kamu mau (misalnya: "Burung hantu kecil memakai kacamata bundar besar").
              </p>
            </button>

            {/* Upload Reference */}
            <button
              onClick={() => setMascotOption('upload')}
              className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                mascotOption === 'upload'
                  ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🖼️</span>
                  <h4 className="text-sm font-bold text-slate-900">Upload Referensi Gambar</h4>
                </div>
                {mascotOption === 'upload' && <Check className="w-4 h-4 text-amber-600" />}
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Kalau kamu sudah punya gambar karakter sendiri, kamu bisa mengunggahnya ke sini.
              </p>
            </button>

            {/* Tanpa Maskot */}
            <button
              onClick={() => setMascotOption('none')}
              className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                mascotOption === 'none'
                  ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🚫</span>
                  <h4 className="text-sm font-bold text-slate-900">Tanpa Maskot</h4>
                </div>
                {mascotOption === 'none' && <Check className="w-4 h-4 text-amber-600" />}
              </div>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Game hanya fokus pada objek benda-benda dan soal tanpa karakter pemandu utama.
              </p>
            </button>
          </div>

          {/* Mascot details editing */}
          {(mascotOption === 'ai' || mascotOption === 'custom') && (
            <div className="p-4 bg-amber-50/40 rounded-2xl border border-amber-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700">Nama Maskot</label>
                  <input
                    type="text"
                    value={mascotName}
                    onChange={(e) => setMascotName(e.target.value)}
                    placeholder="Contoh: Owi"
                    className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700">Deskripsi Karakter Maskot</label>
                  <input
                    type="text"
                    value={mascotDesc}
                    onChange={(e) => setMascotDesc(e.target.value)}
                    placeholder="Contoh: Burung hantu kecil memakai kacamata bundar besar, warna pastel cerah..."
                    className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>
            </div>
          )}

          {mascotOption === 'upload' && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <label className="text-xs font-bold text-slate-700">Unggah File Maskot</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleMascotImageUpload}
                className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-50 file:text-amber-800 hover:file:bg-amber-100"
              />
              {uploadedMascotUrl && (
                <div className="flex items-center gap-3">
                  <img
                    src={uploadedMascotUrl}
                    alt="Maskot"
                    className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                  />
                  <span className="text-xs text-emerald-700 font-semibold">
                    Gambar maskot siap dijadikan referensi prompt!
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(7)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </button>
            <button
              onClick={() => setCurrentStep(9)}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke STEP 9: Konfirmasi</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 9: KONFIRMASI RINGKASAN */}
      {/* ========================================================================= */}
      {currentStep === 9 && (
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 font-bold flex items-center justify-center shrink-0">
              9
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                STEP 9: Ringkasan Konsep Game Edukasi
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Berikut adalah ringkasan dari semua pilihan yang sudah kita sepakati. Apakah semua informasi sudah sesuai?
              </p>
            </div>
          </div>

          {/* Clean Plaintext Box like user prompt */}
          <div className="p-5 bg-slate-900 text-amber-300 rounded-2xl font-mono text-xs leading-relaxed border border-slate-800 shadow-inner">
            <div className="text-white font-bold pb-2 border-b border-slate-700">
              RINGKASAN KONSEP GAME EDUKASI
            </div>
            <div className="pt-3 space-y-1.5 text-slate-200">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="text-slate-400 w-32 shrink-0">Topik</span>
                <span className="font-bold text-white">: {topic}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="text-slate-400 w-32 shrink-0">Jenis Game</span>
                <span className="font-bold text-white">: {currentGameType.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="text-slate-400 w-32 shrink-0">Struktur</span>
                <span className="font-bold text-white">
                  : 1 Halaman Judul, {screens.filter((s) => s.screenType === 'soal').length} Halaman Soal, 1 Halaman Penutup
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="text-slate-400 w-32 shrink-0">Target Usia</span>
                <span className="font-bold text-white">: {currentAgeGroup.range} ({currentAgeGroup.label})</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="text-slate-400 w-32 shrink-0">Layout</span>
                <span className="font-bold text-white">
                  : {layout === 'landscape' ? 'Landscape (1920x1080)' : 'Portrait (1080x1920)'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="text-slate-400 w-32 shrink-0">Gaya Visual</span>
                <span className="font-bold text-white">: {currentVisualStyle.name}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="text-slate-400 w-32 shrink-0">Bahasa Narasi</span>
                <span className="font-bold text-white">
                  : {language === 'id' ? 'Bahasa Indonesia' : language === 'en' ? 'English' : 'Dwibahasa'}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <span className="text-slate-400 w-32 shrink-0">Maskot</span>
                <span className="font-bold text-amber-300">
                  : {mascotOption === 'none' ? 'Tanpa Maskot' : `${mascotName} (${mascotDesc})`}
                </span>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="p-5 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">
                Apakah semua detail di atas sudah sesuai dan kamu siap melangkah ke tahap selanjutnya?
              </h4>
              <p className="text-xs text-amber-200 mt-0.5">
                Klik tombol di samping untuk langsung menghasilkan susunan lengkap dan prompt gambar siap pakai untukmu!
              </p>
            </div>
            <button
              onClick={handleConfirmAndGenerate}
              disabled={isGenerating}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Menyusun Prompt Game...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Ya, Buat Susunan & Prompt Siap Pakai!</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* RESULT VIEW: GAME SCREEN PROMPTS & INTERACTIVE PLAYABLE MOCKUP */}
      {/* ========================================================================= */}
      {currentStep === 'result' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="p-6 bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 rounded-3xl text-white shadow-lg border border-amber-500/20 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Susunan Soal & Prompt Layar Selesai Dikunci ✨</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Prompt Game Edukasi: {topic}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Berikut adalah susunan lengkap dan prompt gambar siap pakai untuk seluruh {screens.length} layar game. Silakan salin prompt ini untuk AI Image Generator pilihanmu.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap sm:flex-col items-stretch gap-2 shrink-0">
              <button
                onClick={handleCopyAll}
                className="px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedAll ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedAll ? 'Semua Tersalin!' : 'Salin Semua Prompt'}</span>
              </button>
              <button
                onClick={handleDownloadTxt}
                className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer border border-white/10"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File .TXT</span>
              </button>
            </div>
          </div>

          {/* View Mode Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span>Layar {activeScreenIndex + 1} dari {screens.length}</span>
              <span className="text-slate-300">·</span>
              <span className="text-amber-700 font-bold">{screens[activeScreenIndex]?.subtopicTitle}</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'cards' ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Daftar Prompt
              </button>
              <button
                onClick={() => setViewMode('playable')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'playable' ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🎮 Simulasi Layar Game
              </button>
              <button
                onClick={() => setViewMode('raw')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'raw' ? 'bg-white text-amber-800 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Full Raw Text
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: PROMPT CARDS */}
          {viewMode === 'cards' && (
            <div className="space-y-4">
              {generatedPrompts.map((p, idx) => {
                const isCopied = copiedIndex === idx;
                return (
                  <div
                    key={p.screenNumber}
                    className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 hover:border-amber-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">
                          {p.screenNumber}
                        </span>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900">
                            {p.title}
                          </h3>
                          <span className="text-[11px] text-slate-400 capitalize">
                            Tipe: {p.type} · {layout}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopyPrompt(p.promptText, idx)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                          isCopied
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Tersalin ke Clipboard!' : 'Salin Prompt Layar Ini'}</span>
                      </button>
                    </div>

                    <pre className="p-4 bg-slate-950 text-slate-200 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto border border-slate-800">
                      {p.promptText}
                    </pre>
                  </div>
                );
              })}

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                <p className="text-xs font-medium text-amber-900">
                  Ketik <strong>'lanjut'</strong> atau gunakan mode <strong>🎮 Simulasi Layar Game</strong> di atas untuk mencoba memainkan alur game dari sudut pandang anak!
                </p>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: PLAYABLE INTERACTIVE GAME MOCKUP */}
          {viewMode === 'playable' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              {/* Pagination Controls */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500">
                  Simulasi Game Layar {activeScreenIndex + 1} dari {screens.length}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveScreenIndex(Math.max(0, activeScreenIndex - 1));
                      setSelectedAnswerIndex(null);
                    }}
                    disabled={activeScreenIndex === 0}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded-lg text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Sebelumnya</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveScreenIndex(Math.min(screens.length - 1, activeScreenIndex + 1));
                      setSelectedAnswerIndex(null);
                    }}
                    disabled={activeScreenIndex === screens.length - 1}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 disabled:opacity-30 rounded-lg text-xs font-bold text-white flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lanjut Layar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Game Screen Frame */}
              {screens[activeScreenIndex] && (
                <div
                  className={`mx-auto rounded-3xl border-4 border-amber-300 bg-gradient-to-br from-amber-950 via-slate-900 to-amber-900 text-white p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden transition-all ${
                    layout === 'landscape' ? 'w-full max-w-4xl aspect-[16/9]' : 'w-full max-w-md aspect-[9/16]'
                  }`}
                >
                  {/* Top Bar of Game */}
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs">
                      {screens[activeScreenIndex].subtopicTitle}
                    </span>
                    <span className="text-[11px] text-amber-200">
                      Gaya: {currentVisualStyle.name}
                    </span>
                  </div>

                  {/* Center Content */}
                  <div className="text-center space-y-4 z-10 px-4 my-auto">
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-wide">
                      {screens[activeScreenIndex].questionText}
                    </h3>

                    {/* Maskot badge if present */}
                    {mascotOption !== 'none' && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30">
                        <span>🦉 {mascotName}: {mascotDesc.slice(0, 50)}...</span>
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
                      {screens[activeScreenIndex].illustrationDetail}
                    </p>

                    {/* Interactive Answer Options */}
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      {screens[activeScreenIndex].options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => {
                            setSelectedAnswerIndex(oIdx);
                            if (onNotify) {
                              if (opt.isCorrect) {
                                onNotify('Hebat! Jawabanmu benar! ★★★', 'success');
                              } else {
                                onNotify('Ayo coba lagi, kamu pasti bisa!', 'info');
                              }
                            }
                          }}
                          className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer ${
                            selectedAnswerIndex === oIdx
                              ? opt.isCorrect
                                ? 'bg-emerald-500 text-white scale-105 ring-4 ring-emerald-300'
                                : 'bg-rose-500 text-white scale-105 ring-4 ring-rose-300'
                              : 'bg-white text-slate-900 hover:bg-amber-100 hover:scale-102'
                          }`}
                        >
                          {opt.label ? `${opt.label}: ` : ''}{opt.text}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="flex items-center justify-between text-[11px] text-amber-200/80 z-10 pt-2 border-t border-white/10">
                    <span>EduSmart Game Studio</span>
                    <span>1920x1080 · 8K 300 DPI</span>
                  </div>
                </div>
              )}

              {/* Active Screen Prompt Text */}
              {generatedPrompts[activeScreenIndex] && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      Prompt untuk Layar Ini ({screens[activeScreenIndex].subtopicTitle}):
                    </span>
                    <button
                      onClick={() =>
                        handleCopyPrompt(
                          generatedPrompts[activeScreenIndex].promptText,
                          activeScreenIndex
                        )
                      }
                      className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Prompt Ini</span>
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-950 text-slate-200 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto border border-slate-800">
                    {generatedPrompts[activeScreenIndex].promptText}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 3: FULL RAW TEXT */}
          {viewMode === 'raw' && (
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Full Raw Text ({screens.length} Layar Lengkap)
                </span>
                <button
                  onClick={handleCopyAll}
                  className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Semua Teks</span>
                </button>
              </div>

              <textarea
                readOnly
                rows={18}
                value={generatedPrompts.map((p) => p.promptText).join('\n\n=========================================\n\n')}
                className="w-full p-4 bg-slate-950 text-slate-200 rounded-2xl text-xs font-mono leading-relaxed focus:outline-none selection:bg-amber-500 selection:text-white"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
