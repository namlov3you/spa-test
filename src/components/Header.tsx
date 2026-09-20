import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Phone,
  Clock,
  MapPin,
  Calendar
} from 'lucide-react';
import { SPA_CONFIG } from '../data/spaData';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenBooking,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Header & Navigation Bar (Sticky Header)
  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-md py-3 border-b border-[#EADBCE]'
          : 'bg-[#FAF7F2]/90 backdrop-blur-sm py-4 border-b border-[#EADBCE]/50'
      }`}
    >
      {/* Top micro bar for phone and address on desktop */}
      <div className="hidden lg:block border-b border-[#EADBCE]/40 pb-2 mb-2 text-xs text-[#5F4E44]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#C89B68]" />
              {SPA_CONFIG.address}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#C89B68]" />
              {SPA_CONFIG.hours}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${SPA_CONFIG.phone}`}
              className="flex items-center gap-1.5 font-medium text-[#4A3B32] hover:text-[#C89B68] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C89B68]" />
              Hotline: {SPA_CONFIG.phoneDisplay}
            </a>
            <span className="text-[#C89B68]">•</span>
            <span className="text-amber-800/80 font-medium">Ưu đãi 20% đặt lịch online hôm nay</span>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            id="brand-logo"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full bg-[#4A3B32] text-[#FAF7F2] flex items-center justify-center shadow-sm group-hover:bg-[#C89B68] transition-colors duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#33251D] group-hover:text-[#C89B68] transition-colors">
                Mona <span className="font-sans font-semibold text-xs tracking-widest uppercase text-[#C89B68]">BEAUTY BLENDZ</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#5F4E44] font-medium">
                Luxury Spa & Holistic Skincare
              </span>
            </div>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium text-[#4A3B32]">
            <button
              id="nav-link-home"
              onClick={() => scrollToSection('home')}
              className="hover:text-[#C89B68] transition-colors duration-200 py-1 relative group cursor-pointer"
            >
              Trang chủ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C89B68] group-hover:w-full transition-all duration-300"></span>
            </button>

            <button
              id="nav-link-about"
              onClick={() => scrollToSection('about')}
              className="hover:text-[#C89B68] transition-colors duration-200 py-1 relative group cursor-pointer"
            >
              Giới thiệu
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C89B68] group-hover:w-full transition-all duration-300"></span>
            </button>

            {/* Dịch vụ with Dropdown menu */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                id="nav-services-dropdown-btn"
                className="flex items-center gap-1 hover:text-[#C89B68] transition-colors duration-200 cursor-pointer"
              >
                <span>Dịch vụ</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    servicesDropdownOpen ? 'rotate-180 text-[#C89B68]' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu Container */}
              <div
                id="nav-services-dropdown-menu"
                className={`absolute top-full left-0 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-[#EADBCE] py-3 px-2 transition-all duration-200 ${
                  servicesDropdownOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                <button
                  onClick={() => scrollToSection('treatments')}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#FAF7F2] hover:text-[#C89B68] transition-colors flex flex-col cursor-pointer"
                >
                  <span className="font-semibold text-[#33251D]">Khám Phá Công Nghệ</span>
                  <span className="text-xs text-[#7A675C]">Ánh sáng LED, đá nóng & thảo dược</span>
                </button>
                <button
                  onClick={() => scrollToSection('relaxation')}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#FAF7F2] hover:text-[#C89B68] transition-colors flex flex-col cursor-pointer"
                >
                  <span className="font-semibold text-[#33251D]">Spa Thư Giãn</span>
                  <span className="text-xs text-[#7A675C]">Không gian nến thơm, ngâm chân muối hồng</span>
                </button>
                <button
                  onClick={() => scrollToSection('team')}
                  className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-[#FAF7F2] hover:text-[#C89B68] transition-colors flex flex-col cursor-pointer"
                >
                  <span className="font-semibold text-[#33251D]">Chuyên Gia Làm Đẹp</span>
                  <span className="text-xs text-[#7A675C]">Đội ngũ 10+ năm kinh nghiệm da liễu</span>
                </button>
                <button
                  onClick={() => {
                    setServicesDropdownOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-lg bg-[#FAF7F2] text-[#C89B68] font-semibold hover:bg-[#F5EBE6] transition-colors flex items-center justify-between mt-1 cursor-pointer"
                >
                  <span>Đặt Hẹn Ngay</span>
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              id="nav-link-products"
              onClick={() => scrollToSection('products')}
              className="hover:text-[#C89B68] transition-colors duration-200 py-1 relative group cursor-pointer"
            >
              Sản phẩm
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C89B68] group-hover:w-full transition-all duration-300"></span>
            </button>

            <button
              id="nav-link-pricing"
              onClick={() => scrollToSection('pricing')}
              className="hover:text-[#C89B68] transition-colors duration-200 py-1 relative group cursor-pointer"
            >
              Bảng giá
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C89B68] group-hover:w-full transition-all duration-300"></span>
            </button>

            <button
              id="nav-link-blog"
              onClick={() => scrollToSection('blog')}
              className="hover:text-[#C89B68] transition-colors duration-200 py-1 relative group cursor-pointer"
            >
              Tin tức
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C89B68] group-hover:w-full transition-all duration-300"></span>
            </button>

            <button
              id="nav-link-contact"
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#C89B68] transition-colors duration-200 py-1 relative group cursor-pointer"
            >
              Liên hệ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C89B68] group-hover:w-full transition-all duration-300"></span>
            </button>
          </nav>

          {/* Right Action Icons & CTA */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Button */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              aria-label="Tìm kiếm dịch vụ và sản phẩm"
              className="p-2 text-[#4A3B32] hover:text-[#C89B68] hover:bg-[#F5EBE6] rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Shopping Cart Button with count badge */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              aria-label="Xem giỏ hàng"
              className="p-2 text-[#4A3B32] hover:text-[#C89B68] hover:bg-[#F5EBE6] rounded-full transition-colors relative cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span
                  id="header-cart-badge"
                  className="absolute -top-0.5 -right-0.5 bg-[#C89B68] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm animate-pulse"
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Prominent CTA Button */}
            <button
              id="header-cta-btn"
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#4A3B32] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase shadow-sm hover:bg-[#C89B68] hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              LIÊN HỆ NGAY
            </button>

            {/* Mobile menu toggle button */}
            <button
              id="header-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Mở menu di động"
              className="md:hidden p-2 text-[#4A3B32] hover:text-[#C89B68] rounded-lg cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden bg-[#FAF7F2] border-b border-[#EADBCE] px-4 pt-3 pb-6 space-y-3 mt-3 animate-fadeIn"
        >
          <div className="flex flex-col space-y-2 text-base font-medium text-[#4A3B32]">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#F5EBE6] hover:text-[#C89B68] transition-colors"
            >
              Trang chủ
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#F5EBE6] hover:text-[#C89B68] transition-colors"
            >
              Giới thiệu
            </button>
            <div className="border-l-2 border-[#C89B68] pl-3 py-1 space-y-1">
              <span className="text-xs uppercase tracking-wider text-[#7A675C] font-semibold">Dịch vụ</span>
              <button
                onClick={() => scrollToSection('treatments')}
                className="block text-left py-1 text-sm hover:text-[#C89B68]"
              >
                • Công nghệ & Điều trị
              </button>
              <button
                onClick={() => scrollToSection('relaxation')}
                className="block text-left py-1 text-sm hover:text-[#C89B68]"
              >
                • Spa thư giãn & Nến thơm
              </button>
              <button
                onClick={() => scrollToSection('team')}
                className="block text-left py-1 text-sm hover:text-[#C89B68]"
              >
                • Đội ngũ chuyên gia
              </button>
            </div>
            <button
              onClick={() => scrollToSection('products')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#F5EBE6] hover:text-[#C89B68] transition-colors"
            >
              Sản phẩm
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#F5EBE6] hover:text-[#C89B68] transition-colors"
            >
              Bảng giá dịch vụ
            </button>
            <button
              onClick={() => scrollToSection('blog')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#F5EBE6] hover:text-[#C89B68] transition-colors"
            >
              Tin tức & Cẩm nang
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left px-3 py-2 rounded-md hover:bg-[#F5EBE6] hover:text-[#C89B68] transition-colors"
            >
              Liên hệ
            </button>
          </div>

          <div className="pt-3 border-t border-[#EADBCE] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-full bg-[#4A3B32] text-[#FAF7F2] font-semibold text-sm text-center shadow-md hover:bg-[#C89B68] transition-colors"
            >
              ĐẶT LỊCH HẸN NGAY
            </button>
            <a
              href={`tel:${SPA_CONFIG.phone}`}
              className="w-full py-2.5 rounded-full border border-[#4A3B32] text-[#4A3B32] font-medium text-xs text-center flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#C89B68]" />
              Hotline: {SPA_CONFIG.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
