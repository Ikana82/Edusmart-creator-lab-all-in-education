export interface GameVisualOption {
  id: string;
  name: string;
  category: '3D' | '2D' | 'Handcraft & Artistic';
  description: string;
  recommendedFor: string;
  promptModifier: string;
  gradient: string;
}

export const GAME_VISUAL_STYLES: GameVisualOption[] = [
  {
    id: '3d-pixar',
    name: '3D Pixar Style',
    category: '3D',
    description: 'Animasi 3D ekspresif khas Disney Pixar, pencahayaan lembut, mata berbinar ramah, dan tekstur halus berenergi.',
    recommendedFor: 'Sangat disukai anak 4–9 tahun untuk karakter maskot lucu dan ekspresif.',
    promptModifier: '3D Pixar Style, high quality 3D animation render, expressive and cute characters, smooth volumetric lighting, colorful and vibrant pastel tones, 8k resolution',
    gradient: 'from-amber-400 to-orange-500'
  },
  {
    id: '3d-clay-animation',
    name: '3D Clay Animation',
    category: '3D',
    description: 'Stop-motion tanah liat plastisin dengan detail sidik jari halus, tekstur clay matte, dan bentuk bulat menggemaskan.',
    recommendedFor: 'Cocok untuk segala usia, memberikan kesan hangat dan ramah anak.',
    promptModifier: 'Stop-motion claymation style, tactile plasticine clay textures, subtle thumbprint details, charming clay model, soft diffuse studio lighting',
    gradient: 'from-emerald-400 to-teal-600'
  },
  {
    id: '3d-felt-toys',
    name: '3D Felt Toys',
    category: 'Handcraft & Artistic',
    description: 'Bahan kain flanel berbulu lembut (needle felted wool) dengan jahitan tangan terlihat, nuansa boneka mainan hangat.',
    recommendedFor: 'Usia dini 4–6 tahun (PAUD/TK) memberikan kesan aman, lembut, dan taktis.',
    promptModifier: 'Needle felting craft style, warm fuzzy wool felt textures, visible handcrafted stitches, cute felted characters, cozy soft lighting',
    gradient: 'from-pink-400 to-rose-500'
  },
  {
    id: '3d-plastic-toy',
    name: '3D Plastic Toy',
    category: '3D',
    description: 'Gaya mainan plastik mulus (vinyl collectible toy / Playmobil look), permukaan solid glossy, warna cerah dan kokoh.',
    recommendedFor: 'Usia 6–12 tahun yang menyukai mainan figur dan action puzzle.',
    promptModifier: 'Designer vinyl art toy style, smooth moulded plastic surfaces, vibrant solid colors, playful chunky proportions, gentle studio reflections',
    gradient: 'from-blue-400 to-indigo-600'
  },
  {
    id: 'watercolor-storybook',
    name: 'Watercolor Storybook',
    category: 'Handcraft & Artistic',
    description: 'Lukisan cat air buku cerita dongeng klasik, sapuan kuas lembut, gradasi cat transparan, dan garis pensil artistik.',
    recommendedFor: 'Game bertema cerita, literasi, dongeng fabel, dan petualangan santai.',
    promptModifier: 'Children storybook watercolor illustration, whimsical soft washes, delicate pencil lineart, textured handmade paper grain, gentle bleeding pigments',
    gradient: 'from-violet-400 to-purple-600'
  },
  {
    id: 'paper-cut',
    name: 'Paper Cut',
    category: 'Handcraft & Artistic',
    description: 'Seni guntingan kertas bertumpuk (multi-layered papercraft) dengan efek bayangan drop shadow realistis antar lapisan.',
    recommendedFor: 'Game puzzle spasial, geografi, kebudayaan, dan sains lingkungan.',
    promptModifier: 'Layered paper cut craft art, 3D papercraft diorama, clean precise paper cut edges, realistic soft drop shadows between layers, tactile paper texture',
    gradient: 'from-cyan-400 to-blue-600'
  },
  {
    id: 'flat-cartoon',
    name: 'Flat Cartoon',
    category: '2D',
    description: 'Ilustrasi kartun 2D modern bersih, garis tegas solid, warna cerah kontras tinggi, sangat mudah dibaca tanpa distorsi visual.',
    recommendedFor: 'Kuis cepat, tampilan minimalis layar smartphone, dan kejelasan soal maksimal.',
    promptModifier: 'Modern flat cartoon illustration, bold clean outlines, vibrant solid color fills, minimalist modern graphic design, high contrast clarity',
    gradient: 'from-yellow-400 to-amber-500'
  },
  {
    id: 'anime-chibi',
    name: 'Anime Chibi',
    category: '2D',
    description: 'Karakter anime chibi berkepala besar imut, mata berbinar besar, warna pastel ceria, dan ekspresi komikal.',
    recommendedFor: 'Anak SD kelas tinggi & SMP (9–15 tahun) yang menyukai animasi Jepang.',
    promptModifier: 'Cute anime chibi art style, big expressive sparkling eyes, adorable kawaii proportions, soft pastel cel-shading, playful cheerful demeanor',
    gradient: 'from-fuchsia-400 to-pink-500'
  },
  {
    id: '3d-soft-clay-pastel',
    name: '3D Soft Clay Pastel',
    category: '3D',
    description: 'Plastisin lembut dengan palet warna pastel menenangkan (peach, mint, baby blue, lilas) yang estetik dan kekinian.',
    recommendedFor: 'Sangat disukai anak 4–6 tahun karena bentuknya bulat lembut dan warnanya ceria.',
    promptModifier: '3D soft clay aesthetic, modern pastel color palette, matte clay finish, soothing creamy lighting, minimalist cute rounded geometry',
    gradient: 'from-rose-300 to-indigo-300'
  },
  {
    id: '3d-crochet-amigurumi',
    name: '3D Crochet / Amigurumi',
    category: 'Handcraft & Artistic',
    description: 'Boneka rajut benang wol (amigurumi Jepang), pola spiral mendetail, kancing mata imut, dan nuansa kerajinan tangan hangat.',
    recommendedFor: 'Tema hewan peliharaan, flora fauna, dan game keluarga.',
    promptModifier: 'Japanese amigurumi crochet doll style, intricate woven yarn stitches, soft knitted wool fibers, safety button eyes, warm cozy handicraft atmosphere',
    gradient: 'from-lime-400 to-green-600'
  },
  {
    id: '2d-cartoon',
    name: '2D Cartoon',
    category: '2D',
    description: 'Gaya kartun animasi klasik serial TV edukasi anak, garis dinamis, warna primer dan sekunder cerah, fleksibel untuk semua tema.',
    recommendedFor: 'Pilihan serbaguna dan aman untuk berbagai tingkatan usia.',
    promptModifier: 'Classic 2D children cartoon style, dynamic animated character lines, cheerful primary and secondary colors, playful lively setting',
    gradient: 'from-sky-400 to-blue-500'
  },
  {
    id: '3d-clay-glossy',
    name: '3D Clay Glossy (Vibrant & Colorful)',
    category: '3D',
    description: 'Tanah liat mengkilap dengan pernis mengkilap berkilau, warna-warni kontras tinggi yang berenergi dan memikat perhatian.',
    recommendedFor: 'Anak usia 4–6 tahun yang membutuhkan stimulasi visual cerah dan eye-catching.',
    promptModifier: 'Vibrant glossy 3D clay modeling, shiny varnished resin look, punchy bold saturation, high reflectivity highlights, dynamic fun forms',
    gradient: 'from-orange-400 to-rose-600'
  }
];

