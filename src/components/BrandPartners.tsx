import React from 'react';
import { BRAND_PARTNERS } from '../data/spaData';

export const BrandPartners: React.FC = () => {
  // Brand Partners / Logo Bar
  return (
    <section
      id="partners"
      aria-label="Đối tác thương hiệu & Tạp chí làm đẹp uy tín"
      className="py-12 bg-[#F5EBE6] border-y border-[#EADBCE]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#7A675C] mb-8">
          Đối Tác Chiến Lược & Chứng Nhận Quốc Tế
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {BRAND_PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center justify-center p-3 text-center grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-all duration-300 group cursor-default"
            >
              <span className="font-serif text-base sm:text-lg font-bold tracking-wider text-[#4A3B32] group-hover:text-[#C89B68] transition-colors">
                {partner.name}
              </span>
              <span className="text-[10px] text-[#7A675C] uppercase tracking-widest mt-0.5">
                {partner.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
