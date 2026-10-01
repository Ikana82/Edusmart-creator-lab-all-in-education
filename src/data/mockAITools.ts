import { AITool } from '../types';

export const mockAIToolsDirectory: AITool[] = [
  // AI TEKS
  {
    id: 'tool-text-01',
    name: 'Google Gemini',
    category: 'text',
    categoryLabel: 'AI untuk Teks',
    description: 'Model multimodal canggih dari Google dengan jendela konteks raksasa, sangat piawai menyusun kurikulum, LKPD, rubrik, dan modul ajar.',
    bestFor: 'Penyusunan RPP, LKPD, Silabus, dan Analisis Dokumen Pendidikan',
    websiteUrl: 'https://gemini.google.com',
    iconName: 'Sparkles',
    popular: true,
    pricing: 'Gratis & Berbayar'
  },
  {
    id: 'tool-text-02',
    name: 'Claude 3.5 Sonnet',
    category: 'text',
    categoryLabel: 'AI untuk Teks',
    description: 'Model bahasa dengan gaya penulisan paling natural, empatik, serta penalaran instruksi tingkat tinggi untuk materi teks cerita anak.',
    bestFor: 'Naskah Cerita Anak, Buku Dongeng, dan Teks Literasi Bahasa',
    websiteUrl: 'https://claude.ai',
    iconName: 'MessageSquareText',
    popular: true,
    pricing: 'Freemium'
  },
  {
    id: 'tool-text-03',
    name: 'ChatGPT Plus',
    category: 'text',
    categoryLabel: 'AI untuk Teks',
    description: 'Platform AI serbaguna dengan dukungan Custom GPTs pendidikan dan browsing web untuk riset materi terkini.',
    bestFor: 'Brainstorming Ide Topik, Soal Kuis Otomatis, dan Konsultasi Mengajar',
    websiteUrl: 'https://chatgpt.com',
    iconName: 'Bot',
    popular: true,
    pricing: 'Freemium'
  },

  // AI GAMBAR
  {
    id: 'tool-img-01',
    name: 'Midjourney',
    category: 'image',
    categoryLabel: 'AI untuk Gambar',
    description: 'Generator gambar dengan estetika seni paling kaya, ideal untuk ilustrasi buku cerita anak, poster kelas artistik, dan cover e-book.',
    bestFor: 'Ilustrasi Buku Bergambar, Seni Visual Edukatif, dan Karakter Maskot',
    websiteUrl: 'https://midjourney.com',
    iconName: 'Image',
    popular: true,
    pricing: 'Berbayar'
  },
  {
    id: 'tool-img-02',
    name: 'Ideogram AI',
    category: 'image',
    categoryLabel: 'AI untuk Gambar',
    description: 'Generator gambar dengan keunggulan typography dan teks on-image yang sangat presisi, cocok untuk flashcard dan poster bertulisan.',
    bestFor: 'Flashcard Huruf, Poster Tipografi Edukasi, dan Label Kelas',
    websiteUrl: 'https://ideogram.ai',
    iconName: 'Type',
    popular: true,
    pricing: 'Freemium'
  },
  {
    id: 'tool-img-03',
    name: 'Recraft.ai',
    category: 'image',
    categoryLabel: 'AI untuk Gambar',
    description: 'Spesialis pembuat ikon vektor, ilustrasi 2D clean, dan palet warna konsisten yang dapat diunduh dalam format SVG tanpa pecah.',
    bestFor: 'Vektor Worksheet, Clipart Ramah Anak, dan Ikon Pembelajaran',
    websiteUrl: 'https://recraft.ai',
    iconName: 'Palette',
    pricing: 'Freemium'
  },

  // AI VIDEO
  {
    id: 'tool-vid-01',
    name: 'Kling AI',
    category: 'video',
    categoryLabel: 'AI untuk Video',
    description: 'Model video AI generasi baru dengan fisika gerakan realistis dan durasi halus hingga beberapa detik per adegan.',
    bestFor: 'Animasi Satwa Liar, Peraga Fenomena Alam, dan Storyboard Video',
    websiteUrl: 'https://klingai.org',
    iconName: 'Video',
    popular: true,
    pricing: 'Freemium'
  },
  {
    id: 'tool-vid-02',
    name: 'Runway Gen-3 Alpha',
    category: 'video',
    categoryLabel: 'AI untuk Video',
    description: 'Platform video sinematik dengan kendali kamera multi-sudut dan motion brush presisi untuk kreator konten edukasi visual.',
    bestFor: 'Video Pengantar Pembelajaran Sinematik dan B-Roll Edukasi',
    websiteUrl: 'https://runwayml.com',
    iconName: 'Film',
    popular: true,
    pricing: 'Freemium'
  },
  {
    id: 'tool-vid-03',
    name: 'HeyGen',
    category: 'video',
    categoryLabel: 'AI untuk Video',
    description: 'Avatar AI berbicara dengan sinkronisasi bibir akurat untuk membuat guru virtual dan penjelasan materi multi-bahasa.',
    bestFor: 'Video Pengajaran Tutor Virtual dan Edukasi Bahasa Asing',
    websiteUrl: 'https://heygen.com',
    iconName: 'Tv',
    pricing: 'Freemium'
  },

  // AI AUDIO
  {
    id: 'tool-aud-01',
    name: 'Suno AI',
    category: 'audio',
    categoryLabel: 'AI untuk Audio',
    description: 'Platform generator musik dan lagu lengkap dengan vokal dan aransemen instrumen hanya dari naskah lirik pendek.',
    bestFor: 'Lagu Edukasi Anak, Jingle Hafalan Rumus, dan Lagu Pembuka Kelas',
    websiteUrl: 'https://suno.com',
    iconName: 'Music',
    popular: true,
    pricing: 'Freemium'
  },
  {
    id: 'tool-aud-02',
    name: 'ElevenLabs',
    category: 'audio',
    categoryLabel: 'AI untuk Audio',
    description: 'Voiceover AI paling ekspresif dengan intonasi hangat, dapat mengkloning suara atau memilih karakter suara dongeng anak.',
    bestFor: 'Pengisi Suara Storytelling, Narasi Video Animasi, dan Audio E-Book',
    websiteUrl: 'https://elevenlabs.io',
    iconName: 'Mic',
    popular: true,
    pricing: 'Freemium'
  },
  {
    id: 'tool-aud-03',
    name: 'Udio',
    category: 'audio',
    categoryLabel: 'AI untuk Audio',
    description: 'Generator musik dengan fidelitas suara tinggi dan variasi genre kaya untuk latar instrumen video belajar yang tenang.',
    bestFor: 'Backsound Musik Meditatif Belajar dan Lagu Anak Berima',
    websiteUrl: 'https://udio.com',
    iconName: 'Headphones',
    pricing: 'Freemium'
  },

  // AI PRESENTASI
  {
    id: 'tool-pres-01',
    name: 'Gamma App',
    category: 'presentation',
    categoryLabel: 'AI untuk Presentasi',
    description: 'Membuat slide presentasi dan materi pengajaran interaktif yang indah hanya dengan mengetikkan topik atau paste dokumen silabus.',
    bestFor: 'Slide Presentasi Mengajar Interaktif dan Modul Web Siswa',
    websiteUrl: 'https://gamma.app',
    iconName: 'Presentation',
    popular: true,
    pricing: 'Freemium'
  },
  {
    id: 'tool-pres-02',
    name: 'SlidesAI',
    category: 'presentation',
    categoryLabel: 'AI untuk Presentasi',
    description: 'Ekstensi Google Slides yang langsung merangkum teks materi menjadi slide berstruktur rapi dalam hitungan detik.',
    bestFor: 'Integrasi Langsung Google Slides di Kelas Sekolah',
    websiteUrl: 'https://slidesai.io',
    iconName: 'Layers',
    pricing: 'Freemium'
  },

  // AI DESAIN
  {
    id: 'tool-des-01',
    name: 'Canva Magic Studio',
    category: 'design',
    categoryLabel: 'AI untuk Desain',
    description: 'Suite lengkap alat desain ramah guru dengan ribuan template lembar kerja, magic design, dan penghapus latar belakang otomatis.',
    bestFor: 'Layout Worksheet Siap Cetak, Sertifikat Siswa, dan Poster Mading',
    websiteUrl: 'https://canva.com',
    iconName: 'LayoutTemplate',
    popular: true,
    pricing: 'Freemium (Gratis untuk Guru Terverifikasi)'
  },
  {
    id: 'tool-des-02',
    name: 'Figma AI',
    category: 'design',
    categoryLabel: 'AI untuk Desain',
    description: 'Desain kolaboratif dengan kecerdasan buatan untuk merancang antarmuka media belajar digital dan sistem kartu permainan edukasi.',
    bestFor: 'Prototipe Game Edukasi, UI Aplikasi Belajar, dan Kartu Interaktif',
    websiteUrl: 'https://figma.com',
    iconName: 'PenTool',
    pricing: 'Freemium'
  }
];
