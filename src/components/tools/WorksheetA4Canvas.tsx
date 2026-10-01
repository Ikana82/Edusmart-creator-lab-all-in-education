import React, { useRef } from 'react';
import {
  Printer,
  Download,
  Copy,
  Check,
  Edit3,
  Sparkles,
  Scissors,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { WorksheetCategoryKnowledge, WorksheetSubcategoryKnowledge } from '../../data/worksheetCategoriesKnowledge';

export interface GeneratedWorksheetData {
  category: WorksheetCategoryKnowledge;
  subcategory: WorksheetSubcategoryKnowledge;
  title: string;
  instruction: string;
  topic: string;
  level: string;
  itemCount: number;
  difficulty: string;
  visualStyle: string;
  language: 'id' | 'en' | 'bilingual';
  colorMode: 'color' | 'bw';
  midjourneyPrompt: string;
  dallePrompt: string;
  ideogramPrompt: string;
}

interface WorksheetA4CanvasProps {
  data: GeneratedWorksheetData;
  onUpdateTitle?: (title: string) => void;
  onUpdateInstruction?: (ins: string) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
  onOpenPromptStudio?: () => void;
}

export const WorksheetA4Canvas: React.FC<WorksheetA4CanvasProps> = ({
  data,
  onUpdateTitle,
  onUpdateInstruction,
  onNotify,
  onOpenPromptStudio
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [copiedPrompt, setCopiedPrompt] = React.useState(false);
  const [colorMode, setColorMode] = React.useState<'color' | 'bw'>(data.colorMode || 'color');

  const handlePrint = () => {
    window.print();
    onNotify('Membuka dialog cetak A4...', 'info');
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(data.midjourneyPrompt);
    setCopiedPrompt(true);
    onNotify('Prompt Midjourney (A4 Portrait 300DPI 4K) berhasil disalin!', 'success');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const isBw = colorMode === 'bw' || data.visualStyle.includes('Black');

  // Helper to render activity specific content
  const renderActivityContent = () => {
    const subId = data.subcategory.id;

    // 1. CODING ARAH (↑ ↓ ← →)
    if (subId === 'coding-arah') {
      return (
        <div className="space-y-4">
          {/* Arrow Legend Code Sequence */}
          <div className="p-3 bg-indigo-50/80 border border-indigo-200 rounded-xl text-center">
            <span className="text-[11px] font-bold text-indigo-950 uppercase tracking-wider block mb-1">
              Rangkaian Kode Arah Langkah:
            </span>
            <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono text-sm font-extrabold text-indigo-700">
              <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">START</span>
              <span>➔</span>
              <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">➔</span>
              <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">⬇</span>
              <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">⬇</span>
              <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">➔</span>
              <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">➔</span>
              <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">⬆</span>
              <span className="px-2 py-0.5 bg-white rounded border border-indigo-200">➔</span>
              <span>➔</span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded border border-emerald-300">TUJUAN 🏁</span>
            </div>
          </div>

          {/* 6x6 Grid */}
          <div className="max-w-sm mx-auto border-2 border-slate-800 rounded-xl overflow-hidden bg-white shadow-xs">
            <div className="grid grid-cols-6 divide-x divide-y divide-slate-300 text-center font-bold">
              {[...Array(36)].map((_, i) => {
                const isStart = i === 0;
                const isGoal = i === 29;
                return (
                  <div
                    key={i}
                    className={`aspect-square flex items-center justify-center text-xs relative ${
                      isStart ? 'bg-indigo-100' : isGoal ? 'bg-emerald-100' : 'hover:bg-slate-50'
                    }`}
                  >
                    {isStart && <span className="text-xl">🤖</span>}
                    {isGoal && <span className="text-xl">🔋</span>}
                    {isStart && <span className="absolute bottom-0 text-[7px] font-extrabold text-indigo-700">START</span>}
                    {isGoal && <span className="absolute bottom-0 text-[7px] font-extrabold text-emerald-700">TUJUAN</span>}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-center text-[10px] text-slate-500 italic">
            Gunakan pensil untuk menggambar jalur robot kotak demi kotak mengikuti urutan kode panah di atas.
          </p>
        </div>
      );
    }

    // 2. CODING WARNA / KONEKSI
    if (subId === 'coding-warna' || subId === 'coding-pola-warna') {
      return (
        <div className="space-y-4">
          {/* Top Color Legend */}
          <div className="p-2.5 bg-slate-50 border border-slate-300 rounded-xl flex items-center justify-around text-xs font-bold">
            <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-red-500 inline-block shadow-xs"></span> 1 = Merah</div>
            <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-yellow-400 inline-block shadow-xs"></span> 2 = Kuning</div>
            <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-emerald-500 inline-block shadow-xs"></span> 3 = Hijau</div>
            <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-sky-500 inline-block shadow-xs"></span> 4 = Biru</div>
            <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-purple-500 inline-block shadow-xs"></span> 5 = Ungu</div>
          </div>

          {/* 4 Identical Problems */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { code: '4 ➔ 2 ➔ 1 ➔ 3', eg: true },
              { code: '1 ➔ 3 ➔ 5 ➔ 2', eg: false },
              { code: '3 ➔ 4 ➔ 2 ➔ 5', eg: false },
              { code: '5 ➔ 1 ➔ 4 ➔ 2', eg: false }
            ].map((p, idx) => (
              <div key={idx} className="p-3 border-2 border-slate-300 rounded-xl bg-white space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-200 pb-1">
                  <span>Soal {idx + 1}</span>
                  <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">{p.code}</span>
                </div>
                <div className="h-16 flex items-center justify-around relative">
                  <span className="w-5 h-5 rounded-full bg-red-500 shadow-xs"></span>
                  <span className="w-5 h-5 rounded-full bg-yellow-400 shadow-xs"></span>
                  <span className="w-5 h-5 rounded-full bg-emerald-500 shadow-xs"></span>
                  <span className="w-5 h-5 rounded-full bg-sky-500 shadow-xs"></span>
                  <span className="w-5 h-5 rounded-full bg-purple-500 shadow-xs"></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 3. CODING PENJUMLAHAN (Fruit Math)
    if (subId === 'coding-penjumlahan' || subId === 'coding-matematika') {
      return (
        <div className="space-y-4">
          {/* Top Fruit Legend Bar */}
          <div className="p-2.5 bg-amber-50/80 border border-amber-300 rounded-xl flex items-center justify-around text-xs font-bold text-slate-800">
            <span className="flex items-center gap-1">🍉 Semangka = 1</span>
            <span className="flex items-center gap-1">🍐 Pir = 2</span>
            <span className="flex items-center gap-1">🍎 Apel = 3</span>
            <span className="flex items-center gap-1">🍇 Anggur = 4</span>
            <span className="flex items-center gap-1">🍓 Stroberi = 5</span>
            <span className="flex items-center gap-1">🍊 Jeruk = 6</span>
          </div>

          {/* 5 Structured Calculation Rows with 3 boxes */}
          <div className="space-y-2.5">
            {[
              { f1: '🍎', f2: '🍐', val1: 3, val2: 2, sum: 5, solved: true },
              { f1: '🍉', f2: '🍇', val1: 1, val2: 4, sum: 5, solved: false },
              { f1: '🍓', f2: '🍐', val1: 5, val2: 2, sum: 7, solved: false },
              { f1: '🍊', f2: '🍎', val1: 6, val2: 3, sum: 9, solved: false },
              { f1: '🍐', f2: '🍇', val1: 2, val2: 4, sum: 6, solved: false }
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-base">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-white border border-slate-300 font-bold text-xs flex items-center justify-center text-slate-700">
                    {i + 1}
                  </span>
                  <span className="text-2xl">{row.f1}</span>
                  <span className="font-extrabold text-slate-400">+</span>
                  <span className="text-2xl">{row.f2}</span>
                  <span className="font-extrabold text-slate-400">=</span>
                </div>

                {/* 3 boxes: Value 1 + Value 2 = Result */}
                <div className="flex items-center gap-2 font-mono text-sm font-bold">
                  <div className="w-9 h-8 rounded border-2 border-slate-400 bg-white flex items-center justify-center text-slate-800">
                    {row.solved ? row.val1 : ''}
                  </div>
                  <span>+</span>
                  <div className="w-9 h-8 rounded border-2 border-slate-400 bg-white flex items-center justify-center text-slate-800">
                    {row.solved ? row.val2 : ''}
                  </div>
                  <span>=</span>
                  <div className="w-12 h-8 rounded border-2 border-indigo-600 bg-indigo-50 flex items-center justify-center text-indigo-900 font-extrabold">
                    {row.solved ? row.sum : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 4. GRID COORDINATES
    if (subId === 'coding-grid-coords' || subId === 'coding-luas-objek') {
      return (
        <div className="space-y-4">
          <div className="border-2 border-slate-800 rounded-xl overflow-hidden bg-white max-w-md mx-auto text-xs font-bold">
            <div className="grid grid-cols-7 text-center bg-slate-200 py-1 border-b border-slate-800">
              <span className="text-slate-400">#</span>
              <span>A</span>
              <span>B</span>
              <span>C</span>
              <span>D</span>
              <span>E</span>
              <span>F</span>
            </div>
            {[1, 2, 3, 4, 5].map((r) => (
              <div key={r} className="grid grid-cols-7 text-center border-t border-slate-300 items-center h-9">
                <span className="bg-slate-100 h-full flex items-center justify-center border-r border-slate-300 text-slate-600">{r}</span>
                <span>{r === 1 ? '🚗' : ''}</span>
                <span>{r === 3 ? '🏀' : ''}</span>
                <span>{r === 2 ? '🐟' : ''}</span>
                <span>{r === 5 ? '✈️' : ''}</span>
                <span>{r === 4 ? '⭐' : ''}</span>
                <span>{r === 2 ? '🏠' : ''}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <div className="p-2 bg-slate-50 border border-slate-300 rounded-lg flex items-center justify-between">
              <span>🚗 Mobil:</span> <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">(A, 1) contoh</span>
            </div>
            <div className="p-2 bg-white border border-slate-300 rounded-lg flex items-center justify-between">
              <span>🐟 Ikan:</span> <span className="text-slate-400 font-mono">( ... , ... )</span>
            </div>
            <div className="p-2 bg-white border border-slate-300 rounded-lg flex items-center justify-between">
              <span>🏀 Bola:</span> <span className="text-slate-400 font-mono">( ... , ... )</span>
            </div>
            <div className="p-2 bg-white border border-slate-300 rounded-lg flex items-center justify-between">
              <span>✈️ Pesawat:</span> <span className="text-slate-400 font-mono">( ... , ... )</span>
            </div>
            <div className="p-2 bg-white border border-slate-300 rounded-lg flex items-center justify-between">
              <span>⭐ Bintang:</span> <span className="text-slate-400 font-mono">( ... , ... )</span>
            </div>
            <div className="p-2 bg-white border border-slate-300 rounded-lg flex items-center justify-between">
              <span>🏠 Rumah:</span> <span className="text-slate-400 font-mono">( ... , ... )</span>
            </div>
          </div>
        </div>
      );
    }

    // 5. MATCHING (SHADOW MATCHING / SENSORY)
    if (data.category.id === 'matching') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-8 items-center max-w-lg mx-auto">
            {/* Left Items */}
            <div className="space-y-3">
              {[
                { name: 'Kuda Laut', icon: '🌊', color: 'bg-orange-100 border-orange-300' },
                { name: 'Ikan Paus', icon: '🐳', color: 'bg-blue-100 border-blue-300' },
                { name: 'Bintang Laut', icon: '⭐', color: 'bg-yellow-100 border-yellow-300' },
                { name: 'Penyu Hijau', icon: '🐢', color: 'bg-emerald-100 border-emerald-300' }
              ].map((item, idx) => (
                <div key={idx} className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold ${item.color}`}>
                  <span className="flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-900 border-2 border-white shadow-xs"></span>
                </div>
              ))}
            </div>

            {/* Right Silhouettes (Scrambled) */}
            <div className="space-y-3">
              {[
                { label: 'Siluet Paus' },
                { label: 'Siluet Penyu' },
                { label: 'Siluet Kuda Laut' },
                { label: 'Siluet Bintang' }
              ].map((sil, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900 text-white flex items-center justify-between text-xs font-bold border border-slate-800">
                  <span className="w-3.5 h-3.5 rounded-full bg-white shadow-xs"></span>
                  <span className="opacity-90">{sil.label}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-[10px] text-slate-400 italic">
            Tarik garis lurus dari titik hewan di kiri ke titik bayangan hitam yang cocok di sebelah kanan.
          </p>
        </div>
      );
    }

    // 6. CUT & PASTE
    if (data.category.id === 'cut_paste') {
      return (
        <div className="space-y-5">
          {/* Main Work Board with drop zones */}
          <div className="p-5 border-2 border-slate-800 rounded-2xl bg-slate-50/70 text-center space-y-3">
            <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
              Area Tempat Menempelkan Kepingan:
            </span>
            <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
              {[1, 2, 3, 4].map((z) => (
                <div key={z} className="aspect-square rounded-2xl border-2 border-dashed border-indigo-400 bg-white flex flex-col items-center justify-center text-xs font-bold text-indigo-600 shadow-xs">
                  <span>Kotak {z}</span>
                  <span className="text-[9px] text-slate-400 mt-1">[ Tempel ]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scissor Cutting Guideline */}
          <div className="relative border-t-2 border-dashed border-slate-500 my-4 flex items-center justify-center">
            <span className="absolute bg-white px-3 text-xs font-bold text-slate-600 flex items-center gap-1.5 shadow-xs border border-slate-200 rounded-full py-0.5">
              <Scissors className="w-4 h-4 text-slate-700" />
              <span>Gunting bagian bawah ini dengan rapi</span>
            </span>
          </div>

          {/* Cutout Tokens */}
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto pt-2">
            {[
              { icon: '🍩', word: 'Donat' },
              { icon: '🦕', word: 'Dino' },
              { icon: '🍃', word: 'Daun' },
              { icon: '🥩', word: 'Daging' }
            ].map((t, idx) => (
              <div key={idx} className="p-3 border-2 border-slate-400 rounded-xl bg-white text-center shadow-xs">
                <span className="text-3xl block mb-1">{t.icon}</span>
                <span className="text-xs font-bold text-slate-800">{t.word}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 7. TRACING STROKE
    if (data.category.id === 'tracing') {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 border-2 border-slate-300 rounded-2xl flex items-center gap-6 max-w-md mx-auto">
            {/* Jumbo Hollow Letter with Stroke Arrows */}
            <div className="w-24 h-24 bg-white border-2 border-slate-900 rounded-2xl flex items-center justify-center text-5xl font-black font-display text-slate-900 relative shadow-sm shrink-0">
              A
              <span className="absolute top-1 left-2 text-[9px] font-bold text-indigo-600">① ➔</span>
              <span className="absolute top-1 right-2 text-[9px] font-bold text-indigo-600">② ➔</span>
              <span className="absolute bottom-4 text-[9px] font-bold text-indigo-600">③ ➔</span>
            </div>

            <div className="flex-1 space-y-2">
              <div className="text-sm font-bold text-slate-900">Huruf A (Apel Manis)</div>
              <div className="space-y-1.5 font-mono text-xs text-slate-400">
                <div className="border-b border-t border-dashed border-slate-400 py-1 tracking-widest text-center">
                  A &nbsp; · &nbsp; A &nbsp; · &nbsp; A &nbsp; · &nbsp; A
                </div>
                <div className="border-b border-t border-dashed border-slate-400 py-1 tracking-widest text-center">
                  a &nbsp; · &nbsp; a &nbsp; · &nbsp; a &nbsp; · &nbsp; a
                </div>
              </div>
            </div>
          </div>

          {/* 3 Full Handwriting Rows */}
          <div className="space-y-3 pt-2">
            {[1, 2, 3].map((row) => (
              <div key={row} className="h-10 border-b-2 border-t-2 border-slate-300 bg-white flex items-center px-4 justify-between font-mono text-xs text-slate-400 tracking-widest">
                <span className="font-bold text-slate-700">Baris {row}:</span>
                <span>A &nbsp; . &nbsp; . &nbsp; . &nbsp; A &nbsp; . &nbsp; . &nbsp; . &nbsp; A &nbsp; . &nbsp; . &nbsp; . &nbsp; A</span>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 8. COUNTING (DEFAULT / GENERAL)
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { items: '🍎 🍎 🍎', count: 3, label: 'Apel Merah', solved: true },
            { items: '🚗 🚗 🚗 🚗 🚗', count: 5, label: 'Mobil Biru', solved: false },
            { items: '🐟 🐟 🐟 🐟', count: 4, label: 'Ikan Hias', solved: false },
            { items: '⭐ ⭐ ⭐ ⭐ ⭐ ⭐', count: 6, label: 'Bintang Terang', solved: false }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 border-2 border-slate-300 rounded-xl text-center space-y-2">
              <div className="text-2xl tracking-wide">{item.items}</div>
              <div className="text-xs font-semibold text-slate-600">{item.label}</div>
              <div className="w-12 h-8 mx-auto border-2 border-slate-800 rounded-lg bg-white flex items-center justify-center font-mono text-sm font-extrabold text-indigo-700">
                {item.solved ? item.count : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-900 font-display">
            Format: A4 Portrait (210×297 mm)
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
            300 DPI Cetak Siap Pakai
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
            1 Halaman = 1 Aktivitas
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Color / BW Toggle */}
          <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setColorMode('color')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                colorMode === 'color' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
              }`}
            >
              Warna Ceria
            </button>
            <button
              onClick={() => setColorMode('bw')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                colorMode === 'bw' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              B&W Fotokopi
            </button>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Selesai Edit' : 'Edit Teks'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak A4 (Print)</span>
          </button>
        </div>
      </div>

      {/* A4 Printable Canvas Area (Page-within-a-page) */}
      <div className="bg-slate-200/60 p-4 sm:p-8 rounded-3xl flex justify-center overflow-x-auto">
        <div
          ref={canvasRef}
          id="worksheet-printable-sheet"
          className={`bg-white shadow-xl border border-slate-300 w-full max-w-[650px] aspect-[1/1.414] p-8 sm:p-12 flex flex-col justify-between select-none relative transition-all ${
            isBw ? 'grayscale' : ''
          }`}
          style={{ minHeight: '820px' }}
        >
          {/* Inner Safety Margin Border (page-within-a-page) */}
          <div className="border border-slate-300 rounded-2xl p-6 sm:p-8 flex-1 flex flex-col justify-between">
            {/* 1. Header: Student Metadata */}
            <div className="border-b-2 border-slate-800 pb-4 mb-4">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700 font-mono mb-3">
                <span>Nama: ____________________</span>
                <span>Kelas: __________</span>
                <span>Tgl: __________</span>
              </div>

              {/* Title & Instruction */}
              <div className="text-center space-y-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={data.title}
                    onChange={(e) => onUpdateTitle && onUpdateTitle(e.target.value)}
                    className="text-xl sm:text-2xl font-black font-display text-slate-900 text-center w-full border-b border-indigo-400 focus:outline-none"
                  />
                ) : (
                  <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-slate-900 uppercase">
                    {data.title}
                  </h1>
                )}

                {isEditing ? (
                  <input
                    type="text"
                    value={data.instruction}
                    onChange={(e) => onUpdateInstruction && onUpdateInstruction(e.target.value)}
                    className="text-xs text-slate-500 text-center w-full border-b border-slate-300 focus:outline-none"
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-xl mx-auto">
                    {data.instruction}
                  </p>
                )}
              </div>
            </div>

            {/* 2. Main Dominant Activity Area */}
            <div className="flex-1 flex flex-col justify-center py-2">
              {renderActivityContent()}
            </div>

            {/* 3. Clean Footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-medium">
              <span>EduSmart Creator Lab · Lembar Kerja Edukasi</span>
              <span>Standar Format A4 Portrait · 300 DPI</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Image Generation Prompt Card */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-lg border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 text-xs font-semibold border border-sky-400/30">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Prompt Text-to-Image A4 Siap Cetak (300 DPI · 4K)</span>
            </div>
            <h3 className="text-sm font-bold text-white font-display">
              Gunakan Prompt Ini di Midjourney v6.1, DALL-E 3, atau Ideogram
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {onOpenPromptStudio && (
              <button
                onClick={onOpenPromptStudio}
                className="px-3.5 py-1.5 bg-gradient-to-r from-indigo-500 to-sky-500 hover:from-indigo-600 hover:to-sky-600 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Buka Studio Prompt A4 Lengkap</span>
              </button>
            )}

            <button
              onClick={handleCopyPrompt}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedPrompt ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPrompt ? 'Tersalin!' : 'Copy Prompt'}</span>
            </button>
          </div>
        </div>

        <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
          {data.midjourneyPrompt}
        </div>
      </div>
    </div>
  );
};
