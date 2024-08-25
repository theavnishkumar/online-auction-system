# Online Auction System

This is an online auction platform where users can bid on various products. The system is built using React for the frontend, Express for the backend, and MongoDB for the database. The project supports real-time bidding, user authentication, and a countdown timer for each auction.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication and authorization
- Real-time bidding with live updates
- Countdown timer for auctions
- Product categories and search functionality

## Installation

### Prerequisites
- Node.js (v14.x or higher)
- MongoDB (v4.x or higher)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/theavnishkumar/online-auction-system.git
   ```
2. Navigate to the project directory:
   ```bash
   cd online-auction-system
   ```
3. Install dependencies for the backend:
   ```bash
   cd server
   npm install
   ```
4. Install dependencies for the frontend:
   ```bash
   cd ../client
   npm install
   ```
5. Start the MongoDB server and configure the environment variables.
6. Run the backend server:
   ```bash
   cd server
   npm start
   ```
7. Run the frontend development server:
   ```bash
   cd ../client
   npm start
   ```

## Usage

- Once the servers are running, open your browser and navigate to `http://localhost:3000` to access the frontend.
- Register or log in to create or participate in auctions.

## Project Structure

- `server/` - Backend code (Express)
  - `models/` - MongoDB models
  - `controllers/` - Route controllers
  - `routes/` - API routes
  - `config/` - Configuration files
- `client/` - Frontend code (React)
  - `components/` - Reusable React components
  - `pages/` - Application pages
  - `redux/` - Redux slices and store

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure your code follows the project's coding standards.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
