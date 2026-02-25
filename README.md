<div align="center">

# Online Auction System

### A full-stack real-time auction platform built with the MERN stack

[![Live Demo](https://img.shields.io/badge/Live-auction.ihavetech.com-indigo?style=for-the-badge&logo=googlechrome&logoColor=white)](https://auction.ihavetech.com)

![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)
![License](https://img.shields.io/github/license/theavnishkumar/online-auction-system?style=flat-square)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-blue?style=flat-square)
![Issues](https://img.shields.io/github/issues/theavnishkumar/online-auction-system?style=flat-square)
![Forks](https://img.shields.io/github/forks/theavnishkumar/online-auction-system?style=flat-square)
![Stars](https://img.shields.io/github/stars/theavnishkumar/online-auction-system?style=flat-square)
![Last Commit](https://img.shields.io/github/last-commit/theavnishkumar/online-auction-system?style=flat-square)

**Create auctions · Bid in real-time · Manage everything from an admin panel**

[Live Demo](https://auction.ihavetech.com) · [Report Bug](https://github.com/theavnishkumar/online-auction-system/issues) · [Request Feature](https://github.com/theavnishkumar/online-auction-system/issues) · [Backend Docs](./server/README.md) · [Frontend Docs](./client/README.md)

</div>

---

## Screenshots

> Click any image to view full size

<table>
<tr>
<td width="33%" align="center">
<b>Landing Page</b><br><br>
<a href="screenshots/landingpage.png"><img src="screenshots/landingpage.png" alt="Landing Page" /></a>
</td>
<td width="33%" align="center">
<b>User Dashboard</b><br><br>
<a href="screenshots/dashboard.png"><img src="screenshots/dashboard.png" alt="Dashboard" /></a>
</td>
<td width="33%" align="center">
<b>Auction Page</b><br><br>
<a href="screenshots/auctionpage.png"><img src="screenshots/auctionpage.png" alt="Auction Page" /></a>
</td>
</tr>
<tr>
<td width="33%" align="center">
<b>Auction Winner</b><br><br>
<a href="screenshots/auctionwinner.png"><img src="screenshots/auctionwinner.png" alt="Auction Winner" /></a>
</td>
<td width="33%" align="center">
<b>My Bids</b><br><br>
<a href="screenshots/mybids.png"><img src="screenshots/mybids.png" alt="My Bids" /></a>
</td>
<td width="33%" align="center">
<b>Admin Dashboard</b><br><br>
<a href="screenshots/admindashboard.png"><img src="screenshots/admindashboard.png" alt="Admin Dashboard" /></a>
</td>
</tr>
</table>

---

## Why This Project?

Most auction system tutorials stop at basic CRUD. This project goes much further:

- **Real-time bidding** — Socket.io rooms with atomic MongoDB updates prevent race conditions
- **Production security** — httpOnly cookies, JWT auth, XSS-safe email templates, input sanitization
- **Smart UX** — Hover prefetching, View Transitions API, live countdown timers, auto-winner detection
- **Deployment-ready** — CI/CD pipeline, Vercel serverless support, AWS EC2 with PM2, graceful shutdown

> Built as a **Major Project for Computer Science Engineering** by [Avnish Kumar](https://github.com/theavnishkumar), designed to be a real-world reference for full-stack MERN development.

---

## Features

| Category              | Features                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Authentication**    | JWT with httpOnly secure cookies · Auto-login on refresh · Role-based access (User/Admin) · Password change with validation                                                    |
| **Auctions**          | Create with image upload (Cloudinary) · Browse with pagination · Category filtering · Live countdown timers · Auto-winner detection on expiry                                  |
| **Real-time Bidding** | Socket.io room-based architecture · Atomic bid updates (no race conditions) · Live active user count · Instant bid broadcast to all viewers · Seller cannot bid on own auction |
| **Dashboard**         | Personal stats (total/active auctions) · Recent auctions grid · Quick navigation to all sections                                                                               |
| **Admin Panel**       | System-wide statistics · User management with search, sort, pagination · Recent signups tracking · Role-based route protection                                                 |
| **Security**          | Login tracking (IP, geo-location, device, browser) · Login history per user · bcrypt password hashing · Environment variable validation at startup                             |
| **Email**             | Contact form with Resend · Dual email (admin notification + user confirmation) · XSS-safe HTML templates                                                                       |
| **Performance**       | React Query caching · Hover-based data prefetching · View Transitions API page animations · gzip compression · Optimized MongoDB indexes                                       |
| **Deployment**        | GitHub Actions CI/CD → AWS EC2 · Vercel serverless support · PM2 process management · Graceful shutdown handling                                                               |

---

## Tech Stack

<table>
<tr><td><b>Frontend</b></td><td><b>Backend</b></td><td><b>Infrastructure</b></td></tr>
<tr><td>

React 19 + Vite  
Tailwind CSS v4  
React Router v7  
Redux Toolkit  
TanStack React Query  
Socket.io Client  
React Hot Toast

</td><td>

Node.js + Express 5  
MongoDB + Mongoose  
Socket.io  
JWT + bcrypt  
Cloudinary + Multer  
Resend (email)  
Compression

</td><td>

AWS EC2  
Vercel (frontend)  
GitHub Actions CI/CD  
PM2  
Cloudinary CDN

</td></tr>
</table>

---

## Quick Start

### Prerequisites

- **Node.js** 20+ and npm
- **MongoDB** (local or [Atlas](https://www.mongodb.com/atlas))
- **Cloudinary** account ([free tier](https://cloudinary.com/))

### 1. Clone & Install

```bash
git clone https://github.com/theavnishkumar/online-auction-system.git
cd online-auction-system

# Install backend
cd server && npm install

# Install frontend
cd ../client && npm install
```

### 2. Environment Variables

**Server** (`server/.env`):

```env
PORT=3000
ORIGIN=http://localhost:5173
MONGO_URL=mongodb://localhost:27017/auction
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_URL=cloudinary://...
RESEND_API_KEY=re_xxxxxxxxxxxx
```

**Client** (`client/.env`):

```env
VITE_API=http://localhost:3000
VITE_AUCTION_API=http://localhost:3000/auction
```

### 3. Run

```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

Open **http://localhost:5173** — you're live!

---

## Project Structure

```
online-auction-system/
├── client/                      # React frontend (see client/README.md)
│   ├── src/
│   │   ├── components/          # Reusable UI (Navbar, AuctionCard, Footer)
│   │   ├── pages/               # Route pages (Dashboard, ViewAuction, etc.)
│   │   ├── hooks/               # React Query hooks + Socket hook
│   │   ├── services/            # API service layer (Axios)
│   │   ├── store/               # Redux Toolkit (auth state)
│   │   ├── layout/              # Layouts (Main, Admin, Open)
│   │   └── routers/             # Route definitions
│   └── package.json
│
├── server/                      # Express backend (see server/README.md)
│   ├── controllers/             # Route handlers
│   ├── models/                  # Mongoose schemas (User, Product, Login)
│   ├── routes/                  # REST API routes
│   ├── socket/                  # Socket.io initialization + auction handlers
│   ├── middleware/               # Auth + file upload middleware
│   ├── services/                # Cloudinary integration
│   ├── utils/                   # JWT, cookies, geo-location
│   ├── config/                  # DB + env configuration
│   ├── app.js                   # Express app setup
│   └── server.js                # HTTP server + Socket.io + graceful shutdown
│
├── .github/workflows/           # CI/CD pipeline
└── README.md
```

---

## Architecture

### Real-time Bidding Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  Client (ViewAuction)                                           │
│                                                                 │
│  useSocket hook                    REST API                     │
│  ┌──────────────┐                 ┌──────────────┐              │
│  │ Connect      │                 │ POST /bid    │              │
│  │ Join Room    │                 │ Atomic Update │              │
│  │ Listen Bids  │                 │ Return Data  │              │
│  │ Cleanup      │                 └──────┬───────┘              │
│  └──────┬───────┘                        │                      │
│         │                                │                      │
└─────────┼────────────────────────────────┼──────────────────────┘
          │ WebSocket                      │ HTTP
          │                                │
┌─────────┼────────────────────────────────┼──────────────────────┐
│  Server │                                │                      │
│         ▼                                ▼                      │
│  ┌──────────────┐                 ┌──────────────┐              │
│  │ Socket.io    │                 │ Express API  │              │
│  │ Auth via JWT │                 │ secureRoute  │              │
│  │ Room: {id}   │◄────Broadcast───│ placeBid()   │              │
│  │ Track Users  │                 │ Atomic update│              │
│  └──────────────┘                 └──────────────┘              │
│                                          │                      │
│                                   ┌──────▼───────┐              │
│                                   │   MongoDB    │              │
│                                   │ findOneAndUp │              │
│                                   │ date + price │              │
│                                   │  condition   │              │
│                                   └──────────────┘              │
└─────────────────────────────────────────────────────────────────┘
```

**Race condition prevention**: Bids use `findOneAndUpdate` with a price condition — if two users bid simultaneously, only the first succeeds; the second gets a retry prompt.

### Authentication Flow

```
Login/Signup → Server sets httpOnly cookie (auth_token)
     │
Page Refresh → InitAuth dispatches checkAuth()
     │              │
     │         GET /user (cookie sent automatically)
     │              │
     │         Returns { user } or 401
     │              │
     ▼         Redux updates auth state
App renders (protected routes check auth.user)
```

---

## API Reference

> Full backend documentation with request/response examples: **[server/README.md](./server/README.md)**

### Authentication

| Method | Endpoint       | Description                  |
| ------ | -------------- | ---------------------------- |
| `POST` | `/auth/signup` | Register new user            |
| `POST` | `/auth/login`  | Login (sets httpOnly cookie) |
| `POST` | `/auth/logout` | Logout (clears cookie)       |

### User

| Method  | Endpoint       | Description              | Auth     |
| ------- | -------------- | ------------------------ | -------- |
| `GET`   | `/user`        | Get current user profile | Required |
| `PATCH` | `/user`        | Change password          | Required |
| `GET`   | `/user/logins` | Login history (last 10)  | Required |

### Auctions

| Method | Endpoint             | Description                | Auth     |
| ------ | -------------------- | -------------------------- | -------- |
| `GET`  | `/auction`           | List auctions (paginated)  | Required |
| `POST` | `/auction`           | Create auction (multipart) | Required |
| `GET`  | `/auction/stats`     | Dashboard statistics       | Required |
| `GET`  | `/auction/myauction` | User's own auctions        | Required |
| `GET`  | `/auction/mybids`    | Auctions user has bid on   | Required |
| `GET`  | `/auction/:id`       | Single auction detail      | Required |
| `POST` | `/auction/:id/bid`   | Place a bid                | Required |

### Admin

| Method | Endpoint           | Description                        | Auth  |
| ------ | ------------------ | ---------------------------------- | ----- |
| `GET`  | `/admin/dashboard` | Admin statistics                   | Admin |
| `GET`  | `/admin/users`     | List users (paginated, searchable) | Admin |

### Contact

| Method | Endpoint   | Description         | Auth   |
| ------ | ---------- | ------------------- | ------ |
| `POST` | `/contact` | Submit contact form | Public |

---

## Socket.io Events

| Event                | Direction       | Payload                               |
| -------------------- | --------------- | ------------------------------------- |
| `auction:join`       | Client → Server | `{ auctionId }`                       |
| `auction:leave`      | Client → Server | `{ auctionId }`                       |
| `auction:bid`        | Client → Server | `{ auctionId, bidAmount }`            |
| `auction:userJoined` | Server → Room   | `{ userName, userId, activeUsers[] }` |
| `auction:userLeft`   | Server → Room   | `{ userName, userId, activeUsers[] }` |
| `auction:bidPlaced`  | Server → Room   | `{ auction, bidderName, bidAmount }`  |
| `auction:error`      | Server → Client | `{ message }`                         |

Socket connections are authenticated via JWT from cookies. Users are tracked per room with automatic cleanup on disconnect.

---

## Deployment

### Frontend → Vercel

```bash
cd client && npm run build
# Deploy via Vercel CLI or GitHub integration
```

### Backend → AWS EC2 (Automated)

The included GitHub Actions workflow (`.github/workflows/deploy.yml`) auto-deploys on push to `main`:

1. **Add GitHub Secrets**: `EC2_HOST`, `EC2_USERNAME`, `EC2_SSH_KEY`, `EC2_SSH_PORT`, `EC2_PROJECT_PATH`, and all `.env` variables
2. **EC2 Setup**: Node.js 20+, PM2 (`npm i -g pm2`), Git, SSH keys
3. **Push to main** → workflow SSHs into EC2, pulls code, installs deps, writes `.env`, restarts PM2

<details>
<summary>Full list of required GitHub Secrets</summary>

| Secret                  | Description                  |
| ----------------------- | ---------------------------- |
| `EC2_HOST`              | EC2 public IP                |
| `EC2_USERNAME`          | SSH user (e.g., `ubuntu`)    |
| `EC2_SSH_KEY`           | Private SSH key              |
| `EC2_SSH_PORT`          | SSH port (default: 22)       |
| `EC2_PROJECT_PATH`      | Project directory on EC2     |
| `PORT`                  | Server port                  |
| `ORIGIN`                | Frontend URL for CORS        |
| `MONGO_URL`             | MongoDB connection string    |
| `JWT_SECRET`            | JWT signing secret           |
| `JWT_EXPIRES_IN`        | Token expiry (e.g., `7d`)    |
| `COOKIE_DOMAIN`         | Cookie domain for production |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name        |
| `CLOUDINARY_API_KEY`    | Cloudinary API key           |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret        |
| `CLOUDINARY_URL`        | Cloudinary URL               |
| `RESEND_API_KEY`        | Resend email API key         |

</details>

---

## Contributing

Contributions are what make the open source community amazing. Any contributions you make are **greatly appreciated**.

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Install** dependencies (`cd server && npm i && cd ../client && npm i`)
4. **Make** your changes following existing code style
5. **Commit** using [conventional commits](https://www.conventionalcommits.org/) (`git commit -m "feat: add amazing feature"`)
6. **Push** to your branch (`git push origin feature/amazing-feature`)
7. **Open** a Pull Request

### Ideas for contribution

- **Payment integration** — Stripe/Razorpay for winning bids
- **Push notifications** — Real-time bid alerts via WebPush
- **Advanced search** — Full-text search with filters
- **User ratings** — Buyer/seller reputation system
- **Email notifications** — Automated auction activity emails
- **Testing** — Unit and integration test coverage
- **Accessibility** — WCAG compliance improvements

---

## License

Distributed under the **MIT License**. See [LICENSE](LICENSE) for more information.

---

<div align="center">

**Built by [Avnish Kumar](https://github.com/theavnishkumar)**

If this project helped you, consider giving it a ⭐

[⬆ Back to Top](#online-auction-system)

</div>
