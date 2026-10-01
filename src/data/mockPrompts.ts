import { PromptTemplate } from '../types';

export const mockPromptLibrary: PromptTemplate[] = [
  {
    id: 'pr-ws-01',
    title: 'Worksheet Berhitung TK Bertema Alam & Hewan',
    category: 'worksheet',
    categoryLabel: 'Prompt Worksheet',
    description: 'Prompt untuk menghasilkan worksheet latihan berhitung 1-10 dengan ilustrasi objek fauna yang menarik dan ramah cetak.',
    targetAudience: 'Guru PAUD/TK & Orang Tua',
    recommendedModel: 'Gemini 3.8 Flash / Midjourney / Canva AI',
    variables: ['[TOPIK_HEWAN]', '[RENTANG_ANGKA]', '[TINGKAT_TK]'],
    promptText: `Buatkan rancangan worksheet edukasi matematika untuk anak usia 4-6 tahun (TK).
Topik: Menghitung [TOPIK_HEWAN] dari [RENTANG_ANGKA].
Format Worksheet:
1. Header: Judul ceria, nama siswa, tanggal, dan bintang capaian (1-5).
2. Bagian A: 4 kotak aktivitas "Hitung & Lingkari Angka yang Tepat" dengan objek [TOPIK_HEWAN] lucu.
3. Bagian B: Jalur labirin menghubungkan angka urut 1 sampai 10.
4. Bagian C: Tracing garis putus-putus untuk latihan menulis angka simbolis.
5. Prompt Gambar pendukung untuk Midjourney/DALL-E: Format hitam putih outline ramah cetak fotokopi, tanpa bayangan abu-abu tebal.`
  },
  {
    id: 'pr-ws-02',
    title: 'Worksheet Sains SD: Siklus Hidup Kupu-Kupu & Katak',
    category: 'worksheet',
    categoryLabel: 'Prompt Worksheet',
    description: 'Prompt pembuatan worksheet diagram metamorfosis lengkap dengan kotak gunting tempel (Cut & Paste) interaktif.',
    targetAudience: 'Guru SD Kelas 1-4',
    recommendedModel: 'Gemini 3.8 Flash',
    variables: ['[HEWAN]', '[JENJANG_KELAS]'],
    promptText: `Rancang lembar aktivitas interaktif (Cut & Paste Activity Worksheet) tentang metamorfosis [HEWAN] untuk kelas [JENJANG_KELAS] SD.
Sertakan:
- Penjelasan ringkas 1 paragraf dengan bahasa narasi ramah anak.
- Lingkaran siklus 4 tahap dengan panah alir.
- Bagian potongan kartu gambar di bagian bawah halaman untuk digunting dan ditempel murid.
- 3 pertanyaan refleksi pemahaman singkat.`
  },
  {
    id: 'pr-lkpd-01',
    title: 'LKPD Inkuiri Kurikulum Merdeka (IPAS)',
    category: 'lkpd',
    categoryLabel: 'Prompt LKPD',
    description: 'Format baku LKPD kurikulum merdeka dengan sintaks Project/Problem Based Learning (PjBL) lengkap dengan rubrik.',
    targetAudience: 'Guru SD & SMP',
    recommendedModel: 'Gemini 3.8 Flash',
    variables: ['[MATERI_IPAS]', '[KELAS]', '[MASALAH_NYATA]'],
    promptText: `Sebagai ahli kurikulum merdeka Indonesia, buatlah Lembar Kerja Peserta Didik (LKPD) berbasis Inkuiri Terbimbing:
Mata Pelajaran: IPAS Kelas [KELAS]
Topik: [MATERI_IPAS]
Konteks Masalah: [MASALAH_NYATA]

Struktur LKPD:
1. Capaian Pembelajaran (CP) dan Tujuan Pembelajaran (TP) terukur.
2. Stimulus berupa studi kasus atau pengamatan lingkungan sekitar.
3. Alat dan Bahan yang mudah ditemukan di rumah/sekolah.
4. Langkah Kerja Sistematis (Ayo Mengamati, Ayo Mencoba, Ayo Menganalisis).
5. Tabel Pengamatan Data.
6. 3 Pertanyaan Diskusi Kritis tingkat LOTS ke HOTS.
7. Rubrik Penilaian Kinerja dengan skor 1-4.`
  },
  {
    id: 'pr-game-01',
    title: 'Game Edukasi Kartu Interaktif / Board Game',
    category: 'game',
    categoryLabel: 'Prompt Game',
    description: 'Prompt untuk merancang mekanika game papan edukatif (Print & Play) lengkap dengan aturan petak tantangan.',
    targetAudience: 'Pendidik & Game Designer Edukasi',
    recommendedModel: 'Gemini 3.8 Flash',
    variables: ['[MATA_PELAJARAN]', '[USIA_PEMAIN]', '[JUMLAH_PETAK]'],
    promptText: `Desain mekanik board game edukasi cetak mandiri (Print & Play Board Game) untuk materi [MATA_PELAJARAN] anak usia [USIA_PEMAIN].
Format perancangan:
1. Nama Game yang memikat dan latar cerita (Game Lore).
2. Tujuan Menang (Victory Condition).
3. Papan Jalur: 30 petak dengan 5 jenis petak khusus (Petak Bonus, Petak Kuis Sains, Petak Rintangan, Petak Lompatan, Petak Refleksi).
4. Buatkan 10 pertanyaan kartu kuis bertingkat (Mudah, Sedang, Tantangan) beserta kunci jawaban.
5. Aturan bermain dalam 5 langkah sederhana yang bisa dipahami anak dalam 2 menit.`
  },
  {
    id: 'pr-comic-01',
    title: 'Komik Edukasi 6 Panel: Nilai Moral & Sains',
    category: 'comic',
    categoryLabel: 'Prompt Komik',
    description: 'Prompt untuk membuat naskah dan deskripsi visual komik edukatif 6 panel yang siap digambar dengan AI generator.',
    targetAudience: 'Komikus Edukasi & Pengajar',
    recommendedModel: 'Gemini 3.8 Flash / Midjourney',
    variables: ['[TOPIK_NILAI]', '[KARAKTER_UTAMA]'],
    promptText: `Buatkan naskah komik edukasi 6 panel untuk topik: [TOPIK_NILAI].
Karakter: [KARAKTER_UTAMA] (berikan deskripsi visual konsisten: pakaian, warna, gaya rambut).
Untuk setiap panel dari 1 sampai 6, cantumkan:
- Nomor Panel & Sudut Kamera (Wide Shot, Close-up, dsb).
- Deskripsi Visual detail latar dan ekspresi karakter.
- Balon Dialog percakapan singkat dan jenaka.
- Efek Suara (SFX).
- Prompt Text-to-Image (bahasa Inggris) yang siap di-copy ke Midjourney atau DALL-E dengan gaya strip komik clean webtoon.`
  },
  {
    id: 'pr-video-01',
    title: 'Video Edukasi Pendek (Reels / TikTok / YouTube Shorts)',
    category: 'video',
    categoryLabel: 'Prompt Video',
    description: 'Format script video edukasi 30-60 detik vertikal 9:16 dengan hook 3 detik pertama yang sangat mengunci perhatian.',
    targetAudience: 'Content Creator Edukasi & Guru Digital',
    recommendedModel: 'Gemini 3.8 Flash',
    variables: ['[FAKTA_UNIK]', '[DURASI]'],
    promptText: `Tulis naskah video pendek edukasi berdurasi [DURASI] detik (format vertikal 9:16) tentang [FAKTA_UNIK].
Format tabel:
- 00:00 - 00:03 (The Hook): Kalimat pembuka mengejutkan yang memecah scrolling.
- 00:03 - 00:15 (The Mystery): Penjelasan fenomena mengapa hal itu terjadi.
- 00:15 - 00:45 (The Science / Core Fact): Penjelasan ilmiah sederhana dengan analogi sehari-hari.
- 00:45 - 00:60 (Call to Action & Refleksi): Pertanyaan interaktif untuk komentar pemirsa.
Sertakan panduan B-Roll visual, prompt video AI (Runway/Kling), dan teks on-screen pop up.`
  },
  {
    id: 'pr-storyboard-01',
    title: 'Storyboard Serial Animasi Pembelajaran Anak',
    category: 'storyboard',
    categoryLabel: 'Prompt Storyboard',
    description: 'Format pembuatan storyboard multi-scene dengan visual prompt, video prompt, audio cue, dan durasi per adegan.',
    targetAudience: 'Animator Edukasi & Guru Media',
    recommendedModel: 'Gemini 3.8 Flash',
    variables: ['[TEMA_CERITA]', '[GAYA_VISUAL]', '[TARGET_USIA]'],
    promptText: `Buatkan storyboard rinci 6 adegan untuk video pembelajaran anak bertema: [TEMA_CERITA].
Gaya Visual: [GAYA_VISUAL].
Target Audiens: [TARGET_USIA].
Setiap adegan harus memiliki:
1. Scene ID & Estimasi Detik (misal: 00:00 - 00:05).
2. Deskripsi Visual Adegan & Aksi Karakter.
3. Naskah Voice Over / Dubbing ramah anak.
4. Teks Muncul di Layar (Lower Thirds / On-Screen Text).
5. Prompt Gambar (Prompt Midjourney/Ideogram, rasio 16:9).
6. Prompt Video AI (Prompt Kling/Luma/Runway).
7. Gerakan Kamera & Transisi Layar.`
  },
  {
    id: 'pr-img-01',
    title: 'Prompt Ilustrasi Karakter Maskot Edukasi Konsisten',
    category: 'image',
    categoryLabel: 'Prompt Gambar',
    description: 'Prompt pembuatan character sheet lengkap dengan berbagai pose ekspresi untuk bahan ajar.',
    targetAudience: 'Kreator Lembar Kerja & Desainer',
    recommendedModel: 'Midjourney v6 / Ideogram / Flux',
    variables: ['[HEWAN_OBJEK]', '[PROFESI_PERAN]'],
    promptText: `Cute anthropomorphic [HEWAN_OBJEK] dressed as a [PROFESI_PERAN], multiple poses sheet: happy teaching pose pointing to whiteboard, curious thinking pose with magnifying glass, cheerful jumping pose with backpack, celebrating with trophy pose. Clean flat 2D vector style, Pixar Disney inspired, warm pastel educational colors, crisp white background, isolated character design asset, high resolution --ar 16:9 --style raw`
  },
  {
    id: 'pr-audio-01',
    title: 'Prompt Lagu Edukasi untuk Suno AI & Udio',
    category: 'audio',
    categoryLabel: 'Prompt Audio',
    description: 'Format prompt musik AI dengan gaya genre, tempo, struktur bait [Verse], [Chorus], dan instruksi vokal ceria.',
    targetAudience: 'Guru Musik, PAUD, & Pembuat Konten Lagu Anak',
    recommendedModel: 'Suno v3.5 / Udio / Lyria',
    variables: ['[TEMA_LAGU]', '[GENRE_MUSIK]'],
    promptText: `Buatkan naskah lirik dan prompt musik AI untuk platform Suno/Udio dengan tema: [TEMA_LAGU].
Genre Style: [GENRE_MUSIK] (misal: cheerful acoustic ukulele kids pop, upbeat playful 110bpm, bright percussion, warm female nursery vocals).
Struktur Lagu:
[Intro - playful ukulele and acoustic guitar strums]
[Verse 1 - pengenalan topik yang catchy dan berima]
[Pre-Chorus - build up ketukan drum ceria]
[Chorus - reff utama mudah dihafal dengan pengulangan kata berirama]
[Verse 2 - contoh dalam kehidupan sehari-hari]
[Chorus - reff utama bernyanyi bersama]
[Outro - nada melambat manis dan tawa anak ceria]`
  },
  {
    id: 'pr-prod-01',
    title: 'Konsep Produk Digital Edukasi Komprehensif (Bundle)',
    category: 'product',
    categoryLabel: 'Prompt Produk Edukasi',
    description: 'Prompt untuk merancang produk digital edukasi yang bernilai jual (Worksheet + Flashcard + Panduan Orang Tua).',
    targetAudience: 'Digital Product Creator & Edupreneur',
    recommendedModel: 'Gemini 3.8 Flash',
    variables: ['[NICHE_EDUKASI]', '[HARGA_TARGET]'],
    promptText: `Bertindaklah sebagai Senior Educational Product Strategist.
Bantu saya menyusun blueprint produk digital edukasi berbayar untuk pasar [NICHE_EDUKASI].
Sertakan:
1. Judul Produk yang Menarik (Hook + Benefit).
2. Masalah Utama Orang Tua / Guru yang dipecahkan produk ini.
3. Daftar Modul Isi: Worksheet Printable (halaman & topik), Flashcard interaktif, Tracker Kemajuan Belajar, dan Panduan Khusus Orang Tua.
4. Unique Selling Proposition (USP) yang membedakan dengan materi gratisan di internet.
5. Strategi Lead Magnet gratisan untuk menarik 1.000 subscribers pertama.`
  }
];
