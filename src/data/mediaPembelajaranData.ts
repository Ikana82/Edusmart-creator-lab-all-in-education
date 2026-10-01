export interface VisualStyleOption {
  id: string;
  name: string;
  category: '3D' | '2D & Vector' | 'Artistic & Traditional' | 'Anime & Cute';
  description: string;
  promptModifier: string;
  bgGradient: string;
  accentColor: string;
}

export const VISUAL_STYLES: VisualStyleOption[] = [
  {
    id: '3d-pixar',
    name: '3D Pixar Style',
    category: '3D',
    description: 'Karakter 3D ekspresif khas animasi Pixar/Disney, pencahayaan lembut, tekstur halus, dan mata ekspresif yang ramah anak.',
    promptModifier: '3D Pixar animation style, Disney Pixar render, soft cinematic studio lighting, subsurface scattering, expressive characters, vibrant warm tones, ultra clean textures',
    bgGradient: 'from-amber-400 to-orange-500',
    accentColor: '#f59e0b'
  },
  {
    id: '3d-clay-animation',
    name: '3D Clay Animation',
    category: '3D',
    description: 'Gaya animasi stop-motion plastisin/tanah liat dengan sidik jari mikro halus, tekstur clay matte, dan bentuk bulat menggemaskan.',
    promptModifier: 'Stop-motion claymation style, tactile plasticine clay textures, subtle thumbprint details, charming clay model, soft diffuse lighting, handcrafted feel',
    bgGradient: 'from-emerald-400 to-teal-600',
    accentColor: '#10b981'
  },
  {
    id: '3d-felt-toys',
    name: '3D Felt Toys',
    category: '3D',
    description: 'Tekstur kain flanel berbulu lembut (needle felted wool) dengan jahitan tepi terlihat, nuansa hangat dan ramah balita.',
    promptModifier: 'Needle felting craft style, warm fuzzy wool felt textures, visible handcrafted stitches, cute felted characters, cozy soft lighting, tactile felt materials',
    bgGradient: 'from-pink-400 to-rose-500',
    accentColor: '#f43f5e'
  },
  {
    id: '3d-plastic-toy',
    name: '3D Plastic Toy',
    category: '3D',
    description: 'Gaya mainan plastik mulus (vinyl collectible toy), permukaan glossy atau matte mengkilap, warna cerah dan kokoh.',
    promptModifier: 'Designer vinyl art toy style, smooth moulded plastic surfaces, vibrant solid colors, playful chunky proportions, gentle studio reflections',
    bgGradient: 'from-blue-400 to-indigo-600',
    accentColor: '#3b82f6'
  },
  {
    id: 'watercolor-storybook',
    name: 'Watercolor Storybook',
    category: 'Artistic & Traditional',
    description: 'Lukisan cat air buku cerita klasik, sapuan kuas lembut, gradasi cat air transparan, dan garis pensil artistik.',
    promptModifier: 'Children storybook watercolor illustration, whimsical soft washes, delicate pencil lineart, textured handmade paper grain, gentle bleeding pigments',
    bgGradient: 'from-violet-400 to-purple-600',
    accentColor: '#8b5cf6'
  },
  {
    id: 'paper-cut',
    name: 'Paper Cut',
    category: 'Artistic & Traditional',
    description: 'Seni guntingan kertas bertumpuk (multi-layered papercraft) dengan bayangan drop-shadow realistis antar lapisan.',
    promptModifier: 'Layered paper cut craft art, 3D papercraft diorama, clean precise paper cut edges, realistic soft drop shadows between layers, tactile paper texture',
    bgGradient: 'from-cyan-400 to-blue-600',
    accentColor: '#06b6d4'
  },
  {
    id: 'flat-cartoon',
    name: 'Flat Cartoon',
    category: '2D & Vector',
    description: 'Ilustrasi kartun 2D modern yang bersih, garis tegas, bidang warna solid tanpa gradasi berlebih, sangat mudah dibaca.',
    promptModifier: 'Modern flat cartoon illustration, bold clean outlines, vibrant solid color fills, minimalist modern graphic design, high contrast clarity',
    bgGradient: 'from-yellow-400 to-amber-500',
    accentColor: '#eab308'
  },
  {
    id: 'anime-chibi',
    name: 'Anime Chibi',
    category: 'Anime & Cute',
    description: 'Karakter anime chibi proporsi kepala besar imut, mata berbinar-binar, warna pastel ceria, dan ekspresi komikal.',
    promptModifier: 'Cute anime chibi art style, big expressive sparkling eyes, adorable kawaii proportions, soft pastel cel-shading, playful cheerful demeanor',
    bgGradient: 'from-fuchsia-400 to-pink-500',
    accentColor: '#d946ef'
  },
  {
    id: '3d-soft-clay-pastel',
    name: '3D Soft Clay Pastel',
    category: '3D',
    description: 'Plastisin lembut dengan palet warna pastel menenangkan (soft peach, mint, baby blue, lilas) yang estetik dan kekinian.',
    promptModifier: '3D soft clay aesthetic, modern pastel color palette, matte clay finish, soothing creamy lighting, minimalist cute rounded geometry',
    bgGradient: 'from-rose-300 to-indigo-300',
    accentColor: '#fb7185'
  },
  {
    id: '3d-crochet-amigurumi',
    name: '3D Crochet / Amigurumi',
    category: 'Artistic & Traditional',
    description: 'Boneka rajut benang wol (amigurumi rajut Jepang), pola rajutan spiral yang mendetail, kancing mata, dan nuansa hangat.',
    promptModifier: 'Japanese amigurumi crochet doll style, intricate woven yarn stitches, soft knitted wool fibers, safety button eyes, warm cozy handicraft atmosphere',
    bgGradient: 'from-lime-400 to-green-600',
    accentColor: '#84cc16'
  },
  {
    id: '3d-clay-glossy',
    name: '3D Clay Glossy (Vibrant & Colorful)',
    category: '3D',
    description: 'Tanah liat mengkilap dengan lapisan pernis berkilau, warna-warni kontras tinggi yang berenergi dan memikat perhatian anak.',
    promptModifier: 'Vibrant glossy 3D clay modeling, shiny varnished resin look, punchy bold saturation, high reflectivity highlights, dynamic fun forms',
    bgGradient: 'from-orange-400 to-rose-600',
    accentColor: '#f97316'
  },
  {
    id: '2d-cartoon',
    name: '2D Cartoon',
    category: '2D & Vector',
    description: 'Gaya kartun animasi klasik TV edukasi anak, garis tepi berkarakter, warna cerah ceria, ramah untuk berbagai jenjang.',
    promptModifier: 'Classic 2D children cartoon style, dynamic animated character lines, cheerful primary and secondary colors, playful lively setting',
    bgGradient: 'from-sky-400 to-blue-500',
    accentColor: '#0284c7'
  },
  {
    id: 'watercolor',
    name: 'Watercolor',
    category: 'Artistic & Traditional',
    description: 'Seni lukis cat air artistik yang elegan, perpaduan warna alami yang mengalir, cocok untuk tema sains, flora fauna, dan lingkungan.',
    promptModifier: 'Pure watercolor painting, translucent wet-on-wet gradients, organic paint splatters, fine pigment granulation on textured watercolor paper',
    bgGradient: 'from-teal-300 to-emerald-500',
    accentColor: '#14b8a6'
  },
  {
    id: '2d-vector-education',
    name: '2D Vector Education',
    category: '2D & Vector',
    description: 'Desain infografis vektor edukasi modern dan presisi, ikon rapi, diagram terstruktur, sangat profesional untuk materi ajar.',
    promptModifier: 'Modern educational vector art, clean iconography, precise shapes, harmonious flat palette, infographic clarity, high-end pedagogical illustration',
    bgGradient: 'from-indigo-400 to-violet-600',
    accentColor: '#6366f1'
  }
];

