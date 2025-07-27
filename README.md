# 🛒 Online Auction System - MERN Stack Web App

An **Online Auction System** built with the **MERN stack (MongoDB, Express, React, Node.js)** that allows users to create auctions, upload images, and bid on products in real-time (WebSocket feature and Admin Dashboard coming soon).

> 🎓 **Major project / Minor project** for Computer Science Engineering – built by **Avnish Kumar** for full-stack learning and portfolio development.

This system supports secure login via **httpOnly cookies**, tracks device & location on login, and is structured with clean code using modern tools like **Redux Toolkit**, **React Router v7**, and **Cloudinary**.

## Live Preview 🌐 [Visit Website](https://auction.ihavetech.com)
![image](https://github.com/user-attachments/assets/719ec319-d1d3-4e17-9b0b-ae5db8cfd6b4)

---

## 📦 Tech Stack

### 🔹 Frontend

* React 19 (Vite + JSX)
* Tailwind CSS
* React Router v7+
* Axios
* TanStack Query (React Query)
* Redux Toolkit (for global state)

### 🔸 Backend

* Node.js + Express.js
* MongoDB + Mongoose
* Multer (image upload)
* JWT Authentication (with `httpOnly` cookies)
* Cloudinary (image hosting)
* Device, Browser, IP, and Geo-location logging

---

## 📁 Folder Structure

```
online-auction-system/
├── client/        # React frontend
└── server/        # Express backend
```

---

## ⚙️ Environment Variables

### 🔐 Backend `.env`

```env
PORT=3000
ORIGIN=http://localhost:5173
MONGO_URL=<your-mongodb-url>
JWT_SECRET=<your-jwt-secret>
JWT_EXPIRES_IN=1d
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<cloud-key>
CLOUDINARY_API_SECRET=<cloud-secret>
CLOUDINARY_URL=<cloudinary-url>
RESEND_API_KEY=<resend-api-key>
```

### 🌐 Frontend `.env`

```env
VITE_API=http://localhost:3000
VITE_AUCTION_API=http://localhost:3000/auction
```

---

## 🚀 Getting Started

### 📥 1. Clone the Repository

```bash
git clone https://github.com/theavnishkumar/online-auction-system.git
cd online-auction-system
```

### 🛠️ 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env  # or manually create .env
npm run dev
```

### 🌐 3. Setup Frontend

```bash
cd ../client
npm install
cp .env.example .env  # or manually create .env
npm run dev
```

---

## 🔐 Authentication (via `httpOnly` Secure Cookies)

* Tokens stored in `httpOnly` cookies (not accessible from JS)
* Auth is auto-validated on refresh via `/user` route
* State managed via Redux Toolkit + cookies

### 🔐 Auth Routes (`/auth`)

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| POST   | `/auth/login`  | Login user (sets cookie) |
| POST   | `/auth/signup` | Register new user        |
| POST   | `/auth/logout` | Logout user              |

### 👤 Auto Login Route

| Method | Endpoint | Description                        |
| ------ | -------- | ---------------------------------- |
| GET    | `/user`  | Auto-login if valid cookie present |

---

## 🛒 Auction Routes (`/auction`)

| Method | Endpoint         | Description                            |
| ------ | ---------------- | -------------------------------------- |
| GET    | `/auction/stats` | Dashboard stats (active, total, user)  |
| GET    | `/auction/`      | Get all auction items                  |
| POST   | `/auction/`      | Create new auction (with image upload) |
| GET    | `/auction/:id`   | Get single auction item by ID          |
| POST   | `/auction/:id`   | Place a bid on auction item            |

---

## 🔍 Key Features

* ✅ Auth with cookies and Redux
* ✅ Auction creation with image upload
* ✅ Auto-login from stored cookie
* ✅ Tracks logged-in user auction data
* ✅ Login logs (IP, country, state, device, browser)
* ✅ Multer + Cloudinary integration
* ✅ Proper routing using React Router v7 (framework-based)

---

## 🔒 Login Security Logging

* IP Address
* Country and State (via GeoIP)
* Device Type
* Browser Type/Version
* Used to detect abnormal behavior and prevent abuse

---

## 🧠 State Management

* **Redux Toolkit** used for global auth state
* Combined with **TanStack Query** for caching API responses
* Ensures smooth sync between client and backend

---

## 🛠️ Upcoming Features

* ✅ Proper error handling & status responses
* ✅ Prevents spam login attempts or abuse
* 🔄 WebSocket for real-time bidding & updates
* ✅ Admin Dashboard for managing users

---

## 👨‍💻 Contribution Guide

1. Fork the repository
2. Create a branch: `git checkout -b feature-branch`
3. Make your changes
4. Commit and push: `git commit -m "Add feature"`
5. Open a Pull Request (PR)

---

## 🧾 License

This project is licensed under the **[MIT](LICENSE)**.

---

## 👨‍🎓 Author

Developed by [Avnish Kumar](https://github.com/theavnishkumar). Built for educational, security-focused, and full-stack learning purposes.
