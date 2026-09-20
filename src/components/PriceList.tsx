import React, { useState } from 'react';
import { Sparkles, Clock, Check, ArrowRight } from 'lucide-react';
import { PRICE_CATEGORIES } from '../data/spaData';

interface PriceListProps {
  onOpenBookingWithService: (serviceName: string) => void;
}

export const PriceList: React.FC<PriceListProps> = ({ onOpenBookingWithService }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  // Price List Section (Bảng giá chi tiết dịch vụ)
  return (
    <section
      id="pricing"
      aria-label="Bảng giá dịch vụ spa chi tiết"
      className="py-20 lg:py-28 bg-[#FAF7F2] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EBE6] text-[#C89B68] text-xs font-bold tracking-widest uppercase mb-3 border border-[#EADBCE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Minh Bạch & Tận Tâm</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#33251D] tracking-tight">
            Bảng Giá Chi Tiết Dịch Vụ Spa
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B68] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#5F4E44]">
            Bảng giá niêm yết rõ ràng, không phát sinh chi phí phụ. Cam kết chất lượng và sự hài lòng tuyệt đối sau mỗi buổi trị liệu.
          </p>
        </div>

        {/* Category Tab Buttons: "Chăm sóc da mặt", "Massage Body", "Chăm sóc toàn thân", "Dịch vụ thêm" */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {PRICE_CATEGORIES.map((cat, idx) => (
            <button
              key={cat.categoryName}
              onClick={() => setActiveCategoryIndex(idx)}
              className={`px-5 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                activeCategoryIndex === idx
                  ? 'bg-[#4A3B32] text-[#FAF7F2] shadow-md scale-105'
                  : 'bg-white border border-[#EADBCE] text-[#5F4E44] hover:border-[#C89B68] hover:text-[#C89B68]'
              }`}
            >
              {cat.categoryName}
            </button>
          ))}
        </div>

        {/* Active Category Display Grid */}
        <div className="bg-[#FFFDF9] rounded-3xl border border-[#EADBCE] p-6 sm:p-10 shadow-lg">
          <div className="mb-8 pb-6 border-b border-[#EADBCE] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#33251D]">
                {PRICE_CATEGORIES[activeCategoryIndex].categoryName}
              </h3>
              <p className="text-sm text-[#5F4E44] mt-1">
                {PRICE_CATEGORIES[activeCategoryIndex].description}
              </p>
            </div>
            <div className="text-xs text-[#C89B68] font-semibold bg-[#F5EBE6] px-4 py-2 rounded-full border border-[#EADBCE] inline-block self-start md:self-auto">
              ✓ Tặng kèm trà thảo mộc & khăn lạnh đón tiếp
            </div>
          </div>

          {/* Pricing Items Table / Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PRICE_CATEGORIES[activeCategoryIndex].items.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                  item.popular
                    ? 'border-[#C89B68] bg-[#FAF7F2]/80 shadow-md relative'
                    : 'border-[#EADBCE] bg-white hover:border-[#C89B68]/60 hover:shadow-sm'
                }`}
              >
                {item.popular && (
                  <span className="absolute -top-3 right-6 bg-[#C89B68] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                    Gói Phổ Biến Nhất
                  </span>
                )}

                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-serif font-bold text-lg text-[#33251D] leading-snug">
                      {item.name}
                    </h4>
                    <div className="text-right flex-shrink-0">
                      <span className="font-serif font-bold text-xl text-[#4A3B32]">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#C89B68] font-medium mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Thời gian thực hiện: {item.duration}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5F4E44] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EADBCE]/50 flex items-center justify-between mt-2">
                  <span className="text-[11px] text-[#7A675C]">
                    Áp dụng cho mọi ngày trong tuần
                  </span>
                  <button
                    onClick={() => onOpenBookingWithService(item.name)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4A3B32] text-[#FAF7F2] text-xs font-semibold hover:bg-[#C89B68] transition-colors cursor-pointer"
                  >
                    <span>Đặt Gói Này</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice Banner */}
          <div className="mt-8 pt-6 border-t border-[#EADBCE] text-center text-xs text-[#7A675C]">
            * Quý khách đi nhóm từ 2 người trở lên được giảm thêm 10% tổng hóa đơn. Vui lòng liên hệ Hotline 1900 636 648 để giữ phòng VIP riêng tư.
          </div>
        </div>
      </div>
    </section>
  );
};