export interface AgeGroupOption {
  id: string;
  range: string;
  label: string;
  category: string;
  pedagogicalFocus: string;
  suggestedComplexity: string;
}

export const AGE_GROUPS: AgeGroupOption[] = [
  {
    id: 'paud',
    range: '4–6 tahun',
    label: 'PAUD / TK',
    category: 'Usia Dini',
    pedagogicalFocus: 'Visual besar, teks minimal (1-2 kata kunci), suara/musik ceria, maskot hewan/karakter lucu, konsep sensorik dan emosional dasar.',
    suggestedComplexity: 'Sederhana, konkret, penuh warna cerah'
  },
  {
    id: 'sd-rendah',
    range: '7–9 tahun',
    label: 'SD Kelas Rendah (Kelas 1-3)',
    category: 'Pendidikan Dasar Awal',
    pedagogicalFocus: 'Kalimat pendek dan jelas, perpaduan visual interaktif, fakta menarik terapan, kuis bergambar pilihan ganda A/B/C yang menyenangkan.',
    suggestedComplexity: 'Konsep dasar dengan contoh nyata sehari-hari'
  },
  {
    id: 'sd-tinggi',
    range: '10–12 tahun',
    label: 'SD Kelas Tinggi (Kelas 4-6)',
    category: 'Pendidikan Dasar Lanjut',
    pedagogicalFocus: 'Konsep sebab-akibat, diagram alur, klasifikasi, studi kasus lingkungan, kuis tantangan analisis ringan.',
    suggestedComplexity: 'Analitis sederhana, penalaran sebab-akibat'
  },
  {
    id: 'smp',
    range: '13–15 tahun',
    label: 'SMP (Sekolah Menengah Pertama)',
    category: 'Remaja Awal',
    pedagogicalFocus: 'Prinsip ilmiah, struktur data, hubungan logis, studi kasus nyata, navigasi interaktif ala game quest, bahasa komunikatif semi-formal.',
    suggestedComplexity: 'Konseptual dan sistemik terstruktur'
  },
  {
    id: 'sma',
    range: '16–18 tahun',
    label: 'SMA / SMK',
    category: 'Remaja Menengah',
    pedagogicalFocus: 'Aplikasi industri, problem-solving mendalam, pemikiran kritis, kuis studi kasus, visual infografis elegan.',
    suggestedComplexity: 'Komprehensif, kritis, berorientasi solusi'
  },
  {
    id: 'dewasa',
    range: '18+ tahun',
    label: 'Mahasiswa / Umum / Korporat',
    category: 'Pendidikan Tinggi & Profesional',
    pedagogicalFocus: 'Struktur profesional, actionable insights, terminologi standar industri, visual minimalis berwibawa, studi kasus analitik.',
    suggestedComplexity: 'Profesional, berbobot, berbasis data'
  }
];

export interface SlideTemplateItem {
  id: string;
  stepNumber: number;
  slideType:
    | 'cover'
    | 'navigasi'
    | 'tujuan'
    | 'apersepsi'
    | 'materi'
    | 'video'
    | 'rangkuman'
    | 'peta_kuis'
    | 'kuis'
    | 'respon_benar'
    | 'respon_salah'
    | 'penutup';
  title: string;
  purpose: string;
  subtopicHint?: string;
}

export interface PresetTopic {
  id: string;
  title: string;
  defaultAgeId: string;
  defaultStyleId: string;
  defaultMascot: string;
  slides: SlideTemplateItem[];
}

