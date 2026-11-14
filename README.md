# Portofolio Sinta Rama Dani

Website portofolio satu halaman (feminin, modern, 3D) — Vite + React + TypeScript + Tailwind CSS + React Three Fiber + Framer Motion. Hasil build berupa situs statis.

## Menjalankan secara lokal

Butuh Node.js 20 atau lebih baru.

```bash
npm install
npm run dev       # server pengembangan di http://localhost:5173
npm run build     # build produksi ke folder dist/
npm run preview   # pratinjau hasil build di http://localhost:4173
```

## Mengubah konten

**Semua teks dan data ada di satu file: [`src/data/content.ts`](src/data/content.ts).** Profil, statistik, pengalaman, proyek (termasuk isi modal & galeri), keahlian, sertifikat, kontak, dan footer cukup diubah di sana. Tidak perlu menyentuh komponen.

Beberapa catatan:

- Teks pengalaman boleh memakai `**tebal**` dan `_miring_`.
- **Mengganti/menambah gambar:** taruh file `.jpg` baru di `reference/img/`, lalu jalankan `npm run images`. Skrip ini membuat versi WebP + JPG yang sudah dikompres di `public/img/` (plus `og-image.jpg`). Daftarkan nama dan ukurannya di objek `img` pada `content.ts`.
- `hki.jpg` sengaja memakai alamat pencipta yang sudah diburamkan. Jangan diganti dengan versi asli.
- Warna dan font ada di `tailwind.config.ts` dan variabel CSS di `src/index.css`.

## Deploy ke GitHub Pages

Deploy berjalan otomatis lewat GitHub Actions ([`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)) setiap kali ada push ke branch `main`.

### Mengaktifkan Pages (sekali saja)

1. Buka repo di GitHub → **Settings** → **Pages**.
2. Pada **Build and deployment → Source**, pilih **GitHub Actions**.
3. Push ke `main`. Pantau di tab **Actions**; setelah hijau, situs tersedia di `https://<username>.github.io/<nama-repo>/`.

### Base path

Workflow mengisi `VITE_BASE` otomatis dari nama repo (`/nama-repo/`), atau `/` bila repo bernama `<username>.github.io`. Untuk build lokal biasa, `base` adalah `/`.

**Memakai custom domain?** Ubah langkah "Tentukan base path" di `deploy.yml` menjadi `echo "VITE_BASE=/" >> "$GITHUB_ENV"`, lalu atur domain di Settings → Pages.

Untuk mencoba build seperti di Pages secara lokal:

```bash
VITE_BASE=/nama-repo/ npm run build && npm run preview
```

### Setelah URL final diketahui

Tag Open Graph memakai path relatif ke `og-image.jpg`. Agar pratinjau tautan (WhatsApp, LinkedIn, dll.) tampil sempurna, ganti nilai `og:image` dan `twitter:image` di `index.html` dengan URL absolut, misalnya `https://<username>.github.io/<nama-repo>/img/og-image.jpg`.

## Keamanan

Jangan menyimpan token, password, atau file `.env` berisi rahasia di repo. Deploy memakai `GITHUB_TOKEN` bawaan Actions, jadi tidak perlu secret tambahan.

## Struktur

```
src/
  data/content.ts      semua teks & data
  components/          Nav, Hero, HeroScene (R3F), Marquee, About, Experience,
                       Projects, ProjectModal, Lightbox, Skills, Education,
                       Contact, Footer + komponen bersama
  hooks/               useTilt, useDialog (focus trap), useFinePointer
public/img/            gambar (WebP + JPG)
reference/             prototipe asli & gambar sumber
scripts/               optimize-images.mjs
```