export interface GameTypeOption {
  id: 'pilihan-ganda' | 'petualangan' | 'cerita';
  name: string;
  badge: string;
  shortDesc: string;
  defaultStructureDesc: string;
  defaultCount: number;
}

export const GAME_TYPES: GameTypeOption[] = [
  {
    id: 'pilihan-ganda',
    name: 'Game Pilihan Ganda',
    badge: 'Kuis Tebak Seru',
    shortDesc: 'Fokus pada kuis tebak-tebakan langsung yang interaktif dan menyenangkan.',
    defaultStructureDesc: '1 Halaman Judul, 10 Halaman Soal (dapat disesuaikan misal 6 soal), dan 1 Halaman Penutup.',
    defaultCount: 10
  },
  {
    id: 'petualangan',
    name: 'Game Petualangan',
    badge: 'Misi & Babak Bertingkat',
    shortDesc: 'Pemain menyelesaikan misi perjalanan seru melintasi pos atau tema dunia yang berbeda.',
    defaultStructureDesc: '1 Halaman Judul & Peta Misi, 3 Tema/Babak (masing-masing 5 soal tantangan), dan 1 Halaman Kemenangan.',
    defaultCount: 15
  },
  {
    id: 'cerita',
    name: 'Game dengan Cerita',
    badge: 'Visual Storytelling',
    shortDesc: 'Bercerita sambil belajar: alur kisah dongeng interaktif yang mengasah daya nalar.',
    defaultStructureDesc: '1 Halaman Judul Kisah, 5 Bagian Cerita Pendek (masing-masing diikuti 1 soal relevan), dan 1 Halaman Ending.',
    defaultCount: 5
  }
];

