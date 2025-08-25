"use client";
import React from 'react';
import { useTranslations } from '@/hooks/useTranslations';

export const CrawlingBanner: React.FC = () => {
  const t = useTranslations();
  const words = t.crawlingBanner.words;
  const divisor = '●';

  return (
    <div className="relative w-full h-16 z-30">
      {/* dark-blue background layer */}
      <div className="absolute transform rotate-[-2.85deg] inset-0 bg-[#9E25EF]" />

      {/* skewed peach banner */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ pointerEvents: 'none' }}
      >
      </div>

      {/* scrolling text on top */}
      <div className="absolute transform rotate-[-2.85deg] inset-0 flex items-center overflow-hidden">
        <div
          className="inline-flex whitespace-nowrap animate-marquee text-white font-bold text-[20px] leading-[26px] font-['Montserrat',sans-serif]"
          style={{ willChange: 'transform' }}
        >
          {/* first copy */}
          {words.map((word, index) => (
            <React.Fragment key={`first-${index}`}>
              <span className="px-2">{word}</span>
              <span className="px-2">{divisor}</span>
            </React.Fragment>
          ))}
          {/* second copy */}
          {words.map((word, index) => (
            <React.Fragment key={`second-${index}`}>
              <span className="px-2">{word}</span>
              <span className="px-2">{divisor}</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* dark-blue background layer */}
      <div className="absolute transform rotate-[2.85deg] inset-0 bg-[#674DE2]" />

      {/* skewed peach banner */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ pointerEvents: 'none' }}
      >
      </div>

      {/* scrolling text on top */}
      <div className="absolute transform rotate-[2.85deg] inset-0 flex items-center overflow-hidden">
        <div
          className="inline-flex whitespace-nowrap animate-marquee text-white font-bold text-[20px] leading-[26px] font-['Montserrat',sans-serif]"
          style={{ willChange: 'transform' }}
        >
          {/* first copy - starting from index 3 (Organizar) */}
          {words.slice(3).map((word, index) => (
            <React.Fragment key={`bottom-first-${index}`}>
              <span className="px-2">{word}</span>
              <span className="px-2">{divisor}</span>
            </React.Fragment>
          ))}
          {words.slice(0, 3).map((word, index) => (
            <React.Fragment key={`bottom-first-start-${index}`}>
              <span className="px-2">{word}</span>
              <span className="px-2">{divisor}</span>
            </React.Fragment>
          ))}
          {/* second copy - starting from index 3 (Organizar) */}
          {words.slice(3).map((word, index) => (
            <React.Fragment key={`bottom-second-${index}`}>
              <span className="px-2">{word}</span>
              <span className="px-2">{divisor}</span>
            </React.Fragment>
          ))}
          {words.slice(0, 3).map((word, index) => (
            <React.Fragment key={`bottom-second-start-${index}`}>
              <span className="px-2">{word}</span>
              <span className="px-2">{divisor}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CrawlingBanner;
