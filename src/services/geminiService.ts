import {
  WorksheetProject,
  LKPDProject,
  StoryboardProject,
  SongProject,
  VideoScriptProject,
  EducationLevel,
  DifficultyLevel
} from '../types';

export interface WorksheetGenerateInput {
  topic: string;
  educationLevel: EducationLevel;
  theme: string;
  worksheetType: string;
  difficulty: DifficultyLevel;
  specificNotes?: string;
}

export interface LKPDGenerateInput {
  topic: string;
  jenjang: EducationLevel;
  materiPokok: string;
  modelPembelajaran: string;
}

export interface StoryboardGenerateInput {
  topic: string;
  audience: EducationLevel;
  videoType: string;
  duration: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  visualStyle: string;
}

export interface SongGenerateInput {
  topic: string;
  age: string;
  language: string;
  songStyle: string;
  duration: string;
  learningObjective: string;
}

export interface VideoScriptGenerateInput {
  topic: string;
  targetAudience: EducationLevel;
  videoType: string;
  aspectRatio?: '16:9' | '9:16' | '1:1';
}

export interface GameGenerateInput {
  topic: string;
  ageRange: string;
  gameType: string;
}

export interface ComicGenerateInput {
  topic: string;
  panelsCount: number;
  mainCharacters: string;
}

export interface FlashcardGenerateInput {
  topic: string;
  cardCount: number;
  language: string;
}

/**
 * Helper to call server proxy endpoint if available
 */
