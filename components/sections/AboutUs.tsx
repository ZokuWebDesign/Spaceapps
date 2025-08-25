"use client";

import React, { useState, useRef, MouseEvent } from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useTranslations } from '@/hooks/useTranslations';

const AboutUs = () => {
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
      title: t.aboutUs.cards.card1.title,
      subtitle: t.aboutUs.cards.card1.subtitle,
      playIcon: "/assets/icons/play-icon.svg",
      logo: "/assets/logo/space-profile.svg",
      youtubeId: "dQw4w9WgXcQ" // Replace with actual YouTube video ID
    },
    {
      id: 2,
      title: t.aboutUs.cards.card2.title,
      subtitle: t.aboutUs.cards.card2.subtitle,
      playIcon: "/assets/icons/play-icon.svg",
      logo: "/assets/logo/space-profile.svg",
      youtubeId: "jNQXAC9IVRw" // Replace with actual YouTube video ID
    },
    {
      id: 3,
      title: t.aboutUs.cards.card3.title,
      subtitle: t.aboutUs.cards.card3.subtitle,
      playIcon: "/assets/icons/play-icon.svg",
      logo: "/assets/logo/space-profile.svg",
      youtubeId: "L_jWHffIx5E" // Replace with actual YouTube video ID
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
    <section className="relative pt-[50px] pb-[101px] px-4 lg:px-12 text-white overflow-hidden select-none">
      
      <img 
        src="/assets/vectors/stars.svg" 
        alt="Star field background"
        className="absolute z-0 w-[1008px] h-[944px] w-full h-full object-cover animate-twinkle"
      />

      {/* Background container */}
      <div className="md:container max-w-[1182px] mx-auto relative z-10">
        {/* Main content container with gradient background and border */}
        <div className="flex flex-col gap-8 relative pt-[74px] pb-[50px] rounded-[6px] bg-gradient-to-br from-white/10 to-gray-500/20 border border-tertiary backdrop-blur-sm overflow-hidden">
          
          {/* Header Section */}
          <div className="flex flex-col gap-[20px] px-4 lg:pl-[66px] lg:pr-[40px]">
            <div className="flex flex-col gap-2 lg:gap-[20px]">
              <h1>
                {t.aboutUs.title}
              </h1>
              <p className="text-white">
                {t.aboutUs.description}
              </p>
            </div>
            
            {/* CTA Button */}
            <Button size="md" className="w-full lg:w-[282px]">
              {t.aboutUs.cta}
            </Button>
          </div>

          {/* Cards Container */}
          <div 
            ref={containerRef}
            className="flex flex-row overflow-x-auto px-4 lg:pl-[66px] lg:pr-[40px] gap-4 lg:gap-8 cursor-grab active:cursor-grabbing scrollbar-hide"
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
                <div className="relative flex flex-col w-[280px] lg:w-[440px] p-[12px] lg:p-[20px] gap-4 lg:gap-[20px] border border-tertiary rounded-2xl backdrop-blur-sm hover:scale-105 transition-transform duration-300 overflow-hidden"
                     style={{
                       background: 'linear-gradient(155deg, rgba(255, 255, 255, 0.00) -2.13%, rgba(255, 255, 255, 0.15) 136.58%)'
                     }}>
                  
                  {/* Video thumbnail */}
                  <div className="relative h-[320px] lg:h-[484px] rounded-2xl overflow-hidden">
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
                      {/*
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                      </div>
                      */}
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="flex items-center gap-2 lg:gap-4">
                    {/* Category icon */}
                    <img
                      src={card.logo}
                      alt="Category icon"
                      className="w-8 lg:w-[63px] h-8 lg:h-[63px] rounded-xl"
                    />
                    
                    {/* Text content */}
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-base lg:text-lg leading-tight mb-1">
                        {card.title}
                      </h3>
                      <p className="text-white/80 text-sm font-medium">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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

export default AboutUs;
