const About = () => {
  return (
    <div className="w-screen">
      {/* Hero Section */}
      <div className="relative w-full h-96 md:h-96 bg-cover bg-center overflow-hidden" style={{backgroundColor: '#D4A855'}}>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">About Us</h1>
          <p className="text-lg md:text-xl text-white drop-shadow-md">Learn more about our mission and values</p>
        </div>
      </div>

      {/* About Content */}
      <div className="w-full px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Main About */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Welcome to Corn Login App</h2>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
              Your one-stop solution for all your needs. We are dedicated to providing a seamless and secure authentication experience for users worldwide. Our platform is designed with simplicity and security at its core.
            </p>
          </div>

          {/* Mission */}
          <div className="mb-12 bg-gradient-to-r from-amber-50 to-yellow-50 p-8 rounded-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              To provide a reliable, user-friendly, and secure authentication platform that empowers individuals and businesses to manage their digital presence with confidence.
            </p>
          </div>

          {/* Values */}
          <div className="mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Security</h4>
                <p className="text-gray-600">Your data is protected with industry-leading security protocols and encryption standards.</p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Simplicity</h4>
                <p className="text-gray-600">We believe in making things easy. Our interface is intuitive and user-friendly.</p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-lg hover:shadow-lg transition-shadow duration-300">
                <h4 className="text-xl font-bold text-gray-800 mb-3">Reliability</h4>
                <p className="text-gray-600">24/7 uptime and dedicated support ensure you're always connected when needed.</p>
              </div>
            </div>
          </div>

          {/* Team Info */}
          <div className="bg-gradient-to-r from-stone-100 to-stone-50 p-8 rounded-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Get in Touch</h3>
            <p className="text-gray-700 text-base md:text-lg mb-6">
              Have questions about us or our services? We'd love to hear from you. Reach out to our team anytime.
            </p>
            <div className="space-y-3">
              <p className="text-gray-700"><span className="font-semibold">Phone:</span> 0345 8777762</p>
              <p className="text-gray-700"><span className="font-semibold">Address:</span> Arfa Tower, Feroze pur road, Lahore</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
