import React, { useState } from 'react';
import { Sparkles, Calendar, User, Clock, ArrowRight, X } from 'lucide-react';
import { BLOG_POSTS } from '../data/spaData';
import { BlogPost } from '../types';

export const BlogSection: React.FC = () => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // News & Blog (Tin tức nổi bật)
  return (
    <section
      id="blog"
      aria-label="Tin tức làm đẹp và cẩm nang chăm sóc da"
      className="py-20 lg:py-28 bg-[#F5EBE6] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#C89B68] text-xs font-bold tracking-widest uppercase mb-3 border border-[#EADBCE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cẩm Nang Làm Đẹp</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#33251D] tracking-tight">
            Tin Tức Nổi Bật & Kiến Thức Skincare
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B68] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#5F4E44]">
            Chia sẻ kinh nghiệm dưỡng nhan, công thức chăm sóc da tự nhiên và những bí quyết thư giãn chuẩn chuyên gia.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.id}
              id={`blog-card-${post.id}`}
              className="blog-card bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C89B68] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative h-52 w-full overflow-hidden bg-[#FAF7F2]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-[#4A3B32]/90 backdrop-blur-sm text-[#FAF7F2] text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                {/* Article Info Bar: Date, Author (By MONAMEDIA), Read Time */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-[#7A675C] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C89B68]" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-semibold text-[#4A3B32]">
                      <User className="w-3.5 h-3.5 text-[#C89B68]" />
                      By {post.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg font-bold text-[#33251D] group-hover:text-[#C89B68] transition-colors leading-snug mb-3 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs sm:text-sm text-[#5F4E44] leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Trigger */}
              <div className="px-6 pb-6 pt-2 border-t border-[#EADBCE]/50 flex items-center justify-between">
                <span className="text-xs text-[#7A675C] flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#C89B68]" />
                  {post.readTime}
                </span>

                <button
                  onClick={() => setActivePost(post)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#4A3B32] group-hover:text-[#C89B68] transition-colors cursor-pointer"
                >
                  <span>ĐỌC BÀI VIẾT</span>
                  <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Modal */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[88vh] overflow-y-auto border border-[#EADBCE] shadow-2xl p-6 sm:p-8 relative">
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#EADBCE]/50 hover:bg-[#EADBCE] text-[#33251D] transition-colors cursor-pointer"
              aria-label="Đóng bài viết"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs font-bold text-[#C89B68] uppercase tracking-wider block mb-2">
              {activePost.category}
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#33251D] mb-4 pr-6">
              {activePost.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-[#7A675C] mb-6 pb-4 border-b border-[#EADBCE]">
              <span>{activePost.date}</span>
              <span>•</span>
              <span className="font-semibold text-[#4A3B32]">By {activePost.author}</span>
              <span>•</span>
              <span>{activePost.readTime}</span>
            </div>

            <div className="rounded-2xl overflow-hidden mb-6 h-64 bg-gray-100">
              <img src={activePost.image} alt={activePost.title} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-4 text-sm text-[#4A3B32] leading-relaxed">
              <p className="font-medium text-base text-[#33251D]">
                {activePost.excerpt}
              </p>
              <p>{activePost.content}</p>
              <p>
                Tại Mona Beauty Blendz, chúng tôi cam kết mang lại sự an tâm tuyệt đối cho từng khách hàng qua việc cá nhân hóa từng bước trị liệu. Hãy ghé thăm địa chỉ 1073/23 Cách Mạng Tháng 8, Q. Tân Bình hoặc gọi hotline 1900 636 648 để được tư vấn trực tiếp cùng bác sĩ da liễu!
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#EADBCE] flex justify-end">
              <button
                onClick={() => setActivePost(null)}
                className="px-6 py-2.5 rounded-full bg-[#4A3B32] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase hover:bg-[#C89B68] transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
