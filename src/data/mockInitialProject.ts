import { StoryboardProject } from '../types';

export const mockLuwakProject: StoryboardProject = {
  id: 'storyboard-luwak-01',
  title: 'Mengenal Luwak: Sahabat Rimba dan Penikmat Kopi',
  topic: 'Mengenal Luwak & Proses Kopi Luwak',
  audience: 'SD',
  videoType: 'Video Pembelajaran & Storytelling',
  duration: '60 detik',
  aspectRatio: '16:9',
  visualStyle: 'Cute Educational 2D Cartoon',
  createdAt: '2026-09-30',
  notes: 'Edukasi fauna lokal Indonesia dan fenomena kopi luwak secara sains ramah anak.',
  scenes: [
    // PART 1: Pengenalan & Ciri Fisik Luwak
    {
      sceneNumber: 1,
      timestamp: '00:00 - 00:06',
      visualDescription: 'Latar hutan tropis Indonesia yang rindang dengan semburat sinar mentari pagi menembus dedaunan. Kamera perlahan mendekati dahan pohon besar di mana seekor luwak lucu berekor panjang dan bertopeng mata hitam sedang meregangkan badannya dengan menggemaskan.',
      narration: 'Pernahkah kamu melihat satwa nokturnal yang sangat unik ini? Ya! Ini adalah Luwak, atau musang kelapa, penghuni rimba tropis Indonesia.',
      onScreenText: 'Mengenal Luwak (Musang Kelapa)',
      imagePrompt: '2D cute Disney-Pixar style illustration of an Asian palm civet perched on a lush rainforest branch, golden sunbeams filtering through dense emerald leaves, charming expressive big eyes, soft warm colors, high quality children book art --ar 16:9',
      videoPrompt: 'Cinematic slow zoom-in on an Asian palm civet waking up and stretching gently on a mossy branch in a tropical rainforest, soft morning light, gentle breeze swaying jungle foliage, 2D wholesome cartoon aesthetic, 24fps smooth',
      cameraMovement: 'Slow Zoom-In & Tilt Down',
      transition: 'Cross Dissolve'
    },
    {
      sceneNumber: 2,
      timestamp: '00:06 - 00:13',
      visualDescription: 'Tampilan close-up luwak memperlihatkan ciri fisiknya: bulu abu-abu kecokelatan halus, tiga garis gelap di punggung, bintik-bintik di sisi tubuh, dan wajah lucu dengan corak seperti kacamata/topeng hitam di sekitar mata.',
      narration: 'Luwak memiliki bulu lebat bercorak garis, ekor panjang yang membantunya menjaga keseimbangan di dahan, dan cakar lincah untuk memanjat.',
      onScreenText: 'Ciri Fisik Luwak: Ekor Panjang · Cakar Lincah · Topeng Wajah',
      imagePrompt: 'Detailed cute character design sheet of an Asian palm civet highlighting its long bushy tail, dark mask around eyes, soft patterned fur, bright curious expression, clean educational infographic style --ar 16:9',
      videoPrompt: 'Medium close-up shot of the civet tilting head curiously, twitching nose, showcasing fluffy striped fur and expressive whiskers, peaceful nature atmosphere, soft lighting',
      cameraMovement: 'Static Pan to Detail',
      transition: 'Slide Left'
    },
    {
      sceneNumber: 3,
      timestamp: '00:13 - 00:20',
      visualDescription: 'Suasana berganti menjadi malam hari yang cerah bertabur bintang. Luwak yang nokturnal aktif memanjat dengan lincah, mengendus buah-buahan hutan dengan indera penciumannya yang super tajam.',
      narration: 'Luwak adalah hewan nokturnal yang aktif mencari makan di malam hari. Hidungnya yang sensitif bisa mendeteksi buah paling manis dan segar dari kejauhan!',
      onScreenText: 'Hewan Nokturnal: Aktif di Malam Hari',
      imagePrompt: 'Nighttime enchanting tropical orchard under a starlit violet sky, glowing fireflies, cute civet sniffing a glowing ripe red fruit on tree branch, whimsical educational illustration --ar 16:9',
      videoPrompt: 'Nighttime tracking shot following the civet climbing gracefully along tree boughs under moonlight, glowing fireflies around, sniffing fruit excitedly',
      cameraMovement: 'Gentle Tracking Shot',
      transition: 'Fade through Indigo'
    },

    // PART 2: Proses Biji Kopi dan Peran Luwak
    {
      sceneNumber: 4,
      timestamp: '00:20 - 00:28',
      visualDescription: 'Kamera menyorot kebun kopi pegunungan yang subur. Di antara dahan pohon kopi, luwak hanya memilih dan memetik buah ceri kopi yang paling matang, berwarna merah ranum sempurna.',
      narration: 'Luwak terkenal sangat selektif. Ia hanya memakan buah ceri kopi terbaik yang paling manis dan ranum sempurna di kebun kopi pegunungan.',
      onScreenText: 'Hanya Memilih Ceri Kopi Paling Matang!',
      imagePrompt: 'Cute palm civet happily selecting bright red ruby-like ripe coffee cherries from leafy coffee plants in highland plantation, misty rolling hills background, educational storybook style --ar 16:9',
      videoPrompt: 'Close up of civet paws delicately plucking a bright red ripe coffee cherry and chewing playfully, warm golden hour plantation setting',
      cameraMovement: 'Macro Focus',
      transition: 'Wipe Right'
    },
    {
      sceneNumber: 5,
      timestamp: '00:28 - 00:37',
      visualDescription: 'Infografis animasi lucu memotong ke bagian dalam: lambung luwak melakukan fermentasi alami pada daging buah, tetapi biji keras kopi di dalamnya tetap utuh dan mengalami proses enzim alami yang mengurangi rasa pahit.',
      narration: 'Di dalam sistem pencernaan luwak, enzim alami memfermentasi biji kopi tanpa merusaknya. Proses biologis ini mengurai keasaman dan memunculkan cita rasa yang sangat halus.',
      onScreenText: 'Fermentasi Alami Enzim Pencernaan',
      imagePrompt: 'Gentle scientific educational diagram illustration showing natural enzymatic fermentation inside civet digestive system, friendly sparkling bubbles representing digestive enzymes around intact coffee beans, clean pastel infographics --ar 16:9',
      videoPrompt: 'Stylized 2D animated cross-section animation showing enzymes softly glowing and interacting with coffee bean, friendly laboratory-level clarity for kids',
      cameraMovement: 'Static Graphic Focus',
      transition: 'Soft Dissolve'
    },
    {
      sceneNumber: 6,
      timestamp: '00:37 - 00:48',
      visualDescription: 'Biji kopi yang dikeluarkan luwak dikumpulkan oleh petani dengan hati-hati, lalu dicuci berkali-kali dengan air bersih pegunungan hingga higienis, dan dijemur di bawah sinar matahari hangat.',
      narration: 'Biji kopi kemudian dibersihkan secara higienis, dicuci berkali-kali, dan dijemur hingga kering sempurna sebelum dipanggang menjadi Kopi Luwak yang tersohor di dunia!',
      onScreenText: 'Pencucian Higienis & Penjemuran Alami',
      imagePrompt: 'Friendly Indonesian coffee farmer washing whole coffee beans in crystal clear mountain spring water, sun drying on woven bamboo trays, clean hygienic process, smiling and educational --ar 16:9',
      videoPrompt: 'Slow motion shot of sparkling clean water cascading over golden coffee beans on bamboo drying racks under bright sun, lush green volcanic mountain backdrop',
      cameraMovement: 'Wide Landscape Pan',
      transition: 'Smooth Dissolve'
    },
    {
      sceneNumber: 7,
      timestamp: '00:48 - 01:00',
      visualDescription: 'Luwak melambaikan kaki depannya ceria berdampingan dengan secangkir minuman hangat dan pesan konservasi satwa liar yang harmonis. Teks penutup dan pesan pelestarian habitat.',
      narration: 'Hebat ya kerja sama alam ini! Ingat, luwak liar adalah pahlawan ekosistem yang wajib kita jaga kelestarian habitatnya di alam bebas. Sampai jumpa di petualangan sains berikutnya!',
      onScreenText: 'Lestarikan Luwak di Alam Bebas · EduSmart Hub',
      imagePrompt: 'Wholesome ending card, adorable civet sitting happily on high branch with Indonesian mountain view, subtle educational banner "Jaga Satwa Liar Indonesia", heartwarming colorful finish --ar 16:9',
      videoPrompt: 'Final hero shot of the happy civet winking playfully at camera as dusk falls softly over the forest canopy, title card animation smoothly fading in',
      cameraMovement: 'Slow Pull-Back',
      transition: 'Fade to White'
    }
  ]
};
