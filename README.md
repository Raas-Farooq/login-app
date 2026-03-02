# Corn Login App - Full Stack

A complete authentication system built with React, Express, and MongoDB.

## 📁 Project Structure

```
login-app/
├── frontend/          (React + Vite + Tailwind)
│   ├── src/
│   ├── package.json
│   └── vite.config.ts
├── backend/           (Express + MongoDB)
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
├── package.json       (Root - concurrently)
└── README.md
```

## 🚀 Quick Start

### 1. Install All Dependencies

From the **root folder**:

```bash
npm run install-all
```

This will install dependencies for:
- Root (concurrently)
- Frontend
- Backend

### 2. Run Both Servers

From the **root folder**:

```bash
npm run dev
```

This starts both servers simultaneously:
- **Frontend**: http://localhost:5173 (Vite)
- **Backend**: http://localhost:5000 (Express)

### 3. Or Run Separately

```bash
# Frontend only
npm run frontend

# Backend only
npm run backend
```

## 📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run frontend + backend together |
| `npm start` | Production mode (both servers) |
| `npm run frontend` | Frontend dev server only |
| `npm run backend` | Backend dev server only |
| `npm run install-all` | Install all dependencies |

## 🔧 Environment Setup

### Backend (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 📚 API Documentation

See [backend/README.md](./backend/README.md) for full API documentation.

### Key Endpoints

- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get profile (protected)

## 🛠️ Tech Stack

### Frontend
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Backend
- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs (Password hashing)

## 📝 Features

✅ User registration with validation
✅ Secure login with JWT
✅ Password hashing (bcryptjs)
✅ MongoDB integration
✅ Protected routes
✅ CORS enabled
✅ Auto-reload with nodemon
✅ Concurrent dev servers

## 🔐 Security

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens expire in 7 days
- CORS restricted to frontend origin
- Input validation on all endpoints

## 📦 Dependencies

### Root
- `concurrently` - Run multiple npm scripts

### Frontend
- `react` - UI library
- `vite` - Build tool
- `tailwindcss` - Styling
- `@tailwindcss/postcss` - Tailwind integration

### Backend
- `express` - Server framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - JWT auth
- `bcryptjs` - Password hashing
- `cors` - Cross-origin requests
- `dotenv` - Environment variables

## 🎯 Next Steps

1. ✅ Install dependencies: `npm run install-all`
2. ✅ Run dev servers: `npm run dev`
3. ✅ Connect frontend login to API
4. ✅ Test signup and login flows
5. Add more features (password reset, profile update, etc.)

## 📞 Support

For issues, check:
- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

---

**Happy Coding!** 🚀