export const PRESET_TOPICS: PresetTopic[] = [
  {
    id: 'ekosistem',
    title: 'Ekosistem dan Keseimbangan Alam',
    defaultAgeId: 'sd-rendah',
    defaultStyleId: 'flat-cartoon',
    defaultMascot: 'Penjelajah alam cilik berbaju safari hijau yang ceria, membawa kaca pembesar dan tas ransel petualang',
    slides: [
      { id: 's1', stepNumber: 1, slideType: 'cover', title: 'Cover Presentasi', purpose: 'Judul Utama: Petualangan Menjelajah Ekosistem Alam!' },
      { id: 's2', stepNumber: 2, slideType: 'navigasi', title: 'Navigasi Menu', purpose: 'Peta Menu: Tujuan Pembelajaran, Materi, Video, & Kuis Seru' },
      { id: 's3', stepNumber: 3, slideType: 'tujuan', title: 'Tujuan Pembelajaran', purpose: 'Kompetensi: Memahami apa itu ekosistem dan komponen penyusunnya' },
      { id: 's4', stepNumber: 4, slideType: 'apersepsi', title: 'Apersepsi: Mengapa Hutan & Taman Begitu Ramai?', purpose: 'Membangkitkan rasa ingin tahu anak tentang tempat tinggal makhluk hidup' },
      { id: 's5', stepNumber: 5, slideType: 'materi', title: 'Materi 1: Apa itu Ekosistem?', purpose: 'Hubungan timbal balik antara makhluk hidup dan lingkungannya', subtopicHint: 'Tempat tinggal dan hubungan makhluk hidup' },
      { id: 's6', stepNumber: 6, slideType: 'materi', title: 'Materi 2: Siapa Saja yang Hidup di Sana?', purpose: 'Komponen biotik: Hewan lucu, tanaman hijau, dan serangga', subtopicHint: 'Hewan dan tumbuhan' },
      { id: 's7', stepNumber: 7, slideType: 'materi', title: 'Materi 3: Benda Tak Hidup yang Sangat Penting', purpose: 'Komponen abiotik: Air jernih, tanah subur, udara sejuk, dan sinar matahari', subtopicHint: 'Air, tanah, matahari' },
      { id: 's8', stepNumber: 8, slideType: 'materi', title: 'Materi 4: Contoh Ekosistem di Darat', purpose: 'Hutan belantara yang rindang, padang rumput, dan taman bunga sekolah', subtopicHint: 'Hutan dan taman' },
      { id: 's9', stepNumber: 9, slideType: 'materi', title: 'Materi 5: Contoh Ekosistem di Air', purpose: 'Sungai berarus jernih, danau teduh, dan lautan luas penuh terumbu karang', subtopicHint: 'Sungai dan laut' },
      { id: 's10', stepNumber: 10, slideType: 'video', title: 'Video Pembelajaran Interaktif', purpose: 'Tonton animasi kehidupan di dalam hutan hujan tropis', subtopicHint: 'Video Animasi Ekosistem' },
      { id: 's11', stepNumber: 11, slideType: 'rangkuman', title: 'Rangkuman / Summary', purpose: 'Poin penting: Alam saling membutuhkan untuk tetap lestari', subtopicHint: 'Peta Konsep Ringkas' },
      { id: 's12', stepNumber: 12, slideType: 'peta_kuis', title: 'Peta Perjalanan Kuis', purpose: 'Jalur misi 5 pos tantangan penjelajah alam cilik', subtopicHint: 'Level 1 hingga 5' },
      { id: 's13', stepNumber: 13, slideType: 'kuis', title: 'Kuis 1: Siapakah Komponen Biotik?', purpose: 'Pertanyaan pilihan ganda seputar makhluk hidup', subtopicHint: 'Pilihan A: Kelinci, B: Batu, C: Pasir' },
      { id: 's14', stepNumber: 14, slideType: 'kuis', title: 'Kuis 2: Benda Abiotik bagi Tumbuhan', purpose: 'Apa yang dibutuhkan tumbuhan untuk fotosintesis?', subtopicHint: 'Pilihan A: Es krim, B: Cahaya Matahari, C: Sepatu' },
      { id: 's15', stepNumber: 15, slideType: 'kuis', title: 'Kuis 3: Dimanakah Ikan Badut Hidup?', purpose: 'Menebak ekosistem air laut dan terumbu karang', subtopicHint: 'Pilihan A: Gurun pasir, B: Terumbu karang laut, C: Puncak gunung' },
      { id: 's16', stepNumber: 16, slideType: 'kuis', title: 'Kuis 4: Rantai Makanan Sederhana', purpose: 'Siapa yang memakan rumput di padang sabana?', subtopicHint: 'Pilihan A: Rusa, B: Elang, C: Buaya' },
      { id: 's17', stepNumber: 17, slideType: 'kuis', title: 'Kuis 5: Cara Menjaga Ekosistem Kita', purpose: 'Tindakan baik untuk menjaga alam sekitar', subtopicHint: 'Pilihan A: Membuang sampah di tempatnya, B: Mencabut bunga, C: Mengotori sungai' },
      { id: 's18', stepNumber: 18, slideType: 'respon_benar', title: 'Respon Benar: Hebat Sekali, Jawabanmu Tepat!', purpose: 'Slide perayaan keberhasilan dengan bintang berkilau dan maskot bersorak' },
      { id: 's19', stepNumber: 19, slideType: 'respon_salah', title: 'Respon Salah: Ayo Coba Lagi, Kamu Pasti Bisa!', purpose: 'Slide motivasi ramah dengan petunjuk lembut tanpa mematahkan semangat' },
      { id: 's20', stepNumber: 20, slideType: 'penutup', title: 'Penutup & Salam Kelulusan', purpose: 'Pesan cinta lingkungan dan lencana gelar "Sahabat Alam Cilik"' }
    ]
  },
  {
    id: 'tata-surya',
    title: 'Tata Surya dan Keajaiban Luar Angkasa',
    defaultAgeId: 'sd-rendah',
    defaultStyleId: '3d-pixar',
    defaultMascot: 'Astronot cilik berhelm bulat ramah dengan stiker bintang dan koper roket kecil',
    slides: [
      { id: 'ts1', stepNumber: 1, slideType: 'cover', title: 'Cover Presentasi', purpose: 'Misi Antariksa: Menjelajah Tata Surya Kita!' },
      { id: 'ts2', stepNumber: 2, slideType: 'navigasi', title: 'Pusat Kendali Navigasi', purpose: 'Menu Utama: Misi Belajar, Orbit Planet, Video Roket, & Kuis Bintang' },
      { id: 'ts3', stepNumber: 3, slideType: 'tujuan', title: 'Tujuan Pembelajaran', purpose: 'Mengenal Matahari sebagai pusat dan urutan 8 planet indah' },
      { id: 'ts4', stepNumber: 4, slideType: 'apersepsi', title: 'Apersepsi: Cahaya Malam di Langit', purpose: 'Mengapa bintang berkelap-kelip dan bulan berganti bentuk?' },
      { id: 'ts5', stepNumber: 5, slideType: 'materi', title: 'Materi 1: Matahari Sang Bintang Raksasa', purpose: 'Matahari pusat tata surya yang memancarkan panas dan cahaya', subtopicHint: 'Sumber energi terbesar' },
      { id: 'ts6', stepNumber: 6, slideType: 'materi', title: 'Materi 2: Planet Terdekat (Merkurius & Venus)', purpose: 'Merkurius si mungil lincah dan Venus si bintang kejora panas', subtopicHint: 'Planet bebatuan dalam' },
      { id: 'ts7', stepNumber: 7, slideType: 'materi', title: 'Materi 3: Bumi Rumah Kita & Mars Merah', purpose: 'Bumi berair biru penuh kehidupan dan planet Mars berpasir merah', subtopicHint: 'Planet biru dan merah' },
      { id: 'ts8', stepNumber: 8, slideType: 'materi', title: 'Materi 4: Sang Raksasa Gas (Jupiter & Saturnus)', purpose: 'Jupiter bertubuh super besar dan cincin Saturnus yang mempesona', subtopicHint: 'Raksasa gas bercincin' },
      { id: 'ts9', stepNumber: 9, slideType: 'materi', title: 'Materi 5: Planet Es Dingin (Uranus & Neptunus)', purpose: 'Planet biru es yang misterius di tepi tata surya kita', subtopicHint: 'Planet es terluar' },
      { id: 'ts10', stepNumber: 10, slideType: 'video', title: 'Video Perjalanan Roket Luar Angkasa', purpose: 'Animasi penerbangan dari bumi menuju orbit Saturnus', subtopicHint: 'Simulasi Orbit 3D' },
      { id: 'ts11', stepNumber: 11, slideType: 'rangkuman', title: 'Rangkuman Orbit Antariksa', purpose: 'Peta urutan 8 planet mengelilingi matahari', subtopicHint: 'Infografis Tata Surya' },
      { id: 'ts12', stepNumber: 12, slideType: 'peta_kuis', title: 'Peta Perjalanan Astronaut Kuis', purpose: '5 stasiun ruang angkasa untuk menguji pengetahuanmu', subtopicHint: 'Stasiun Luar Angkasa' },
      { id: 'ts13', stepNumber: 13, slideType: 'kuis', title: 'Kuis 1: Siapakah Pusat Tata Surya?', purpose: 'Menebak benda langit di pusat orbit', subtopicHint: 'Pilihan: Matahari, Bulan, Komet' },
      { id: 'ts14', stepNumber: 14, slideType: 'kuis', title: 'Kuis 2: Planet yang Memiliki Cincin Indah', purpose: 'Menebak planet bercincin es dan batu', subtopicHint: 'Pilihan: Saturnus, Bumi, Merkurius' },
      { id: 'ts15', stepNumber: 15, slideType: 'kuis', title: 'Kuis 3: Planet Terdekat dengan Matahari', purpose: 'Planet urutan pertama', subtopicHint: 'Pilihan: Merkurius, Mars, Jupiter' },
      { id: 'ts16', stepNumber: 16, slideType: 'kuis', title: 'Kuis 4: Mengapa Bumi Spesial?', purpose: 'Memiliki air dan oksigen untuk kehidupan', subtopicHint: 'Pilihan: Ada oksigen & air, Terlalu dingin, Terbuat dari api' },
      { id: 'ts17', stepNumber: 17, slideType: 'kuis', title: 'Kuis 5: Planet Terbesar di Tata Surya', purpose: 'Menebak si raksasa gas', subtopicHint: 'Pilihan: Jupiter, Neptunus, Venus' },
      { id: 'ts18', stepNumber: 18, slideType: 'respon_benar', title: 'Respon Benar: Luar Biasa, Misi Sukses!', purpose: 'Roket meluncur tinggi dengan kembang api bintang' },
      { id: 'ts19', stepNumber: 19, slideType: 'respon_salah', title: 'Respon Salah: Oopps, Cek Koordinat Lagi Ya!', purpose: 'Astronot lucu memegang peta luar angkasa dengan ramah' },
      { id: 'ts20', stepNumber: 20, slideType: 'penutup', title: 'Penutup: Kamu Resmi Jadi Kapten Antariksa!', purpose: 'Pemberian lencana astronaut muda berprestasi' }
    ]
  },
  {
    id: 'siklus-air',
    title: 'Siklus Air dan Hujan yang Bermanfaat',
    defaultAgeId: 'sd-rendah',
    defaultStyleId: '3d-clay-animation',
    defaultMascot: 'Tetesan air lucu bermata bulat ceria bersepatu bot kuning, bernama Piko Si Tetes Air',
    slides: [
      { id: 'sa1', stepNumber: 1, slideType: 'cover', title: 'Cover Presentasi', purpose: 'Dari Mana Datangnya Air Hujan? Petualangan Siklus Air' },
      { id: 'sa2', stepNumber: 2, slideType: 'navigasi', title: 'Navigasi Perjalanan Air', purpose: 'Tujuan, Perjalanan Air, Video Awan, & Uji Pemahaman' },
      { id: 'sa3', stepNumber: 3, slideType: 'tujuan', title: 'Tujuan Pembelajaran', purpose: 'Memahami proses evaporasi, kondensasi, dan presipitasi secara ceria' },
      { id: 'sa4', stepNumber: 4, slideType: 'apersepsi', title: 'Apersepsi: Bau Tanah Saat Hujan Turun', purpose: 'Mengingat aroma hujan dan genangan air yang mengering' },
      { id: 'sa5', stepNumber: 5, slideType: 'materi', title: 'Materi 1: Penguapan (Evaporasi)', purpose: 'Air sungai dan laut hangat naik ke angkasa karena matahari', subtopicHint: 'Air berubah jadi uap air' },
      { id: 'sa6', stepNumber: 6, slideType: 'materi', title: 'Materi 2: Membentuk Awan (Kondensasi)', purpose: 'Uap air berkumpul di langit membentuk awan putih yang sejuk', subtopicHint: 'Uap air berubah jadi titik-titik awan' },
      { id: 'sa7', stepNumber: 7, slideType: 'materi', title: 'Materi 3: Hujan Turun (Presipitasi)', purpose: 'Awan menjadi berat dan menurunkan tetesan air hujan yang segar', subtopicHint: 'Hujan membasahi bumi' },
      { id: 'sa8', stepNumber: 8, slideType: 'materi', title: 'Materi 4: Air Meresap (Infiltrasi)', purpose: 'Air masuk ke tanah subur dan mengalir kembali ke sungai serta danau', subtopicHint: 'Air diserap akar pohon' },
      { id: 'sa9', stepNumber: 9, slideType: 'materi', title: 'Materi 5: Manfaat Air bagi Kita Semua', purpose: 'Untuk minum, tanaman tumbuh subur, dan hewan minum di tepi sungai', subtopicHint: 'Air sumber kehidupan' },
      { id: 'sa10', stepNumber: 10, slideType: 'video', title: 'Video Animasi Siklus Air Hujan', purpose: 'Menyaksikan perjalanan Piko si tetes air dari laut hingga ke awan', subtopicHint: 'Animasi Alur Air' },
      { id: 'sa11', stepNumber: 11, slideType: 'rangkuman', title: 'Rangkuman Lingkaran Air Abadi', purpose: 'Siklus yang terus berputar tanpa henti menjaga bumi tetap hijau', subtopicHint: 'Bagan Melingkar Siklus Air' },
      { id: 'sa12', stepNumber: 12, slideType: 'peta_kuis', title: 'Peta Kuis Tetes Air', purpose: 'Menjawab 5 pertanyaan untuk membawa Piko kembali ke samudra', subtopicHint: 'Tantangan 5 Langkah' },
      { id: 'sa13', stepNumber: 13, slideType: 'kuis', title: 'Kuis 1: Apa yang Membuat Air Menguap?', purpose: 'Menebak peran panas matahari', subtopicHint: 'Pilihan: Sinar Matahari, Kulkas, Angin malam' },
      { id: 'sa14', stepNumber: 14, slideType: 'kuis', title: 'Kuis 2: Apa Nama Kumpulan Uap Air di Langit?', purpose: 'Menebak awan', subtopicHint: 'Pilihan: Awan, Pelangi, Batu' },
      { id: 'sa15', stepNumber: 15, slideType: 'kuis', title: 'Kuis 3: Proses Turunnya Hujan Disebut...', purpose: 'Istilah presipitasi sederhana', subtopicHint: 'Pilihan: Presipitasi/Hujan, Pemasakan, Pembekuan' },
      { id: 'sa16', stepNumber: 16, slideType: 'kuis', title: 'Kuis 4: Kemana Air Hujan Mengalir?', purpose: 'Air mengalir ke sungai, tanah, dan laut', subtopicHint: 'Pilihan: Ke laut & tanah, Menghilang selamanya, Ke bulan' },
      { id: 'sa17', stepNumber: 17, slideType: 'kuis', title: 'Kuis 5: Cara Kita Menghemat Air Bersih', purpose: 'Perilaku hemat air', subtopicHint: 'Pilihan: Menutup keran setelah dipakai, Membiarkan keran bocor, Membuang air' },
      { id: 'sa18', stepNumber: 18, slideType: 'respon_benar', title: 'Respon Benar: Hore! Jawabanmu Segar dan Tepat!', purpose: 'Tetesan air tersenyum lebar dengan pelangi indah melengkung' },
      { id: 'sa19', stepNumber: 19, slideType: 'respon_salah', title: 'Respon Salah: Tidak Apa-apa, Tetap Semangat!', purpose: 'Piko memegang payung warna-warni memberi dorongan semangat' },
      { id: 'sa20', stepNumber: 20, slideType: 'penutup', title: 'Penutup: Jagalah Air Bersih Bumi Kita!', purpose: 'Lencana Pelindung Air Bersih Cilik' }
    ]
  }
];

