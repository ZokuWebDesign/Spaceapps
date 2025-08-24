"use client";

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { X } from 'lucide-react';

const Testimonials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Video/podcast cards data with YouTube video IDs
  const cards = [
    {
      id: 1,
      title: "All Price",
      subtitle: "Micael",
      playIcon: "/assets/icons/play-icon.svg",
      logo: "/assets/logo/allprice-profile.svg",
      youtubeId: "dQw4w9WgXcQ"
    },
    {
      id: 2,
      title: "SYD",
      subtitle: "Taís",
      playIcon: "/assets/icons/play-icon.svg",
      logo: "/assets/logo/syd-profile.svg",
      youtubeId: "jNQXAC9IVRw"
    },
    {
      id: 3,
      title: "upOS",
      subtitle: "Antônio",
      playIcon: "/assets/icons/play-icon.svg",
      logo: "/assets/logo/upos-profile.svg",
      youtubeId: "L_jWHffIx5E"
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
    <section className="relative py-24 text-white overflow-hidden">

      {/* Background container */}
      <div className="container mx-auto px-6 relative z-10">
          
          {/* Header Section */}
          <div className="mb-12">
            <div className="mb-8 text-center max-w-[958px] mx-auto">
              <h1 className="text-white text-[56px] font-normal leading-[54px] mb-6">
                depoimentos reais
              </h1>
              <p className="text-white text-[20px] font-normal leading-[24px] mb-12">
                Pedimos para nossos clientes contarem em vídeos curtos a experiência em cada projeto. Dá uma olhada!
              </p>
              
              {/* CTA Button using the existing Button component */}
              <Button size="md" className="w-[282px] h-[48px]">
                FALAR COM DAVI
              </Button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1280px] mx-auto">
            {cards.map((card) => (
              <div
                key={card.id}
                className="relative group cursor-pointer"
                onClick={() => openVideoModal(card.youtubeId)}
              >
                {/* Card container with gradient background and border */}
                <div 
                  className="relative rounded-[20px] overflow-hidden backdrop-blur-sm hover:scale-105 transition-transform duration-300 w-[440px] h-[608px]"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)',
                    border: '1px solid transparent',
                    backgroundImage: `
                      linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%),
                      linear-gradient(135deg, rgba(224, 37, 206, 0.7) 0%, rgba(255, 255, 255, 0) 50.52%, rgba(189, 36, 230, 0.7) 100%)
                    `,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'content-box, border-box'
                  }}
                >
                  
                  {/* Video thumbnail */}
                  <div className="relative h-[482px] rounded-[15px] overflow-hidden m-5 mb-0">
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
                        className="w-[77px] h-[77px]"
                      />
                    </div>
                  </div>

                  {/* Card info */}
                  <div className="p-5 flex items-center gap-4 h-[63px]">
                    {/* Logo */}
                    <img
                      src={card.logo}
                      alt="Logo"
                      className="w-[63px] h-[63px] rounded-[10px]"
                    />
                    
                    {/* Text content */}
                    <div className="flex-1">
                      <h3 className="text-white font-semibold text-[22px] leading-[33px] mb-1">
                        {card.title}
                      </h3>
                      <p className="text-white text-[13px] font-medium leading-[19.5px]">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

export default Testimonials;