export interface GameAgeOption {
  id: string;
  range: string;
  label: string;
  desc: string;
}

export const GAME_AGE_GROUPS: GameAgeOption[] = [
  {
    id: '4-6',
    range: '4–6 tahun',
    label: 'PAUD / TK',
    desc: 'Visual sangat ceria, penuh warna, materi dasar seperti berhitung konkret, angka, bentuk geometri, dan warna.'
  },
  {
    id: '7-9',
    range: '7–9 tahun',
    label: 'SD Kelas Rendah (1-3)',
    desc: 'Kalimat singkat, eksplorasi logika sederhana, membaca kata dan kalimat dasar, fakta alam menarik.'
  },
  {
    id: '10-12',
    range: '10–12 tahun',
    label: 'SD Kelas Tinggi (4-6)',
    desc: 'Tantangan analitis, pemecahan masalah bertahap, kuis pengetahuan sains dan sosial terapan.'
  },
  {
    id: '13-15',
    range: '13–15 tahun',
    label: 'SMP (Sekolah Menengah Pertama)',
    desc: 'Konsep studi kasus nyata, quest teka-teki logika, bahasa komunikatif semi-formal.'
  },
  {
    id: '16-18',
    range: '16–18 tahun',
    label: 'SMA / SMK',
    desc: 'Simulasi problem-solving mendalam, studi kasus kritis, penalaran deduktif tingkat tinggi.'
  },
  {
    id: '18+',
    range: '18+ / Umum',
    label: 'Mahasiswa / Umum / Korporat',
    desc: 'Kuis trivia wawasan luas, gamifikasi pelatihan profesional, dan puzzle intelektual.'
  }
];

export interface GameQuestionItem {
  id: string;
  screenNumber: number;
  screenType: 'judul' | 'soal' | 'babak' | 'cerita' | 'penutup';
  subtopicTitle: string;
  questionText: string;
  illustrationDetail: string;
  options: { label: string; text: string; isCorrect?: boolean }[];
  hintClue?: string;
}

export interface GamePreset {
  id: string;
  title: string;
  gameTypeId: 'pilihan-ganda' | 'petualangan' | 'cerita';
  ageId: string;
  styleId: string;
  mascotName: string;
  mascotDesc: string;
  screens: GameQuestionItem[];
}

