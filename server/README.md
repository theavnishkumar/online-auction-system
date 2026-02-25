# Online Auction System — Backend

> Express 5 REST API + Socket.io real-time bidding server with MongoDB, JWT auth, Cloudinary uploads, and automated deployment.

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
  - [Authentication](#authentication-endpoints)
  - [User](#user-endpoints)
  - [Auctions](#auction-endpoints)
  - [Admin](#admin-endpoints)
  - [Contact](#contact-endpoints)
- [Socket.io Events](#socketio-real-time-events)
- [Database Models](#database-models)
- [Middleware](#middleware)
- [Security](#security)
- [Error Handling](#error-handling)
- [Deployment](#deployment)

---

## Architecture Overview

```
server/
├── server.js          → HTTP server + Socket.io init + graceful shutdown
├── app.js             → Express app (middleware, routes, CORS)
├── index.js           → Vercel serverless export
│
├── config/
│   ├── db.config.js   → MongoDB connection (cached for serverless)
│   └── env.config.js  → Environment variable loading + validation
│
├── routes/            → Route definitions (thin layer)
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── auction.routes.js
│   ├── admin.routes.js
│   ├── contact.routes.js
│   └── index.js       → Barrel export
│
├── controllers/       → Business logic
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── auction.controller.js
│   ├── admin.controller.js
│   └── contact.controller.js
│
├── models/            → Mongoose schemas
│   ├── user.model.js
│   ├── product.model.js
│   └── login.model.js
│
├── socket/            → Real-time bidding
│   ├── index.js           → Socket.io init + JWT auth middleware
│   └── auction.handler.js → Room management + bid handling
│
├── middleware/
│   ├── auth.middleware.js  → JWT verification + admin check
│   └── multer.js           → Cloudinary storage config
│
├── services/
│   └── cloudinaryService.js → Cloudinary setup + image URL helper
│
└── utils/
    ├── jwt.js             → Token generation + verification
    ├── cookies.util.js    → httpOnly cookie set/clear
    └── geoDetails.js      → IP extraction + geo-location lookup
```

### Request Lifecycle

```
Request → CORS → Cookie Parser → Compression → JSON Parser
    → Route → Auth Middleware (if protected) → Controller → Response
```

### Server Startup

```
server.js
  ├── connectDB()         → MongoDB connection
  ├── http.createServer() → HTTP server
  ├── initSocket()        → Socket.io attached to HTTP server
  ├── server.listen()     → Start listening
  └── Signal handlers     → SIGINT, SIGTERM → graceful shutdown
```

The server implements **graceful shutdown** — on termination signals, it stops accepting new connections, closes the HTTP server, disconnects MongoDB, and exits cleanly. A 10-second timeout forces exit if cleanup hangs.

---

## Getting Started

```bash
cd server
npm install
```

Create a `.env` file (see [Environment Variables](#environment-variables)), then:

```bash
# Development (with nodemon hot-reload)
npm run dev

# Production
npm start
```

The server runs on `http://localhost:3000` by default.

---

## Project Structure

| Directory      | Purpose                                                                |
| -------------- | ---------------------------------------------------------------------- |
| `config/`      | Database connection and environment variable management                |
| `controllers/` | Request handlers — all business logic lives here                       |
| `middleware/`  | JWT auth verification, admin role check, Multer file upload            |
| `models/`      | Mongoose schemas for User, Product (auction), and Login history        |
| `routes/`      | Express router definitions (thin — just maps endpoints to controllers) |
| `services/`    | External service integrations (Cloudinary)                             |
| `socket/`      | Socket.io initialization, JWT auth for sockets, auction room handlers  |
| `utils/`       | JWT helpers, cookie management, geo-location utilities                 |

---

## Environment Variables

| Variable                | Required | Description                     | Example                 |
| ----------------------- | -------- | ------------------------------- | ----------------------- |
| `PORT`                  | No       | Server port (default: 4000)     | `3000`                  |
| `NODE_ENV`              | No       | Environment mode                | `production`            |
| `ORIGIN`                | **Yes**  | Frontend URL for CORS           | `http://localhost:5173` |
| `MONGO_URL`             | **Yes**  | MongoDB connection string       | `mongodb+srv://...`     |
| `JWT_SECRET`            | **Yes**  | Secret key for JWT signing      | `your-secret-key`       |
| `JWT_EXPIRES_IN`        | No       | Token expiry (default: 7d)      | `7d`                    |
| `COOKIE_DOMAIN`         | No       | Cookie domain (production only) | `.ihavetech.com`        |
| `CLOUDINARY_CLOUD_NAME` | Yes      | Cloudinary cloud name           | `my-cloud`              |
| `CLOUDINARY_API_KEY`    | Yes      | Cloudinary API key              | `123456789`             |
| `CLOUDINARY_API_SECRET` | Yes      | Cloudinary API secret           | `abc-xyz`               |
| `CLOUDINARY_URL`        | Yes      | Full Cloudinary URL             | `cloudinary://...`      |
| `RESEND_API_KEY`        | Yes      | Resend email service key        | `re_xxx`                |

**Startup validation**: The server will exit immediately if `MONGO_URL`, `JWT_SECRET`, or `ORIGIN` are missing.

---

## API Reference

Base URL: `http://localhost:3000`

All responses follow this pattern:

```json
// Success
{ "message": "...", "data": { ... } }

// Error
{ "message": "...", "error": "..." }
// or
{ "error": "..." }
```

---

### Authentication Endpoints

Authentication uses **httpOnly secure cookies**. No tokens are exposed to JavaScript.

#### `POST /auth/signup`

Register a new user account.

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Validations:**

- All fields required
- Password minimum 8 characters
- Email must be unique
- Email format validated

**Response:** `201 Created`

```json
{ "message": "User registered successfully" }
```

Sets `auth_token` httpOnly cookie.

**Side effects:**

- Password hashed with bcrypt (10 rounds)
- Geo-location captured (IP, country, city, ISP)
- Login record created
- Default avatar assigned

---

#### `POST /auth/login`

**Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** `200 OK`

```json
{ "message": "Login Successful" }
```

Sets `auth_token` httpOnly cookie.

**Side effects:**

- Last login timestamp updated
- Geo-location + device info updated on user record
- Login record created (auto-expires after ~6 months)

**Error responses:**

- `400` — Missing fields
- `401` — Invalid email or password (same message for both to prevent enumeration)

---

#### `POST /auth/logout`

Clears the `auth_token` cookie.

**Response:** `200 OK`

```json
{ "message": "Logged out successfully" }
```

---

### User Endpoints

All user endpoints require authentication (`auth_token` cookie).

#### `GET /user`

Get the authenticated user's profile. Used for auto-login on page refresh.

**Response:** `200 OK`

```json
{
  "user": {
    "_id": "6789...",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://...",
    "role": "user"
  }
}
```

---

#### `PATCH /user`

Change the authenticated user's password.

**Body:**

```json
{
  "currentPassword": "oldpassword",
  "newPassword": "newpassword123",
  "confirmPassword": "newpassword123"
}
```

**Validations:**

- All fields required
- New password ≠ current password
- New password = confirm password
- Minimum 8 characters
- Current password must be correct

**Response:** `200 OK`

```json
{ "message": "Password changed successfully." }
```

---

#### `GET /user/logins`

Get the user's last 10 login records.

**Response:** `200 OK`

```json
[
  {
    "id": "abc123",
    "dateTime": "26 Feb, 2026 10:30 AM",
    "ipAddress": "192.168.1.1",
    "location": "Mumbai, Maharashtra, India",
    "isp": "Jio",
    "device": "Desktop"
  }
]
```

---

### Auction Endpoints

All auction endpoints require authentication.

#### `GET /auction`

List active auctions (not expired) with pagination.

**Query Parameters:**
| Param | Default | Max | Description |
|-------|---------|-----|-------------|
| `page` | 1 | — | Page number |
| `limit` | 12 | 50 | Items per page |

**Response:** `200 OK`

```json
{
  "auctions": [
    {
      "_id": "abc123",
      "itemName": "Vintage Watch",
      "itemDescription": "A rare 1960s Swiss watch",
      "currentPrice": 500,
      "bidsCount": 12,
      "timeLeft": 86400000,
      "itemCategory": "Collectibles",
      "sellerName": "John",
      "itemPhoto": "https://cloudinary.com/..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 45,
    "totalPages": 4
  }
}
```

---

#### `POST /auction`

Create a new auction. Accepts `multipart/form-data` for image upload.

**Body (form-data):**
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `itemName` | String | Yes | Auction title |
| `itemDescription` | String | Yes | Item description |
| `itemCategory` | String | Yes | Category name |
| `startingPrice` | Number | Yes | Starting bid (min: 1) |
| `itemStartDate` | Date | No | Start date (default: now) |
| `itemEndDate` | Date | Yes | End date (must be after start) |
| `itemPhoto` | File | No | Image file (uploaded to Cloudinary) |

**Response:** `201 Created`

```json
{
  "message": "Auction created successfully",
  "newAuction": { ... }
}
```

---

#### `GET /auction/stats`

Dashboard statistics for the authenticated user.

**Response:** `200 OK`

```json
{
  "totalAuctions": 100,
  "userAuctionCount": 5,
  "activeAuctions": 42,
  "latestAuctions": [ ... ],
  "latestUserAuctions": [ ... ]
}
```

Returns the 4 most recent active auctions globally and the 4 most recent auctions by the user.

---

#### `GET /auction/myauction`

List auctions created by the authenticated user (paginated, same format as `GET /auction`).

---

#### `GET /auction/mybids`

List auctions the user has bid on (paginated). Includes additional fields:

```json
{
  "auctions": [
    {
      ...standardFields,
      "isExpired": true,
      "winner": { "_id": "...", "name": "John" },
      "isSold": true
    }
  ],
  "pagination": { ... }
}
```

---

#### `GET /auction/:id`

Get full auction details including all bids (sorted newest first).

**Smart behaviors:**

- **Auto-winner**: If the auction is expired with bids but no winner, automatically sets the highest bidder as winner
- **Access control**: Expired auctions are only visible to the seller and users who placed bids

**Response:** `200 OK` — Full Product document with populated seller, bidders, and winner.

---

#### `POST /auction/:id/bid`

Place a bid on an auction.

**Body:**

```json
{ "bidAmount": 505 }
```

**Bid rules:**

- Minimum: `currentPrice + 1`
- Maximum: `currentPrice + 10`
- Seller cannot bid on their own auction
- Auction must not be expired

**Race condition handling:** Uses `findOneAndUpdate` with a price condition — if another bid was placed between the read and write, this bid fails with a `409 Conflict` and a retry prompt.

**Response:** `200 OK`

```json
{
  "message": "Bid placed successfully",
  "auction": { ... }
}
```

**Side effect:** Broadcasts `auction:bidPlaced` event to all Socket.io clients in the auction room.

---

### Admin Endpoints

All admin endpoints require authentication + admin role.

![Admin Dashboard](../screenshots/admindashboard.png)

#### `GET /admin/dashboard`

**Response:** `200 OK`

```json
{
  "stats": {
    "activeAuctions": 25,
    "totalAuctions": 100,
    "totalUsers": 500,
    "recentUsers": 15
  },
  "recentAuctions": [ ...last 10 active auctions... ],
  "recentUsersList": [ ...last 10 users... ]
}
```

---

#### `GET /admin/users`

Paginated user list with search, filter, and sort.

**Query Parameters:**
| Param | Default | Description |
|-------|---------|-------------|
| `page` | 1 | Page number |
| `limit` | 10 | Users per page |
| `search` | — | Search by name or email |
| `role` | — | Filter by `user` or `admin` |
| `sortBy` | `createdAt` | Sort field (whitelisted: `createdAt`, `name`, `email`, `role`, `lastLogin`) |
| `sortOrder` | `desc` | `asc` or `desc` |

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "users": [
      {
        "_id": "...",
        "name": "John",
        "email": "john@example.com",
        "role": "user",
        "createdAt": "...",
        "lastLogin": "...",
        "avatar": "..."
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalUsers": 50,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

**Security:** Search input is regex-escaped to prevent ReDoS attacks. Sort fields are whitelisted to prevent sorting by sensitive fields like `password`.

---

### Contact Endpoints

#### `POST /contact`

Submit a contact form. No authentication required.

**Body:**

```json
{
  "name": "Jane",
  "email": "jane@example.com",
  "subject": "Question about auctions",
  "message": "How does bidding work?"
}
```

**Response:** `200 OK`

```json
{ "message": "Message sent succesfully" }
```

**Side effects:** Sends two emails via Resend:

1. Admin notification with form details
2. User confirmation with a copy of their submission

All inputs are HTML-escaped before embedding in email templates to prevent XSS.

---

## Socket.io Real-time Events

### Connection

Socket.io connections are authenticated via JWT extracted from cookies. Unauthenticated connections are rejected.

```
Client connects → Server extracts auth_token from cookie header
    → JWT verified → User looked up in DB → socket.user set
    → Connection accepted
```

### Room Architecture

Each auction page creates a "room" identified by the auction ID. Users are tracked in a `Map<auctionId, Map<socketId, userData>>` structure.

### Events

| Event                | Direction       | Payload                                        | Description                                                                           |
| -------------------- | --------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------- |
| `auction:join`       | Client → Server | `{ auctionId }`                                | Join an auction room. User identity comes from authenticated socket, not the payload. |
| `auction:leave`      | Client → Server | `{ auctionId }`                                | Leave an auction room.                                                                |
| `auction:bid`        | Client → Server | `{ auctionId, bidAmount }`                     | Place a bid via WebSocket. Uses same validation as REST API.                          |
| `auction:userJoined` | Server → Room   | `{ userName, userId, activeUsers[] }`          | Broadcast when a user joins a room.                                                   |
| `auction:userLeft`   | Server → Room   | `{ userName, userId, activeUsers[] }`          | Broadcast when a user leaves.                                                         |
| `auction:bidPlaced`  | Server → Room   | `{ auction, bidderName, bidderId, bidAmount }` | Broadcast when a bid is placed (via REST or Socket).                                  |
| `auction:error`      | Server → Client | `{ message }`                                  | Error message sent only to the requesting client.                                     |

### Memory Safety

- **Disconnect cleanup**: On socket disconnect, all rooms the socket was in are cleaned up
- **Empty room deletion**: When the last user leaves a room, it's deleted from the Map
- **Deduplication**: `getActiveUsers()` deduplicates by userId (handles multiple tabs)

---

## Database Models

### User

```javascript
{
  name: String,              // Required
  email: String,             // Required, unique, validated
  password: String,          // Required, bcrypt hashed
  avatar: String,            // URL
  role: "user" | "admin",    // Default: "user"
  ipAddress: String,
  userAgent: String,
  location: {
    country: String,
    region: String,
    city: String,
    isp: String
  },
  signupAt: Date,
  lastLogin: Date,
  createdAt: Date,           // Mongoose timestamp
  updatedAt: Date
}
```

### Product (Auction)

```javascript
{
  itemName: String,          // Required, trimmed
  itemDescription: String,   // Required
  itemCategory: String,      // Required
  itemPhoto: String,         // Cloudinary URL
  startingPrice: Number,     // Required, min: 1
  currentPrice: Number,      // Updated with each bid
  itemStartDate: Date,       // Default: now
  itemEndDate: Date,         // Required
  seller: ObjectId → User,
  bids: [{
    bidder: ObjectId → User,
    bidAmount: Number,
    bidTime: Date
  }],
  winner: ObjectId → User,   // Auto-set on expiry
  isSold: Boolean,           // Default: false
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:** `itemEndDate`, `seller`, `itemCategory`, `createdAt` — optimized for common queries.

### Login (History)

```javascript
{
  userId: ObjectId → User,
  ipAddress: String,
  userAgent: String,
  location: { country, region, city, isp },
  loginAt: Date              // Auto-expires after ~6 months (TTL index)
}
```

---

## Middleware

### `secureRoute`

Extracts `auth_token` from cookies, verifies JWT, and attaches `req.user = { id, role }` to the request. Returns `401` if missing or invalid.

### `checkAdmin`

Checks `req.user.role === "admin"`. Returns `403` if not admin. Must be used after `secureRoute`.

### `multer` (Cloudinary Storage)

Configured with `multer-storage-cloudinary` — files are uploaded directly to Cloudinary during the request. `req.file.path` contains the Cloudinary URL.

---

## Security

| Concern                | Implementation                                                     |
| ---------------------- | ------------------------------------------------------------------ |
| **Authentication**     | JWT in httpOnly cookies (not accessible via JS)                    |
| **Password storage**   | bcrypt with 10 salt rounds                                         |
| **User enumeration**   | Same error message for wrong email and wrong password              |
| **CORS**               | Origin restricted to `ORIGIN` env var, credentials enabled         |
| **Cookie security**    | `secure: true` + `sameSite: none` in production, scoped `domain`   |
| **Input sanitization** | HTML escaping in email templates, regex escaping in search queries |
| **ReDoS prevention**   | Admin search input is regex-escaped before use                     |
| **Sort injection**     | Whitelist of allowed sort fields in admin users endpoint           |
| **Race conditions**    | Atomic `findOneAndUpdate` with price condition for bids            |
| **Env validation**     | Critical env vars checked at startup, exits if missing             |
| **Socket auth**        | JWT extracted from cookie header and verified before connection    |

---

## Error Handling

- All controllers wrapped in try/catch
- Consistent error response format: `{ message: "...", error: "..." }` or `{ error: "..." }`
- Global `unhandledRejection` and `uncaughtException` handlers trigger graceful shutdown
- Socket errors emit `auction:error` to the requesting client only

---

## Deployment

### Vercel (Serverless)

The `index.js` exports the Express app for Vercel's serverless runtime. The `vercel.json` configures routing. Database connections are cached across invocations.

> **Note:** Socket.io does not work on Vercel's serverless platform. Use the EC2 deployment for full functionality.

### AWS EC2 (Full)

The GitHub Actions workflow at `.github/workflows/deploy.yml`:

1. Triggers on push to `main` (when `server/` files change) or manually
2. SSHs into EC2
3. Pulls latest code
4. Installs production dependencies
5. Writes all env variables to `.env`
6. Restarts the server via PM2

**PM2 commands:**

```bash
pm2 start server.js --name auction-server
pm2 restart auction-server
pm2 logs auction-server
pm2 monit
```

---

## Scripts

| Script  | Command             | Description                 |
| ------- | ------------------- | --------------------------- |
| `dev`   | `nodemon server.js` | Development with hot-reload |
| `start` | `node server.js`    | Production start            |

---

## License

MIT — see [LICENSE](../LICENSE)
