import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { MainTab } from './Sidebar';

interface FooterProps {
  onNavigate: (tab: MainTab, subcat?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-12 px-6 sm:px-12 text-slate-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-900 font-display">EduSmart Creator Lab</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Platform edukasi digital all-in-one untuk merancang, membuat, dan mengembangkan produk edukasi dengan AI.
          </p>
          <div className="text-[11px] text-slate-400">
            Create · Learn · Teach with AI
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-semibold text-slate-900 font-display mb-3">Materi Edukasi</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('resources', 'worksheet')} className="hover:text-indigo-600">
                Worksheet & Lembar Kerja
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('resources', 'lkpd')} className="hover:text-indigo-600">
                LKPD Kurikulum Merdeka
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('resources', 'game')} className="hover:text-indigo-600">
                Game Edukasi Anak
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('resources', 'comic')} className="hover:text-indigo-600">
                Komik Strip Edukasi
              </button>
            </li>
          </ul>
        </div>

        {/* Tools AI */}
        <div>
          <h4 className="text-xs font-semibold text-slate-900 font-display mb-3">Tools AI Utama</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => onNavigate('tools', 'tool-storyboard')} className="hover:text-indigo-600">
                Storyboard Generator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('tools', 'tool-worksheet')} className="hover:text-indigo-600">
                Worksheet Generator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('tools', 'tool-video')} className="hover:text-indigo-600">
                Video Script Generator
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('tools', 'tool-song')} className="hover:text-indigo-600">
                Lagu Edukasi Generator
              </button>
            </li>
          </ul>
        </div>

        {/* Target Pengguna */}
        <div>
          <h4 className="text-xs font-semibold text-slate-900 font-display mb-3">Dibuat Khusus Untuk</h4>
          <p className="text-xs leading-relaxed text-slate-500 mb-3">
            Guru sekolah, orang tua homeschooling, tutor bimbel, educator digital, serta kreator produk edukasi mandiri.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span>Dirancang dengan cinta untuk pendidikan Indonesia</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
        <div>© 2026 EduSmart Creator Lab. Seluruh hak cipta dilindungi.</div>
        <div className="flex items-center gap-4">
          <button onClick={() => onNavigate('landing')} className="hover:text-slate-600">Tentang Platform</button>
          <span>·</span>
          <button onClick={() => onNavigate('prompts')} className="hover:text-slate-600">Prompt Library</button>
          <span>·</span>
          <button onClick={() => onNavigate('directory')} className="hover:text-slate-600">Direktori AI</button>
        </div>
      </div>
    </footer>
  );
};
