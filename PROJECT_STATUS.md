# Project Status & Handoff Reference

## 1. Tujuan Projek
Portofolio web personal software developer untuk **Fauzya Shubhi Nalendrasidi**.
- **Konsep Desain**: 80% Japanese Editorial + 20% Typography.
- **Tech Stack**: Next.js 14 (App Router), TypeScript (Strict), Tailwind CSS v3, Framer Motion 11.
- **DNA Desain**: Tekstur kertas koran/buku tua Jepang (`#F2EDE3`), tinta arang (`#141210`), aksen merah stempel vermillion (`#C1341A`), watermark kanji raksasa, tipografi vertikal (*tate-chō*), dan interaksi fisik presisi.

---

## 2. Yang Telah Dikerjakan
- **Scaffolding & Core System**:
  - Next.js 14 App Router + Tailwind v3 tokens (`paper`, `ink`, `red`, `ghost`).
  - Font: `Shippori Mincho` (serif display/body) + `Space Grotesk` (sans metadata) via `next/font/google`.
  - Global CSS reset dengan `scrollbar-gutter: stable` (cegah layout shift).
  - Cursor kustom: `DifferenceCursor.tsx` (`mix-blend-mode: difference`, 14px ke 56px spring expand, non-aktif di layar sentuh).
  - Build script memory fix di `package.json` (`node --max-old-space-size=4096`).
- **Hero Section**:
  - Nama tipografis besar stacked per line dengan slide-up reveal.
  - Komponen `HeroJapaneseAccent.tsx`:
    - Kolom vertikal tate-chō: `SYSTEM & INTEGRATION` dan `PRECISE ARCHITECTURE · DATA-DRIVEN`.
    - Watermark kanji besar: `構` (*Kō* / Structure).
    - Cap stempel merah Hanko: `蓮印` (*Nalendra Seal*).
    - Koordinat geografis Karawang: `6°20'23.7"S 107°18'28.1"E`.
    - 3 Live Clock:
      1. Karawang GMT+7 (`Asia/Jakarta`, basis pengembang dengan pulsing red dot).
      2. London GMT/BST (`Europe/London`, global hub).
      3. Dynamic Country Clock: otomatis mendeteksi negara & zona waktu pengunjung via `api.country.is` dan fallback IANA timezone (misal `USA EDT`, `Netherlands CEST`, `Indonesia GMT+7`).
    - Full responsif di mobile (`sm`, `md`, `lg`).
- **About Section (01)**:
  - Thesis pull-quote (*"Code is the medium. Clarity is the craft."*).
  - 3 paragraf bio terstruktur.
  - 4 grid statistik: `3.74` GPA, `3+` Core systems built, `50+` Students mentored, `5+` Industry certs.
- **Works Section (02)**:
  - Layout inline split-screen horizontal drawer: saat proyek diklik, panel `ProjectDrawer` melebar `45vw` di kanan, list proyek di kiri menyusut secara fleksibel (`flex-1 min-w-0`). Tidak menutupi seluruh halaman.
  - Bebas bug scrollbar jump dan tanpa backdrop yang menabrak navigasi atas. Navigasi otomatis beralih dari `mix-blend-multiply` ke `bg-paper/90 backdrop-blur-sm border-b border-ghost` saat drawer terbuka.
  - Drawer memiliki header top-bar tetap (`sticky top-0 bg-paper z-20`) dan area body scroll terisolasi sehingga judul proyek tidak pernah tumpang tindih dengan tombol Close.
  - `ProjectCarousel.tsx`: Free scroll carousel dengan inersia momentum elastis ala motion.dev (`drag="x"`, `dragConstraints`, kursor grab/grabbing, fallback blueprint diagram).
  - Typewriter effect dinamis berkecepatan tinggi (`4ms/karakter`) dengan perataan delay berantai antar paragraf.
- **Skills Section (03)**:
  - Format majalah editorial spread (`01`–`06`).
  - Index nomor berubah merah saat hover, garis hairline merah menganimasi `scaleX` saat scroll, pembatas middot `·`.
- **Experience Section (04)**:
  - Timeline vertikal dengan node titik merah dan tahun serif besar.
- **Contact Section (05)**:
  - Statement tipografis besar + link sosial (Email, GitHub, LinkedIn, Portfolio).
- **Data Layer (`src/lib/data.ts`)**:
  - Semua copy dan data resume nyata milik Fauzya Shubhi Nalendrasidi (proyek Akfaza, AdaKami, Autonomous Gas Plume Tracking).

---

## 3. Peraturan & Hal yang TIDAK BOLEH Diubah (Invariants)
1. **Dilarang ganti ke Pages Router**: Tetap gunakan Next.js App Router (`src/app/`).
2. **Dilarang upgrade ke Tailwind CSS v4**: Tetap gunakan Tailwind v3 dengan konfigurasi token kustom di `tailwind.config.ts`.
3. **Dilarang install UI Component Library instan**: Tidak memakai shadcn/ui, MUI, Chakra, AntD. Semua komponen wajib hand-rolled/kustom untuk menjaga kemurnian grid editorial Jepang.
4. **Skema Warna Wajib Terkunci**:
   - Background: `--paper` / `#F2EDE3`
   - Teks Utama / Border: `--ink` / `#141210`
   - Aksen Utama: `--red` / `#C1341A`
   - Secondary / Watermark: `--ghost` / `#D9D3C6`
5. **Konstruksi Drawer Proyek**:
   - Jangan pernah mengembalikan `ProjectDrawer` menjadi fixed modal overlay dengan `overflow: hidden` pada `document.body` (akan memicu layout shift horizontal 15px dan bug stacking nav).
   - Pertahankan struktur inline flex split di `Works.tsx`.
6. **Kerapian Data**:
   - Seluruh konten teks tidak boleh di-hardcode di dalam komponen UI; simpan di `src/lib/data.ts`.
7. **Build Memory Allocation**:
   - Pertahankan flag `node --max-old-space-size=4096` pada script `"build"` di `package.json` untuk mencegah OOM error saat kompilasi static pages di Windows.

---

## 4. Status Pekerjaan Saat Ini (In Progress)
- **Tugas**: Menambahkan widget **Chess Activity Heatmap** (ala GitHub contributions tetapi untuk game catur Chess.com) di sisi kanan Contact Section.
- **Username Target**: `FauzySn` (Chess.com).
- **Spesifikasi Terpilih**:
  - Rentang waktu: 1 tahun terakhir (52 minggu × 7 hari).
  - Skema warna heatmap: **Gold / Amber** (`bg-ghost/30` $\rightarrow$ `bg-amber-200` $\rightarrow$ `bg-amber-400` $\rightarrow$ `bg-amber-600`).
  - Statistik header: Total games, Rating saat ini, Win rate (%), Best rating.
  - Letak: Sisi kanan section Contact (sejajar dengan headline dan link kontak).
- **Progres Teknis**:
  - `src/app/api/chess/route.ts` **sudah dibuat**: Route handler proxy yang mengambil data profil, stats rating, dan arsip game bulanan dari endpoint publik Chess.com dengan caching 1 jam (`revalidate: 3600`).
  - **Langkah berikutnya untuk chat baru**:
    1. Buat komponen `src/components/ChessHeatmap.tsx`.
    2. Modifikasi `src/components/Contact.tsx` menjadi 2 kolom (kiri: teks kontak, kanan: ChessHeatmap).
    3. Verifikasi dengan `npx tsc --noEmit`, `npm run lint`, dan `npm run build`.
