const Footer = () => {
  return (
    <footer className="w-full text-white" style={{backgroundColor: '#D4A855'}}>
      <div className="w-full px-4 md:px-8 py-12 md:py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
          {/* App Info */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">Corn Login App</h3>
            <p className="text-white/80 text-sm md:text-base">Your one-stop solution for all your needs.</p>
          </div>

          {/* Phone */}
          <div className="text-center">
            <h4 className="text-lg md:text-xl font-semibold mb-2">Phone</h4>
            <a href="tel:03458777762" className="text-white/80 hover:text-white transition-colors duration-300 text-sm md:text-base">
              0345 8777762
            </a>
          </div>

          {/* Address */}
          <div className="text-center md:text-right">
            <h4 className="text-lg md:text-xl font-semibold mb-2">Address</h4>
            <p className="text-white/80 text-sm md:text-base">Arfa Tower, Feroze pur road, Lahore</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8"></div>

        {/* Bottom Section */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; 2026 Corn Login App. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/80 hover:text-white transition-colors duration-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors duration-300 text-sm">Terms of Service</a>
            <a href="#" className="text-white/80 hover:text-white transition-colors duration-300 text-sm">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
