# AI CRM Project

This project is a small CRM application with a React frontend and an Express/MongoDB backend.

## Structure

- `Frontend/` - React application built with Vite
- `Backend/` - Express backend with authentication and lead APIs

## Run locally

### Backend

1. Open a terminal in `Backend/`
2. Create a `.env` file with:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   JWT_SECRET=<your-jwt-secret>
   ```
3. Install dependencies:
   ```powershell
   npm install
   ```
4. Start the backend:
   ```powershell
   npm run dev
   ```

### Frontend

1. Open a terminal in `Frontend/`
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the app:
   ```powershell
   npm run dev
   ```

The frontend will connect to `http://localhost:5000/api` by default.

## Features

- User register and login
- Protected dashboard and lead management
- Add, update, and delete leads
- Simple CRM navigation
