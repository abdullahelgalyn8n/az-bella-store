import React from 'react';
import { Check, ArrowLeft, Clock } from 'lucide-react';
import { COACHING_PACKAGES, CoachingPackage } from '../data/storeData';
import { useStore } from '../context/StoreContext';

export const PackagesSection: React.FC = () => {
  const { setBookingPackage } = useStore();

  return (
    <section className="py-16 bg-[#FAF7F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold text-[#C83E5B] mb-2">
            خطط متابعة متكاملة · مع دكتور بيلا
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1115] mb-3 text-balance">
            باقات التخسيس والتغذية العلاجية
          </h2>
          <p className="text-base text-[#5E434B]">
            اختاري الباقة المناسبة لهدفك وابدئي رحلتك نحو جسم صحي ومثالي مع متابعة يومية متخصصة
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {COACHING_PACKAGES.map((pkg: CoachingPackage) => {
            const isPopular = Boolean(pkg.isPopular);
            return (
              <div
                key={pkg.id}
                className={`rounded-3xl flex flex-col justify-between transition-all duration-200 overflow-hidden ${
                  isPopular
                    ? 'bg-[#C83E5B] text-white shadow-xl ring-2 ring-[#C83E5B]'
                    : 'bg-white text-[#1E1115] border border-[#EADCE0] shadow-xs'
                }`}
              >
                <div>
                  {/* Top Header Bar */}
                  <div
                    className={`px-6 py-2.5 text-center text-xs font-extrabold ${
                      isPopular
                        ? 'bg-[#A82E48] text-white'
                        : pkg.badge
                        ? 'bg-[#FDF2F4] text-[#C83E5B] border-b border-[#F3DCE2]'
                        : 'bg-[#FAF7F8] text-[#6E5058] border-b border-[#EFE5E8]'
                    }`}
                  >
                    {pkg.badge || 'متابعة شهرية مرنة'}
                  </div>

                  <div className="p-6 sm:p-8">
                    <div
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold mb-2 ${
                        isPopular ? 'text-[#FFE4EA]' : 'text-[#6E5058]'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.duration}</span>
                    </div>

                    <h3
                      className={`text-2xl font-extrabold mb-2 ${
                        isPopular ? 'text-white' : 'text-[#1E1115]'
                      }`}
                    >
                      {pkg.name}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed mb-6 ${
                        isPopular ? 'text-[#FFE9EE]' : 'text-[#5E434B]'
                      }`}
                    >
                      {pkg.description}
                    </p>

                    {/* Pricing Block */}
                    <div className="mb-6 pb-6 border-b border-current/10 tabular-nums">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold">{pkg.price}</span>
                        <span className="text-sm font-bold">جنيه</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 text-xs">
                        <span
                          className={`line-through ${
                            isPopular ? 'text-[#FFD1DC]' : 'text-[#8C6D76]'
                          }`}
                        >
                          {pkg.originalPrice} جنيه
                        </span>
                        <span
                          className={`font-bold ${
                            isPopular ? 'text-white' : 'text-[#C83E5B]'
                          }`}
                        >
                          · وفري {pkg.discountPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3 text-sm">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                              isPopular
                                ? 'bg-white/20 text-white'
                                : 'bg-[#FDF2F4] text-[#C83E5B]'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </span>
                          <span className={isPopular ? 'text-white' : 'text-[#2A181D]'}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 sm:px-8 pt-0">
                  <button
                    type="button"
                    onClick={() => setBookingPackage(pkg)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      isPopular
                        ? 'bg-white text-[#C83E5B] hover:bg-[#FFF5F7]'
                        : 'bg-[#C83E5B] text-white hover:bg-[#B0304B]'
                    }`}
                  >
                    <span>احجز الآن</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-[#6E5058] mt-8">
          اضغطي على "احجز الآن" لتسجيل بياناتك والتواصل المباشر مع فريق دكتور بيلا على الواتساب
        </p>
      </div>
    </section>
  );
};
