import { Link } from 'react-router-dom';
import { config } from '../../data/config';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 relative mt-16 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-6">
              <img src={config.company.logo.main} alt={config.company.logo.alt} className="h-24 w-auto" />
            </Link>
            <p className="text-xs text-gray-text leading-relaxed mb-6">
              {config.company.tagline}
            </p>
            <div className="flex gap-3">
              <a href={config.socialMedia.linkedin} className="w-8 h-8 social-gradient rounded flex items-center justify-center">
                <i className="fab fa-linkedin-in text-white text-sm"></i>
              </a>
              <a href={config.socialMedia.facebook} className="w-8 h-8 social-gradient rounded flex items-center justify-center">
                <i className="fab fa-facebook-f text-white text-sm"></i>
              </a>
            </div>
          </div>

          {/* Office Hours */}
          <div>
            <h3 className="text-sm font-semibold text-dark-text mb-4">Office Hours</h3>
            <div className="space-y-2 text-xs text-gray-text">
              <p>{config.officeHours.weekdays}</p>
              <p>{config.officeHours.weekend}</p>
              <span className="text-primary block mt-3">{config.officeHours.timezone}</span>
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-sm font-semibold text-dark-text mb-4">Contact Us</h3>
            <div className="space-y-2 text-xs text-gray-text">
              <p>
                {config.contact.address.line1}<br />
                {config.contact.address.line2}<br />
                {config.contact.address.line3}
              </p>
              <p className="pt-2">{config.contact.phone}</p>
              <p>{config.contact.email}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-dark-text mb-4">Quick Links</h3>
            <ul className="space-y-2 text-xs text-gray-text">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-xs text-gray-400">
            Digiscribe Transcription Corp 2026 &copy; All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