export const GAME_PRESETS: GamePreset[] = [
  {
    id: 'matematika-owi',
    title: 'Bermain Matematika Bersama Owi',
    gameTypeId: 'pilihan-ganda',
    ageId: '4-6',
    styleId: '3d-pixar',
    mascotName: 'Owi',
    mascotDesc: 'Owi, seekor burung hantu kecil yang sangat imut memakai kacamata bundar besar, berwarna pastel cerah, dan selalu tersenyum ramah memandu permainan.',
    screens: [
      {
        id: 's_judul',
        screenNumber: 1,
        screenType: 'judul',
        subtopicTitle: 'Halaman Judul',
        questionText: 'Bermain Matematika Bersama Owi!',
        illustrationDetail: 'Karakter Owi (seekor burung hantu kecil yang sangat imut memakai kacamata bundar besar, berwarna pastel cerah) sedang tersenyum ramah melambaikan sayapnya. Owi berdiri di atas padang rumput hijau yang lembut, dikelilingi oleh simbol-simbol matematika 3D yang melayang (angka 1, 2, 3, balok kotak, dan bola lingkaran) dengan warna-warni ceria.',
        options: [{ label: 'Tombol', text: 'MULAI' }]
      },
      {
        id: 's1',
        screenNumber: 2,
        screenType: 'soal',
        subtopicTitle: 'Soal 1 (Berhitung)',
        questionText: 'Ada berapa apel di pohon?',
        illustrationDetail: 'Di sebelah kiri, Owi si burung hantu kecil berkacamata sedang menunjuk ke arah sebuah pohon kecil yang lucu. Di ranting pohon tersebut, terdapat tepat 3 (tiga) buah apel merah yang besar dan berkilau. Background langit biru cerah dengan awan putih lembut.',
        options: [
          { label: 'Kotak 1', text: '2' },
          { label: 'Kotak 2', text: '3', isCorrect: true },
          { label: 'Kotak 3', text: '4' }
        ]
      },
      {
        id: 's2',
        screenNumber: 3,
        screenType: 'soal',
        subtopicTitle: 'Soal 2 (Mengenal Angka)',
        questionText: 'Manakah yang merupakan angka empat?',
        illustrationDetail: 'Owi si burung hantu berkacamata bundar sedang berdiri di tengah ruangan bermain, melihat ke arah tiga buah balok kayu raksasa yang berwarna-warni cerah.',
        options: [
          { label: 'Pilihan 1', text: 'Balok biru teks "3"' },
          { label: 'Pilihan 2', text: 'Balok kuning teks "4"', isCorrect: true },
          { label: 'Pilihan 3', text: 'Balok hijau teks "5"' }
        ]
      },
      {
        id: 's3',
        screenNumber: 4,
        screenType: 'soal',
        subtopicTitle: 'Soal 3 (Mengenal Bentuk)',
        questionText: 'Benda apa yang bentuknya lingkaran?',
        illustrationDetail: 'Owi sedang memegang sebuah kaca pembesar mainan besar, menatap penasaran ke arah meja kayu kecil tempat barang-barang diletakkan.',
        options: [
          { label: 'Pilihan 1', text: 'Buku cerita (kotak)' },
          { label: 'Pilihan 2', text: 'Bola pantai (lingkaran)', isCorrect: true },
          { label: 'Pilihan 3', text: 'Topi ulang tahun (segitiga)' }
        ]
      },
      {
        id: 's4',
        screenNumber: 5,
        screenType: 'soal',
        subtopicTitle: 'Soal 4 (Mengenal Bentuk)',
        questionText: 'Manakah benda yang memiliki bentuk kotak atau persegi?',
        illustrationDetail: 'Owi si burung hantu kecil tersenyum ceria di samping etalase mainan warna pastel yang rapi.',
        options: [
          { label: 'Pilihan 1', text: 'Kotak kado berpita (persegi)', isCorrect: true },
          { label: 'Pilihan 2', text: 'Roda sepeda mini (lingkaran)' },
          { label: 'Pilihan 3', text: 'Potongan semangka (segitiga)' }
        ]
      },
      {
        id: 's5',
        screenNumber: 6,
        screenType: 'soal',
        subtopicTitle: 'Soal 5 (Perbandingan)',
        questionText: 'Manakah hewan yang ukurannya paling besar?',
        illustrationDetail: 'Owi berada di padang rumput bersama tiga sahabat satwa lucu dengan ukuran tubuh kontras yang jelas terlihat.',
        options: [
          { label: 'Pilihan 1', text: 'Semut merah kecil' },
          { label: 'Pilihan 2', text: 'Kelinci lucu sedang' },
          { label: 'Pilihan 3', text: 'Gajah besar menggemaskan', isCorrect: true }
        ]
      },
      {
        id: 's6',
        screenNumber: 7,
        screenType: 'soal',
        subtopicTitle: 'Soal 6 (Pola Sederhana)',
        questionText: 'Lengkapi pola warna balok berikut: Merah, Biru, Merah, ...?',
        illustrationDetail: 'Owi memegang balok cat air di tangannya, memperhatikan barisan balok kayu bersusun yang membentuk pola ritmis di lantai bermain.',
        options: [
          { label: 'Pilihan 1', text: 'Balok Hijau' },
          { label: 'Pilihan 2', text: 'Balok Biru', isCorrect: true },
          { label: 'Pilihan 3', text: 'Balok Kuning' }
        ]
      },
      {
        id: 's_penutup',
        screenNumber: 8,
        screenType: 'penutup',
        subtopicTitle: 'Halaman Penutup',
        questionText: 'Hebat Sekali! Kamu Berhasil Menyelesaikan Semua Soal!',
        illustrationDetail: 'Owi melompat gembira dengan kembang api bintang 3D berkilau, memegang piala emas bintang kecil. Dikelilingi balon warna-warni dan pita pastel bertuliskan "Bintang Matematika Cilik".',
        options: [
          { label: 'Tombol 1', text: 'MAIN LAGI ↺' },
          { label: 'Tombol 2', text: 'SIMPAN NILAI ★' }
        ]
      }
    ]
  },
  {
    id: 'petualangan-rimba',
    title: 'Ekspedisi Rimba Nusantara',
    gameTypeId: 'petualangan',
    ageId: '7-9',
    styleId: '3d-clay-glossy',
    mascotName: 'Rino',
    mascotDesc: 'Rino, badak cilik bercula satu yang memakai ransel petualang safari dan topi penjelajah.',
    screens: [
      {
        id: 'pr_judul',
        screenNumber: 1,
        screenType: 'judul',
        subtopicTitle: 'Peta Misi Ekspedisi Rimba',
        questionText: 'Mulai Petualangan Menjelajah Rimba Bersama Rino!',
        illustrationDetail: 'Rino si badak cilik berdiri gagah memegang peta kuno di pintu gerbang hutan tropis rindang yang dipenuhi bunga anggrek raksasa dan kupu-kupu berkilau.',
        options: [{ label: 'Tombol', text: 'MULAI MISI ▶' }]
      },
      {
        id: 'pr_soal1',
        screenNumber: 2,
        screenType: 'soal',
        subtopicTitle: 'Babak 1 - Pos Hutan Hujan (Soal 1)',
        questionText: 'Siapakah hewan pemakan daun yang suka bergelantungan di pohon rimba?',
        illustrationDetail: 'Rino menunjuk ke atas dahan pohon beringin lebat di mana dedaunan hijau rimbun menaungi sungai.',
        options: [
          { label: 'Pilihan A', text: 'Orangutan berbulu oranye', isCorrect: true },
          { label: 'Pilihan B', text: 'Ikan mas koki' },
          { label: 'Pilihan C', text: 'Kucing rumahan' }
        ]
      },
      {
        id: 'pr_soal2',
        screenNumber: 3,
        screenType: 'soal',
        subtopicTitle: 'Babak 1 - Pos Hutan Hujan (Soal 2)',
        questionText: 'Bunga raksasa tanpa daun yang berbau khas di hutan Sumatra bernama...?',
        illustrationDetail: 'Rino menemukan bunga raksasa merah bertotol putih di lantai hutan dekat air terjun.',
        options: [
          { label: 'Pilihan A', text: 'Bunga Mawar' },
          { label: 'Pilihan B', text: 'Rafflesia Arnoldii', isCorrect: true },
          { label: 'Pilihan C', text: 'Bunga Melati' }
        ]
      },
      {
        id: 'pr_soal3',
        screenNumber: 4,
        screenType: 'soal',
        subtopicTitle: 'Babak 2 - Pos Sungai Jernih (Soal 3)',
        questionText: 'Hewan air tawar yang bernapas dengan insang di sungai rimba adalah...?',
        illustrationDetail: 'Rino menyeberangi jembatan kayu di atas sungai berarus tenang yang jernih memantulkan langit.',
        options: [
          { label: 'Pilihan A', text: 'Ikan Gurame', isCorrect: true },
          { label: 'Pilihan B', text: 'Burung Elang' },
          { label: 'Pilihan C', text: 'Monyet Ekor Panjang' }
        ]
      },
      {
        id: 'pr_penutup',
        screenNumber: 5,
        screenType: 'penutup',
        subtopicTitle: 'Halaman Penutup Misi',
        questionText: 'Selamat! Kamu Telah Menaklukan Ekspedisi Rimba!',
        illustrationDetail: 'Rino mengibarkan bendera penjelajah di puncak bukit hijau matahari terbit, menerima medali emas "Penjaga Kelestarian Hutan".',
        options: [{ label: 'Tombol', text: 'SELESAI 🏆' }]
      }
    ]
  }
];

