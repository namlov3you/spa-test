import React from 'react';
import { Sparkles, Award, Calendar, ArrowRight } from 'lucide-react';
import { EXPERT_TEAM } from '../data/spaData';

interface ExpertTeamProps {
  onOpenBookingWithExpert: (expertName: string) => void;
}

export const ExpertTeam: React.FC<ExpertTeamProps> = ({ onOpenBookingWithExpert }) => {
  // Expert Team (Đội ngũ chuyên gia làm đẹp)
  return (
    <section
      id="team"
      aria-label="Đội ngũ chuyên gia làm đẹp Mona Beauty Blendz"
      className="py-20 lg:py-28 bg-[#F5EBE6] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#C89B68] text-xs font-bold tracking-widest uppercase mb-3 border border-[#EADBCE]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Đội Ngũ Bàn Tay Vàng</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#33251D] tracking-tight">
            Đội Ngũ Chuyên Gia Làm Đẹp Hàng Đầu
          </h2>
          <div className="w-16 h-0.5 bg-[#C89B68] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#5F4E44]">
            Hội tụ những chuyên gia giàu kinh nghiệm được tu nghiệp tại Pháp, Thụy Sĩ và Nhật Bản, mang đến trải nghiệm thẩm mỹ cá nhân hóa đỉnh cao.
          </p>
        </div>

        {/* Circular Avatars Expert Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {EXPERT_TEAM.map((member) => (
            <div
              key={member.id}
              id={`expert-card-${member.id}`}
              className="expert-card bg-[#FFFDF9] rounded-2xl border border-[#EADBCE] p-6 text-center shadow-sm hover:shadow-xl hover:border-[#C89B68] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-between group"
            >
              <div className="flex flex-col items-center w-full">
                {/* Circular Avatar with luxury outer ring */}
                <div className="relative mb-5">
                  <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1.5 border-2 border-[#C89B68] bg-[#F5EBE6] group-hover:scale-105 transition-transform duration-500 overflow-hidden shadow-md">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <span className="absolute bottom-1 right-2 bg-[#4A3B32] text-[#FAF7F2] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#C89B68]">
                    {member.experience}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="font-serif text-xl font-bold text-[#33251D] group-hover:text-[#C89B68] transition-colors mb-1">
                  {member.name}
                </h3>
                <span className="text-xs font-semibold text-[#C89B68] uppercase tracking-wider block mb-1">
                  {member.role}
                </span>
                <span className="text-[11px] text-[#7A675C] italic block mb-3 font-serif">
                  ({member.titleEn})
                </span>

                {/* Specialty */}
                <p className="text-xs text-[#5F4E44] leading-relaxed mb-6 px-2">
                  {member.specialty}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onOpenBookingWithExpert(member.name)}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full border border-[#4A3B32] text-[#4A3B32] text-xs font-semibold hover:bg-[#4A3B32] hover:text-[#FAF7F2] transition-colors duration-300 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Đặt Lịch Với Chuyên Gia</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
