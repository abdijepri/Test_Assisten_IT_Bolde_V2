# Frontend Setup Guide
Panduan untuk menjalankan frontend aplikasi!  
## **1. Struktur Folder**
```bash
cd frontend
```
    root-folder/
    ├── public/                 # File statis publik (favicon, index.html)
    ├── src/                        # Kode utama aplikasi
    │   └── components/             # Komponen-komponen UI
    │   │   ├── dashboard.js
    │   │   ├── login.js
    │   │   ├── navbar.js
    │   │   ├── register.js
    │   │   └── update.js
    │   ├── App.js                    # Root component
    │   ├── index.js                  # Entry point aplikasi    
    └── README.md
    
## **2. Install Dependencies**
Pastikan Anda sudah menginstal npm.
Setelah itu, jalankan perintah berikut untuk menginstal semua package yang dibutuhkan:
```bash
npm install
```
## **3. Jalankan Server**
Jalankan Server
```bash
npm start
```
Server akan berjalan di http://localhost:3000

## **4. Selesai**
Sekarang frontend sudah siap untuk digunakan!
