import { EducationalResource } from '../types';

export const mockEducationalResources: EducationalResource[] = [
  {
    id: 'res-ws-01',
    title: 'Worksheet Mengenal Hewan',
    category: 'worksheet',
    categoryLabel: 'Worksheet',
    ageRange: '4-7 Tahun',
    educationLevel: 'PAUD/TK',
    description: 'Lembar aktivitas interaktif mencocokkan gambar hewan jinak dan liar dengan habitat serta makanannya melalui jalur labirin ceria.',
    thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
    theme: 'Sains & Fauna',
    difficulty: 'Mudah',
    tags: ['Hewan', 'Mencocokkan', 'PAUD', 'Motorik Halus'],
    learningObjectives: [
      'Mengenal 8 jenis hewan herbivora dan karnivora di Indonesia',
      'Melatih koordinasi motorik halus melalui garis tarik gambar',
      'Membedakan hewan darat dan hewan air'
    ],
    instructions: 'Tarik garis dari gambar hewan ke gambar makanan kesukaannya. Warnai lingkaran hijau untuk hewan darat dan biru untuk hewan air!',
    promptTemplate: 'High quality printable educational worksheet for kindergarten, "Mengenal Hewan", cute animal line art illustrations for coloring and matching maze, black and white clean borders --ar 8.5:11'
  },
  {
    id: 'res-ws-02',
    title: 'Worksheet Counting 1-10',
    category: 'worksheet',
    categoryLabel: 'Worksheet',
    ageRange: '4-6 Tahun',
    educationLevel: 'PAUD/TK',
    description: 'Aktivitas visual berhitung angka 1 sampai 10 menggunakan objek buah-buahan tropis segar, lengkap dengan latihan menulis angka.',
    thumbnail: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=600&auto=format&fit=crop&q=80',
    theme: 'Matematika Dasar',
    difficulty: 'Mudah',
    tags: ['Angka', 'Berhitung', 'TK', 'Tracing'],
    learningObjectives: [
      'Membilang benda secara konkret 1 sampai 10',
      'Menulis angka simbolis sesuai garis bantu putus-putus',
      'Memahami konsep kuantitas lebih banyak dan lebih sedikit'
    ],
    instructions: 'Hitung jumlah buah di setiap kotak, lalu tebalkan angka yang tepat di sebelah kanan!',
    promptTemplate: 'Preschool math activity worksheet, counting fruits 1 to 10, clean dotted tracing lines for numbers, charming minimalistic hand-drawn vectors --ar 8.5:11'
  },
  {
    id: 'res-ws-03',
    title: 'Worksheet Alphabet Tracing',
    category: 'worksheet',
    categoryLabel: 'Worksheet',
    ageRange: '5-7 Tahun',
    educationLevel: 'PAUD/TK',
    description: 'Panduan menebalkan huruf alfabet kapital dan kecil A sampai Z dengan panah arah goresan tangan serta kosakata bergambar.',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80',
    theme: 'Bahasa & Literasi',
    difficulty: 'Mudah',
    tags: ['Alfabet', 'Menulis', 'Literasi Dini', 'Tracing'],
    learningObjectives: [
      'Mengenal bentuk huruf besar dan kecil A-Z',
      'Mengikuti arah goresan tulisan yang benar dengan motorik tangan',
      'Menghubungkan bunyi fonik huruf awal kata'
    ],
    instructions: 'Ikuti arah panah nomor 1 dan 2 untuk menulis huruf. Ucapkan bunyi huruf dengan lantang!',
    promptTemplate: 'Alphabet handwriting practice tracing sheet, stroke order arrows, letter A to Z, cute icon for each letter, clean printable educational layout --ar 8.5:11'
  },
  {
    id: 'res-lkpd-01',
    title: 'LKPD Mengenal Lingkungan',
    category: 'lkpd',
    categoryLabel: 'LKPD',
    ageRange: '7-9 Tahun',
    educationLevel: 'SD',
    description: 'Lembar Kerja Peserta Didik berbasis inkuiri untuk mengamati komponen biotik dan abiotik di halaman sekolah atau rumah.',
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
    theme: 'IPAS & Lingkungan',
    difficulty: 'Sedang',
    tags: ['Kurikulum Merdeka', 'IPAS', 'Observasi', 'Ekosistem'],
    learningObjectives: [
      'Mengidentifikasi komponen lingkungan hidup di sekitar peserta didik',
      'Mengelompokkan benda hidup (biotik) dan benda tak hidup (abiotik)',
      'Menuliskan laporan hasil pengamatan sederhana dengan bahasa sendiri'
    ],
    instructions: 'Lakukan observasi di taman sekolah selama 15 menit. Catat 5 benda hidup dan 5 benda tak hidup pada tabel yang tersedia.',
    promptTemplate: 'Inquiry-based student activity worksheet LKPD, environmental science, clean observation table and scientific question prompts for elementary grade 3 --ar 8.5:11'
  },
  {
    id: 'res-lkpd-02',
    title: 'LKPD Hewan dan Habitat',
    category: 'lkpd',
    categoryLabel: 'LKPD',
    ageRange: '9-12 Tahun',
    educationLevel: 'SD',
    description: 'Proyek eksplorasi adaptasi morfologi hewan terhadap habitatnya di darat, air, dan udara dengan studi kasus fauna Indonesia.',
    thumbnail: 'https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=600&auto=format&fit=crop&q=80',
    theme: 'Sains & Biologi',
    difficulty: 'Sedang',
    tags: ['Adaptasi', 'Fauna Indonesia', 'Studi Kasus', 'SD Kelas 4-6'],
    learningObjectives: [
      'Menganalisis hubungan bentuk paruh, cakar, dan kaki dengan fungsi adaptasi',
      'Menjelaskan peran habitat bagi kelangsungan hidup spesies',
      'Merancang solusi pelestarian satwa langka yang terancam punah'
    ],
    instructions: 'Analisis infografis 3 hewan endemik (Luwak, Burung Cenderawasih, Penyu). Jawablah pertanyaan kritis pada rubrik penyelidikan.',
    promptTemplate: 'Detailed scientific exploration worksheet LKPD on animal habitats and anatomical adaptation, featuring Indonesian endemic wildlife, structured assessment rubric --ar 8.5:11'
  },
  {
    id: 'res-media-01',
    title: 'Media Pembelajaran Sistem Tata Surya',
    category: 'media',
    categoryLabel: 'Media Pembelajaran',
    ageRange: '10-15 Tahun',
    educationLevel: 'SMP',
    description: 'Slide interaktif dan infografis visual orbit 8 planet mengelilingi matahari, dilengkapi data rotasi, revolusi, dan karakteristik unik.',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=600&auto=format&fit=crop&q=80',
    theme: 'Astronomi & Sains',
    difficulty: 'Sedang',
    tags: ['Tata Surya', 'Planet', 'Presentasi', 'SMP Kelas 7'],
    learningObjectives: [
      'Mengurutkan planet berdasarkan jarak relatif terhadap matahari',
      'Memahami fenomena pergantian siang malam dan musim',
      'Membandingkan ciri planet dalam (terestrial) dan planet luar (gas raksasa)'
    ],
    instructions: 'Gunakan presentasi slide ini sebagai pengantar bab tata surya. Ajak siswa memindai QR code untuk simulasi orbit interaktif.',
    promptTemplate: 'Educational infographic poster of the Solar System, accurate planetary scale comparison, cosmic deep indigo background, modern sleek typography --ar 16:9'
  },
  {
    id: 'res-media-02',
    title: 'Media Pembelajaran Mengenal Hewan',
    category: 'media',
    categoryLabel: 'Media Pembelajaran',
    ageRange: '6-10 Tahun',
    educationLevel: 'SD',
    description: 'Set poster digital klasifikasi hewan berdasarkan jenis makanan (herbivora, karnivora, omnivora) dengan ilustrasi beresolusi tinggi.',
    thumbnail: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&auto=format&fit=crop&q=80',
    theme: 'Biologi Anak',
    difficulty: 'Mudah',
    tags: ['Hewan', 'Poster Kelas', 'Klasifikasi', 'Visual'],
    learningObjectives: [
      'Mengelompokkan hewan berdasarkan jenis pakan utamanya',
      'Mengenal rantai makanan sederhana di ekosistem savana dan hutan',
      'Menumbuhkan rasa empati terhadap makhluk hidup'
    ],
    instructions: 'Cetak poster ukuran A3 untuk dipajang di dinding pojok baca kelas, atau tampilkan pada proyektor LCD saat diskusi kelas.',
    promptTemplate: 'Classroom educational poster showing classification of animals by diet: Herbivore, Carnivore, Omnivore. Rich clean color blocks and modern illustrations --ar 16:9'
  },
  {
    id: 'res-game-01',
    title: 'Game Mengenal Angka',
    category: 'game',
    categoryLabel: 'Game Edukasi',
    ageRange: '4-7 Tahun',
    educationLevel: 'PAUD/TK',
    description: 'Konsep board game cetak mandiri (Print & Play) dengan petak petualangan kebun binatang untuk melatih penjumlahan dasar 1-10.',
    thumbnail: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=600&auto=format&fit=crop&q=80',
    theme: 'Matematika Menyenangkan',
    difficulty: 'Mudah',
    tags: ['Board Game', 'Gamifikasi', 'Berhitung', 'Print & Play'],
    learningObjectives: [
      'Memperkuat kemampuan berhitung cepat melalui lemparan dadu',
      'Melatih sportivitas dan giliran bermain bersama teman',
      'Meningkatkan minat belajar matematika melalui permainan'
    ],
    instructions: 'Kocok dadu dan jalankan bidakmu. Jika berhenti di petak kuis, selesaikan soal hitung untuk maju 2 langkah ekstra!',
    promptTemplate: 'Top-down printable board game path layout for children, animal zoo adventure theme, numbered tiles 1 to 30, fun challenge spots, vibrant cartoon art --ar 16:9'
  },
  {
    id: 'res-game-02',
    title: 'Game Tebak Hewan',
    category: 'game',
    categoryLabel: 'Game Edukasi',
    ageRange: '7-12 Tahun',
    educationLevel: 'SD',
    description: 'Permainan kartu tebak-tebakan logika (Clue Cards) berdasarkan suara, habitat, ciri tubuh, dan makanan khas satwa nusantara.',
    thumbnail: 'https://images.unsplash.com/photo-1557008075-7f2c5efa4cfd?w=600&auto=format&fit=crop&q=80',
    theme: 'Sains & Logika',
    difficulty: 'Sedang',
    tags: ['Tebak-tebakan', 'Kartu Kuis', 'Ice Breaking', 'Kolaboratif'],
    learningObjectives: [
      'Mengembangkan penalaran deduktif dari petunjuk bertingkat',
      'Memperkaya kosakata sains tentang ciri-ciri satwa',
      'Membangun suasana kelas yang interaktif dan antusias'
    ],
    instructions: 'Bacakan petunjuk 1 (skor 30). Jika teman belum bisa menebak, bacakan petunjuk 2 (skor 20) hingga petunjuk 3 (skor 10).',
    promptTemplate: 'Printable trivia clue card deck design for kids, animal guessing game with 3 progressive hints and answer badge, cheerful typography --ar 3:4'
  },
  {
    id: 'res-comic-01',
    title: 'Komik Edukasi Menjaga Lingkungan',
    category: 'comic',
    categoryLabel: 'Komik Edukasi',
    ageRange: '8-13 Tahun',
    educationLevel: 'SD',
    description: 'Komik 6 panel penuh humor tentang Petualangan Boni & Kiki yang belajar memilah sampah organik dan anorganik di sekolah.',
    thumbnail: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    theme: 'Karakter & Lingkungan',
    difficulty: 'Mudah',
    tags: ['Komik', 'Pilah Sampah', 'Literasi Visual', 'Karakter Baik'],
    learningObjectives: [
      'Membedakan jenis sampah organik, anorganik, dan B3',
      'Membangun kebiasaan membawa tempat makan dan botol minum sendiri',
      'Menumbuhkan kesadaran dampak plastik terhadap biota laut'
    ],
    instructions: 'Ajak murid membaca komik secara berpasangan dengan membaca peran suara Boni dan Kiki.',
    promptTemplate: '6-panel educational comic strip for kids, colorful manga style, two Indonesian elementary school students learning to sort recycling bins, clear speech bubbles, cheerful expressive characters --ar 16:9'
  },
  {
    id: 'res-fc-01',
    title: 'Flashcard Hewan',
    category: 'flashcard',
    categoryLabel: 'Flashcard',
    ageRange: '3-7 Tahun',
    educationLevel: 'PAUD/TK',
    description: 'Paket 32 kartu kilas kosakata bilingual (Indonesia - Inggris) dengan foto asli fauna tropis dan fakta unik yang singkat.',
    thumbnail: 'https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&auto=format&fit=crop&q=80',
    theme: 'Kosakata & Bahasa',
    difficulty: 'Mudah',
    tags: ['Flashcard', 'Bilingual', 'Fauna', 'Montessori'],
    learningObjectives: [
      'Menambah 32 perbendaharaan kata baru dalam 2 bahasa',
      'Melatih daya ingat cepat (photographic memory) anak',
      'Mengenal suara dan karakteristik utama masing-masing satwa'
    ],
    instructions: 'Tunjukkan kartu selama 2-3 detik di depan anak, sebutkan namanya dengan intonasi jelas, lalu balik untuk melihat fakta menariknya.',
    promptTemplate: 'Minimalist Montessori flashcard design, crisp white background, isolated photo of an Asian palm civet, bilingual typography: "Luwak / Asian Palm Civet", rounded card borders --ar 3:4'
  },
  {
    id: 'res-fc-02',
    title: 'Flashcard Alphabet',
    category: 'flashcard',
    categoryLabel: 'Flashcard',
    ageRange: '3-6 Tahun',
    educationLevel: 'PAUD/TK',
    description: 'Set flashcard alfabet fonik bergambar cerah lengkap dengan asosiasi kata benda lokal dari A (Apel) hingga Z (Zebra).',
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80',
    theme: 'Fonik & Membaca',
    difficulty: 'Mudah',
    tags: ['Alfabet', 'Fonik', 'Membaca Dini', 'Visual'],
    learningObjectives: [
      'Mengenal hubungan simbol huruf dengan bunyi fonik pertama kata',
      'Menstimulasi pengenalan visual bentuk huruf besar dan kecil',
      'Membangun kesiapan belajar membaca tanpa paksaan'
    ],
    instructions: 'Gunakan flashcard untuk permainan mencari huruf yang tersebar di atas karpet lantai.',
    promptTemplate: 'Colorful phonics flashcards for kids, large bold letters uppercase and lowercase, bright illustrated object for each letter, soft pastel background --ar 3:4'
  },
  {
    id: 'res-ebook-01',
    title: 'E-Book Mengenal Hewan',
    category: 'ebook',
    categoryLabel: 'Buku & E-Book',
    ageRange: '6-10 Tahun',
    educationLevel: 'SD',
    description: 'Buku cerita bergambar digital 24 halaman tentang penjelajahan hutan Nusantara, menyingkap keajaiban fauna unik Indonesia.',
    thumbnail: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80',
    theme: 'Cerita Edukasi',
    difficulty: 'Sedang',
    tags: ['E-Book', 'Cerita Anak', 'Fauna Nusantara', 'Literasi Membaca'],
    learningObjectives: [
      'Meningkatkan minat baca dan pemahaman teks narasi bergambar',
      'Mengenalkan keanekaragaman hayati Indonesia (Mega-biodiversity)',
      'Menanamkan nilai pelestarian alam dan kepedulian lingkungan sejak dini'
    ],
    instructions: 'Buka di tablet atau proyektor untuk kegiatan membaca nyaring (Read Aloud) bersama seluruh siswa di kelas.',
    promptTemplate: 'Children book cover and interior spreads, "Petualangan Mengenal Hewan Nusantara", lush watercolor illustrations of Indonesian rainforest wildlife, warm friendly typography --ar 4:3'
  }
];