export function buildDefaultQuestionsForGame(
  topic: string,
  gameType: 'pilihan-ganda' | 'petualangan' | 'cerita',
  ageRange: string,
  mascotName: string,
  questionCount: number = 6
): GameQuestionItem[] {
  const result: GameQuestionItem[] = [];

  // 1. Judul Screen
  result.push({
    id: `screen_judul_${Date.now()}`,
    screenNumber: 1,
    screenType: 'judul',
    subtopicTitle: 'Halaman Judul',
    questionText: `Bermain & Belajar ${topic}!`,
    illustrationDetail: `Karakter ${mascotName || 'Maskot Pemandu'} tersenyum ramah melambaikan tangan di layar pembuka game bertema ${topic}. Dihiasi elemen visual 3D interaktif dan suasana menyenangkan ramah anak usia ${ageRange}.`,
    options: [{ label: 'Tombol Utama', text: 'MULAI' }]
  });

  // Dynamic question subtopics based on game type
  const sampleSubtopics = [
    { title: 'Berhitung & Jumlah Objek', question: `Berapa banyak objek ${topic} yang kamu lihat di gambar?`, opts: ['2', '3', '4'], correct: '3' },
    { title: 'Mengenal Ciri & Simbol', question: `Manakah yang merupakan ciri khas utama dari ${topic}?`, opts: ['Pilihan A', 'Pilihan B', 'Pilihan C'], correct: 'Pilihan B' },
    { title: 'Mengenal Bentuk & Visual', question: `Benda apa yang memiliki bentuk sesuai petunjuk di soal?`, opts: ['Bentuk Kotak', 'Bentuk Lingkaran', 'Bentuk Segitiga'], correct: 'Bentuk Lingkaran' },
    { title: 'Perbandingan Ukuran & Jumlah', question: `Pilihlah objek yang memiliki ukuran paling besar!`, opts: ['Objek Kecil', 'Objek Sedang', 'Objek Paling Besar'], correct: 'Objek Paling Besar' },
    { title: 'Pola Berurutan', question: `Lengkapilah pola gambar yang hilang di bawah ini!`, opts: ['Pola Hijau', 'Pola Biru', 'Pola Merah'], correct: 'Pola Biru' },
    { title: 'Tantangan Logika Asyik', question: `Cocokkan pasangan benda dengan fungsi yang tepat!`, opts: ['Pasangan 1', 'Pasangan 2', 'Pasangan 3'], correct: 'Pasangan 2' },
    { title: 'Tebak Fakta Menarik', question: `Manakah fakta benar mengenai materi ini?`, opts: ['Fakta A', 'Fakta B', 'Fakta C'], correct: 'Fakta B' },
    { title: 'Misi Pengamatan Teliti', question: `Benda manakah yang berbeda di antara kelompok benda ini?`, opts: ['Benda 1', 'Benda 2', 'Benda 3'], correct: 'Benda 3' },
    { title: 'Penyelidikan Kunci', question: `Bantu maskot menemukan jalan atau jawaban yang tepat!`, opts: ['Jalur Kiri', 'Jalur Tengah', 'Jalur Kanan'], correct: 'Jalur Tengah' },
    { title: 'Ujian Final Juara', question: `Pertanyaan pemungkas: Apa kesimpulan penting dari game ini?`, opts: ['Jawaban A', 'Jawaban B Juara', 'Jawaban C'], correct: 'Jawaban B Juara' }
  ];

  const actualCount = Math.min(questionCount, sampleSubtopics.length);

  for (let i = 0; i < actualCount; i++) {
    const sub = sampleSubtopics[i];
    result.push({
      id: `screen_soal_${i + 1}_${Date.now()}`,
      screenNumber: i + 2,
      screenType: 'soal',
      subtopicTitle: `Soal ${i + 1} (${sub.title})`,
      questionText: sub.question,
      illustrationDetail: `${mascotName ? `${mascotName} sedang menunjuk dan memandu` : 'Ilustrasi interaktif'} dengan pemandangan ramah edukatif seputar ${topic}. Objek soal terlihat sangat jelas dengan kontras warna yang baik di sebelah kiri atau tengah layar.`,
      options: sub.opts.map((opt, idx) => ({
        label: `Pilihan ${idx + 1}`,
        text: opt,
        isCorrect: opt === sub.correct
      }))
    });
  }

  // Final Penutup Screen
  result.push({
    id: `screen_penutup_${Date.now()}`,
    screenNumber: actualCount + 2,
    screenType: 'penutup',
    subtopicTitle: 'Halaman Penutup',
    questionText: 'Selamat! Kamu Telah Menyelesaikan Semua Soal dengan Hebat!',
    illustrationDetail: `${mascotName || 'Karakter utama'} melompat gembira merayakan kemenangan, memegang piala bintang emas dikelilingi konfeti pastel dan pita keberhasilan bertuliskan "Pemain Hebat!".`,
    options: [
      { label: 'Tombol 1', text: 'MAIN LAGI ↺' },
      { label: 'Tombol 2', text: 'SELESAI ★' }
    ]
  });

  return result;
}

