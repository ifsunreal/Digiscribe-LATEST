import { Link } from 'react-router-dom';

export default function BackToServices({ href, label }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <Link
        to={href || '/services'}
        className="inline-flex items-center gap-2 text-gray-text hover:text-primary transition-colors text-sm"
      >
        <i className="fas fa-arrow-left"></i>
        <span>Back to</span>
        <span className="text-primary font-medium">{label || 'Services'}</span>
      </Link>
    </div>
  );
}
