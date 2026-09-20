import React from 'react';
import {
  Sparkles,
  Search,
  CheckCircle,
  HeartHandshake,
  Flame,
  ShieldCheck,
  Sun,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SERVICE_PROCESS_STEPS } from '../data/spaData';

interface ServiceProcessProps {
  onOpenBooking: () => void;
}

export const ServiceProcess: React.FC<ServiceProcessProps> = ({ onOpenBooking }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Sun':
        return <Sun className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  // Service Process Steps (6 Bước khám phá dịch vụ spa)
  return (
    <section
      id="process"
      aria-label="6 Bước quy trình trải nghiệm dịch vụ spa"
      className="py-20 lg:py-28 bg-[#F5EBE6] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#C89B68] text-xs font-bold tracking-widest uppercase mb-3 border border-[#EADBCE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quy Trình Chuẩn Quốc Tế</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#33251D] tracking-tight">
            6 Bước Khám Phá Dịch Vụ Spa Chuyên Nghiệp
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B68] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#5F4E44]">
            Từng điểm chạm trong hành trình trải nghiệm được tinh chỉnh tỉ mỉ, giúp thanh lọc trọn vẹn cả thể chất lẫn tinh thần của quý khách.
          </p>
        </div>

        {/* Circular / Central Sphere Showcase + 6 Grid Steps */}
        <div className="relative">
          {/* Center Jade Sphere Accent / Decorative Glow */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-[#1B5E52] via-[#2A9D8F] to-[#52B788] shadow-2xl p-1 flex items-center justify-center animate-pulse border-4 border-white/60">
              <div className="w-full h-full rounded-full bg-[#1A4D45] flex flex-col items-center justify-center text-center p-3 text-white shadow-inner">
                <Sparkles className="w-6 h-6 text-[#A7F3D0] mb-1" />
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#E6FFFA]">
                  Mona Sphere
                </span>
                <span className="text-[9px] text-[#A7F3D0]">Ngọc Thạch Dưỡng Nhan</span>
              </div>
            </div>
          </div>

          {/* 6 Steps Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
            {SERVICE_PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.step}
                id={`process-step-${step.step}`}
                className="bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] p-7 shadow-sm hover:shadow-xl hover:border-[#C89B68] transition-all duration-300 relative group flex flex-col justify-between"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#FAF7F2] text-[#C89B68] border border-[#EADBCE] flex items-center justify-center group-hover:bg-[#4A3B32] group-hover:text-[#FAF7F2] transition-colors duration-300">
                    {getIcon(step.icon)}
                  </div>
                  <span className="font-serif text-3xl font-bold text-[#EADBCE] group-hover:text-[#C89B68] transition-colors">
                    0{step.step}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-[#C89B68] uppercase tracking-wider block mb-1">
                    {step.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-[#33251D] mb-3 group-hover:text-[#C89B68] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5F4E44] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#EADBCE]/50 flex items-center justify-between text-xs text-[#7A675C]">
                  <span className="flex items-center gap-1.5 font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C89B68]" />
                    Đạt chuẩn kiểm định
                  </span>
                  <span className="text-[#C89B68] font-semibold">Bước {step.step}/6</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Booking Prompt */}
        <div className="mt-14 text-center">
          <button
            id="process-booking-cta"
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#4A3B32] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase shadow-lg hover:bg-[#C89B68] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span>Trải Nghiệm Liệu Trình 6 Bước Ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
