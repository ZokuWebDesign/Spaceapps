"use client";

import React from 'react';
import { Button } from '../ui/button';

const Companies = () => {
  // Company logos data with image sources
  const companies = [
    { logo: "https://i.ibb.co/Gf2LBBgy/unimed.webp", alt: "Unimed Logo" },
    { logo: "/assets/logo/allprice.svg", alt: "Allprice Logo" },
    { logo: "/assets/logo/viphostel.svg", alt: "VipHostel Logo" },
    { logo: "/assets/logo/celus.svg", alt: "Celus Logo" },
    { logo: "/assets/logo/ecota.svg", alt: "Ecota Logo" },
    { logo: "/assets/logo/ugrega.svg", alt: "UGREGA Logo" },
    { logo: "/assets/logo/cupomapp.svg", alt: "CUPOMAPP Logo" },
    { logo: "/assets/logo/gestrif.svg", alt: "Gestrif Logo" },
    { logo: "/assets/logo/meinho.svg", alt: "Meinho Logo" },
    { logo: "/assets/logo/syd.svg", alt: "SYD Logo" },
    { logo: "/assets/logo/upos.svg", alt: "upOS Logo" },
    { logo: "/assets/logo/petlife.svg", alt: "PetLife Logo" },
    { logo: "/assets/logo/jusprod.svg", alt: "Jusprod Logo" },
    { logo: "/assets/logo/workflow.svg", alt: "Workflow Systems Logo" },
    { logo: "/assets/logo/meconta.svg", alt: "meconta Logo" },
    { logo: "https://i.ibb.co/BHXkmc4y/miaki.webp", alt: "Universidade Miaki Logo" },
    { logo: "/assets/logo/superselos.svg", alt: "SuperSelos Logo" },
    { logo: "/assets/logo/tatalogos.svg", alt: "TataLogos Logo" },
    { logo: "/assets/logo/fans.svg", alt: "Fans Logo" },
    { logo: "/assets/logo/techlideres.svg", alt: "TechLíderes Logo" },
    { logo: "https://i.ibb.co/Xxsr3ZfY/qualydent.webp", alt: "QualyDent Logo" },
    { logo: "/assets/logo/monew.svg", alt: "MONEW Logo" },
    { logo: "/assets/logo/carcode.svg", alt: "CarCode Logo" },
    { logo: "/assets/logo/everpetz.svg", alt: "EverPetz Logo" },
    { logo: "/assets/logo/sbd.svg", alt: "SBD Shine Bright Day Logo" },
    { logo: "https://i.ibb.co/TMd7Npgf/clinicarocha.webp", alt: "Clínica Rocha Logo" },
    { logo: "/assets/logo/direitoapp.svg", alt: "DireitoApp Logo" },
    { logo: "/assets/logo/bankmy.svg", alt: "bankmy Logo" }
  ];

  return (
    <section className="relative py-24 text-white overflow-hidden">

      <img 
        src="/assets/vectors/stars.svg" 
        alt="Star field background"
        className="absolute z-0 w-[1206px] h-[1206px] w-full h-full object-cover animate-twinkle"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="mb-6 tracking-wider text-transform: uppercase text-white">
            Quem já fez essa viagem
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Todas essas empresas já embarcaram na nossa nave e fizeram uma viagem pelo<br />
            universo do desenvolvimento. Vai ficar de fora?
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button>
              FALAR COM DAVI
            </Button>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center bg-transparent backdrop-blur-sm rounded-xl border border-transparent hover:bg-white/5 transition-all duration-300 hover:scale-105 hover:border-white/25"
              style={{ minHeight: '120px' }}
            >
              {/* Company logo image */}
              <div className="text-center">
                <img
                  src={company.logo}
                  alt={company.alt}
                  className="w-[208px] h-[120px] object-contain mx-auto"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom spacing for visual balance */}
        <div className="pt-16 text-center">
          <p className="text-gray-400 text-base">
            Junte-se a essas empresas incríveis em nossa jornada pelo espaço digital
          </p>
        </div>
      </div>
    </section>
  );
};

export default Companies;