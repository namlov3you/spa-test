import React, { useState } from 'react';
import { Sparkles, Phone, Mail, Send, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';
import { SPA_CONFIG } from '../data/spaData';

interface CtaSectionProps {
  onSuccessNotice: (msg: string) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onSuccessNotice }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceInterest: 'Chăm sóc da mặt chuyên sâu',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.fullName) {
      alert('Vui lòng điền họ tên và số điện thoại để chuyên viên liên hệ tư vấn.');
      return;
    }
    setSubmitted(true);
    onSuccessNotice('Đăng ký tư vấn miễn phí thành công! Chuyên viên Mona sẽ liên hệ bạn trong 15 phút.');
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        serviceInterest: 'Chăm sóc da mặt chuyên sâu',
      });
    }, 4000);
  };

  // Call To Action (Nhận tư vấn miễn phí)
  return (
    <section
      id="contact"
      aria-label="Nhận tư vấn miễn phí và ưu đãi đặc quyền"
      className="relative py-20 lg:py-28 bg-[#33251D] text-[#FAF7F2] overflow-hidden"
    >
      {/* Background Image with warm dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1920&q=80"
          alt="Không gian thư giãn spa Mona Beauty Blendz"
          className="w-full h-full object-cover filter brightness-[0.25] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E140F]/95 via-[#33251D]/80 to-[#1E140F]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C89B68]/40 text-[#E8D3C0] text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#C89B68]" />
              <span>Đặc Quyền Khách Hàng Mới</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FFFDF9] leading-[1.2] tracking-tight">
              Nhận Tư Vấn Miễn Phí & Giảm 20% Buổi Đầu Tiên
            </h2>

            <div className="w-20 h-0.5 bg-[#C89B68]" />

            <p className="text-sm sm:text-base text-[#D5C2B2] leading-relaxed">
              Để lại thông tin để nhận phác đồ soi da 3D và gợi ý liệu trình chuẩn y khoa từ bác sĩ da liễu tại Mona Beauty Blendz hoàn toàn miễn phí.
            </p>

            {/* Quick Benefits List */}
            <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#FAF7F2]">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C89B68] flex-shrink-0" />
                <span>Miễn phí 100% chi phí soi da đa chiều & đo sắc tố melanin</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C89B68] flex-shrink-0" />
                <span>Tặng voucher 100.000đ khi mua dược mỹ phẩm tại showroom</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#C89B68] flex-shrink-0" />
                <span>Được phục vụ phòng riêng và trà thảo mộc thượng hạng</span>
              </div>
            </div>

            {/* Direct Phone Call Button */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                id="cta-call-hotline-btn"
                href={`tel:${SPA_CONFIG.phone}`}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#C89B68] text-[#1E140F] font-bold text-xs tracking-wider uppercase shadow-lg hover:bg-[#D4AF37] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>GỌI NGAY: {SPA_CONFIG.phoneDisplay}</span>
              </a>

              <span className="text-xs text-[#E8D3C0] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#C89B68]" />
                Hỗ trợ 24/7 kể cả ngày lễ
              </span>
            </div>
          </div>

          {/* Right Column: Lead Registration Form */}
          <div className="lg:col-span-6">
            <div className="bg-[#FAF7F2] text-[#33251D] p-8 sm:p-10 rounded-3xl border border-[#EADBCE] shadow-2xl relative">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#33251D] mb-2 text-center">
                Đăng Ký Tư Vấn Trực Tuyến
              </h3>
              <p className="text-xs text-[#7A675C] text-center mb-6">
                Chuyên viên sẽ liên hệ lại xác nhận khung giờ trong vòng 15 phút.
              </p>

              {submitted ? (
                <div className="py-8 text-center space-y-4 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-[#2A9D8F]/20 text-[#2A9D8F] mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-[#33251D]">
                    Gửi Thông Tin Thành Công!
                  </h4>
                  <p className="text-sm text-[#5F4E44]">
                    Cảm ơn bạn đã tin tưởng Mona Beauty Blendz. Chuyên viên sẽ gọi điện tư vấn và sắp xếp lịch hẹn chu đáo nhất.
                  </p>
                </div>
              ) : (
                <form id="cta-lead-form" onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3B32] mb-1 uppercase tracking-wider">
                      Họ và Tên *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Thảo Vy"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#EADBCE] bg-white text-sm text-[#33251D] focus:outline-none focus:border-[#C89B68] focus:ring-1 focus:ring-[#C89B68] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3B32] mb-1 uppercase tracking-wider">
                        Số Điện Thoại *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="090x xxx xxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#EADBCE] bg-white text-sm text-[#33251D] focus:outline-none focus:border-[#C89B68] focus:ring-1 focus:ring-[#C89B68] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#4A3B32] mb-1 uppercase tracking-wider">
                        Email Nhận Ưu Đãi
                      </label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#EADBCE] bg-white text-sm text-[#33251D] focus:outline-none focus:border-[#C89B68] focus:ring-1 focus:ring-[#C89B68] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A3B32] mb-1 uppercase tracking-wider">
                      Dịch Vụ Bạn Quan Tâm
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-[#EADBCE] bg-white text-sm text-[#33251D] focus:outline-none focus:border-[#C89B68] focus:ring-1 focus:ring-[#C89B68] transition-colors"
                    >
                      <option value="Chăm sóc da mặt chuyên sâu">Chăm sóc da mặt chuyên sâu</option>
                      <option value="Điều trị ánh sáng LED sinh học">Điều trị ánh sáng LED sinh học</option>
                      <option value="Massage body đá nóng Himalaya">Massage body đá nóng Himalaya</option>
                      <option value="Trẻ hóa tế bào da bằng oxy tươi">Trẻ hóa tế bào da bằng oxy tươi</option>
                      <option value="Gội đầu dưỡng sinh thảo dược">Gội đầu dưỡng sinh thảo dược</option>
                      <option value="Khác / Cần tư vấn phác đồ">Khác / Cần tư vấn phác đồ</option>
                    </select>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      id="cta-submit-btn"
                      className="w-full py-3.5 rounded-full bg-[#4A3B32] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-[#C89B68] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>ĐĂNG KÝ NHẬN TƯ VẤN NGAY</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[#A8988D] text-center pt-1">
                    * Thông tin của quý khách được bảo mật 100% theo tiêu chuẩn y tế.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
