# 🔐 Password Generator + Secure Vault (MVP)

A privacy-first password manager built with *Next.js + TypeScript + MongoDB*.  
Includes client-side encryption so no plaintext passwords are ever sent to the server.

---

## 🚀 Live Demo
👉 [Live App](https://password-vault-assignment.netlify.app/)

---
##create .env.local file

MONGODB_URI=your_connection_string
NEXTAUTH_SECRET=any-random-secret
CRYPTO_KEY=client-side-key

## 🧠 Features
- Strong password generator (length slider + symbol/number toggles)
- Client-side encryption for vault items (AES or crypto-js)
- Simple authentication (email + password)
- Vault CRUD (create, view, edit, delete)
- Copy-to-clipboard with auto-clear after 10–20s
- Search / filter for saved items

---

## 🧩 Tech Stack
*Frontend:* Next.js + TypeScript + Tailwind CSS  
*Backend:* Next.js API Routes / Node.js  
*Database:* MongoDB (Mongoose)  
*Encryption:* crypto-js (AES encryption)

---

## 🔒 Crypto Note
Used *AES encryption via crypto-js* for client-side vault encryption,  
so passwords are encrypted before sending to server.  
Server never stores plaintext data.

---

## 🧰 How to Run Locally
```bash
git clone https://github.com/your-username/password-vault.git
cd password-vault
npm install
npm run dev
