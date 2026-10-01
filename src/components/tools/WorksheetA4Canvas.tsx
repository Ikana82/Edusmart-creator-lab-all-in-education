import React, { useRef, useState } from 'react';
import {
  Printer,
  Download,
  Copy,
  Check,
  Edit3,
  Sparkles,
  Scissors,
  FileDown,
  Eye,
  RefreshCw
} from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
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
  const [isEditing, setIsEditing] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [colorMode, setColorMode] = useState<'color' | 'bw'>(data.colorMode || 'color');
  const [isExportingPng, setIsExportingPng] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Print A4
  const handlePrint = () => {
    window.print();
    onNotify('Membuka dialog cetak A4...', 'info');
  };

  // Download High-Resolution PNG (300 DPI target)
  const handleDownloadPng = async () => {
    if (!canvasRef.current) return;
    setIsExportingPng(true);
    try {
      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: 2.5, // Crisp 300DPI equivalent
        backgroundColor: '#ffffff'
      });
      const link = document.createElement('a');
      const filename = `worksheet-${data.subcategory.id}-${Date.now()}.png`;
      link.download = filename;
      link.href = dataUrl;
      link.click();
      onNotify('File PNG lembar kerja berhasil diunduh!', 'success');
    } catch (err) {
      console.error(err);
      onNotify('Gagal mengunduh file PNG. Silakan coba lagi.', 'error');
    } finally {
      setIsExportingPng(false);
    }
  };

  // Download PDF (A4 Portrait format)
  const handleDownloadPdf = async () => {
    if (!canvasRef.current) return;
    setIsExportingPdf(true);
    try {
      const dataUrl = await toPng(canvasRef.current, {
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const filename = `worksheet-${data.subcategory.id}-${Date.now()}.pdf`;
      pdf.save(filename);
      onNotify('File PDF lembar kerja berhasil diunduh!', 'success');
    } catch (err) {
      console.error(err);
      onNotify('Gagal mengunduh file PDF. Silakan coba lagi.', 'error');
    } finally {
      setIsExportingPdf(false);
    }
  };

  // Copy AI Prompt
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(data.midjourneyPrompt);
    setCopiedPrompt(true);
    onNotify('Prompt Midjourney (A4 Portrait 300DPI 4K) berhasil disalin!', 'success');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const isBw = colorMode === 'bw' || data.visualStyle.includes('Black');

  // RENDER DEDICATED VISUAL CONTENT FOR ALL SUBCATEGORIES ACCORDING TO KNOWLEDGE GUIDE
  const renderActivityContent = () => {
    const subId = data.subcategory.id;

    // ==========================================
    // 1. CODING: 1. CODING ARAH (↑ ↓ ← →)
    // ==========================================
    if (subId === 'coding-arah') {
      return (
        <div className="space-y-4">
          <div className="p-3 bg-indigo-50/90 border border-indigo-200 rounded-xl text-center shadow-xs">
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

          <div className="max-w-[280px] sm:max-w-xs mx-auto border-2 border-slate-900 rounded-xl overflow-hidden bg-white shadow-xs">
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

    // ==========================================
    // 1. CODING: 2. LINE CODING (Menyalin Pola Titik)
    // ==========================================
    if (subId === 'coding-line') {
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
            {[1, 2, 3, 4].map((itemNum) => (
              <div key={itemNum} className="p-3 border-2 border-slate-300 rounded-xl bg-white space-y-2">
                <div className="text-[10px] font-bold text-slate-700 flex justify-between">
                  <span>Soal {itemNum}</span>
                  <span className="text-slate-400">Salin Pola Titik</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  {/* Left: Example pattern */}
                  <div className="p-2 border border-slate-200 rounded-lg bg-slate-50">
                    <span className="text-[8px] font-bold text-slate-500 block mb-1">Contoh</span>
                    <div className="w-16 h-16 mx-auto grid grid-cols-3 gap-2 p-1.5 bg-white border border-slate-300 rounded relative">
                      {[...Array(9)].map((_, dotIdx) => (
                        <div key={dotIdx} className="w-2 h-2 rounded-full bg-slate-800 mx-auto my-auto" />
                      ))}
                      {/* Drawn connecting line */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <line x1="16%" y1="16%" x2="84%" y2="16%" stroke="#4f46e5" strokeWidth="2.5" />
                        <line x1="84%" y1="16%" x2="84%" y2="84%" stroke="#4f46e5" strokeWidth="2.5" />
                      </svg>
                    </div>
                  </div>

                  {/* Right: Blank dot grid to replicate */}
                  <div className="p-2 border border-dashed border-indigo-300 rounded-lg bg-indigo-50/30">
                    <span className="text-[8px] font-bold text-indigo-600 block mb-1">Salin disini</span>
                    <div className="w-16 h-16 mx-auto grid grid-cols-3 gap-2 p-1.5 bg-white border border-slate-300 rounded">
                      {[...Array(9)].map((_, dotIdx) => (
                        <div key={dotIdx} className="w-2 h-2 rounded-full bg-slate-400 mx-auto my-auto" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[10px] text-slate-500 italic">
            Hubungkan titik-titik pada kotak kanan agar persis sama dengan contoh di kotak kiri.
          </p>
        </div>
      );
    }

    // ==========================================
    // 1. CODING: 3. CODING WARNA / KONEKSI WARNA
    // ==========================================
    if (subId === 'coding-warna') {
      return (
        <div className="space-y-4">
          <div className="p-2.5 bg-slate-50 border border-slate-300 rounded-xl flex items-center justify-around text-xs font-bold">
            <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-red-500 inline-block shadow-xs"></span> 1 = Merah</div>
            <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-yellow-400 inline-block shadow-xs"></span> 2 = Kuning</div>
            <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-emerald-500 inline-block shadow-xs"></span> 3 = Hijau</div>
            <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-sky-500 inline-block shadow-xs"></span> 4 = Biru</div>
            <div className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full bg-purple-500 inline-block shadow-xs"></span> 5 = Ungu</div>
          </div>

          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
            {[
              { code: '4 ➔ 2 ➔ 1 ➔ 3', eg: true },
              { code: '1 ➔ 3 ➔ 5 ➔ 2', eg: false },
              { code: '3 ➔ 4 ➔ 2 ➔ 5', eg: false },
              { code: '5 ➔ 1 ➔ 4 ➔ 2', eg: false }
            ].map((p, idx) => (
              <div key={idx} className="p-3 border-2 border-slate-300 rounded-xl bg-white space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 border-b border-slate-200 pb-1">
                  <span>Soal {idx + 1} {p.eg && <span className="text-[9px] text-emerald-600 font-semibold">(Contoh)</span>}</span>
                  <span className="font-mono text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">{p.code}</span>
                </div>
                <div className="h-14 flex items-center justify-around relative">
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

    // ==========================================
    // 1. CODING: 4. POLA WARNA
    // ==========================================
    if (subId === 'coding-pola-warna') {
      return (
        <div className="space-y-3 max-w-lg mx-auto">
          {[
            { colors: ['bg-red-500', 'bg-sky-500', 'bg-red-500', 'bg-sky-500'], target: 'bg-red-500' },
            { colors: ['bg-emerald-500', 'bg-emerald-500', 'bg-yellow-400', 'bg-emerald-500'], target: 'bg-emerald-500' },
            { colors: ['bg-purple-500', 'bg-yellow-400', 'bg-sky-500', 'bg-purple-500'], target: 'bg-yellow-400' },
            { colors: ['bg-red-500', 'bg-red-500', 'bg-blue-500', 'bg-blue-500'], target: 'bg-red-500' }
          ].map((row, i) => (
            <div key={i} className="p-2.5 bg-slate-50 border border-slate-300 rounded-xl flex items-center justify-between">
              {/* Pattern row */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 w-5">{i + 1}.</span>
                {row.colors.map((c, ci) => (
                  <span key={ci} className={`w-6 h-6 rounded-full ${c} shadow-xs`} />
                ))}
                {/* Blank slot */}
                <span className="w-6 h-6 rounded-full border-2 border-dashed border-indigo-400 bg-white flex items-center justify-center text-[10px] text-indigo-500 font-bold">
                  ?
                </span>
              </div>

              {/* Choices on right */}
              <div className="flex items-center gap-1.5 pl-3 border-l border-slate-300">
                <span className="w-5 h-5 rounded-full bg-red-500 cursor-pointer shadow-xs" />
                <span className="w-5 h-5 rounded-full bg-yellow-400 cursor-pointer shadow-xs" />
                <span className="w-5 h-5 rounded-full bg-sky-500 cursor-pointer shadow-xs" />
              </div>
            </div>
          ))}
          <p className="text-center text-[10px] text-slate-500 italic">
            Tarik garis dari lingkaran tanda tanya (?) ke warna yang tepat di sebelah kanan.
          </p>
        </div>
      );
    }

    // ==========================================
    // 1. CODING: 5. CODING ANGKA (Secret Decoder)
    // ==========================================
    if (subId === 'coding-angka-simbol') {
      return (
        <div className="space-y-4 max-w-lg mx-auto">
          {/* Decoder Master Table */}
          <div className="p-2.5 bg-indigo-50 border-2 border-indigo-200 rounded-xl text-center shadow-xs">
            <span className="text-[10px] font-bold text-indigo-900 block mb-1">TABEL KODE RAHASIA ANGKA KE HURUF:</span>
            <div className="grid grid-cols-9 divide-x divide-indigo-200 bg-white rounded-lg border border-indigo-200 text-xs font-mono font-bold">
              {[
                { n: '1', l: 'A' }, { n: '2', l: 'B' }, { n: '3', l: 'C' },
                { n: '4', l: 'E' }, { n: '5', l: 'I' }, { n: '6', l: 'K' },
                { n: '7', l: 'L' }, { n: '8', l: 'O' }, { n: '9', l: 'U' }
              ].map((c) => (
                <div key={c.n} className="py-1">
                  <div className="text-slate-500 text-[10px]">{c.n}</div>
                  <div className="text-indigo-700 text-sm font-extrabold">{c.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 4 Decoder Problems */}
          <div className="space-y-2 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-300 rounded-xl flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-slate-700">1 - 6 - 9</span>
              <div className="flex items-center gap-1 font-mono font-bold text-indigo-800">
                <span className="w-7 h-7 rounded border border-indigo-300 bg-indigo-50 flex items-center justify-center">A</span>
                <span className="w-7 h-7 rounded border border-indigo-300 bg-indigo-50 flex items-center justify-center">K</span>
                <span className="w-7 h-7 rounded border border-indigo-300 bg-indigo-50 flex items-center justify-center">U</span>
                <span className="text-[10px] text-emerald-600 font-semibold ml-1">(Contoh)</span>
              </div>
            </div>

            {[
              { code: '2 - 8 - 7 - 1', length: 4 },
              { code: '2 - 9 - 6 - 9', length: 4 },
              { code: '7 - 5 - 6 - 1', length: 4 }
            ].map((p, idx) => (
              <div key={idx} className="p-2.5 bg-white border border-slate-300 rounded-xl flex items-center justify-between">
                <span className="font-mono text-sm font-bold text-slate-700">{p.code}</span>
                <div className="flex items-center gap-1">
                  {[...Array(p.length)].map((_, i) => (
                    <span key={i} className="w-7 h-7 rounded border-2 border-dashed border-slate-300 bg-slate-50" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ==========================================
    // 1. CODING: 6. CODING PENJUMLAHAN (Fruit Math)
    // ==========================================
    if (subId === 'coding-penjumlahan' || subId === 'coding-matematika') {
      return (
        <div className="space-y-4 max-w-lg mx-auto">
          {/* Top Fruit Legend Bar */}
          <div className="p-2.5 bg-amber-50/90 border border-amber-300 rounded-xl flex items-center justify-around text-xs font-bold text-slate-800 shadow-xs">
            <span>🍉 = 1</span>
            <span>🍐 = 2</span>
            <span>🍎 = 3</span>
            <span>🍇 = 4</span>
            <span>🍓 = 5</span>
            <span>🍊 = 6</span>
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

                <div className="flex items-center gap-2 font-mono text-sm font-bold">
                  <div className="w-8 h-8 rounded border-2 border-slate-400 bg-white flex items-center justify-center text-slate-800">
                    {row.solved ? row.val1 : ''}
                  </div>
                  <span>+</span>
                  <div className="w-8 h-8 rounded border-2 border-slate-400 bg-white flex items-center justify-center text-slate-800">
                    {row.solved ? row.val2 : ''}
                  </div>
                  <span>=</span>
                  <div className="w-10 h-8 rounded border-2 border-indigo-600 bg-indigo-50 flex items-center justify-center text-indigo-900 font-extrabold">
                    {row.solved ? row.sum : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ==========================================
    // 1. CODING: 8. MENENTUKAN LUAS OBJEK / GRID
    // ==========================================
    if (subId === 'coding-luas-objek') {
      return (
        <div className="space-y-4 max-w-lg mx-auto">
          {/* 8x8 Grid with colored shapes occupying boxes */}
          <div className="border-2 border-slate-800 rounded-xl overflow-hidden bg-white max-w-[280px] mx-auto text-xs font-bold shadow-xs">
            <div className="grid grid-cols-7 text-center bg-slate-200 py-1 border-b border-slate-800 text-[10px]">
              <span className="text-slate-400">#</span>
              <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span>
            </div>
            {[1, 2, 3, 4, 5, 6].map((r) => (
              <div key={r} className="grid grid-cols-7 text-center border-t border-slate-300 items-center h-8">
                <span className="bg-slate-100 h-full flex items-center justify-center border-r border-slate-300 text-slate-600 text-[10px]">{r}</span>
                {/* Shapes occupying contiguous boxes */}
                <span className={r === 1 || r === 2 ? 'bg-sky-200 border border-sky-400 text-xs' : ''}>{r === 1 ? '🚗' : ''}</span>
                <span className={r === 1 || r === 2 ? 'bg-sky-200 border border-sky-400' : ''} />
                <span className={r >= 3 && r <= 5 ? 'bg-emerald-200 border border-emerald-400 text-xs' : ''}>{r === 3 ? '🏡' : ''}</span>
                <span className={r >= 3 && r <= 5 ? 'bg-emerald-200 border border-emerald-400' : ''} />
                <span className={r >= 4 && r <= 5 ? 'bg-amber-200 border border-amber-400 text-xs' : ''}>{r === 4 ? '🌳' : ''}</span>
                <span className={r >= 4 && r <= 5 ? 'bg-amber-200 border border-amber-400' : ''} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 text-xs pt-1">
            <div className="p-2 bg-slate-50 border border-slate-300 rounded-lg flex items-center justify-between">
              <span>🚗 Mobil:</span> <span className="font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">4 kotak (contoh)</span>
            </div>
            <div className="p-2 bg-white border border-slate-300 rounded-lg flex items-center justify-between">
              <span>🏡 Rumah:</span> <span className="text-slate-400 font-mono">[ ... ] kotak</span>
            </div>
            <div className="p-2 bg-white border border-slate-300 rounded-lg flex items-center justify-between">
              <span>🌳 Pohon:</span> <span className="text-slate-400 font-mono">[ ... ] kotak</span>
            </div>
          </div>
        </div>
      );
    }

    // ==========================================
    // 1. CODING: 9. MENIMBANG DAN MENJUMLAH
    // ==========================================
    if (subId === 'coding-menimbang') {
      return (
        <div className="space-y-4 max-w-lg mx-auto">
          {/* Top Shapes Weight Key Table */}
          <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-around text-xs font-bold text-slate-800 shadow-xs">
            <span>◆ Belah ketupat = 1</span>
            <span>⬟ Pentagon = 2</span>
            <span>▲ Segitiga = 3</span>
            <span>● Lingkaran = 4</span>
            <span>■ Persegi = 5</span>
          </div>

          {/* 4 Balance Scales */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { s1: '▲ + ●', sum: 7, eg: true },
              { s1: '■ + ⬟', sum: 7, eg: false },
              { s1: '● + ●', sum: 8, eg: false },
              { s1: '▲ + ◆', sum: 4, eg: false }
            ].map((sc, i) => (
              <div key={i} className="p-3 border-2 border-slate-300 rounded-xl bg-white space-y-2">
                <div className="text-[10px] font-bold text-slate-600">Timbangan #{i + 1}</div>
                {/* Scale Graphic */}
                <div className="border-b-2 border-slate-800 pb-1 flex items-center justify-between text-base px-2">
                  <span className="font-bold text-indigo-700">{sc.s1}</span>
                  <span className="text-xs font-bold text-slate-400">⚖</span>
                  <div className="w-10 h-7 border-2 border-slate-700 rounded bg-slate-50 flex items-center justify-center font-mono text-xs font-bold">
                    {sc.eg ? sc.sum : ''}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // ==========================================
    // 1. CODING: 11. GRID CODING (Koordinat A-H x 1-8)
    // ==========================================
    if (subId === 'coding-grid-coords') {
      return (
        <div className="space-y-4 max-w-lg mx-auto">
          <div className="border-2 border-slate-800 rounded-xl overflow-hidden bg-white max-w-xs mx-auto text-xs font-bold shadow-xs">
            <div className="grid grid-cols-7 text-center bg-slate-200 py-1 border-b border-slate-800 text-[10px]">
              <span className="text-slate-400">#</span>
              <span>A</span><span>B</span><span>C</span><span>D</span><span>E</span><span>F</span>
            </div>
            {[1, 2, 3, 4, 5].map((r) => (
              <div key={r} className="grid grid-cols-7 text-center border-t border-slate-300 items-center h-8">
                <span className="bg-slate-100 h-full flex items-center justify-center border-r border-slate-300 text-slate-600 text-[10px]">{r}</span>
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
              <span>🚗 Mobil:</span> <span className="font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded text-[11px]">(A, 1) contoh</span>
            </div>
            <div className="p-2 bg-white border border-slate-300 rounded-lg flex items-center justify-between">
              <span>🐟 Ikan:</span> <span className="text-slate-400 font-mono text-[11px]">( ... , ... )</span>
            </div>
            <div className="p-2 bg-white border border-slate-300 rounded-lg flex items-center justify-between">
              <span>🏀 Bola:</span> <span className="text-slate-400 font-mono text-[11px]">( ... , ... )</span>
            </div>
          </div>
        </div>
      );
    }

    // ==========================================
    // 1. CODING: 12. PIXEL CODING
    // ==========================================
    if (subId === 'coding-pixel') {
      return (
        <div className="space-y-4 max-w-lg mx-auto">
          <div className="p-2 bg-slate-50 border border-slate-300 rounded-xl flex items-center justify-around text-xs font-bold">
            <span className="flex items-center gap-1"><span className="w-3.5 h-3.5 bg-red-500 rounded"></span> 1 = Merah</span>
            <span className="flex items-center gap-1"><span className="w-3.5 h-3.5 bg-yellow-400 rounded"></span> 2 = Kuning</span>
            <span className="flex items-center gap-1"><span className="w-3.5 h-3.5 bg-sky-500 rounded"></span> 3 = Biru</span>
            <span className="flex items-center gap-1"><span className="w-3.5 h-3.5 bg-white border border-slate-300 rounded"></span> 4 = Putih</span>
          </div>

          <div className="max-w-[240px] mx-auto border-2 border-slate-800 bg-white grid grid-cols-8 divide-x divide-y divide-slate-200 text-center text-[10px] font-mono font-bold shadow-xs">
            {[...Array(64)].map((_, idx) => {
              // Numbers creating a heart or shape
              const isRed = [10, 11, 13, 14, 17, 18, 19, 20, 21, 22, 25, 26, 27, 28, 29, 30, 34, 35, 36, 37, 43, 44].includes(idx);
              const num = isRed ? '1' : '4';
              return (
                <div key={idx} className="aspect-square flex items-center justify-center text-slate-600">
                  {num}
                </div>
              );
            })}
          </div>
          <p className="text-center text-[10px] text-slate-500 italic">
            Warnai kotak sesuai kode nomor untuk melihat gambar tersembunyi!
          </p>
        </div>
      );
    }

    // ==========================================
    // 2. COLORING: ANIMAL MASK
    // ==========================================
    if (subId === 'coloring-mask') {
      return (
        <div className="space-y-4 text-center max-w-md mx-auto">
          <div className="p-6 border-2 border-dashed border-slate-500 rounded-3xl relative bg-slate-50/50 flex flex-col items-center justify-center shadow-xs">
            {/* Scissor icon at dashed edge */}
            <span className="absolute -top-3 bg-white px-2 py-0.5 rounded-full border border-slate-300 text-[10px] font-bold text-slate-700 flex items-center gap-1">
              <Scissors className="w-3.5 h-3.5 text-slate-600" />
              <span>Garis Potong Gunting Topeng</span>
            </span>

            {/* Giant Lion Face Outline */}
            <div className="w-44 h-44 rounded-full border-4 border-slate-900 bg-white flex flex-col items-center justify-center relative shadow-sm">
              {/* Ears */}
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 absolute -top-4 -left-3 bg-white" />
              <div className="w-10 h-10 rounded-full border-2 border-slate-900 absolute -top-4 -right-3 bg-white" />

              {/* Eye Holes */}
              <div className="flex gap-10 mt-6">
                <div className="w-8 h-8 rounded-full border-2 border-dashed border-sky-500 bg-sky-50 flex items-center justify-center text-[8px] font-bold text-sky-600">
                  Lubang Mata
                </div>
                <div className="w-8 h-8 rounded-full border-2 border-dashed border-sky-500 bg-sky-50 flex items-center justify-center text-[8px] font-bold text-sky-600">
                  Lubang Mata
                </div>
              </div>

              {/* Nose & Mouth */}
              <div className="w-6 h-5 bg-slate-800 rounded-b-lg mt-3" />
              <span className="text-xs font-black text-slate-800 mt-2 font-display">🦁 SINGA RIMBA</span>

              {/* String Attachment Tabs */}
              <div className="absolute -left-6 top-20 w-5 h-5 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center text-[7px] text-slate-500 font-bold">
                Tali
              </div>
              <div className="absolute -right-6 top-20 w-5 h-5 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center text-[7px] text-slate-500 font-bold">
                Tali
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 italic">
            Warnai wajah singa dengan krayon kesukaanmu, gunting di tepi garis putus-putus, lalu beri tali karet di kedua lubang samping.
          </p>
        </div>
      );
    }

    // ==========================================
    // 4. MATCHING: SHADOW MATCHING
    // ==========================================
    if (data.category.id === 'matching') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-8 items-center max-w-lg mx-auto">
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

    // ==========================================
    // 5. CUT & PASTE
    // ==========================================
    if (data.category.id === 'cut_paste') {
      return (
        <div className="space-y-5">
          <div className="p-4 border-2 border-slate-800 rounded-2xl bg-slate-50/70 text-center space-y-3">
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

          <div className="relative border-t-2 border-dashed border-slate-500 my-3 flex items-center justify-center">
            <span className="absolute bg-white px-3 text-xs font-bold text-slate-600 flex items-center gap-1.5 shadow-xs border border-slate-200 rounded-full py-0.5">
              <Scissors className="w-4 h-4 text-slate-700" />
              <span>Gunting bagian bawah ini dengan rapi</span>
            </span>
          </div>

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

    // ==========================================
    // 6. SAME & DIFFERENT (ODD ONE OUT)
    // ==========================================
    if (data.category.id === 'same_different') {
      return (
        <div className="space-y-3 max-w-lg mx-auto">
          {[
            { row: 1, items: ['🐟 (kanan)', '🐟 (kanan)', '🐟 (kiri)', '🐟 (kanan)', '🐟 (kanan)'], diff: 2 },
            { row: 2, items: ['🍎 (utuh)', '🍎 (kroak)', '🍎 (utuh)', '🍎 (utuh)', '🍎 (utuh)'], diff: 1 },
            { row: 3, items: ['🚗 (biru)', '🚗 (biru)', '🚗 (biru)', '🚗 (merah)', '🚗 (biru)'], diff: 3 },
            { row: 4, items: ['⭐ (kuning)', '⭐ (kuning)', '⭐ (kuning)', '⭐ (kuning)', '⭐ (hijau)'], diff: 4 }
          ].map((r) => (
            <div key={r.row} className="p-3 border-2 border-slate-300 rounded-xl bg-white flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 w-6">#{r.row}</span>
              <div className="flex-1 flex justify-around items-center">
                {r.items.map((it, idx) => (
                  <div
                    key={idx}
                    className={`w-12 h-12 rounded-xl border flex flex-col items-center justify-center text-lg cursor-pointer hover:border-indigo-400 ${
                      idx === r.diff ? 'border-dashed border-amber-400 bg-amber-50/50' : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    <span>{it.split(' ')[0]}</span>
                    <span className="text-[7px] text-slate-400 font-mono">{it.split(' ')[1]}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <p className="text-center text-[10px] text-slate-500 italic">
            Lingkari 1 gambar yang berbeda pada setiap baris kelompok gambar di atas!
          </p>
        </div>
      );
    }

    // ==========================================
    // 7. MAZE
    // ==========================================
    if (data.category.id === 'maze') {
      return (
        <div className="space-y-3 text-center max-w-sm mx-auto">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 px-2">
            <span>🐱 START (Kucing Lapar)</span>
            <span>🐟 FINISH (Piring Ikan)</span>
          </div>
          {/* Labyrinth Grid representation */}
          <div className="border-4 border-slate-900 rounded-2xl p-4 bg-white shadow-xs relative">
            <div className="h-44 border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center relative">
              <div className="absolute top-2 left-2 text-2xl">🐱</div>
              <div className="absolute bottom-2 right-2 text-2xl">🐟</div>
              {/* Labyrinth walls representation */}
              <div className="w-3/4 h-2/3 border-4 border-slate-800 rounded-lg flex items-center justify-center">
                <div className="w-1/2 h-1/2 border-4 border-slate-800 rounded"></div>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 italic">
            Tarik garis dari kucing di kiri atas melewati dinding labirin hingga mencapai piring ikan di kanan bawah!
          </p>
        </div>
      );
    }

    // ==========================================
    // 8. TRACING (ALPHABET STROKE 1-2-3)
    // ==========================================
    if (data.category.id === 'tracing') {
      return (
        <div className="space-y-4 max-w-lg mx-auto">
          <div className="p-4 bg-slate-50 border-2 border-slate-300 rounded-2xl flex items-center gap-6">
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

          <div className="space-y-3 pt-1">
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

    // ==========================================
    // 9. DEFAULT / COUNTING CONCRETE OBJECTS
    // ==========================================
    return (
      <div className="space-y-4 max-w-lg mx-auto">
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
      {/* Control Bar: Export Actions (PNG & PDF) + Print + Color Mode */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-900 font-display">
            A4 Portrait (210×297 mm)
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
            300 DPI Cetak Siap Pakai
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
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

          {/* Download High-Res PNG */}
          <button
            onClick={handleDownloadPng}
            disabled={isExportingPng}
            className="px-3.5 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExportingPng ? 'Menyimpan...' : 'Download PNG (300 DPI)'}</span>
          </button>

          {/* Download PDF */}
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="px-3.5 py-1.5 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{isExportingPdf ? 'Membuat PDF...' : 'Download PDF A4'}</span>
          </button>

          {/* Print A4 */}
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
          style={{ minHeight: '840px' }}
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
              <span>Format A4 Portrait (2480 × 3508 px · 300 DPI)</span>
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
