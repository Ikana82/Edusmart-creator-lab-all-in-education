import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Sparkles,
  Layers,
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
  ChevronDown,
  Monitor,
  Smartphone,
  Eye,
  Settings,
  HelpCircle,
  FolderDown,
  CheckCircle2,
  FileCheck,
  Edit2,
  ExternalLink
} from 'lucide-react';
import {
  VISUAL_STYLES,
  AGE_GROUPS,
  PRESET_TOPICS,
  VisualStyleOption,
  AgeGroupOption,
  SlideTemplateItem,
  buildDefault20SlideStructure,
  generateStructuredSlidePrompt
} from '../../data/mediaPembelajaranData';

interface MediaPembelajaranGeneratorProps {
  onBack: () => void;
  onSaveToSavedProjects?: () => void;
  onNotify?: (msg: string, type: 'success' | 'info' | 'error') => void;
}

export const MediaPembelajaranGenerator: React.FC<MediaPembelajaranGeneratorProps> = ({
  onBack,
  onSaveToSavedProjects,
  onNotify
}) => {
  // Wizard current step: 1 through 8, or 'result'
  const [currentStep, setCurrentStep] = useState<number | 'result'>(1);

  // STEP 1: Topik / Judul & Upload Dokumen
  const [topic, setTopic] = useState('Ekosistem');
  const [customDescription, setCustomDescription] = useState('Mengenal hubungan timbal balik antara makhluk hidup dan lingkungannya');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  // STEP 2: Target Usia
  const [selectedAgeId, setSelectedAgeId] = useState('sd-rendah');

  // STEP 3: Struktur Halaman (Default 20 Halaman)
  const [slides, setSlides] = useState<SlideTemplateItem[]>(() =>
    PRESET_TOPICS[0].slides
  );
  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlidePurpose, setNewSlidePurpose] = useState('');

  // STEP 4: Orientasi Layar (Layout)
  const [layout, setLayout] = useState<'landscape' | 'portrait'>('landscape');

  // STEP 5: Gaya Visual
  const [selectedStyleId, setSelectedStyleId] = useState('flat-cartoon');
  const [styleCategoryFilter, setStyleCategoryFilter] = useState<string>('all');

  // STEP 6: Bahasa Narasi
  const [language, setLanguage] = useState<'id' | 'en' | 'bilingual'>('id');

  // STEP 7: Karakter Maskot
  const [mascotOption, setMascotOption] = useState<'none' | 'ai' | 'custom' | 'upload'>('ai');
  const [customMascotDesc, setCustomMascotDesc] = useState('Penjelajah alam cilik berbaju safari hijau yang ceria membawa kaca pembesar');
  const [uploadedMascotImage, setUploadedMascotImage] = useState<string | null>(null);

  // Generation & View State
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [copiedSlideIndex, setCopiedSlideIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [filterBatch, setFilterBatch] = useState<'all' | '1-5' | '6-10' | '11-15' | '16-20'>('all');
  const [activeTabPrompt, setActiveTabPrompt] = useState<'cards' | 'code' | 'deck'>('cards');
  const [isGenerating, setIsGenerating] = useState(false);

  // Selected Object references
  const currentAgeGroup = useMemo(() => {
    return AGE_GROUPS.find((a) => a.id === selectedAgeId) || AGE_GROUPS[1];
  }, [selectedAgeId]);

  const currentVisualStyle = useMemo(() => {
    return VISUAL_STYLES.find((s) => s.id === selectedStyleId) || VISUAL_STYLES[6];
  }, [selectedStyleId]);

  // Generated Prompts for all slides
  const generatedSlidePrompts = useMemo(() => {
    return slides.map((slide, index) => {
      const prompt = generateStructuredSlidePrompt(
        { ...slide, stepNumber: index + 1 },
        {
          topic,
          ageGroup: currentAgeGroup,
          layout,
          visualStyle: currentVisualStyle,
          language,
          mascotOption,
          customMascotDesc
        }
      );

      return {
        slideNumber: index + 1,
        slideTitle: slide.title,
        slideType: slide.slideType,
        purpose: slide.purpose,
        promptText: prompt
      };
    });
  }, [slides, topic, currentAgeGroup, layout, currentVisualStyle, language, mascotOption, customMascotDesc]);

  // Filtered slide list for output
  const displayedPrompts = useMemo(() => {
    if (filterBatch === '1-5') return generatedSlidePrompts.slice(0, 5);
    if (filterBatch === '6-10') return generatedSlidePrompts.slice(5, 10);
    if (filterBatch === '11-15') return generatedSlidePrompts.slice(10, 15);
    if (filterBatch === '16-20') return generatedSlidePrompts.slice(15, 20);
    return generatedSlidePrompts;
  }, [generatedSlidePrompts, filterBatch]);

  // Handler to load Preset
  const handleSelectPreset = (preset: typeof PRESET_TOPICS[0]) => {
    setTopic(preset.title);
    setSelectedAgeId(preset.defaultAgeId);
    setSelectedStyleId(preset.defaultStyleId);
    setMascotOption('ai');
    setCustomMascotDesc(preset.defaultMascot);
    setSlides(preset.slides);
    if (onNotify) onNotify(`Preset "${preset.title}" berhasil dimuat!`, 'success');
  };

  // Handler to reset structure to 20 slides
  const handleResetToStandard20 = () => {
    const std = buildDefault20SlideStructure(topic, currentAgeGroup.range);
    setSlides(std);
    if (onNotify) onNotify('Struktur 20 halaman standar berhasil diterapkan!', 'info');
  };

  // Handler to add custom slide
  const handleAddSlide = () => {
    if (!newSlideTitle.trim()) return;
    const newSlide: SlideTemplateItem = {
      id: `custom_${Date.now()}`,
      stepNumber: slides.length + 1,
      slideType: 'materi',
      title: newSlideTitle.trim(),
      purpose: newSlidePurpose.trim() || `Penjelasan materi tentang ${newSlideTitle.trim()}`
    };
    setSlides([...slides, newSlide]);
    setNewSlideTitle('');
    setNewSlidePurpose('');
    if (onNotify) onNotify(`Halaman "${newSlide.title}" ditambahkan!`, 'success');
  };

  // Handler to remove slide
  const handleRemoveSlide = (id: string) => {
    if (slides.length <= 1) {
      if (onNotify) onNotify('Presentasi minimal membutuhkan 1 halaman!', 'error');
      return;
    }
    const updated = slides.filter((s) => s.id !== id).map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    setSlides(updated);
  };

  // Handler to move slide up/down
  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === slides.length - 1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const copy = [...slides];
    const temp = copy[index];
    copy[index] = copy[newIndex];
    copy[newIndex] = temp;

    const renumbered = copy.map((s, idx) => ({ ...s, stepNumber: idx + 1 }));
    setSlides(renumbered);
  };

  // Handler to simulate document upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      // Auto infer topic if name looks like something
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setTopic(cleanName);
      if (onNotify) onNotify(`Dokumen "${file.name}" berhasil diunggah! AI mengekstrak materi.`, 'success');
    }
  };

  // Mascot file upload simulation
  const handleMascotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setUploadedMascotImage(url);
      setCustomMascotDesc(`Maskot kustom berdasarkan referensi gambar "${file.name}"`);
      if (onNotify) onNotify('Gambar referensi maskot berhasil diunggah!', 'success');
    }
  };

  // Copy single prompt
  const handleCopyPrompt = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSlideIndex(index);
    setTimeout(() => setCopiedSlideIndex(null), 2000);
    if (onNotify) onNotify(`Prompt Halaman ${index + 1} disalin ke clipboard!`, 'success');
  };

  // Copy all prompts
  const handleCopyAllPrompts = () => {
    const allText = generatedSlidePrompts
      .map((p) => p.promptText)
      .join('\n\n=========================================\n\n');
    navigator.clipboard.writeText(allText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
    if (onNotify) onNotify(`Semua ${generatedSlidePrompts.length} prompt berhasil disalin!`, 'success');
  };

  // Download all as .txt
  const handleDownloadTxt = () => {
    const allText = `# MEDIA PEMBELAJARAN INTERAKTIF: ${topic.toUpperCase()}
Target Usia: ${currentAgeGroup.label} (${currentAgeGroup.range})
Format Layout: ${layout === 'landscape' ? 'Landscape (1920x1080 px)' : 'Portrait (1080x1920 px)'}
Gaya Visual: ${currentVisualStyle.name}
Bahasa: ${language.toUpperCase()}
Total Halaman: ${slides.length} Halaman
Dihasilkan oleh: EduSmart Creator Lab · Media Pembelajaran Studio

=======================================================
PROMPT SLIDE PRESENTASI (1 SAMPAI ${slides.length})
=======================================================

${generatedSlidePrompts.map((p) => p.promptText).join('\n\n-------------------------------------------------------\n\n')}
`;
    const blob = new Blob([allText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Prompt_Media_Pembelajaran_${topic.replace(/\s+/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    if (onNotify) onNotify('File prompt .txt berhasil diunduh!', 'success');
  };

  // Trigger Generation to Result View
  const handleGenerateFinalPrompts = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setCurrentStep('result');
      if (onNotify) onNotify('Seluruh prompt slide berhasil digenerate!', 'success');
    }, 600);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Header Bar */}
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
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Studio Media Pembelajaran
              </span>
              <span className="text-xs text-slate-400 font-mono">8-Step Interactive Wizard</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900 mt-0.5">
              Generator Prompt Slide Media Pembelajaran
            </h1>
          </div>
        </div>

        {/* Step indicator breadcrumbs */}
        {currentStep !== 'result' && (
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <button
                key={s}
                onClick={() => setCurrentStep(s)}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                  currentStep === s
                    ? 'bg-indigo-600 text-white shadow-xs scale-105'
                    : currentStep > s
                    ? 'bg-indigo-100 text-indigo-700'
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
            onClick={() => setCurrentStep(8)}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Kembali ke Konfigurasi</span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* STEP 1: JUDUL ATAU TOPIK PRESENTASI */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  STEP 1: Judul atau Topik Presentasi
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Presentasi ini mau membahas judul atau topik apa? Kamu boleh ketik bebas, memilih preset cepat, atau upload dokumen materi (Word/PDF/PPT) yang mau dijadikan dasar presentasinya.
                </p>
              </div>
            </div>

            {/* Topic Input Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Topik / Judul Materi
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Contoh: Ekosistem, Siklus Air, Fotosintesis, Tata Surya..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              />
            </div>

            {/* Custom Description or Learning Objective */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Deskripsi Tambahan / Poin Kunci Materi
              </label>
              <textarea
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                rows={2}
                placeholder="Tuliskan poin penting yang ingin ditekankan, atau biarkan AI merangkum secara otomatis..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
              />
            </div>

            {/* Preset Topics Quick Pick */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500">Pilih Preset Topik Populer:</span>
              <div className="flex flex-wrap gap-2">
                {PRESET_TOPICS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                      topic === preset.title
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-2xs font-bold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    ★ {preset.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Document Upload Area */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-400 bg-slate-50/60 transition-colors">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
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
                  <FileText className="w-4 h-4 text-indigo-600" />
                  <span>{uploadedFileName ? 'Ganti File' : 'Pilih File Dokumen'}</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {uploadedFileName && (
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Dokumen aktif: {uploadedFileName}</span>
                </div>
              )}
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                onClick={() => setCurrentStep(2)}
                disabled={!topic.trim()}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke STEP 2: Target Usia</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: TARGET USIA */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  STEP 2: Target Usia Peserta Didik
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Target usia untuk presentasi ini adalah? Silakan pilih dari 6 opsi di bawah. AI akan menyesuaikan kompleksitas bahasa, istilah, dan elemen visual slide.
                </p>
              </div>
            </div>

            {/* Age Group Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {AGE_GROUPS.map((age) => {
                const isSelected = selectedAgeId === age.id;
                return (
                  <button
                    key={age.id}
                    onClick={() => setSelectedAgeId(age.id)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-700 bg-white px-2 py-0.5 rounded-md border border-indigo-100">
                          {age.range}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 pt-1">{age.label}</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                        {age.pedagogicalFocus}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 font-medium">
                      Fokus: {age.suggestedComplexity}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
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
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke STEP 3: Struktur Halaman</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: STRUKTUR HALAMAN (STANDAR 20 HALAMAN & CUSTOM) */}
      {/* ========================================================================= */}
      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    STEP 3: Struktur Halaman Presentasi
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Berikut adalah struktur halaman standar untuk topik <strong>"{topic}"</strong> ({currentAgeGroup.label}). Total <strong>{slides.length} Halaman</strong>. Kamu bisa memakai struktur standar ini atau menambah, menghapus, dan mengubah urutan halaman.
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetToStandard20}
                className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl border border-indigo-200 transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset 20 Halaman Standar</span>
              </button>
            </div>

            {/* List of Slides */}
            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-bold text-slate-900">{s.title}</h4>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 text-slate-700 font-mono capitalize">
                          {s.slideType.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{s.purpose}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleMoveSlide(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-white cursor-pointer"
                      title="Pindah Naik"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => handleMoveSlide(idx, 'down')}
                      disabled={idx === slides.length - 1}
                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30 rounded hover:bg-white cursor-pointer"
                      title="Pindah Turun"
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => handleRemoveSlide(s.id)}
                      className="p-1 text-rose-500 hover:text-rose-700 rounded hover:bg-rose-50 cursor-pointer"
                      title="Hapus Halaman"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Slide form */}
            <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-100 space-y-3">
              <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-indigo-600" />
                Tambah Halaman Baru (Opsional)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Judul Halaman (cth: Materi Khusus)"
                  value={newSlideTitle}
                  onChange={(e) => setNewSlideTitle(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-600 sm:col-span-1"
                />
                <input
                  type="text"
                  placeholder="Deskripsi materi / tujuan halaman"
                  value={newSlidePurpose}
                  onChange={(e) => setNewSlidePurpose(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-indigo-600 sm:col-span-1"
                />
                <button
                  onClick={handleAddSlide}
                  disabled={!newSlideTitle.trim()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  + Tambahkan ke Slide
                </button>
              </div>
            </div>

            {/* Navigation buttons */}
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
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke STEP 4: Orientasi Layar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 4: ORIENTASI LAYAR (LAYOUT) */}
      {/* ========================================================================= */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  STEP 4: Orientasi Layar (Layout)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Pilih orientasi layar (layout) untuk slide presentasi ini. Sesuai target media penayangan:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Landscape 16:9 */}
              <button
                onClick={() => setLayout('landscape')}
                className={`p-6 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  layout === 'landscape'
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-indigo-700 border border-indigo-200 font-mono">
                      16:9 Aspect Ratio
                    </span>
                    {layout === 'landscape' && <Check className="w-5 h-5 text-indigo-600" />}
                  </div>

                  {/* Visual mockup icon */}
                  <div className="w-full h-32 rounded-xl bg-white border border-slate-200 flex flex-col justify-between p-3 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="h-2 w-20 bg-slate-200 rounded" />
                      <div className="h-2 w-8 bg-indigo-200 rounded" />
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Monitor className="w-8 h-8 text-indigo-500" />
                      <div className="space-y-1">
                        <div className="h-2 w-24 bg-slate-200 rounded" />
                        <div className="h-1.5 w-16 bg-slate-100 rounded" />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="h-2 w-16 bg-indigo-300 rounded-full" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">Landscape (1920 x 1080 px)</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Sangat direkomendasikan untuk presentasi kelas di layar proyektor, Smart TV, laptop, Google Slides, Canva, dan PowerPoint.
                    </p>
                  </div>
                </div>
              </button>

              {/* Portrait 9:16 */}
              <button
                onClick={() => setLayout('portrait')}
                className={`p-6 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  layout === 'portrait'
                    ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-indigo-700 border border-indigo-200 font-mono">
                      9:16 Aspect Ratio
                    </span>
                    {layout === 'portrait' && <Check className="w-5 h-5 text-indigo-600" />}
                  </div>

                  {/* Visual mockup icon */}
                  <div className="w-full h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 shadow-2xs">
                    <div className="w-20 h-28 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between p-1.5">
                      <div className="h-1 w-8 bg-slate-200 rounded" />
                      <div className="flex justify-center">
                        <Smartphone className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div className="h-1 w-10 bg-indigo-200 rounded-full self-center" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900">Portrait (1080 x 1920 px)</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Ideal untuk media pembelajaran seluler, micro-learning di smartphone, carousel edukasi, TikTok, Instagram Reels, dan YouTube Shorts.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {/* Navigation buttons */}
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
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke STEP 5: Gaya Visual</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 5: GAYA VISUAL (14 PILIHAN VISUAL STYLE) */}
      {/* ========================================================================= */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">
                  5
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    STEP 5: Silakan Pilih Gaya Visual (Visual Style)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Pilih 1 dari 14 gaya visual yang ingin diterapkan pada seluruh slide presentasi:
                  </p>
                </div>
              </div>
            </div>

            {/* Category filter tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {['all', '3D', '2D & Vector', 'Artistic & Traditional', 'Anime & Cute'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setStyleCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    styleCategoryFilter === cat
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'Semua Style (14)' : cat}
                </button>
              ))}
            </div>

            {/* 14 Styles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {VISUAL_STYLES.filter(
                (s) => styleCategoryFilter === 'all' || s.category === styleCategoryFilter
              ).map((style) => {
                const isSelected = selectedStyleId === style.id;
                return (
                  <button
                    key={style.id}
                    onClick={() => setSelectedStyleId(style.id)}
                    className={`p-4 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div
                          className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${style.bgGradient} flex items-center justify-center text-white text-xs font-bold shadow-2xs`}
                        >
                          ✦
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 pt-1">
                        {style.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-3">
                        {style.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-mono truncate">
                      tag: {style.promptModifier.split(',')[0]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
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
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke STEP 6: Bahasa Narasi</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 6: BAHASA NARASI */}
      {/* ========================================================================= */}
      {currentStep === 6 && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">
                6
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  STEP 6: Silakan Pilih Bahasa Narasi yang Digunakan
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Bahasa yang akan digunakan untuk judul slide, konten teks edukasi, label tombol interaktif, dan kuis:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  id: 'id',
                  title: 'Bahasa Indonesia',
                  desc: 'Judul, konten narasi, teks tombol, dan instruksi penuh dalam Bahasa Indonesia komunikatif ramah anak.',
                  tag: 'Populer · Kurikulum Merdeka'
                },
                {
                  id: 'en',
                  title: 'English',
                  desc: 'Full English presentation slides, titles, interactive buttons, and educational quiz vocabulary.',
                  tag: 'Bilingual / Cambridge'
                },
                {
                  id: 'bilingual',
                  title: 'Dwibahasa (Indonesia & English)',
                  desc: 'Teks utama dalam Bahasa Indonesia disertai terjemahan subtitle bahasa Inggris untuk pengayaan kosakata.',
                  tag: 'Dwibahasa Efektif'
                }
              ].map((lang) => {
                const isSelected = language === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id as any)}
                    className={`p-5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-500/20'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-indigo-700 border border-indigo-100">
                          {lang.tag}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 pt-1">{lang.title}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{lang.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
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
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke STEP 7: Karakter Maskot</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 7: KARAKTER MASKOT */}
      {/* ========================================================================= */}
      {currentStep === 7 && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">
                7
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  STEP 7: Apakah Kamu Ingin Menggunakan Karakter Maskot?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Maskot membuat presentasi lebih hidup, ramah, dan memandu perhatian siswa di setiap slide. Silakan pilih dari opsi berikut:
                </p>
              </div>
            </div>

            {/* Mascot Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: AI Auto Design */}
              <button
                onClick={() => setMascotOption('ai')}
                className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                  mascotOption === 'ai'
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">✨</span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Biarkan AI Merancang Maskot
                    </h4>
                  </div>
                  {mascotOption === 'ai' && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  AI akan otomatis menciptakan maskot tematik yang ramah, serasi dengan topik "{topic}", target usia {currentAgeGroup.range}, dan gaya visual {currentVisualStyle.name}.
                </p>
              </button>

              {/* Option 2: Custom Description */}
              <button
                onClick={() => setMascotOption('custom')}
                className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                  mascotOption === 'custom'
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">✍️</span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Deskripsikan Maskot Sendiri
                    </h4>
                  </div>
                  {mascotOption === 'custom' && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Tuliskan ciri khas, busana, aksesori, dan kepribadian karakter maskot idamanmu. AI akan menyusun tag prompt visual sesuai deskripsi.
                </p>
              </button>

              {/* Option 3: Upload Image Reference */}
              <button
                onClick={() => setMascotOption('upload')}
                className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                  mascotOption === 'upload'
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🖼️</span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Upload Gambar Referensi Maskot
                    </h4>
                  </div>
                  {mascotOption === 'upload' && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Unggah file gambar maskot sekolah atau yayasan Anda untuk dipertahankan ciri visualnya ke dalam prompt image generator.
                </p>
              </button>

              {/* Option 4: Tanpa Maskot */}
              <button
                onClick={() => setMascotOption('none')}
                className={`p-5 rounded-2xl text-left border transition-all cursor-pointer ${
                  mascotOption === 'none'
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🚫</span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Tanpa Maskot
                    </h4>
                  </div>
                  {mascotOption === 'none' && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  Presentasi murni fokus pada ilustrasi sains, infografis diagram, objek konkret, dan tata letak minimalis tanpa karakter figur utama.
                </p>
              </button>
            </div>

            {/* Custom Mascot text area if custom or upload selected */}
            {(mascotOption === 'custom' || mascotOption === 'ai') && (
              <div className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Deskripsi Visual Maskot</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {mascotOption === 'ai' ? 'Rancangan AI Otomatis (Dapat Diedit)' : 'Ketik detail maskot'}
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={customMascotDesc}
                  onChange={(e) => setCustomMascotDesc(e.target.value)}
                  placeholder="Contoh: Penjelajah alam cilik berbaju safari hijau yang ceria, membawa kaca pembesar dan tas ransel petualang..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-600"
                />
              </div>
            )}

            {mascotOption === 'upload' && (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <label className="text-xs font-bold text-slate-700">Unggah Gambar Karakter Maskot</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMascotUpload}
                  className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {uploadedMascotImage && (
                  <div className="flex items-center gap-3">
                    <img
                      src={uploadedMascotImage}
                      alt="Uploaded mascot"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                    />
                    <span className="text-xs font-semibold text-emerald-700">
                      Gambar referensi maskot siap disertakan dalam instruksi prompt!
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons */}
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
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Lanjut ke STEP 8: Ringkasan & Konfirmasi</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 8: RINGKASAN & KONFIRMASI */}
      {/* ========================================================================= */}
      {currentStep === 8 && (
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold flex items-center justify-center shrink-0">
                8
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  STEP 8: Berikut Adalah Ringkasan untuk Presentasimu
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Periksa seluruh data konfigurasi di bawah ini. Apakah semua informasi sudah benar?
                </p>
              </div>
            </div>

            {/* Structured Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Judul / Topik:</span>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-[11px] text-indigo-600 hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>
                <h3 className="text-base font-bold text-slate-900">{topic}</h3>
                {customDescription && (
                  <p className="text-xs text-slate-600 italic">"{customDescription}"</p>
                )}
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Target Usia:</span>
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-[11px] text-indigo-600 hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                    {currentAgeGroup.range}
                  </span>
                  <span className="text-sm font-bold text-slate-900">{currentAgeGroup.label}</span>
                </div>
                <p className="text-xs text-slate-500">{currentAgeGroup.suggestedComplexity}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Struktur Halaman:</span>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="text-[11px] text-indigo-600 hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {slides.length} Halaman
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {slides.map((s) => s.title).join(', ')}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Layout Orientasi:</span>
                  <button
                    onClick={() => setCurrentStep(4)}
                    className="text-[11px] text-indigo-600 hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {layout === 'landscape' ? 'Landscape (1920 x 1080 px) · 16:9' : 'Portrait (1080 x 1920 px) · 9:16'}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Gaya Visual (Visual Style):</span>
                  <button
                    onClick={() => setCurrentStep(5)}
                    className="text-[11px] text-indigo-600 hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-500" />
                  <span className="text-sm font-bold text-slate-900">{currentVisualStyle.name}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">{currentVisualStyle.description}</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Bahasa & Karakter Maskot:</span>
                  <button
                    onClick={() => setCurrentStep(7)}
                    className="text-[11px] text-indigo-600 hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  Bahasa: {language === 'id' ? 'Bahasa Indonesia' : language === 'en' ? 'English' : 'Dwibahasa'}
                </div>
                <div className="text-xs text-slate-600">
                  Maskot:{' '}
                  {mascotOption === 'none'
                    ? 'Tanpa Maskot'
                    : mascotOption === 'ai'
                    ? `Dirancang oleh AI (${customMascotDesc})`
                    : customMascotDesc}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-5 bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">Semua Informasi Sudah Benar?</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Klik tombol di samping untuk langsung menghasilkan format prompt teks siap salin untuk Halaman 1 sampai {slides.length}.
                </p>
              </div>
              <button
                onClick={handleGenerateFinalPrompts}
                disabled={isGenerating}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Menyusun Prompt Slide...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Ya, Generate Prompt Slide ({slides.length} Halaman)!</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FINAL RESULT VIEW: PROMPT GENERATION OUTPUT & SLIDE DECK VIEWER */}
      {/* ========================================================================= */}
      {currentStep === 'result' && (
        <div className="space-y-6">
          {/* Success Banner */}
          <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white shadow-lg border border-indigo-500/20 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Prompt Siap Pakai · {slides.length} Slide Selesai Digenerate</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                Prompt Slide Media Pembelajaran: {topic}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Berikut adalah prompt untuk <strong>Halaman 1 sampai {slides.length}</strong>. Silakan salin prompt ini jika kamu ingin menggunakan AI Image Generator (Midjourney, DALL-E 3, Ideogram, atau Leonardo AI).
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-white/10 text-slate-200">
                  {layout === 'landscape' ? '16:9 Landscape' : '9:16 Portrait'}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-slate-200">
                  {currentVisualStyle.name}
                </span>
                <span className="px-2 py-0.5 rounded bg-white/10 text-slate-200">
                  {currentAgeGroup.label}
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap sm:flex-col items-stretch gap-2 shrink-0">
              <button
                onClick={handleCopyAllPrompts}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copiedAll ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedAll ? 'Semua Tersalin!' : `Salin Semua Prompt (${slides.length})`}</span>
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

          {/* Batch Selector & View Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
            {/* Batch buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-bold text-slate-400 mr-1">Tampilkan:</span>
              {[
                { id: 'all', label: `Semua (${slides.length})` },
                { id: '1-5', label: 'Halaman 1–5' },
                { id: '6-10', label: 'Halaman 6–10' },
                { id: '11-15', label: 'Halaman 11–15' },
                { id: '16-20', label: 'Halaman 16–20' }
              ].map((batch) => (
                <button
                  key={batch.id}
                  onClick={() => setFilterBatch(batch.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    filterBatch === batch.id
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {batch.label}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setActiveTabPrompt('cards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTabPrompt === 'cards'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Kartu Slide
              </button>
              <button
                onClick={() => setActiveTabPrompt('deck')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTabPrompt === 'deck'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Slide Deck Viewer
              </button>
              <button
                onClick={() => setActiveTabPrompt('code')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  activeTabPrompt === 'code'
                    ? 'bg-white text-indigo-700 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Full Raw Text
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: INDIVIDUAL PROMPT CARDS */}
          {activeTabPrompt === 'cards' && (
            <div className="space-y-4">
              {displayedPrompts.map((slidePrompt, index) => {
                const actualIndex = slidePrompt.slideNumber - 1;
                const isCopied = copiedSlideIndex === actualIndex;

                return (
                  <div
                    key={slidePrompt.slideNumber}
                    className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 hover:border-indigo-300 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {slidePrompt.slideNumber}
                        </span>
                        <div>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900">
                            Prompt Halaman {slidePrompt.slideNumber}: {slidePrompt.slideTitle}
                          </h3>
                          <span className="text-[11px] text-slate-400 capitalize">
                            Tipe: {slidePrompt.slideType.replace('_', ' ')} · {layout}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCopyPrompt(slidePrompt.promptText, actualIndex)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                          isCopied
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Tersalin ke Clipboard!' : 'Salin Prompt Halaman Ini'}</span>
                      </button>
                    </div>

                    {/* Preformatted Prompt Content Block */}
                    <div className="relative">
                      <pre className="p-4 bg-slate-950 text-slate-200 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-indigo-500 selection:text-white border border-slate-800">
                        {slidePrompt.promptText}
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW MODE 2: INTERACTIVE SLIDE DECK VIEWER */}
          {activeTabPrompt === 'deck' && (
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
              {/* Slide Navigation Thumbnails */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Pilih Slide:</span>
                  <span className="text-xs font-bold text-indigo-600">
                    Slide {activeSlideIndex + 1} dari {slides.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveSlideIndex(Math.max(0, activeSlideIndex - 1))}
                    disabled={activeSlideIndex === 0}
                    className="p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-30 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveSlideIndex(Math.min(slides.length - 1, activeSlideIndex + 1))}
                    disabled={activeSlideIndex === slides.length - 1}
                    className="p-1.5 text-slate-500 hover:text-slate-800 disabled:opacity-30 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                {generatedSlidePrompts.map((sp, idx) => (
                  <button
                    key={sp.slideNumber}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      activeSlideIndex === idx
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Slide {sp.slideNumber}
                  </button>
                ))}
              </div>

              {/* Deck Slide Preview Visual Card */}
              {generatedSlidePrompts[activeSlideIndex] && (
                <div className="space-y-4">
                  <div
                    className={`mx-auto rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 shadow-xl flex flex-col justify-between relative overflow-hidden transition-all ${
                      layout === 'landscape' ? 'w-full max-w-4xl aspect-[16/9]' : 'w-full max-w-md aspect-[9/16]'
                    }`}
                  >
                    {/* Top slide header */}
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-xs font-mono">
                        SLIDE {activeSlideIndex + 1} / {slides.length} · {currentVisualStyle.name}
                      </span>
                      <span className="text-[10px] text-slate-300">
                        {topic} · {currentAgeGroup.label}
                      </span>
                    </div>

                    {/* Middle preview content */}
                    <div className="text-center space-y-3 z-10 px-4">
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white tracking-wide">
                        {generatedSlidePrompts[activeSlideIndex].slideTitle}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
                        {generatedSlidePrompts[activeSlideIndex].purpose}
                      </p>
                      {mascotOption !== 'none' && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
                          <span>🐾 Maskot: {customMascotDesc.split(',')[0]}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom slide footer nav */}
                    <div className="flex items-center justify-between text-[11px] text-slate-300 z-10 pt-2 border-t border-white/10">
                      <span>EduSmart Creator Lab</span>
                      <div className="px-4 py-1.5 rounded-full bg-white text-indigo-950 font-bold text-xs shadow-xs">
                        Interaktif
                      </div>
                      <span>300 DPI · 8K</span>
                    </div>
                  </div>

                  {/* Copy Prompt for Active Slide */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-500">
                      Prompt untuk AI Image Generator (Midjourney / DALL-E / Ideogram)
                    </span>
                    <button
                      onClick={() =>
                        handleCopyPrompt(
                          generatedSlidePrompts[activeSlideIndex].promptText,
                          activeSlideIndex
                        )
                      }
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedSlideIndex === activeSlideIndex ? (
                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {copiedSlideIndex === activeSlideIndex
                          ? 'Prompt Tersalin!'
                          : `Salin Prompt Slide ${activeSlideIndex + 1}`}
                      </span>
                    </button>
                  </div>

                  <pre className="p-4 bg-slate-950 text-slate-200 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto border border-slate-800">
                    {generatedSlidePrompts[activeSlideIndex].promptText}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 3: FULL RAW TEXT */}
          {activeTabPrompt === 'code' && (
            <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Full Raw Text ({slides.length} Halaman Lengkap)
                </span>
                <button
                  onClick={handleCopyAllPrompts}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Semua Teks</span>
                </button>
              </div>

              <textarea
                readOnly
                rows={18}
                value={generatedSlidePrompts
                  .map((p) => p.promptText)
                  .join('\n\n=========================================\n\n')}
                className="w-full p-4 bg-slate-950 text-slate-200 rounded-2xl text-xs font-mono leading-relaxed focus:outline-none selection:bg-indigo-500 selection:text-white"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
