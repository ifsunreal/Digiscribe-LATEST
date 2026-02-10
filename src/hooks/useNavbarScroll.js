import { useEffect, useRef } from 'react';

export function useNavbarScroll(headerRef) {
  const scrollTimeout = useRef(null);
  const isScrolling = useRef(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    header.classList.add('nav-visible');
    if (window.scrollY > 10) {
      header.classList.add('nav-scrolled');
    }

    const handleScroll = () => {
      isScrolling.current = true;
      header.classList.add('nav-visible');

      if (window.scrollY > 10) {
        header.classList.add('nav-scrolled');
      } else {
        header.classList.remove('nav-scrolled');
      }

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if (window.scrollY > 50) {
          header.classList.remove('nav-visible');
        }
        isScrolling.current = false;
      }, 1500);
    };

    const handleMouseMove = (e) => {
      if (e.clientY < 100) {
        header.classList.add('nav-visible');
        clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          if (!isScrolling.current && e.clientY >= 100 && window.scrollY > 50) {
            header.classList.remove('nav-visible');
          }
        }, 1500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(scrollTimeout.current);
    };
  }, [headerRef]);
}
