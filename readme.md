## Simple App Chat

Simple App Chat adalah aplikasi chatting sederhana yang memungkinkan pengguna untuk berkomunikasi secara real-time melalui pesan teks. Aplikasi ini menggunakan teknologi WebSocket untuk mengirim dan menerima pesan secara langsung tanpa perlu me-refresh halaman.

### Teknologi yang Digunakan

- **Frontend**:
  - React
  - Chakra UI

- **Backend**:
  - Express
  - MongoDB

### Fitur Utama


2. **Login**: Pengguna yang sudah memiliki akun dapat masuk ke dalam aplikasi dengan menggunakan kredensial yang sudah didaftarkan sebelumnya.

3. **Buat Chat Baru**: Pengguna dapat membuat chat baru dengan pengguna lain yang sudah terdaftar di aplikasi. Pengguna hanya perlu mencari nama pengguna pengguna lain dan memulai percakapan baru.

4. **Kirim Pesan**: Fitur utama dari aplikasi ini adalah pengguna dapat mengirim pesan teks kepada pengguna lain dalam chat yang sudah dibuat. Pesan akan langsung diterima oleh penerima tanpa perlu me-refresh halaman.

## Struktur Folder
```
frontend-simple-app-chat
 ┣ public
 ┃ ┗ vite.svg
 ┣ src
 ┃ ┣ assets
 ┃ ┃ ┗ react.svg
 ┃ ┣ pages
 ┃ ┃ ┣ Chat.jsx
 ┃ ┃ ┣ Error.jsx
 ┃ ┃ ┣ Login.jsx
 ┃ ┃ ┗ Register.jsx
 ┃ ┣ partials
 ┃ ┃ ┣ ChatDetail.jsx
 ┃ ┃ ┣ ListChat.jsx
 ┃ ┃ ┗ StartChat.jsx
 ┃ ┣ index.css
 ┃ ┗ main.jsx
 ┣ .eslintrc.cjs
 ┣ .gitignore
 ┣ README.md
 ┣ index.html
 ┣ package.json
 ┣ pnpm-lock.yaml
 ┗ vite.config.js

 backend-simple-app-chat
 ┣ controller
 ┃ ┣ auth
 ┃ ┃ ┗ index.js
 ┃ ┣ chat
 ┃ ┃ ┗ index.js
 ┃ ┗ message
 ┃ ┃ ┗ index.js
 ┣ middleware
 ┃ ┣ validator
 ┃ ┃ ┗ auth.js
 ┃ ┗ auth.js
 ┣ model
 ┃ ┣ Chat.js
 ┃ ┣ Message.js
 ┃ ┣ User.js
 ┃ ┗ index.js
 ┣ route
 ┃ ┣ auth
 ┃ ┃ ┗ index.js
 ┃ ┣ chat
 ┃ ┃ ┗ index.js
 ┃ ┗ message
 ┃ ┃ ┗ index.js
 ┣ utils
 ┃ ┗ auth.js
 ┣ .env
 ┣ app.js
 ┣ package.json
 ┗ pnpm-lock.yaml
```