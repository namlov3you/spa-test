import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Star, Eye, ArrowRight, Check } from 'lucide-react';
import { PRODUCTS_LIST } from '../data/spaData';
import { ProductItem } from '../types';

interface ProductsSectionProps {
  onAddToCart: (product: ProductItem) => void;
  onOpenCart: () => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  onAddToCart,
  onOpenCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const categories = [
    { id: 'all', label: 'Tất Cả Sản Phẩm' },
    { id: 'Chăm sóc da mặt', label: 'Chăm Sóc Da Mặt' },
    { id: 'Serum & Tinh chất', label: 'Serum & Tinh Chất' },
    { id: 'Chăm sóc toàn thân', label: 'Chăm Sóc Toàn Thân' },
    { id: 'Makeup & Dưỡng môi', label: 'Makeup & Dưỡng Môi' },
  ];

  const filteredProducts = selectedCategory === 'all'
    ? PRODUCTS_LIST
    : PRODUCTS_LIST.filter(p => p.category === selectedCategory);

  const formatVND = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const handleAdd = (product: ProductItem) => {
    onAddToCart(product);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  // Products Section (Sản phẩm mới nhất)
  return (
    <section
      id="products"
      aria-label="Sản phẩm dưỡng da và mỹ phẩm mới nhất"
      className="py-20 lg:py-28 bg-[#FAF7F2] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F5EBE6] text-[#C89B68] text-xs font-bold tracking-widest uppercase mb-3 border border-[#EADBCE]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dược Mỹ Phẩm Hữu Cơ Độc Quyền</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#33251D] tracking-tight">
              Sản Phẩm Mới Nhất Dành Cho Bạn
            </h2>
            <div className="w-16 h-0.5 bg-[#C89B68] my-4" />
            <p className="text-sm sm:text-base text-[#5F4E44]">
              Chiết xuất hoàn toàn từ hoa cỏ và tinh chất thiên nhiên, được kiểm nghiệm an toàn cho mọi làn da nhạy cảm.
            </p>
          </div>

          {/* Button "XEM TẤT CẢ" */}
          <div className="mt-6 md:mt-0">
            <button
              id="products-view-all-btn"
              onClick={onOpenCart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#4A3B32] text-[#4A3B32] hover:bg-[#4A3B32] hover:text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
              <span>XEM TẤT CẢ GIỎ HÀNG</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#4A3B32] text-[#FAF7F2] shadow-sm'
                  : 'bg-white border border-[#EADBCE] text-[#5F4E44] hover:border-[#C89B68] hover:text-[#C89B68]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              id={`product-card-${product.id}`}
              className="product-card group bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] p-5 shadow-sm hover:shadow-xl hover:border-[#C89B68] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Product Image Box */}
                <div className="relative h-64 w-full rounded-xl overflow-hidden mb-4 bg-[#F5EBE6]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* SALE! Badge */}
                  {product.saleLabel && (
                    <span className="absolute top-3 left-3 bg-[#E76F51] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                      {product.saleLabel}
                    </span>
                  )}
                  {/* Volume tag */}
                  <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-[#5F4E44] text-[11px] font-medium px-2.5 py-0.5 rounded shadow-sm">
                    {product.volume}
                  </span>
                </div>

                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#C89B68] font-semibold">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-semibold text-[#4A3B32]">{product.rating}</span>
                    <span className="text-[#A8988D]">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="font-serif text-lg font-bold text-[#33251D] group-hover:text-[#C89B68] transition-colors line-clamp-1 mb-2">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#5F4E44] line-clamp-2 mb-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price and Add to Cart Action */}
              <div className="pt-3 border-t border-[#EADBCE] flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-lg font-bold text-[#4A3B32]">
                      {formatVND(product.price)}
                    </span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-[#A8988D] line-through">
                        {formatVND(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  id={`add-to-cart-btn-${product.id}`}
                  onClick={() => handleAdd(product)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                    addedIds[product.id]
                      ? 'bg-[#2A9D8F] text-white'
                      : 'bg-[#4A3B32] text-[#FAF7F2] hover:bg-[#C89B68] shadow-sm hover:shadow-md'
                  }`}
                >
                  {addedIds[product.id] ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>ĐÃ THÊM</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>THÊM GIỎ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
