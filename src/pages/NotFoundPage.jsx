import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

export default function NotFoundPage() {
  useEffect(() => {
    document.title = '404 - Page Not Found - DigiScribe Transcription Corp.';
  }, []);

  const heroContent = (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-6">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-dark-text mb-4">Page Not Found</h2>
        <p className="text-gray-text text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 btn-gradient text-white px-6 py-3 rounded-full text-sm font-medium transition-all hover:shadow-lg"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Home
        </Link>
      </div>
    </section>
  );

  return (
    <Layout heroContent={heroContent}>
      {/* No additional content */}
    </Layout>
  );
}
