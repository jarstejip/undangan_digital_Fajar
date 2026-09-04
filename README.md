# Undangan Pernikahan Digital Adat Jawa (Wira & Neera)

Website undangan pernikahan digital bertema adat Jawa elegan (*Royal Javanese Dark & Gold*), terinspirasi dari desain eksklusif dengan iringan musik gamelan Jawa, ornamen Wayang Gunungan, serta fitur personalisasi nama tamu undangan dinamis.

---

## 🤵👰 Mempelai
- **Mempelai Pria**: Wira Bagus Setiawan Putra, S.T.
- **Mempelai Wanita**: Neerafadiya Ayunda Syakira, S.Kom.
- **Hari & Tanggal Acara**: Kamis, 10 September 2026
- **Lokasi Acara**: Gedung Graha Lantai 4 - SMK Bhakti Wiyata, Kota Kediri, Jawa Timur

---

## ✨ Fitur Utama
1. **Layar Pembuka (Cover / Amplop Digital)**:
   - Nama kedua mempelai dan ornamen Wayang Gunungan emas.
   - Personalisasi nama tamu otomatis dari URL parameter (`?kpd=` atau `?to=`).
   - Tombol **"Buka Undangan"** dengan animasi transisi halus.
2. **Musik Pengiring Tradisional Jawa**:
   - Audio gamelan Jawa sakral (*Kebogiro*) yang otomatis berputar saat tamu menekan tombol "Buka Undangan".
   - Tombol melayang piringan hitam (*spinning vinyl*) di pojok kanan bawah untuk mengontrol musik (play/pause).
3. **Menu Navigasi Melayang (Floating Bottom Nav)**:
   - Pintasan cepat ke bagian: Beranda, Mempelai, Acara, Kisah, Galeri, RSVP, dan Kado.
4. **Profil Pasangan Mempelai**:
   - Foto adat Jawa dengan busana Beskap dan Kebaya Paes Ageng.
   - Informasi nama orang tua dan akun media sosial.
5. **Kutipan Doa & Hitung Mundur (Countdown Timer)**:
   - QS. Ar-Rum Ayat 21 dalam kaligrafi Arab beserta terjemahannya.
   - Timer *real-time* (Hari, Jam, Menit, Detik) menuju waktu akad nikah.
6. **Rangkaian Acara & Peta Interaktif**:
   - Jadwal Akad Nikah & Resepsi Pernikahan.
   - Tombol petunjuk arah ke Google Maps.
   - Tombol **"Simpan ke Google Calendar"**.
   - Embed Google Maps interaktif.
7. **Kisah Cinta (Our Story) & Susunan Acara**:
   - Perjalanan cinta kedua mempelai.
   - Rundown waktu kegiatan prosesi adat pernikahan.
8. **Galeri Prewedding & Video Sinematik**:
   - Grid foto prewedding dengan fitur pembesar gambar layar penuh (*Lightbox Popup*).
   - Embed video teaser prewedding.
9. **Buku Tamu / RSVP Interaktif**:
   - Formulir konfirmasi kehadiran dan pengiriman ucapan doa restu.
   - Komentar tersimpan di penyimpanan browser (`localStorage`) dan langsung tampil secara *real-time*.
10. **Amplop Digital & Kado Fisik**:
    - Rekening Bank BCA & Bank Mandiri dengan tombol **1-Klik Salin Nomor Rekening** disertai notifikasi *toast*.
    - Alamat pengiriman kado fisik dengan tombol **1-Klik Salin Alamat**.

---

## 💌 Cara Personalisasi Nama Tamu untuk Disebarkan

Anda dapat menambahkan parameter `?kpd=` di akhir URL website Anda saat mengirim undangan ke WhatsApp atau media sosial. 

Contoh:
- `https://nama-project-anda.vercel.app/?kpd=Bapak%20Budi`
- `https://nama-project-anda.vercel.app/?kpd=Ibu%20Siti%20Rahayu`
- `https://nama-project-anda.vercel.app/?kpd=Keluarga%20Besar%20Sasongko`
- `https://nama-project-anda.vercel.app/?kpd=Sahabat%20Alumni%20UGM`

Jika dibuka tanpa parameter, nama tamu akan otomatis menampilkan *"Bapak / Ibu / Saudara / i"*.

---

## 🚀 Panduan Deploy ke GitHub & Vercel

### 1. Inisialisasi Git & Push ke GitHub

Buka terminal / PowerShell di folder proyek ini (`c:\undangan_digital-Fajar`):

```bash
# 1. Inisialisasi repository Git
git init

# 2. Tambahkan semua file ke staging
git add .

# 3. Buat commit pertama
git commit -m "feat: inisialisasi undangan pernikahan digital wira & neera tema jawa"

# 4. Ganti branch ke main
git branch -M main

# 5. Hubungkan ke repository GitHub Anda (ganti URL dengan repo Anda)
git remote add origin https://github.com/USERNAME-ANDA/NAMA-REPO-ANDA.git

# 6. Push ke GitHub
git push -u origin main
```

### 2. Deploy ke Vercel

1. Buka [https://vercel.com](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Pilih repository GitHub yang baru saja Anda push.
4. Pada bagian **Framework Preset**, biarkan sebagai **"Other"** (karena ini adalah situs statis HTML/CSS/JS murni).
5. Pada **Root Directory**, biarkan default `./`.
6. Klik **"Deploy"**.
7. Dalam hitungan detik, undangan pernikahan Anda sudah online di domain gratis `https://nama-project-anda.vercel.app` dan siap dibagikan!

---

## 📂 Struktur File

```
undangan_digital-Fajar/
│── index.html              # Halaman utama aplikasi undangan
│── vercel.json             # Konfigurasi caching & routing Vercel
│── .gitignore              # Daftar file yang diabaikan Git
│── README.md               # Dokumentasi proyek
│── css/
│   ├── style.css           # Desain visual tema Jawa, warna, typography & layout
│   └── animations.css      # Animasi (vinyl rotation, float, pulse, slide)
│── js/
│   └── app.js              # Logika audio, URL parser, countdown, RSVP & lightbox
└── assets/
    ├── audio/
    │   └── gamelan-wedding.mp3  # Audio instrumen gamelan Jawa
    └── images/
        ├── gunungan.svg         # Vektor Gunungan Wayang emas
        ├── ornament-divider.svg # Vektor pembatas hiasan khas Jawa
        ├── batik-pattern.svg    # Pola batik Kawung
        ├── groom.jpg            # Foto mempelai pria (Wira)
        ├── bride.jpg            # Foto mempelai wanita (Neera)
        ├── couple_cover.jpg     # Foto pasangan mempelai
        ├── gallery1.jpg         # Foto prewedding 1
        └── gallery2.jpg         # Foto prewedding 2
```
