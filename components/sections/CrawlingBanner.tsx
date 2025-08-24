import React from 'react';

const text = [
  {
    divisor: '●',
    first: 'Ouvir',
    second: 'Entender o problema',
    third: 'Descobrir',
    one: 'Organizar',
    two: 'Estruturar',
    three: 'Construir',
    four: 'Testar',
    five: 'Entregar'
  }
];

const [{ divisor, first, second, third, one, two, three, four, five }] = text;

export const CrawlingBanner: React.FC = () => (
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
        <span className="px-2">{first}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{second}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{third}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{one}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{two}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{three}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{four}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{five}</span>
        <span className="px-2">{divisor}</span>
        {/* second copy */}
        <span className="px-2">{first}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{second}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{third}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{one}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{two}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{three}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{four}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{five}</span>
        <span className="px-2">{divisor}</span>
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
        {/* first copy */}
        <span className="px-2">{one}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{two}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{three}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{four}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{five}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{first}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{second}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{third}</span>
        <span className="px-2">{divisor}</span>
        {/* second copy */}
        <span className="px-2">{one}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{two}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{three}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{four}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{five}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{first}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{second}</span>
        <span className="px-2">{divisor}</span>
        <span className="px-2">{third}</span>
        <span className="px-2">{divisor}</span>
      </div>
    </div>
  </div>
);

export default CrawlingBanner;
