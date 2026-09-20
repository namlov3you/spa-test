import React from 'react';
import { Sparkles, Award, ShieldCheck, HeartHandshake, CheckCircle, ArrowRight } from 'lucide-react';

interface BrandIntroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const BrandIntro: React.FC<BrandIntroProps> = ({
  onOpenBooking,
  onExploreServices,
}) => {
  // Brand Intro / Feature Spotlight
  return (
    <section
      id="about"
      aria-label="Giới thiệu thương hiệu Mona Beauty Blendz"
      className="py-20 lg:py-28 bg-[#F5EBE6] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait Model & Experience Badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Portrait Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85"
                  alt="Người mẫu chăm sóc da mặt thanh lịch tại Mona Beauty Blendz"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#33251D]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-serif italic text-lg sm:text-xl font-light text-[#FAF7F2]">
                    "Nơi lưu giữ vẻ đẹp thanh xuân và sự an yên sâu thẳm trong tâm hồn."
                  </p>
                </div>
              </div>

              {/* Overlapping Experience Badge (25 năm kinh nghiệm) */}
              <div className="absolute -bottom-6 -right-4 sm:-bottom-8 sm:-right-6 bg-[#4A3B32] text-[#FAF7F2] p-6 rounded-2xl shadow-xl border-2 border-[#C89B68] max-w-[220px] animate-float-slow">
                <div className="flex items-center gap-2 text-[#C89B68] mb-1">
                  <Award className="w-6 h-6" />
                  <span className="text-2xl font-bold font-serif">25+</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-[#FFFDF9] leading-tight">
                  Năm Kinh Nghiệm
                </h4>
                <p className="text-[11px] text-[#D5C2B2] mt-1">
                  Tiên phong chăm sóc da liễu và dưỡng sinh trị liệu tại Việt Nam
                </p>
              </div>

              {/* Decorative Accent Dot Frame */}
              <div className="hidden sm:block absolute -top-6 -left-6 w-32 h-32 border-2 border-[#C89B68]/30 rounded-full -z-10" />
            </div>
          </div>

          {/* Right Column: Narrative Content & Value Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#C89B68] text-xs font-bold tracking-widest uppercase border border-[#EADBCE]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thương Hiệu Spa Uy Tín Từ 1999</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#33251D] leading-[1.2] tracking-tight">
              Khám Phá Mới - Kinh Nghiệm Chăm Sóc Da 25 Năm
            </h2>

            <div className="w-20 h-0.5 bg-[#C89B68]" />

            <p className="text-base sm:text-lg text-[#4A3B32] leading-relaxed font-light">
              Mona Beauty Blendz ra đời với khát vọng kiến tạo một không gian trị liệu tâm thể toàn diện. Chúng tôi không chỉ làm đẹp bên ngoài, mà nuôi dưỡng từ sâu bên trong màng tế bào da bằng các phương pháp khoa học chuẩn y khoa.
            </p>

            <p className="text-sm sm:text-base text-[#5F4E44] leading-relaxed">
              Trải qua hơn hai thập kỷ nghiên cứu và ứng dụng, mỗi phác đồ tại Mona đều được thiết kế độc bản theo cấu trúc da của từng khách hàng. Chúng tôi cam kết sử dụng 100% dòng dược mỹ phẩm hữu cơ sinh học, tinh dầu chưng cất tự nhiên và máy móc hiện đại nhập khẩu trực tiếp từ Châu Âu.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-[#EADBCE]">
                <ShieldCheck className="w-5 h-5 text-[#C89B68] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#33251D]">100% Chuẩn Y Khoa</h4>
                  <p className="text-xs text-[#5F4E44]">Quy trình vô trùng nghiêm ngặt đạt tiêu chuẩn Bộ Y Tế.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/70 border border-[#EADBCE]">
                <HeartHandshake className="w-5 h-5 text-[#C89B68] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-[#33251D]">Chuyên Gia Tận Tâm</h4>
                  <p className="text-xs text-[#5F4E44]">Đội ngũ kỹ thuật viên được đào tạo chuyên sâu định kỳ.</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                id="brand-intro-primary-btn"
                onClick={onExploreServices}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#4A3B32] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-[#C89B68] hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <span>Xem Dịch Vụ Cao Cấp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="brand-intro-booking-btn"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-[#4A3B32] text-[#4A3B32] font-semibold text-xs tracking-wider uppercase hover:bg-white transition-all duration-300 cursor-pointer"
              >
                <span>Nhận Tư Vấn Trực Tiếp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
