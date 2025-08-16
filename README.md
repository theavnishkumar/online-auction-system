# 🛒 Online Auction System - MERN Stack Web App

![Status](https://img.shields.io/badge/Status-Active-brightgreen)
![License](https://img.shields.io/github/license/theavnishkumar/online-auction-system)
![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-blue)
![Issues](https://img.shields.io/github/issues/theavnishkumar/online-auction-system)
![Forks](https://img.shields.io/github/forks/theavnishkumar/online-auction-system?style=social)
![Stars](https://img.shields.io/github/stars/theavnishkumar/online-auction-system?style=social)
---

An **Online Auction System** built with the **MERN stack (MongoDB, Express, React, Node.js)** that allows users to create auctions, upload images, and bid on products in real-time. Features include a comprehensive **Admin Dashboard** for managing auctions and users, secure authentication, and real-time device tracking.

> 🎓 **Major project / Minor project** for Computer Science Engineering – built by **Avnish Kumar** for full-stack learning and portfolio development.

This system supports secure login via **httpOnly cookies**, tracks device & location on login, role-based access control with admin privileges, and is structured with clean code using modern tools like **Redux Toolkit**, **React Router v7**, and **Cloudinary**.

## Live Preview [Visit Website](https://auction.ihavetech.com)
![image](https://github.com/user-attachments/assets/719ec319-d1d3-4e17-9b0b-ae5db8cfd6b4)

---

## Tech Stack

### Frontend

* React 19 (Vite + JSX)
* Tailwind CSS
* React Router v7+
* Axios
* TanStack Query (React Query)
* Redux Toolkit (for global state)

### Backend

* Node.js + Express.js
* MongoDB + Mongoose
* Multer (image upload)
* JWT Authentication (with `httpOnly` cookies)
* Cloudinary (image hosting)
* Device, Browser, IP, and Geo-location logging

---

## Folder Structure

```
online-auction-system/
├── client/                    # React frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── api/             # API service functions
│   │   ├── assets/          # Images and media
│   │   ├── components/      # Reusable React components
│   │   ├── init/            # Authentication initialization
│   │   ├── layout/          # Layout components (Main, Admin, Open)
│   │   ├── pages/           # Page components
│   │   │   ├── Admin/       # Admin-specific pages
│   │   │   └── legal/       # Legal pages (Privacy, Terms, etc.)
│   │   ├── routers/         # Route configurations
│   │   ├── store/           # Redux store and slices
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── vite.config.js
│
└── server/                   # Express backend
    ├── controllers/         # Request handlers
    ├── middleware/          # Custom middleware (auth, admin check)
    ├── models/             # MongoDB/Mongoose models
    ├── routes/             # API route definitions
    ├── services/           # External service integrations
    ├── utils/              # Utility functions
    ├── connection.js       # Database connection
    ├── index.js           # Server entry point
    └── package.json
```

---

## Environment Variables

### Backend `.env`

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

### Frontend `.env`

```env
VITE_API=http://localhost:3000
VITE_AUCTION_API=http://localhost:3000/auction
```

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/theavnishkumar/online-auction-system.git
cd online-auction-system
```

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env  # or manually create .env
npm run dev
```

### 3. Setup Frontend

```bash
cd ../client
npm install
cp .env.example .env  # or manually create .env
npm run dev
```

### 4. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Admin Panel**: http://localhost:5173/admin (Admin users only)

---

## Deployment

### Frontend Deployment (Vercel)
```bash
cd client
npm run build
# Deploy to Vercel or your preferred hosting platform
```

### Backend Deployment (Railway/Heroku)
```bash
cd server
# Set environment variables in your hosting platform
# Deploy using your preferred method
```

### Production Environment Variables
Make sure to set all required environment variables in your production environment:
- MongoDB connection string
- JWT secret key
- Cloudinary credentials
- Email service API keys
- CORS origins for security

---

## Authentication (via `httpOnly` Secure Cookies)

* Tokens stored in `httpOnly` cookies (not accessible from JS)
* Auth is auto-validated on refresh via `/user` route
* State managed via Redux Toolkit + cookies

### Auth Routes (`/auth`)

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| POST   | `/auth/login`  | Login user (sets cookie) |
| POST   | `/auth/signup` | Register new user        |
| POST   | `/auth/logout` | Logout user              |

### Auto Login Route

| Method | Endpoint | Description                        |
| ------ | -------- | ---------------------------------- |
| GET    | `/user`  | Auto-login if valid cookie present |

---

## Auction Routes (`/auction`)

| Method | Endpoint         | Description                            | Access       |
| ------ | ---------------- | -------------------------------------- | ------------ |
| GET    | `/auction/stats` | Dashboard stats (active, total, user)  | Authenticated |
| GET    | `/auction/`      | Get all auction items                  | Public       |
| POST   | `/auction/`      | Create new auction (with image upload) | Authenticated |
| GET    | `/auction/:id`   | Get single auction item by ID          | Public       |
| POST   | `/auction/:id`   | Place a bid on auction item            | Authenticated |

---

## User Management Routes (`/user`)

| Method | Endpoint        | Description                    | Access       |
| ------ | --------------- | ------------------------------ | ------------ |
| GET    | `/user`         | Get current user profile       | Authenticated |
| PATCH  | `/user`         | Update user password           | Authenticated |
| GET    | `/user/logins`  | Get user login history         | Authenticated |

---

## Contact Routes (`/contact`)

| Method | Endpoint   | Description                | Access |
| ------ | ---------- | -------------------------- | ------ |
| POST   | `/contact` | Submit contact form        | Public |
| GET    | `/contact` | Get contact submissions    | Admin Only |

---

## Key Features

* **User Authentication** with httpOnly cookies and Redux state management
* **Auction Management** - Create, view, and bid on auction items
* **Image Upload** - Cloudinary integration for auction item photos
* **Auto-login** from stored secure cookies
* **User Dashboard** - Track personal auctions and bidding history
* **Admin Dashboard** - Comprehensive admin panel for system management
* **Security Logging** - Track user login activities (IP, location, device)
* **Role-based Access** - User and Admin role management
* **Responsive Design** - Mobile-friendly Tailwind CSS interface
* **RESTful API** - Clean, documented API endpoints

---

## Admin Dashboard Features

The admin dashboard provides comprehensive system management capabilities accessible only to users with admin privileges.

### Dashboard Statistics
- **Active Auctions Count** - Real-time count of ongoing auctions
- **Total Auctions** - Complete auction history statistics  
- **Total Users** - System user count
- **Recent Signups** - New user registrations in the last 7 days

### Recent Active Auctions
- Display of 10 most recent active auctions
- Visual auction cards with seller information
- Quick access to auction details
- Link to view all auctions

### User Management
- **Recent Users Table** - 10 most recently registered users
- **User Information Display**:
  - Profile picture or initials
  - Full name and email address
  - User role (User/Admin) with color-coded badges
  - Account creation date
  - Account status (Active/Inactive)

### Admin Access Control
- **Protected Routes** - Admin-only access via middleware authentication
- **Role Verification** - Server-side role checking for all admin endpoints
- **Navigation Integration** - Admin panel link appears only for admin users
- **Secure API Endpoints** - All admin APIs require proper authentication

### Admin API Endpoints

| Method | Endpoint           | Description                    | Access    |
| ------ | ------------------ | ------------------------------ | --------- |
| GET    | `/admin/dashboard` | Get admin dashboard statistics | Admin Only |
| GET    | `/admin/users`     | Get users with pagination     | Admin Only |

---

## Login Security Logging

* IP Address
* Country and State (via GeoIP)
* Device Type
* Browser Type/Version
* Used to detect abnormal behavior and prevent abuse

---

## State Management

* **Redux Toolkit** used for global auth state
* Combined with **TanStack Query** for caching API responses
* Ensures smooth sync between client and backend

---

## Features Status

### Completed Features
- **User Authentication** - Login, signup, logout with secure cookies
- **Auction Management** - Create, view, bid on auctions
- **Image Upload** - Cloudinary integration for auction photos
- **User Dashboard** - Personal auction and bidding management
- **Admin Dashboard** - Complete admin panel with statistics and user management
- **Security Logging** - Login tracking with device and location info
- **Role-based Access** - User and admin role separation
- **Contact System** - Contact form with admin management
- **Responsive Design** - Mobile-friendly interface
- **Error Handling** - Comprehensive error management
- **API Documentation** - Well-documented RESTful endpoints

### Upcoming Features
- **Real-time Bidding** - WebSocket integration for live auction updates
- **Push Notifications** - Real-time notifications for bid updates
- **Payment Integration** - Secure payment processing for winning bids
- **Advanced Search** - Filter and search auctions by category, price, etc.
- **Auction Categories** - Organize auctions by categories
- **User Ratings** - Rating system for buyers and sellers
- **Email Notifications** - Automated email alerts for auction activities
- **Advanced Admin Tools** - User management, auction moderation

---

## Troubleshooting

### Common Issues and Solutions

#### Cookie Authentication Issues
```bash
# Make sure CORS is properly configured in server
# Check that httpOnly cookies are enabled
# Verify JWT_SECRET is set in environment variables
```

#### Image Upload Problems
```bash
# Verify Cloudinary credentials in .env
# Check multer middleware configuration
# Ensure proper file size limits
```

#### Database Connection Issues
```bash
# Verify MongoDB connection string
# Check network connectivity
# Ensure database user has proper permissions
```

#### Admin Access Problems
```bash
# Verify user role is set to 'admin' in database
# Check admin middleware authentication
# Ensure proper login credentials
```

---

## Contribution Guide

We welcome contributions! Here's how you can help improve the project:

### How to Contribute

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/online-auction-system.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Install dependencies**
   ```bash
   # Backend
   cd server && npm install
   
   # Frontend  
   cd ../client && npm install
   ```

4. **Make your changes**
   - Follow existing code style and conventions
   - Add comments for complex logic
   - Update documentation if needed

5. **Test your changes**
   ```bash
   # Test backend
   cd server && npm test
   
   # Test frontend
   cd client && npm run test
   ```

6. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

### Areas for Contribution
- **Bug Fixes** - Help identify and fix issues
- **New Features** - Implement upcoming features
- **Documentation** - Improve README and code comments
- **UI/UX** - Enhance user interface and experience
- **Security** - Strengthen security measures
- **Performance** - Optimize application performance
- **Testing** - Add unit and integration tests

### Development Guidelines
- Use meaningful commit messages (conventional commits preferred)
- Keep functions small and focused
- Follow existing naming conventions
- Add proper error handling
- Update README for new features

---

## API Reference

### Authentication Responses
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "user"
  }
}
```

### Auction Data Structure
```json
{
  "id": "auction_id",
  "itemName": "Product Name",
  "description": "Product description",
  "startingBid": 100,
  "currentBid": 150,
  "itemEndDate": "2025-12-31T23:59:59.000Z",
  "seller": {
    "id": "seller_id",
    "name": "Seller Name"
  },
  "image": "cloudinary_url",
  "bids": [
    {
      "bidder": "bidder_id",
      "amount": 150,
      "timestamp": "2025-08-16T10:30:00.000Z"
    }
  ]
}
```

### Admin Dashboard Response
```json
{
  "stats": {
    "activeAuctions": 25,
    "totalAuctions": 100,
    "totalUsers": 500,
    "recentUsers": 15
  },
  "recentAuctions": [...],
  "recentUsersList": [...]
}
```

---

## License

This project is licensed under the **[MIT](LICENSE)**.

---

## Author

Developed by [Avnish Kumar](https://github.com/theavnishkumar). Built for educational, security-focused, and full-stack learning purposes.
