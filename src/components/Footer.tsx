import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#231317] text-[#F5ECEE] pt-16 pb-10 border-t border-[#3A2128]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3A2128]">
          {/* Col 1: Brand Bio */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/assets/extracted/logo.png"
                alt="Bella"
                className="w-14 h-14 rounded-full object-cover border-2 border-[#D64564]"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-xl font-extrabold text-white block">Bella Store</span>
                <span className="text-xs text-[#D3B8C0]">مع دكتور بيلا — صحة، لياقة، وجمال</span>
              </div>
            </Link>
            <p className="text-sm text-[#D3B8C0] leading-relaxed">
              Bella هو وجهتك الأولى للتخسيس ونمط الحياة الصحي. بنساعدك تحققي أهدافك الصحية وتوصلي للوزن المثالي بطريقة علمية، صحية، ومستدامة بدون حرمان.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-base font-bold text-white mb-4">روابط سريعة</h3>
            <ul className="space-y-2.5 text-sm text-[#D3B8C0]">
              <li>
                <Link to="/" className="hover:text-[#F26B8A] transition-colors">الرئيسية</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-[#F26B8A] transition-colors">المتجر (جميع المنتجات)</Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-[#F26B8A] transition-colors">باقات التخسيس والتغذية</Link>
              </li>
              <li>
                <Link to="/healthy-meals" className="hover:text-[#F26B8A] transition-colors">الوجبات الصحية والاشتراكات</Link>
              </li>
              <li>
                <Link to="/transformations" className="hover:text-[#F26B8A] transition-colors">قصص التحول والنجاح</Link>
              </li>
              <li>
                <Link to="/calorie-calculator" className="hover:text-[#F26B8A] transition-colors">حاسبة السعرات الحرارية</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-[#F26B8A] transition-colors">المدونة الطبية</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#F26B8A] transition-colors">عن Bella</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F26B8A] transition-colors">تواصلي معنا</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h3 className="text-base font-bold text-white mb-4">تواصلي معنا</h3>
            <ul className="space-y-3 text-sm text-[#D3B8C0]">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E05272] shrink-0" />
                <a href="tel:+201034548199" dir="ltr" className="hover:text-white transition-colors tabular-nums">
                  +20 10 34548199
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#E05272] shrink-0" />
                <a
                  href="https://wa.me/201034548199"
                  target="_blank"
                  rel="noreferrer"
                  dir="ltr"
                  className="hover:text-white transition-colors tabular-nums"
                >
                  +20 10 34548199
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#E05272] shrink-0" />
                <span>القاهرة - مصر (شحن لجميع المحافظات)</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-xs font-bold text-[#D3B8C0] mb-2">مواعيد العمل والمتابعة</h4>
              <p className="text-xs text-[#B597A0]">يومياً من 10 صباحاً حتى 11 مساءً — دعم واتساب طوال الأسبوع</p>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h3 className="text-base font-bold text-white mb-4">النشرة البريدية</h3>
            <p className="text-sm text-[#D3B8C0] mb-4 leading-relaxed">
              اشتركي للحصول على أحدث نصائح التغذية وخصومات حصرية حتى 25% على منتجات Bella.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#2E1A20] border border-[#E05272]/40 text-xs text-[#F9D5DD]">
                <CheckCircle2 className="w-4 h-4 text-[#E05272] shrink-0" />
                <span>تم اشتراكك بنجاح في نشرة Bella الصحية!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="البريد الإلكتروني"
                  aria-label="البريد الإلكتروني للنشرة البريدية"
                  className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-[#321C22] border border-[#4D2C35] text-sm text-white placeholder:text-[#A3848D] focus:outline-none focus:border-[#E05272]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-sm font-bold transition-colors shrink-0 cursor-pointer"
                >
                  اشتركي
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B597A0]">
          <p>جميع الحقوق محفوظة. <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">A.Z Agency</a> 2026 ©</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-white transition-colors">سياسة الخصوصية</Link>
            <Link to="/packages" className="hover:text-white transition-colors">ضمان النتائج</Link>
            <Link to="/contact" className="hover:text-white transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Consultation Button */}
      <a
        href="https://wa.me/201034548199?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%81%D8%B1%D9%8A%D9%82%20Bella%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%A8%D8%A7%D9%82%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AE%D8%B3%D9%8A%D8%B3%20%D9%88%D8%A7%D9%84%D9%85%D9%86%D8%AA%D8%AC%D8%A7%D8%AA"
        target="_blank"
        rel="noreferrer"
        aria-label="تواصل عبر واتساب"
        className="fixed bottom-5 left-5 z-30 w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </footer>
  );
};
