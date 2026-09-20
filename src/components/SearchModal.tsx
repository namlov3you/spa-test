import React, { useState } from 'react';
import { X, Search, Sparkles, ShoppingBag, BookOpen, ArrowRight } from 'lucide-react';
import { CORE_TREATMENTS, PRODUCTS_LIST, BLOG_POSTS } from '../data/spaData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (title: string) => void;
  onSelectProduct: (name: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingServices = q
    ? CORE_TREATMENTS.filter(s => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q))
    : [];

  const matchingProducts = q
    ? PRODUCTS_LIST.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q))
    : [];

  const matchingBlogs = q
    ? BLOG_POSTS.filter(b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full border border-[#EADBCE] shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#EADBCE] bg-white flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C89B68]" />
          <input
            type="text"
            autoFocus
            placeholder="Tìm kiếm liệu trình (ánh sáng LED, đá nóng...), sản phẩm hoặc cẩm nang..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-[#33251D] placeholder-[#A8988D] text-sm sm:text-base focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F5EBE6] text-[#7A675C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Area */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
          {!q ? (
            <div className="space-y-4 text-xs text-[#7A675C]">
              <span className="font-semibold text-[#4A3B32] uppercase tracking-wider block">
                Gợi ý tìm kiếm phổ biến:
              </span>
              <div className="flex flex-wrap gap-2">
                {['Ánh sáng LED', 'Đá nóng Himalaya', 'Face Oil Max', 'Oxy tươi', 'Thảo dược hữu cơ'].map((hint) => (
                  <button
                    key={hint}
                    onClick={() => setQuery(hint)}
                    className="px-3 py-1.5 rounded-full bg-white border border-[#EADBCE] text-[#5F4E44] hover:border-[#C89B68] hover:text-[#C89B68] transition-colors"
                  >
                    {hint}
                  </button>
                ))}
              </div>
            </div>
          ) : matchingServices.length === 0 && matchingProducts.length === 0 && matchingBlogs.length === 0 ? (
            <div className="py-8 text-center text-sm text-[#7A675C]">
              Không tìm thấy kết quả nào phù hợp với "{query}". Vui lòng thử từ khóa khác.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Services Results */}
              {matchingServices.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C89B68] mb-3">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dịch Vụ & Liệu Trình ({matchingServices.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchingServices.map((s) => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onClose();
                          onSelectService(s.title);
                        }}
                        className="p-3 rounded-xl bg-white border border-[#EADBCE] hover:border-[#C89B68] hover:shadow-xs flex items-center justify-between cursor-pointer transition-all"
                      >
                        <div>
                          <h5 className="font-serif font-bold text-sm text-[#33251D]">{s.title}</h5>
                          <span className="text-xs text-[#7A675C]">{s.duration} - {s.price}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#C89B68]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products Results */}
              {matchingProducts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C89B68] mb-3">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Sản Phẩm Mỹ Phẩm ({matchingProducts.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchingProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          onClose();
                          onSelectProduct(p.name);
                        }}
                        className="p-3 rounded-xl bg-white border border-[#EADBCE] hover:border-[#C89B68] hover:shadow-xs flex items-center justify-between cursor-pointer transition-all"
                      >
                        <div>
                          <h5 className="font-serif font-bold text-sm text-[#33251D]">{p.name}</h5>
                          <span className="text-xs text-[#C89B68] font-semibold">{p.price.toLocaleString('vi-VN')}đ</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#C89B68]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog Results */}
              {matchingBlogs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C89B68] mb-3">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Cẩm Nang Làm Đẹp ({matchingBlogs.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchingBlogs.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => {
                          onClose();
                          const el = document.getElementById('blog');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="p-3 rounded-xl bg-white border border-[#EADBCE] hover:border-[#C89B68] flex items-center justify-between cursor-pointer"
                      >
                        <h5 className="font-serif font-medium text-xs text-[#33251D] line-clamp-1">{b.title}</h5>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C89B68] flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
