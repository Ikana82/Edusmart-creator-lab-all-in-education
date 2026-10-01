import React, { useState } from 'react';
import { geminiService } from '../../services/geminiService';
import {
  Gamepad2,
  Image as ImageIcon,
  Layers,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  Save,
  CheckCircle2,
  Dice5
} from 'lucide-react';

interface GameComicFlashcardProps {
  toolType: 'game' | 'comic' | 'flashcard';
  onBack: () => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const GameComicFlashcardGenerator: React.FC<GameComicFlashcardProps> = ({
  toolType,
  onBack,
  onNotify
}) => {
  // Common states
  const [topic, setTopic] = useState(
    toolType === 'game'
      ? 'Petualangan Sains Mengenal Satwa Nusantara'
      : toolType === 'comic'
      ? 'Menjaga Kebersihan Hutan Tropis Bersama Si Luwak'
      : 'Kosakata Fauna Tropis Indonesia'
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Results
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>(null);

  // Type-specific inputs
  const [gameType, setGameType] = useState('Print & Play Board Game');
  const [comicPanels, setComicPanels] = useState(4);
  const [flashcardCount, setFlashcardCount] = useState(6);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      if (toolType === 'game') {
        const res = await geminiService.generateGame({
          topic,
          ageRange: '6-10 Tahun',
          gameType
        });
        setResult(res);
      } else if (toolType === 'comic') {
        const res = await geminiService.generateComic({
          topic,
          panelsCount: comicPanels,
          mainCharacters: 'Kiki sang Penjelajah Cilik dan Luwak Sahabat Hutan'
        });
        setResult(res);
      } else {
        const res = await geminiService.generateFlashcard({
          topic,
          cardCount: flashcardCount,
          language: 'Bilingual'
        });
        setResult(res);
      }
      onNotify('Produk edukasi berhasil digenerate!', 'success');
    } catch {
      onNotify('Gagal membuat konten.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onNotify('Berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const titleConfig = {
    game: {
      name: 'Game Generator',
      desc: 'Rancang permainan papan (board game), aturan bermain, dan set kartu kuis edukatif.',
      icon: Gamepad2,
      badge: 'bg-amber-50 text-amber-700',
      btn: 'bg-amber-600 hover:bg-amber-700'
    },
    comic: {
      name: 'Comic Generator',
      desc: 'Susun alur cerita komik strip edukasi 4-6 panel dengan naskah dialog dan prompt ilustrasi.',
      icon: ImageIcon,
      badge: 'bg-pink-50 text-pink-700',
      btn: 'bg-pink-600 hover:bg-pink-700'
    },
    flashcard: {
      name: 'Flashcard Generator',
      desc: 'Ciptakan kartu kilas bilingual, fakta unik sains, dan prompt visual minimalis siap cetak.',
      icon: Layers,
      badge: 'bg-emerald-50 text-emerald-700',
      btn: 'bg-emerald-600 hover:bg-emerald-700'
    }
  }[toolType];

  const Icon = titleConfig.icon;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header Back */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Hub Tools</span>
        </button>
      </div>

      <div className="space-y-1">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg ${titleConfig.badge} text-xs font-semibold`}>
          <Icon className="w-3.5 h-3.5" />
          <span>{titleConfig.name}</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">
          {titleConfig.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">{titleConfig.desc}</p>
      </div>

      {/* Input Form */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Topik Pembelajaran
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white"
          />
        </div>

        {toolType === 'game' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Format Permainan
            </label>
            <select
              value={gameType}
              onChange={(e) => setGameType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            >
              <option value="Print & Play Board Game">Print & Play Board Game (Papan Petak & Dadu)</option>
              <option value="Kartu Tebak-Tebakan / Clue Cards">Kartu Tebak-Tebakan / Clue Cards</option>
              <option value="Trivia Quiz Kelas Interaktif">Trivia Quiz Kelas Interaktif</option>
            </select>
          </div>
        )}

        {toolType === 'comic' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Jumlah Panel Komik
            </label>
            <div className="flex gap-3">
              {[4, 6].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setComicPanels(num)}
                  className={`px-4 py-1.5 text-xs rounded-xl border transition-colors ${
                    comicPanels === num
                      ? 'bg-pink-50 border-pink-500 text-pink-700 font-semibold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {num} Panel
                </button>
              ))}
            </div>
          </div>
        )}

        {toolType === 'flashcard' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Jumlah Kartu Kilas
            </label>
            <div className="flex gap-3">
              {[6, 12, 24].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFlashcardCount(num)}
                  className={`px-4 py-1.5 text-xs rounded-xl border transition-colors ${
                    flashcardCount === num
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-700 font-semibold'
                      : 'border-slate-200 text-slate-600'
                  }`}
                >
                  {num} Kartu
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`px-6 py-2.5 ${titleConfig.btn} text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Menghasilkan Konten...' : `Generate ${titleConfig.name.replace(' Generator', '')}`}</span>
          </button>
        </div>
      </div>

      {/* Results Display */}
      {isGenerating ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
          <p className="text-xs text-slate-500">Menyusun konsep kreatif dengan AI...</p>
        </div>
      ) : result ? (
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-slate-900 font-display">{result.title}</h3>
            </div>
            <button
              onClick={() => copyText(JSON.stringify(result, null, 2), 'res')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5"
            >
              {copiedKey === 'res' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copy Data</span>
            </button>
          </div>

          {/* Game output */}
          {toolType === 'game' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Aturan Permainan:
                </h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {result.rules?.map((rule: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Contoh Kartu Kuis Edukasi:
                </h4>
                <div className="space-y-3">
                  {result.sampleCards?.map((card: { question: string; options: string[]; answer: string; hint: string }, i: number) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-200 bg-amber-50/30 space-y-2 text-xs">
                      <div className="font-semibold text-slate-900">Kartu {i + 1}: {card.question}</div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {card.options?.map((opt: string, optIdx: number) => (
                          <div key={optIdx} className="p-2 bg-white rounded border border-slate-200 text-slate-700">
                            {opt}
                          </div>
                        ))}
                      </div>
                      <div className="text-emerald-700 font-medium">Kunci Jawaban: {card.answer}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-slate-900 text-slate-100 rounded-xl space-y-1">
                <span className="text-xs text-amber-400 font-semibold">Prompt Desain Papan Game (Midjourney):</span>
                <p className="text-xs font-mono text-slate-300">{result.visualPrompt}</p>
              </div>
            </div>
          )}

          {/* Comic output */}
          {toolType === 'comic' && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {result.panels?.map((panel: { panelNumber: number; visual: string; dialogue: string; imagePrompt: string }) => (
                  <div key={panel.panelNumber} className="p-4 rounded-2xl border border-slate-200 bg-pink-50/20 space-y-3">
                    <span className="text-xs font-bold text-pink-700 font-display">
                      PANEL {panel.panelNumber}
                    </span>
                    <p className="text-xs text-slate-700"><strong>Visual:</strong> {panel.visual}</p>
                    <div className="p-3 bg-white rounded-xl border border-pink-100 text-xs italic text-slate-900 font-medium">
                      "{panel.dialogue}"
                    </div>
                    <div className="p-2.5 bg-slate-900 rounded-lg text-[11px] font-mono text-slate-300">
                      <span className="text-sky-400 block font-sans font-semibold mb-1">Image Prompt:</span>
                      {panel.imagePrompt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Flashcard output */}
          {toolType === 'flashcard' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {result.cards?.map((card: { front: string; back: string; funFact: string; imagePrompt: string }, idx: number) => (
                <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-200 hover:shadow-md transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      Kartu #{idx + 1}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 font-display mt-1">
                      {card.front}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {card.back}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-amber-700 font-semibold block mb-1">
                      Fakta Unik:
                    </span>
                    <p className="text-xs text-slate-500 italic">{card.funFact}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};
