import React from 'react';
import { Crown, CheckCircle2, ArrowLeft, HelpCircle } from 'lucide-react';
import { PackagesSection } from '../components/PackagesSection';
import { SPECIALIZED_PROGRAMS } from '../data/storeData';
import { useStore } from '../context/StoreContext';

export const PackagesPage: React.FC = () => {
  const { setBookingPackage } = useStore();

  return (
    <div className="space-y-12 pb-16">
      {/* Packages Hero Banner (Matches Screenshot 1 with High Contrast) */}
      <section className="bg-gradient-to-b from-[#F9E6EB] to-[#FAF7F8] border-b border-[#EADCE0] py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 text-right space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-[#EBCFD6] text-[#C83E5B] flex items-center justify-center shadow-2xs">
                <Crown className="w-6 h-6" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E1115] leading-tight">
                باقات التخسيس والتغذية
              </h1>
              <p className="text-base sm:text-lg text-[#4A2E35] leading-relaxed max-w-xl">
                اختاري الباقة المناسبة لهدفك وابدئي رحلتك نحو جسم صحي ومثالي مع متابعة يومية متخصصة من دكتور بيلا وفريق التغذية العلاجية.
              </p>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <img
                src="/assets/extracted/dr-bella.png"
                alt="دكتور بيلا — باقات التخسيس والتغذية"
                className="w-64 sm:w-72 rounded-3xl shadow-xl object-cover border-4 border-white"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main 3 Packages Section */}
      <PackagesSection />

      {/* Specialized Therapeutic Nutrition Tracks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold text-[#C83E5B] mb-1">برامج علاجية مخصصة</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1115] mb-2">
            برامج الحالات الخاصة والتغذية العلاجية
          </h2>
          <p className="text-sm text-[#5E434B]">
            أنظمة مصممة طبياً للتعامل مع مقاومة الإنسولين، الرضاعة، أو النحافة الشديدة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIALIZED_PROGRAMS.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-3xl border border-[#EADCE0] p-6 flex flex-col justify-between space-y-6 shadow-2xs"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#C83E5B]">مدة البرنامج: {prog.duration}</span>
                <h3 className="text-xl font-extrabold text-[#1E1115]">{prog.title}</h3>
                <p className="text-xs text-[#5E434B] leading-relaxed">{prog.subtitle}</p>
                <ul className="space-y-2 pt-2">
                  {prog.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs font-bold text-[#2A181D]">
                      <CheckCircle2 className="w-4 h-4 text-[#C83E5B] shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#EFE5E8] flex items-center justify-between">
                <div className="tabular-nums">
                  <span className="text-2xl font-extrabold text-[#1E1115]">{prog.price}</span>
                  <span className="text-xs font-bold text-[#5E434B]"> ج.م</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setBookingPackage({
                      id: prog.id,
                      name: prog.title,
                      duration: prog.duration,
                      price: prog.price,
                      originalPrice: prog.price + 300,
                      discountPercent: 24,
                      description: prog.subtitle,
                      features: prog.highlights,
                      suitableFor: prog.subtitle,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#1E1115] hover:bg-[#C83E5B] text-white text-xs font-extrabold transition-colors cursor-pointer"
                >
                  <span>احجزي البرنامج</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Coaching FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white rounded-3xl border border-[#EADCE0] p-6 sm:p-10 space-y-6">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-6 h-6 text-[#C83E5B]" />
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E1115]">
              الأسئلة الشائعة عن باقات المتابعة
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'هل الأنظمة الغذائية تحتاج أكل مخصوص ومكلف؟',
                a: 'إطلاقاً! جميع جداول التغذية في Bella مصممة من أكل البيت المصري والعربي المتوفر يومياً مع بدائل متعددة لكل وجبة.',
              },
              {
                q: 'كيف تتم المتابعة بعد الاشتراك في الباقة؟',
                a: 'فور تأكيد الحجز يتم إرسال استمارة التقييم الصحي الشامل، ثم يبدأ التواصل المباشر عبر واتساب لإرسال خطتك المخصصة ومتابعتك خطوة بخطوة.',
              },
              {
                q: 'هل يمكنني الاشتراك إذا كنت أعاني من الغدة أو مقاومة الإنسولين؟',
                a: 'نعم بالتأكيد، نقوم بمراجعة تحاليلك الطبية وتصميم نظام علاجي مخصص يساعد على تحسين حساسية الإنسولين وتنشيط الحرق.',
              },
              {
                q: 'ما الفرق بين باقة التحول وباقة النجومية VIP؟',
                a: 'باقة التحول مدتها 3 أشهر للمتابعة المكثفة، بينما باقة النجومية تمتد لـ 6 أشهر وتشمل مكالمات فيديو أسبوعية وبرنامج تثبيت الوزن النهائي وخصم 25% على المتجر.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F8] border border-[#EADCE0] space-y-1.5">
                <h3 className="text-sm font-extrabold text-[#1E1115]">{item.q}</h3>
                <p className="text-xs text-[#4A2E35] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
