import React, { useState } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Eye, Calendar } from 'lucide-react';
import { RELAXATION_GALLERY } from '../data/spaData';

interface SpaCarouselProps {
  onOpenBooking: () => void;
}

export const SpaCarousel: React.FC<SpaCarouselProps> = ({ onOpenBooking }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? RELAXATION_GALLERY.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === RELAXATION_GALLERY.length - 1 ? 0 : prev + 1));
  };

  // Spa & Relaxation Services Carousel (Dịch vụ Spa thư giãn)
  return (
    <section
      id="relaxation"
      aria-label="Không gian và dịch vụ spa thư giãn"
      className="py-20 lg:py-28 bg-[#FAF7F2] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Navigation Buttons on Desktop */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EBE6] text-[#C89B68] text-xs font-bold tracking-widest uppercase mb-3 border border-[#EADBCE]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thư Giãn Thân - Tâm - Trí</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#33251D] tracking-tight">
              Dịch Vụ Spa Thư Giãn & Không Gian Tĩnh Tại
            </h2>
            <div className="w-16 h-0.5 bg-[#C89B68] my-4" />
            <p className="text-sm sm:text-base text-[#5F4E44]">
              Đắm mình trong tiếng nhạc thiền du dương, hương nến thảo mộc ngọt ngào và sự chăm sóc ân cần từ những đôi bàn tay trị liệu khéo léo.
            </p>
          </div>

          {/* Carousel Navigation Buttons: TRƯỚC và TIẾP */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <button
              id="spa-carousel-prev-btn"
              onClick={handlePrev}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#4A3B32] text-[#4A3B32] hover:bg-[#4A3B32] hover:text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-sm"
              aria-label="Xem hình trước"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>TRƯỚC</span>
            </button>
            <button
              id="spa-carousel-next-btn"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4A3B32] text-[#FAF7F2] hover:bg-[#C89B68] font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer shadow-md"
              aria-label="Xem hình tiếp"
            >
              <span>TIẾP</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Showcase */}
        <div className="relative overflow-hidden rounded-3xl border border-[#EADBCE] bg-[#FFFDF9] shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[440px]">
            {/* Left Image Box */}
            <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-[#33251D]">
              <img
                src={RELAXATION_GALLERY[currentIndex].image}
                alt={RELAXATION_GALLERY[currentIndex].title}
                loading="lazy"
                width={800}
                height={500}
                className="w-full h-full object-cover transition-all duration-700 transform scale-100 hover:scale-105"
              />
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#33251D]/80 backdrop-blur-md text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase border border-[#C89B68]/40">
                {RELAXATION_GALLERY[currentIndex].tag}
              </span>
            </div>

            {/* Right Information Details */}
            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between bg-gradient-to-br from-[#FFFDF9] to-[#FAF7F2]">
              <div className="space-y-4">
                <div className="text-xs font-mono tracking-widest text-[#C89B68]">
                  0{currentIndex + 1} / 0{RELAXATION_GALLERY.length}
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#33251D] leading-snug">
                  {RELAXATION_GALLERY[currentIndex].title}
                </h3>
                <div className="w-12 h-0.5 bg-[#C89B68]" />
                <p className="text-sm sm:text-base text-[#5F4E44] leading-relaxed">
                  {RELAXATION_GALLERY[currentIndex].description}
                </p>

                <div className="pt-2 text-xs text-[#7A675C] space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89B68]"></span>
                    <span>Nhiệt độ phòng tiêu chuẩn 24°C - 26°C thoải mái</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89B68]"></span>
                    <span>Khăn bông sợi tre 100% tiệt trùng theo lượt khách</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C89B68]"></span>
                    <span>Bảo mật không gian riêng tư tuyệt đối</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#EADBCE] flex flex-wrap items-center gap-3">
                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4A3B32] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase hover:bg-[#C89B68] transition-colors shadow-sm cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Đặt Phòng VIP Này</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Preview Strip */}
        <div className="grid grid-cols-5 gap-3 sm:gap-4 mt-6">
          {RELAXATION_GALLERY.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-16 sm:h-24 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? 'border-[#C89B68] ring-2 ring-[#C89B68]/40 scale-102 shadow-md'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 hover:bg-transparent transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
