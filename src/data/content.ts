/**
 * SATU-SATUNYA tempat untuk mengubah isi website.
 * Semua teks, tautan, dan data ada di file ini.
 */

export interface Img {
  /** nama file tanpa ekstensi di public/img (tersedia .webp & .jpg) */
  name: string
  w: number
  h: number
  alt: string
}

export const img = {
  wisuda: { name: 'sinta-wisuda', w: 800, h: 1000, alt: 'Sinta Rama Dani mengenakan kebaya dan medali wisuda' },
  cafe: { name: 'sinta-cafe', w: 480, h: 600, alt: 'Foto Sinta Rama Dani tersenyum di sebuah kafe' },
  arsipDashboard: { name: 'arsip-dashboard', w: 1100, h: 627, alt: 'Dashboard aplikasi Arsipin menampilkan ringkasan arsip surat' },
  arsipSuratMasuk: { name: 'arsip-surat-masuk', w: 1100, h: 627, alt: 'Daftar surat masuk beserta status disposisi di aplikasi Arsipin' },
  hki: { name: 'hki', w: 900, h: 1273, alt: 'Surat Pencatatan Ciptaan HKI untuk program komputer Arsipin, alamat pencipta diburamkan' },
  saladMobile: { name: 'salad-mertua', w: 540, h: 1055, alt: 'Tampilan beranda aplikasi mobile Salad Mertua' },
  saladFigma: { name: 'salad-figma', w: 1100, h: 546, alt: 'Desain antarmuka aplikasi Salad Mertua di Figma' },
  saladMenu: { name: 'salad-web-menu', w: 1100, h: 510, alt: 'Halaman menu minuman dan desserts pada website Salad Mertua' },
  saladAbout: { name: 'salad-web-about', w: 1100, h: 510, alt: 'Halaman sejarah Salad Mertua pada website' },
  jurnal: { name: 'jurnal', w: 900, h: 993, alt: 'Halaman pertama artikel jurnal JINITA tentang prediksi waktu tanam padi' },
} satisfies Record<string, Img>

export const nav = {
  links: [
    { href: '#about', label: 'Tentang' },
    { href: '#experience', label: 'Pengalaman' },
    { href: '#projects', label: 'Proyek' },
    { href: '#skills', label: 'Keahlian' },
  ],
  cta: { href: '#contact', label: 'Hubungi' },
}

export const profile = {
  name: 'Sinta Rama Dani',
  badge: { status: 'Open to work', text: 'Kalimantan Barat · Remote / Onsite' },
  nameLines: [['Sinta', 'Rama'], ['Dani.']],
  intro: { prefix: 'Lulusan', strong: 'Teknik Informatika', suffix: 'yang menjembatani teknologi & komunikasi —' },
  roles: ['Public Relations', 'Content Creator', 'Web Developer', 'Administrasi Digital', 'Data Enthusiast'],
  actions: { primary: { label: 'Lihat Karya', href: '#projects' }, ghost: { label: 'Mari Berkolaborasi', href: '#contact' } },
  chips: [
    { small: 'IPK · CUM LAUDE', value: '3,98' },
    { small: 'JURNAL TERBIT', value: 'SINTA 2' },
    { small: 'SERTIFIKAT', value: 'HKI ✦' },
  ],
  scrollHint: 'Gulir pelan-pelan',
}

export const marquee = [
  'Public Relations', 'Content Creator', 'Web Developer', 'Data Science', 'Administrasi', 'Desain Visual', 'Video Editing',
]

export const about = {
  eyebrow: 'Tentang Saya',
  title: ['Logika seorang ', 'engineer', ', hati seorang komunikator.'] as const,
  lead:
    'Lulusan S1 Teknik Informatika Universitas Muhammadiyah Pontianak dengan predikat Cum Laude. Berpengalaman memimpin Departemen Humas BEM FTIK — membangun kerja sama dengan pihak internal maupun eksternal, menyusun korespondensi resmi, dan mengelola konten untuk citra organisasi. Didukung kemampuan analitis, administrasi yang teliti, dan penulisan ilmiah.',
  stats: [
    { value: 900, plus: true, label: 'Surat direkap dengan Excel saat magang' },
    { value: 600, plus: true, label: 'Dokumen didigitalisasi & diarsipkan' },
    { value: 1541, plus: false, label: 'Suka TikTok dari konten KKU 2025' },
    { value: 9, plus: false, label: 'Program kerja dipimpin & diawasi' },
  ],
  tags: [
    { icon: '🎓', bg: '#ffe8ef', text: 'Cum Laude 2026' },
    { icon: '📍', bg: '#efe6ff', text: 'Sukadana, Kayong Utara' },
  ],
}

