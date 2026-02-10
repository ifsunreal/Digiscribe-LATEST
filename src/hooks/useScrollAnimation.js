import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollAnimation() {
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const container = ref.current;
    if (container) {
      const elements = container.querySelectorAll(
        '.fade-in-up, .fade-in, .slide-in-left, .slide-in-right, .scale-in'
      );
      elements.forEach((el) => {
        el.classList.remove('animate');
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, [location.pathname]);

  return ref;
}
