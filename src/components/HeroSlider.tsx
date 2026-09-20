import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Star, ShieldCheck } from 'lucide-react';
import { HERO_SLIDES } from '../data/spaData';

interface HeroSliderProps {
  onOpenBooking: () => void;
  onExploreTreatments: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onOpenBooking,
  onExploreTreatments,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Automatic slide rotation
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  const slide = HERO_SLIDES[currentSlide];

  // Hero Section (Slider Banner chính)
  return (
    <section
      id="home"
      aria-label="Hero Slider Banner"
      className="relative min-h-[90vh] md:min-h-[95vh] pt-28 pb-16 flex items-center overflow-hidden bg-[#33251D] text-[#FAF7F2]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with smooth fade transition */}
      {HERO_SLIDES.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'
          } transform transition-transform duration-1000`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.05]"
          />
          {/* Subtle gradient vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E140F]/90 via-[#33251D]/60 to-transparent" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#1E140F]/30 to-[#1E140F]/80" />
        </div>
      ))}

      {/* Decorative leaf / botanic watermark */}
      <div className="absolute top-1/4 right-8 w-96 h-96 rounded-full bg-[#C89B68]/10 blur-3xl pointer-events-none z-10" />

      {/* Slide Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C89B68]/40 text-[#E8D3C0] text-xs uppercase tracking-widest font-semibold shadow-sm animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-[#C89B68]" />
            <span>{slide.badge}</span>
          </div>

          {/* Main Title */}
          <h1
            id="hero-slide-title"
            className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#FFFDF9] leading-[1.15] drop-shadow-sm transition-all duration-700"
          >
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl font-light text-[#EADBCE] italic font-serif">
            {slide.subtitle}
          </p>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#D5C2B2] max-w-xl leading-relaxed">
            {slide.description}
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-5">
            {/* Primary CTA with sliding arrow hover effect */}
            <button
              id="hero-cta-book-btn"
              onClick={onOpenBooking}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#C89B68] text-[#1E140F] font-bold text-sm tracking-wider uppercase shadow-lg shadow-[#C89B68]/30 hover:bg-[#D4AF37] hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <span>{slide.ctaText}</span>
              <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

            {/* Secondary CTA */}
            <button
              id="hero-cta-explore-btn"
              onClick={onExploreTreatments}
              className="inline-flex items-center justify-center px-7 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-[#EADBCE]/40 text-[#FFFDF9] font-medium text-sm tracking-wider hover:bg-white/20 hover:border-[#FFFDF9] transition-all duration-300 cursor-pointer"
            >
              {slide.secondaryCta}
            </button>
          </div>

          {/* Key Trust Badges */}
          <div className="pt-8 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#D5C2B2]">
            <div className="flex items-center gap-2">
              <div className="flex text-[#C89B68]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span>Hơn 12.000+ Khách hàng hài lòng</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C89B68]" />
              <span>100% Dược mỹ phẩm hữu cơ chứng nhận</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls: Left/Right Arrow Buttons */}
      <div className="absolute bottom-8 right-6 sm:right-12 z-20 flex items-center space-x-3">
        {/* Slide indicator numbers */}
        <div className="text-xs font-mono tracking-widest text-[#E8D3C0] mr-2">
          <span className="font-bold text-[#FFFDF9]">0{currentSlide + 1}</span>
          <span className="opacity-50"> / 0{HERO_SLIDES.length}</span>
        </div>

        <button
          id="hero-slider-prev-btn"
          onClick={prevSlide}
          aria-label="Slide trước"
          className="w-11 h-11 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#C89B68] hover:border-[#C89B68] hover:text-[#1E140F] transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          id="hero-slider-next-btn"
          onClick={nextSlide}
          aria-label="Slide tiếp theo"
          className="w-11 h-11 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-[#C89B68] hover:border-[#C89B68] hover:text-[#1E140F] transition-all duration-200 cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Đi tới slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentSlide ? 'w-8 bg-[#C89B68]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