export interface TimelineItem {
  icon: string
  title: string
  when: string
  org: string
  /** boleh memakai **tebal** dan _miring_ */
  points: string[]
}

export interface TimelineTab {
  id: string
  label: string
  items: TimelineItem[]
}

export const experience = {
  eyebrow: 'Perjalanan',
  title: ['Pengalaman yang ', 'membentuk', ' saya.'] as const,
  tabs: [
    {
      id: 'kerja',
      label: 'Pengalaman Kerja',
      items: [
        {
          icon: '💼',
          title: 'Magang Administrasi',
          when: 'Nov 2025 – Jan 2026',
          org: 'Dinas Ketahanan Pangan Provinsi Kalimantan Barat',
          points: [
            'Merekapitulasi **900+ surat** menggunakan Microsoft Excel untuk kelancaran administrasi Bagian Sekretariat.',
            'Mengelola pengarsipan dan digitalisasi **600+ dokumen** melalui pemindaian dan arsip elektronik terstruktur.',
            'Mengembangkan **Sistem Arsip Surat Masuk & Keluar** berbasis web dengan 8 fitur utama — telah memperoleh sertifikat HKI.',
          ],
        },
        {
          icon: '🎬',
          title: 'Pengelola Media Sosial & Editor Konten',
          when: '2025',
          org: 'KKU 2025 · Desa Punggur Kecil — Divisi Pubdekdok',
          points: [
            'Merancang dan mengeksekusi strategi konten Instagram & TikTok: **162 pengikut IG**, **169 pengikut** dan **1.541 suka** di TikTok.',
            'Mendesain brosur serta mengedit foto dan konten publikasi kegiatan.',
            'Memproduksi video _after movie_ KKU 2025 yang dipublikasikan di YouTube.',
          ],
        },
      ],
    },
    {
      id: 'org',
      label: 'Organisasi',
      items: [
        {
          icon: '📣',
          title: 'Ketua Departemen Humas',
          when: '2024 – 2025',
          org: 'BEM Fakultas Teknik & Ilmu Komputer',
          points: [
            'Memimpin **tim 4 orang** merencanakan dan menuntaskan **4 program kerja** kehumasan.',
            'Narahubung utama BEM FTIK untuk komunikasi dan kerja sama internal maupun eksternal.',
            'Menyusun korespondensi resmi dan materi publikasi untuk mendukung citra organisasi.',
          ],
        },
        {
          icon: '⚖️',
          title: 'Anggota Komisi 1 — Legislasi & Pengaturan',
          when: '2025 – 2026',
          org: 'DPM FTIK',
          points: ['Mengawasi dan mengevaluasi pelaksanaan **5 program kerja** lembaga kemahasiswaan agar sesuai regulasi dan target.'],
        },
        {
          icon: '📚',
          title: 'Anggota Bidang Penalaran & Keilmuan',
          when: '2024',
          org: 'Himpunan Mahasiswa Teknik Informatika',
          points: ['Berkontribusi merencanakan dan melaksanakan **3 kegiatan akademik** untuk meningkatkan kapasitas keilmuan mahasiswa.'],
        },
      ],
    },
  ] satisfies TimelineTab[],
}

export interface GalleryItem {
  img: Img
  caption: string
  tall?: boolean
}

export interface Project {
  id: 'arsip' | 'kasir' | 'riset' | 'kku'
  size: 'wide' | 'narrow'
  // kartu
  kicker: string
  title: string
  summary: string
  chips: string[]
  // modal
  modal: {
    kicker: string
    title: string
    description: string
    points: string[]
    meta?: string
    gallery?: GalleryItem[]
    link?: { href: string; label: string }
    youtubeId?: string
  }
}

export const youtube = { id: 'JY3fi4XF7DM', url: 'https://youtu.be/JY3fi4XF7DM' }