export function buildDefault20SlideStructure(topic: string, ageRange: string): SlideTemplateItem[] {
  return [
    { id: 's1', stepNumber: 1, slideType: 'cover', title: 'Cover Presentasi', purpose: `Judul Utama: Petualangan Menjelajahi ${topic}` },
    { id: 's2', stepNumber: 2, slideType: 'navigasi', title: 'Navigasi Menu Utama', purpose: 'Menu Interaktif: Tujuan Pembelajaran, Materi, Video, & Kuis Seru' },
    { id: 's3', stepNumber: 3, slideType: 'tujuan', title: 'Tujuan Pembelajaran', purpose: `Kompetensi dasar dan capaian pembelajaran topik ${topic}` },
    { id: 's4', stepNumber: 4, slideType: 'apersepsi', title: 'Apersepsi & Pemantik', purpose: `Pertanyaan rasa ingin tahu tentang ${topic} dalam kehidupan sehari-hari` },
    { id: 's5', stepNumber: 5, slideType: 'materi', title: `Materi 1: Pengenalan ${topic}`, purpose: `Apa itu ${topic} dan mengapa sangat menarik?`, subtopicHint: `Konsep dasar dan definisi ramah ${ageRange}` },
    { id: 's6', stepNumber: 6, slideType: 'materi', title: `Materi 2: Bagian Penting & Karakteristik`, purpose: `Ciri-ciri utama dan komponen penting dari ${topic}`, subtopicHint: 'Karakteristik dan pengenalan fisik/konsep' },
    { id: 's7', stepNumber: 7, slideType: 'materi', title: `Materi 3: Hubungan & Interaksi Menarik`, purpose: `Bagaimana unsur-unsur dalam ${topic} saling berkaitan dan bekerja`, subtopicHint: 'Interaksi dan peran masing-masing' },
    { id: 's8', stepNumber: 8, slideType: 'materi', title: `Materi 4: Contoh Nyata di Sekitar Kita`, purpose: `Penerapan dan fenomena ${topic} yang dapat dilihat langsung`, subtopicHint: 'Contoh konkret lingkungan sekitar' },
    { id: 's9', stepNumber: 9, slideType: 'materi', title: `Materi 5: Fakta Unik & Fakta Menakjubkan`, purpose: `Fakta seru yang memicu antusiasme belajar siswa`, subtopicHint: 'Fakta mengejutkan dan edukatif' },
    { id: 's10', stepNumber: 10, slideType: 'video', title: 'Video Pembelajaran Interaktif', purpose: `Media audio visual demonstrasi seru tentang ${topic}`, subtopicHint: 'Video Animasi Edukasi' },
    { id: 's11', stepNumber: 11, slideType: 'rangkuman', title: 'Rangkuman / Summary', purpose: `Peta pikiran dan poin kunci dari seluruh pembahasan ${topic}`, subtopicHint: 'Peta Konsep Inti' },
    { id: 's12', stepNumber: 12, slideType: 'peta_kuis', title: 'Peta Perjalanan Kuis', purpose: 'Rute tantangan kuis gamifikasi 5 level penjelajah', subtopicHint: 'Level 1 sampai Level 5' },
    { id: 's13', stepNumber: 13, slideType: 'kuis', title: `Kuis 1: Tantangan Konsep Dasar`, purpose: `Pertanyaan interaktif level 1 seputar pengenalan ${topic}`, subtopicHint: 'Pilihan Ganda A, B, C' },
    { id: 's14', stepNumber: 14, slideType: 'kuis', title: `Kuis 2: Karakteristik Utama`, purpose: `Tantangan mengidentifikasi ciri khas penting dari ${topic}`, subtopicHint: 'Pilihan Ganda A, B, C' },
    { id: 's15', stepNumber: 15, slideType: 'kuis', title: `Kuis 3: Sebab Akibat & Fungsi`, purpose: `Tantangan menghubungkan fungsi dan manfaat materi`, subtopicHint: 'Pilihan Ganda A, B, C' },
    { id: 's16', stepNumber: 16, slideType: 'kuis', title: `Kuis 4: Contoh di Dunia Nyata`, purpose: `Menemukan contoh yang tepat di lingkungan sekitar`, subtopicHint: 'Pilihan Ganda A, B, C' },
    { id: 's17', stepNumber: 17, slideType: 'kuis', title: `Kuis 5: Misi Analisis Terakhir`, purpose: `Tantangan pemahaman menyeluruh tingkat lanjut`, subtopicHint: 'Pilihan Ganda A, B, C' },
    { id: 's18', stepNumber: 18, slideType: 'respon_benar', title: 'Respon Benar: Luar Biasa!', purpose: 'Layar selebrasi ketika siswa memilih jawaban benar dengan kembang api & bintang', subtopicHint: 'Selebrasi Skor Sempurna' },
    { id: 's19', stepNumber: 19, slideType: 'respon_salah', title: 'Respon Salah: Ayo Coba Sekali Lagi!', purpose: 'Layar motivasi ramah dengan dorongan semangat dan petunjuk kunci', subtopicHint: 'Pemberian Semangat & Clue' },
    { id: 's20', stepNumber: 20, slideType: 'penutup', title: 'Penutup & Pemberian Lencana', purpose: `Apresiasi telah menyelesaikan media pembelajaran ${topic} dengan sukses!`, subtopicHint: 'Sertifikat & Salam Penutup' }
  ];
}

