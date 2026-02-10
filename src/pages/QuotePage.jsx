import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { config } from '../data/config';

export default function QuotePage() {
  const animationRef = useScrollAnimation();

  useEffect(() => {
    document.title = 'Get Quote - DigiScribe Transcription Corp.';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const heroContent = (
    <main className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-semibold gradient-text text-center mb-10">Get Quote</h1>

        {/* Contact Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Contact Information Card */}
            <div className="lg:w-2/5 relative overflow-hidden min-h-[520px]" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)' }}>
              {/* Decorative wave pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 600" preserveAspectRatio="none">
                  <path d="M0,100 Q100,150 200,100 T400,100 L400,600 L0,600 Z" fill="white" />
                  <path d="M0,200 Q100,250 200,200 T400,200 L400,600 L0,600 Z" fill="white" opacity="0.5" />
                  <path d="M0,300 Q100,350 200,300 T400,300 L400,600 L0,600 Z" fill="white" opacity="0.3" />
                </svg>
              </div>

              <div className="relative z-10 p-8 lg:p-10 text-white">
                <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                <p className="text-cyan-100 text-sm mb-10">Contact us now!</p>

                <div className="space-y-8">
                  {/* Phone */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 shadow-lg">
                      <i className="fas fa-phone text-white text-lg"></i>
                    </div>
                    <div>
                      <p className="text-cyan-100 text-xs mb-1">Call Us</p>
                      <span className="text-white font-medium">{config.contact.phone}</span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 shadow-lg">
                      <i className="fas fa-envelope text-white text-lg"></i>
                    </div>
                    <div>
                      <p className="text-cyan-100 text-xs mb-1">Email Us</p>
                      <span className="text-white font-medium text-sm">{config.contact.email}</span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-all duration-300 shadow-lg">
                      <i className="fas fa-map-marker-alt text-white text-lg"></i>
                    </div>
                    <div>
                      <p className="text-cyan-100 text-xs mb-1">Visit Us</p>
                      <span className="text-white font-medium text-sm leading-relaxed">
                        {config.contact.address.line1}<br />
                        {config.contact.address.line2}<br />
                        {config.contact.address.line3}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-12 pt-8 border-t border-white/20">
                  <p className="text-cyan-100 text-xs mb-4">Follow Us</p>
                  <div className="flex gap-3">
                    <a href={config.socialMedia.linkedin} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                      <i className="fab fa-linkedin-in text-white"></i>
                    </a>
                    <a href={config.socialMedia.facebook} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                      <i className="fab fa-facebook-f text-white"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative circles */}
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/10 rounded-full"></div>
              <div className="absolute bottom-24 right-8 w-24 h-24 bg-cyan-300/20 rounded-full blur-xl"></div>
              <div className="absolute top-20 -left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl"></div>
            </div>

            {/* Right Side - Form */}
            <div className="lg:w-3/5 p-8 lg:p-12 bg-gradient-to-br from-white to-sky-50/30">
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-dark-text mb-2">Send us a Message</h3>
                <p className="text-sm text-gray-text">Fill out the form below and we'll get back to you shortly.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-dark-text mb-2">First Name</label>
                    <input type="text" placeholder="Enter your first name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-dark-text mb-2">Last Name</label>
                    <input type="text" placeholder="Enter your last name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white" />
                  </div>
                </div>

                {/* Email & Contact Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-dark-text mb-2">Email Address</label>
                    <input type="email" placeholder="your@email.com" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-dark-text mb-2">Contact Number</label>
                    <input type="tel" placeholder="+63 XXX XXX XXXX" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all bg-white" />
                  </div>
                </div>

                {/* Subject Selection */}
                <div>
                  <label className="block text-xs font-medium text-dark-text mb-4">Select Subject</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <label className="relative cursor-pointer">
                      <input type="radio" name="subject" value="service-details" className="peer sr-only" defaultChecked />
                      <div className="px-4 py-2.5 rounded-lg border-2 border-gray-200 text-center text-xs text-gray-600 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all hover:border-primary/50">
                        Service Details
                      </div>
                    </label>
                    <label className="relative cursor-pointer">
                      <input type="radio" name="subject" value="service-status" className="peer sr-only" />
                      <div className="px-4 py-2.5 rounded-lg border-2 border-gray-200 text-center text-xs text-gray-600 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all hover:border-primary/50">
                        Service Status
                      </div>
                    </label>
                    <label className="relative cursor-pointer">
                      <input type="radio" name="subject" value="general-inquiry" className="peer sr-only" />
                      <div className="px-4 py-2.5 rounded-lg border-2 border-gray-200 text-center text-xs text-gray-600 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all hover:border-primary/50">
                        General Inquiry
                      </div>
                    </label>
                    <label className="relative cursor-pointer">
                      <input type="radio" name="subject" value="transcription" className="peer sr-only" />
                      <div className="px-4 py-2.5 rounded-lg border-2 border-gray-200 text-center text-xs text-gray-600 peer-checked:border-primary peer-checked:bg-primary/5 peer-checked:text-primary transition-all hover:border-primary/50">
                        Transcription
                      </div>
                    </label>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-medium text-dark-text mb-2">Message</label>
                  <textarea rows="4" placeholder="Write your message here..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none bg-white"></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button type="submit" className="btn-gradient text-white px-8 py-3.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 flex items-center gap-2">
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <Layout heroContent={heroContent}>
      <div ref={animationRef}>
        {/* No content below the hero for this page */}
      </div>
    </Layout>
  );
}
