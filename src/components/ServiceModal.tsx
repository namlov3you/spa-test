import React from 'react';
import { X, Clock, CheckCircle2, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (title: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-[#EADBCE] shadow-2xl p-6 sm:p-8 relative text-[#33251D]">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#EADBCE]/50 hover:bg-[#EADBCE] text-[#33251D] transition-colors cursor-pointer"
          aria-label="Đóng chi tiết liệu trình"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="h-56 w-full rounded-2xl overflow-hidden mb-6 relative">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <span className="absolute bottom-3 left-3 bg-[#4A3B32]/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
            {service.duration}
          </span>
        </div>

        <span className="text-xs font-bold text-[#C89B68] uppercase tracking-wider block mb-1">
          {service.subtitle}
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#33251D] mb-3">
          {service.title}
        </h3>
        <p className="text-sm text-[#5F4E44] leading-relaxed mb-4">
          {service.description}
        </p>

        <div className="space-y-2 mb-6 p-4 rounded-xl bg-white border border-[#EADBCE]">
          <h4 className="text-xs font-bold text-[#4A3B32] uppercase tracking-wider">
            Ưu điểm nổi bật của liệu trình:
          </h4>
          {service.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-[#5F4E44]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#C89B68]" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-[#EADBCE]">
          <div>
            <span className="text-xs text-[#7A675C] block">Giá trọn gói:</span>
            <span className="font-serif text-2xl font-bold text-[#4A3B32]">
              {service.price}
            </span>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookService(service.title);
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4A3B32] text-[#FAF7F2] text-xs font-semibold hover:bg-[#C89B68] transition-colors"
          >
            <span>Đặt Lịch Liệu Trình Này</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
