'use client';

import React, { useState } from 'react';
import { HeroSlider } from '../components/HeroSlider';
import { CoreFeatures } from '../components/CoreFeatures';
import { BrandIntro } from '../components/BrandIntro';
import { SpaCarousel } from '../components/SpaCarousel';
import { ServiceProcess } from '../components/ServiceProcess';
import { ProductsSection } from '../components/ProductsSection';
import { BrandPartners } from '../components/BrandPartners';
import { Testimonials } from '../components/Testimonials';
import { ExpertTeam } from '../components/ExpertTeam';
import { PriceList } from '../components/PriceList';
import { BlogSection } from '../components/BlogSection';
import { CtaSection } from '../components/CtaSection';
import { BookingModal } from '../components/BookingModal';
import { CartDrawer } from '../components/CartDrawer';
import { ServiceModal } from '../components/ServiceModal';
import { Toast } from '../components/Toast';
import { PRODUCTS_LIST } from '../data/spaData';
import { ProductItem, CartItem, ServiceItem } from '../types';

/**
 * Production-Ready Homepage UI (STEP 4)
 * Bao gồm đầy đủ 11 Sections theo yêu cầu:
 * 1. Hero (slider)
 * 2. Services (Core treatments & filters)
 * 3. Intro (25-year brand story & value pillars)
 * 4. Carousel (Relaxation gallery & VIP rooms)
 * 5. Process steps (6-step spa protocol)
 * 6. Products (Organic skincare catalogue & filters)
 * 7. Testimonials (Customer reviews & ratings)
 * 8. Team (Senior master aesthetic experts)
 * 9. Pricing (Transparent service price list)
 * 10. Blog (Beauty tips & skincare knowledge)
 * 11. CTA (Free consultation & special offer form)
 */
export default function HomePage() {
  // Shopping Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS_LIST[0], quantity: 1 },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Booking Modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');
  const [selectedExpertForBooking, setSelectedExpertForBooking] = useState('');

  // Service Detail Modal state
  const [activeServiceDetail, setActiveServiceDetail] = useState<ServiceItem | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section (Slider tự động & chuyển cảnh mượt) */}
      <HeroSlider
        onOpenBooking={() => handleOpenBooking()}
        onExploreTreatments={() => scrollTo('treatments')}
      />

      {/* 2. Services Section (Liệu trình công nghệ cao & bộ lọc phân loại) */}
      <CoreFeatures
        onSelectService={(service) => setActiveServiceDetail(service)}
        onOpenBookingWithService={(serviceTitle) => handleOpenBooking(serviceTitle)}
      />

      {/* 3. Intro Section (Câu chuyện thương hiệu 25 năm & triết lý làm đẹp) */}
      <BrandIntro
        onOpenBooking={() => handleOpenBooking()}
        onExploreServices={() => scrollTo('treatments')}
      />

      {/* 4. Carousel Section (Không gian spa thư giãn & phòng VIP) */}
      <SpaCarousel onOpenBooking={() => handleOpenBooking()} />

      {/* 5. Process Steps Section (Quy trình 6 bước chuẩn y khoa) */}
      <ServiceProcess onOpenBooking={() => handleOpenBooking()} />

      {/* 6. Products Section (Danh mục mỹ phẩm hữu cơ & bộ lọc danh mục) */}
      <ProductsSection
        onAddToCart={handleAddToCart}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Brand Partners (Các thương hiệu đối tác Thụy Sĩ & Pháp) */}
      <BrandPartners />

      {/* 7. Testimonials Section (Đánh giá thực tế từ khách hàng) */}
      <Testimonials />

      {/* 8. Team Section (Đội ngũ bác sĩ & chuyên gia 25 năm kinh nghiệm) */}
      <ExpertTeam
        onOpenBookingWithExpert={(expertName) => handleOpenBooking('', expertName)}
      />

      {/* 9. Pricing Section (Bảng giá chi tiết minh bạch) */}
      <PriceList
        onOpenBookingWithService={(serviceName) => handleOpenBooking(serviceName)}
      />

      {/* 10. Blog Section (Cẩm nang kiến thức skincare & bài viết mới nhất) */}
      <BlogSection />

      {/* 11. CTA Section (Nhận tư vấn miễn phí & ưu đãi khách hàng mới) */}
      <CtaSection onSuccessNotice={showNotice} />

      {/* Interactive Floating Modals */}
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

      <ServiceModal
        service={activeServiceDetail}
        onClose={() => setActiveServiceDetail(null)}
        onBookService={(serviceTitle) => handleOpenBooking(serviceTitle)}
      />

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
