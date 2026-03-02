# Login App Backend

## Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Create a `.env` file with:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### 3. Run Server
```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

---

## API Endpoints

### Authentication Routes

#### 1. **Sign Up**
- **URL:** `POST /api/auth/signup`
- **Body:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
  ```

#### 2. **Login**
- **URL:** `POST /api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
  ```

#### 3. **Get Profile** (Protected)
- **URL:** `GET /api/auth/profile`
- **Headers:** `Authorization: Bearer {token}`
- **Response:**
  ```json
  {
    "user": {
      "id": "user_id",
      "username": "john_doe",
      "email": "john@example.com"
    }
  }
  ```

---

## Database Schema

### User Model
```javascript
{
  username: String (unique, required, 3-30 chars),
  email: String (unique, required, valid email),
  password: String (required, hashed, min 6 chars),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Features

✅ User Registration with validation
✅ Secure password hashing (bcryptjs)
✅ JWT-based authentication
✅ Password comparison
✅ Protected routes
✅ MongoDB integration
✅ CORS enabled for frontend

---

## Errors Handled

- Missing required fields
- Duplicate email/username
- Invalid password
- Incorrect login credentials
- Invalid JWT token
- Server errors

---

## Security

- Passwords are hashed with bcryptjs (salt rounds: 10)
- JWT tokens expire in 7 days
- CORS restricted to frontend origin
- Input validation on all endpoints