export const projects = {
  eyebrow: 'Karya Pilihan',
  title: ['Proyek yang saya ', 'rawat', ' dengan sepenuh hati.'] as const,
  lead: 'Klik kartu untuk melihat detail. Arahkan kursor untuk efek 3D.',
  items: [
    {
      id: 'arsip',
      size: 'wide',
      kicker: 'Web App · 2026',
      title: 'Arsipin — Sistem Arsip Surat Masuk & Keluar',
      summary: 'Sistem pengarsipan berbasis web dengan 8 fitur utama untuk Dinas Ketahanan Pangan Kalbar, tercatat sebagai ciptaan HKI.',
      chips: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
      modal: {
        kicker: 'Web App · HKI · 2026',
        title: 'Arsipin — Arsip Surat Masuk & Surat Keluar',
        description: 'Dikembangkan saat magang di Dinas Ketahanan Pangan Provinsi Kalimantan Barat untuk menata administrasi Bagian Sekretariat.',
        points: [
          'Kelola surat masuk & keluar: input, daftar, edit, hapus, dan pencarian',
          'Alur disposisi Kepala Dinas dan bidang dengan status tindak lanjut',
          'Kode klasifikasi surat, statistik per tahun, dan ekspor ke Excel',
        ],
        meta: 'Tercatat sebagai ciptaan Program Komputer · No. Pencatatan 001091892 · 22 Januari 2026 · Pemegang hak cipta: LP3M Universitas Muhammadiyah Pontianak',
        gallery: [
          { img: img.arsipDashboard, caption: 'Dashboard Arsip Surat' },
          { img: img.arsipSuratMasuk, caption: 'Daftar Surat Masuk & disposisi' },
          { img: img.hki, caption: 'Surat Pencatatan Ciptaan (HKI)', tall: true },
        ],
      },
    },
    {
      id: 'kasir',
      size: 'narrow',
      kicker: 'Mobile & Website · UMKM',
      title: 'Aplikasi Kasir Salad Mertua',
      summary: 'Aplikasi kasir untuk pencatatan transaksi, desain UI di Figma, plus website promosi produk.',
      chips: ['Mobile', 'Website', 'UI/UX · Figma', 'UMKM'],
      modal: {
        kicker: 'Mobile & Website · UI/UX · UMKM',
        title: 'Aplikasi Kasir Salad Mertua',
        description: 'Aplikasi kasir dan website untuk Salad Mertua, UMKM minuman dan makanan di Pontianak sejak 2017 — dirancang dari desain UI di Figma hingga aplikasi yang berjalan.',
        points: [
          'Aplikasi mobile: widget cuaca Pontianak, Menu, Maps, Sosmed, Riwayat, dan keranjang pesanan',
          'Desain UI Figma: halaman Beranda, Menu, Order, dan Checkout dengan color scheme khusus',
          'Website promosi: halaman Menu, Minuman & Desserts, About Us, Outlet, dan Fasilitas',
        ],
        gallery: [
          { img: img.saladMobile, caption: 'Aplikasi mobile — Beranda', tall: true },
          { img: img.saladFigma, caption: 'Desain UI di Figma' },
          { img: img.saladMenu, caption: 'Website — Minuman & Desserts' },
          { img: img.saladAbout, caption: 'Website — Sejarah Salad Mertua' },
        ],
      },
    },
    {
      id: 'riset',
      size: 'narrow',
      kicker: 'Riset · Jurnal JINITA (SINTA 2)',
      title: 'Prediksi Waktu Tanam Padi SARIMA-MFEP',
      summary: 'Tugas akhir yang terbit di jurnal nasional terakreditasi SINTA 2.',
      chips: ['Python', 'SARIMA', 'MFEP'],
      modal: {
        kicker: 'Riset · JINITA (SINTA 2) · 2026',
        title: 'Rice Planting Time Prediction Using SARIMA-MFEP Integration in Kubu Raya',
        description: 'Mengintegrasikan peramalan iklim SARIMA (curah hujan, suhu, kelembapan) dengan evaluasi multi-kriteria MFEP untuk merekomendasikan waktu tanam padi bagi petani di Kubu Raya.',
        points: [
          'MAPE di bawah 2% untuk prediksi suhu dan kelembapan',
          'Menangkap 68% variabilitas curah hujan musiman',
          'Oktober teridentifikasi sebagai bulan tanam paling optimal',
        ],
        gallery: [{ img: img.jurnal, caption: 'Halaman pertama artikel JINITA' }],
        meta: 'Sinta Rama Dani, Syarifah Putri Agustini Alkadri, Sucipto · JINITA vol. 8 no. 1, hlm. 263–276, Juni 2026',
        link: { href: 'https://ejournal.pnc.ac.id/index.php/jinita', label: 'Buka Jurnal JINITA' },
      },
    },
    {
      id: 'kku',
      size: 'wide',
      kicker: 'Konten & Video · 2025',
      title: 'Kampanye Konten & After Movie KKU 2025',
      summary: 'Strategi konten Instagram & TikTok, desain brosur, dan produksi video after movie — klik ▶ untuk menonton.',
      chips: ['CapCut', 'Canva', 'Photoshop', 'Social Media'],
      modal: {
        kicker: 'Konten & Video · 2025',
        title: 'Kampanye Konten & After Movie KKU 2025',
        description: 'Sebagai anggota Divisi Pubdekdok KKU 2025 di Desa Punggur Kecil, mengelola publikasi kegiatan dari perencanaan hingga produksi.',
        points: ['Instagram: 162 pengikut', 'TikTok: 169 pengikut & 1.541 suka', 'Desain brosur, editing foto, dan video after movie di YouTube'],
        link: { href: youtube.url, label: '▶ Tonton After Movie' },
        youtubeId: youtube.id,
      },
    },
  ] satisfies Project[],
}

