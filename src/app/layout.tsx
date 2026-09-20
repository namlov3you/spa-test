import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata = {
  title: 'Mona Beauty Blendz - Luxury Spa & Skincare',
  description: 'Trang web giới thiệu dịch vụ Spa & Chăm sóc da cao cấp Mona Beauty Blendz với liệu trình chuyên sâu 25 năm kinh nghiệm.',
  keywords: ['Spa cao cấp', 'Chăm sóc da', 'Mona Beauty Blendz', 'Trị liệu da mặt', 'Massage trị liệu'],
  openGraph: {
    title: 'Mona Beauty Blendz - Luxury Spa & Skincare',
    description: 'Trang web giới thiệu dịch vụ Spa & Chăm sóc da cao cấp Mona Beauty Blendz với liệu trình chuyên sâu 25 năm kinh nghiệm.',
    type: 'website',
    locale: 'vi_VN',
    siteName: 'Mona Beauty Blendz',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root Layout chuẩn Next.js 14 App Router
 * Bao gồm Sticky Responsive Header và Footer đầy đủ thông tin Spa
 */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#33251D] antialiased selection:bg-[#EADBCE] selection:text-[#33251D]">
      {/* 1. Header Navigation Bar (Sticky, Responsive, Mobile Menu) */}
      <Header
        cartCount={0}
        onOpenCart={() => {}}
        onOpenSearch={() => {}}
        onOpenBooking={() => {
          const el = document.getElementById('booking');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Main Page Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* 3. Spa Footer (Đầy đủ thông tin pháp lý, chi nhánh, hotline) */}
      <Footer onSuccessNotice={() => {}} />
    </div>
  );
}
