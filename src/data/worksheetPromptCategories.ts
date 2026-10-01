import { WorksheetCategoryDef } from '../types';

export const worksheetPromptCategories: WorksheetCategoryDef[] = [
  // 1. CODING UNPLUGGED & LOGIKA SPASIAL
  {
    id: 'coding',
    name: 'Coding & Logika Spasial',
    iconName: 'Code',
    description: 'Unplugged coding untuk anak: kode warna huruf, sistem koordinat kisi (grid), dan koneksi jalur logika.',
    subtypes: [
      {
        id: 'coding-color-letters',
        name: 'Kode Warna ke Huruf / Kata (Color-to-Word)',
        description: 'Tabel lingkaran berwarna yang masing-masing mewakili huruf tertentu. Murid menyusun kata dengan membaca urutan warna.',
        indonesianHeader: 'Menulis Huruf dengan Kode Warna',
        indonesianInstruction: 'Tulis huruf-huruf yang mewakili setiap warna lingkaran seperti contoh!',
        visualReferenceNote: 'Header Nama & Kelas dengan aksen not musik ceria. Baris palet warna di atas (Kuning=a, Toska=o, Hijau=e, Merah muda=b, Oranye=c, Ungu=l). Baris lingkaran warna di bawah dengan kotak isian kata di sebelah kanan.',
        defaultTopic: 'Menulis Kata Berdasarkan Kode Warna Lingkaran (baca, bola, apel)',
        defaultEnglishPrompt: `Educational unplugged coding worksheet for preschool and kindergarten, titled "Menulis Huruf", A4 portrait format, 300 DPI, 4K resolution, ultra-clean vector graphics. Top section: Name and Class header with subtle pastel musical notes and confetti. Upper reference key: 6 pastel colored circular badges with letters underneath (Yellow="a", Cyan="o", Green="e", Coral Pink="b", Orange="c", Lavender="l"). Main activity area: 5 rows containing 4 colored circle dots each (e.g. Coral, Yellow, Orange, Yellow) followed by an equals sign and a clean rectangular blank handwriting box for students to spell out the word. First row solved as example ("baca"). Minimalist, high contrast, crisp lines, perfect for photocopy, professional print layout --ar 1:1.414 --q 2 --style raw`
      },
      {
        id: 'coding-grid-coordinates',
        name: 'Sistem Koordinat Kisi (Find Coordinates)',
        description: 'Papan grid kolom huruf A-I dan baris angka 1-9 dengan ikon objek lucu. Murid mencari koordinat (Kolom, Baris) tiap objek.',
        indonesianHeader: 'Find Coordinates / Mencari Koordinat',
        indonesianInstruction: 'Cari koordinat setiap objek pada tabel grid, lalu tuliskan pada kolom jawaban di bawah!',
        visualReferenceNote: 'Grid matriks 9x9 dengan header kolom A, B, C, D, E, F, G, H, I dan baris 1, 2, 3, 4, 5, 6, 7, 8, 9. Di dalamnya tersebar mobil biru, bola basket, pesawat, ikan, gunting, boneka beruang, helikopter, burung, dan bintang laut.',
        defaultTopic: 'Grid Koordinat Spasial Objek Kartun Lucu (A-I x 1-9)',
        defaultEnglishPrompt: `Printable math and spatial reasoning worksheet for kids, "Find Coordinates", A4 portrait layout, 300 DPI, 4K sharp quality. Top header: Name field with dotted line. Central area: 9x9 grid table with columns labeled A through I with red arrow indicator "Columns", rows labeled 1 through 9 with red arrow indicator "Rows". Cute cartoon illustrations placed at specific intersections (Blue car at A1, Basketball at C2, Toy airplane at E3, Yellow fish at H4, Orange fish at D5, Scissors at I2, Teddy bear at G1, Yellow helicopter at B6, Blue starfish at F7, Soccer ball at H8, House at B9, Red bird at G9). Bottom section: row of icons with coordinate fill-in slots "(Column, Row)" e.g. "(A, 1)". Clean rounded border frame, teal border accent, vector precision, high contrast print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-color-nodes',
        name: 'Koneksi Warna Berurutan (Color Path Logic)',
        description: 'Menghubungkan titik-titik warna mengikuti kode urutan panah angka (Algoritma jalur logika).',
        indonesianHeader: 'Koneksi Warna Sesuai Kode',
        indonesianInstruction: 'Hubungkan warna sesuai kode angka yang ditentukan menggunakan garis lurus!',
        visualReferenceNote: 'Kode angka berurutan e.g. [4 -> 2 -> 1 -> 6 -> 3] di atas kisi 6 titik lingkaran warna (Merah, Kuning, Hijau, Biru muda, Biru tua, Ungu). Murid menarik garis menghubungkan node warna.',
        defaultTopic: 'Algoritma Urutan Koneksi Titik Warna',
        defaultEnglishPrompt: `Kids computational thinking and algorithmic sequencing activity sheet, titled "Koneksi Warna", A4 portrait orientation, 300 DPI, 4K crisp resolution. Top header with Name and Class fields. Reference key showing 6 numbered color circles (1=Red, 2=Yellow, 3=Green, 4=Sky Blue, 5=Navy Blue, 6=Purple). 6 challenge boxes, each featuring an arrow sequence code in black outline box (e.g. 4 -> 2 -> 1 -> 6 -> 3) above an arrangement of 6 colored circular nodes. First challenge shows example connecting line drawn between colors. Symmetrical, crisp white background, orange rounded outer card frame, vector printable --ar 1:1.414 --q 2`
      },
      {
        id: 'coding-pattern-shapes',
        name: 'Melengkapi Pola Bentuk (Pattern Completion)',
        description: 'Deret pola bentuk geometri berulang (lingkaran, kotak, segitiga, bintang, hati). Murid menggambar bentuk berikutnya pada titik-titik.',
        indonesianHeader: 'Melengkapi Pola Bentuk',
        indonesianInstruction: 'Gambarlah bentuk yang sesuai dengan pola berulang di bawah ini!',
        visualReferenceNote: '6 kotak horizontal berisi deretan bentuk geometri berwarna (lingkaran pink, kotak kuning, segitiga hijau, hati biru, bintang oranye). Terdapat garis titik-titik di posisi yang harus dilengkapi.',
        defaultTopic: 'Pola Berulang Geometri Warna-Warni untuk PAUD & SD',
        defaultEnglishPrompt: `Preschool pattern recognition and logic reasoning worksheet, "Melengkapi Pola Bentuk", A4 portrait size, 300 DPI, 4K ultra-sharp print quality. Header with Name and Class. 6 distinct horizontal rounded rectangular card rows displaying colorful geometric shape patterns: Row 1 circle and squares (pink circle, yellow square, yellow square, pink circle, yellow square, [dotted line gap], pink circle, yellow square); Row 2 triangles and hearts (green triangle, green triangle, blue heart...); Row 3 stars and circles; Row 4 pentagon and down triangles; Row 5 circles and triangles; Row 6 diamonds and hearts. Clean high-contrast typography, yellow border frame, sharp vector lines --ar 1:1.414 --q 2`
      }
    ]
  },

  // 2. MEWARNAI (COLORING & COLOR-BY-CODE)
  {
    id: 'mewarnai',
    name: 'Mewarnai & Color-by-Code',
    iconName: 'Palette',
    description: 'Lembar mewarnai edukatif: mewarnai sesuai bentuk, color-by-number, mewarnai topeng hewan, dan ilustrasi indah.',
    subtypes: [
      {
        id: 'mewarnai-sesuai-bentuk',
        name: 'Mewarnai Sesuai Bentuk (Color by Shape)',
        description: 'Objek binatang bergaris hitam putih dengan pola geometri di dalamnya. Panduan pensil warna di atas (Lingkaran=Biru, Segitiga=Biru muda, Kotak=Kuning).',
        indonesianHeader: 'Mewarnai Sesuai Bentuk',
        indonesianInstruction: 'Warnai gambarnya sesuai dengan petunjuk bentuk geometri di bawah ini!',
        visualReferenceNote: 'Contoh: Ikan atau Singa lucu garis tebal hitam putih. Di dalamnya terdapat simbol lingkaran, segitiga, dan kotak. Di atasnya terdapat panduan krayon pensil warna.',
        defaultTopic: 'Mewarnai Ikan / Singa Sesuai Simbol Bentuk Geometri',
        defaultEnglishPrompt: `Kids color-by-shape educational coloring page, titled "Mewarnai Sesuai Bentuk", A4 portrait layout, 300 DPI, 4K high resolution line art. Top instruction banner displaying color-key crayons: Circle = Dark Blue crayon, Triangle = Light Blue crayon, Square = Yellow crayon. Large charming friendly cartoon animal (cute fish with scales or smiling lion with mane) with thick clean black outlines for coloring. Inside the animal are clear geometric shape symbols (circles, small triangles, small squares) indicating which color to fill in. Crisp black and white vector outlines, ample coloring space, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'mewarnai-topeng-hewan',
        name: 'Mewarnai Topeng Hewan Siap Pakai (Printable Mask)',
        description: 'Pola topeng singa, kelinci, atau rubah untuk diwarnai, digunting pada garis putus-putus, dan dilubangi untuk tali karet dan mata.',
        indonesianHeader: 'Mewarnai Topeng Hewan',
        indonesianInstruction: 'Yuk bermain peran di kerajaan hutan! Warnai topeng di bawah, lalu gunting dan pakai!',
        visualReferenceNote: 'Outline topeng kepala hewan besar memenuhi halaman A4. Garis luar putus-putus dengan ikon gunting. Lingkaran biru untuk lubang mata, lingkaran merah di samping untuk tali karet.',
        defaultTopic: 'Topeng Singa / Kelinci / Rubah Rimba Nusantara',
        defaultEnglishPrompt: `Printable kids animal mask craft coloring page, titled "Mewarnai Topeng Hewan", A4 portrait format, 300 DPI, 4K resolution. Full-page bold clean outline of a friendly cute animal face mask (Lion with majestic mane / Adorable Bunny with flower ear / Clever Fox). Outer cutting border with dashed lines and cute scissor icons. Two dashed blue circles for cut-out eye holes. Two small red dashed circles on left and right ears for elastic string attachment. Bottom instruction box: "Gunting lingkaran biru untuk lubang mata dan lingkaran merah untuk dipasang tali atau karet". Pure black and white clean line art, ready for coloring and cutting --ar 1:1.414 --q 2`
      },
      {
        id: 'mewarnai-angka-karakter',
        name: 'Mewarnai Angka & Karakter Ceria',
        description: 'Angka besar 0-10 berkontur tebal bergaya karakter lucu (misal angka 1 dengan balon unicorn, angka 2 dengan anak gajah), dilengkapi tracing nama angka di bawah.',
        indonesianHeader: 'Mewarnai Angka',
        indonesianInstruction: 'Warnai angkanya sesuai kreatifitasmu ya!',
        visualReferenceNote: 'Angka besar bergaya kartun menggemaskan di tengah dengan outline tebal. Di bawahnya terdapat garis panduan 3 baris dengan tulisan nama angka putus-putus untuk ditebalkan.',
        defaultTopic: 'Angka 1-10 Kartun Lucu (Unicorn, Gajah, Dinosaurus, Domba)',
        defaultEnglishPrompt: `Children coloring and number tracing worksheet, titled "Mewarnai Angka", A4 portrait format, 300 DPI, 4K ultra quality. Center features a giant playful 3D cartoon bubble number (e.g. Number 1 hugging a cute baby unicorn holding a balloon / Number 2 cuddling a friendly baby elephant). Clean thick bold black outlines with white interior for easy coloring. Bottom section features double baseline handwriting guide with dotted tracing letters for the number name in Indonesian ("satu", "dua", "tiga"). Wholesome, joyful, high contrast line art --ar 1:1.414 --q 2`
      },
      {
        id: 'mewarnai-kegiatan-indra',
        name: 'Ayo Warnai Kegiatan Indraku',
        description: 'Ilustrasi adegan anak-anak menggunakan panca indra: mencium bunga, mendengarkan musik dengan headphone, membaca buku, makan es krim.',
        indonesianHeader: 'Ayo Warnai Kegiatan Indraku!',
        indonesianInstruction: 'Warnai gambar kegiatan di bawah ini. Perhatikan apa yang sedang dilakukan. Warnai dengan rapi, ya!',
        visualReferenceNote: 'Ilustrasi kartun anak laki-laki atau perempuan sedang mencium setangkai bunga mawar, mendengarkan musik, atau membaca buku di dalam frame rounded border.',
        defaultTopic: 'Panca Indra Anak dalam Kehidupan Sehari-hari',
        defaultEnglishPrompt: `Children educational sensory coloring sheet, titled "Ayo Warnai Kegiatan Indraku!", A4 portrait, 300 DPI, 4K line art. A large heartwarming central coloring illustration inside a rounded red border frame: a smiling young child holding and gently smelling a lovely fragrant flower in a pot (sense of smell). Bold, expressive, clean black outlines, no shading, generous spaces for toddler and preschool crayon coloring, delightful children storybook illustration style --ar 1:1.414 --q 2`
      }
    ]
  },

  // 3. MATCHING (MENCOCOKKAN & MENGHUBUNGKAN)
  {
    id: 'matching',
    name: 'Matching & Menghubungkan',
    iconName: 'GitCommit',
    description: 'Aktivitas mencocokkan bayangan siluet, menarik garis benda ke organ tubuh, menghubungkan induk dan anak hewan, serta pasangan kata.',
    subtypes: [
      {
        id: 'matching-shadow',
        name: 'Cari Bayangannya (Shadow Matching)',
        description: 'Kolom kiri gambar berwarna (satwa laut / binatang rimba) dan kolom kanan siluet bayangan hitam legam acak dengan titik merah untuk ditarik garis.',
        indonesianHeader: 'Cari Bayangannya / Temukan Bayangan yang Tepat!',
        indonesianInstruction: 'Cocokkan hewan di sebelah kiri dengan bayangannya yang tepat di sebelah kanan!',
        visualReferenceNote: '5 pasang objek: Kuda laut, kerang, paus, bintang laut, ikan mas. Kolom kiri ilustrasi warna-warni, kolom kanan siluet hitam dengan urutan teracak.',
        defaultTopic: 'Mencocokkan Bayangan Hewan Laut & Hewan Rimba',
        defaultEnglishPrompt: `Kids shadow matching activity worksheet, titled "Cari Bayangannya", A4 portrait orientation, 300 DPI, 4K print resolution. Top banner with friendly font. Left column features 5 vibrant colorful watercolor animal illustrations (e.g. Cute orange seahorse, pink seashell, blue whale, yellow smiling starfish, striped clownfish) each with a matching dot. Right column features the exact 5 animal silhouettes in solid black in shuffled order, each with a connecting dot. Clean dotted vertical separator or ample central space for children to draw pencil lines connecting them. Professional preschool printable layout --ar 1:1.414 --q 2`
      },
      {
        id: 'matching-dotted-lines',
        name: 'Menghubungkan Garis Putus-putus ke Benda',
        description: 'Latihan motorik menghubungkan anggota tubuh atau alat ibadah ke pasangannya melalui garis putus-putus bergelombang, zigzag, spiral, dan kotak.',
        indonesianHeader: 'Pasangkan Gambar / Ikuti Garis Putus-putusnya!',
        indonesianInstruction: 'Hubungkan anggota tubuh dengan barang yang biasa dipakai, ikuti garis putus-putusnya ya!',
        visualReferenceNote: '4 baris horizontal: Kiri kepala anak -> garis spiral -> topi; mata -> garis lengkung -> kacamata; telinga -> garis zigzag -> headphone; kaki -> garis gelombang -> sepatu.',
        defaultTopic: 'Hubungkan Anggota Tubuh & Aksesoris / Alat Ibadah',
        defaultEnglishPrompt: `Early childhood fine motor pencil control matching worksheet, titled "Pasangkan Gambar!", A4 portrait, 300 DPI, 4K resolution. 4 rows of matching pairs connected by distinct dotted tracing lines for cutting or pencil tracing: Row 1 loop-de-loop spiral line connecting a boy's head to a baseball cap; Row 2 gentle scalloped wave line connecting an eye to sunglasses; Row 3 zigzag sharp line connecting an ear to headphones; Row 4 ocean wave line connecting bare feet to sneakers. Clean colorful illustrations on left and right, crisp dashed lines in the middle, high contrast educational format --ar 1:1.414 --q 2`
      },
      {
        id: 'matching-case-pairs',
        name: 'Pasangkan Huruf Besar dan Huruf Kecil',
        description: 'Mencocokkan huruf kapital dengan huruf kecil yang sesuai dan mewarnai ilustrasi pendukungnya.',
        indonesianHeader: 'Pasangkan Huruf Besar dan Kecilnya',
        indonesianInstruction: 'Lingkari huruf kecil yang sesuai dan warnai gambarnya!',
        visualReferenceNote: 'Setengah halaman atas huruf N besar, tabel 3x3 pilihan huruf kecil (r n d / g j n / n y f) dan gambar nyamuk hitam putih untuk diwarnai. Setengah bawah huruf O besar dan obor.',
        defaultTopic: 'Pasangkan Huruf Besar & Kecil dengan Pilihan Grid',
        defaultEnglishPrompt: `Alphabet recognition worksheet, titled "Pasangkan Huruf Besar dan Kecilnya", A4 portrait layout, 300 DPI, 4K vector art. Split into two horizontal sections. Top section: Large bold uppercase letter "N" in coral red, next to a 3x3 grid of lowercase letters ("r n d", "g j n", "n y f") with one correct match, alongside a charming black-and-white outline cartoon of a mosquito ("Nyamuk") ready to be colored. Bottom section: Large uppercase letter "O" in crimson, 3x3 lowercase letter grid, alongside an outline cartoon of an Olympic torch ("Obor"). Clean divider line, educational typography --ar 1:1.414 --q 2`
      },
      {
        id: 'matching-mother-baby',
        name: 'Mana Ibuku? (Induk & Anak Hewan)',
        description: 'Mencocokkan anak hewan (bayi kura-kura, anak kucing, anak ayam, anak sapi) ke induknya yang berada di sisi kanan.',
        indonesianHeader: 'Mana Ibuku ? Tolong Bayi Hewan Bertemu Induknya!',
        indonesianInstruction: 'Tolong bayi hewan ini bertemu dengan induknya! Tarik garis yang sesuai ya!',
        visualReferenceNote: 'Kolom kiri 4 anak hewan imut, kolom kanan 4 induk hewan (Ayam, Sapi perah, Penyu besar, Kucing belang). Terdapat titik bulat untuk menghubungkan.',
        defaultTopic: 'Induk dan Bayi Hewan Jinak & Liar',
        defaultEnglishPrompt: `Heartwarming kindergarten science matching worksheet, titled "Mana Ibuku?", A4 portrait format, 300 DPI, 4K quality. Left column displays 4 adorable baby animal illustrations with connecting dots (two baby turtles, box of cute kittens, fluffy yellow chicks, baby calf). Right column displays the matching adult parent animals in scrambled order (Mother hen, dairy cow, large sea turtle, mama cat). Soft pastel background, clear dots for pencil drawing, adorable storybook art style --ar 1:1.414 --q 2`
      }
    ]
  },

  // 4. TRACING (MENEBALKAN & SENSORI MOTORIK)
  {
    id: 'tracing',
    name: 'Tracing & Sensori Motorik',
    iconName: 'PenTool',
    description: 'Menebalkan huruf kapital/kecil dengan nomor urut goresan, tracing huruf Hijaiyah, playdough mat berongga, dan tracing angka.',
    subtypes: [
      {
        id: 'tracing-alphabet-stroke',
        name: 'Tracing Huruf dengan Urutan Goresan (Stroke Order 1-2-3)',
        description: 'Huruf besar besar dengan lingkaran nomor 1, 2, 3 dan panah arah tarikan tangan, baris garis bantu berhitung 3 baris, ilustrasi kosakata buah/benda.',
        indonesianHeader: 'Tracing Huruf [HURUF]',
        indonesianInstruction: 'Tebalkan huruf besar dan kecil sesuai nomor urut panah ya!',
        visualReferenceNote: 'Contoh: Tracing Huruf A dengan gambar buah Apel tersenyum. Huruf A besar di kiri dengan panduan 1, 2, 3. Di sampingnya 2 baris huruf A putus-putus. Di bawahnya 2 baris huruf a kecil putus-putus.',
        defaultTopic: 'Tracing Huruf Alfabet A-Z dengan Stroke Order & Ilustrasi Kosakata',
        defaultEnglishPrompt: `Printable preschool alphabet handwriting practice sheet, titled "Tracing Huruf A", A4 portrait, 300 DPI, 4K sharp vector lines. Top right: cute smiling red apple illustration with word "Apel". Left side: large hollow uppercase letter "A" with circled numbered arrows 1, 2, 3 indicating correct handwriting stroke sequence. Right side: two sets of 3-line ruling with dotted uppercase "A" letters for tracing practice. Bottom half: two sets of 3-line ruling with dotted lowercase "a" letters for tracing practice, alongside a hollow guide letter "a" with stroke arrows 1 and 2. Crisp dashed lines, educational calligraphy guidelines, clean black and white printing with colorful accent --ar 1:1.414 --q 2`
      },
      {
        id: 'tracing-playdough-mat',
        name: 'Playdough Mat & Sensori Tracing Huruf Tebal',
        description: 'Huruf besar berongga lebar dengan garis putus-putus di bagian dalam untuk ditekan lilin mainan (playdough) atau jari anak.',
        indonesianHeader: 'Playdough Mat Huruf [HURUF]',
        indonesianInstruction: 'Bentuk plastisin/playdough mengikuti garis di dalam huruf ini ya!',
        visualReferenceNote: 'Huruf kapital dan kecil berukuran jumbo dengan outline tebal berwarna (merah/biru/hijau), garis putus-putus di sumbu tengah huruf dengan panah nomor 1, 2, 3. Latar belakang pola watermark samar.',
        defaultTopic: 'Playdough Mat Huruf Jumbo untuk Motorik Halus Sensori',
        defaultEnglishPrompt: `Educational playdough mat and sensory finger tracing activity sheet, titled "Playdough Mat Huruf B", A4 portrait format, 300 DPI, 4K resolution. Features two jumbo hollow letters (one large uppercase "B" and one lowercase "b") with thick colorful outlines (bright cyan or magenta). Inside the wide hollow channels are dashed centerlines with numbered circled arrows (1, 2, 3) guiding finger tracing or clay rolling. Subtle playful faint watermark pattern across the background (baby ducks or fruits). High contrast, delightful tactile design, perfect for laminating --ar 1:1.414 --q 2`
      },
      {
        id: 'tracing-hijaiyah',
        name: 'Belajar & Tracing Huruf Hijaiyah',
        description: 'Menebalkan huruf hijaiyah (Alif, Ba, Ta, Tsa...) dengan arah panah, kosakata bahasa Arab bergambar, dan baris latihan garis putus-putus.',
        indonesianHeader: 'Belajar Hijaiyah - Tebalkan Huruf [HIJAIYAH]',
        indonesianInstruction: 'Tebalkan huruf hijaiyah di bawah ini dengan rapi ya!',
        visualReferenceNote: 'Contoh: Huruf Ba (ب) besar dengan panah arah goresan, gambar buah jeruk dengan tulisan Arab "بُرْتُقَالٌ", dan 4 baris latihan menulis huruf Ba bertitik-titik.',
        defaultTopic: 'Belajar Menulis Huruf Hijaiyah dengan Kosakata Bahasa Arab',
        defaultEnglishPrompt: `Islamic early education Arabic alphabet tracing worksheet, titled "Belajar Hijaiyah", A4 portrait, 300 DPI, 4K crisp resolution. Top section: orange title bar "Tebalkan huruf hijaiyah dibawah ini ya!". Upper left box: juicy fresh sliced orange illustration with Arabic vocabulary "بُرْتُقَالٌ" with vowel marks (tashkeel). Upper right box: large yellow-orange hollow Arabic letter "Ba" (ب) with stroke order arrows and square dot marker. Lower section: 4 ruled handwriting rows of dotted Arabic letter "Ba" for student pencil tracing. Warm orange card border, clean calligraphy lines, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'tracing-numbers',
        name: 'Tracing Angka 0-10 & Menghitung',
        description: 'Tracing angka besar dengan arah panah 1, 2, 3, ilustrasi jumlah benda konkret, baris tracing angka, dan aktivitas mewarnai angka yang sama.',
        indonesianHeader: 'Belajar Angka [ANGKA]',
        indonesianInstruction: 'Ikuti tanda panah untuk mengenal bentuk angkanya! Tebalkan dan warnai objeknya ya!',
        visualReferenceNote: 'Angka 1-10 besar dengan panah putus-putus, gambar buah atau kendaraan sesuai jumlah angka, dan kisi latihan menulis angka putus-putus.',
        defaultTopic: 'Tracing Angka 1-10 Matematika Dasar TK',
        defaultEnglishPrompt: `Preschool number writing and counting worksheet, titled "Belajar Angka 3", A4 portrait, 300 DPI, 4K ultra clarity. Top left: large friendly number "3" in vibrant blue with inner white dashed stroke order arrows (1, 2). Top right: cute illustration of three green cars with caption "ini tiga mobil". Middle section: double handwriting guideline with dotted number 3s for tracing practice. Bottom section: playful challenge "lingkari tiga mobil yang berwarna oranye" with cartoon cars scattered. Crisp vector graphics, clean educational layout --ar 1:1.414 --q 2`
      }
    ]
  },

  // 5. CUT & PASTE (GUNTING & TEMPEL)
  {
    id: 'cut_paste',
    name: 'Cut & Paste (Gunting & Tempel)',
    iconName: 'Scissors',
    description: 'Lembar aktivitas gunting dan tempel: puzzle kepingan, memasangkan kata ke bentuk huruf, es krim rasa huruf, dan dadu lipat DIY.',
    subtypes: [
      {
        id: 'cut-paste-word-letter-shape',
        name: 'Pasangkan Kata ke Bentuk Huruf (Cut & Paste)',
        description: 'Bentuk huruf raksasa berongga (misal huruf b, c, d, f) dengan lingkaran tempat menempel. Di bawah garis gunting putus-putus terdapat 4 lingkaran gambar untuk digunting.',
        indonesianHeader: 'Pasangkan Kata / Gunting dan Tempel!',
        indonesianInstruction: 'Gunting gambar di bawah garis putus-putus dan tempelkan sesuai katanya!',
        visualReferenceNote: 'Huruf besar b/c/d melengkung indah dengan 4 slot lingkaran putih bertuliskan kata (misal: donat, dino, daging, daun). Bagian bawah lembar gunting dengan ikon gunting.',
        defaultTopic: 'Pasangkan Kata Bergambar ke Bentuk Huruf Raksasa (b, c, d, f, g)',
        defaultEnglishPrompt: `Cut and paste vocabulary matching educational worksheet, titled "Pasangkan Kata", A4 portrait layout, 300 DPI, 4K high resolution. Top header banner. Main upper area: a giant hollow stylized letter shape (e.g. letter "d" or "b" with coral pink contour) containing 4 designated target circular drop-zones with words printed inside ("donat", "dino", "daging", "daun"). Bottom section separated by a horizontal cutting line with scissor icon: 4 circular cutout tokens with circular dashed borders displaying the corresponding full-color illustrated items (chocolate donut, cute green dinosaur, red steak meat, fresh green leaf). Fun, tactile, clean printable layout --ar 1:1.414 --q 2`
      },
      {
        id: 'cut-paste-ice-cream',
        name: 'Pasangkan Huruf Besar & Kecil: Es Krim Cone',
        description: 'Cone es krim dengan huruf kapital A, B, C, D di halaman utama. Di halaman kedua (lembar gunting) terdapat scoop es krim warna-warni berhuruf kecil untuk ditempelkan.',
        indonesianHeader: 'Pasangkan Huruf Besar dan Huruf Kecilnya (Es Krim)',
        indonesianInstruction: 'Yuk, gunting ice cream pada lembar menggunting dan tempatkan sesuai dengan huruf yang ada di cone!',
        visualReferenceNote: '4 gambar cone es krim wafer kuning dengan lingkaran putih berhuruf A, B, C, D. Lembar gunting berisi scoop es krim strawberry, cokelat, vanila, blueberry berhuruf kecil.',
        defaultTopic: 'Es Krim Cone Huruf Besar & Scoop Huruf Kecil (A-D, E-G, H-J, K-M)',
        defaultEnglishPrompt: `Preschool cut and paste alphabet matching activity, titled "Pasangkan Huruf Besar dan Huruf Kecilnya!", A4 portrait format, 300 DPI, 4K resolution. Top header with friendly instruction. Main worksheet page displays 4 waffle ice cream cones labeled with bold uppercase letters inside circles ("A", "B", "C", "D"). Companion cutout tokens display colorful scoops of ice cream (pink strawberry with "b", brown chocolate with "c", vanilla with "d", mint with "a") bordered with dashed cutting lines and scissor marks. Appetizing pastel colors, clean vector outlines, child-friendly typography --ar 1:1.414 --q 2`
      },
      {
        id: 'cut-paste-puzzle-jigsaw',
        name: 'Puzzle Gambar Padang Rumput / Bawah Laut (Jigsaw Strips)',
        description: 'Gambar utuh dipecah menjadi 4-6 kolom strip atau kotak bernomor 1-6. Lembar atas tempat menempel dengan siluet abu-abu bernomor, lembar bawah kepingan berwarna untuk digunting.',
        indonesianHeader: 'Puzzle Padang Rumput / Puzzle Bawah Laut',
        indonesianInstruction: 'Gunting kepingan gambar sesuai garis putus-putus, lalu susun pada tempat yang bernomor sesuai ya!',
        visualReferenceNote: 'Grid 6 kotak bernomor 1 sampai 6 di padang rumput savana afrika (jerapah, gajah, singa) atau bawah laut (lumba-lumba, penyu, terumbu karang).',
        defaultTopic: 'Puzzle Jigsaw Edukasi 6 Keping Bertema Hewan',
        defaultEnglishPrompt: `Children printable jigsaw strip puzzle activity sheet, titled "Puzzle Padang Rumput", A4 portrait, 300 DPI, 4K resolution. Top half shows a grayscale/tinted template grid divided into 6 numbered panels (1, 2, 3, 4, 5, 6) labeled "Tempel disini:". Bottom half, separated by a dashed cutting line with scissors, shows the 6 vibrant full-color vertical picture strips depicting African wildlife under acacia trees (elephants, giraffes, lions, monkeys, blue sky) labeled "Potong bagian ini". Precise grid alignment, thick cut lines, high resolution print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'cut-paste-symmetry-face',
        name: 'Gunting & Tempel Wajah Hewan Simetris',
        description: 'Separuh wajah hewan (katak, singa, serigala, babi) di kotak utama. Murid menggunting separuh wajah pasangannya di bagian bawah untuk disatukan.',
        indonesianHeader: 'Gunting & Tempel Wajah Hewan Simetris',
        indonesianInstruction: 'Gunting dan cocokkan wajah hewan di bawah ini supaya menjadi wajah yang utuh!',
        visualReferenceNote: '4 kotak besar: Kiri separuh wajah katak hijau, singa kuning, serigala abu-abu, babi pink. Bagian bawah 4 potongan sisi kanan wajah dengan garis putus-putus gunting.',
        defaultTopic: 'Melengkapi Separuh Wajah Hewan Simetris (Frog, Lion, Wolf, Pig)',
        defaultEnglishPrompt: `Early childhood symmetry and cognitive completion worksheet, titled "Gunting & Tempel Wajah Hewan", A4 portrait, 300 DPI, 4K quality. 4 large square activity boxes: each box contains the left half of an animal's face (green frog, golden lion, grey wolf, pink pig) with the right side blank for gluing. Bottom section separated by scissor dashed line displays the 4 corresponding right-half animal face cutouts. Clean geometric alignment, charming vector illustrations, crisp printable lines --ar 1:1.414 --q 2`
      },
      {
        id: 'cut-paste-diy-dice',
        name: 'Membuat Dadu Lipat Edukasi (DIY Folding Dice)',
        description: 'Jaring-jaring dadu 3D lipat berbentuk salib dengan gambar hewan dan instruksi gerakan motorik (Terbang seperti burung, Merayap seperti ulat, Melompat seperti belalang).',
        indonesianHeader: 'Membuat Dadu / DIY Action Dice',
        indonesianInstruction: 'Yuk, gunting di garis terluar lalu lipat dan lem menjadi bentuk dadu!',
        visualReferenceNote: 'Jaring-jaring kubus 6 sisi dengan lidah lem (tabs). Setiap sisi berisi ilustrasi hewan dan aksi: burung, ulat, belalang, lebah, siput, laba-laba.',
        defaultTopic: 'Dadu Aksi Gerak Hewan 6 Sisi Siap Lipat',
        defaultEnglishPrompt: `Printable 3D folding cube dice craft activity for kids, titled "Membuat Dadu", A4 portrait layout, 300 DPI, 4K resolution. Full printable cross-shaped cube net with dotted folding lines, solid outer cutting line, and angled glue tabs labeled with scissor icons. The 6 faces feature adorable cartoon animal illustrations paired with movement prompts: "Terbang seperti burung", "Merayap seperti ulat", "Melompat seperti belalang", "Mendengung seperti lebah", "Jalan lambat seperti siput", "Jalan cepat seperti laba-laba". Crisp vector lines, easy to cut and assemble --ar 1:1.414 --q 2`
      }
    ]
  },

  // 6. BERHITUNG & MATEMATIKA DASAR
  {
    id: 'berhitung',
    name: 'Berhitung & Matematika Dasar',
    iconName: 'Calculator',
    description: 'Menghitung objek, penjumlahan/pengurangan bergambar, tebak angka honeycomb maze, dan perbandingan ukuran besar/kecil.',
    subtypes: [
      {
        id: 'berhitung-counting-objects',
        name: 'Menghitung Objek & Menuliskan Angka (Counting)',
        description: 'Kotak bergambar objek konkret (bintang, mobil, bola, permen dalam toples, sate di piring, apel di pohon) dengan kotak kosong di bawah untuk menulis jumlahnya.',
        indonesianHeader: 'Hitung Jumlahnya / Belajar Berhitung',
        indonesianInstruction: 'Hitung ada berapa jumlah objek di gambar, lalu tuliskan dalam kotak yang disediakan!',
        visualReferenceNote: 'Contoh: Toples kaca berisi 10 permen oranye, piring berisi 5 tusuk sate, pohon dengan 8 buah apel merah, atau sarang semut dengan 9 semut hitam.',
        defaultTopic: 'Menghitung Jumlah Buah, Makanan, atau Hewan (1-10)',
        defaultEnglishPrompt: `Kindergarten math counting worksheet, titled "Hitung Jumlahnya", A4 portrait format, 300 DPI, 4K resolution. Top header with Name and Class. Center features an engaging, high-quality, clear illustration of objects to count (e.g. a large transparent glass cookie jar filled with 8 delicious chocolate chip cookies / a green apple tree bearing 7 bright red apples / a cozy blue sofa with 2 sleeping orange tabby cats). Underneath is a clean black rounded rectangular box with an equals sign ("= [ ]") for students to write down the counted number. High contrast, warm colorful presentation, crisp vector assets --ar 1:1.414 --q 2`
      },
      {
        id: 'berhitung-circle-number',
        name: 'Hitung & Lingkari Angka yang Sesuai (4 Cards)',
        description: '4 kotak dalam 1 halaman A4. Setiap kotak menampilkan kumpulan hewan (misal 4 kura-kura, 5 capung, 6 penguin, 7 anak ayam) dan baris pilihan angka 1-9 di bawahnya.',
        indonesianHeader: 'Berapa Jumlahnya? / Lingkari Angkanya!',
        indonesianInstruction: 'Hitung ada berapa jumlah hewan, lalu warnai/lingkari angka yang tepat di dalam lingkaran!',
        visualReferenceNote: 'Grid 2x2 kotak kartu. Kotak 1: 4 kura-kura dengan pilihan angka [3] [2] [4] [1]. Kotak 2: 5 capung dengan pilihan [1] [5] [3] [7]. Kotak 3: 6 penguin. Kotak 4: 7 anak ayam.',
        defaultTopic: 'Hitung dan Lingkari Angka Pilihan Ganda (Grid 2x2)',
        defaultEnglishPrompt: `Preschool counting assessment worksheet, titled "Lingkari Angkanya", A4 portrait, 300 DPI, 4K ultra quality. Layout divided into a 2x2 grid of four rounded card panels. Card 1 contains 3 cute yellow submarines and multiple-choice numbers (9, 4, 3) in bold circles at the bottom; Card 2 contains 5 red vintage scooters and numbers (8, 4, 5); Card 3 contains 4 blue helicopters with numbers (4, 6, 7); Card 4 contains 2 yellow construction dump trucks with numbers (2, 1, 9). Clean borders, colorful vector illustrations, crisp numbers inside circular buttons --ar 1:1.414 --q 2`
      },
      {
        id: 'berhitung-addition-subtraction',
        name: 'Penjumlahan & Pengurangan Bergambar',
        description: 'Soal matematika dengan visual objek konkret (mobil + mobil = [ ], permen - permen [disilang merah] = [ ]).',
        indonesianHeader: 'Belajar Penjumlahan & Pengurangan',
        indonesianInstruction: 'Hitung dan tuliskan jumlah objeknya pada kotak yang tersedia!',
        visualReferenceNote: 'Baris 1: 2 mobil biru + 1 mobil biru = [ ]. Baris 2: 5 anak sapi dengan 2 ekor disilang merah (5 - 2 = [ ]). Kotak kosong persegi untuk menulis angka hasil.',
        defaultTopic: 'Penjumlahan dan Pengurangan Dasar dengan Objek Konkret dan Tanda Silang',
        defaultEnglishPrompt: `Early elementary math worksheet, titled "Belajar Penjumlahan dan Pengurangan", A4 portrait, 300 DPI, 4K crisp layout. 4 horizontal problem rows. Top two rows show pictorial addition: 2 blue cartoon sedans + 1 blue sedan = [blank answer box]. Bottom two rows show pictorial subtraction: 5 adorable baby cows with 2 crossed out with clean red X marks = [blank answer box]. Clear mathematical plus and minus symbols, dotted handwriting baselines, professional education typography --ar 1:1.414 --q 2`
      },
      {
        id: 'berhitung-number-maze',
        name: 'Urutan Angka Honeycomb / Ular Angka (Number Maze)',
        description: 'Jalur heksagon seperti sarang lebah menghubungkan lebah ke sarangnya dengan mengisi angka 1 sampai 10 yang rumpang.',
        indonesianHeader: 'Urutan Angka / Bantu Hewan Menemukan Jalan!',
        indonesianInstruction: 'Bantu lebah menemukan sarang madu dengan mengisi urutan angka yang kosong ya!',
        visualReferenceNote: 'Jalur berkelok 10 heksagon. Heksagon 1, 2, 4, 5, 7, 9 terisi, sedangkan sisanya kosong untuk diisi anak dengan pensil.',
        defaultTopic: 'Jalur Honeycomb Mengisi Angka Berurutan 1-10',
        defaultEnglishPrompt: `Kindergarten sequencing math maze worksheet, titled "Urutan Angka", A4 portrait, 300 DPI, 4K sharp resolution. Upper left features a cheerful cartoon bumblebee. A winding path of 10 connected clean hexagon tiles curves across the page leading to a honey hive at the bottom right. Several hexagons contain bold colorful numbers (1, 2, 4, 5, 7, 9) while the remaining hexagons are blank for children to fill in missing numbers (3, 6, 8, 10). Beautiful bright yellow and orange educational theme, crisp vector lines --ar 1:1.414 --q 2`
      },
      {
        id: 'berhitung-size-comparison',
        name: 'Perbandingan Ukuran (Besar vs Kecil)',
        description: 'Tiga kolom atau baris objek dengan variasi ukuran. Instruksi memilih yang "Lebih Besar", "Lebih Kecil", atau "Paling Besar".',
        indonesianHeader: 'Perbandingan Ukuran (Besar & Kecil)',
        indonesianInstruction: 'Pilih dan lingkari anggota tubuh / hewan yang ukurannya LEBIH BESAR pada tiap kotak, ya!',
        visualReferenceNote: '6 kotak perbandingan: Kaki besar vs kaki kecil, hidung besar vs hidung kecil, telinga besar vs telinga kecil, gajah besar vs semut kecil.',
        defaultTopic: 'Konsep Ukuran Relatif Besar, Sedang, Kecil',
        defaultEnglishPrompt: `Preschool size concept and visual discrimination worksheet, titled "Perbandingan Ukuran", A4 portrait, 300 DPI, 4K print ready. 6 rectangular comparison boxes arranged neatly. Inside each box are two or three identical illustrations at noticeably different scales (e.g. one large adult foot beside a tiny baby foot / one prominent nose beside a small nose / one big smiling mouth beside a petite mouth). Instruction banner at top: "Petunjuk: Pilih yang ukurannya LEBIH BESAR". Clean red card frames, crisp vector details, high clarity print design --ar 1:1.414 --q 2`
      }
    ]
  },

  // 7. LITERASI & KOSAKATA
  {
    id: 'literasi',
    name: 'Literasi & Kosakata',
    iconName: 'BookOpen',
    description: 'Mengenal huruf awalan kata, cari huruf di dalam bentuk objek, lingkaran kata yang tepat, dan susun huruf acak.',
    subtypes: [
      {
        id: 'literasi-find-letter-in-shape',
        name: 'Cari Huruf Depannya di Dalam Objek (Hidden Letter Shape)',
        description: 'Outline buah/hewan (jerapah, jeruk, kucing, kado, lampu, mangga) dipenuhi huruf acak di dalamnya. Murid mencari dan melingkari huruf awalan kata.',
        indonesianHeader: 'Cari Huruf Depannya! [HURUF]',
        indonesianInstruction: 'Temukan dan lingkari semua huruf [HURUF] yang ada di dalam gambar [OBJEK] ini!',
        visualReferenceNote: 'Contoh: Siluet buah jeruk dengan huruf j, n, r, a, w, d, e, o, f, g, b, s di dalamnya. Murid mencari seluruh huruf "j" kecil. Disertai gambar miniatur jeruk berwarna di pojok.',
        defaultTopic: 'Mencari Huruf Tertentu di Dalam Siluet Objek (Jerapah, Kucing, Mangga, Lampu)',
        defaultEnglishPrompt: `Early literacy letter hunt activity worksheet, titled "Cari Huruf Depannya!", A4 portrait, 300 DPI, 4K quality. Top left shows a cute thumbnail illustration of a giraffe with label "jerapah" (with initial "j" highlighted in orange). Center features a giant clean line-art outline of a tall smiling cartoon giraffe standing up. Inside the body of the giraffe are dozens of scattered lowercase letters (j, o, n, g, a, p, z, r, b, h, y, t). Students must circle all the letter "j"s. Clean black outlines on pure white background, delightful preschool design --ar 1:1.414 --q 2`
      },
      {
        id: 'literasi-circle-first-letter',
        name: 'Yang Mana Huruf Depannya? (Hexagon Choices)',
        description: 'Kotak bergambar hewan/benda di sebelah kiri, dan 3 pilihan huruf kapital di dalam heksagon di sebelah kanan untuk dilingkari murid.',
        indonesianHeader: 'Yang Mana Huruf Depannya?',
        indonesianInstruction: 'Lingkari huruf yang merupakan awalan kata dari gambar berikut!',
        visualReferenceNote: 'Dua kotak kartu besar: Kotak atas burung Flamingo pink dengan pilihan heksagon [F], [C], [K]. Kotak bawah anak Gajah abu-abu dengan heksagon [A], [G], [L].',
        defaultTopic: 'Pilihan Huruf Awalan Kata Bergambar (Flamingo, Gajah, Gelang, Harimau)',
        defaultEnglishPrompt: `Preschool initial phonics letter recognition worksheet, titled "Yang Mana Huruf Depannya?", A4 portrait format, 300 DPI, 4K resolution. Layout has two large activity card boxes. Top card: a vivid charming cartoon of a pink flamingo on the left, with 3 vertical hexagon buttons on the right displaying letters "F", "C", "K". Bottom card: a playful baby elephant spurting water droplets on the left, with 3 vertical hexagon buttons on the right displaying letters "A", "G", "L". Clear borders, colorful character art, engaging phonics exercise --ar 1:1.414 --q 2`
      },
      {
        id: 'literasi-word-scramble',
        name: 'Susun Kata Anggota Tubuh / Hewan (Unscramble Letters)',
        description: 'Gambar objek di kiri, deretan huruf teracak di tengah (a-t-g-n-n-a -> tangan, a-m-a-t -> mata), dan garis bawah untuk menulis kata yang benar.',
        indonesianHeader: 'Susun Kata / Mari Menulis Kata yang Benar',
        indonesianInstruction: 'Susunlah huruf-huruf berikut menjadi kata anggota tubuh yang benar!',
        visualReferenceNote: '5 baris: Gambar tangan -> a t g n n a -> garis putus-putus; mata -> a m a t -> garis putus-putus; hidung -> d h g i u n; bibir -> i b i r b.',
        defaultTopic: 'Menyusun Huruf Acak Menjadi Kata Anggota Tubuh & Fauna',
        defaultEnglishPrompt: `Kids word scramble spelling worksheet, titled "Susun Kata Anggota Tubuh", A4 portrait layout, 300 DPI, 4K print resolution. 5 horizontal activity rows separated by thin red dividers. Left column: clean illustrated body part (Tangan/hand, Mata/eye, Gigi/teeth, Hidung/nose, Bibir/lips). Middle column: scrambled lowercase letters with wide spacing (e.g. "a  t  g  n  n  a"). Right column: dashed handwriting blank underlines for students to write the solved unscrambled word ("tangan"). High contrast, neat typography, print ready --ar 1:1.414 --q 2`
      },
      {
        id: 'literasi-word-search',
        name: 'Cari dan Lingkari Kata (Word Search Grid)',
        description: 'Tabel matriks huruf 7x7 kotak berisi 5 kata tersembunyi (mata, telinga, kulit, hidung, mulut) secara horizontal atau vertikal.',
        indonesianHeader: 'Cari dan Lingkari Kata',
        indonesianInstruction: 'Temukan 5 anggota tubuh yang tersembunyi di dalam kotak. Lingkari semua kata yang kamu temukan!',
        visualReferenceNote: 'Matriks grid huruf bergaris merah atau biru 7x7. Di dalamnya tersembunyi kosakata bahasa Indonesia yang mudah dibaca anak usia 6-8 tahun.',
        defaultTopic: 'Word Search Cari Kata Anggota Tubuh / Hewan Nusantara',
        defaultEnglishPrompt: `Elementary school Indonesian word search puzzle worksheet, titled "Cari dan Lingkari Kata", A4 portrait, 300 DPI, 4K quality. Top instruction: "Temukan 5 anggota tubuh yang tersembunyi di dalam kotak!". Center features a crisp 7x7 letter grid with clean red border lines containing bold lowercase letters (t, e, l, i, n, g, a, m, a, t, a, k, u, l, i, t...). Words are hidden horizontally and vertically. High contrast, large legible letters, neat spacing, photocopier friendly --ar 1:1.414 --q 2`
      }
    ]
  },

  // 8. MAZE & PUZZLE
  {
    id: 'maze_puzzle',
    name: 'Labirin & Visual Search',
    iconName: 'Compass',
    description: 'Labirin jalur logika (maze), I Spy (intip dan temukan objek tersembunyi), serta mencari perbedaan (odd one out).',
    subtypes: [
      {
        id: 'maze-organ-object',
        name: 'Pilih Jalan yang Benar! (Maze Organ ke Fungsi)',
        description: 'Labirin dinding merah menghubungkan organ tubuh (mulut, kaki, hidung, mata, telinga) ke objek yang sesuai (makanan, bola, bunga, pelangi, musik).',
        indonesianHeader: 'Pilih Jalan yang Benar! / Telusuri Maze',
        indonesianInstruction: 'Ayo telusuri maze dan hubungkan bagian tubuh dengan benda yang sesuai dengan fungsinya!',
        visualReferenceNote: 'Ilustrasi bibir tersenyum di atas, labirin persegi berdinding merah bata di tengah, dan hidangan nasi ayam lezat di pintu keluar labirin.',
        defaultTopic: 'Labirin Menghubungkan Mulut ke Makanan / Kaki ke Bola / Hidung ke Bunga',
        defaultEnglishPrompt: `Children logic maze puzzle worksheet, titled "Pilih Jalan yang Benar!", A4 portrait format, 300 DPI, 4K vector art. Top entrance: a smiling cartoon mouth with clean teeth. Center: a medium-difficulty geometric labyrinth maze with bold red wall borders and clear pathways. Bottom exit: a delicious plate of colorful Indonesian fried chicken and rice with cucumber slices. Clear path solution, high contrast lines, fun and engaging problem solving for preschoolers --ar 1:1.414 --q 2`
      },
      {
        id: 'puzzle-i-spy',
        name: 'Intip dan Temukan / I Spy (Visual Search & Count)',
        description: 'Gambar penuh dengan objek beragam yang tersebar acak (mata, bibir, telinga, tangan, hidung). Di bawah terdapat kotak checklist untuk menghitung jumlah masing-masing.',
        indonesianHeader: 'Intip dan Temukan Anggota Tubuh! (I Spy)',
        indonesianInstruction: 'Hitung setiap anggota tubuh yang ada dan tulis jumlahnya di dalam kotak!',
        visualReferenceNote: '25 ilustrasi tersebar secara dinamis di tengah halaman. Bagian bawah tabel berisi ikon dan kotak jawaban kosong.',
        defaultTopic: 'I Spy Hitung Serangga / Anggota Tubuh / Hewan Laut',
        defaultEnglishPrompt: `I Spy visual search and counting activity sheet for kids, titled "Intip dan Temukan Anggota Tubuh!", A4 portrait, 300 DPI, 4K quality. Main central area contains a playful jumble of 24 colorful cartoon body part icons scattered naturally (eyes, lips, ears, noses, eyebrows, hands). Bottom section: a tidy answer row with 6 small icon key boxes (hand, eye, ear, mouth, nose, eyebrow) each accompanied by a dashed blank square for students to write down their total count. Vibrant colors, clean white background, high clarity print design --ar 1:1.414 --q 2`
      },
      {
        id: 'puzzle-odd-one-out',
        name: 'Temukan Gambar yang Berbeda! (Odd One Out)',
        description: 'Baris berisi 5-7 gambar serupa di mana ada satu gambar yang berbeda arah, warna, atau jenisnya untuk dilingkari murid.',
        indonesianHeader: 'Temukan Gambar yang Berbeda!',
        indonesianInstruction: 'Lihat setiap kelompok gambar, lalu lingkari gambar yang berbeda dari yang lain ya!',
        visualReferenceNote: '4 kotak baris: Baris 1 deretan 7 mata biru, ada 1 mata cokelat. Baris 2 deretan 6 bibir tersenyum, ada 1 bibir terbuka bergigi. Baris 3 telinga, ada 1 kuku jempol.',
        defaultTopic: 'Mencari Perbedaan Visual (Mata, Mulut, Telinga, Hewan)',
        defaultEnglishPrompt: `Visual discrimination and observation skills worksheet, titled "Temukan Gambar yang Berbeda!", A4 portrait, 300 DPI, 4K resolution. 4 horizontal rectangular activity cards framed with thin red borders. Row 1 shows 7 side-by-side illustrated eyes, 6 are blue and one in the middle is dark brown; Row 2 shows 6 closed smiling lips, one is open showing teeth; Row 3 shows 6 ears, one odd item is a fingernail; Row 4 shows 7 identical boy haircuts, one is missing a part. Instruction text in kid-friendly Indonesian font, clean vector aesthetic --ar 1:1.414 --q 2`
      }
    ]
  }
];
