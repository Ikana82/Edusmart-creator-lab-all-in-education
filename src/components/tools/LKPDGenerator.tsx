import React, { useState } from 'react';
import { geminiService } from '../../services/geminiService';
import { LKPDProject, EducationLevel } from '../../types';
import {
  FileSpreadsheet,
  Sparkles,
  ArrowLeft,
  Copy,
  Check,
  RotateCcw,
  Save,
  CheckCircle2,
  Table,
  HelpCircle,
  Award
} from 'lucide-react';

interface LKPDGeneratorProps {
  onBack: () => void;
  onSaveLKPD: (lkpd: LKPDProject) => void;
  onNotify: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

export const LKPDGenerator: React.FC<LKPDGeneratorProps> = ({
  onBack,
  onSaveLKPD,
  onNotify
}) => {
  const [topic, setTopic] = useState('Ekosistem Lingkungan & Siklus Rantai Makanan');
  const [jenjang, setJenjang] = useState<EducationLevel>('SD');
  const [materiPokok, setMateriPokok] = useState('Hubungan Antar Makhluk Hidup dalam Ekosistem');
  const [modelPembelajaran, setModelPembelajaran] = useState('Inquiry-Based Learning (Penyelidikan Terbimbing)');

  const [isGenerating, setIsGenerating] = useState(false);
  const [lkpd, setLkpd] = useState<LKPDProject | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await geminiService.generateLKPD({
        topic,
        jenjang,
        materiPokok,
        modelPembelajaran
      });
      setLkpd(res);
      onNotify('LKPD Kurikulum Merdeka berhasil disusun!', 'success');
    } catch {
      onNotify('Gagal membuat LKPD.', 'error');
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

  const handleSave = () => {
    if (lkpd) {
      onSaveLKPD(lkpd);
      setSavedSuccess(true);
      onNotify('LKPD berhasil disimpan ke proyek lokal Anda!', 'success');
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Tools</span>
        </button>
        <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md">
          Kurikulum Merdeka
        </span>
      </div>

      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 text-teal-700 text-xs font-semibold">
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>LKPD Generator</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 font-display">
          Rancang Lembar Kerja Peserta Didik (LKPD)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Buat dokumen penyelidikan ilmiah berbasis inkuiri, proyek, atau masalah nyata lengkap dengan rubrik penilaian kinerja.
        </p>
      </div>

      {/* Inputs */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Topik Pembelajaran
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Contoh: Ekosistem Lingkungan, Adaptasi Hewan, Sistem Tata Surya..."
              className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:border-teal-500 focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Jenjang Pendidikan
            </label>
            <select
              value={jenjang}
              onChange={(e) => setJenjang(e.target.value as EducationLevel)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            >
              <option value="PAUD/TK">PAUD / TK</option>
              <option value="SD">SD (Sekolah Dasar)</option>
              <option value="SMP">SMP</option>
              <option value="SMA">SMA</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Model Pembelajaran
            </label>
            <select
              value={modelPembelajaran}
              onChange={(e) => setModelPembelajaran(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800"
            >
              <option value="Inquiry-Based Learning">Inquiry-Based Learning (Penyelidikan Terbimbing)</option>
              <option value="Problem-Based Learning">Problem-Based Learning (PBL)</option>
              <option value="Project-Based Learning">Project-Based Learning (PjBL)</option>
              <option value="Discovery Learning">Discovery Learning</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isGenerating ? 'Menyusun LKPD...' : 'Generate LKPD Kurikulum Merdeka'}</span>
          </button>
        </div>
      </div>

      {/* Output LKPD */}
      {isGenerating ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-teal-200 border-t-teal-600 animate-spin" />
          <p className="text-xs text-slate-500">
            Menyusun Capaian Pembelajaran, tahapan inkuiri, dan rubrik asesmen autentik...
          </p>
        </div>
      ) : lkpd ? (
        <div className="space-y-6">
          {/* Header Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                {lkpd.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Jenjang: {lkpd.jenjang} · Model: {modelPembelajaran}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => copyText(JSON.stringify(lkpd, null, 2), 'all')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors cursor-pointer"
              >
                {copiedKey === 'all' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Dokumen</span>
              </button>

              <button
                onClick={handleSave}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
              >
                {savedSuccess ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
                <span>{savedSuccess ? 'Tersimpan' : 'Save'}</span>
              </button>

              <button
                onClick={handleGenerate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Regenerate</span>
              </button>
            </div>
          </div>

          {/* LKPD Document Body */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 space-y-8">
            {/* Header info */}
            <div className="border-b pb-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>LEMBAR KERJA PESERTA DIDIK (LKPD)</span>
                <span>TAHUN AJARAN 2026</span>
              </div>
              <h2 className="text-xl font-bold font-display text-slate-900">{lkpd.title}</h2>
              <div className="grid grid-cols-2 gap-4 text-xs text-slate-600 pt-2 border-t border-dotted">
                <div>Nama Kelompok / Anggota: ____________________</div>
                <div>Kelas / Semester: {lkpd.jenjang} / Ganjil</div>
              </div>
            </div>

            {/* Capaian Pembelajaran */}
            <div className="p-4 bg-teal-50/50 rounded-2xl border border-teal-100 space-y-2">
              <span className="text-xs font-bold text-teal-900 uppercase tracking-wider">
                Capaian Pembelajaran (CP):
              </span>
              <p className="text-xs text-teal-800 leading-relaxed">{lkpd.capaianPembelajaran}</p>
            </div>

            {/* Tujuan Pembelajaran */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Tujuan Pembelajaran (TP):
              </h4>
              <div className="space-y-1.5">
                {lkpd.tujuanPembelajaran.map((tp, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                    <span>{tp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Aktivitas Eksplorasi (Sintaks Inkuiri) */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Table className="w-4 h-4 text-slate-500" />
                <span>Langkah Penyelidikan Ilmiah Siswa:</span>
              </h4>

              <div className="space-y-3">
                {lkpd.aktivitasEksplorasi.map((akt) => (
                  <div key={akt.langkah} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                    <div className="text-xs font-bold text-teal-900">
                      Langkah {akt.langkah}: {akt.instruksi}
                    </div>
                    {akt.pertanyaanPanduan && (
                      <p className="text-xs text-slate-600 italic">
                        Panduan Berpikir: {akt.pertanyaanPanduan}
                      </p>
                    )}
                    <div className="h-14 border border-dashed border-slate-300 rounded-lg bg-white flex items-center px-3 text-[11px] text-slate-400">
                      [ Lembar isian pengamatan dan data kelompok ]
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Soal Analitis HOTS */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <span>Pertanyaan Analisis Kritis (HOTS):</span>
              </h4>
              <div className="space-y-2">
                {lkpd.soalAnalitis.map((soal, i) => (
                  <div key={i} className="p-3.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 space-y-1">
                    <span className="font-semibold text-teal-700">{i + 1}. </span>
                    <span>{soal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rubrik Penilaian */}
            <div className="space-y-3 pt-4 border-t">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Rubrik Penilaian Kinerja Guru:</span>
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700">
                      <th className="p-2.5 border border-slate-200">Aspek yang Dinilai</th>
                      <th className="p-2.5 border border-slate-200">Kriteria Baik (Skor 3-4)</th>
                      <th className="p-2.5 border border-slate-200">Kriteria Cukup (Skor 1-2)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lkpd.rubrikPenilaian.map((rubrik, i) => (
                      <tr key={i} className="border-b border-slate-200">
                        <td className="p-2.5 font-semibold text-slate-800 border border-slate-200">
                          {rubrik.aspek}
                        </td>
                        <td className="p-2.5 text-slate-600 border border-slate-200">
                          {rubrik.kriteriaBaik}
                        </td>
                        <td className="p-2.5 text-slate-500 border border-slate-200">
                          {rubrik.kriteriaCukup}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
