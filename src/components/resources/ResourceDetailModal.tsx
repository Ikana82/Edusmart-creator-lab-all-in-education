import React, { useState } from 'react';
import { EducationalResource } from '../../types';
import { Modal } from '../common/Modal';
import { Check, Copy, Download, BookOpen, Layers, CheckCircle2, Tag } from 'lucide-react';

interface ResourceDetailModalProps {
  resource: EducationalResource | null;
  isOpen: boolean;
  onClose: () => void;
  onCopyPrompt: (text: string) => void;
}

export const ResourceDetailModal: React.FC<ResourceDetailModalProps> = ({
  resource,
  isOpen,
  onClose,
  onCopyPrompt
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!resource) return null;

  const handleCopyPrompt = () => {
    if (resource.promptTemplate) {
      onCopyPrompt(resource.promptTemplate);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    }
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    // Create text file download for user convenience
    const content = `EDUSMART CREATOR LAB - MATERI EDUKASI
=========================================
Judul: ${resource.title}
Kategori: ${resource.categoryLabel}
Jenjang: ${resource.educationLevel} (${resource.ageRange})
Tema: ${resource.theme}
Tingkat Kesulitan: ${resource.difficulty}

DESKRIPSI:
${resource.description}

TUJUAN PEMBELAJARAN:
${resource.learningObjectives ? resource.learningObjectives.map((o, i) => `${i + 1}. ${o}`).join('\n') : '-'}

PETUNJUK PENGGUNAAN:
${resource.instructions || '-'}

PROMPT AI PENDUKUNG:
${resource.promptTemplate || '-'}
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resource.title.toLowerCase().replace(/\s+/g, '-')}-edusmart.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={resource.title}
      subtitle={`${resource.categoryLabel} · ${resource.educationLevel} (${resource.ageRange})`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Hero image and quick meta */}
        <div className="relative rounded-xl overflow-hidden h-56 bg-slate-100 border border-slate-200">
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-lg">
            {resource.categoryLabel}
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-md">
            Tingkat: {resource.difficulty}
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-semibold text-slate-900 font-display uppercase tracking-wider mb-1.5">
            Deskripsi Materi
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {resource.description}
          </p>
        </div>

        {/* Learning Objectives */}
        {resource.learningObjectives && resource.learningObjectives.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-slate-900 font-display uppercase tracking-wider mb-2">
              Tujuan Pembelajaran (Learning Objectives)
            </h4>
            <div className="space-y-2">
              {resource.learningObjectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        {resource.instructions && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <h4 className="text-xs font-semibold text-slate-900 font-display uppercase tracking-wider mb-1">
              Petunjuk Penggunaan di Kelas / Rumah
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {resource.instructions}
            </p>
          </div>
        )}

        {/* Prompt Template */}
        {resource.promptTemplate && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold text-slate-900 font-display uppercase tracking-wider">
                Prompt Text-to-Image / AI Terkait
              </h4>
              <button
                onClick={handleCopyPrompt}
                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? 'Prompt Tersalin!' : 'Copy Prompt'}</span>
              </button>
            </div>
            <div className="p-3 bg-slate-900 text-slate-200 rounded-xl text-xs font-mono leading-relaxed border border-slate-800">
              {resource.promptTemplate}
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[11px] text-slate-400">Tags:</span>
          {resource.tags.map((tag, i) => (
            <span key={i} className="text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              {tag}
            </span>
          ))}
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Tutup
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-2"
          >
            {downloadSuccess ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Download className="w-3.5 h-3.5" />}
            <span>{downloadSuccess ? 'Tersimpan ke Unduhan' : 'Download Materi (TXT)'}</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