export interface GeneratedSlidePrompt {
  slideNumber: number;
  slideTitle: string;
  slideType: string;
  purpose: string;
  promptText: string;
}

export function generateStructuredSlidePrompt(
  slide: SlideTemplateItem,
  options: {
    topic: string;
    ageGroup: AgeGroupOption;
    layout: 'landscape' | 'portrait';
    visualStyle: VisualStyleOption;
    language: 'id' | 'en' | 'bilingual';
    mascotOption: 'none' | 'ai' | 'custom' | 'upload';
    customMascotDesc: string;
  }
): string {
  const isLandscape = options.layout === 'landscape';
  const sizeText = isLandscape ? 'Landscape 16:9 (1920 x 1080 px)' : 'Portrait 9:16 (1080 x 1920 px)';
  const ratioFlag = isLandscape ? '--ar 16:9' : '--ar 9:16';

  // Mascot description logic
  let mascotSnippet = '';
  if (options.mascotOption !== 'none') {
    if (options.customMascotDesc && options.customMascotDesc.trim().length > 0) {
      mascotSnippet = `Karakter maskot: ${options.customMascotDesc.trim()}. Maskot berpose interaktif sesuai materi halaman.`;
    } else {
      mascotSnippet = `Karakter maskot ramah yang dirancang khusus menyesuaikan topik "${options.topic}" dan usia anak ${options.ageGroup.range}, mengenakan atribut tematik yang ceria.`;
    }
  }

  // Header and content tailoring per slide type
  let headerText = '';
  let contentText = '';
  let footerNavText = '';

  switch (slide.slideType) {
    case 'cover':
      headerText = `Teks judul utama "${slide.title.replace('Cover Presentasi', `Petualangan di ${options.topic}!`)}" dengan typography tebal, ekspresif, ceria, dan sangat mudah dibaca. Subtitle bertuliskan "Media Pembelajaran Interaktif untuk ${options.ageGroup.label}".`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. Komposisi slide pembuka spektakuler. ${mascotSnippet ? `${mascotSnippet} Karakter sedang tersenyum ceria, melambaikan tangan menyapa audiens dari bagian tengah halaman dengan latar belakang lingkungan ${options.topic} yang memukau dan kaya detail ramah anak.` : `Ilustrasi panorama utama tentang ${options.topic} yang semarak, hangat, dan mengundang antusiasme belajar.`} Palet warna cerah harmonis berenergi.`;
      footerNavText = `Tombol interaktif berbentuk pil melengkung tebal bertuliskan "Mulai Belajar ▶" atau "Jelajahi Sekarang" di bagian tengah bawah dengan efek glow lembut.`;
      break;

    case 'navigasi':
      headerText = `Teks header "Pilih Menu Belajar" atau "Peta Petualangan Hari Ini" dengan tata letak navigasi rapi di bagian atas.`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. 4 kartu menu interaktif bergambar ikonik berjejer rapi di tengah: 1. "Tujuan Belajar" (ikon buku bintang), 2. "Materi Pembelajaran" (ikon lampu ide), 3. "Video Seru" (ikon play cinema), 4. "Tantangan Kuis" (ikon piala emas). ${mascotSnippet ? `${mascotSnippet} Maskot berada di sisi sudut membimbing jari telunjuk ke arah kartu menu.` : ''}`;
      footerNavText = `Bilah status di sudut bawah: indikator profil siswa dan tombol "Kembali ke Beranda" di pojok kiri bawah.`;
      break;

    case 'tujuan':
      headerText = `Teks judul "Apa yang Akan Kita Pelajari Hari Ini?" dengan typography clean dan bersahabat.`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. Ilustrasi 3 kartu target capaian pembelajaran berbentuk papan kayu atau bubble 3D lembut yang berisi poin-poin capaian pemahaman tentang ${options.topic}. Ilustrasi pendukung berupa teropong, buku sains, dan lencana bintang pencapaian. ${mascotSnippet ? `${mascotSnippet} Maskot bersemangat mengenakan topi pembelajar.` : ''}`;
      footerNavText = `Tombol navigasi interaktif: tombol panah "Sebelumnya" di kiri bawah dan tombol "Lanjut Materi ▶" di kanan bawah.`;
      break;

    case 'apersepsi':
      headerText = `Teks pemantik rasa ingin tahu: "Tahukah Kamu?" atau "Pernahkah Kamu Memperhatikan Ini?" di bagian atas.`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. Ilustrasi adegan konkret dunia nyata yang memicu pemikiran kritis anak: fenomena sehari-hari yang berkaitan erat dengan ${options.topic}. Disertai balon dialog rasa penasaran dengan tanda tanya berkilau. ${mascotSnippet ? `${mascotSnippet} Maskot memegang kaca pembesar sambil menunjuk fenomena yang diamati dengan ekspresi kagum terkejut ceria.` : ''}`;
      footerNavText = `Tombol interaktif melengkung bertuliskan "Cari Tahu Jawabannya! 💡" di bagian tengah bawah.`;
      break;

    case 'materi':
      headerText = `Teks judul subbab materi: "${slide.title}" dengan penomoran materi yang jelas di sudut atas.`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. Area penjelasan visual utama yang luas di tengah: ${slide.purpose}. Menggunakan diagram ilustrasi bertingkat, penanda panah alur yang rapi, objek-objek penting diberi label teks sederhana yang jelas (keterbacaan tinggi). ${mascotSnippet ? `${mascotSnippet} Maskot berdiri di sisi materi bertindak sebagai pemandu tutor yang ramah.` : ''} Latar belakang bersih dengan kontras tinggi sehingga materi sangat jelas dipahami.`;
      footerNavText = `Indikator nomor slide (${slide.stepNumber}/20), tombol navigasi "◀ Sebelumnya" dan "Lanjut Materi ▶" di bilah bawah.`;
      break;

    case 'video':
      headerText = `Teks judul "Bioskop Edukasi: Mari Menonton Video!" dengan typography playful.`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. Ilustrasi bingkai layar bioskop TV modern atau tablet raksasa dengan tombol Play segitiga besar di tengah layar. Menampilkan preview frame animasi memukau tentang ${options.topic}. Di sekitar layar terdapat ornamen popcorn lucu, tiket film bioskop kartun, dan ${mascotSnippet ? `${mascotSnippet} Maskot duduk di kursi bioskop dengan kacamata 3D ceria.` : 'elemen visual studio mini.'}`;
      footerNavText = `Kontrol bar pemutar video (play/pause, scrubber bar durasi, volume) dan tombol "Lanjut ke Rangkuman ▶".`;
      break;

    case 'rangkuman':
      headerText = `Teks judul "Peta Pikiran & Rangkuman Kunci" di bagian atas tengah.`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. Infografis ringkasan terpadu berupa pohon konsep atau peta pulau petualangan yang menghubungkan semua poin penting dari Materi 1 sampai 5 tentang ${options.topic}. Kotak-kotak ringkasan warna-warni yang rapi dan mudah dihafal anak. ${mascotSnippet ? `${mascotSnippet} Maskot memegang tongkat pemandu menunjuk ke bagan rangkuman.` : ''}`;
      footerNavText = `Tombol interaktif berkilau "Siap Uji Nyali di Kuis! 🏆" di bagian tengah bawah.`;
      break;

    case 'peta_kuis':
      headerText = `Teks judul "Peta Ekspedisi Kuis Juara" dengan tema petualangan berani.`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. Ilustrasi jalur peta harta karun berliku menghubungkan Pos 1, Pos 2, Pos 3, Pos 4, dan Pos 5 (Puncak Istana Pengetahuan). Setiap pos memiliki ikon bendera dan gembok interaktif. ${mascotSnippet ? `${mascotSnippet} Maskot berdiri di titik awal Pos 1 siap berlari membawa bendera start.` : ''}`;
      footerNavText = `Tombol aksi "Mulai Misi Kuis 1 ▶" di bagian tengah bawah.`;
      break;

    case 'kuis':
      headerText = `Teks header kuis: "${slide.title}" dengan lencana poin/bintang di sudut kanan atas.`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. Layout soal kuis interaktif yang sangat lapang: Di bagian atas terdapat kotak ilustrasi soal yang jernih dan kalimat pertanyaan: "${slide.purpose}". Di bagian bawah terdapat 3 kotak pilihan jawaban besar (A, B, C) dengan tombol warna kontras dan teks jawaban yang jelas. ${mascotSnippet ? `${mascotSnippet} Maskot berpose menyemangati siswa untuk memilih jawaban terbaik.` : ''}`;
      footerNavText = `Bilah bawah: Bantuan petunjuk (Clue 💡) dan pengingat waktu kuis yang santai dan tidak menegangkan.`;
      break;

    case 'respon_benar':
      headerText = `Teks selebrasi raksasa "LUAR BIASA! JAWABANMU TEPAT! 🎉" dengan huruf tebal 3D berkilau emas.`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. Komposisi penuh kegembiraan dan apresiasi positif. Hujan konfeti warna-warni pastel yang meriah, piala emas berkilauan, dan bintang 5 melayang dengan efek sparkle. ${mascotSnippet ? `${mascotSnippet} Maskot melompat girang sambil mengangkat kedua tangan membentuk tanda jempol kemenangan.` : 'Karakter anak-anak bersorak riang gembira.'} Kotak penjelasan singkat mengapa jawaban tersebut benar.`;
      footerNavText = `Tombol interaktif besar "Lanjut Tantangan Berikutnya ▶" di tengah bawah.`;
      break;

    case 'respon_salah':
      headerText = `Teks ramah suportif "HAMPIR BENAR! JANGAN MENYERAH! 💪" dengan typography bersahabat warna oranye hangat.`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. Suasana tetap hangat dan mendorong rasa percaya diri. Tidak ada tanda silang merah yang menakutkan, melainkan lampu ide yang menyala memberi petunjuk halus (clue). ${mascotSnippet ? `${mascotSnippet} Maskot tersenyum ramah merangkul audiens sambil memberikan kaca pembesar dan petunjuk arah.` : 'Visual bola lampu ramah yang memberikan petunjuk.'} Kotak petunjuk ceria: "Ingat kembali materi sebelumnya ya!".`;
      footerNavText = `Dua tombol pilihan: "Coba Lagi ↺" (tombol utama) dan "Lihat Petunjuk Kunci 💡".`;
      break;

    case 'penutup':
      headerText = `Teks penutup "SELAMAT! KAMU TELAH MENYELESAIKAN MISI BELAJAR!" di bagian atas dengan pita pita kelulusan.`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. Pemandangan grand finale perayaan kelulusan. Ilustrasi sertifikat lencana emas penghargaan "Penjelajah Ahli ${options.topic}" yang terpampang megah. Pemandangan alam/ruang belajar yang damai dan asri bermandikan cahaya mentari cerah. ${mascotSnippet ? `${mascotSnippet} Maskot memakai toga kelulusan atau medali emas kehormatan, tersenyum bangga melambaikan tangan bersama teman-teman lainnya.` : 'Bintang kehormatan dan piala emas cemerlang.'}`;
      footerNavText = `Tombol penutup "Ulangi Presentasi ↺" dan "Unduh Sertifikat Prestasi 🎓".`;
      break;

    default:
      headerText = `Teks judul "${slide.title}" dengan penempatan typography yang seimbang dan mudah dibaca.`;
      contentText = `Gaya visual ${options.visualStyle.name}, ${options.visualStyle.promptModifier}. ${slide.purpose}. Komposisi teratur dan visual edukatif yang menarik. ${mascotSnippet}`;
      footerNavText = `Tombol navigasi interaktif standar "Sebelumnya" dan "Lanjut".`;
      break;
  }

  // Language customization
  let langDirective = '';
  if (options.language === 'en') {
    langDirective = 'All on-screen slide text, button labels, and titles MUST be rendered in English.';
  } else if (options.language === 'bilingual') {
    langDirective = 'On-screen slide text formatted as bilingual Indonesian with English subtitle translation underneath.';
  } else {
    langDirective = 'Semua teks pada slide, tombol navigasi, dan judul dalam Bahasa Indonesia yang baku dan komunikatif.';
  }

  const promptBlock = `Prompt Halaman ${slide.stepNumber}: ${slide.title}

Plaintext
Ukuran: ${sizeText}
Framing: Compose like a premium presentation slide: balanced and uncluttered layout, generous whitespace, no elements touching or cropped at the canvas edge. All important elements — title, illustration, body content, navigation/button elements — arranged with clean typography placement and clear visual hierarchy from top to bottom. Only background decorations may extend to the canvas edge.
Header: ${headerText}
Content: ${contentText} ${langDirective}
Footer/Navigasi: ${footerNavText}
Rendering Quality: clean typography placement, presentation-ready, 8K resolution, 300 dpi, highly detailed, professional quality, sharp focus, crisp details, clean edges, balanced composition, safe margins, no cropped elements, cohesive visual system, high readability, visually engaging, tidak ada teks handwrite sebagai ornamen, no unreal engine 5, no hyper-detailed, no oversharpened, no overexposed, no oversaturated, no extra fingers, no mutated hands, no bad anatomy, no deformed, no cluttered, no messy, no busy background, no chaotic layout, no multiple lighting, no double shadows, no watermark, no signature. ${ratioFlag} --v 6.1 --style raw`;

  return promptBlock;
}
