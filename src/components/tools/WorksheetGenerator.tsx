import React, { useState, useMemo } from 'react';
import {
  worksheetCategoriesKnowledge,
  WorksheetCategoryKnowledge,
  WorksheetSubcategoryKnowledge,
  getRecommendedWorksheets
} from '../../data/worksheetCategoriesKnowledge';
import { WorksheetA4Canvas, GeneratedWorksheetData } from './WorksheetA4Canvas';
import {
  FileText,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  CheckCircle2,
  Check,
  Palette,
  PenTool,
  Calculator,
  GitCommit,
  Scissors,
  Eye,
  Compass,
  Code,
  BookOpen,
  Bookmark,
  Shapes,
  FlaskConical,
  Moon,
  Printer,
  Sliders,
  HelpCircle,
  Lightbulb,
  Layers
} from 'lucide-react';

interface WorksheetGeneratorProps {
  onBack: () => void;
  onSaveToSavedProjects?: (project: any) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
  onOpenA4PromptStudio?: (cat?: any) => void;
  initialCategoryId?: string;
}

export const WorksheetGenerator: React.FC<WorksheetGeneratorProps> = ({
  onBack,
  onNotify,
  onOpenA4PromptStudio,
  initialCategoryId
}) => {
  // Wizard steps: 1 to 7
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Configuration States
  const [selectedCatId, setSelectedCatId] = useState<string>(initialCategoryId || 'coding');
  const [selectedSubId, setSelectedSubId] = useState<string>('');
  const [level, setLevel] = useState<string>('TK (Usia 5-6 tahun)');
  const [theme, setTheme] = useState<string>('Hewan Nusantara');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [itemCount, setItemCount] = useState<number>(5);
  const [difficulty, setDifficulty] = useState<'Mudah' | 'Sedang' | 'Tantangan'>('Mudah');
  const [language, setLanguage] = useState<'id' | 'en' | 'bilingual'>('id');
  const [visualStyle, setVisualStyle] = useState<string>('Cute 2D Educational');

  // Generator & Result State
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<GeneratedWorksheetData | null>(null);

  // Recommendation Mode Toggle
  const [useRecommendation, setUseRecommendation] = useState(false);

  // Get current Category and Subcategories
  const currentCategory = useMemo(() => {
    return (
      worksheetCategoriesKnowledge.find((c) => c.id === selectedCatId) ||
      worksheetCategoriesKnowledge[7] // Coding
    );
  }, [selectedCatId]);

  // Set default subcategory when category changes
  React.useEffect(() => {
    if (currentCategory.subcategories.length > 0) {
      const match = currentCategory.subcategories.find((s) => s.id === selectedSubId);
      if (!match) {
        setSelectedSubId(currentCategory.subcategories[0].id);
        setCustomTopic(currentCategory.subcategories[0].defaultTopic);
        setItemCount(currentCategory.subcategories[0].defaultItemCount);
      }
    }
  }, [currentCategory, selectedSubId]);

  const currentSubcategory = useMemo(() => {
    const found = currentCategory.subcategories.find((s) => s.id === selectedSubId);
    return found || currentCategory.subcategories[0];
  }, [currentCategory, selectedSubId]);

  // Recommendations for the current theme / level
  const recommendations = useMemo(() => {
    return getRecommendedWorksheets(theme, level);
  }, [theme, level]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette':
        return Palette;
      case 'PenTool':
        return PenTool;
      case 'Calculator':
        return Calculator;
      case 'GitCommit':
        return GitCommit;
      case 'Scissors':
        return Scissors;
      case 'Eye':
        return Eye;
      case 'Compass':
        return Compass;
      case 'Code':
        return Code;
      case 'BookOpen':
        return BookOpen;
      case 'Bookmark':
        return Bookmark;
      case 'Shapes':
        return Shapes;
      case 'FlaskConical':
        return FlaskConical;
      case 'Moon':
        return Moon;
      default:
        return FileText;
    }
  };

  const handleSelectCategory = (cat: WorksheetCategoryKnowledge) => {
    setSelectedCatId(cat.id);
    setSelectedSubId(cat.subcategories[0].id);
    setCustomTopic(cat.subcategories[0].defaultTopic);
    setItemCount(cat.subcategories[0].defaultItemCount);
  };

  const handleSelectSubcategory = (sub: WorksheetSubcategoryKnowledge) => {
    setSelectedSubId(sub.id);
    setCustomTopic(sub.defaultTopic);
    setItemCount(sub.defaultItemCount);
  };

  const handleSelectRecommendation = (rec: WorksheetSubcategoryKnowledge) => {
    const parentCat = worksheetCategoriesKnowledge.find((c) =>
      c.subcategories.some((s) => s.id === rec.id)
    );
    if (parentCat) {
      setSelectedCatId(parentCat.id);
      setSelectedSubId(rec.id);
      setCustomTopic(rec.defaultTopic);
      setItemCount(rec.defaultItemCount);
      onNotify(`Memilih rekomendasi: ${rec.name}`, 'info');
      setCurrentStep(3); // Jump to next step
    }
  };

  // Generate Final Worksheet
  const handleGenerateWorksheet = () => {
    setIsGenerating(true);
    setCurrentStep(7); // View result

    setTimeout(() => {
      const topicText = customTopic.trim() || currentSubcategory.defaultTopic;
      const isBlackWhite = visualStyle.includes('Black');

      const title =
        language === 'en'
          ? `${currentCategory.englishName} - ${topicText}`
          : currentSubcategory.indonesianHeader.split('/')[0].trim();

      const instruction =
        language === 'en'
          ? `Complete the ${currentSubcategory.name} activity below carefully.`
          : currentSubcategory.indonesianInstruction;

      const midjourneyPrompt = `${currentSubcategory.defaultEnglishPrompt}, topic: "${topicText}", level: "${level}", quantity: ${itemCount} clean problem items, style: "${visualStyle}", aspect ratio standard A4 portrait --ar 1:1.414 --q 2 --v 6.1 --style raw`;

      const dallePrompt = `Ultra-high resolution 4K, 300 DPI printable A4 portrait children's educational worksheet. Title: "${title}". Instruction: "${instruction}". Activity: ${currentSubcategory.focus}. Topic: "${topicText}". Style: ${visualStyle}. Format: 1 page = 1 activity, no random text, clean page-within-a-page layout.`;

      const ideogramPrompt = `Printable A4 portrait educational activity sheet, 300 DPI, 4K vector, typography: "${title}", subtitle: "${instruction}". Details: ${currentSubcategory.rules}. Aesthetic: ${visualStyle}, white background --ar 3:4`;

      setResult({
        category: currentCategory,
        subcategory: currentSubcategory,
        title,
        instruction,
        topic: topicText,
        level,
        itemCount,
        difficulty,
        visualStyle,
        language,
        colorMode: isBlackWhite ? 'bw' : 'color',
        midjourneyPrompt,
        dallePrompt,
        ideogramPrompt
      });

      setIsGenerating(false);
      onNotify('Worksheet A4 berhasil dibuat siap cetak!', 'success');
    }, 700);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Top Header & Shortcuts */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1.5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Tools Hub</span>
        </button>

        <div className="flex items-center gap-2">
          {onOpenA4PromptStudio && (
            <button
              onClick={() => onOpenA4PromptStudio(selectedCatId)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Prompt A4 (300 DPI · 4K)</span>
            </button>
          )}
          <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-lg">
            Langkah {currentStep} dari 7
          </span>
        </div>
      </div>

      {/* Hero Banner EduSmart Worksheet Studio */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white shadow-md border border-indigo-900/40 relative overflow-hidden">
        <div className="max-w-3xl space-y-2 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>EduSmart Worksheet Studio · AI Spesialis PAUD, TK & SD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight">
            Pembuat Lembar Kerja Edukatif Siap Cetak
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Format resmi A4 Portrait (2480 × 3508 px, 300 DPI). Mengikuti aturan ketat: <strong className="text-sky-300">1 Halaman = 1 Jenis Kegiatan</strong>, ramah anak, dan bebas elemen dekorasi berlebihan.
          </p>
        </div>
      </div>

      {/* Step Progress Bar (7 Steps) */}
      <div className="flex items-center justify-between gap-1 border-y border-slate-200 py-3 overflow-x-auto scrollbar-none">
        {[
          { num: 1, label: '1. Kategori' },
          { num: 2, label: '2. Subjenis' },
          { num: 3, label: '3. Jenjang' },
          { num: 4, label: '4. Tema' },
          { num: 5, label: '5. Soal & Bahasa' },
          { num: 6, label: '6. Gaya Visual' },
          { num: 7, label: '7. Hasil Worksheet' }
        ].map((s) => (
          <button
            key={s.num}
            onClick={() => {
              if (s.num <= currentStep || result) setCurrentStep(s.num);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-colors cursor-pointer ${
              currentStep === s.num
                ? 'bg-indigo-600 text-white font-bold shadow-xs'
                : currentStep > s.num
                ? 'text-slate-700 bg-slate-100 hover:bg-slate-200 font-medium'
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================
          STEP 1: 13 MENU UTAMA WORKSHEET
         ======================================================== */}
      {currentStep === 1 && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Langkah 1: Pilih Menu Utama Worksheet (13 Kategori)
              </h2>
              <p className="text-xs text-slate-500">
                Pilih jenis aktivitas utama yang ingin dibuat untuk siswa Anda.
              </p>
            </div>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
              Kategori Terpilih: {currentCategory.name}
            </span>
          </div>

          {/* Grid 13 Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {worksheetCategoriesKnowledge.map((cat) => {
              const Icon = getCategoryIcon(cat.iconName);
              const isSelected = selectedCatId === cat.id;

              return (
                <div
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between group ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cat.colorTheme} text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-mono">
                        #{cat.number}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 font-display mb-1 flex items-center justify-between">
                      <span>{cat.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-medium text-slate-400">
                    <span>{cat.subcategories.length} subjenis</span>
                    <span className="text-indigo-600 font-semibold">{cat.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Subjenis Aktivitas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 2: SUBJENIS / AKTIVITAS + RECOMMENDATION MODE
         ======================================================== */}
      {currentStep === 2 && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                  Kategori: {currentCategory.name}
                </span>
                {selectedCatId === 'coding' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                    12 Subjenis Coding Guide
                  </span>
                )}
              </div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Langkah 2: Tentukan Subjenis / Aktivitas Spesifik
              </h2>
            </div>

            {/* Recommendation Mode Toggle */}
            <button
              onClick={() => setUseRecommendation(!useRecommendation)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                useRecommendation
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>{useRecommendation ? 'Mode Rekomendasi Aktif' : 'Bantuan Rekomendasi'}</span>
            </button>
          </div>

          {/* Recommendation Mode Callout */}
          {useRecommendation && (
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Rekomendasi Aktivitas Paling Relevan untuk Tema: "{theme}" ({level})</span>
              </div>
              <p className="text-[11px] text-amber-800">
                Berdasarkan aturan Knowledge, berikut 4-7 aktivitas yang paling efektif dan sesuai dengan preferensi Anda:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                {recommendations.map((rec) => (
                  <button
                    key={rec.id}
                    onClick={() => handleSelectRecommendation(rec)}
                    className="p-2.5 bg-white border border-amber-200 rounded-xl text-left hover:border-amber-400 hover:shadow-xs transition-all text-xs cursor-pointer"
                  >
                    <div className="font-bold text-slate-800 line-clamp-1">{rec.name}</div>
                    <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{rec.shortDesc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subcategories List for Current Category */}
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
              Pilihan Subkategori Resmi dari Knowledge ({currentCategory.subcategories.length} Format):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentCategory.subcategories.map((sub) => {
                const isSelected = selectedSubId === sub.id;
                return (
                  <div
                    key={sub.id}
                    onClick={() => handleSelectSubcategory(sub)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-2 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 font-display">
                        {sub.name}
                      </h4>
                      {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      {sub.shortDesc}
                    </p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Fokus: {sub.focus.slice(0, 32)}...</span>
                      {sub.hasLegend && (
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                          Ada Legend
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>
            <button
              onClick={() => setCurrentStep(3)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Jenjang / Usia</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 3: JENJANG / USIA
         ======================================================== */}
      {currentStep === 3 && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Langkah 3: Tentukan Jenjang / Usia Siswa
            </h2>
            <p className="text-xs text-slate-500">
              Menyesuaikan ukuran objek, ketebalan garis, dan tingkat kesulitan kognitif anak.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {[
              { id: 'PAUD (Usia 3-4 tahun)', label: 'PAUD (Usia 3-4 tahun)', desc: 'Motorik awal, objek besar dominan, sedikit teks, sensori raba.' },
              { id: 'TK A (Usia 4-5 tahun)', label: 'TK A (Usia 4-5 tahun)', desc: 'Pengenalan pola, tracing sederhana, matching bayangan, counting 1-5.' },
              { id: 'TK B (Usia 5-6 tahun)', label: 'TK B (Usia 5-6 tahun)', desc: 'Persiapan SD, coding unplugged, counting 1-10, alfabet stroke order.' },
              { id: 'SD Kelas 1-2 (7-8 tahun)', label: 'SD Kelas 1-2 (7-8 tahun)', desc: 'Penjumlahan bergambar, susun kata, grid koordinat, sains sederhana.' },
              { id: 'SD Kelas 3-4 (9-10 tahun)', label: 'SD Kelas 3-4 (9-10 tahun)', desc: 'Computational thinking, luas bangun grid, word search, siklus alam.' },
              { id: 'SD Kelas 5-6 (11-12 tahun)', label: 'SD Kelas 5-6 (11-12 tahun)', desc: 'Tantangan logika bertingkat, konversi simbol, tata surya & literasi.' }
            ].map((lvl) => (
              <div
                key={lvl.id}
                onClick={() => setLevel(lvl.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-1.5 ${
                  level === lvl.id
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 font-display">{lvl.label}</span>
                  {level === lvl.id && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{lvl.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>
            <button
              onClick={() => setCurrentStep(4)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Tema / Topik</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 4: TEMA / TOPIK
         ======================================================== */}
      {currentStep === 4 && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Langkah 4: Tentukan Tema & Topik Pembelajaran
            </h2>
            <p className="text-xs text-slate-500">
              Pilih preset tema edukatif atau masukkan topik spesifik yang sedang dipelajari di kelas.
            </p>
          </div>

          {/* Preset Theme Chips */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider">
              Preset Tema Populer Kurikulum:
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                'Hewan Nusantara & Satwa Liar',
                'Buah, Sayur & Makanan Sehat',
                'Diriku & Panca Indra',
                'Lingkungan Rumah & Sekolah',
                'Transportasi & Kendaraan Ceria',
                'Tata Surya & Bintang Antariksa',
                'Dinosaurus Prasejarah',
                'Budi Pekerti & Karakter Mulia',
                'Keluargaku & Profesi Cita-cita'
              ].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTheme(t);
                    setCustomTopic(t);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                    theme === t
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Topic Input */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-900">
              Topik Spesifik atau Objek Worksheet:
            </label>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Contoh: Menulis Kata Kode Warna, Hewan Laut, Pengenalan Huruf B..."
              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
            <p className="text-[11px] text-slate-400">
              Bila dibiarkan kosong, sistem akan menggunakan topik default dari knowledge: "{currentSubcategory.defaultTopic}".
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(3)}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>
            <button
              onClick={() => setCurrentStep(5)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Konfigurasi Soal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 5: JUMLAH SOAL, KESULITAN & BAHASA
         ======================================================== */}
      {currentStep === 5 && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Langkah 5: Tentukan Jumlah Soal, Kesulitan & Bahasa
            </h2>
            <p className="text-xs text-slate-500">
              Sesuai aturan desain Knowledge: 4–10 soal dengan format yang konsisten dan seimbang.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Jumlah Soal (4-10) */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-900">
                Jumlah Soal (4 - 10 soal):
              </label>
              <div className="flex items-center gap-2">
                {[4, 5, 6, 8, 10].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setItemCount(num)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                      itemCount === num
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500">
                Standar PAUD/TK: 4–6 soal agar tidak terlalu padat.
              </p>
            </div>

            {/* Tingkat Kesulitan */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-900">
                Tingkat Kesulitan:
              </label>
              <div className="flex items-center gap-2">
                {(['Mudah', 'Sedang', 'Tantangan'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                      difficulty === d
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500">
                Mudah: visual dominan. Tantangan: logika sekuensial.
              </p>
            </div>

            {/* Bahasa Pengantar */}
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <label className="block text-xs font-bold text-slate-900">
                Bahasa Lembar Kerja:
              </label>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'id', label: 'Indonesia' },
                  { id: 'en', label: 'English' },
                  { id: 'bilingual', label: 'Bilingual' }
                ].map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setLanguage(b.id as any)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-colors cursor-pointer ${
                      language === b.id
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-500">
                Default: Bahasa Indonesia dengan ejaan yang benar.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(4)}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>
            <button
              onClick={() => setCurrentStep(6)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Lanjut ke Gaya Visual</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 6: GAYA VISUAL & RANGKUMAN
         ======================================================== */}
      {currentStep === 6 && (
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 font-display">
              Langkah 6: Tentukan Gaya Visual & Rangkuman Konfigurasi
            </h2>
            <p className="text-xs text-slate-500">
              Pilih gaya ilustrasi sesuai kebutuhan cetak (warna ceria atau hemat fotokopi).
            </p>
          </div>

          {/* Visual Style Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { id: 'Cute 2D Educational', label: 'Cute 2D Educational', desc: 'Warna pastel ceria, karakter ramah anak, latar putih bersih.' },
              { id: 'Black & White Printable (Line Art)', label: 'Black & White Line Art', desc: 'Garis hitam tegas, hemat tinta fotokopi, tanpa shading berat.' },
              { id: 'Minimalist Montessori', label: 'Minimalist Montessori', desc: 'Bentuk geometri tegas, kontras tinggi, visual fokus tanpa distraksi.' },
              { id: 'Kawaii Storybook', label: 'Kawaii Storybook', desc: 'Ilustrasi imut bergaya buku cerita Jepang yang memikat anak balita.' },
              { id: 'Cartoon Vector Sharp', label: 'Cartoon Vector Sharp', desc: 'Garis vektor tajam presisi resolusi tinggi 4K.' }
            ].map((vs) => (
              <div
                key={vs.id}
                onClick={() => setVisualStyle(vs.id)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-1 ${
                  visualStyle === vs.id
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 font-display">{vs.label}</span>
                  {visualStyle === vs.id && <Check className="w-4 h-4 text-indigo-600" />}
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{vs.desc}</p>
              </div>
            ))}
          </div>

          {/* Rangkuman Konfigurasi Singkat (sesuai instruksi prompt user) */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-900">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Rangkuman Konfigurasi Worksheet:</span>
              </span>
              <span className="font-mono text-indigo-600">A4 Portrait · 300 DPI</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-600 pt-1">
              <div>Kategori: <strong className="text-slate-800">{currentCategory.name}</strong></div>
              <div>Subjenis: <strong className="text-slate-800">{currentSubcategory.name}</strong></div>
              <div>Jenjang: <strong className="text-slate-800">{level.split(' ')[0]}</strong></div>
              <div>Topik: <strong className="text-slate-800">{customTopic || currentSubcategory.defaultTopic}</strong></div>
              <div>Soal: <strong className="text-slate-800">{itemCount} soal identik</strong></div>
              <div>Kesulitan: <strong className="text-slate-800">{difficulty}</strong></div>
              <div>Bahasa: <strong className="text-slate-800">{language.toUpperCase()}</strong></div>
              <div>Style: <strong className="text-slate-800">{visualStyle.split(' ')[0]}</strong></div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(5)}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>
            <button
              onClick={handleGenerateWorksheet}
              disabled={isGenerating}
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700 hover:from-indigo-700 hover:to-sky-700 text-white text-xs sm:text-sm font-bold rounded-2xl shadow-md shadow-indigo-200 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Membuat Lembar Kerja...' : 'LANGSUNG BUAT WORKSHEET A4'}</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          STEP 7: HASIL WORKSHEET JADI (A4 CANVAS + PROMPT AI)
         ======================================================== */}
      {currentStep === 7 && (
        <div className="space-y-6">
          {isGenerating ? (
            <div className="p-16 bg-white rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mx-auto" />
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Menyusun Lembar Kerja Edukatif...
                </h3>
                <p className="text-xs text-slate-500">
                  Memvalidasi aturan 1 halaman = 1 aktivitas, memastikan whitespace seimbang, dan menghasilkan format A4 siap cetak 300 DPI.
                </p>
              </div>
            </div>
          ) : result ? (
            <div className="space-y-6">
              {/* Back to wizard and actions toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
                <button
                  onClick={() => setCurrentStep(6)}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Ubah Konfigurasi / Wizard</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGenerateWorksheet}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Regenerate Variasi Baru</span>
                  </button>
                </div>
              </div>

              {/* High-Fidelity A4 Worksheet Canvas */}
              <WorksheetA4Canvas
                data={result}
                onUpdateTitle={(newTitle) => setResult({ ...result, title: newTitle })}
                onUpdateInstruction={(newIns) => setResult({ ...result, instruction: newIns })}
                onNotify={onNotify}
                onOpenPromptStudio={() => onOpenA4PromptStudio && onOpenA4PromptStudio(result.category.id)}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
