# 🏗️ Architecture

A comprehensive guide to the **Online Auction System** architecture — a full-stack MERN application featuring real-time bidding powered by WebSockets.

---

## Table of Contents

- [System Overview](#system-overview)
- [Tech Stack](#tech-stack)
- [High-Level Architecture](#high-level-architecture)
- [Directory Structure](#directory-structure)
- [Backend Architecture](#backend-architecture)
  - [Entry Points & Server Lifecycle](#entry-points--server-lifecycle)
  - [Data Models](#data-models)
  - [API Endpoints](#api-endpoints)
  - [Authentication & Security](#authentication--security)
  - [Real-Time Bidding (Socket.IO)](#real-time-bidding-socketio)
  - [Services & Utilities](#services--utilities)
- [Frontend Architecture](#frontend-architecture)
  - [Application Bootstrap](#application-bootstrap)
  - [Routing & Layouts](#routing--layouts)
  - [State Management](#state-management)
  - [Data Fetching Layer](#data-fetching-layer)
  - [Socket Integration](#socket-integration)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Data Flow Diagrams](#data-flow-diagrams)

---

## System Overview

The Online Auction System is a two-tier web application:

| Layer | Description |
|-------|-------------|
| **Client** | React 19 SPA built with Vite, styled with TailwindCSS 4 |
| **Server** | Express 5 REST API with Socket.IO for real-time features |
| **Database** | MongoDB via Mongoose ODM |
| **Media** | Cloudinary CDN for image storage |
| **Email** | Resend transactional email service |

---

## Tech Stack

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | — | Runtime |
| Express | 5.x | HTTP framework |
| Mongoose | 8.x | MongoDB ODM |
| Socket.IO | 4.x | WebSocket server |
| JWT | — | Authentication tokens |
| bcrypt | 6.x | Password hashing |
| Cloudinary | 1.x | Image upload & CDN |
| Multer | 1.x | Multipart file handling |
| Resend | 4.x | Email delivery |
| Axios | 1.x | IP geolocation API calls |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI library |
| Vite | 6.x | Build tool & dev server |
| TailwindCSS | 4.x | Utility-first CSS |
| Redux Toolkit | 2.x | Global auth state |
| React Query | 5.x | Server state & caching |
| React Router | 7.x | Client-side routing |
| Socket.IO Client | 4.x | WebSocket client |
| Axios | 1.x | HTTP client |
| react-hot-toast | 2.x | Toast notifications |
| react-icons | 5.x | Icon library |
| jwt-decode | 4.x | Client-side JWT decoding |

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React SPA)                       │
│                                                                 │
│  ┌──────────┐  ┌──────────────┐  ┌────────────┐  ┌──────────┐  │
│  │  Pages   │→ │  Hooks       │→ │  Services  │→ │  Axios   │──┼──→ REST API
│  │          │  │ (React Query)│  │  (API Layer)│  │ Instance │  │
│  └──────────┘  └──────────────┘  └────────────┘  └──────────┘  │
│                                                                 │
│  ┌──────────┐  ┌──────────────┐                                 │
│  │  Redux   │  │  Socket.IO   │─────────────────────────────────┼──→ WebSocket
│  │  Store   │  │  Client      │                                 │
│  └──────────┘  └──────────────┘                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVER (Express + Socket.IO)                  │
│                                                                 │
│  ┌──────────┐  ┌──────────────┐  ┌────────────┐  ┌──────────┐  │
│  │  Routes  │→ │  Middleware   │→ │ Controllers│→ │  Models  │──┼──→ MongoDB
│  │          │  │ (Auth/Multer) │  │            │  │          │  │
│  └──────────┘  └──────────────┘  └────────────┘  └──────────┘  │
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐    │
│  │ Socket.IO    │  │  Services    │  │     Utilities      │    │
│  │ (Real-time)  │  │ (Cloudinary) │  │ (JWT/Cookie/Geo)   │    │
│  └──────────────┘  └──────────────┘  └────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
         ┌─────────┐   ┌──────────┐   ┌────────────┐
         │ MongoDB │   │Cloudinary│   │  Resend    │
         │         │   │  (CDN)   │   │  (Email)   │
         └─────────┘   └──────────┘   └────────────┘
```

---

## Directory Structure

```
online-auction-system/
├── client/                          # Frontend (React SPA)
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── api/                     # Legacy API functions (raw Axios)
│   │   ├── assets/                  # Images & static assets
│   │   ├── components/              # Reusable UI components
│   │   │   ├── Landing/             # Landing page sections
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── Footer.jsx           # Footer component
│   │   │   ├── AuctionCard.jsx      # Auction listing card
│   │   │   ├── DialogBox.jsx        # Modal dialog
│   │   │   ├── LoadingScreen.jsx    # Loading indicator
│   │   │   └── AdsComponent.jsx     # Advertisement slot
│   │   ├── config/                  # Axios & Socket.IO config
│   │   │   ├── api.js               # Centralized Axios instance
│   │   │   └── socket.js            # Socket.IO singleton
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── useAuction.js        # Auction CRUD hooks (React Query)
│   │   │   ├── useSocket.js         # Real-time auction hook
│   │   │   ├── useAdmin.js          # Admin panel hooks
│   │   │   ├── useUser.js           # User profile hooks
│   │   │   ├── useContact.js        # Contact form hook
│   │   │   └── useDocumentTitle.js  # Dynamic page title
│   │   ├── init/                    # App initialization
│   │   │   └── InitAuth.jsx         # Auth session rehydration
│   │   ├── layout/                  # Layout wrappers
│   │   │   ├── MainLayout.jsx       # Authenticated layout (redirect guard)
│   │   │   ├── OpenLayout.jsx       # Public layout
│   │   │   └── AdminLayout.jsx      # Admin panel layout
│   │   ├── pages/                   # Route-level page components
│   │   │   ├── Admin/               # Admin dashboard & user management
│   │   │   ├── legal/               # Legal pages (ToS, Privacy, DMCA, etc.)
│   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   ├── AuctionList.jsx      # Browse all auctions
│   │   │   ├── ViewAuction.jsx      # Single auction detail + bidding
│   │   │   ├── CreateAuction.jsx    # Auction creation form
│   │   │   ├── MyAuction.jsx        # User's created auctions
│   │   │   ├── MyBids.jsx           # User's bid history
│   │   │   ├── Profile.jsx          # User profile & settings
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Signup.jsx           # Registration page
│   │   │   ├── Contact.jsx          # Contact form
│   │   │   ├── About.jsx            # About page
│   │   │   ├── Landing.jsx          # Landing/Home page
│   │   │   └── Privacy.jsx          # Privacy & login history
│   │   ├── routers/                 # Route definitions
│   │   │   ├── openRoutes.jsx       # Public routes
│   │   │   ├── protectedRoutes.jsx  # Auth-required routes
│   │   │   └── adminRouter.jsx      # Admin-only routes
│   │   ├── services/                # API service layer (centralized Axios)
│   │   │   ├── auction.service.js   # Auction API calls
│   │   │   ├── user.service.js      # User API calls
│   │   │   ├── admin.service.js     # Admin API calls
│   │   │   └── contact.service.js   # Contact API calls
│   │   ├── store/                   # Redux store
│   │   │   ├── store.js             # Store configuration
│   │   │   ├── auth/authSlice.js    # Auth state (active)
│   │   │   └── auction/auctionSlice.js  # Legacy auction state (unused)
│   │   ├── utils/                   # Utility components
│   │   │   └── ScrollToTop.jsx      # Scroll restoration
│   │   ├── main.jsx                 # App entry point
│   │   └── Error.jsx                # Error boundary page
│   ├── index.html                   # HTML template
│   ├── vite.config.js               # Vite configuration
│   ├── vercel.json                  # Vercel SPA routing
│   └── package.json
│
├── server/                          # Backend (Express API)
│   ├── config/
│   │   ├── db.config.js             # MongoDB connection (with caching)
│   │   └── env.config.js            # Environment variable validation
│   ├── controllers/
│   │   ├── auth.controller.js       # Login / Signup / Logout
│   │   ├── auction.controller.js    # Auction CRUD & bidding
│   │   ├── user.controller.js       # Profile & login history
│   │   ├── admin.controller.js      # Admin dashboard & user management
│   │   └── contact.controller.js    # Email contact form
│   ├── middleware/
│   │   ├── auth.middleware.js       # JWT verification & role check
│   │   └── multer.js                # Cloudinary file upload
│   ├── models/
│   │   ├── user.model.js            # User schema
│   │   ├── product.model.js         # Product (auction) + Bid schemas
│   │   └── login.model.js           # Login audit log
│   ├── routes/
│   │   ├── index.js                 # Route barrel export
│   │   ├── auth.routes.js           # /auth/*
│   │   ├── auction.routes.js        # /auction/*
│   │   ├── user.routes.js           # /user/*
│   │   ├── admin.routes.js          # /admin/*
│   │   └── contact.routes.js        # /contact
│   ├── services/
│   │   └── cloudinaryService.js     # Cloudinary config & URL extraction
│   ├── socket/
│   │   ├── index.js                 # Socket.IO init & JWT auth middleware
│   │   └── auction.handler.js       # Real-time bidding room handlers
│   ├── utils/
│   │   ├── jwt.js                   # Token generation & verification
│   │   ├── cookies.util.js          # HTTP-only cookie management
│   │   └── geoDetails.js            # IP geolocation lookup
│   ├── app.js                       # Express app setup
│   ├── server.js                    # HTTP server + graceful shutdown
│   ├── index.js                     # Vercel serverless entry
│   ├── vercel.json                  # Vercel deployment config
│   └── package.json
│
├── .github/                         # GitHub configuration
│   ├── workflows/                   # CI/CD pipelines
│   ├── ISSUE_TEMPLATE/              # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md     # PR template
│
├── screenshots/                     # App screenshots for README
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── LICENSE                          # MIT License
└── README.md
```

---

## Backend Architecture

### Entry Points & Server Lifecycle

The server has **two entry points** to support both traditional hosting and serverless deployment:

```
server.js (Traditional)              index.js (Serverless / Vercel)
     │                                    │
     ▼                                    ▼
 startServer()                      import app from "./app.js"
     │                              export default app
     ├── connectDB()
     ├── http.createServer(app)
     ├── initSocket(server)
     └── server.listen(PORT)
```

**`server.js`** — Full lifecycle management:
- Connects to MongoDB, creates an HTTP server, initializes Socket.IO
- Implements **graceful shutdown** handling (`SIGINT`, `SIGTERM`, `uncaughtException`, `unhandledRejection`)
- Closes DB connections and HTTP server with a 10-second force-kill timeout

**`index.js`** — Vercel serverless entry:
- Simply re-exports the Express app for Vercel's `@vercel/node` runtime
- Database connections are handled per-request via middleware when `process.env.VERCEL` is set

**`app.js`** — Express application:
- Configures CORS, cookie parser, compression, JSON body parsing
- Mounts all route groups: `/auth`, `/user`, `/auction`, `/contact`, `/admin`

---

### Data Models

```
┌──────────────────────────┐     ┌──────────────────────────────┐
│         User             │     │          Product             │
├──────────────────────────┤     ├──────────────────────────────┤
│ name         : String    │     │ itemName        : String     │
│ email        : String ⊕  │     │ itemDescription : String     │
│ password     : String 🔒 │     │ itemCategory    : String     │
│ avatar       : String    │     │ itemPhoto       : String     │
│ role         : enum      │◄────│ seller          : ObjectId   │
│   ["user", "admin"]      │     │ startingPrice   : Number     │
│ ipAddress    : String    │     │ currentPrice    : Number     │
│ userAgent    : String    │     │ itemStartDate   : Date       │
│ location     : {         │     │ itemEndDate     : Date       │
│   country, region,       │     │ bids            : [Bid]      │
│   city, isp              │     │ winner          : ObjectId   │
│ }                        │◄────│ isSold          : Boolean    │
│ signupAt     : Date      │     │ timestamps      : auto       │
│ lastLogin    : Date      │     └──────────────────────────────┘
│ timestamps   : auto      │                  │
└──────────────────────────┘                  │ embedded
            │                     ┌───────────┴────────────┐
            │ ref                 │         Bid            │
┌───────────┴──────────────┐     ├──────────────────────────┤
│         Login            │     │ bidder    : ObjectId     │
├──────────────────────────┤     │ bidAmount : Number       │
│ userId    : ObjectId     │     │ bidTime   : Date         │
│ ipAddress : String       │     └──────────────────────────┘
│ userAgent : String       │
│ location  : { ... }      │
│ loginAt   : Date (TTL)   │  ← Auto-expires after ~6 months
└──────────────────────────┘
```

**Key Design Decisions:**
- **Bids are embedded** in the Product document (subdocument array) for fast read access
- **Login records use MongoDB TTL index** (`expires: 15778463` seconds ≈ 6 months) for automatic cleanup
- **Product indexes** on `itemEndDate`, `seller`, `itemCategory`, and `createdAt` for query performance

---

### API Endpoints

#### Auth Routes — `/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/auth/login` | ❌ | Login with email/password |
| `POST` | `/auth/signup` | ❌ | Register new user |
| `POST` | `/auth/logout` | ❌ | Clear auth cookie |

#### User Routes — `/user` (🔒 Requires Auth)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/user` | 🔒 | Get current user profile |
| `PATCH` | `/user` | 🔒 | Change password |
| `GET` | `/user/logins` | 🔒 | Get login history (last 10) |

#### Auction Routes — `/auction` (🔒 Requires Auth)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/auction` | 🔒 | List active auctions (paginated) |
| `POST` | `/auction` | 🔒 | Create new auction (with image) |
| `GET` | `/auction/stats` | 🔒 | Dashboard statistics |
| `GET` | `/auction/myauction` | 🔒 | User's own auctions (paginated) |
| `GET` | `/auction/mybids` | 🔒 | Auctions user has bid on |
| `GET` | `/auction/:id` | 🔒 | View single auction detail |
| `POST` | `/auction/:id/bid` | 🔒 | Place a bid |

#### Admin Routes — `/admin` (🔒 Auth + 👑 Admin Only)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/admin/dashboard` | 👑 | Admin dashboard stats |
| `GET` | `/admin/users` | 👑 | List all users (paginated, searchable) |

#### Contact Routes — `/contact`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/contact` | ❌ | Send contact message (via email) |

---

### Authentication & Security

```
┌──────────┐    POST /auth/login    ┌──────────────────────────────────┐
│  Client  │ ──────────────────────►│  auth.controller.js              │
│          │                        │  1. Validate email & password    │
│          │                        │  2. bcrypt.compare()             │
│          │                        │  3. generateToken(userId, role)  │
│          │     Set-Cookie:        │  4. setCookie(res, token)        │
│          │◄───auth_token=xxx──────│  5. Log IP, geo, user agent     │
│          │    HttpOnly, Secure    │  6. Save to Login collection     │
└──────────┘                        └──────────────────────────────────┘
      │
      │  Subsequent requests carry cookie automatically
      ▼
┌──────────┐    Cookie: auth_token  ┌──────────────────────────────────┐
│  Client  │ ──────────────────────►│  auth.middleware.js               │
│          │                        │  secureRoute:                    │
│          │                        │   1. Extract token from cookie   │
│          │                        │   2. jwt.verify(token, secret)   │
│          │                        │   3. req.user = decoded payload  │
│          │                        │                                  │
│          │                        │  checkAdmin:                     │
│          │                        │   4. Verify req.user.role = admin│
└──────────┘                        └──────────────────────────────────┘
```

**Security Features:**
- **HTTP-only cookies** — Tokens are never exposed to JavaScript (XSS protection)
- **Secure flag** — Cookies only sent over HTTPS in production
- **SameSite policy** — `None` in production (cross-origin), `Lax` in development
- **Cross-subdomain cookies** — Configurable `COOKIE_DOMAIN` for multi-subdomain setups
- **Password hashing** — bcrypt with salt rounds of 10
- **User enumeration prevention** — Same error message for invalid email/password
- **Server-side validation** — Minimum 8-character password enforcement
- **Input sanitization** — HTML escaping for email templates to prevent XSS
- **ReDoS protection** — Regex special chars escaped in admin search queries

---

### Real-Time Bidding (Socket.IO)

```
┌─────────┐                          ┌──────────────────┐
│ Client A│──── auction:join ───────►│ Socket.IO Server │
│         │                          │                  │
│ Client B│──── auction:join ───────►│  Auction Room    │
│         │                          │  (auctionId)     │
│ Client C│──── auction:join ───────►│                  │
└─────────┘                          └──────────────────┘
     │                                       │
     │──── auction:bid ─────────────────────►│
     │     { auctionId, bidAmount }          │
     │                                       │
     │     Validation:                       │
     │     ✓ Auction exists & active         │
     │     ✓ Not seller's own auction        │
     │     ✓ Bid within min/max range        │
     │     ✓ Atomic update (race condition)  │
     │                                       │
     │◄─── auction:bidPlaced ───────────────│ (broadcast to room)
     │     { auction, bidderName, amount }   │
     │                                       │
     │◄─── auction:userJoined ──────────────│ (user presence)
     │◄─── auction:userLeft ────────────────│
     │◄─── auction:error ──────────────────│
     │                                       │
     │──── auction:leave ───────────────────►│
     │──── disconnect ─────────────────────►│ (auto-cleanup)
```

**Socket Events:**

| Event | Direction | Description |
|-------|-----------|-------------|
| `auction:join` | Client → Server | Join an auction room |
| `auction:leave` | Client → Server | Leave an auction room |
| `auction:bid` | Client → Server | Place a real-time bid |
| `auction:bidPlaced` | Server → Room | Broadcast bid update to all users |
| `auction:userJoined` | Server → Room | Notify when user joins |
| `auction:userLeft` | Server → Room | Notify when user leaves |
| `auction:error` | Server → Client | Send error to specific client |

**Key Implementation Details:**
- Socket connections are **JWT-authenticated** using cookies (same token as REST API)
- Uses **room-based architecture** — each auction ID is a Socket.IO room
- **Optimistic concurrency control** — `findOneAndUpdate` with price condition prevents race conditions
- **Active user tracking** — In-memory `Map` tracks users per auction room with deduplication
- Bid range: `currentPrice + 1` to `currentPrice + 10` (prevents bid sniping)

---

### Services & Utilities

| Module | Purpose |
|--------|---------|
| `cloudinaryService.js` | Configures Cloudinary SDK; extracts upload URL from multer |
| `multer.js` | Multer middleware with Cloudinary storage backend |
| `jwt.js` | Token generation (`sign`) and verification (`verify`) |
| `cookies.util.js` | Environment-aware cookie set/clear (dev vs production) |
| `geoDetails.js` | IP geolocation via `ip-api.com`; client IP extraction from proxy headers |

---

## Frontend Architecture

### Application Bootstrap

```
main.jsx
   │
   ├── QueryClientProvider (React Query)
   │       └── Manages server state caching & synchronization
   │
   ├── Provider (Redux)
   │       └── Auth state: { user, loading, error }
   │
   └── InitAuth
           │
           ├── Dispatches checkAuth() on mount
           │   └── GET /user → validates cookie session
           │
           ├── Shows LoadingScreen during auth check
           │
           └── RouterProvider
                   └── Renders route tree
```

---

### Routing & Layouts

The app uses **three route groups**, each with its own layout wrapper:

```
┌───────────────────────────────────────────────────────────────────┐
│                        Router Structure                           │
├───────────────────────────────────────────────────────────────────┤
│                                                                   │
│  🌐 Open Routes (OpenLayout)                                     │
│  ├── /              → Landing page                                │
│  ├── /login         → Login page                                  │
│  ├── /signup        → Registration page                           │
│  ├── /contact       → Contact form                                │
│  ├── /about         → About page                                  │
│  └── /legal/*       → Legal pages (ToS, Privacy, DMCA, etc.)     │
│                                                                   │
│  🔒 Protected Routes (MainLayout — redirects to /login)          │
│  ├── /auction       → Browse active auctions                      │
│  ├── /auction/:id   → View auction + real-time bidding            │
│  ├── /create        → Create new auction                          │
│  ├── /myauction     → User's own auctions                         │
│  ├── /mybids        → User's bid history                          │
│  ├── /profile       → User profile & settings                     │
│  └── /privacy       → Privacy settings & login history            │
│                                                                   │
│  👑 Admin Routes (AdminLayout)                                    │
│  ├── /admin         → Admin dashboard                             │
│  └── /admin/users   → User management                             │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

**Layout Components:**
- **`OpenLayout`** — Navbar + Outlet + Footer (no auth check)
- **`MainLayout`** — Same structure but guards routes — redirects to `/login` if unauthenticated
- **`AdminLayout`** — Navbar + Outlet + Footer for admin panels

---

### State Management

The app uses a **hybrid approach** — Redux for auth, React Query for everything else:

```
┌─────────────────────────────────────────────────┐
│              State Management Strategy           │
├─────────────────────────────────────────────────┤
│                                                  │
│  Redux Toolkit (Global, Synchronous)             │
│  └── authSlice                                   │
│      ├── user: { name, email, avatar, role }     │
│      ├── loading: boolean                        │
│      ├── error: string | null                    │
│      │                                           │
│      ├── checkAuth()  → GET /user                │
│      ├── login()      → POST /auth/login         │
│      ├── signup()     → POST /auth/signup        │
│      └── logout()     → POST /auth/logout        │
│                                                  │
│  React Query (Server State, Async)               │
│  ├── ["auctions", page]     → Auction listings   │
│  ├── ["myAuctions", page]   → User's auctions    │
│  ├── ["myBids", page]       → User's bids        │
│  ├── ["auction", id]        → Single auction      │
│  ├── ["dashboardStats"]     → Dashboard data      │
│  ├── ["adminDashboard"]     → Admin stats         │
│  ├── ["allUsers", ...]      → Admin user list     │
│  └── ["loginHistory"]       → Login audit log     │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Why this split?**
- **Auth state** needs to be globally accessible and synchronous (determines routing, UI rendering)
- **Server data** benefits from React Query's caching, background refetching, and pagination support

---

### Data Fetching Layer

The frontend follows a **clean layered architecture**:

```
Pages/Components
       │
       ▼
    Hooks (React Query wrappers)
    ├── useGetAuctions(page)
    ├── useViewAuction(id)
    ├── usePlaceBid()
    ├── useCreateAuction()
    ├── useDashboardStats()
    ├── useAdminDashboard()
    ├── useGetAllUsers(page, search, role, ...)
    ├── useChangePassword()
    ├── useLoginHistory()
    ├── useSendMessage()
    └── usePrefetchHandlers()   ← Prefetch for instant navigation
       │
       ▼
    Services (API call functions)
    ├── auction.service.js
    ├── user.service.js
    ├── admin.service.js
    └── contact.service.js
       │
       ▼
    Config (Axios instance)
    └── api.js → axios.create({ baseURL, withCredentials: true })
```

> **Note:** The `src/api/` directory contains **legacy API functions** from an earlier version. The active codebase uses the `src/services/` layer which uses the centralized Axios instance from `src/config/api.js`.

---

### Socket Integration

The `useSocket` hook provides a clean abstraction for real-time auction features:

```javascript
const { activeUsers, liveAuction, socketError, isConnected } = useSocket(auctionId, userId);
```

**Socket Lifecycle:**
1. **Connect** — Singleton socket instance connects on first use
2. **Join** — Emits `auction:join` when entering an auction page
3. **Listen** — Subscribes to bid updates, user presence, and errors
4. **Toast Notifications** — Shows real-time events for other users (not self)
5. **Leave** — Emits `auction:leave` on component unmount
6. **Reconnect** — Auto-reconnects with up to 10 attempts

---

## Deployment

Both client and server are configured for **Vercel deployment**:

```
┌────────────────────────────────────────────────────────────────┐
│                    Vercel Deployment                            │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  Client (Vite SPA)                                             │
│  ├── Build: vite build                                         │
│  ├── Output: dist/                                             │
│  └── vercel.json: SPA fallback rewrite (/* → /index.html)     │
│                                                                │
│  Server (Serverless Functions)                                 │
│  ├── Entry: index.js → exports Express app                    │
│  ├── Runtime: @vercel/node                                     │
│  ├── DB: Per-request connection via middleware                 │
│  └── vercel.json: All routes → /index.js                      │
│                                                                │
│  ⚠️  Note: Socket.IO requires persistent connections,         │
│     which are NOT supported on Vercel Serverless.              │
│     Real-time features require a traditional Node.js host      │
│     (e.g., Railway, Render, VPS) running server.js.            │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## Environment Variables

### Server (`.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | ❌ | Server port (default: `4000`) |
| `ORIGIN` | ✅ | Allowed CORS origin (client URL) |
| `NODE_ENV` | ✅ | `development` or `production` |
| `MONGO_URL` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | ❌ | Token expiry (default: `7d`) |
| `COOKIE_DOMAIN` | ❌ | Cross-subdomain cookie domain |
| `CLOUDINARY_CLOUD_NAME` | ❌ | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | ❌ | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | ❌ | Cloudinary API secret |
| `CLOUDINARY_URL` | ❌ | Cloudinary URL |
| `RESEND_API_KEY` | ❌ | Resend email API key |

### Client (`.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API` | ✅ | Backend API base URL |

---

## Data Flow Diagrams

### Bidding Flow (REST + WebSocket)

```
User clicks "Place Bid"
       │
       ├──── HTTP POST /auction/:id/bid ──────────────────────┐
       │     (via usePlaceBid mutation)                        │
       │                                                       ▼
       │                                          ┌────────────────────┐
       │                                          │  auction.controller │
       │                                          │  1. Validate amount │
       │                                          │  2. Check auction   │
       │                                          │     active & rules  │
       │                                          │  3. Atomic update   │
       │                                          │     with price lock │
       │                                          │  4. Populate refs   │
       │                                          │  5. io.to(id).emit  │
       │                                          │     auction:bidPlaced│
       │                                          └────────┬───────────┘
       │                                                   │
       │     HTTP 200 (success)                            │
       │◄──────────────────────────────────────────────────┤
       │                                                   │
       │     Socket: auction:bidPlaced                     │
       │◄──────────────────────────────────── (broadcast) ─┤
       │     (updates liveAuction state via useSocket)     │
       │                                                   │
       │     React Query cache invalidation                │
       └──── Refetches auction, auctions, myBids, stats ───┘
```

### Auto Winner Determination

```
Auction timer expires
       │
       ▼
Next GET /auction/:id request
       │
       ▼
auctionById controller checks:
  ├── isExpired? ──────── NO ──→ Return auction normally
  │
  YES
  │
  ├── Has winner? ─────── YES ─→ Return with winner info
  │
  NO (+ has bids)
  │
  ├── Sort bids by amount (descending)
  ├── Set winner = highest bidder
  ├── Set isSold = true
  ├── Save to database
  └── Return updated auction
```

---

<div align="center">

*Built with ❤️ by [Avnish Kumar](https://github.com/theavnishkumar)*

</div>
