# 🌐 Library Management System

A complete **MERN (MongoDB, Express, React, Node.js)** stack application setup
guide.  
This project includes a backend API built with **Node.js + Express + MongoDB**,
and a frontend built with **React**, connected via REST APIs.


## 📁 Folder Structure

```bash
Library-Management/
│
├── server/ # Node.js + Express + MongoDB API
│ ├── src/
│ │ ├── config/ # DB and environment configuration
│ │ ├── controllers/ # API logic
│ │ ├── models/ # Mongoose models
│ │ ├── routes/ # API routes
│ │ ├── middlewares/ # Auth, validation, etc.
│ │ ├── utils/ # Helper functions
│ │ └── server.js # Entry point
│ ├── .env # Environment variables
│ ├── package.json
│ └── README.md
│
├── clinet/ # React Frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page-level components
│ │ ├── app/auth/routes # component route
│ │ ├── services/ # API calls using axios/fetch
│ │ ├── App.js
│ │ └── main.js
│ ├── .env
│ ├── package.json
│ └── README.md
│
├── .gitignore
└── README.md
```

## ⚙️ Prerequisites

Ensure you have the following installed:

- [Node.js (>= 18.x)](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [Git](https://git-scm.com/)
- (Optional) [VS Code](https://code.visualstudio.com/)

---

## 🚀 Installation Steps

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/connectavani/EC2_Instance_Dashboard.git
cd Library Management
```

# 2️⃣ Setup Backend (Express + MongoDB)

```bash
cd server
npm install
```

## Create a .env file in the backend folder

    PORT=5000
    MONGO_URI=mongodb://localhost:27017/library-management

# Run the backend

```bash
npm run dev
```

Backend runs at http://localhost:5000

# 3️⃣ Setup Frontend (React)

```bash
cd ../client
npm install
```

## Run the frontend

```bash
npm run dev
```

Frontend runs at http://localhost:3000