async function callServerGemini<T>(endpoint: string, payload: unknown): Promise<T | null> {
  try {
    const res = await fetch(`/api/gemini/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.result) {
        return data.result as T;
      }
    }
  } catch {
    // Graceful fallback to client generator if server endpoint unavailable
  }
  return null;
}

export const geminiService = {
  /**
   * 1. Worksheet Generator
   */
  async generateWorksheet(input: WorksheetGenerateInput): Promise<WorksheetProject> {
    const serverResult = await callServerGemini<WorksheetProject>('worksheet', input);
    if (serverResult) return serverResult;

    // Simulate smart AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const topicClean = input.topic.trim() || 'Mengenal Hewan & Lingkungan';
    return {
      id: `ws-${Date.now()}`,
      title: `Lembar Aktivitas: ${topicClean}`,
      topic: topicClean,
      ageRange: input.educationLevel === 'PAUD/TK' ? '4-6 Tahun' : input.educationLevel === 'SD' ? '7-10 Tahun' : '11-14 Tahun',
      educationLevel: input.educationLevel,
      theme: input.theme,
      worksheetType: input.worksheetType,
      difficulty: input.difficulty,
      learningObjectives: [
        `Memahami konsep esensial mengenai ${topicClean} secara terstruktur dan kontekstual.`,
        `Melatih daya nalar analitis dan motorik/kognitif peserta didik sesuai jenjang ${input.educationLevel}.`,
        `Meningkatkan kemampuan pemecahan masalah melalui latihan mandiri yang bertahap.`
      ],
      instructions: `Bacalah instruksi pada setiap nomor dengan saksama. Kerjakan latihan di bawah ini secara mandiri atau berpasangan dengan bimbingan fasilitator!`,
      structure: [
        {
          sectionTitle: 'Bagian 1: Eksplorasi Konsep Dasar & Observasi',
          instructions: 'Amati ilustrasi berikut dan pasangkan dengan pernyataan yang sesuai.',
          items: [
            `Identifikasi ciri-ciri penting dari objek ${topicClean}.`,
            `Tuliskan 3 kata kunci yang paling menggambarkan topik ini.`,
            `Beri tanda centang (✓) pada contoh penerapan yang benar dalam kehidupan sehari-hari.`
          ]
        },
        {
          sectionTitle: 'Bagian 2: Latihan Interaktif & Penerapan Logika',
          instructions: 'Jawablah pertanyaan berikut dengan singkat dan tepat.',
          items: [
            `Mengapa pemahaman tentang ${topicClean} penting bagi kita? Jelaskan secara sederhana!`,
            `Urutkan tahapan atau proses terkait ${topicClean} dari awal hingga akhir.`,
            `Selesaikan studi kasus pendek: Apa yang terjadi jika salah satu faktor diubah?`
          ]
        },
        {
          sectionTitle: 'Bagian 3: Refleksi Kreatif & Tantangan Bintang',
          instructions: 'Gambarkan atau ceritakan kembali pemahamanmu dengan gayamu sendiri.',
          items: [
            `Buatlah ilustrasi atau diagram ringkas tentang ${topicClean} di kotak gambar yang disediakan.`,
            `Tuliskan 1 pesan inspiratif untuk teman sekelasmu tentang apa yang kamu pelajari hari ini.`
          ]
        }
      ],
      textToImagePrompt: `Printable black and white educational activity worksheet for ${input.educationLevel} students, clean line art illustrations depicting "${topicClean}", neat checkboxes, tracing guides, playful educational borders, ready for photocopying, high resolution vector style --ar 8.5:11`,
      createdAt: new Date().toISOString().split('T')[0]
    };
  },

  /**
   * 2. LKPD Generator
   */
  async generateLKPD(input: LKPDGenerateInput): Promise<LKPDProject> {
    const serverResult = await callServerGemini<LKPDProject>('lkpd', input);
    if (serverResult) return serverResult;

    await new Promise((resolve) => setTimeout(resolve, 1400));
    const topic = input.topic.trim() || 'Ekosistem dan Keseimbangan Alam';

    return {
      id: `lkpd-${Date.now()}`,
      title: `LKPD Kurikulum Merdeka: Penyelidikan Ilmiah ${topic}`,
      topic,
      jenjang: input.jenjang,
      capaianPembelajaran: `Peserta didik mampu mengidentifikasi keterkaitan antara konsep ${topic} dengan fakta empiris di lingkungan sekitarnya serta mengomunikasikan hasil penyelidikan secara ilmiah.`,
      tujuanPembelajaran: [
        `Melakukan observasi terarah terhadap fenomena ${topic}.`,
        `Mengumpulkan dan mencatat data pengamatan dengan jujur dan sistematis.`,
        `Menganalisis sebab-akibat dan menyimpulkan solusi pemecahan masalah.`
      ],
      petunjukBelajar: 'Bentuk kelompok beranggotakan 3-4 orang. Siapkan alat tulis dan lakukan tahapan penyelidikan sesuai panduan!',
      aktivitasEksplorasi: [
        {
          langkah: 1,
          instruksi: `Ayo Mengamati: Perhatikan stimulus gambar/video mengenai fenomena ${topic} yang disajikan oleh guru.`,
          pertanyaanPanduan: 'Apa hal paling menarik atau janggal yang kamu temukan dari fenomena tersebut?'
        },
        {
          langkah: 2,
          instruksi: `Ayo Merumuskan Hipotesis: Tuliskan dugaan awal kelompok kalian sebelum memulai uji coba.`,
          pertanyaanPanduan: 'Jika kondisi awal berubah, apa yang kemungkinan besar akan terjadi?'
        },
        {
          langkah: 3,
          instruksi: `Ayo Melakukan Uji Coba: Catat hasil pengamatan ke dalam tabel lembar kerja pengamatan.`,
          pertanyaanPanduan: 'Faktor apa saja yang memengaruhi hasil pengamatan kalian?'
        }
      ],
      soalAnalitis: [
        `Berdasarkan data tabel kalian, simpulkan pola utama yang terjadi pada fenomena ${topic}!`,
        `Kaitkan hasil penemuan kalian dengan dampak nyata terhadap kehidupan manusia atau lingkungan sekitar!`,
        `Tuliskan 2 ide kreatif yang bisa dilakukan kelompokmu untuk menjaga atau meningkatkan kondisi tersebut!`
      ],
      rubrikPenilaian: [
        {
          aspek: 'Keterampilan Pengamatan & Data',
          kriteriaBaik: 'Data dicatat lengkap, rapi, dan sesuai dengan fakta observasi aktual.',
          kriteriaCukup: 'Data dicatat namun masih ada variabel yang terlewat.'
        },
        {
          aspek: 'Analisis Kritis & Penarikan Simpulan',
          kriteriaBaik: 'Simpulan logis, didukung bukti data, dan menjawab rumusan masalah.',
          kriteriaCukup: 'Simpulan bersifat umum dan belum mengaitkan seluruh data.'
        },
        {
          aspek: 'Kolaborasi & Presentasi',
          kriteriaBaik: 'Seluruh anggota aktif berdiskusi dan mampu mempresentasikan ide dengan percaya diri.',
          kriteriaCukup: 'Hanya sebagian anggota yang aktif dalam diskusi.'
        }
      ],
      promptIlustrasi: `Scientific inquiry student activity book illustration, Indonesian classroom context, students collaborating happily with magnifying glasses and notebooks on topic "${topic}", clean vector lines --ar 16:9`,
      createdAt: new Date().toISOString().split('T')[0]
    };
  },

  /**
   * 3. Storyboard Generator (KEY FEATURE!)
   */
  async generateStoryboard(input: StoryboardGenerateInput): Promise<StoryboardProject> {
    const serverResult = await callServerGemini<StoryboardProject>('storyboard', input);
    if (serverResult) return serverResult;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const topic = input.topic.trim() || 'Mengenal Flora & Fauna Nusantara';
    const isLuwak = topic.toLowerCase().includes('luwak');

    if (isLuwak) {
      // Import directly from featured mock for highest fidelity on specified Luwak project
      const { mockLuwakProject } = await import('../data/mockInitialProject');
      return {
        ...mockLuwakProject,
        id: `storyboard-${Date.now()}`,
        duration: input.duration || '60 detik',
        aspectRatio: input.aspectRatio || '16:9',
        visualStyle: input.visualStyle || '2D Cartoon',
        createdAt: new Date().toISOString().split('T')[0]
      };
    }

    // Dynamic intelligent scenes generation for custom topics
    return {
      id: `storyboard-${Date.now()}`,
      title: `Storyboard Edukasi: ${topic}`,
      topic,
      audience: input.audience,
      videoType: input.videoType,
      duration: input.duration,
      aspectRatio: input.aspectRatio,
      visualStyle: input.visualStyle,
      createdAt: new Date().toISOString().split('T')[0],
      notes: `Storyboard terstruktur untuk video edukasi ramah anak dengan gaya visual ${input.visualStyle}.`,
      scenes: [
        {
          sceneNumber: 1,
          timestamp: '00:00 - 00:05',
          visualDescription: `Kamera memperlihatkan pembuka yang hangat dengan karakter maskot edukasi menyapa penonton dengan senyum cerah di latar belakang tema ${topic}.`,
          narration: `Halo sahabat pembelajar! Pernahkah kamu membayangkan bagaimana rahasia di balik ${topic}? Yuk kita cari tahu bersama!`,
          onScreenText: `Mengenal Rahasia ${topic}`,
          imagePrompt: `Cute high quality ${input.visualStyle} illustration of a friendly animated educational host welcoming students to learn about "${topic}", cheerful bright morning colors, engaging composition --ar ${input.aspectRatio}`,
          videoPrompt: `Slow cinematic zoom-in on the friendly character waving hello enthusiastically, soft lighting, vibrant lively background matching "${topic}", smooth 24fps animation`,
          cameraMovement: 'Slow Zoom-In',
          transition: 'Cross Dissolve'
        },
        {
          sceneNumber: 2,
          timestamp: '00:05 - 00:15',
          visualDescription: `Transisi menuju pengenalan fakta dasar. Grafis interaktif dan objek-objek visual terkait ${topic} mulai muncul dan berputar secara halus di layar.`,
          narration: `Ternyata, ${topic} memiliki karakteristik yang sangat istimewa dan memegang peranan penting di sekitar kita lho!`,
          onScreenText: `Fakta Penting: ${topic}`,
          imagePrompt: `Detailed educational visual infographic in ${input.visualStyle}, key elements of "${topic}" beautifully illustrated with labeled pointers, modern clean aesthetic --ar ${input.aspectRatio}`,
          videoPrompt: `Smooth panning shot over the visual elements of "${topic}" interacting with gentle particle effects, educational clarity, charming motion design`,
          cameraMovement: 'Smooth Pan Left to Right',
          transition: 'Slide Left'
        },
        {
          sceneNumber: 3,
          timestamp: '00:15 - 00:30',
          visualDescription: `Puncak penjelasan inti: Animasi gerak memperagakan bagaimana proses atau manfaat utama dari ${topic} bekerja secara bertahap.`,
          narration: `Lihatlah proses luar biasa ini! Setiap bagian bekerja sama secara harmonis sehingga menghasilkan manfaat yang luar biasa bagi kehidupan kita.`,
          onScreenText: `Proses & Manfaat Utama`,
          imagePrompt: `Dynamic visual action scene in ${input.visualStyle} demonstrating the core mechanism of "${topic}", bright vivid colors, storytelling book appeal --ar ${input.aspectRatio}`,
          videoPrompt: `Dynamic tracking shot following the flow of action explaining "${topic}", soft depth of field, expressive character reactions`,
          cameraMovement: 'Dynamic Tracking Shot',
          transition: 'Wipe Up'
        },
        {
          sceneNumber: 4,
          timestamp: '00:30 - 00:45',
          visualDescription: `Contoh penerapan dalam kehidupan nyata peserta didik: Seorang anak mempraktikkan hal positif yang terinspirasi dari pengetahuan ${topic}.`,
          narration: `Kita juga bisa ikut mempraktikkan kebiasaan baik ini setiap hari di sekolah maupun di rumah!`,
          onScreenText: `Aksi Nyata Kita!`,
          imagePrompt: `Heartwarming illustration in ${input.visualStyle} showing children happily applying the lessons from "${topic}" in everyday life, cheerful teamwork --ar ${input.aspectRatio}`,
          videoPrompt: `Warm medium shot of children smiling and celebrating their new knowledge about "${topic}", sunlight rays, joyful atmosphere`,
          cameraMovement: 'Medium Static Shot',
          transition: 'Soft Dissolve'
        },
        {
          sceneNumber: 5,
          timestamp: '00:45 - 01:00',
          visualDescription: `Penutup penuh inspirasi: Banner apresiasi belajar, ajakan refleksi singkat, dan logo EduSmart Lab dengan senyuman maskot.`,
          narration: `Belajar selalu menyenangkan jika kita selalu punya rasa ingin tahu yang tinggi. Sampai jumpa di episode petualangan edukasi berikutnya!`,
          onScreenText: `Belajar Terus · EduSmart Creator Lab`,
          imagePrompt: `Inspiring closing scene in ${input.visualStyle}, cute character giving a thumbs up with inspirational quote banner about learning "${topic}", sparkling clean background --ar ${input.aspectRatio}`,
          videoPrompt: `Slow pull back shot as title card appears gracefully, friendly wave goodbye, smooth fade to warm light`,
          cameraMovement: 'Slow Pull-Back',
          transition: 'Fade to White'
        }
      ]
    };
  },

  /**
   * 4. Video Generator (Pipeline: Topic -> Script -> Storyboard -> Prompts -> Voiceover)
   */
  async generateVideoScript(input: VideoScriptGenerateInput): Promise<VideoScriptProject> {
    const serverResult = await callServerGemini<VideoScriptProject>('video', input);
    if (serverResult) return serverResult;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const topic = input.topic.trim() || 'Siklus Air dan Hujan';
    const storyboardProj = await this.generateStoryboard({
      topic,
      audience: input.targetAudience,
      videoType: input.videoType,
      duration: '60 detik',
      aspectRatio: input.aspectRatio || '16:9',
      visualStyle: 'Cute Educational 2D Cartoon'
    });

    return {
      id: `vid-${Date.now()}`,
      topic,
      targetAudience: input.targetAudience,
      videoType: input.videoType,
      script: `[00:00-00:05] HOOK: "Pernahkah kamu penasaran mengapa ${topic} sangat memukau?"
[00:05-00:20] EKSPLORASI: "Mari kita selidiki rahasia dan fakta mengejutkan yang jarang diketahui banyak orang..."
[00:20-00:40] PENJELASAN SAINS: "Secara alami, ada tahapan menakjubkan yang terjadi di balik ${topic}..."
[00:40-00:55] APLIKASI NYATA: "Dengan memahami ini, kita bisa lebih bijak dan peduli terhadap lingkungan kita!"
[00:55-01:00] OUTRO: "Tekan tombol simpan dan bagikan cerita ini ke teman belajarmu!"`,
      storyboard: storyboardProj.scenes,
      imagePrompts: storyboardProj.scenes.map((s) => s.imagePrompt),
      videoPrompts: storyboardProj.scenes.map((s) => s.videoPrompt),
      voiceOverScript: storyboardProj.scenes.map((s) => `[${s.timestamp}] ${s.narration}`).join('\n\n'),
      subtitles: storyboardProj.scenes.map((s) => ({ time: s.timestamp, text: s.onScreenText })),
      sceneSequence: storyboardProj.scenes.map((s) => `Scene ${s.sceneNumber}: ${s.onScreenText} (${s.cameraMovement})`).join(' -> '),
      productionGuide: [
        '1. Generate gambar dasar untuk setiap scene menggunakan prompt gambar pada Midjourney / Ideogram.',
        '2. Masukkan gambar ke video generator (Kling AI / Runway Gen-3) menggunakan prompt video yang disediakan.',
        '3. Rekam audio voice-over menggunakan ElevenLabs dengan karakter suara hangat dan ramah anak.',
        '4. Satukan klip video dan audio di CapCut atau Premiere Pro, lalu pasang subtitle sesuai teks on-screen.'
      ],
      createdAt: new Date().toISOString().split('T')[0]
    };
  },

  /**
   * 5. Educational Song Generator
   */
  async generateSong(input: SongGenerateInput): Promise<SongProject> {
    const serverResult = await callServerGemini<SongProject>('song', input);
    if (serverResult) return serverResult;

    await new Promise((resolve) => setTimeout(resolve, 1400));

    const topic = input.topic.trim() || 'Mengenal Angka 1-10';
    return {
      id: `song-${Date.now()}`,
      title: `Lagu Belajar Ceria: ${topic}`,
      topic,
      age: input.age || '4-7 Tahun',
      language: input.language || 'Bahasa Indonesia',
      songStyle: input.songStyle || 'Cheerful Ukulele & Kids Pop',
      duration: input.duration || '2 Menit',
      learningObjective: input.learningObjective || `Membantu anak mengingat dan menghafal esensi ${topic} secara riang gembira lewat irama musik.`,
      songStructure: 'Intro -> Verse 1 -> Pre-Chorus -> Chorus -> Verse 2 -> Chorus -> Bridge -> Chorus -> Outro',
      lyrics: [
        {
          sectionTitle: '[Intro - Petikan Ukulele Ceria & Ketukan Tangan]',
          lines: [
            '(La la la... la la la...)',
            'Ayo kawan kita bernyanyi!',
            'Belajar seru bersama hari ini!'
          ]
        },
        {
          sectionTitle: '[Verse 1 - Pengenalan Karakter & Topik]',
          lines: [
            `Matahari pagi tersenyum hangat,`,
            `Kita melangkah dengan semangat,`,
            `Mari mengenal ${topic} bersama-sama,`,
            `Banyak rahasia sungguh mempesona!`
          ]
        },
        {
          sectionTitle: '[Chorus - Bagian Refrein Utama yang Catchy]',
          lines: [
            `Satu, dua, tiga, kita hitung langkahnya!`,
            `Empat, lima, enam, sebutkan warnanya!`,
            `Tujuh, delapan, sembilan, sampai sepuluh!`,
            `Belajar ${topic} membuat kita tangguh!`
          ]
        },
        {
          sectionTitle: '[Verse 2 - Penerapan Sehari-hari]',
          lines: [
            `Ada di taman dan di buku cerita,`,
            `Semua ilmu sungguh berharga,`,
            `Janganlah takut untuk mencoba,`,
            `Pintar dan hebat kita semua!`
          ]
        },
        {
          sectionTitle: '[Outro - Nada Manis & Tawa Ceria]',
          lines: [
            `Hore! Sekarang kita sudah tahu!`,
            `Sampai jumpa di lagu yang baru!`,
            '(Tepuk tangan gembira & tawa anak-anak)'
          ]
        }
      ],
      musicStylePrompt: `Upbeat cheerful children educational pop, playful acoustic ukulele, bright marimba, catchy 115 bpm, bouncy rhythm, clean joyful female nursery lead vocals, singalong kids choir, heartwarming Indonesian children melody --style bright nursery`,
      voiceDirection: 'Vokal cerah, energik, artikulasi huruf sangat jelas dan ramah anak. Tempo sedang dan tidak tergesa-gesa agar anak mudah ikut menirukan lirik.',
      createdAt: new Date().toISOString().split('T')[0]
    };
  },

  /**
   * 6. Game Generator
   */
  async generateGame(input: GameGenerateInput) {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    const topic = input.topic || 'Mengenal Hewan & Lingkungan';
    return {
      title: `Board Game Petualangan: ${topic}`,
      gameType: input.gameType || 'Print & Play Board Game',
      ageRange: input.ageRange || '5-9 Tahun',
      gameGoals: `Menguasai konsep dasar ${topic} sambil melatih kolaborasi dan strategi pemecahan masalah.`,
      rules: [
        'Kocok dadu bergantian dan gerakkan bidak sesuai angka yang muncul.',
        'Jika mendarat di petak Bintang Sains, ambil 1 kartu kuis dan jawab pertanyaannya.',
        'Jawaban benar mendapat 2 koin bintang. Pemain pertama yang mencapai garis finish dengan koin terbanyak menang!'
      ],
      sampleCards: [
        {
          question: `Sebutkan 2 contoh hewan yang aktif di malam hari (nokturnal) terkait materi ${topic}!`,
          options: ['A. Ayam dan Burung Pipit', 'B. Luwak dan Burung Hantu', 'C. Kucing dan Sapi'],
          answer: 'B. Luwak dan Burung Hantu',
          hint: 'Hewan ini memiliki mata yang sangat sensitif di kegelapan.'
        },
        {
          question: `Apa fungsi utama dari menjaga habitat alami satwa di alam bebas?`,
          options: ['A. Agar ekosistem tetap seimbang', 'B. Agar hutan bisa ditebang', 'C. Tidak ada fungsinya'],
          answer: 'A. Agar ekosistem tetap seimbang',
          hint: 'Semua makhluk hidup saling membutuhkan rantai makanan.'
        }
      ],
      visualPrompt: `Printable colorful board game path map design for kids, subject: "${topic}", numbered path tiles 1 to 24 with cartoon landmarks, high quality vector art --ar 16:9`
    };
  },

  /**
   * 7. Comic Generator
   */
  async generateComic(input: ComicGenerateInput) {
    await new Promise((resolve) => setTimeout(resolve, 1300));
    const topic = input.topic || 'Menjaga Kebersihan Hutan Tropis';
    return {
      title: `Komik Edukasi: Petualangan Menyingkap ${topic}`,
      topic,
      panelsCount: input.panelsCount || 4,
      characters: [
        { name: 'Kiki', desc: 'Anak yang penuh rasa ingin tahu dengan kaca pembesar dan tas ransel.' },
        { name: 'Lulu sang Luwak', desc: 'Sahabat satwa bijak dan gesit bertopeng hitam menggemaskan.' }
      ],
      panels: [
        {
          panelNumber: 1,
          visual: 'Kiki sedang berjalan di jalan setapak hutan dan melihat buah ceri jatuh dari pohon.',
          dialogue: 'Kiki: "Wah, buah apa ini ya? Warnanya merah ranum sekali!"',
          imagePrompt: 'Comic panel 1: Curious young explorer girl looking at bright red berries in tropical forest, clean manga lineart and vibrant colors --ar 1:1'
        },
        {
          panelNumber: 2,
          visual: 'Lulu sang Luwak melongok dari dahan atas pohon dengan senyum ramah.',
          dialogue: 'Lulu: "Psst! Itu ceri kopi terbaik! Aku paling suka yang paling manis!"',
          imagePrompt: 'Comic panel 2: Friendly cute civet cartoon smiling from mossy tree branch, speech bubble space, sunny day --ar 1:1'
        },
        {
          panelNumber: 3,
          visual: 'Lulu menjelaskan bagaimana enzim di perutnya membantu biji kopi.',
          dialogue: 'Lulu: "Di dalam pencernaanku, biji kopi terfermentasi alami tanpa rusak lho!"',
          imagePrompt: 'Comic panel 3: Cute civet demonstrating coffee beans with sparkling explanatory bubbles, funny and educational --ar 1:1'
        },
        {
          panelNumber: 4,
          visual: 'Kiki dan Lulu berfoto bersama dengan jempol terangkat sambil mengimbau menjaga hutan.',
          dialogue: 'Kiki & Lulu: "Alam Indonesia sungguh ajaib! Yuk jaga rumah satwa rimba bersama!"',
          imagePrompt: 'Comic panel 4: Girl explorer and cartoon civet high-fiving happily, banner "Jaga Hutan Kita", heartwarming finish --ar 1:1'
        }
      ]
    };
  },

  /**
   * 8. Flashcard Generator
   */
  async generateFlashcard(input: FlashcardGenerateInput) {
    await new Promise((resolve) => setTimeout(resolve, 1100));
    const topic = input.topic || 'Fauna Tropis Nusantara';
    return {
      title: `Set Flashcard Interaktif: ${topic}`,
      count: input.cardCount || 6,
      cards: [
        {
          front: 'Luwak (Musang Kelapa)',
          back: 'Satwa nokturnal pemanjat pohon yang suka memakan buah manis dan terkenal dalam fenomena kopi luwak.',
          funFact: 'Indera penciumannya bisa mengendus kematangan buah dari kejauhan!',
          imagePrompt: 'Minimalist flashcard front: cute Asian palm civet isolated on clean background, bold educational typography'
        },
        {
          front: 'Harimau Sumatra',
          back: 'Kucing besar predator puncak endemik pulau Sumatra dengan belang loreng yang unik.',
          funFact: 'Setiap harimau memiliki motif loreng yang berbeda seperti sidik jari manusia!',
          imagePrompt: 'Minimalist flashcard front: majestic friendly Sumatran tiger cartoon illustration, isolated white background'
        },
        {
          front: 'Burung Cenderawasih',
          back: 'Burung surga dari tanah Papua dengan bulu ekor indah yang memesona.',
          funFact: 'Burung jantan menari dengan indah untuk memikat perhatian burung betina.',
          imagePrompt: 'Minimalist flashcard front: vibrant bird of paradise illustration with golden tail feathers'
        }
      ]
    };
  }
};
