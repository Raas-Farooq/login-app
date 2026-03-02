import { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

const LoginPage = ({ onNavigate }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        // Dispatch custom event to notify navbar
        window.dispatchEvent(new Event('loginStatusChanged'));
        // Redirect to dashboard
        onNavigate('dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login');
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      console.log('Google login response:', credentialResponse);
      
      const response = await fetch('http://localhost:5000/api/auth/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Google login successful:', data);
        localStorage.setItem('token', data.token);
        window.dispatchEvent(new Event('loginStatusChanged'));
        onNavigate('dashboard');
      } else {
        alert(data.message || 'Google login failed');
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert('An error occurred during Google login');
    }
  };

  const handleGoogleError = () => {
    alert('Google login failed');
  };

  const handleFacebookResponse = async (response: any) => {
    try {
      console.log('Facebook login response:', response);

      const facebookResponse = await fetch('http://localhost:5000/api/auth/facebook-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          accessToken: response.accessToken,
          userID: response.userID,
          email: response.email,
          name: response.name,
          picture: response.picture,
        }),
      });

      const data = await facebookResponse.json();

      if (facebookResponse.ok) {
        console.log('Facebook login successful:', data);
        localStorage.setItem('token', data.token);
        window.dispatchEvent(new Event('loginStatusChanged'));
        onNavigate('dashboard');
      } else {
        alert(data.message || 'Facebook login failed');
      }
    } catch (error) {
      console.error('Facebook login error:', error);
      alert('An error occurred during Facebook login');
    }
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div className="w-screen min-h-screen flex items-center justify-center px-4 py-8">
        {/* Login Card */}
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="text-white px-6 md:px-8 py-12 text-center" style={{backgroundColor: '#D4A855'}}>
          <h1 className="text-4xl font-bold mb-2">Login Here</h1>
          <p className="text-white/90">Login to your account</p>
        </div>

        {/* Form Content */}
        <div className="px-6 md:px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                required
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-amber-600 focus:ring-2 focus:ring-amber-200 cursor-pointer"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors duration-300">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>
            <button 
              onClick={() => {
                // Facebook login will be implemented via Facebook SDK
                alert('Facebook login setup: Add your Facebook App ID to the window.fbAsyncInit');
              }}
              className="flex items-center justify-center gap-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300 cursor-pointer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm font-medium text-gray-700">Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-8 text-center border-t border-gray-200 pt-6">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => onNavigate('signup')}
                className="text-amber-600 hover:text-amber-700 font-semibold transition-colors duration-300 bg-none border-none p-0 cursor-pointer"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
