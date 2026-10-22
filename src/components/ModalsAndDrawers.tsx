import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Star,
  ArrowLeft,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ModalsAndDrawers: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotals,
    isCartOpen,
    setIsCartOpen,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    bookingPackage,
    setBookingPackage,
    toastMessage,
  } = useStore();

  const navigate = useNavigate();

  // Booking Modal Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [healthNotes, setHealthNotes] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;
    setBookingConfirmed(true);
  };

  const closeBookingModal = () => {
    setBookingPackage(null);
    setBookingConfirmed(false);
    setClientName('');
    setClientPhone('');
    setCurrentWeight('');
    setTargetWeight('');
    setHealthNotes('');
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#1E1115] text-white text-sm font-bold shadow-xl border border-[#C83E5B]"
        >
          <CheckCircle2 className="w-4 h-4 text-[#E05272] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Slide-Over Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs">
          <div
            role="dialog"
            aria-label="سلة التسوق"
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-5 border-b border-[#EADCE0] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-[#C83E5B]" />
                <h2 className="text-lg font-extrabold text-[#1E1115]">سلة التسوق</h2>
                <span className="text-xs text-[#6E5058] tabular-nums">
                  ({cartItems.length} منتجات)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="إغلاق السلة"
                className="p-2 rounded-xl text-[#5E434B] hover:bg-[#FAF0F2] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cartItems.length > 0 && (
              <div className="px-5 py-3 bg-[#FDF2F4] border-b border-[#F3DCE2] text-xs font-semibold text-[#2A181D]">
                {cartTotals.subtotal >= 1000 ? (
                  <span className="text-[#18794E] font-bold">
                    مبروك! طلبك مؤهل للشحن المجاني لجميع المحافظات
                  </span>
                ) : (
                  <span>
                    أضيفي مشتريات بقيمة{' '}
                    <strong className="text-[#C83E5B] tabular-nums">
                      {1000 - cartTotals.subtotal} ج.م
                    </strong>{' '}
                    للحصول على شحن مجاني!
                  </span>
                )}
              </div>
            )}

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FAF0F2] text-[#C83E5B] flex items-center justify-center mx-auto">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-[#1E1115]">سلة التسوق فارغة حالياً</h3>
                  <p className="text-xs text-[#6E5058] max-w-xs mx-auto">
                    تصفحي منتجات التخسيس، العناية بالبشرة، والوجبات الصحية وأضيفي ما يناسب هدفك.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/shop');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-bold hover:bg-[#B0304B] transition-colors cursor-pointer"
                  >
                    تصفحي المتجر
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF7F8] border border-[#EADCE0]"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 bg-white"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-[#1E1115] truncate">{item.name}</h4>
                      <p className="text-xs text-[#6E5058]">{item.categoryLabel}</p>
                      <p className="text-sm font-extrabold text-[#C83E5B] mt-1 tabular-nums">
                        {item.price * item.quantity} ج.م
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`تقليل كمية ${item.name}`}
                        className="w-7 h-7 rounded-lg bg-white border border-[#DEC8CE] flex items-center justify-center text-[#1E1115] hover:border-[#C83E5B] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`زيادة كمية ${item.name}`}
                        className="w-7 h-7 rounded-lg bg-white border border-[#DEC8CE] flex items-center justify-center text-[#1E1115] hover:border-[#C83E5B] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`حذف ${item.name}`}
                        className="p-1.5 text-[#8C6D76] hover:text-red-600 transition-colors cursor-pointer mr-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Totals & Checkout Link */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-[#EADCE0] bg-[#FAF7F8] space-y-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between text-[#5E434B]">
                    <span>المجموع الفرعي</span>
                    <span className="font-bold tabular-nums">{cartTotals.subtotal} ج.م</span>
                  </div>
                  <div className="flex justify-between text-[#5E434B]">
                    <span>الشحن</span>
                    <span className="font-bold tabular-nums">
                      {cartTotals.shippingFee === 0 ? 'مجاني' : `${cartTotals.shippingFee} ج.م`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-[#1E1115] pt-2 border-t border-[#EADCE0]">
                    <span>الإجمالي</span>
                    <span className="text-[#C83E5B] tabular-nums">{cartTotals.total} ج.م</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <Link
                    to="/cart"
                    onClick={() => setIsCartOpen(false)}
                    className="py-3 px-4 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-xs font-extrabold text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>إتمام الطلب</span>
                    <ArrowLeft className="w-4 h-4" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="py-3 px-4 rounded-xl bg-white border border-[#DEC8CE] text-[#1E1115] text-xs font-bold hover:bg-[#FAF0F2] transition-colors cursor-pointer"
                  >
                    متابعة التسوق
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick View Product Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            role="dialog"
            aria-label={quickViewProduct.name}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EADCE0]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-[#F6EFF1] aspect-square md:aspect-auto relative">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#C83E5B]">
                      {quickViewProduct.categoryLabel}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuickViewProduct(null)}
                      aria-label="إغلاق المعاينة"
                      className="p-1.5 rounded-lg text-[#5E434B] hover:bg-[#FAF0F2] cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#1E1115] mb-2">
                    {quickViewProduct.name}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-[#5E434B] mb-3 tabular-nums">
                    <Star className="w-4 h-4 fill-[#E59819] text-[#E59819]" />
                    <span className="font-bold text-[#1E1115]">{quickViewProduct.rating}</span>
                    <span>· {quickViewProduct.reviewsCount} تقييم موثق</span>
                  </div>

                  <p className="text-sm text-[#4A3239] leading-relaxed mb-4">
                    {quickViewProduct.description}
                  </p>

                  <div className="text-xs text-[#5E434B] bg-[#FAF7F8] p-3 rounded-xl border border-[#EADCE0] mb-4">
                    <strong className="text-[#1E1115] block mb-1">طريقة الاستخدام:</strong>
                    {quickViewProduct.usage}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EADCE0] flex items-center justify-between gap-3">
                  <div className="tabular-nums">
                    <span className="text-2xl font-extrabold text-[#1E1115]">
                      {quickViewProduct.price} ج.م
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="text-xs text-[#8C6D76] line-through block">
                        {quickViewProduct.originalPrice} ج.م
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        addToCart({
                          id: quickViewProduct.id,
                          name: quickViewProduct.name,
                          price: quickViewProduct.price,
                          image: quickViewProduct.image,
                          categoryLabel: quickViewProduct.categoryLabel,
                        });
                        setQuickViewProduct(null);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-xs font-extrabold transition-colors cursor-pointer"
                    >
                      أضف للسلة
                    </button>
                    <Link
                      to={`/product/${quickViewProduct.id}`}
                      onClick={() => setQuickViewProduct(null)}
                      className="px-3 py-2.5 rounded-xl border border-[#DEC8CE] text-[#1E1115] text-xs font-bold hover:bg-[#FAF0F2]"
                    >
                      التفاصيل
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coaching Package Booking Modal */}
      {bookingPackage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            role="dialog"
            aria-label={`حجز ${bookingPackage.name}`}
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#EADCE0]"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-[#C83E5B]">حجز متابعة فورية</span>
                <h3 className="text-xl font-extrabold text-[#1E1115]">
                  {bookingPackage.name} ({bookingPackage.duration})
                </h3>
              </div>
              <button
                type="button"
                onClick={closeBookingModal}
                aria-label="إغلاق نافذة الحجز"
                className="p-2 rounded-xl text-[#5E434B] hover:bg-[#FAF0F2] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {bookingConfirmed ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#E8F8F0] text-[#18794E] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-extrabold text-[#1E1115]">
                  تم تسجيل طلب اشتراكك في {bookingPackage.name} بنجاح!
                </h4>
                <p className="text-sm text-[#5E434B] leading-relaxed">
                  أهلاً بكِ يا <strong>{clientName}</strong>! سيقوم فريق دكتور بيلا بالتواصل معكِ على الرقم{' '}
                  <strong dir="ltr">{clientPhone}</strong> لتحديد موعد التقييم الغذائي الأول، أو يمكنكِ بدء المحادثة فوراً عبر واتساب.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`https://wa.me/201034548199?text=${encodeURIComponent(
                      `مرحباً دكتور بيلا، أود تأكيد حجز (${bookingPackage.name} - ${bookingPackage.price} ج.م). الاسم: ${clientName} - الوزن الحالي: ${currentWeight} كجم - الوزن المستهدف: ${targetWeight} كجم`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-extrabold text-center"
                  >
                    تأكيد عبر واتساب مباشرة
                  </a>
                  <button
                    type="button"
                    onClick={closeBookingModal}
                    className="py-3 px-5 rounded-xl bg-[#FAF0F2] text-[#1E1115] text-xs font-bold cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-[#FDF2F4] border border-[#F3DCE2] flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2A181D]">قيمة الاشتراك بعد الخصم:</span>
                  <span className="text-lg font-extrabold text-[#C83E5B] tabular-nums">
                    {bookingPackage.price} ج.م{' '}
                    <span className="text-xs text-[#8C6D76] line-through font-normal">
                      {bookingPackage.originalPrice} ج.م
                    </span>
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A181D] mb-1.5">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="أدخلي اسمك الثلاثي"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DEC8CE] text-sm text-[#1E1115] focus:outline-none focus:border-[#C83E5B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A181D] mb-1.5">
                    رقم الموبايل / الواتساب *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="010xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DEC8CE] text-sm text-[#1E1115] focus:outline-none focus:border-[#C83E5B]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#2A181D] mb-1.5">
                      الوزن الحالي (كجم)
                    </label>
                    <input
                      type="number"
                      value={currentWeight}
                      onChange={(e) => setCurrentWeight(e.target.value)}
                      placeholder="مثال: 82"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DEC8CE] text-sm text-[#1E1115] focus:outline-none focus:border-[#C83E5B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#2A181D] mb-1.5">
                      الوزن المستهدف (كجم)
                    </label>
                    <input
                      type="number"
                      value={targetWeight}
                      onChange={(e) => setTargetWeight(e.target.value)}
                      placeholder="مثال: 65"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#DEC8CE] text-sm text-[#1E1115] focus:outline-none focus:border-[#C83E5B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2A181D] mb-1.5">
                    ملاحظات صحية (اختياري)
                  </label>
                  <textarea
                    rows={2}
                    value={healthNotes}
                    onChange={(e) => setHealthNotes(e.target.value)}
                    placeholder="مثال: مقاومة إنسولين، غدة درقية، رضاعة..."
                    className="w-full px-3.5 py-2 rounded-xl border border-[#DEC8CE] text-sm text-[#1E1115] focus:outline-none focus:border-[#C83E5B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-sm font-extrabold transition-colors cursor-pointer"
                >
                  تأكيد حجز الباقة الآن
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
