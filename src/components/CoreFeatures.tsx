import React, { useState } from 'react';
import { Sparkles, Clock, CheckCircle2, ArrowRight, Star, Heart } from 'lucide-react';
import { CORE_TREATMENTS } from '../data/spaData';
import { ServiceItem } from '../types';

interface CoreFeaturesProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenBookingWithService: (serviceTitle: string) => void;
}

export const CoreFeatures: React.FC<CoreFeaturesProps> = ({
  onSelectService,
  onOpenBookingWithService,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'facial' | 'relaxation' | 'body'>('all');

  const filteredTreatments = selectedFilter === 'all'
    ? CORE_TREATMENTS
    : CORE_TREATMENTS.filter(t => t.category === selectedFilter || (selectedFilter === 'facial' && t.category === 'special'));

  // Core Features / Treatments Highlights (Khám phá dịch vụ & công nghệ)
  return (
    <section
      id="treatments"
      aria-label="Khám phá dịch vụ và công nghệ spa"
      className="py-20 lg:py-28 bg-[#FAF7F2] relative overflow-hidden"
    >
      {/* Subtle decorative background texture */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-[#EADBCE]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-[#F5EBE6]/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EBE6] text-[#C89B68] text-xs font-bold tracking-widest uppercase mb-3 border border-[#EADBCE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Công Nghệ & Liệu Trình Đỉnh Cao</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#33251D] tracking-tight">
            Khám Phá Dịch Vụ & Trị Liệu Chuyên Sâu
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B68] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#5F4E44] leading-relaxed">
            Sự kết hợp hoàn hảo giữa công nghệ quang học, tế bào gốc tiên tiến và bí quyết massage bấm huyệt thảo mộc cổ truyền, mang lại hiệu quả tái sinh làn da vượt trội.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'Tất Cả Liệu Trình' },
              { id: 'facial', label: 'Chăm Sóc & Trẻ Hóa Da Mặt' },
              { id: 'relaxation', label: 'Dưỡng Sinh & Thảo Dược' },
              { id: 'body', label: 'Massage Đá Nóng & Thể' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as any)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-[#4A3B32] text-[#FAF7F2] shadow-sm scale-105'
                    : 'bg-white/80 text-[#5F4E44] border border-[#EADBCE] hover:border-[#C89B68] hover:text-[#C89B68]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Treatment Cards Grid with delicate brown border and ivory/cream background */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredTreatments.map((item) => (
            <article
              key={item.id}
              id={`treatment-card-${item.id}`}
              className="treatment-card group bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] p-6 shadow-sm hover:shadow-xl hover:border-[#C89B68] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with smooth zoom */}
                <div className="relative h-56 w-full rounded-xl overflow-hidden mb-5 bg-[#F5EBE6]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-[#4A3B32]/90 backdrop-blur-sm text-[#FAF7F2] text-[11px] font-semibold tracking-wider px-3 py-1 rounded-full uppercase border border-[#C89B68]/30">
                      {item.badge}
                    </span>
                  )}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-[#33251D] px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-[#C89B68]" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                {/* Subtitle & Title */}
                <span className="text-xs font-medium text-[#C89B68] uppercase tracking-wider block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#33251D] mb-3 group-hover:text-[#C89B68] transition-colors leading-snug">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5F4E44] leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="space-y-1.5 mb-6 pt-3 border-t border-[#EADBCE]/50">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#5F4E44]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C89B68] flex-shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Button */}
              <div className="pt-4 border-t border-[#EADBCE] flex items-center justify-between mt-auto">
                <div>
                  <span className="text-[11px] text-[#7A675C] uppercase block">Giá niêm yết</span>
                  <span className="font-serif text-lg font-bold text-[#4A3B32]">
                    {item.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectService(item)}
                    className="p-2 rounded-full border border-[#EADBCE] text-[#5F4E44] hover:bg-[#FAF7F2] hover:text-[#C89B68] transition-colors cursor-pointer"
                    title="Xem chi tiết liệu trình"
                    aria-label={`Xem chi tiết ${item.title}`}
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onOpenBookingWithService(item.title)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4A3B32] text-[#FAF7F2] text-xs font-semibold hover:bg-[#C89B68] hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <span>Đặt Lịch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
