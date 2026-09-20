import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#4A3B32] text-[#FAF7F2] border border-[#C89B68] rounded-2xl shadow-2xl p-4 flex items-start gap-3 animate-slideUp">
      <CheckCircle2 className="w-5 h-5 text-[#C89B68] flex-shrink-0 mt-0.5" />
      <div className="flex-1 text-xs sm:text-sm leading-snug">
        {message}
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded hover:bg-white/10 text-[#D5C2B2] hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
