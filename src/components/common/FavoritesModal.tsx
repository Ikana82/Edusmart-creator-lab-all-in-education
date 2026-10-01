import React from 'react';
import { Modal } from './Modal';
import { PromptTemplate, AITool } from '../../types';
import { Heart, Copy, ExternalLink, Trash2 } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoritePrompts: PromptTemplate[];
  favoriteTools: AITool[];
  onRemovePromptFav: (id: string) => void;
  onRemoveToolFav: (id: string) => void;
  onCopyPrompt: (text: string) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favoritePrompts,
  favoriteTools,
  onRemovePromptFav,
  onRemoveToolFav,
  onCopyPrompt
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Item Favorit Anda"
      subtitle="Daftar prompt dan rekomendasi tools AI yang Anda simpan untuk referensi cepat"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Favorited Prompts */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>Prompt Tersimpan ({favoritePrompts.length})</span>
          </h4>

          {favoritePrompts.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Belum ada prompt yang ditandai favorit.</p>
          ) : (
            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              {favoritePrompts.map((p) => (
                <div
                  key={p.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                      {p.categoryLabel}
                    </span>
                    <h5 className="font-semibold text-slate-800">{p.title}</h5>
                    <p className="text-slate-500 text-[11px] line-clamp-1">{p.promptText}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onCopyPrompt(p.promptText)}
                      className="p-1.5 text-slate-500 hover:text-indigo-600 rounded bg-white border border-slate-200"
                      title="Salin Prompt"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onRemovePromptFav(p.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                      title="Hapus dari Favorit"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Favorited AI Tools */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-900 font-display uppercase tracking-wider flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>AI Tools Tersimpan ({favoriteTools.length})</span>
          </h4>

          {favoriteTools.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Belum ada tools AI yang ditandai favorit.</p>
          ) : (
            <div className="space-y-2.5 max-h-48 overflow-y-auto">
              {favoriteTools.map((t) => (
                <div
                  key={t.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <h5 className="font-semibold text-slate-800">{t.name}</h5>
                    <p className="text-slate-500 text-[11px]">{t.bestFor}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={t.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 bg-white border border-slate-200 rounded text-slate-700 hover:text-indigo-600 flex items-center gap-1 text-[11px]"
                    >
                      <span>Buka</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      onClick={() => onRemoveToolFav(t.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                      title="Hapus dari Favorit"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
