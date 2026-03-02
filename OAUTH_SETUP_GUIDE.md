# OAuth Setup Guide

## Basic Setup Complete! ✅

The frontend OAuth integration and backend OAuth routes have been set up. Here's what you need to do next:

### 1. Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized origins: `http://localhost:5173`
6. Add authorized redirect URIs: `http://localhost:5173`
7. Copy your **Client ID**

### 2. Get Facebook OAuth Credentials

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app (if you don't have one)
3. Add Facebook Login product
4. In Settings > Basic, copy your **App ID**
5. In Facebook Login > Settings, add Site URL: `http://localhost:5173`

### 3. Update Frontend Configuration

**File:** `frontend/src/components/loginPage.tsx`

Replace `YOUR_GOOGLE_CLIENT_ID` with your actual Google Client ID:

```tsx
<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
```

### 4. Set Up Backend OAuth Verification (Next Steps)

Install required packages:

```bash
cd backend
npm install google-auth-library jsonwebtoken
```

Update `backend/routes/auth.js` in the Google and Facebook login routes to verify tokens:

#### For Google (sample):
```javascript
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/google-login', async (req, res) => {
  try {
    const { token } = req.body;
    
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;
    
    // Find or create user with email
    let user = await User.findOne({ email });
    
    if (!user) {
      user = new User({ 
        email, 
        username: name || email.split('@')[0],
        password: Math.random().toString(36).slice(-8) // Random password for OAuth users
      });
      await user.save();
    }
    
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(200).json({
      message: 'Google login successful',
      token: jwtToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Google login error:', error);
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
});
```

#### For Facebook (sample):
```javascript
router.post('/facebook-login', async (req, res) => {
  try {
    const { accessToken, email, name } = req.body;
    
    // Verify token with Facebook
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture`
    );
    
    if (!response.ok) {
      return res.status(401).json({ message: 'Invalid Facebook token' });
    }
    
    const facebookData = await response.json();
    
    // Find or create user
    let user = await User.findOne({ email: email || facebookData.email });
    
    if (!user) {
      user = new User({ 
        email: email || facebookData.email, 
        username: name || facebookData.name || `user_${facebookData.id}`,
        password: Math.random().toString(36).slice(-8)
      });
      await user.save();
    }
    
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );
    
    res.status(200).json({
      message: 'Facebook login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Facebook login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
```

### 5. Add Environment Variables

Create or update `.env` in backend:

```
GOOGLE_CLIENT_ID=your_google_client_id
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

### 6. Current Status

- ✅ Frontend OAuth UI buttons implemented
- ✅ OAuth packages installed
- ✅ Backend routes created (skeleton)
- ⏳ Backend token verification (needs implementation)
- ⏳ Facebook SDK (optional - for client-side login)

### Testing

1. Start your backend: `npm start` (in backend folder)
2. Start your frontend: `npm run dev` (in frontend folder)
3. Navigate to login page
4. Click Google or Facebook button
5. Check console logs for token and errors

### Notes

- Google OAuth is recommended for best compatibility
- Facebook OAuth requires server-side token verification
- Tokens are automatically stored in localStorage
- User authentication state syncs with navbar
