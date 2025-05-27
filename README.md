# 🎬 BoomApp

BoomApp is a full-stack video sharing platform where users can upload, purchase, and view both short and long-form videos. This project was created as part of a coding assignment for a position at Boom Entertainment.

---

## 🚀 Features

- 🔐 Authentication and Authorization (JWT-based)
- 🧑‍💼 User profile with wallet balance
- 📹 Upload short videos (stored on backend)
- 🔗 Upload long videos via YouTube link
- 🛒 Wallet-based video purchase system
- 🧠 Role-based access to paid videos
- 🧧 Gifting system with custom tiers (gold, platinum, etc.)
- 💬 Comment system (basic placeholder for now)
- 🌙 Fully responsive design with light/dark theme
- ⚙️ Backend with Express + MongoDB | Frontend with React + Redux + TailwindCSS

---

## 🧱 Tech Stack

| Category     | Technology                  |
|--------------|------------------------------|
| Frontend     | React, Vite, Redux Toolkit, TailwindCSS, ShadCN UI |
| Backend      | Node.js, Express.js          |
| Database     | MongoDB (Mongoose)           |
| Auth         | JWT                          |
| File Upload  | Multer                       |

---

## 🖥️ Folder Structure

/boomApp
 ├── api/ # Backend (Node/Express)
 │ ├── controllers/
 │ ├── routes/
 │ ├── utils/
 │ ├── uploads/ # Stored short videos
 │ └── index.js # Entry point
 ├── client/ # Frontend (React + Vite)
 │ ├── src/
 │ ├── public/
 │ └── vite.config.js
 └── README.md

 
---

## 🔧 Getting Started


Clone the repo
git clone https://github.com/ajmalksaleem/boomApp.git

Navigate to project folder
cd boomApp

Install dependencies for backend
npm install

Install dependencies for frontend
cd client
npm install

Start backend server
cd ..
npm run dev

In a new terminal window, start frontend server
cd client
npm run dev

##.env_variable
PORT = 5000
MONGO_URL = 'mongodb+srv://ajmalksaleem:EF654FpgDn9rhDVn@cluster0.j98kfpl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
JWT_SECRETKEY = '9995310787'


✍️ Author
Name: Ajmal K. Saleem
GitHub: @ajmalksaleem
