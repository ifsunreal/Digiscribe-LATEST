import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import QuotePage from './pages/QuotePage';
import ServiceCategoryPage from './pages/ServiceCategoryPage';
import ServiceSubPage from './pages/ServiceSubPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/services/:categorySlug" element={<ServiceCategoryPage />} />
        <Route path="/services/:categorySlug/:serviceSlug" element={<ServiceSubPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
