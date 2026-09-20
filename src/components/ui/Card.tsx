import React from 'react';
import { Clock, Star, ArrowRight, ShoppingBag, Check } from 'lucide-react';
import { Button } from './Button';

export interface ServiceCardData {
  id: string | number;
  title: string;
  subtitle?: string;
  image: string;
  price: string;
  duration?: string;
  badge?: string;
  benefits?: string[];
}

export interface ProductCardData {
  id: string | number;
  name: string;
  category?: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  volume?: string;
  isBestSeller?: boolean;
}

export type CardVariant = 'service' | 'product' | 'feature' | 'default';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  serviceData?: ServiceCardData;
  productData?: ProductCardData;
  onBookService?: (serviceTitle: string) => void;
  onViewServiceDetail?: (service: ServiceCardData) => void;
  onAddToCart?: (product: ProductCardData) => void;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  serviceData,
  productData,
  onBookService,
  onViewServiceDetail,
  onAddToCart,
  className = '',
  children,
  ...props
}) => {
  // Service Variant Card
  if (variant === 'service' && serviceData) {
    return (
      <div
        className={`group flex flex-col h-full bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#EADBCE] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${className}`}
        {...props}
      >
        {/* Service Image with Zoom effect */}
        <div className="relative h-60 w-full overflow-hidden bg-[#EADBCE]/30">
          <img
            src={serviceData.image}
            alt={serviceData.title}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {serviceData.badge && (
            <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#4A3B32]/85 text-[#FAF7F2] backdrop-blur-sm shadow-sm">
              {serviceData.badge}
            </div>
          )}
          {serviceData.duration && (
            <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 rounded-md text-xs font-medium bg-[#1E140F]/80 text-[#FAF7F2] backdrop-blur-sm flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#C89B68]" />
              <span>{serviceData.duration}</span>
            </div>
          )}
        </div>

        {/* Service Details */}
        <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
          <div className="space-y-2">
            <h3 className="font-serif text-xl font-bold text-[#33251D] group-hover:text-[#C89B68] transition-colors leading-snug">
              {serviceData.title}
            </h3>
            {serviceData.subtitle && (
              <p className="text-xs text-[#7A695E] line-clamp-2 leading-relaxed">
                {serviceData.subtitle}
              </p>
            )}

            {serviceData.benefits && serviceData.benefits.length > 0 && (
              <ul className="pt-2 space-y-1.5">
                {serviceData.benefits.slice(0, 2).map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-[#5F4E44]">
                    <Check className="w-3.5 h-3.5 text-[#C89B68] shrink-0" />
                    <span className="line-clamp-1">{benefit}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pt-4 border-t border-[#EADBCE]/70 flex items-center justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#7A695E] block">
                Giá dịch vụ
              </span>
              <span className="font-serif text-lg font-bold text-[#4A3B32]">
                {serviceData.price}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onViewServiceDetail && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onViewServiceDetail(serviceData)}
                  className="text-xs px-2.5"
                >
                  Chi tiết
                </Button>
              )}
              {onBookService && (
                <Button
                  size="sm"
                  variant="gold"
                  onClick={() => onBookService(serviceData.title)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  className="text-xs"
                >
                  Đặt hẹn
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product Variant Card
  if (variant === 'product' && productData) {
    const formattedPrice = new Intl.NumberFormat('vi-VN').format(productData.price) + 'đ';
    const formattedOriginal = productData.originalPrice
      ? new Intl.NumberFormat('vi-VN').format(productData.originalPrice) + 'đ'
      : null;

    return (
      <div
        className={`group flex flex-col h-full bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#EADBCE] shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 ${className}`}
        {...props}
      >
        {/* Product Image */}
        <div className="relative h-56 w-full p-4 bg-[#FAF7F2] flex items-center justify-center overflow-hidden">
          <img
            src={productData.image}
            alt={productData.name}
            className="h-full max-h-48 object-contain object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
          />
          {productData.isBestSeller && (
            <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#C89B68] text-[#1E140F]">
              Bán chạy
            </div>
          )}
          {productData.volume && (
            <div className="absolute bottom-3 right-3 text-[11px] text-[#7A695E] bg-white/80 px-2 py-0.5 rounded">
              {productData.volume}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
          <div className="space-y-1.5">
            {productData.category && (
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C89B68]">
                {productData.category}
              </span>
            )}
            <h4 className="font-serif text-base font-bold text-[#33251D] group-hover:text-[#4A3B32] transition-colors line-clamp-2">
              {productData.name}
            </h4>

            {productData.rating && (
              <div className="flex items-center gap-1 text-[#C89B68] text-xs pt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(productData.rating || 5)
                        ? 'fill-current'
                        : 'opacity-30'
                    }`}
                  />
                ))}
                <span className="text-[#7A695E] text-[11px] ml-1">({productData.rating})</span>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#EADBCE]/60 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-serif text-base font-bold text-[#4A3B32]">
                {formattedPrice}
              </span>
              {formattedOriginal && (
                <span className="text-xs text-[#A08F83] line-through">
                  {formattedOriginal}
                </span>
              )}
            </div>

            {onAddToCart && (
              <button
                onClick={() => onAddToCart(productData)}
                aria-label="Thêm vào giỏ"
                className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#EADBCE] text-[#4A3B32] hover:bg-[#C89B68] hover:border-[#C89B68] hover:text-[#1E140F] flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default Container Card
  return (
    <div
      className={`bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#EADBCE] shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
