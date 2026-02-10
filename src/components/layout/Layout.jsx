import BackgroundBlobs from './BackgroundBlobs';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, heroContent }) {
  return (
    <div className="font-poppins">
      <BackgroundBlobs />
      <div className="hero-gradient">
        <Navbar />
        {heroContent}
      </div>
      {children}
      <Footer />
    </div>
  );
}
