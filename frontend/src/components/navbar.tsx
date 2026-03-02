import { useState, useEffect } from 'react';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

const Navbar = ({ onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on mount and when storage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();

    // Listen for storage changes from other tabs/windows
    window.addEventListener('storage', checkLoginStatus);
    // Listen for custom event from login/signup pages
    window.addEventListener('loginStatusChanged', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('loginStatusChanged', checkLoginStatus);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoClick = () => {
    onNavigate('home');
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    onNavigate('login');
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsOpen(false);
    onNavigate('home');
  };

  const handleAboutClick = () => {
    onNavigate('about');
    setIsOpen(false);
  };

  const handleContactClick = () => {
    onNavigate('contact');
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[linear-gradient(100deg,#03228f_34%,#0e73e4_100%)] shadow-lg">
      <div className="w-full px-4 sm:px-8 py-4 flex items-center justify-between gap-4 sm:gap-8">
        {/* Logo */}
        <button 
          onClick={handleLogoClick}
          className="text-xl sm:text-2xl font-bold text-white cursor-pointer hover:scale-105 transition-transform duration-300 whitespace-nowrap bg-none border-none p-0"
        >
          <img src="../assets/img/logo-light.png" alt="myHosting Log" />
        </button>

        {/* Navigation Menu - Desktop */}
        <ul className="hidden lg:flex list-none gap-8 m-0 p-0">
          <li className="relative group">
            <button 
              onClick={handleLogoClick}
              className="text-white text-lg font-medium transition-colors duration-300 hover:text-opacity-80 pb-2 bg-none border-none p-0 cursor-pointer"
              style={{color: 'white'}}
            >
              Zoho Workspace
            </button>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{backgroundColor: '#D4A855'}}></span>
          </li>
          <li className="relative group">
            <button 
              onClick={handleAboutClick}
              className="text-white text-lg font-medium transition-colors duration-300 hover:text-opacity-80 pb-2 bg-none border-none p-0 cursor-pointer"
              style={{color: 'white'}}
            >
              Microsoft 365
            </button>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{backgroundColor: '#D4A855'}}></span>
          </li>
           <li>
              <button 
                onClick={handleContactClick}
                className="text-white text-lg font-medium hover:text-opacity-80 transition-colors duration-300 block bg-none border-none p-0 w-full cursor-pointer"
                style={{color: 'white'}}
              >
                Web Services
              </button>
            </li>
          <li className="relative group">
            <button 
              onClick={handleContactClick}
              className="text-white text-lg font-medium transition-colors duration-300 hover:text-opacity-80 pb-2 bg-none border-none p-0 cursor-pointer"
              style={{color: 'white'}}
            >
              Contact Us
            </button>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full" style={{backgroundColor: '#D4A855'}}></span>
          </li>
        </ul>

        {/* Login/Logout Button - Desktop */}
        <button 
          onClick={isLoggedIn ? handleLogout : handleLoginClick}
          className="hidden lg:block bg-white text-blue-800 font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
        >
          {isLoggedIn ? 'Logout' : 'Get Domain'}
        </button>

        {/* Hamburger Menu Button - Mobile Only */}
        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 bg-transparent border-none p-0 cursor-pointer gap-1.5"
        >
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-white transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[linear-gradient(100deg,#03228f_34%,#0e73e4_100%)] px-4 py-4">
          <ul className="flex flex-col gap-4 list-none m-0 p-0 text-center">
            <li>
              <button 
                onClick={handleLogoClick}
                className="text-white text-lg font-medium hover:text-opacity-80 transition-colors duration-300 block bg-none border-none p-0 w-full cursor-pointer"
                style={{color: 'white'}}
              >
                Zoho Workspace
              </button>
            </li>
            <li>
              <button 
                onClick={handleAboutClick}
                className="text-white text-lg font-medium hover:text-opacity-80 transition-colors duration-300 block bg-none border-none p-0 w-full cursor-pointer"
                style={{color: 'white'}}
              >
                Microsoft 365
              </button>
            </li>
            <li>
              <button 
                onClick={handleContactClick}
                className="text-white text-lg font-medium hover:text-opacity-80 transition-colors duration-300 block bg-none border-none p-0 w-full cursor-pointer"
                style={{color: 'white'}}
              >
                Web Services
              </button>
            </li>
            <li>
              <button 
                onClick={handleContactClick}
                className="text-white text-lg font-medium hover:text-opacity-80 transition-colors duration-300 block bg-none border-none p-0 w-full cursor-pointer"
                style={{color: 'white'}}
              >
                Contact Us
              </button>
            </li>
            <li className="pt-2">
              <button 
                onClick={isLoggedIn ? handleLogout : handleLoginClick}
                className="w-full bg-white text-blue-800 font-semibold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg cursor-pointer"
              >
                {isLoggedIn ? 'Logout' : 'Get Domain'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}   

export default Navbar;