export interface SkillGroup {
  icon: string
  bg: string
  title: string
  items: string[]
}

export const skills = {
  eyebrow: 'Keahlian',
  title: ['Perpaduan ', 'kreatif', ' & teknis.'] as const,
  core: ['Toolkit', 'Sinta'],
  orbitInner: ['Canva', 'Figma', 'CapCut', 'Photoshop', 'Excel'],
  orbitOuter: ['HTML', 'CSS', 'JavaScript', 'Python', 'MySQL', 'Humas', 'Konten', 'Google Sheets'],
  groups: [
    { icon: '💬', bg: '#ffe8ef', title: 'Komunikasi & Relasi', items: ['Korespondensi resmi', 'Koordinasi kegiatan', 'Kerja sama internal & eksternal'] },
    { icon: '📱', bg: '#efe6ff', title: 'Media Sosial & Konten', items: ['Pengelolaan akun', 'Perencanaan konten', 'Pembuatan konten', 'Dokumentasi kegiatan'] },
    { icon: '🎨', bg: '#ffeadf', title: 'Desain & Editing', items: ['Canva', 'CapCut', 'Adobe Photoshop', 'Figma', 'Editing foto & video', 'Desain brosur'] },
    { icon: '💻', bg: '#e4f7ef', title: 'Administrasi & Teknis', items: ['Excel', 'Word', 'PowerPoint', 'Google Docs & Sheets', 'HTML', 'CSS', 'JavaScript', 'Python', 'MySQL'] },
    { icon: '🌏', bg: '#fff3d9', title: 'Bahasa', items: ['Indonesia — aktif', 'Inggris — terus berkembang'] },
  ] satisfies SkillGroup[],
}

export interface Cert {
  icon: string
  title: string
  detail: string
  /** bila diisi, kartu bisa diklik dan membuka gambar di lightbox */
  lightbox?: { img: Img; caption: string }
}

export const education = {
  eyebrow: 'Pendidikan & Pencapaian',
  title: ['Belajar tanpa ', 'henti', '.'] as const,
  card: {
    badge: '✦ Cum Laude',
    school: 'Universitas Muhammadiyah Pontianak',
    program: 'S1 Teknik Informatika · Sep 2022 – Apr 2026',
    gpa: 3.98,
    gpaText: '3,98',
    gpaMax: '/ 4,00 IPK',
    thesisLabel: 'Tugas Akhir',
    thesis: 'Rice Planting Time Prediction Using SARIMA-MFEP Integration in Kubu Raya',
  },
  certs: [
    { icon: '📄', title: 'Publikasi Jurnal JINITA (SINTA 2)', detail: '2026 · Rice Planting Time Prediction Using SARIMA-MFEP' },
    {
      icon: '🏅',
      title: 'Sertifikat HKI — Arsipin (Sistem Arsip Surat)',
      detail: 'Januari 2026 · No. Pencatatan 001091892',
      lightbox: { img: img.hki, caption: 'Surat Pencatatan Ciptaan — Arsipin · No. 001091892' },
    },
    { icon: '🏛️', title: 'Sertifikat Magang — Dinas Ketahanan Pangan Kalbar', detail: 'Januari 2026' },
    { icon: '📊', title: 'Dicoding & Microsoft: Penerapan Data Science dengan Microsoft Fabric', detail: 'Agustus 2026' },
  ] satisfies Cert[],
}

export interface ContactItem {
  icon: string
  label: string
  href: string
  copy: string
  ariaLabel: string
  external?: boolean
}

export const contact = {
  eyebrow: 'Kontak',
  title: ['Mari bangun ', 'sesuatu yang indah', ' bersama.'] as const,
  lead: 'Terbuka untuk peluang di bidang humas, kemitraan, administrasi, konten kreatif, maupun pengembangan web.',
  items: [
    { icon: '✉️', label: 'sintarmadaniii@gmail.com', href: 'mailto:sintarmadaniii@gmail.com', copy: 'sintarmadaniii@gmail.com', ariaLabel: 'Kirim email ke Sinta' },
    { icon: '📞', label: '0857-5171-8947', href: 'tel:+6285751718947', copy: '085751718947', ariaLabel: 'Telepon Sinta' },
    { icon: 'in', label: 'LinkedIn', href: 'https://linkedin.com/in/sinta-ramadani-266ab9368', copy: 'linkedin.com/in/sinta-ramadani-266ab9368', ariaLabel: 'Buka profil LinkedIn Sinta', external: true },
  ] satisfies ContactItem[],
  copyLabel: 'Salin',
  toast: 'Tersalin ✦',
}

export const footer = { text: '© 2026 Sinta Rama Dani · Dibuat dengan ✦ dan secangkir teh' }
