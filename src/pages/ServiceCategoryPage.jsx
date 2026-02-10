import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ServiceCategoryTemplate from '../components/services/ServiceCategoryTemplate';
import serviceCategories from '../data/serviceCategories';

export default function ServiceCategoryPage() {
  const { categorySlug } = useParams();
  const raw = serviceCategories[categorySlug];

  useEffect(() => {
    if (raw) {
      document.title = `${raw.pageTitle} - DigiScribe Transcription Corp.`;
    }
  }, [raw]);

  if (!raw) {
    return <Navigate to="/services" replace />;
  }

  // Map data keys to template expectations
  const data = {
    title: raw.pageTitle,
    backLink: raw.backLink,
    backLabel: raw.backLabel,
    description: raw.description,
    subServices: raw.services,
    ctaCard: raw.cta,
  };

  return (
    <Layout>
      <ServiceCategoryTemplate data={data} />
    </Layout>
  );
}
