import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <div className="w-screen">
      {/* Hero Section */}
      <div className="relative w-full h-80 md:h-96 bg-cover bg-center overflow-hidden" style={{backgroundColor: '#D4A855'}}>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">Contact Us</h1>
          <p className="text-lg md:text-xl text-white drop-shadow-md">We're here to help. Get in touch with us today!</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="w-full px-4 md:px-8 py-16 md:py-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-white border-2 border-gray-200 p-8 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl mb-4" style={{color: '#D4A855'}}>📞</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Phone</h3>
              <a href="tel:03458777762" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                0345 8777762
              </a>
            </div>

            <div className="bg-white border-2 border-gray-200 p-8 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl mb-4" style={{color: '#D4A855'}}>📍</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Address</h3>
              <p className="text-gray-600">
                Arfa Tower<br />
                Feroze pur road<br />
                Lahore, Pakistan
              </p>
            </div>

            <div className="bg-white border-2 border-gray-200 p-8 rounded-lg text-center hover:shadow-lg transition-shadow duration-300">
              <div className="text-3xl mb-4" style={{color: '#D4A855'}}>⏰</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Working Hours</h3>
              <p className="text-gray-600">
                Mon - Fri: 9:00 - 18:00<br />
                Sat: 10:00 - 14:00<br />
                Sun: Closed
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us your message..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
