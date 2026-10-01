import React, { useState, useMemo } from 'react';
import { Modal } from '../common/Modal';
import {
  worksheetCategoriesKnowledge,
  WorksheetCategoryKnowledge,
  WorksheetSubcategoryKnowledge
} from '../../data/worksheetCategoriesKnowledge';
import {
  Sparkles,
  Copy,
  Check,
  Code,
  Palette,
  Scissors,
  PenTool,
  GitCommit,
  Calculator,
  BookOpen,
  Compass,
  Info,
  Layers,
  Eye,
  Bookmark,
  Shapes,
  FlaskConical,
  Moon
} from 'lucide-react';

interface A4WorksheetPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyPrompt: (text: string) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
  initialCategory?: string;
}

export const A4WorksheetPromptModal: React.FC<A4WorksheetPromptModalProps> = ({
  isOpen,
  onClose,
  onCopyPrompt,
  onNotify,
  initialCategory = 'coding'
}) => {
  const [selectedCatId, setSelectedCatId] = useState<string>(initialCategory);
  const [selectedSubtypeId, setSelectedSubtypeId] = useState<string>('');
  const [customTopic, setCustomTopic] = useState<string>('');
  const [artStyle, setArtStyle] = useState<'lineart' | 'color' | 'montessori'>('color');
  const [activePromptTab, setActivePromptTab] = useState<'midjourney' | 'dalle' | 'ideogram' | 'curatedMaster'>('midjourney');
  const [activeViewMode, setActiveViewMode] = useState<'both' | 'preview' | 'prompt'>('both');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync category
  const currentCategory: WorksheetCategoryKnowledge = useMemo(() => {
    return (
      worksheetCategoriesKnowledge.find((c) => c.id === selectedCatId) ||
      worksheetCategoriesKnowledge[7] // coding
    );
  }, [selectedCatId]);

  // Set default subtype when category changes
  React.useEffect(() => {
    if (currentCategory.subcategories.length > 0) {
      const match = currentCategory.subcategories.find((s) => s.id === selectedSubtypeId);
      if (!match) {
        setSelectedSubtypeId(currentCategory.subcategories[0].id);
        setCustomTopic(currentCategory.subcategories[0].defaultTopic);
      }
    }
  }, [currentCategory, selectedSubtypeId]);

  const currentSubtype: WorksheetSubcategoryKnowledge = useMemo(() => {
    const found = currentCategory.subcategories.find((s) => s.id === selectedSubtypeId);
    return found || currentCategory.subcategories[0];
  }, [currentCategory, selectedSubtypeId]);

  // Update custom topic when changing subtype
  const handleSelectSubtype = (st: WorksheetSubcategoryKnowledge) => {
    setSelectedSubtypeId(st.id);
    setCustomTopic(st.defaultTopic);
  };

  // Build high-resolution 4K 300DPI A4 prompt based on style and subtype
  const generatedPrompts = useMemo(() => {
    const topicText = customTopic.trim() || currentSubtype.defaultTopic;
    const styleDescription = {
      lineart: 'Clean black and white vector line art outlines, crisp coloring book style, minimal grayscale shading, high contrast, perfect for low-cost photocopy and school printing',
      color: 'Charming pastel watercolor and gouache educational colors, friendly children book illustrations, vibrant soft tones, crisp white background',
      montessori: 'Minimalist flat vector Montessori design, bold clean shapes, high contrast primary and secondary colors, clear typography and ample whitespace'
    }[artStyle];

    // Midjourney
    const midjourney = `High-resolution educational printable worksheet, A4 portrait format (210x297mm), 300 DPI, 4K resolution, subject: "${topicText}". Layout: top header "${currentSubtype.indonesianHeader}", subtitle instruction "${currentSubtype.indonesianInstruction}". ${currentSubtype.rules}. Visual style: ${styleDescription}. Professional typography, crisp non-blurry borders, aligned margins, print ready vector graphic --ar 1:1.414 --q 2 --v 6.1 --style raw`;

    // DALL-E 3 / ChatGPT
    const dalle = `Create an ultra-high resolution 4K, 300 DPI printable A4 portrait children's educational activity worksheet. Topic: "${topicText}". Indonesian title at top: "${currentSubtype.indonesianHeader}", instruction: "${currentSubtype.indonesianInstruction}". Visual details: ${currentSubtype.rules}. Style: ${styleDescription}. Perfect vertical layout with safe printer margins, clean high-contrast text guidelines, absolutely no cut-off elements.`;

    // Ideogram / Recraft
    const ideogram = `Printable A4 portrait educational activity sheet, 300 DPI, 4K vector, typography: "${currentSubtype.indonesianHeader}", subtitle: "${currentSubtype.indonesianInstruction}". Details: ${currentSubtype.rules}. Aesthetic: ${styleDescription}, isolated on crisp white paper background, high contrast, clean cut lines and tracing guides --ar 3:4`;

    return { midjourney, dalle, ideogram, curatedMaster: currentSubtype.defaultEnglishPrompt };
  }, [currentSubtype, customTopic, artStyle]);

  const handleCopy = (key: 'midjourney' | 'dalle' | 'ideogram' | 'curatedMaster') => {
    const text = generatedPrompts[key];
    onCopyPrompt(text);
    setCopiedKey(key);
    onNotify(`Prompt ${key.toUpperCase()} (A4 Portrait 300DPI 4K) berhasil disalin!`, 'success');
    setTimeout(() => setCopiedKey(null), 1800);
  };

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
        return Layers;
    }
  };

  // Helper to render the realistic graphic visual of the selected worksheet
  const renderVisualMockup = () => {
    const stId = currentSubtype.id;

    return (
      <div className="relative mx-auto bg-white rounded-lg shadow-md border border-slate-300 p-4 sm:p-6 text-slate-800 font-sans aspect-[1/1.414] max-w-sm sm:max-w-md w-full flex flex-col justify-between overflow-hidden select-none">
        {/* Subtle Watermark Tag */}
        <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-100/80 text-[9px] font-mono text-slate-400 border border-slate-200">
          <span>A4 · 300 DPI · 4K</span>
        </div>

        {/* 1. Header Banner & Student Info */}
        <div className="border-b-2 border-slate-800 pb-2.5 mb-2">
          <div className="text-center mb-1">
            <h3 className="text-xs sm:text-sm font-extrabold font-display tracking-tight text-slate-900 uppercase">
              {currentSubtype.indonesianHeader.split('/')[0]}
            </h3>
            <p className="text-[10px] text-slate-500 font-medium line-clamp-1 italic">
              {currentSubtype.indonesianInstruction}
            </p>
          </div>

          <div className="flex items-center justify-between text-[9px] text-slate-500 pt-1 border-t border-dotted border-slate-300">
            <span>Nama: ______________</span>
            <span>Kelas: _________</span>
            <span>Tgl: _________</span>
          </div>
        </div>

        {/* 2. Dynamic Interactive Body based on Category & Subtype */}
        <div className="flex-1 flex flex-col justify-center py-1 overflow-hidden">
          {/* CODING SUBTYPES */}
          {stId === 'coding-arah' && (
            <div className="space-y-2">
              <div className="p-1.5 bg-indigo-50 border border-indigo-200 rounded text-center text-[9px] font-mono font-bold text-indigo-700">
                START ➔ ➔ ⬇ ⬇ ➔ ➔ ⬆ ➔ TUJUAN
              </div>
              <div className="border border-slate-800 rounded bg-white p-1 max-w-[200px] mx-auto grid grid-cols-5 text-center text-[10px]">
                {[...Array(25)].map((_, i) => (
                  <div key={i} className="aspect-square border border-slate-200 flex items-center justify-center">
                    {i === 0 && '🤖'}
                    {i === 24 && '🔋'}
                  </div>
                ))}
              </div>
              <p className="text-[8px] text-center text-slate-400 italic">Ikuti kode panah berurutan dari Start ke Tujuan</p>
            </div>
          )}

          {stId === 'coding-warna' && (
            <div className="space-y-2">
              <div className="p-1.5 bg-amber-50/70 border border-amber-200 rounded-lg flex items-center justify-around text-[10px] font-bold">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span> 1</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span> 2</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span> 3</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-sky-500 inline-block"></span> 4</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-purple-500 inline-block"></span> 5</span>
              </div>
              <div className="space-y-1.5 text-[9px]">
                <div className="flex items-center justify-between p-1 bg-slate-50 rounded border border-slate-200">
                  <span className="font-mono font-bold">Kode: 4 ➔ 2 ➔ 1 ➔ 3</span>
                  <div className="flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-sky-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-1 bg-slate-50 rounded border border-slate-200">
                  <span className="font-mono font-bold">Kode: 1 ➔ 3 ➔ 5 ➔ 2</span>
                  <div className="flex gap-1">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {stId === 'coding-penjumlahan' && (
            <div className="space-y-2">
              <div className="p-1 bg-amber-50 border border-amber-200 rounded text-[8px] flex justify-around font-bold">
                <span>🍉=1</span> <span>🍐=2</span> <span>🍎=3</span> <span>🍇=4</span> <span>🍓=5</span>
              </div>
              <div className="space-y-1 text-[9px]">
                <div className="p-1 bg-slate-50 rounded flex items-center justify-between border border-slate-200">
                  <span>🍎 + 🍐 =</span>
                  <span className="font-bold">[ 3 ] + [ 2 ] = [ 5 ] (contoh)</span>
                </div>
                <div className="p-1 bg-slate-50 rounded flex items-center justify-between border border-slate-200">
                  <span>🍉 + 🍇 =</span>
                  <span className="font-mono text-slate-400">[ &nbsp; ] + [ &nbsp; ] = [ &nbsp; ]</span>
                </div>
                <div className="p-1 bg-slate-50 rounded flex items-center justify-between border border-slate-200">
                  <span>🍓 + 🍎 =</span>
                  <span className="font-mono text-slate-400">[ &nbsp; ] + [ &nbsp; ] = [ &nbsp; ]</span>
                </div>
              </div>
            </div>
          )}

          {/* MEWARNAI SUBTYPES */}
          {selectedCatId === 'coloring' && (
            <div className="space-y-2 text-center">
              {stId === 'coloring-mask' ? (
                <div className="p-3 border-2 border-dashed border-slate-400 rounded-2xl relative bg-slate-50/50 flex flex-col items-center justify-center py-4">
                  <div className="w-24 h-24 rounded-full border-4 border-slate-800 flex items-center justify-center relative bg-white">
                    <div className="w-5 h-5 rounded-full border-2 border-dashed border-blue-500 absolute left-3 top-7 flex items-center justify-center text-[7px] text-blue-500">Mata</div>
                    <div className="w-5 h-5 rounded-full border-2 border-dashed border-blue-500 absolute right-3 top-7 flex items-center justify-center text-[7px] text-blue-500">Mata</div>
                    <span className="text-xs font-bold text-slate-700 mt-6">🦁 Topeng Singa</span>
                  </div>
                  <div className="text-[9px] text-slate-500 mt-2 font-medium">Lubangi mata & pasang tali samping</div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex items-center justify-center gap-3 p-1 bg-indigo-50 border border-indigo-200 rounded text-[9px] font-bold">
                    <span className="flex items-center gap-1">🔵 Lingkaran = Biru</span>
                    <span className="flex items-center gap-1">🔺 Segitiga = Merah</span>
                    <span className="flex items-center gap-1">🟨 Kotak = Kuning</span>
                  </div>
                  <div className="h-28 border-2 border-slate-800 rounded-xl bg-white flex flex-col items-center justify-center p-2 relative">
                    <span className="text-4xl">🐟</span>
                    <div className="flex gap-2 text-[10px] mt-1 text-slate-600 font-bold">
                      <span className="px-1 border border-slate-400 rounded">○</span>
                      <span className="px-1 border border-slate-400 rounded">△</span>
                      <span className="px-1 border border-slate-400 rounded">□</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MATCHING */}
          {selectedCatId === 'matching' && (
            <div className="space-y-1.5">
              <div className="grid grid-cols-2 gap-4 items-center">
                <div className="space-y-2">
                  <div className="p-1 bg-sky-50 border border-sky-200 rounded flex items-center justify-between text-[10px]">
                    <span>🌊 Kuda Laut</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  </div>
                  <div className="p-1 bg-sky-50 border border-sky-200 rounded flex items-center justify-between text-[10px]">
                    <span>🐳 Ikan Paus</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  </div>
                  <div className="p-1 bg-sky-50 border border-sky-200 rounded flex items-center justify-between text-[10px]">
                    <span>⭐ Bintang Laut</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="p-1 bg-slate-800 text-white rounded flex items-center justify-between text-[10px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                    <span className="opacity-80">Siluet Paus</span>
                  </div>
                  <div className="p-1 bg-slate-800 text-white rounded flex items-center justify-between text-[10px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                    <span className="opacity-80">Siluet Bintang</span>
                  </div>
                  <div className="p-1 bg-slate-800 text-white rounded flex items-center justify-between text-[10px]">
                    <span className="w-2.5 h-2.5 rounded-full bg-white"></span>
                    <span className="opacity-80">Siluet Kuda Laut</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TRACING */}
          {selectedCatId === 'tracing' && (
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 bg-slate-50 border border-slate-200 rounded-xl">
                <div className="w-14 h-14 bg-white border-2 border-slate-900 rounded-lg flex items-center justify-center font-extrabold text-3xl font-display text-slate-900 relative">
                  A
                  <span className="absolute top-0 left-1 text-[7px] text-indigo-600 font-bold">① ➔</span>
                  <span className="absolute top-0 right-1 text-[7px] text-indigo-600 font-bold">② ➔</span>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="text-[10px] font-bold text-slate-800">Huruf A (Apel)</div>
                  <div className="h-4 border-b border-t border-dashed border-slate-300 flex items-center text-[10px] text-slate-300 tracking-widest font-mono">
                    A · · · A · · · A · · · A
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CUT & PASTE */}
          {selectedCatId === 'cut_paste' && (
            <div className="space-y-2">
              <div className="p-2 border-2 border-slate-300 rounded-xl bg-slate-50/60 flex justify-around">
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-indigo-400 flex items-center justify-center text-[8px] font-bold text-indigo-600">[ 1 ]</div>
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-indigo-400 flex items-center justify-center text-[8px] font-bold text-indigo-600">[ 2 ]</div>
                <div className="w-10 h-10 rounded-full border-2 border-dashed border-indigo-400 flex items-center justify-center text-[8px] font-bold text-indigo-600">[ 3 ]</div>
              </div>
              <div className="relative border-t-2 border-dashed border-slate-400 my-1 text-center">
                <span className="bg-white px-2 text-[8px] text-slate-500">✂ Gunting bagian ini</span>
              </div>
              <div className="flex justify-around pt-1">
                <div className="p-1 border border-slate-400 rounded text-center bg-white text-[8px] font-bold">🍩 donat</div>
                <div className="p-1 border border-slate-400 rounded text-center bg-white text-[8px] font-bold">🦕 dino</div>
                <div className="p-1 border border-slate-400 rounded text-center bg-white text-[8px] font-bold">🍃 daun</div>
              </div>
            </div>
          )}

          {/* DEFAULT COUNTING / GENERAL */}
          {!['coding-arah', 'coding-warna', 'coding-penjumlahan', 'coloring', 'matching', 'tracing', 'cut_paste'].includes(selectedCatId) && (
            <div className="space-y-1.5 text-center">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-slate-50 border border-slate-200 rounded text-center">
                  <div className="text-base">🍎 🍎 🍎</div>
                  <div className="mt-1 text-[8px] text-slate-500 font-bold">= [ 3 ]</div>
                </div>
                <div className="p-2 bg-slate-50 border border-slate-200 rounded text-center">
                  <div className="text-base">🚗 🚗 🚗 🚗</div>
                  <div className="mt-1 text-[8px] text-slate-500 font-bold">= [ ... ]</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Footer Print Standards Line */}
        <div className="pt-2 border-t border-slate-200 text-center text-[8px] text-slate-400 flex items-center justify-between">
          <span>EduSmart Creator Lab · 1 Halaman = 1 Aktivitas</span>
          <span>A4 Portrait · 300 DPI</span>
        </div>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="A4 Worksheet Text-to-Image Studio (300 DPI · 4K)"
      subtitle="13 Menu Utama EduSmart · Pilih kategori worksheet untuk melihat hasil visual & menghasilkan prompt cetak siap pakai"
      maxWidth="5xl"
    >
      <div className="space-y-6">
        {/* Specification Badges Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-gradient-to-r from-indigo-50 via-sky-50 to-indigo-50 rounded-2xl border border-indigo-100 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-indigo-950 font-display flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Standar Cetak Percetakan:</span>
            </span>
            <span className="bg-white px-2.5 py-0.5 rounded-md font-semibold text-indigo-700 border border-indigo-200 shadow-xs">
              A4 Portrait (210 × 297 mm)
            </span>
            <span className="bg-white px-2.5 py-0.5 rounded-md font-semibold text-emerald-700 border border-emerald-200 shadow-xs">
              300 DPI High-Res Print
            </span>
            <span className="bg-white px-2.5 py-0.5 rounded-md font-semibold text-sky-700 border border-sky-200 shadow-xs">
              4K Ultra-Sharp Vector
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-600 bg-white/70 px-2 py-0.5 rounded-md border border-slate-200">
            <span>Aspect Ratio: --ar 1:1.414 (A4)</span>
          </div>
        </div>

        {/* 1. Category Selector Pills (13 Menu Utama) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-900 font-display uppercase tracking-wider">
              1. Pilih Kategori Worksheet (13 Menu Utama):
            </label>
            <span className="text-[11px] text-indigo-600 font-medium">
              Kategori Aktif: {currentCategory.name}
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {worksheetCategoriesKnowledge.map((cat) => {
              const Icon = getCategoryIcon(cat.iconName);
              const isSelected = selectedCatId === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCatId(cat.id)}
                  className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono opacity-80">#{cat.number}</span>
                  </div>
                  <span className="text-[11px] font-bold leading-tight line-clamp-1 font-display">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Subtype Specific Selection */}
        <div className="space-y-2 pt-1 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-slate-900 font-display uppercase tracking-wider">
              2. Pilih Jenis & Format Desain Spesifik ({currentCategory.subcategories.length} Subjenis):
            </label>
            {selectedCatId === 'coding' && (
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                1 Halaman = 1 Jenis Kegiatan
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {currentCategory.subcategories.map((st) => {
              const isSelected = selectedSubtypeId === st.id;
              return (
                <div
                  key={st.id}
                  onClick={() => handleSelectSubtype(st)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 font-display line-clamp-1">
                      {st.name}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                    {st.shortDesc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Custom Topic & Style Setting */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-1 border-t border-slate-100">
          <div className="md:col-span-8">
            <label className="block text-xs font-bold text-slate-900 mb-1">
              Topik / Objek Worksheet:
            </label>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Contoh: Hewan Nusantara, Buah Tropis, Huruf A-Z, Tata Surya..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white"
            />
          </div>

          <div className="md:col-span-4">
            <label className="block text-xs font-bold text-slate-900 mb-1">
              Gaya Visual Cetak:
            </label>
            <div className="flex gap-1.5">
              {[
                { id: 'color', label: 'Warna Pastel' },
                { id: 'lineart', label: 'Hitam Putih (BW)' },
                { id: 'montessori', label: 'Montessori' }
              ].map((st) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setArtStyle(st.id as typeof artStyle)}
                  className={`flex-1 py-2 text-[11px] font-semibold rounded-lg border transition-colors ${
                    artStyle === st.id
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider">
            3. Hasil Visual & Prompt Generator A4:
          </span>
          <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveViewMode('both')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                activeViewMode === 'both' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setActiveViewMode('preview')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                activeViewMode === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Hasil Visual Saja
            </button>
            <button
              onClick={() => setActiveViewMode('prompt')}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer ${
                activeViewMode === 'prompt' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Prompt AI Saja
            </button>
          </div>
        </div>

        {/* 4. Dual View Area */}
        <div
          className={`grid gap-6 items-start ${
            activeViewMode === 'both' ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'
          }`}
        >
          {/* Visual Mockup Pane */}
          {(activeViewMode === 'both' || activeViewMode === 'preview') && (
            <div
              className={`space-y-3 ${
                activeViewMode === 'both' ? 'lg:col-span-5' : 'max-w-md mx-auto w-full'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 font-bold text-slate-800">
                  <Eye className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Preview Hasil Desain A4:</span>
                </span>
                <span className="text-[11px] text-slate-400">Rasio 1:1.414</span>
              </div>

              {renderVisualMockup()}

              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1">
                  <Info className="w-3 h-3 text-indigo-600" />
                  <span>Aturan Desain Knowledge:</span>
                </div>
                <p className="leading-relaxed text-slate-500">
                  {currentSubtype.rules}
                </p>
              </div>
            </div>
          )}

          {/* Prompt Generator Pane */}
          {(activeViewMode === 'both' || activeViewMode === 'prompt') && (
            <div
              className={`space-y-4 ${
                activeViewMode === 'both' ? 'lg:col-span-7' : 'w-full'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  {[
                    { id: 'midjourney', label: 'Midjourney v6.1' },
                    { id: 'dalle', label: 'DALL-E 3' },
                    { id: 'ideogram', label: 'Ideogram / Recraft' },
                    { id: 'curatedMaster', label: '⭐ Master Prompt' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActivePromptTab(tab.id as typeof activePromptTab)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                        activePromptTab === tab.id
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handleCopy(activePromptTab)}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedKey === activePromptTab ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === activePromptTab ? 'Tersalin!' : 'Copy Prompt'}</span>
                </button>
              </div>

              {/* Prompt Output Code Box */}
              <div className="relative p-4 bg-slate-900 rounded-2xl border border-slate-800 text-slate-100 font-mono text-xs leading-relaxed max-h-60 overflow-y-auto">
                <p className="text-slate-200 whitespace-pre-wrap selection:bg-indigo-500">
                  {generatedPrompts[activePromptTab]}
                </p>
              </div>

              {/* Engine Advice Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl">
                  <span className="font-bold text-indigo-900 text-[11px] block mb-0.5">
                    Standar Midjourney:
                  </span>
                  <p className="text-[11px] text-indigo-700 leading-relaxed">
                    Menggunakan <code className="bg-white px-1 py-0.5 rounded text-indigo-950 font-mono">--ar 1:1.414 --q 2 --v 6.1 --style raw</code> untuk proporsi A4 presisi tanpa stretch.
                  </p>
                </div>
                <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
                  <span className="font-bold text-emerald-900 text-[11px] block mb-0.5">
                    Resolusi Siap Print:
                  </span>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">
                    Target 2480 × 3508 px (setara 300 DPI), garis tajam dan batas aman margin cetak printer.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="text-[11px] text-slate-500">
            Kategori: <strong className="text-slate-800">{currentCategory.name}</strong> · Subjenis: <strong className="text-indigo-600">{currentSubtype.name}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Tutup
            </button>
            <button
              onClick={() => handleCopy(activePromptTab)}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Salin Prompt A4 (300 DPI · 4K)</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
