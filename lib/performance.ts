// Performance optimization script
export const initPerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = [
    'https://i.imgur.com/mqDrhio.jpeg', // Hero background
    'https://i.imgur.com/IsqWKo2.jpeg', // App preview
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });

  // Intersection Observer for lazy loading
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset?.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    // Observe lazy images when DOM is ready
    const observeLazyImages = () => {
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeLazyImages);
    } else {
      observeLazyImages();
    }
  }
};

// Auto-initialize
if (typeof window !== 'undefined') {
  initPerformanceOptimizations();
}
