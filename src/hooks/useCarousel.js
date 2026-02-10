import { useState, useRef, useEffect, useCallback } from 'react';

export function useCarousel(totalSlides, autoPlayInterval = 2000) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragDelta = useRef(0);

  const goTo = useCallback((index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    const newIndex = ((index % totalSlides) + totalSlides) % totalSlides;
    setCurrentSlide(newIndex);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalSlides]);

  const next = useCallback(() => {
    goTo(currentSlide + 1);
  }, [currentSlide, goTo]);

  const prev = useCallback(() => {
    goTo(currentSlide - 1);
  }, [currentSlide, goTo]);

  const startAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIsAnimating((animating) => {
        if (!animating) {
          setCurrentSlide((prev) => (prev + 1) % totalSlides);
          setTimeout(() => setIsAnimating(false), 500);
          return true;
        }
        return animating;
      });
    }, autoPlayInterval);
  }, [totalSlides, autoPlayInterval]);

  const resetAutoPlay = useCallback(() => {
    clearInterval(intervalRef.current);
    startAutoPlay();
  }, [startAutoPlay]);

  // Auto-play
  useEffect(() => {
    startAutoPlay();
    return () => clearInterval(intervalRef.current);
  }, [startAutoPlay]);

  // Mouse/Touch drag handlers
  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    startX.current = e.clientX || e.touches?.[0]?.clientX || 0;
    dragDelta.current = 0;
    clearInterval(intervalRef.current);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    dragDelta.current = currentX - startX.current;
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (dragDelta.current > 50) {
      prev();
    } else if (dragDelta.current < -50) {
      next();
    }
    resetAutoPlay();
  }, [prev, next, resetAutoPlay]);

  // Get slide class based on position relative to current
  const getSlideClass = useCallback((index) => {
    if (index === currentSlide) return 'active';
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentSlide + 1) % totalSlides;
    if (index === prevIndex) return 'prev';
    if (index === nextIndex) return 'next';
    return '';
  }, [currentSlide, totalSlides]);

  return {
    currentSlide,
    next,
    prev,
    goTo,
    getSlideClass,
    containerRef,
    resetAutoPlay,
    handlers: {
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseUp,
      onTouchStart: handleMouseDown,
      onTouchMove: handleMouseMove,
      onTouchEnd: handleMouseUp,
    },
  };
}
