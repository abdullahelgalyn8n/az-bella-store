import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartCheckoutPage: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    promoCode,
    setPromoCode,
    cartTotals,
  } = useStore();

  const [promoInput, setPromoInput] = useState(promoCode);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [governorate, setGovernorate] = useState('القاهرة');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vodafone' | 'instapay'>('cod');
  const [orderCompleted, setOrderCompleted] = useState<{
    orderNumber: string;
    total: number;
    name: string;
    phone: string;
    governorate: string;
  } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoCode(promoInput);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !address.trim()) return;
    const orderNumber = `BL-${Math.floor(10000 + Math.random() * 90000)}`;
    setOrderCompleted({
      orderNumber,
      total: cartTotals.total,
      name: customerName,
      phone: customerPhone,
      governorate,
    });
    clearCart();
  };

  if (orderCompleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div
          data-testid="order-confirmation"
          className="bg-white rounded-3xl border border-[#EADCE0] p-8 sm:p-10 text-center space-y-5 shadow-sm"
        >
          <div className="w-16 h-16 rounded-full bg-[#E8F8F0] text-[#18794E] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <span className="text-xs font-extrabold text-[#C83E5B]">
            رقم الطلب: #{orderCompleted.orderNumber}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1115]">
            تم استلام طلبك بنجاح!
          </h1>
          <p className="text-sm text-[#4A2E35] leading-relaxed">
            شكراً لثقتك في Bella يا <strong>{orderCompleted.name}</strong>. سيقوم فريق خدمة العملاء بالتواصل معك على الرقم{' '}
            <strong dir="ltr">{orderCompleted.phone}</strong> لتأكيد موعد توصيل الطلب إلى محافظة{' '}
            <strong>{orderCompleted.governorate}</strong>.
          </p>
          <div className="p-4 rounded-2xl bg-[#FAF7F8] border border-[#EADCE0] flex items-center justify-between text-sm font-extrabold">
            <span>إجمالي المبلغ المطلوب عند الاستلام:</span>
            <span className="text-[#C83E5B] tabular-nums">{orderCompleted.total} ج.م</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/shop"
              className="px-6 py-3 rounded-xl bg-[#C83E5B] text-white text-xs font-extrabold"
            >
              متابعة التسوق
            </Link>
            <Link
              to="/"
              className="px-6 py-3 rounded-xl bg-[#FAF0F2] text-[#1E1115] text-xs font-bold"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-[#1E1115]">سلة التسوق وإتمام الطلب</h1>
        <p className="text-sm text-[#5E434B] mt-1">
          راجعي منتجاتك وأكملي بيانات التوصيل، متاح الدفع عند الاستلام لجميع محافظات مصر
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#EADCE0] p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FAF0F2] text-[#C83E5B] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-[#1E1115]">سلة التسوق فارغة</h2>
          <p className="text-xs text-[#6E5058]">لم تقومي بإضافة أي منتجات إلى سلة التسوق بعد.</p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 rounded-xl bg-[#C83E5B] text-white text-xs font-extrabold"
          >
            تصفحي المتجر الآن
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items & Promo Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl border border-[#EADCE0] p-6 space-y-4">
              <h2 className="text-lg font-extrabold text-[#1E1115] pb-3 border-b border-[#EFE5E8]">
                المنتجات المختارة ({cartItems.length})
              </h2>

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#FAF0F2] last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-2xl object-cover bg-[#F6EFF1] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#C83E5B]">{item.categoryLabel}</span>
                      <h3 className="text-sm font-extrabold text-[#1E1115]">{item.name}</h3>
                      <p className="text-xs text-[#6E5058] tabular-nums mt-0.5">
                        سعر الوحدة: {item.price} ج.م
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="flex items-center gap-1.5 bg-[#FAF7F8] p-1 rounded-xl border border-[#DEC8CE]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label={`تقليل كمية ${item.name}`}
                        className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#1E1115] cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center text-xs font-extrabold tabular-nums">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={`زيادة كمية ${item.name}`}
                        className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#1E1115] cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-sm font-extrabold text-[#1E1115] w-20 text-left tabular-nums">
                      {item.price * item.quantity} ج.م
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`إزالة ${item.name}`}
                      className="p-2 text-[#8C6D76] hover:text-red-600 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Promo Code Box */}
            <form
              onSubmit={handleApplyPromo}
              className="bg-white rounded-3xl border border-[#EADCE0] p-5 flex flex-wrap items-center gap-3"
            >
              <div className="flex items-center gap-2 text-xs font-extrabold text-[#1E1115]">
                <Tag className="w-4 h-4 text-[#C83E5B]" />
                <span>كود الخصم (جربي BELLA20 لخصم 20%):</span>
              </div>
              <div className="flex-1 flex gap-2 min-w-[220px]">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="أدخلي كود الخصم مثل BELLA20"
                  aria-label="كود الخصم"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-xs font-bold uppercase text-[#1E1115]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1E1115] hover:bg-[#C83E5B] text-white text-xs font-extrabold transition-colors cursor-pointer"
                >
                  تطبيق
                </button>
              </div>
            </form>
          </div>

          {/* Checkout Form & Order Summary Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EADCE0] p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-extrabold text-[#1E1115]">بيانات الشحن والتوصيل</h2>

            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div>
                <label htmlFor="checkout-name" className="block text-xs font-extrabold text-[#1E1115] mb-1.5">
                  الاسم الكامل *
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="الاسم الثلاثي"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-sm text-[#1E1115]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="checkout-phone" className="block text-xs font-extrabold text-[#1E1115] mb-1.5">
                    رقم الموبايل *
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="010xxxxxxxx"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-sm text-[#1E1115]"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-gov" className="block text-xs font-extrabold text-[#1E1115] mb-1.5">
                    المحافظة *
                  </label>
                  <select
                    id="checkout-gov"
                    value={governorate}
                    onChange={(e) => setGovernorate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-sm font-bold text-[#1E1115]"
                  >
                    <option value="القاهرة">القاهرة</option>
                    <option value="الجيزة">الجيزة</option>
                    <option value="الإسكندرية">الإسكندرية</option>
                    <option value="الدقهلية">الدقهلية</option>
                    <option value="الشرقية">الشرقية</option>
                    <option value="الغربية">الغربية</option>
                    <option value="المنوفية">المنوفية</option>
                    <option value="أسيوط">أسيوط</option>
                    <option value="سوهاج">سوهاج</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="checkout-address" className="block text-xs font-extrabold text-[#1E1115] mb-1.5">
                  العنوان بالتفصيل *
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="المنطقة، اسم الشارع، رقم العقار، الدور..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-sm text-[#1E1115]"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-extrabold text-[#1E1115] mb-2">
                  طريقة الدفع
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cod', label: 'عند الاستلام' },
                    { id: 'vodafone', label: 'فودافون كاش' },
                    { id: 'instapay', label: 'إنستا باي' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as any)}
                      className={`py-2.5 px-2 rounded-xl text-xs font-extrabold border transition-colors cursor-pointer ${
                        paymentMethod === pm.id
                          ? 'bg-[#FDF2F4] border-[#C83E5B] text-[#C83E5B]'
                          : 'bg-white border-[#DEC8CE] text-[#3D262C]'
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Totals Summary */}
              <div className="p-4 rounded-2xl bg-[#FAF7F8] border border-[#EADCE0] space-y-2 text-sm tabular-nums">
                <div className="flex justify-between text-[#5E434B]">
                  <span>المجموع الفرعي</span>
                  <span className="font-bold">{cartTotals.subtotal} ج.م</span>
                </div>
                {cartTotals.discountAmount > 0 && (
                  <div className="flex justify-between text-[#18794E] font-bold">
                    <span>الخصم ({cartTotals.appliedPromo})</span>
                    <span>-{cartTotals.discountAmount} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between text-[#5E434B]">
                  <span>مصاريف الشحن</span>
                  <span className="font-bold">
                    {cartTotals.shippingFee === 0 ? 'مجاني' : `${cartTotals.shippingFee} ج.م`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#1E1115] pt-2 border-t border-[#EADCE0]">
                  <span>الإجمالي النهائي</span>
                  <span className="text-[#C83E5B]">{cartTotals.total} ج.م</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-sm font-extrabold transition-colors cursor-pointer"
              >
                تأكيد الطلب الآن ({cartTotals.total} ج.م)
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] font-bold text-[#6E5058] pt-1">
                <span className="inline-flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#C83E5B]" />
                  توصيل خلال 2-4 أيام عمل
                </span>
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C83E5B]" />
                  معاينة الطلب عند الاستلام
                </span>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
