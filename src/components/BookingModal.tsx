import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, User, Phone, CheckCircle2 } from 'lucide-react';
import { CORE_TREATMENTS, EXPERT_TEAM } from '../data/spaData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialExpert?: string;
  onSuccess: (msg: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialService = '',
  initialExpert = '',
  onSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(initialService || CORE_TREATMENTS[0].title);
  const [expert, setExpert] = useState(initialExpert || 'Tự động chọn chuyên viên phù hợp nhất');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      alert('Vui lòng nhập họ tên và số điện thoại liên lạc.');
      return;
    }
    setIsSuccess(true);
    onSuccess(`Đặt lịch thành công! Mona Beauty Blendz sẽ xác nhận lịch hẹn ${service} vào ngày ${date || 'sớm nhất'} qua SĐT ${phone}.`);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-[#EADBCE] shadow-2xl p-6 sm:p-8 relative text-[#33251D]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#EADBCE]/50 hover:bg-[#EADBCE] text-[#33251D] transition-colors cursor-pointer"
          aria-label="Đóng bảng đặt lịch"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#2A9D8F]/20 text-[#2A9D8F] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#33251D]">
              Đặt Lịch Hẹn Thành Công!
            </h3>
            <p className="text-sm text-[#5F4E44]">
              Cảm ơn quý khách đã tin tưởng Mona Beauty Blendz. Chuyên viên CSKH sẽ liên hệ xác nhận trong ít phút.
            </p>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F5EBE6] text-[#C89B68] text-xs font-bold tracking-widest uppercase mb-2 border border-[#EADBCE]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Đặt Lịch Hẹn Trực Tuyến</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#33251D]">
                Trải Nghiệm Dịch Vụ Spa Chuẩn 5 Sao
              </h3>
              <p className="text-xs text-[#7A675C] mt-1">
                Ưu đãi giảm 20% tổng hóa đơn khi đặt chỗ trước qua website
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-1 uppercase tracking-wider">
                  Họ và tên quý khách *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàng Linh"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-sm focus:outline-none focus:border-[#C89B68]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-1 uppercase tracking-wider">
                  Số điện thoại liên lạc *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="09xx xxx xxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-sm focus:outline-none focus:border-[#C89B68]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-1 uppercase tracking-wider">
                  Dịch vụ mong muốn trải nghiệm
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-sm focus:outline-none focus:border-[#C89B68]"
                >
                  {CORE_TREATMENTS.map((t) => (
                    <option key={t.id} value={t.title}>
                      {t.title} ({t.duration} - {t.price})
                    </option>
                  ))}
                  <option value="Gội đầu dưỡng sinh thảo dược">Gội đầu dưỡng sinh thảo dược (45p - 150K)</option>
                  <option value="Massage Body đá nóng Himalaya">Massage Body đá nóng Himalaya (75p - 380K)</option>
                  <option value="Tắm khoáng Onsen thảo dược">Tắm khoáng Onsen thảo dược (45p - 200K)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-1 uppercase tracking-wider">
                  Chuyên viên ưu tiên (Tùy chọn)
                </label>
                <select
                  value={expert}
                  onChange={(e) => setExpert(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-sm focus:outline-none focus:border-[#C89B68]"
                >
                  <option value="Tự động chọn chuyên viên phù hợp nhất">Tự động chọn chuyên viên phù hợp nhất</option>
                  {EXPERT_TEAM.map((exp) => (
                    <option key={exp.id} value={exp.name}>
                      {exp.name} - {exp.role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1 uppercase tracking-wider">
                    Ngày hẹn
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-sm focus:outline-none focus:border-[#C89B68]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1 uppercase tracking-wider">
                    Khung giờ
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#EADBCE] bg-white text-sm focus:outline-none focus:border-[#C89B68]"
                  >
                    <option value="09:00">09:00 Sáng</option>
                    <option value="10:00">10:00 Sáng</option>
                    <option value="11:30">11:30 Trưa</option>
                    <option value="14:00">14:00 Chiều</option>
                    <option value="15:30">15:30 Chiều</option>
                    <option value="17:00">17:00 Chiều</option>
                    <option value="18:30">18:30 Tối</option>
                    <option value="19:30">19:30 Tối</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A3B32] mb-1 uppercase tracking-wider">
                  Ghi chú tình trạng da / Yêu cầu riêng
                </label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Da mỏng nhạy cảm, thích lực ấn nhẹ..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-[#EADBCE] bg-white text-sm focus:outline-none focus:border-[#C89B68]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#4A3B32] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-[#C89B68] hover:shadow-lg transition-all duration-300 cursor-pointer mt-2"
              >
                XÁC NHẬN ĐẶT LỊCH HẸN
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
