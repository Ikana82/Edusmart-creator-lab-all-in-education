export interface WorksheetSubcategoryKnowledge {
  id: string;
  name: string;
  shortDesc: string;
  focus: string;
  rules: string;
  indonesianHeader: string;
  indonesianInstruction: string;
  defaultTopic: string;
  hasLegend?: boolean;
  legendType?: 'color' | 'direction' | 'math_symbols' | 'grid_coords' | 'shapes_weight' | 'line_dots' | 'none';
  defaultItemCount: number;
  suitableLevels: ('PAUD' | 'TK' | 'SD1_3' | 'SD4_6')[];
  defaultEnglishPrompt: string;
}

export interface WorksheetCategoryKnowledge {
  id: string;
  number: number;
  name: string;
  englishName: string;
  iconName: string;
  colorTheme: string;
  badge: string;
  description: string;
  subcategories: WorksheetSubcategoryKnowledge[];
}

export const worksheetCategoriesKnowledge: WorksheetCategoryKnowledge[] = [
  // 1. COLORING
  {
    id: 'coloring',
    number: 1,
    name: 'Coloring',
    englishName: 'Coloring & Color-by-Code',
    iconName: 'Palette',
    colorTheme: 'from-pink-500 to-rose-600',
    badge: 'Kreativitas',
    description: 'Mewarnai edukatif: mewarnai sesuai panduan bentuk geometri, color-by-number, topeng hewan, dan karakter angka ceria.',
    subcategories: [
      {
        id: 'coloring-by-shape',
        name: 'Mewarnai Sesuai Bentuk (Color by Shape)',
        shortDesc: 'Panduan krayon bentuk geometri di atas (Lingkaran=Biru, Segitiga=Merah, Kotak=Kuning).',
        focus: 'Mengenali bentuk geometri dan koordinasi mata-tangan mengisi warna sesuai simbol.',
        rules: 'Header krayon bentuk di atas. Objek utama hewan/kendaraan di tengah dengan simbol bentuk di dalamnya. Format B&W line art.',
        indonesianHeader: 'Mewarnai Sesuai Bentuk',
        indonesianInstruction: 'Warnai gambarnya sesuai dengan petunjuk krayon bentuk di atas ya!',
        defaultTopic: 'Ikan Hias Bawah Laut dengan Simbol Bentuk Geometri',
        hasLegend: true,
        legendType: 'color',
        defaultItemCount: 1,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Printable kids educational color-by-shape worksheet, A4 portrait (210x297mm), 300 DPI, 4K resolution. Top header: Name and Class. Legend bar at top showing 3 color crayons: Circle = Blue crayon, Triangle = Red crayon, Square = Yellow crayon. Center area: Charming friendly cartoon sea creature (clownfish and sea turtle) with thick clean black vector outlines for coloring, containing small geometric shape symbols (circles, triangles, squares) inside each section. Clean white background, no shading, print ready --ar 1:1.414 --q 2 --style raw`
      },
      {
        id: 'coloring-mask',
        name: 'Mewarnai Topeng Hewan Siap Pakai (Animal Mask)',
        shortDesc: 'Pola topeng kepala hewan dengan garis putus-putus gunting, lubang mata, dan tali samping.',
        focus: 'Bermain peran, melatih motorik mewarnai lalu menggunting topeng.',
        rules: 'Wajah hewan memenuhi halaman. Garis luar putus-putus dengan ikon gunting. 2 lingkaran mata putus-putus untuk dilubangi.',
        indonesianHeader: 'Mewarnai Topeng Hewan Rimba',
        indonesianInstruction: 'Warnai topeng hewan ini, gunting sesuai garis putus-putus, lalu pasang tali di samping!',
        defaultTopic: 'Topeng Singa Rimba atau Kelinci Ceria',
        hasLegend: false,
        defaultItemCount: 1,
        suitableLevels: ['PAUD', 'TK', 'SD1_3'],
        defaultEnglishPrompt: `Printable kids animal mask coloring page, titled "Mewarnai Topeng Hewan", A4 portrait format, 300 DPI, 4K. Full page bold black outline of friendly lion face mask. Dashed cutting perimeter line with scissor marks. Two dashed circular eye cutouts labeled for eye holes, two side ear tabs with small circles for elastic string. Clean black and white line art, ready for coloring and cutting --ar 1:1.414 --q 2`
      },
      {
        id: 'coloring-bubble-number',
        name: 'Mewarnai Angka & Karakter Ceria (Bubble Number)',
        shortDesc: 'Angka 1-10 besar 3D dengan karakter kartun memeluk angka dan baris latihan tracing nama angka.',
        focus: 'Mengenal bentuk angka dan ejaan nama bilangan.',
        rules: 'Angka gelembung besar di tengah. Karakter lucu menempel pada angka. Garis bantu penulisan nama angka di bawah.',
        indonesianHeader: 'Mewarnai Angka Ceria',
        indonesianInstruction: 'Warnai angkanya dengan warna kesukaanmu dan tebalkan namanya!',
        defaultTopic: 'Angka 1 sampai 10 Kartun Ceria dengan Maskot Hewan',
        hasLegend: false,
        defaultItemCount: 1,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Preschool number coloring worksheet, A4 portrait, 300 DPI, 4K line art. Center features a giant playful bubble number with clean outlines hugged by a cute smiling cartoon baby animal. Bottom section has 2 ruled lines with dotted Indonesian number word tracing. High contrast black and white vector outlines, ample coloring space --ar 1:1.414 --q 2`
      }
    ]
  },

  // 2. TRACING
  {
    id: 'tracing',
    number: 2,
    name: 'Tracing',
    englishName: 'Tracing & Fine Motor Skills',
    iconName: 'PenTool',
    colorTheme: 'from-amber-500 to-orange-600',
    badge: 'Motorik Halus',
    description: 'Latihan menebalkan huruf dengan nomor urut goresan panah 1-2-3, tracing angka, garis motorik pra-menulis, dan playdough mat.',
    subcategories: [
      {
        id: 'tracing-alphabet-stroke',
        name: 'Tracing Huruf dengan Urutan Goresan (Stroke Order 1-2-3)',
        shortDesc: 'Huruf hollow kapital dan kecil dengan panah nomor 1-2-3 dan garis putus-putus 3-baris.',
        focus: 'Belajar menulis huruf abjad dengan cara goresan yang benar dan rapi.',
        rules: 'Huruf besar di kiri dengan nomor panah 1, 2, 3. Ilustrasi kosakata di pojok. 4 baris latihan huruf bertitik-titik.',
        indonesianHeader: 'Tracing Huruf & Urutan Menulis',
        indonesianInstruction: 'Ikuti nomor panah 1-2-3 untuk menebalkan huruf besar dan kecil dengan benar!',
        defaultTopic: 'Huruf A-Z dengan Stroke Order & Ilustrasi Buah/Benda',
        hasLegend: false,
        defaultItemCount: 4,
        suitableLevels: ['PAUD', 'TK', 'SD1_3'],
        defaultEnglishPrompt: `Printable preschool alphabet tracing worksheet with stroke order, A4 portrait layout, 300 DPI, 4K vector. Left side: large hollow uppercase and lowercase letter with circled numbered arrows (1, 2, 3) showing handwriting directions. Right side: cute illustrated vocabulary item. Bottom section: 4 ruled handwriting baseline rows containing dashed letter models for tracing practice. Clean educational format, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'tracing-playdough-mat',
        name: 'Playdough Mat & Sensori Tracing Huruf Jumbo',
        shortDesc: 'Huruf tebal berongga lebar dengan jalur tengah untuk ditekan lilin mainan (plastisin).',
        focus: 'Sensori raba dan motorik jari pra-menulis untuk anak usia dini.',
        rules: 'Dua huruf jumbo (kapital dan kecil) dengan outline tebal berwarna cerah. Jalur tengah bergaris putus-putus.',
        indonesianHeader: 'Playdough Mat Sensori Huruf',
        indonesianInstruction: 'Gulung plastisin dan tempelkan mengikuti jalur di dalam huruf ini ya!',
        defaultTopic: 'Playdough Mat Huruf Alfabet Jumbo untuk PAUD/TK',
        hasLegend: false,
        defaultItemCount: 1,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Preschool playdough sensory mat printable, A4 portrait format, 300 DPI, 4K resolution. Features two jumbo hollow alphabet letters with thick cheerful outlines. Inside the wide hollow channels are dashed center tracks with numbered directional arrows. Minimalist clean background, tactile and printable --ar 1:1.414 --q 2`
      },
      {
        id: 'tracing-prewriting-lines',
        name: 'Garis Motorik Pra-Menulis (Pre-writing Lines)',
        shortDesc: 'Menghubungkan hewan ke makanannya lewat jalur putus-putus spiral, zigzag, gelombang, dan kastel.',
        focus: 'Kekuatan genggaman pensil dan fleksibilitas pergelangan tangan.',
        rules: '5 baris horizontal: Kiri karakter hewan, tengah garis putus-putus tracing bervariasi, kanan tujuan (makanan).',
        indonesianHeader: 'Ayo Bantu Hewan Mencari Makanan!',
        indonesianInstruction: 'Tebalkan garis putus-putus dari kiri ke kanan dengan pensilmu ya!',
        defaultTopic: 'Garis Putus-putus Pra-Menulis Jalur Hewan Nusantara',
        hasLegend: false,
        defaultItemCount: 5,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Preschool pre-writing fine motor tracing lines worksheet, A4 portrait, 300 DPI, 4K. 5 horizontal rows: each row has a friendly cartoon animal on the left, connected by a distinct dotted tracing path (Row 1 zigzag, Row 2 ocean wave, Row 3 loop-de-loop spiral, Row 4 castle crenel, Row 5 steep curves) leading to food on the right. Clean high contrast outlines, ample spacing --ar 1:1.414 --q 2`
      }
    ]
  },

  // 3. COUNTING
  {
    id: 'counting',
    number: 3,
    name: 'Counting',
    englishName: 'Counting & Quantities',
    iconName: 'Calculator',
    colorTheme: 'from-blue-500 to-indigo-600',
    badge: 'Matematika Dasar',
    description: 'Menghitung objek konkret, lingkari angka yang tepat (grid 2x2), penjumlahan bergambar, dan honeycomb number maze.',
    subcategories: [
      {
        id: 'counting-objects-box',
        name: 'Hitung Objek Konkret & Tuliskan Angka',
        shortDesc: 'Toples kue, pohon apel, atau piring makanan dengan kotak kosong untuk menulis jumlahnya.',
        focus: 'Korespondensi 1-ke-1 (one-to-one correspondence) dan kemampuan menulis angka hasil.',
        rules: 'Objek konkret terpisah jelas tidak tumpang tindih. Kotak jawaban tebal di bawah dengan tanda sama dengan [ = ].',
        indonesianHeader: 'Hitung Jumlah Objeknya',
        indonesianInstruction: 'Hitung berapa banyak objek di dalam gambar, lalu tuliskan angkanya pada kotak!',
        defaultTopic: 'Menghitung Buah Apel di Pohon, Kue dalam Toples, atau Ikan di Akuarium',
        hasLegend: false,
        defaultItemCount: 4,
        suitableLevels: ['PAUD', 'TK', 'SD1_3'],
        defaultEnglishPrompt: `Printable preschool counting worksheet, titled "Hitung Jumlahnya", A4 portrait, 300 DPI, 4K quality. 4 distinct horizontal activity panels. Each panel contains a clear group of recognizable cartoon objects to count (Panel 1: 5 red apples, Panel 2: 7 yellow bananas, Panel 3: 4 blue cars, Panel 4: 8 orange carrots). Next to each group is an equals sign and a blank handwriting box for students to write the number. High contrast, clean layout --ar 1:1.414 --q 2`
      },
      {
        id: 'counting-circle-number-grid',
        name: 'Hitung & Lingkari Angka Pilihan Ganda (Grid 2x2)',
        shortDesc: '4 kartu dalam 1 halaman A4, masing-masing dengan objek dan 3-4 lingkaran angka pilihan di bawahnya.',
        focus: 'Membandingkan kuantitas objek dengan simbol angka numerik.',
        rules: '4 kartu rounded border seimbang. Di bawah setiap gambar ada deretan 3 lingkaran angka (misal: 3, 5, 4).',
        indonesianHeader: 'Berapa Jumlahnya? Lingkari Angkanya!',
        indonesianInstruction: 'Hitung jumlah benda di setiap kotak, lalu lingkari angka yang tepat ya!',
        defaultTopic: 'Koleksi Kendaraan Ceria (Mobil, Pesawat, Kapal Selam, Helikopter)',
        hasLegend: false,
        defaultItemCount: 4,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Kindergarten counting assessment worksheet, A4 portrait, 300 DPI, 4K. Divided into a 2x2 grid of four rounded card panels. Card 1 has 3 yellow submarines with circular numbers (3, 5, 2) at bottom; Card 2 has 6 red scooters with numbers (4, 6, 8); Card 3 has 4 blue helicopters with numbers (4, 7, 2); Card 4 has 5 green trucks with numbers (1, 5, 9). Clean borders, vector illustrations, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'counting-honeycomb-maze',
        name: 'Urutan Angka Heksagon Sarang Lebah (Honeycomb Maze)',
        shortDesc: 'Jalur heksagon berurutan 1-10 atau 1-20 dari lebah ke sarang dengan mengisi angka yang rumpang.',
        focus: 'Pemahaman deret angka maju dan pengenalan pola bilangan.',
        rules: '10-15 heksagon terhubung meliuk dari kiri atas ke kanan bawah. Sebagian heksagon kosong untuk diisi anak.',
        indonesianHeader: 'Urutan Angka Sarang Lebah',
        indonesianInstruction: 'Bantu lebah menemukan sarang madunya dengan melengkapi angka yang hilang!',
        defaultTopic: 'Jalur Honeycomb Lebah Ceria Mengisi Angka 1-10 / 1-20',
        hasLegend: false,
        defaultItemCount: 1,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Preschool number sequencing maze worksheet, A4 portrait, 300 DPI, 4K. Top left has a friendly cartoon bee. Winding path of 10 connected hexagon tiles leading to a honey jar at bottom right. Hexagons contain numbers: 1, 2, [blank], 4, 5, [blank], 7, [blank], 9, 10. Warm cheerful yellow accent, clean white activity area, high contrast printable --ar 1:1.414 --q 2`
      }
    ]
  },

  // 4. MATCHING
  {
    id: 'matching',
    number: 4,
    name: 'Matching',
    englishName: 'Matching & Associations',
    iconName: 'GitCommit',
    colorTheme: 'from-emerald-500 to-teal-600',
    badge: 'Penalaran Asosiatif',
    description: 'Mencocokkan bayangan siluet, menghubungkan benda ke panca indra, induk dan anak hewan, serta pasangan huruf besar-kecil.',
    subcategories: [
      {
        id: 'matching-shadow-silhouettes',
        name: 'Cari Bayangannya (Shadow Matching)',
        shortDesc: 'Kolom kiri gambar berwarna dan kolom kanan siluet bayangan hitam teracak dengan titik penarik garis.',
        focus: 'Diskriminasi visual dan pengenalan kontur bentuk luar objek.',
        rules: 'Dua kolom seimbang (5 objek). Kolom kanan teracak tidak sejajar langsung. Titik koneksi jelas di kedua sisi.',
        indonesianHeader: 'Cari Bayangan yang Tepat!',
        indonesianInstruction: 'Hubungkan gambar di sebelah kiri dengan bayangannya yang sesuai di sebelah kanan!',
        defaultTopic: 'Biola Hewan Laut Nusantara (Paus, Penyu, Bintang Laut, Kuda Laut, Ikan Mas)',
        hasLegend: false,
        defaultItemCount: 5,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Kids shadow matching activity worksheet, A4 portrait, 300 DPI, 4K resolution. Left column features 5 colorful cartoon animals (e.g. orange seahorse, blue whale, yellow starfish, pink seashell, green turtle) with connecting dots. Right column features the exact 5 animal silhouettes in solid black in shuffled non-parallel order with connecting dots. Clean central area for drawing pencil lines, printable --ar 1:1.414 --q 2`
      },
      {
        id: 'matching-body-organs-function',
        name: 'Pasangkan Anggota Tubuh ke Fungsinya',
        shortDesc: 'Mata ke kacamata/buku, telinga ke headphone/musik, hidung ke bunga wangi, kaki ke sepatu/bola.',
        focus: 'Mengenal fungsi organ panca indra manusia dalam kehidupan sehari-hari.',
        rules: 'Kolom kiri 4-5 organ tubuh, kolom kanan benda pasangannya dalam urutan teracak.',
        indonesianHeader: 'Fungsi Panca Indraku',
        indonesianInstruction: 'Tarik garis menghubungkan anggota tubuh dengan benda yang sesuai dengan fungsinya!',
        defaultTopic: 'Panca Indra dan Benda Keseharian Anak',
        hasLegend: false,
        defaultItemCount: 4,
        suitableLevels: ['PAUD', 'TK', 'SD1_3'],
        defaultEnglishPrompt: `Early science kindergarten matching worksheet, A4 portrait, 300 DPI, 4K. Left column has 4 clean illustrations of human body parts: Eye, Ear, Nose, Hand. Right column has 4 matching items in scrambled order: Sunglasses, Radio playing music, Fragrant rose flower, Teddy bear texture. Connecting dots next to each icon, clear instructional header --ar 1:1.414 --q 2`
      },
      {
        id: 'matching-parent-baby-animals',
        name: 'Mana Ibuku? (Induk & Anak Hewan)',
        shortDesc: 'Mencocokkan anak hewan imut di kolom kiri ke induk hewan dewasa di kolom kanan.',
        focus: 'Mengenal siklus hidup hewan dan konsep keluarga satwa.',
        rules: '4 pasang hewan. Kiri anak hewan imut, kanan induk hewan dewasa dengan urutan teracak.',
        indonesianHeader: 'Mana Ibuku? Tolong Bayi Hewan Bertemu Induknya!',
        indonesianInstruction: 'Tolong bayi-bayi hewan ini menemukan induknya dengan menarik garis yang tepat ya!',
        defaultTopic: 'Anak dan Induk Hewan Ternak & Liar (Ayam, Sapi, Kucing, Bebek)',
        hasLegend: false,
        defaultItemCount: 4,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Preschool animal science matching worksheet, A4 portrait, 300 DPI, 4K. Left column displays 4 cute baby animals: chick, calf, kitten, duckling. Right column displays the 4 adult parent animals in scrambled order: cow, mother hen, duck, mother cat. Connecting dots next to each picture, clear whitespace for drawing lines, print ready --ar 1:1.414 --q 2`
      }
    ]
  },

  // 5. CUT & PASTE
  {
    id: 'cut_paste',
    number: 5,
    name: 'Cut & Paste',
    englishName: 'Cut & Paste / Craft Activities',
    iconName: 'Scissors',
    colorTheme: 'from-purple-500 to-indigo-600',
    badge: 'Sensori Motorik',
    description: 'Lembar gunting dan tempel: kata ke bentuk huruf, scoop es krim ke cone, puzzle strip jigsaw, dan dadu lipat 3D.',
    subcategories: [
      {
        id: 'cutpaste-letter-word-shape',
        name: 'Pasangkan Kata ke Bentuk Huruf Jumbo',
        shortDesc: 'Huruf besar melengkung dengan lingkaran target tempel di atas, dan strip token gunting di bawah.',
        focus: 'Motorik menggunting dengan gunting tumpul anak dan mencocokkan kata ke gambar.',
        rules: 'Garis gunting putus-putus horizontal dengan ikon gunting. 4 keping token gunting bulat di bawah.',
        indonesianHeader: 'Pasangkan Kata ke Huruf Jumbo (Gunting & Tempel)',
        indonesianInstruction: 'Gunting gambar di bawah garis putus-putus, lalu tempelkan pada huruf sesuai katanya!',
        defaultTopic: 'Huruf D (Donat, Dino, Daging, Daun) atau Huruf B (Bola, Bunga, Buku, Bebek)',
        hasLegend: false,
        defaultItemCount: 4,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Children cut and paste vocabulary worksheet, A4 portrait format, 300 DPI, 4K quality. Upper main area features a giant stylized hollow letter shape containing 4 blank circular target slots labeled with words ("dino", "donat", "daun", "daging"). Bottom area separated by a clear dashed cutting line with scissor icon contains 4 circular cutout picture tokens showing full-color illustrations. Clean printable layout --ar 1:1.414 --q 2`
      },
      {
        id: 'cutpaste-ice-cream-cones',
        name: 'Es Krim Cone Huruf Besar & Scoop Huruf Kecil',
        shortDesc: 'Cone es krim huruf kapital A, B, C, D di atas. Scoop es krim warna-warni huruf kecil di lembar gunting.',
        focus: 'Memasangkan huruf kapital dan non-kapital dengan metafora es krim manis yang disukai anak.',
        rules: '4 wafer cone di area utama. Di bagian bawah strip 4 scoop es krim rasa stroberi, cokelat, vanila, melon.',
        indonesianHeader: 'Pasangkan Huruf Besar & Kecil: Es Krim Lezat',
        indonesianInstruction: 'Gunting scoop es krim huruf kecil di bawah, lalu tempelkan di atas cone huruf besar yang tepat!',
        defaultTopic: 'Cone Huruf A, B, C, D dan Scoop Es Krim a, b, c, d',
        hasLegend: false,
        defaultItemCount: 4,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Preschool cut and paste alphabet matching activity sheet, A4 portrait, 300 DPI, 4K. Top section features 4 waffle cones labeled with bold uppercase letters inside circles ("A", "B", "C", "D"). Bottom section bordered by dashed cutting lines and scissor marks features 4 colorful ice cream scoops labeled with lowercase letters ("b", "c", "d", "a"). Delightful pastel educational theme --ar 1:1.414 --q 2`
      },
      {
        id: 'cutpaste-diy-folding-dice',
        name: 'Membuat Dadu Lipat Aksi Motorik (DIY 3D Dice)',
        shortDesc: 'Jaring-jaring kubus salib lipat 6 sisi dengan gambar aksi hewan dan lidah lem (glue tabs).',
        focus: 'Membangun objek spasial 3 dimensi dan aktivitas gerak fisik anak.',
        rules: 'Pola jaring-jaring kubus utuh dengan garis lipat bertitik-titik dan lidah lem berarsir.',
        indonesianHeader: 'Membuat Dadu Gerak Hewan 3D',
        indonesianInstruction: 'Gunting di garis terluar, lipat pada garis putus-putus, lalu beri lem pada lidah lem menjadi dadu!',
        defaultTopic: 'Dadu Aksi Hewan (Terbang seperti burung, Melompat seperti katak, Merayap seperti ulat)',
        hasLegend: false,
        defaultItemCount: 1,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Printable 3D folding cube net craft activity sheet, A4 portrait, 300 DPI, 4K. Full printable cross-shaped cube net with dotted folding lines, solid outer cutting line, and glue tabs labeled with scissor icons. The 6 cube faces feature cartoon animals paired with Indonesian movement prompts: "Terbang seperti burung", "Melompat seperti katak". Clean vector lines --ar 1:1.414 --q 2`
      }
    ]
  },

  // 6. SAME & DIFFERENT
  {
    id: 'same_different',
    number: 6,
    name: 'Same & Different',
    englishName: 'Visual Discrimination',
    iconName: 'Eye',
    colorTheme: 'from-violet-500 to-purple-600',
    badge: 'Ketelitian Visual',
    description: 'Mencari gambar yang berbeda (Odd One Out), mencari pasangan gambar kembar yang sama persis, dan spot the difference.',
    subcategories: [
      {
        id: 'samediff-odd-one-out',
        name: 'Temukan Gambar yang Berbeda! (Odd One Out)',
        shortDesc: '4 baris kartu horizontal, tiap baris ada 5 gambar serupa di mana 1 gambar berbeda arah atau atributnya.',
        focus: 'Ketelitian observasi visual dan pembedaan detail mikro.',
        rules: '4 baris terpisah dengan bingkai rapi. Satu baris hanya 1 objek yang berbeda secara jelas dan adil.',
        indonesianHeader: 'Temukan Gambar yang Berbeda!',
        indonesianInstruction: 'Perhatikan setiap kelompok gambar, lalu lingkari satu gambar yang berbeda dari yang lain ya!',
        defaultTopic: 'Arah Hewan Menghadap, Bentuk Buah, atau Aksesoris Pakaian',
        hasLegend: false,
        defaultItemCount: 4,
        suitableLevels: ['PAUD', 'TK', 'SD1_3'],
        defaultEnglishPrompt: `Children visual discrimination worksheet, titled "Temukan Gambar yang Berbeda!", A4 portrait, 300 DPI, 4K quality. 4 horizontal rectangular activity cards framed with clean borders. Row 1 has 5 cute cartoon fish, 4 swimming right and 1 swimming left; Row 2 has 5 apples, 4 whole and 1 with a bite taken; Row 3 has 5 birds, 4 on branch and 1 flying; Row 4 has 5 cars, 4 blue sedans and 1 red convertible. Clean high contrast outlines --ar 1:1.414 --q 2`
      },
      {
        id: 'samediff-find-twin-pair',
        name: 'Temukan Pasangan yang Sama Persis (Find Identical Pair)',
        shortDesc: 'Menemukan 2 objek yang memiliki motif dan warna identik di antara kumpulan benda bercorak acak.',
        focus: 'Mencocokkan pola corak tekstur dan warna.',
        rules: '6-8 kaus kaki atau sarung tangan dengan corak belang/polkadot. Hanya ada 1 pasang yang kembar identik.',
        indonesianHeader: 'Cari Pasangan Kaus Kaki yang Kembar!',
        indonesianInstruction: 'Temukan dua kaus kaki yang corak warnanya sama persis, lalu warnai keduanya!',
        defaultTopic: 'Kaus Kaki atau Sarung Tangan Musim Dingin Corak Belang & Bintang',
        hasLegend: false,
        defaultItemCount: 6,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Preschool pattern matching visual game worksheet, A4 portrait, 300 DPI, 4K. Features 8 cute hanging winter socks on a clothesline with distinct patterns (stripes, polka dots, stars, zigzags). Exactly two socks have the identical star-and-stripe pattern. Clean lines, fun puzzle for kids, print ready --ar 1:1.414 --q 2`
      }
    ]
  },

  // 7. MAZE
  {
    id: 'maze',
    number: 7,
    name: 'Maze',
    englishName: 'Mazes & Logic Paths',
    iconName: 'Compass',
    colorTheme: 'from-red-500 to-rose-600',
    badge: 'Pemecahan Masalah',
    description: 'Labirin jalur logika dinding tebal: menghubungkan hewan ke habitat, roket ke bulan, atau organ ke fungsinya.',
    subcategories: [
      {
        id: 'maze-single-path-clear',
        name: 'Labirin Jalur Logika Bertema (Single Solvable Maze)',
        shortDesc: 'Labirin berdinding tegas dengan 1 titik Masuk (Start) dan 1 titik Keluar (Finish) yang valid.',
        focus: 'Perencanaan spasial, koordinasi visual-motorik, dan daya konsentrasi.',
        rules: 'Labirin berada di tengah halaman. Start di kiri atas, Finish di kanan bawah. Jalur cukup lebar untuk coretan krayon.',
        indonesianHeader: 'Bantu Kucing Menemukan Ikannya!',
        indonesianInstruction: 'Telusuri jalan di dalam labirin dan bantu anak kucing mencapai mangkuk ikannya!',
        defaultTopic: 'Kucing Lucu Menuju Ikan Lezat atau Astronot Menuju Planet Mars',
        hasLegend: false,
        defaultItemCount: 1,
        suitableLevels: ['PAUD', 'TK', 'SD1_3'],
        defaultEnglishPrompt: `Children printable maze puzzle worksheet, A4 portrait format, 300 DPI, 4K resolution. Top left entrance features a cheerful cartoon kitten. Center features a clean geometric labyrinth maze with bold rounded wall borders and generous navigable pathways. Bottom right exit features a plate of tasty fish. Single clear valid solution path with no ambiguous dead ends, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'maze-multi-choice-path',
        name: 'Labirin 3 Jalur: Mana yang Sampai Tujuan?',
        shortDesc: '3 anak dengan jalur pipa/tali berbelit-belit menuju 3 hadiah berbeda.',
        focus: 'Menelusuri garis rumit dengan mata sebelum menarik pensil (visual tracking).',
        rules: '3 karakter di atas (A, B, C), 3 garis meliuk saling silang, 3 objek hadiah di bawah (bola, buku, kado).',
        indonesianHeader: 'Jalur Mana yang Sampai ke Kado?',
        indonesianInstruction: 'Telusuri ketiga jalur dengan teliti, siapa yang akan mendapatkan kado istimewa?',
        defaultTopic: 'Tiga Sahabat Menelusuri Jalur Pita ke Kotak Kejutan',
        hasLegend: false,
        defaultItemCount: 3,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Visual tracking path maze worksheet, A4 portrait, 300 DPI, 4K. Top displays three distinct cartoon animal friends (Bunny A, Bear B, Fox C). Three clearly distinguishable winding spaghetti paths twist and cross over each other leading to 3 items at the bottom (bicycle, present box, carrot basket). Clean high contrast printing lines --ar 1:1.414 --q 2`
      }
    ]
  },

  // 8. CODING (12 SUBJENIS LENGKAP DARI KNOWLEDGE GUIDE)
  {
    id: 'coding',
    number: 8,
    name: 'Coding',
    englishName: 'Unplugged Coding for Kids (12 Subtypes Guide)',
    iconName: 'Code',
    colorTheme: 'from-indigo-600 to-sky-600',
    badge: 'Computational Thinking',
    description: '12 subjenis coding unplugged sesuai Coding Guide resmi: 1 halaman = 1 jenis kegiatan (Arah, Garis, Warna, Penjumlahan, Grid, dll).',
    subcategories: [
      {
        id: 'coding-arah',
        name: '1. Coding Arah (↑ ↓ ← → Directional Coding)',
        shortDesc: 'Satu grid utama, titik START, titik TUJUAN, dan rangkaian kode panah untuk diikuti.',
        focus: 'Algoritma sekuensial dan penalaran orientasi spasial mata angin.',
        rules: 'Satu grid utama saja. Titik START dan TUJUAN jelas. Deretan kode panah (↑ ↓ ← →) di atas grid. Satu halaman HANYA Coding Arah.',
        indonesianHeader: 'Coding Arah / Directional Path',
        indonesianInstruction: 'Ikuti kode panah berurutan dari titik START untuk menggambar jalan menuju TUJUAN!',
        defaultTopic: 'Robot Bergerak Menuju Baterai Mengikuti Kode Panah',
        hasLegend: true,
        legendType: 'direction',
        defaultItemCount: 1,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Unplugged directional coding worksheet for kids, titled "Coding Arah", A4 portrait layout, 300 DPI, 4K vector. Header with Name and Class. Top area displays sequential directional arrow code sequence: [Start: ➔ ➔ ⬇ ⬇ ➔ ➔ ⬆ ➔ Target]. Central area: clean 6x6 square grid with robot icon at coordinate (1,1) labeled "START" and battery icon at (5,5) labeled "TUJUAN". Generous grid tiles for children to draw the path line, strictly one single activity type, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-line',
        name: '2. Line Coding (Menyalin Pola Titik Grid)',
        shortDesc: 'Kotak contoh pola titik di kiri, kotak kosong titik di kanan untuk disalin persis.',
        focus: 'Pengenalan simetri dan rekonstruksi bentuk berdasarkan kisi titik matriks.',
        rules: 'Beberapa pasang kotak titik (kisi 3x3 atau 4x4). Format identik untuk setiap soal. Satu halaman HANYA Line Coding.',
        indonesianHeader: 'Line Coding / Salin Pola Titik',
        indonesianInstruction: 'Perhatikan pola garis pada kotak contoh di kiri, lalu buat garis yang persis sama pada kotak titik di kanan!',
        defaultTopic: 'Pola Garis Geometri Sederhana pada Kisi Titik 3x3 & 4x4',
        hasLegend: false,
        legendType: 'line_dots',
        defaultItemCount: 4,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Kids line coding dot-grid copying worksheet, titled "Line Coding", A4 portrait format, 300 DPI, 4K. 4 distinct horizontal activity rows. Each row has a paired side-by-side 3x3 dot matrix: left matrix displays a geometric straight line pattern connecting dots (labeled "Contoh"), right matrix is empty with identical dots for children to replicate (labeled "Salin disini"). Pure single activity layout, high contrast --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-warna',
        name: '3. Coding Warna / Koneksi Warna',
        shortDesc: 'Legend warna & angka di atas (1=Merah, 2=Kuning, dll), soal berisi urutan angka untuk ditarik garis antar titik warna.',
        focus: 'Membaca kode angka dan menghubungkan node warna dalam urutan tepat.',
        rules: 'Legend angka-warna di atas (1=merah, 2=kuning, 3=hijau, 4=biru, 5=teal, 6=ungu). 4-6 soal koneksi warna.',
        indonesianHeader: 'Koneksi Warna Sesuai Kode',
        indonesianInstruction: 'Hubungkan lingkaran warna menggunakan garis lurus sesuai urutan kode angka yang diberikan!',
        defaultTopic: 'Koneksi Jalur Warna Berurutan (4-6 Node Warna)',
        hasLegend: true,
        legendType: 'color',
        defaultItemCount: 6,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Color path algorithmic coding worksheet for children, titled "Koneksi Warna", A4 portrait, 300 DPI, 4K quality. Top legend bar shows 6 numbered color circles: 1=Red, 2=Yellow, 3=Green, 4=Sky Blue, 5=Teal, 6=Purple. Main activity section has 6 rectangular challenge boxes, each featuring an arrow sequence code (e.g. 4 -> 2 -> 1 -> 6 -> 3) above an arrangement of 6 colored circular dots. First challenge solved as visual example, printable --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-pola-warna',
        name: '4. Pola Warna (Color Sequence Pattern)',
        shortDesc: 'Baris pola warna dengan bagian kosong, pilihan warna di kanan untuk dihubungkan.',
        focus: 'Mengenali aturan deret warna berulang (AB, AAB, ABC).',
        rules: '4-6 baris pola warna. Bagian rumpang di tengah/akhir. Pilihan warna di sisi kanan. Satu halaman HANYA pola warna.',
        indonesianHeader: 'Melanjutkan Pola Warna',
        indonesianInstruction: 'Perhatikan urutan pola warnanya, lalu tarik garis ke warna yang tepat untuk melengkapi pola!',
        defaultTopic: 'Pola Lingkaran Warna Berulang (Merah-Biru-Kuning...)',
        hasLegend: false,
        defaultItemCount: 5,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Early childhood pattern coding worksheet, titled "Pola Warna", A4 portrait format, 300 DPI, 4K. 5 horizontal rows of colorful circular sequences with clear patterns (Row 1 Red-Blue-Red-Blue-[blank], Row 2 Green-Green-Yellow-[blank]). On the right side of each row is a multiple choice connector with 3 colored circles. Clean whitespace, pure pattern activity, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-angka-simbol',
        name: '5. Coding Angka (Number-to-Symbol Key)',
        shortDesc: 'Tabel kode angka di atas sebagai representasi huruf/objek, beberapa soal di bawah menggunakan tabel yang sama.',
        focus: 'Konsep dasar enkripsi dan substitusi data (kriptografi anak).',
        rules: 'Tabel kode di bagian atas (Angka 1-9 = Simbol/Huruf). 5 baris soal di bawah. Semua soal pakai kode yang sama.',
        indonesianHeader: 'Coding Angka ke Huruf',
        indonesianInstruction: 'Gunakan tabel kode di atas untuk menerjemahkan angka-angka menjadi kata rahasia!',
        defaultTopic: 'Tabel Kode Angka ke Huruf (1=A, 2=B, 3=C, 4=E, 5=I, 6=K, 7=L, 8=O, 9=U)',
        hasLegend: true,
        legendType: 'color',
        defaultItemCount: 5,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Children secret decoder coding worksheet, titled "Coding Angka", A4 portrait, 300 DPI, 4K crisp vector. Top header contains a master decoder table pairing numbers 1 through 9 with distinct Indonesian letters. Below are 5 numbered challenge rows displaying sequences of numbers inside neat squares, with empty answer boxes underneath for children to write the decoded word. First row solved as example ("1 - 6 - 9" -> "A - K - U"), printable --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-penjumlahan',
        name: '6. Coding Penjumlahan (Fruit / Symbol Math)',
        shortDesc: 'Tabel kode buah/objek bernilai angka di atas, tiap soal 2 objek dijumlahkan: [Nilai 1] + [Nilai 2] = [Hasil].',
        focus: 'Substitusi simbolik aljabar dasar untuk anak sekolah dasar.',
        rules: 'Tabel kode di atas: Semangka=1, Pir=2, Apel=3, Anggur=4, Stroberi=5, Jeruk=6, Nanas=7. 3 kotak isian per soal.',
        indonesianHeader: 'Coding Penjumlahan Buah',
        indonesianInstruction: 'Lihat nilai setiap buah pada tabel kode di atas, lalu ubah buah menjadi angka dan jumlahkan hasilnya!',
        defaultTopic: 'Nilai Buah Tropis Nusantara (Semangka, Pir, Apel, Anggur, Stroberi, Jeruk)',
        hasLegend: true,
        legendType: 'math_symbols',
        defaultItemCount: 5,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Printable math coding worksheet for early elementary, titled "Coding Penjumlahan", A4 portrait layout, 300 DPI, 4K quality. Top reference key displays 6 fruits with assigned integer values (Watermelon=1, Pear=2, Apple=3, Grape=4, Strawberry=5, Orange=6). Below are 5 math problem rows, each showing two illustrated fruits separated by a plus sign, followed by 3 structured write-in boxes: [Value 1] + [Value 2] = [Total]. Clean typography, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-matematika',
        name: '7. Coding Matematika (Operasi Bilangan Satu Jenis)',
        shortDesc: 'Satu halaman hanya SATU jenis operasi (Penjumlahan saja atau Pengurangan saja) dengan kode angka.',
        focus: 'Operasi aritmatika terstruktur berbasis kode.',
        rules: 'Satu halaman HANYA satu jenis operasi. Jangan campur penjumlahan dan perkalian dalam satu lembar.',
        indonesianHeader: 'Coding Matematika',
        indonesianInstruction: 'Tuliskan angka sesuai kode bentuk, lalu hitung hasil perhitungannya!',
        defaultTopic: 'Operasi Penjumlahan Simbol Bentuk Geometri (1-10)',
        hasLegend: true,
        legendType: 'math_symbols',
        defaultItemCount: 6,
        suitableLevels: ['SD1_3', 'SD4_6'],
        defaultEnglishPrompt: `Kids mathematical symbol substitution worksheet, titled "Coding Matematika", A4 portrait, 300 DPI, 4K. Top code table assigns whole numbers to geometric shapes. Main area contains 6 arithmetic addition problems with shape icons and blank answer slots. Single consistent operation type throughout, clear educational font --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-luas-objek',
        name: '8. Menentukan Luas Objek / Grid Coding',
        shortDesc: 'Grid besar dengan beberapa objek kartun berwarna, anak menghitung jumlah kotak grid yang ditempati tiap objek.',
        focus: 'Konsep dasar luas bangun datar pada bidang berpetak (Area calculation).',
        rules: 'Satu grid besar. Beberapa objek menempati sejumlah kotak petak. Daftar objek di bawah dengan kotak jawaban jumlah kotak.',
        indonesianHeader: 'Menentukan Luas Objek pada Grid',
        indonesianInstruction: 'Hitung berapa banyak kotak grid yang ditempati oleh masing-masing objek, lalu tuliskan jawabannya!',
        defaultTopic: 'Menghitung Luas Petak Hewan & Bangunan pada Grid 10x10',
        hasLegend: false,
        legendType: 'grid_coords',
        defaultItemCount: 4,
        suitableLevels: ['TK', 'SD1_3', 'SD4_6'],
        defaultEnglishPrompt: `Grid area computation coding worksheet, titled "Menentukan Luas Objek", A4 portrait layout, 300 DPI, 4K resolution. Central area contains a clean 10x10 grid with several illustrated cartoon objects occupying discrete numbers of unit squares (e.g. Blue car occupying 4 squares, Garden occupying 6 squares, House occupying 9 squares). Bottom section lists the objects with write-in boxes: "[ ] kotak". Clean high-contrast grid lines, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-menimbang',
        name: '9. Menimbang dan Menjumlah (Shapes Weight Scale)',
        shortDesc: 'Tabel nilai bentuk geometri di atas (Belah ketupat=1, Pentagon=2, Segitiga=3, Lingkaran=4, Persegi=5), anak menjumlahkan nilai pada timbangan.',
        focus: 'Konsep keseimbangan neraca dan bobot aljabar intuitif.',
        rules: 'Tabel bentuk-nilai di atas. 4-6 gambar timbangan neraca dua lengan. Satu kotak jawaban per soal.',
        indonesianHeader: 'Menimbang dan Menjumlah',
        indonesianInstruction: 'Lihat nilai setiap bentuk pada tabel di atas, lalu hitung total berat bentuk pada timbangan!',
        defaultTopic: 'Timbangan Neraca Bentuk Geometri (Belah Ketupat, Pentagon, Segitiga, Lingkaran, Persegi)',
        hasLegend: true,
        legendType: 'shapes_weight',
        defaultItemCount: 4,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Kids balance scale weight coding worksheet, titled "Menimbang dan Menjumlah", A4 portrait, 300 DPI, 4K. Top code table specifies: Rhombus=1, Pentagon=2, Triangle=3, Circle=4, Square=5. Below are 4 balance scale balance illustrations holding combinations of shapes on one side and a blank total weight box on the other. Strictly single activity type, educational print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-pattern',
        name: '10. Pattern Coding (Pola Angka / Bentuk / Simbol)',
        shortDesc: 'Mengenali dan melanjutkan pola simbolik, satu halaman hanya satu tipe pola terstruktur.',
        focus: 'Kemampuan induksi logika dan prediksi elemen berikutnya dalam deret.',
        rules: 'Satu halaman HANYA satu tipe pola. Deret 4-6 baris dengan titik-titik untuk digambar/ditulis anak.',
        indonesianHeader: 'Pattern Coding / Pola Simbolik',
        indonesianInstruction: 'Perhatikan urutan pola simbol di setiap baris, lalu gambarlah simbol berikutnya pada kotak titik-titik!',
        defaultTopic: 'Pola Bentuk Geometri Berulang (Bintang, Segitiga, Lingkaran, Hati)',
        hasLegend: false,
        defaultItemCount: 5,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Preschool pattern recognition coding activity, titled "Pattern Coding", A4 portrait format, 300 DPI, 4K. 5 horizontal activity rows with geometric shapes in recurring sequences with dotted box at the end for students to draw the next pattern element. Symmetrical, balanced whitespace, clean line art --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-grid-coords',
        name: '11. Grid Coding (Sistem Koordinat Kisi A-I x 1-9)',
        shortDesc: 'Papan grid kolom huruf A-I dan baris angka 1-9 dengan ikon objek lucu, anak menuliskan koordinat (Kolom, Baris).',
        focus: 'Sistem koordinat Kartesius 2D dan membaca matriks data.',
        rules: 'Satu grid koordinat utama. Daftar objek di bawah dengan slot koordinat (Kolom, Baris). Format konsisten.',
        indonesianHeader: 'Find Coordinates / Mencari Koordinat',
        indonesianInstruction: 'Cari koordinat setiap objek pada tabel grid, lalu tuliskan pada kolom jawaban di bawah!',
        defaultTopic: 'Grid Koordinat 6x6 / 8x8 Objek Ceria (A-H x 1-8)',
        hasLegend: true,
        legendType: 'grid_coords',
        defaultItemCount: 6,
        suitableLevels: ['TK', 'SD1_3', 'SD4_6'],
        defaultEnglishPrompt: `Printable children's grid coordinates spatial worksheet, titled "Find Coordinates", A4 portrait layout, 300 DPI, 4K sharp quality. Top header: Name and Class. Center: 8x8 grid table with columns labeled A through H and rows labeled 1 through 8. Cute cartoon items placed at specific grid squares (Car at A1, Fish at D3, Airplane at G5). Bottom: icon list with fill-in blanks "(Column, Row)" e.g. "(A, 1)". Clean vector precision, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-pixel',
        name: '12. Pixel Coding (Mewarnai Grid Berdasarkan Kode)',
        shortDesc: 'Mewarnai kotak grid piksel berdasarkan kode angka/huruf untuk memunculkan gambar misterius (Pixel Art).',
        focus: 'Representasi grafis digital pada piksel bitmap (dasar computer graphics).',
        rules: 'Grid piksel (10x10 atau 12x12). Legend warna di atas: 1=Merah, 2=Kuning, 3=Biru, 4=Putih. Satu halaman 1 pixel art.',
        indonesianHeader: 'Pixel Coding / Gambar Rahasia',
        indonesianInstruction: 'Warnai setiap kotak grid sesuai kode angka pada petunjuk untuk membuka gambar rahasia!',
        defaultTopic: 'Pixel Art Hati Ceria, Apel, atau Perahu Layar (Grid 10x10)',
        hasLegend: true,
        legendType: 'color',
        defaultItemCount: 1,
        suitableLevels: ['TK', 'SD1_3', 'SD4_6'],
        defaultEnglishPrompt: `Kids pixel coding color-by-number worksheet, titled "Pixel Coding", A4 portrait, 300 DPI, 4K quality. Top legend bar shows 4 color codes (1=Red, 2=Yellow, 3=Sky Blue, 4=White). Center features a 12x12 numbered pixel square grid where numbers form a hidden pixel art image (heart or rocket). Clean grid border lines, clear numbers in squares, print ready --ar 1:1.414 --q 2`
      }
    ]
  },

  // 9. ALPHABET & LITERACY
  {
    id: 'alphabet_literacy',
    number: 9,
    name: 'Alphabet & Literacy',
    englishName: 'Alphabet & Phonics',
    iconName: 'BookOpen',
    colorTheme: 'from-amber-600 to-yellow-600',
    badge: 'Fonik & Literasi',
    description: 'Mengenal huruf awalan, mencari huruf di dalam bentuk siluet buah/hewan, pilihan heksagon huruf depan, dan susun huruf acak.',
    subcategories: [
      {
        id: 'alpha-hidden-in-shape',
        name: 'Cari Huruf Tertentu di Dalam Siluet Objek',
        shortDesc: 'Siluet jerapah atau jeruk dipenuhi huruf acak di dalamnya, anak melingkari huruf awalan kata.',
        focus: 'Mengenali bentuk huruf kecil dan melatih diskriminasi visual.',
        rules: 'Siluet objek besar di tengah berisi kumpulan huruf acak. Kotak pencatatan jumlah huruf di bawah.',
        indonesianHeader: 'Cari Huruf Depannya!',
        indonesianInstruction: 'Temukan dan lingkari semua huruf yang sesuai di dalam gambar ini ya!',
        defaultTopic: 'Mencari Huruf "J" di Dalam Siluet Jerapah atau Jeruk',
        hasLegend: false,
        defaultItemCount: 1,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Preschool letter hunt worksheet, titled "Cari Huruf Depannya!", A4 portrait, 300 DPI, 4K. Center features a large clean outline silhouette of a cartoon giraffe filled with dozens of scattered lowercase letters. Students must find and circle all the letter "j"s. Clean high contrast outlines, ample whitespace --ar 1:1.414 --q 2`
      },
      {
        id: 'alpha-hexagon-first-letter',
        name: 'Yang Mana Huruf Depannya? (Hexagon Choices)',
        shortDesc: 'Kotak bergambar hewan di kiri, dan 3 heksagon pilihan huruf kapital di kanan untuk dilingkari.',
        focus: 'Menghubungkan bunyi fonem awal kata dengan lambang huruf.',
        rules: '3-4 baris kartu. Sisi kiri gambar objek, sisi kanan 3 tombol heksagon berisi huruf pilihan.',
        indonesianHeader: 'Yang Mana Huruf Depannya?',
        indonesianInstruction: 'Perhatikan gambar di sebelah kiri, lalu lingkari huruf awalan kata yang benar!',
        defaultTopic: 'Huruf Awalan Hewan Nusantara (Flamingo, Gajah, Harimau, Kelinci)',
        hasLegend: false,
        defaultItemCount: 4,
        suitableLevels: ['PAUD', 'TK', 'SD1_3'],
        defaultEnglishPrompt: `Preschool initial letter phonics worksheet, A4 portrait, 300 DPI, 4K. 4 distinct horizontal activity cards. Each card displays an illustrated cartoon item on the left (Flamingo, Elephant, Tiger, Rabbit) and three vertical hexagon letter buttons on the right to circle the correct initial letter. Clean typography, print ready --ar 1:1.414 --q 2`
      }
    ]
  },

  // 10. BAHASA INDONESIA
  {
    id: 'bahasa_indonesia',
    number: 10,
    name: 'Bahasa Indonesia',
    englishName: 'Indonesian Language Reading & Vocabulary',
    iconName: 'Bookmark',
    colorTheme: 'from-emerald-600 to-teal-700',
    badge: 'Bahasa & Sastra',
    description: 'Menyusun huruf acak, membaca suku kata terbuka (ba-ca, bo-la), melengkapi huruf vokal yang hilang, dan lawan kata bergambar.',
    subcategories: [
      {
        id: 'indo-word-scramble',
        name: 'Susun Kata Anggota Tubuh / Hewan (Unscramble)',
        shortDesc: 'Gambar objek di kiri, huruf teracak di tengah, garis bawah untuk menulis kata yang benar di kanan.',
        focus: 'Mengeja kata dasar bahasa Indonesia secara fonemik.',
        rules: '5 baris terpisah rapi. Kolom kiri gambar, tengah huruf acak berspasi lebar, kanan garis isian kata.',
        indonesianHeader: 'Susun Huruf Menjadi Kata yang Benar',
        indonesianInstruction: 'Susunlah huruf-huruf acak berikut menjadi kata yang sesuai dengan gambarnya!',
        defaultTopic: 'Kosakata Anggota Tubuh (Tangan, Mata, Gigi, Hidung, Bibir)',
        hasLegend: false,
        defaultItemCount: 5,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Indonesian spelling word scramble worksheet for kids, titled "Susun Kata", A4 portrait layout, 300 DPI, 4K. 5 horizontal activity rows: Left column has clean illustrated body parts (Hand, Eye, Teeth, Nose, Lips); Middle column has scrambled lowercase letters with wide spacing; Right column has handwriting guidelines for writing the solved word. Clean education layout --ar 1:1.414 --q 2`
      },
      {
        id: 'indo-word-search-7x7',
        name: 'Cari dan Lingkari Kata Tersembunyi (Word Search 7x7)',
        shortDesc: 'Matriks huruf 7x7 kotak dengan 5 kosakata tersembunyi secara mendatar dan menurun, plus daftar kata di bawah.',
        focus: 'Kemampuan membaca cepat dan memindai teks huruf.',
        rules: 'Matriks kisi 7x7 bergaris rapi. 5 kata bahasa Indonesia familiar. Checklist daftar kata di bawah.',
        indonesianHeader: 'Cari dan Lingkari Kata',
        indonesianInstruction: 'Temukan 5 kata yang tersembunyi di dalam kotak huruf, lalu lingkari ya!',
        defaultTopic: 'Nama-nama Satwa Rimba Nusantara (Gajah, Rusa, Elang, Kucing, Kancil)',
        hasLegend: false,
        defaultItemCount: 5,
        suitableLevels: ['SD1_3', 'SD4_6'],
        defaultEnglishPrompt: `Indonesian elementary word search worksheet, titled "Cari dan Lingkari Kata", A4 portrait, 300 DPI, 4K. Top instruction. Center displays a clear 7x7 uppercase letter grid with crisp borders containing hidden words horizontally and vertically. Bottom section lists the 5 target words with checkboxes. Large legible font, print ready --ar 1:1.414 --q 2`
      }
    ]
  },

  // 11. MATEMATIKA
  {
    id: 'matematika',
    number: 11,
    name: 'Matematika',
    englishName: 'Elementary Math & Logic',
    iconName: 'Shapes',
    colorTheme: 'from-blue-600 to-indigo-700',
    badge: 'Numerasi',
    description: 'Penjumlahan dan pengurangan bergambar, perbandingan ukuran besar-kecil, deret bilangan loncat, dan geometri dasar.',
    subcategories: [
      {
        id: 'math-pictorial-add-sub',
        name: 'Penjumlahan & Pengurangan Bergambar Objek',
        shortDesc: 'Soal hitung dengan gambar konkret (mobil + mobil = [ ], atau apel disilang tanda X merah untuk pengurangan).',
        focus: 'Memahami arti operasi hitung tambah dan kurang secara visual sebelum simbolik.',
        rules: '4-5 baris soal. Penjumlahan objek utuh, pengurangan dengan tanda silang merah jelas pada objek yang dikurangi.',
        indonesianHeader: 'Penjumlahan & Pengurangan Bergambar',
        indonesianInstruction: 'Hitung gambar objeknya dan tuliskan jawabanmu pada kotak yang tersedia!',
        defaultTopic: 'Penjumlahan dan Pengurangan Buah & Kendaraan Ceria',
        hasLegend: false,
        defaultItemCount: 4,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Early grade math worksheet with pictorial addition and subtraction, A4 portrait, 300 DPI, 4K. 4 horizontal problem rows. Top two rows show addition with cute illustrated objects; Bottom two rows show subtraction with objects crossed out with clean red X marks. Large write-in answer boxes, clear math symbols, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'math-size-comparison',
        name: 'Perbandingan Ukuran (Besar vs Kecil)',
        shortDesc: '6 kotak perbandingan, tiap kotak menampilkan 2-3 objek serupa pada skala berbeda untuk dilingkari yang paling besar.',
        focus: 'Konsep ukuran relatif (lebih besar, lebih kecil, paling besar).',
        rules: '6 kotak rounded border. Perbedaan ukuran jelas dan tidak membingungkan.',
        indonesianHeader: 'Perbandingan Ukuran: Mana yang Lebih Besar?',
        indonesianInstruction: 'Pilih dan lingkari gambar yang ukurannya LEBIH BESAR pada setiap kotak ya!',
        defaultTopic: 'Hewan dan Benda Sekitar (Gajah vs Kucing, Bola Basket vs Kelereng)',
        hasLegend: false,
        defaultItemCount: 6,
        suitableLevels: ['PAUD', 'TK'],
        defaultEnglishPrompt: `Preschool size comparison worksheet, titled "Perbandingan Ukuran", A4 portrait, 300 DPI, 4K. 6 rectangular comparison boxes arranged neatly in two columns. Inside each box are two identical cartoon illustrations at noticeably different scales. Instruction banner at top: "Pilih yang ukurannya LEBIH BESAR". High contrast print design --ar 1:1.414 --q 2`
      }
    ]
  },

  // 12. SCIENCE
  {
    id: 'science',
    number: 12,
    name: 'Science',
    englishName: 'Science & Discovery',
    iconName: 'FlaskConical',
    colorTheme: 'from-teal-600 to-emerald-700',
    badge: 'Eksplorasi Sains',
    description: 'Siklus hidup makhluk hidup, bagian tubuh hewan & tumbuhan, wujud zat (padat, cair, gas), dan sistem tata surya kita.',
    subcategories: [
      {
        id: 'sci-life-cycle',
        name: 'Siklus Hidup Metamorfosis (Life Cycle Stages)',
        shortDesc: 'Diagram melingkar 4 tahap perkembangan (Telur -> Ulat -> Kepompong -> Kupu-kupu) dengan kotak nomor 1-4.',
        focus: 'Memahami proses metamorfosis dan daur hidup makhluk hidup di alam.',
        rules: 'Diagram siklus melingkar dengan panah berurutan. Kotak nomor urut 1, 2, 3, 4 untuk diisi anak.',
        indonesianHeader: 'Daur Hidup Kupu-kupu (Metamorfosis)',
        indonesianInstruction: 'Tuliskan nomor 1 sampai 4 pada lingkaran untuk menunjukkan urutan daur hidup kupu-kupu yang benar!',
        defaultTopic: 'Daur Hidup Kupu-kupu atau Katak Hijau',
        hasLegend: false,
        defaultItemCount: 4,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Children elementary science life cycle worksheet, titled "Daur Hidup Kupu-kupu", A4 portrait, 300 DPI, 4K quality. Circular life cycle diagram with 4 clear stages connected by curved arrows: Eggs on leaf, Caterpillar crawling, Chrysalis hanging, Beautiful butterfly emerging. Each stage has a blank circular number slot (1 to 4) for students to sequence. High contrast vector illustrations --ar 1:1.414 --q 2`
      },
      {
        id: 'sci-solar-system',
        name: 'Mengenal Planet Tata Surya (Solar System Order)',
        shortDesc: 'Matahari di kiri dan lintasan orbit planet (Merkurius, Venus, Bumi, Mars, Jupiter, Saturnus, Uranus, Neptunus).',
        focus: 'Pengenalan antariksa, urutan orbit planet dari matahari, dan ciri khas planet.',
        rules: 'Ilustrasi matahari di sisi kiri dengan garis orbit melengkung. Garis isian nama planet di bawah setiap planet.',
        indonesianHeader: 'Sistem Tata Surya Kita',
        indonesianInstruction: 'Perhatikan urutan planet dari Matahari, lalu pasangkan nama planet pada garis yang tepat!',
        defaultTopic: 'Urutan 8 Planet Tata Surya dari Matahari',
        hasLegend: false,
        defaultItemCount: 8,
        suitableLevels: ['SD1_3', 'SD4_6'],
        defaultEnglishPrompt: `Kids solar system science worksheet, titled "Tata Surya Kita", A4 portrait format, 300 DPI, 4K resolution. Top displays the Sun with orbital paths showing Mercury, Venus, Earth, Mars, Jupiter, Saturn with rings, Uranus, Neptune. Below each planet is a handwriting line with word bank at the bottom. Clean, scientifically accurate for children, print ready --ar 1:1.414 --q 2`
      }
    ]
  },

  // 13. ISLAMIC WORKSHEET
  {
    id: 'islamic_worksheet',
    number: 13,
    name: 'Islamic Worksheet',
    englishName: 'Islamic Early Education',
    iconName: 'Moon',
    colorTheme: 'from-emerald-700 to-green-800',
    badge: 'Pendidikan Islam',
    description: 'Belajar huruf Hijaiyah berharakat, mengenal Rukun Islam & Rukun Iman, adab & doa harian anak muslim, serta alat ibadah.',
    subcategories: [
      {
        id: 'islamic-hijaiyah-tracing',
        name: 'Belajar & Tracing Huruf Hijaiyah Berharakat',
        shortDesc: 'Huruf hijaiyah besar dengan panah urutan goresan, kosakata bahasa Arab bergambar, dan baris latihan menulis rapi.',
        focus: 'Mengenal makhraj huruf hijaiyah dan melatih kelenturan menulis kaligrafi Arab dari kanan ke kiri.',
        rules: 'Tata letak kanan-ke-kiri. Huruf hijaiyah berharakat jelas. 3-4 baris latihan menulis titik-titik.',
        indonesianHeader: 'Belajar Menulis Huruf Hijaiyah',
        indonesianInstruction: 'Tebalkan huruf hijaiyah di bawah ini dari kanan ke kiri dengan rapi ya!',
        defaultTopic: 'Huruf Ba (ب) dengan Kata "بُرْتُقَالٌ" (Jeruk) atau Huruf Alif (أ)',
        hasLegend: false,
        defaultItemCount: 4,
        suitableLevels: ['PAUD', 'TK', 'SD1_3'],
        defaultEnglishPrompt: `Islamic early education Arabic alphabet tracing worksheet, titled "Belajar Hijaiyah", A4 portrait, 300 DPI, 4K. Top section shows illustrated Arabic vocabulary with tashkeel vowel marks. Large hollow Arabic letter with directional arrows for right-to-left stroke order. Lower section has 4 ruled handwriting rows with dotted Arabic letters for tracing. Warm green and gold educational theme, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'islamic-rukun-matching',
        name: 'Mengenal 5 Rukun Islam Bergambar',
        shortDesc: '5 pilar rukun Islam (Syahadat, Shalat, Zakat, Puasa, Haji) dengan ilustrasi masjid, ka\'bah, dan sedekah.',
        focus: 'Menanamkan pemahaman aqidah dan rukun dasar agama Islam sejak usia dini.',
        rules: '5 kartu urutan rukun Islam. Kotak nomor urut 1 sampai 5 untuk dipasangkan anak.',
        indonesianHeader: 'Mengenal 5 Rukun Islam',
        indonesianInstruction: 'Urutkan 5 Rukun Islam dengan menuliskan nomor 1 sampai 5 pada kotak yang sesuai!',
        defaultTopic: '5 Rukun Islam (Syahadat, Shalat, Zakat, Puasa, Haji ke Baitullah)',
        hasLegend: false,
        defaultItemCount: 5,
        suitableLevels: ['TK', 'SD1_3'],
        defaultEnglishPrompt: `Islamic children religious education worksheet, titled "Mengenal 5 Rukun Islam", A4 portrait, 300 DPI, 4K quality. 5 distinct cards featuring Islamic pillars: 1. Shahada banner, 2. Boy praying on prayer mat, 3. Giving zakat charity box, 4. Dates for fasting, 5. Kaaba in Mecca for Hajj. Blank square numbers on each card for children to sequence 1 to 5. Clean wholesome design --ar 1:1.414 --q 2`
      }
    ]
  }
];

// RECOMMENDATION HELPER
// Given age or theme, recommends 4-7 relevant activities from Knowledge
export function getRecommendedWorksheets(themeOrTopic: string, level: string): WorksheetSubcategoryKnowledge[] {
  const allSubcategories = worksheetCategoriesKnowledge.flatMap((c) => c.subcategories);
  const q = themeOrTopic.toLowerCase();

  // If theme mentions animals/hewan
  if (q.includes('hewan') || q.includes('animal') || q.includes('satwa')) {
    return allSubcategories.filter((s) =>
      ['matching-shadow-silhouettes', 'counting-objects-box', 'samediff-odd-one-out', 'maze-single-path-clear', 'tracing-prewriting-lines', 'cutpaste-letter-word-shape', 'coloring-mask'].includes(s.id)
    );
  }

  // If theme mentions math / angka / berhitung
  if (q.includes('angka') || q.includes('hitung') || q.includes('math') || q.includes('tambah')) {
    return allSubcategories.filter((s) =>
      ['counting-objects-box', 'counting-circle-number-grid', 'counting-honeycomb-maze', 'coding-penjumlahan', 'coding-menimbang', 'math-pictorial-add-sub', 'math-size-comparison'].includes(s.id)
    );
  }

  // If theme mentions coding / logika / komputer
  if (q.includes('coding') || q.includes('arah') || q.includes('logika') || q.includes('grid')) {
    return allSubcategories.filter((s) =>
      ['coding-arah', 'coding-line', 'coding-warna', 'coding-pola-warna', 'coding-penjumlahan', 'coding-luas-objek', 'coding-grid-coords'].includes(s.id)
    );
  }

  // If theme mentions islam / hijaiyah / agama
  if (q.includes('islam') || q.includes('hijaiyah') || q.includes('arab') || q.includes('sholat')) {
    return allSubcategories.filter((s) =>
      ['islamic-hijaiyah-tracing', 'islamic-rukun-matching', 'tracing-alphabet-stroke', 'coloring-by-shape'].includes(s.id)
    );
  }

  // If PAUD/TK level
  if (level.includes('PAUD') || level.includes('TK')) {
    return allSubcategories.filter((s) =>
      ['coloring-by-shape', 'tracing-prewriting-lines', 'counting-objects-box', 'matching-shadow-silhouettes', 'cutpaste-ice-cream-cones', 'samediff-odd-one-out', 'maze-single-path-clear'].includes(s.id)
    );
  }

  // Default rich spread across knowledge
  return [
    allSubcategories[0], // coloring-by-shape
    allSubcategories[3], // tracing-stroke
    allSubcategories[6], // counting-objects
    allSubcategories[9], // matching-shadow
    allSubcategories[12], // cutpaste-letter
    allSubcategories[15], // coding-arah
    allSubcategories[21]  // coding-penjumlahan
  ];
}
