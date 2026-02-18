import { useEffect, useRef } from 'react';

export function useNavbarScroll(headerRef) {
  const scrollTimeout = useRef(null);
  const isScrolling = useRef(false);
  const isMouseOverHeader = useRef(false);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    header.classList.add('nav-visible');
    if (window.scrollY > 10) {
      header.classList.add('nav-scrolled');
    }

    const scheduleHide = () => {
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        if (window.scrollY > 50 && !isMouseOverHeader.current) {
          header.classList.remove('nav-visible');
        }
        isScrolling.current = false;
      }, 1500);
    };

    const handleHeaderMouseEnter = () => {
      isMouseOverHeader.current = true;
      header.classList.add('nav-visible');
      clearTimeout(scrollTimeout.current);
    };

    const handleHeaderMouseLeave = () => {
      isMouseOverHeader.current = false;
      if (window.scrollY > 50) {
        scheduleHide();
      }
    };

    const handleScroll = () => {
      isScrolling.current = true;
      header.classList.add('nav-visible');

      if (window.scrollY > 10) {
        header.classList.add('nav-scrolled');
      } else {
        header.classList.remove('nav-scrolled');
      }

      scheduleHide();
    };

    const handleMouseMove = (e) => {
      if (e.clientY < 100) {
        header.classList.add('nav-visible');
        scheduleHide();
      }
    };

    header.addEventListener('mouseenter', handleHeaderMouseEnter);
    header.addEventListener('mouseleave', handleHeaderMouseLeave);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      header.removeEventListener('mouseenter', handleHeaderMouseEnter);
      header.removeEventListener('mouseleave', handleHeaderMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(scrollTimeout.current);
    };
  }, [headerRef]);
}
