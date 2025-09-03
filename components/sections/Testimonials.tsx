"use client";

import React, { useState, useRef, MouseEvent } from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';
import { WHATSAPP_LINKS } from '@/constants/links';

const Testimonials = () => {
  const t = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (containerRef.current) {
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    if (containerRef.current) {
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  // Video/podcast cards data with YouTube video IDs
  const cards = [
    {
      id: 1,
      title: "All Price",
      subtitle: "Micael",
      playIcon: "/assets/icons/play-icon.svg",
      logo: "/assets/logo/allprice-profile.svg",
      youtubeId: "jz_POR6Ow08"
    },
    {
      id: 2,
      title: "SYD",
      subtitle: "Taís",
      playIcon: "/assets/icons/play-icon.svg",
      logo: "/assets/logo/syd-profile.svg",
      youtubeId: "jz_POR6Ow08"
    },
    {
      id: 3,
      title: "upOS",
      subtitle: "Antônio",
      playIcon: "/assets/icons/play-icon.svg",
      logo: "/assets/logo/upos-profile.svg",
      youtubeId: "jz_POR6Ow08"
    }
  ];

  const openVideoModal = (youtubeId: string) => {
    setSelectedVideo(youtubeId);
    setIsModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <section className="relative flex flex-col items-center gap-4 pt-[80px] pb-[64px] text-white overflow-hidden select-none">
          
      {/* Header Section */}
      <div className="flex flex-col items-center w-full max-w-[958px] gap-6 lg:gap-8 px-4 lg:px-0">
        <div className="flex flex-col gap-2 lg:gap-4">
          <h1 className="text-white text-center">
            {t.testimonials.title}
          </h1>
          <p className="text-white text-center">
            {t.testimonials.description}
          </p>
        </div>
        
        {/* CTA Button */}
        <Button size="md" className="w-full lg:w-[282px]">
          <a
            href={WHATSAPP_LINKS.CONTACT}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-full flex items-center justify-center"
          >
            {t.testimonials.cta}
          </a>
        </Button>
      </div>
      {/* Cards Container */}
      <div 
        ref={containerRef}
        className="flex flex-row justify-start overflow-x-auto max-w-7xl px-4 py-4 lg:px-[20px] gap-4 lg:gap-[30px] cursor-grab active:cursor-grabbing scrollbar-hide w-full"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative group cursor-pointer flex-shrink-0"
            onClick={(e) => {
              if (!isDragging) {
                openVideoModal(card.youtubeId);
              }
            }}
          >
            {/* Card container with gradient background and border */}
            <div className="relative flex flex-col w-[280px] lg:w-[440px] lg:h-[608px] p-[12px] lg:p-[20px] gap-4 lg:gap-[20px] border border-tertiary rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform duration-300 overflow-hidden"
                 style={{
                   background: 'linear-gradient(155deg, rgba(255, 255, 255, 0.00) -2.13%, rgba(255, 255, 255, 0.15) 136.58%)'
                 }}>
              
              {/* Video thumbnail */}
              <div className="relative h-[320px] lg:h-[482px] rounded-2xl overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${card.youtubeId}/maxresdefault.jpg`}
                  alt={card.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to medium quality thumbnail if maxres fails
                    e.currentTarget.src = `https://img.youtube.com/vi/${card.youtubeId}/hqdefault.jpg`;
                  }}
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={card.playIcon}
                    alt="Play video"
                    className="w-12 lg:w-[77px] h-12 lg:h-[77px]"
                  />
                </div>
              </div>
              {/* Card info */}
              <div className="flex items-center gap-2 lg:gap-4">
                {/* Logo */}
                <img
                  src={card.logo}
                  alt="Logo"
                  className="w-8 lg:w-[63px] h-8 lg:h-[63px] rounded-[10px]"
                />
                
                {/* Text content */}
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base lg:text-[22px] leading-tight lg:leading-[33px] mb-1">
                    {card.title}
                  </h3>
                  <p className="text-white text-sm lg:text-[13px] font-medium lg:leading-[19.5px]">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* YouTube Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative bg-black rounded-lg overflow-hidden max-w-4xl w-full aspect-video">
            {/* Close button */}
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            
            {/* YouTube iframe */}
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
