import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckoutSuccess: (msg: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckoutSuccess,
}) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const formatVND = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Vui lòng nhập tên và số điện thoại nhận hàng.');
      return;
    }
    onCheckoutSuccess(`Đặt hàng thành công! Mona Beauty Blendz sẽ gửi đơn hàng trị giá ${formatVND(totalAmount)} đến ${customerName}.`);
    setCheckingOut(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#EADBCE] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#EADBCE] flex items-center justify-between bg-white/80">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C89B68]" />
              <h3 className="font-serif text-xl font-bold text-[#33251D]">
                Giỏ Hàng Của Bạn
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F5EBE6] text-[#C89B68] border border-[#EADBCE]">
                {cartItems.reduce((sum, i) => sum + i.quantity, 0)} món
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F5EBE6] text-[#5F4E44] transition-colors cursor-pointer"
              aria-label="Đóng giỏ hàng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-16 text-center text-[#7A675C] space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto text-[#EADBCE]" />
                <p className="font-medium text-sm">Giỏ hàng của bạn đang trống</p>
                <p className="text-xs text-[#A8988D]">
                  Hãy khám phá các dòng dược mỹ phẩm thiên nhiên độc quyền của Mona nhé!
                </p>
              </div>
            ) : checkingOut ? (
              <form id="checkout-form" onSubmit={handleCompleteOrder} className="space-y-4">
                <h4 className="font-serif font-bold text-base text-[#33251D] border-b border-[#EADBCE] pb-2">
                  Thông Tin Giao Hàng (COD)
                </h4>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1">
                    Tên người nhận *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Thị Lan"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBCE] bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="09xx xxx xxx"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBCE] bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#4A3B32] mb-1">
                    Địa chỉ nhận hàng
                  </label>
                  <input
                    type="text"
                    placeholder="Số nhà, đường, quận, thành phố..."
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-[#EADBCE] bg-white text-sm"
                  />
                </div>

                <div className="pt-2 text-xs text-[#7A675C]">
                  * Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500.000đ.
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCheckingOut(false)}
                    className="w-1/2 py-2.5 rounded-full border border-[#4A3B32] text-xs font-semibold"
                  >
                    Quay Lại
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-full bg-[#4A3B32] text-[#FAF7F2] text-xs font-semibold hover:bg-[#C89B68]"
                  >
                    Xác Nhận Đặt
                  </button>
                </div>
              </form>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-white rounded-xl border border-[#EADBCE] p-3 flex gap-3 items-center shadow-xs"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[#33251D] truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-xs text-[#C89B68] font-bold block">
                      {formatVND(item.product.price)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-1.5">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded border border-[#EADBCE] flex items-center justify-center text-xs hover:bg-[#FAF7F2]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold px-1">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded border border-[#EADBCE] flex items-center justify-center text-xs hover:bg-[#FAF7F2]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="text-[#A8988D] hover:text-red-600 p-1.5 transition-colors"
                    title="Xóa khỏi giỏ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal */}
          {cartItems.length > 0 && !checkingOut && (
            <div className="p-6 border-t border-[#EADBCE] bg-white/80 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[#5F4E44]">Tạm tính:</span>
                <span className="font-serif text-xl font-bold text-[#33251D]">
                  {formatVND(totalAmount)}
                </span>
              </div>

              <button
                onClick={() => setCheckingOut(true)}
                className="w-full py-3.5 rounded-full bg-[#4A3B32] text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase hover:bg-[#C89B68] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>TIẾN HÀNH THANH TOÁN (COD)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
