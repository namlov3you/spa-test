/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { CoreFeatures } from './components/CoreFeatures';
import { BrandIntro } from './components/BrandIntro';
import { SpaCarousel } from './components/SpaCarousel';
import { ServiceProcess } from './components/ServiceProcess';
import { ProductsSection } from './components/ProductsSection';
import { BrandPartners } from './components/BrandPartners';
import { Testimonials } from './components/Testimonials';
import { ExpertTeam } from './components/ExpertTeam';
import { PriceList } from './components/PriceList';
import { BlogSection } from './components/BlogSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { ServiceModal } from './components/ServiceModal';
import { Toast } from './components/Toast';
import { PRODUCTS_LIST } from './data/spaData';
import { ProductItem, CartItem, ServiceItem } from './types';

export default function App() {
  // Shopping Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS_LIST[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Booking Modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');
  const [selectedExpertForBooking, setSelectedExpertForBooking] = useState('');

  // Search Modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Service Detail Modal state
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceItem | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Scroll-to-top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Notification helper
  const showNotice = (msg: string) => {
    setToastMessage(msg);
  };

  // Cart operations
  const handleAddToCart = (product: ProductItem) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showNotice(`Đã thêm "${product.name}" vào giỏ hàng thành công!`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showNotice('Đã xóa sản phẩm khỏi giỏ hàng.');
  };

  // Booking triggers
  const handleOpenBooking = (serviceName = '', expertName = '') => {
    setSelectedServiceForBooking(serviceName);
    setSelectedExpertForBooking(expertName);
    setIsBookingOpen(true);
  };

  // Scroll to section helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track window scroll for Scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto dismiss toast
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#33251D] flex flex-col selection:bg-[#EADBCE] selection:text-[#33251D]">
      {/* 1. Header & Navigation Bar (Sticky Header) */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      <main className="flex-grow">
        {/* 2. Hero Section (Slider Banner chính) */}
        <div>
          <HeroSlider
            onOpenBooking={() => handleOpenBooking()}
            onExploreTreatments={() => scrollTo('treatments')}
          />
        </div>

        {/* 3. Core Features / Treatments Highlights (Khám phá dịch vụ & công nghệ) */}
        <div>
          <CoreFeatures
            onSelectService={(service) => setActiveServiceDetail(service)}
            onOpenBookingWithService={(serviceTitle) => handleOpenBooking(serviceTitle)}
          />
        </div>

        {/* 4. Brand Intro / Feature Spotlight */}
        <div>
          <BrandIntro
            onOpenBooking={() => handleOpenBooking()}
            onExploreServices={() => scrollTo('treatments')}
          />
        </div>

        {/* 5. Spa & Relaxation Services Carousel (Dịch vụ Spa thư giãn) */}
        <div>
          <SpaCarousel onOpenBooking={() => handleOpenBooking()} />
        </div>

        {/* 6. Service Process Steps (6 Bước khám phá dịch vụ spa) */}
        <div>
          <ServiceProcess onOpenBooking={() => handleOpenBooking()} />
        </div>

        {/* 7. Products Section (Sản phẩm mới nhất) */}
        <div>
          <ProductsSection
            onAddToCart={handleAddToCart}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </div>

        {/* 8. Brand Partners / Logo Bar */}
        <div>
          <BrandPartners />
        </div>

        {/* 9. Customer Testimonials (Khách hàng đánh giá) */}
        <div>
          <Testimonials />
        </div>

        {/* 10. Expert Team (Đội ngũ chuyên gia làm đẹp) */}
        <div>
          <ExpertTeam
            onOpenBookingWithExpert={(expertName) => handleOpenBooking('', expertName)}
          />
        </div>

        {/* 11. Price List Section (Bảng giá chi tiết dịch vụ) */}
        <div>
          <PriceList
            onOpenBookingWithService={(serviceName) => handleOpenBooking(serviceName)}
          />
        </div>

        {/* 12. News & Blog (Tin tức nổi bật) */}
        <div>
          <BlogSection />
        </div>

        {/* 13. Call To Action (Nhận tư vấn miễn phí) */}
        <div>
          <CtaSection onSuccessNotice={showNotice} />
        </div>
      </main>

      {/* 14. Footer */}
      <Footer onSuccessNotice={showNotice} />

      {/* Interactive Modals & Floating Tools */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialService={selectedServiceForBooking}
        initialExpert={selectedExpertForBooking}
        onSuccess={showNotice}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckoutSuccess={showNotice}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectService={(serviceTitle) => handleOpenBooking(serviceTitle)}
        onSelectProduct={() => {
          scrollTo('products');
        }}
      />

      <ServiceModal
        service={activeServiceDetail}
        onClose={() => setActiveServiceDetail(null)}
        onBookService={(serviceTitle) => handleOpenBooking(serviceTitle)}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          id="scroll-to-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Cuộn lên đầu trang"
          className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-[#4A3B32] text-[#FAF7F2] border border-[#C89B68]/50 shadow-xl flex items-center justify-center hover:bg-[#C89B68] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
