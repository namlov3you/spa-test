import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Instagram,
  Youtube,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { SPA_CONFIG } from '../data/spaData';

interface FooterProps {
  onSuccessNotice: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSuccessNotice }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    onSuccessNotice('Cảm ơn bạn đã đăng ký nhận bản tin làm đẹp từ Mona Beauty Blendz!');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSubscribed(false), 3500);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Footer
  return (
    <footer
      id="main-footer"
      aria-label="Chân trang Mona Beauty Blendz"
      className="bg-[#2E211A] text-[#FAF7F2] pt-16 pb-8 border-t border-[#4A3B32]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#4A3B32]/80">
          {/* Cột 1: Thông tin liên hệ */}
          <div className="lg:col-span-4 space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C89B68] text-[#1E140F] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-white">
                  Mona <span className="font-sans text-xs tracking-widest text-[#C89B68]">BEAUTY BLENDZ</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-[#D5C2B2] leading-relaxed">
              Không gian spa dưỡng sinh cao cấp & viện chăm sóc da liễu chuẩn Thụy Sĩ. Đồng hành cùng thanh xuân phái đẹp trong suốt 25 năm qua.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-[#D5C2B2]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C89B68] flex-shrink-0 mt-0.5" />
                <span>{SPA_CONFIG.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C89B68] flex-shrink-0" />
                <a href={`tel:${SPA_CONFIG.phone}`} className="hover:text-[#C89B68] transition-colors">
                  Hotline: {SPA_CONFIG.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C89B68] flex-shrink-0" />
                <a href={`mailto:${SPA_CONFIG.email}`} className="hover:text-[#C89B68] transition-colors">
                  {SPA_CONFIG.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#C89B68] flex-shrink-0" />
                <span>{SPA_CONFIG.hours}</span>
              </div>
            </div>
          </div>

          {/* Cột 2: Liên kết nhanh */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-serif font-bold text-base text-white border-b border-[#C89B68]/40 pb-2 inline-block">
              Liên Kết Nhanh
            </h4>
            <ul className="space-y-2 text-xs text-[#D5C2B2]">
              <li>
                <button onClick={() => scrollTo('home')} className="hover:text-[#C89B68] transition-colors cursor-pointer">
                  Trang chủ
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-[#C89B68] transition-colors cursor-pointer">
                  Về chúng tôi (25 năm)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('treatments')} className="hover:text-[#C89B68] transition-colors cursor-pointer">
                  Liệu trình công nghệ
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('pricing')} className="hover:text-[#C89B68] transition-colors cursor-pointer">
                  Bảng giá dịch vụ
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('team')} className="hover:text-[#C89B68] transition-colors cursor-pointer">
                  Đội ngũ chuyên gia
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('blog')} className="hover:text-[#C89B68] transition-colors cursor-pointer">
                  Cẩm nang làm đẹp
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 3: Danh mục sản phẩm & dịch vụ */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-base text-white border-b border-[#C89B68]/40 pb-2 inline-block">
              Danh Mục Trị Liệu
            </h4>
            <ul className="space-y-2 text-xs text-[#D5C2B2]">
              <li>
                <button onClick={() => scrollTo('treatments')} className="hover:text-[#C89B68] transition-colors cursor-pointer">
                  • Chăm sóc da mặt chuyên sâu (Skincare)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('treatments')} className="hover:text-[#C89B68] transition-colors cursor-pointer">
                  • Massage Body & Đá nóng Himalaya
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('products')} className="hover:text-[#C89B68] transition-colors cursor-pointer">
                  • Dược mỹ phẩm hữu cơ sinh học
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('products')} className="hover:text-[#C89B68] transition-colors cursor-pointer">
                  • Makeup & Son dưỡng hữu cơ
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('relaxation')} className="hover:text-[#C89B68] transition-colors cursor-pointer">
                  • Nến thơm Aromatherapy & Tinh dầu
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('process')} className="hover:text-[#C89B68] transition-colors cursor-pointer">
                  • Gội đầu dưỡng sinh & Bấm huyệt
                </button>
              </li>
            </ul>
          </div>

          {/* Cột 4: Bản tin mới nhất */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif font-bold text-base text-white border-b border-[#C89B68]/40 pb-2 inline-block">
              Bản Tin Mới Nhất
            </h4>
            <p className="text-xs text-[#D5C2B2] leading-relaxed">
              Đăng ký email để nhận cẩm nang chăm sóc da tại nhà độc quyền và mã giảm giá 15% mỗi tháng.
            </p>

            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Nhập email của bạn..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-full bg-[#1E140F] border border-[#4A3B32] text-xs text-white placeholder-[#7A675C] focus:outline-none focus:border-[#C89B68] transition-colors pr-10"
                />
                <button
                  type="submit"
                  aria-label="Gửi email bản tin"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#C89B68] text-[#1E140F] flex items-center justify-center hover:bg-[#D4AF37] transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {newsletterSubscribed && (
                <span className="text-[11px] text-[#A7F3D0] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Đã đăng ký thành công!
                </span>
              )}
            </form>

            {/* Social Icons */}
            <div className="pt-2">
              <span className="text-[11px] text-[#7A675C] block mb-2 uppercase tracking-wider">
                Kết Nối Mạng Xã Hội
              </span>
              <div className="flex items-center space-x-3 text-xs">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook Mona Beauty"
                  className="w-8 h-8 rounded-full bg-[#3B2D24] text-[#FAF7F2] flex items-center justify-center hover:bg-[#C89B68] hover:text-[#1E140F] transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram Mona Beauty"
                  className="w-8 h-8 rounded-full bg-[#3B2D24] text-[#FAF7F2] flex items-center justify-center hover:bg-[#C89B68] hover:text-[#1E140F] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Youtube Mona Beauty"
                  className="w-8 h-8 rounded-full bg-[#3B2D24] text-[#FAF7F2] flex items-center justify-center hover:bg-[#C89B68] hover:text-[#1E140F] transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A675C] gap-4">
          <p className="font-medium text-[#D5C2B2]">
            {SPA_CONFIG.copyright}
          </p>
          <div className="flex items-center space-x-6 text-[11px]">
            <a href="#about" className="hover:text-[#C89B68] transition-colors">Điều khoản dịch vụ</a>
            <a href="#about" className="hover:text-[#C89B68] transition-colors">Chính sách bảo mật</a>
            <a href="#contact" className="hover:text-[#C89B68] transition-colors">Hỗ trợ khách hàng</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
