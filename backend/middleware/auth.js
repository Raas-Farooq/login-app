import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'your-secret-key';

    console.log('Auth Middleware - Token:', token ? 'Present' : 'Missing');
    console.log('Auth Middleware - Secret:', secret);

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, secret);
    console.log('Token verified successfully:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

export default authMiddleware;
