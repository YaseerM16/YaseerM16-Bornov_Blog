# 📝 MERN Stack Post App

A full-stack post management app built using **MongoDB**, **Express.js**, **React (Vite)**, and **Node.js** with secure **JWT Authentication (via Cookies)** and elegant **SweetAlert2** modals. Users can register, log in, create, edit, delete, and view posts.

---

## 🔧 Tech Stack

### 🌐 Frontend:
- React (Vite)
- Axios
- React Router
- Tailwind CSS
- SweetAlert2
- js-cookie

### 🌍 Backend:
- Node.js + Express
- MongoDB + Mongoose
- bcryptjs
- jsonwebtoken
- cookie-parser
- dotenv
- cors

---

## ⚙️ Features

- 🔐 JWT Auth with HTTP-only cookies
- ✍️ Create / Read / Update / Delete Posts
- 🧾 Post contains title, content, and timestamps
- 🚫 Protected routes
- 🎨 Stylish UI with Tailwind and SweetAlert
- 💬 Client-side validation and feedback

---

##  Getting Started

 1️⃣ Clone & Install
 git clone [https://github.com/your-username/mern-post-app.git](https://github.com/YaseerM16/YaseerM16-Bornov_Blog.git)
 
```bash

2️⃣ Backend Setup

cd backend
npm install

Create .env file:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/postapp
JWT_SECRET=your_jwt_secret

Start the server:
npm start
# Runs with nodemon

3️⃣ Frontend Setup

cd frontend
npm install

Create .env file:

VITE_BACKEND_URL=http://localhost:5000

npm run dev

