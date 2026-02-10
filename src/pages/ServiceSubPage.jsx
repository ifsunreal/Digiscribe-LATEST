import { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ServiceSubPageTemplate from '../components/services/ServiceSubPageTemplate';
import { serviceSubPages } from '../data/serviceSubPages';

export default function ServiceSubPage() {
  const { categorySlug, serviceSlug } = useParams();

  // Build the lookup key
  const key = serviceSlug ? `${categorySlug}/${serviceSlug}` : categorySlug;
  const data = serviceSubPages[key];

  useEffect(() => {
    if (data) {
      document.title = `${data.title} - DigiScribe Transcription Corp.`;
    }
  }, [data]);

  if (!data) {
    return <Navigate to="/services" replace />;
  }

  return (
    <Layout>
      <ServiceSubPageTemplate data={data} />
    </Layout>
  );
}
