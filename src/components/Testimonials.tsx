import React, { useState } from 'react';
import { Sparkles, Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data/spaData';

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const next = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Customer Testimonials (Khách hàng đánh giá)
  return (
    <section
      id="testimonials"
      aria-label="Đánh giá từ khách hàng"
      className="py-20 lg:py-28 bg-[#FAF7F2] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EBE6] text-[#C89B68] text-xs font-bold tracking-widest uppercase mb-3 border border-[#EADBCE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trải Nghiệm Khách Hàng</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#33251D] tracking-tight">
            Khách Hàng Nói Gì Về Mona Beauty Blendz?
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B68] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#5F4E44]">
            Hơn 12.000 khách hàng đã tin tưởng và đồng hành cùng Mona trong hành trình tìm lại sự tươi trẻ và an yên.
          </p>
        </div>

        {/* Featured Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              id={`testimonial-card-${item.id}`}
              className="testimonial-card bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] p-8 shadow-sm hover:shadow-xl hover:border-[#C89B68] transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-[#4A3B32] ml-2">5.0 / 5.0</span>
                </div>

                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-[#C89B68]/30 mb-2 group-hover:text-[#C89B68]/60 transition-colors" />

                {/* Comment */}
                <p className="text-sm sm:text-base text-[#4A3B32] italic font-serif leading-relaxed mb-6">
                  "{item.comment}"
                </p>
              </div>

              {/* Author details */}
              <div className="pt-4 border-t border-[#EADBCE] flex items-center gap-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#C89B68]"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-serif font-bold text-base text-[#33251D]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#7A675C]">
                    {item.role}
                  </p>
                  <span className="text-[11px] text-[#C89B68] font-medium block mt-0.5">
                    ✓ Đã trải nghiệm: {item.serviceUsed}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Social Proof Bar */}
        <div className="mt-14 max-w-2xl mx-auto rounded-2xl bg-[#F5EBE6] border border-[#EADBCE] p-5 text-center flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-[#4A3B32]">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-serif text-[#C89B68]">4.9/5.0</span>
            <span>Điểm Đánh Giá Trên Google</span>
          </div>
          <div className="h-4 w-px bg-[#EADBCE] hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold font-serif text-[#C89B68]">98.6%</span>
            <span>Tỷ Lệ Khách Hàng Quay Lại</span>
          </div>
        </div>
      </div>
    </section>
  );
};
