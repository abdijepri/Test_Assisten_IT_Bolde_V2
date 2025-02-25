# Application Setup Guide
## **Clone Repository**
```bash
git clone https://github.com/abdijepri/Test_Assisten_IT_Bolde_V2.git
```

# Backend Setup Guide
Panduan untuk menjalankan backend aplikasi!  
## **1. Struktur Folder**
```bash
cd backend
```
    root-folder/
    ├── config/
    │   └── db.js               # Konfigurasi koneksi database
    ├── controller/
    │   ├── usersController.js  # Logika CRUD untuk User
    │   └── refreshToken.js     # Handler untuk token refresh
    ├── middleware/
    │   └── authMiddleware.js   # Middleware untuk autentikasi
    ├── models/
    │   └── userModel.js        # Model User
    ├── routes/
    │   └── userRoutes.js       # Rute API User
    ├── .env                   # File konfigurasi
    ├── .gitignore             # File untuk mengabaikan file tertentu saat push
    ├── package.json           # Daftar dependensi proyek
    ├── package-lock.json      # File penguncian versi paket
    └── server.js              # File utama untuk menjalankan server
    └── README.md
    
## **2. Install Dependencies**

Pastikan Anda sudah menginstal **Node.js**. Kalau belum, bisa download di sini: [Node.js](https://nodejs.org/)
Setelah itu, jalankan perintah berikut untuk menginstal semua package yang dibutuhkan:
```bash
npm install
```


## **3. Konfigurasi Environment (.env)**
Buat file baru dengan nama .env di root folder, lalu masukkan konfigurasi berikut:
```bash
ACCESS_TOKEN_SECRET=youraccesstokensecret
REFRESH_TOKEN_SECRET=yourrefreshtokensecret
```
Ubah ACCESS_TOKEN_SECRET dan REFRESH_TOKEN_SECRET menjadi string acak.
Bisa pakai Random Key Generator.

## **4. Setup Database (.env)**
Pastikan MySQL sudah terinstal dan berjalan! Buat database sesuai yang ada di konfigurasi:
```bash
CREATE DATABASE auth_db_Bolde;
```
Jika ingin otomatis generate tabel, bisa jalankan perintah ini di file index.js:
```
Users.sync();
```
Lalu jalankan server, dan tabel akan dibuat otomatis!
Hapus/ubah jadi komentar setelahnya agar tidak mengeksekusi secara terus-menerus

## **5. Jalankan Server**
Install Nodemon
```bash
npm install -g nodemon # or using yarn: yarn global add nodemon
```
Jalankan Server
```bash
nodemon index
```
Server akan berjalan di http://localhost:5000

## **6. API Endpoint**

| **Method** | **Endpoint** | **Deskripsi**                |
|------------|--------------|------------------------------|
| **Post**   | /users       | Registrasi user baru         |
| **Post**   | /login       | Login & dapatkan token JWT   |
| **Get**    | /users       | Dapatkan semua data User     |
| **Get**    | /users/:id   | Dapatkan User by ID          |
| **Patch**  | /users/:id   | Update data User             |
| **Delete** | /logout      | Logout & hapus refresh token |
| **Get**    | /token       | Dapatkan access token baru   |

Untuk menguji API, bisa menggunakan Postman atau RestClient

## **7. Testing**
Contoh lengkap bisa diakses di file request.rest  
Register User: Kirim POST ke /users dengan body:
```bash
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "confPassword": "123456"
}
```
Login User: Kirim POST ke /login dengan body:
```bash
{
  "email": "john@example.com",
  "password": "123456"
}
```
Gunakan Access Token:
Setelah login, copy accessToken dari response.
Di Postman, tambahkan header Authorization:
```bash
Authorization: Bearer <accessToken>
```
Refresh Token: Kalau token expired, bisa refresh di /token.  
Logout: Panggil DELETE ke /logout untuk menghapus refresh token.

## **8. Selesai**
Sekarang backend sudah berjalan dan bisa diakses!  
Jika ada kendala atau error, pastikan semua konfigurasi sudah benar, terutama koneksi database dan variabel environment.  