export function generateGameScreenPrompt(
  screen: GameQuestionItem,
  totalScreens: number,
  options: {
    topic: string;
    gameType: GameTypeOption;
    ageGroup: GameAgeOption;
    layout: 'landscape' | 'portrait';
    visualStyle: GameVisualOption;
    language: 'id' | 'en' | 'bilingual';
    mascotOption: 'none' | 'ai' | 'custom' | 'upload';
    mascotName: string;
    mascotDesc: string;
  }
): string {
  const isLandscape = options.layout === 'landscape';
  const sizeText = isLandscape ? 'Landscape 1920x1080' : 'Portrait 1080x1920';
  const ratioFlag = isLandscape ? '--ar 16:9' : '--ar 9:16';

  let framing = '';
  let header = '';
  let content = '';
  let footerNav = '';

  const cleanSans = 'Clean printed/digital sans-serif font, clearly readable.';

  if (screen.screenType === 'judul') {
    framing = 'Wide shot, centered composition.';
    header = `Teks judul "${screen.questionText}". ${cleanSans}`;
    content = `${screen.illustrationDetail} Gaya visual ${options.visualStyle.name}. Dilengkapi elemen dekoratif tematik seputar ${options.topic}. Komposisi ramah audiens ${options.ageGroup.label} dengan palet warna cerah pastel yang memikat.`;
    footerNav = `Sebuah tombol besar dan menarik di bagian bawah tengah dengan teks "${screen.options[0]?.text || 'MULAI'}".`;
  } else if (screen.screenType === 'penutup') {
    framing = 'Wide shot, celebration layout, balanced symmetrical composition.';
    header = `Teks apresiasi kemenangan "${screen.questionText}". ${cleanSans}`;
    content = `${screen.illustrationDetail} Suasana pesta perayaan prestasi penuh kegembiraan, piala emas berkilauan, bintang-bintang melayang ceria.`;
    footerNav = `Dua tombol aksi di bagian bawah tengah sejajar rapi: Tombol 1 ("${screen.options[0]?.text || 'MAIN LAGI ↺'}") dan Tombol 2 ("${screen.options[1]?.text || 'SELESAI ★'}").`;
  } else {
    // Soal Screen
    framing = isLandscape
      ? 'Eye-level shot, split layout (kiri untuk ilustrasi objek soal, kanan atau bawah untuk teks dan kotak opsi jawaban).'
      : 'Eye-level shot, vertical game layout (atas untuk judul/pertanyaan, tengah untuk ilustrasi objek soal, bawah untuk deretan kotak opsi jawaban).';
    header = `Teks pertanyaan "${screen.questionText}". ${cleanSans}`;
    content = `${screen.illustrationDetail} Objek materi disajikan dengan proporsi jelas, tegas, dan mudah diidentifikasi anak. Latar belakang rapi tanpa distraksi visual berlebihan.`;

    const optionsList = screen.options
      .map((opt, i) => `${opt.label} berisi teks/gambar "${opt.text}"`)
      .join('. ');

    footerNav = `Di sebelah kanan atau bawah, terdapat ${screen.options.length} kotak pilihan jawaban yang sejajar rapi. ${optionsList}. Opsi benar dan distraktor memiliki perlakuan visual setara tanpa highlight/glow/check/warna pembeda. Di sudut kiri atas terdapat tombol panah "KEMBALI".`;
  }

  const renderingQuality = `${options.visualStyle.promptModifier}. Compose like a premium educational game screen: balanced and uncluttered layout, generous whitespace, no elements touching or cropped at the canvas edge. All important elements — title, illustration, body content, answer options, navigation/button elements — arranged with clean visual hierarchy from top to bottom. Only background decorations may extend to the canvas edge.`;

  return `${screen.screenNumber}. ${screen.subtopicTitle}
Ukuran: ${sizeText}
Framing: ${framing}
Header: ${header}
Content: ${content}
Footer/Navigasi: ${footerNav}
Rendering Quality: ${renderingQuality} ${ratioFlag} --v 6.1 --style raw`;
}
