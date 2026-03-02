import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(409).json({ 
        message: `${existingUser.email === email ? 'Email' : 'Username'} already exists` 
      });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate JWT token
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    console.log('SIGNUP - Generating token with secret:', JWT_SECRET);
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('SIGNUP - Token generated:', token.substring(0, 50) + '...');

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    console.log('LOGIN - Generating token with secret:', JWT_SECRET);
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );
    console.log('LOGIN - Token generated:', token.substring(0, 50) + '...');

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/auth/profile
// @desc    Get user profile (protected route)
// @access  Private
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/google-login
// @desc    Google OAuth login
// @access  Public
router.post('/google-login', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Google token is required' });
    }

    // TODO: Verify token with Google
    // For now, we'll extract user info from token payload
    // In production, use: const ticket = await client.verifyIdToken({idToken: token});

    // For development, you can decode the JWT (not recommended in production)
    // Use google-auth-library in production: npm install google-auth-library

    console.log('Google login - Token received (verification skipped in dev)');

    // For now, create a generic user or return error asking to verify
    return res.status(501).json({ 
      message: 'Google OAuth verification not yet configured. Please set up Google credentials.',
      instruction: 'Install: npm install google-auth-library and configure OAuth'
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/auth/facebook-login
// @desc    Facebook OAuth login
// @access  Public
router.post('/facebook-login', async (req, res) => {
  try {
    const { accessToken, userID, email, name } = req.body;

    if (!accessToken || !userID) {
      return res.status(400).json({ message: 'Facebook token and userID are required' });
    }

    // TODO: Verify token with Facebook
    // In production, verify the token server-side

    console.log('Facebook login - User:', { userID, email, name });

    // For now, return error asking to verify
    return res.status(501).json({ 
      message: 'Facebook OAuth verification not yet configured. Please configure Facebook OAuth.',
      instruction: 'Set up server-side Facebook token verification'
    });
  } catch (error) {
    console.error('Facebook login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/receiveData', async (req, res) => { 
    try{
        const data = req.body; 
        console.log("this is the data: ", data);
    }catch(error){
        console.error('Error receiving data:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
    
 }

)

export default router;
