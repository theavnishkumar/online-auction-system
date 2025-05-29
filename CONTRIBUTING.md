# Contributing Guidelines

Hi there!
Thanks for showing interest in contributing to the **Online Auction System**. We welcome all kinds of contributions — code, design, documentation, or suggestions.

## Project Tech Stack

* Frontend: React + Redux Toolkit + Tailwind CSS
* Backend: Node.js + Express + MongoDB
* State Management: Redux Toolkit
* Routing: React Router v7+
* API Handling: Axios + TanStack Query
* Authentication: JWT + Session checks

---

## 🛠 How to Contribute

### 1. Fork the Repository

Click on the **Fork** button (top-right) and create your own copy.

### 2. Clone the Repo

```bash
git clone https://github.com/your-username/online-auction-system.git
cd online-auction-system
```

### 3. Setup Project Locally

* Install frontend and backend dependencies:

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

* Setup `.env` file (see `.env.example` if provided)

### 4. Create a New Branch

```bash
git checkout -b feature/your-feature-name
```

### 5. Make Your Changes

Follow existing code structure (MVC pattern, ES Modules). Use clear variable names and write clean, readable code.

### 6. Commit Your Changes

```bash
git add .
git commit -m "Added: Short description of your change"
```

### 7. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then go to GitHub and open a Pull Request with a clear explanation.

---

## Code Style Guidelines

* Use **ESLint** rules if defined
* Use **ES Modules** (`import`/`export`)
* Use consistent indentation (2 or 4 spaces)
* Write clear commit messages (e.g. `Fix: login bug in auth middleware`)

---

## Need Help?

Feel free to open an issue for doubts, questions, or suggestions.
Let's make this project better together

---

Made with ❤️ by [@theavnishkumar](https://github.com/theavnishkumar)
