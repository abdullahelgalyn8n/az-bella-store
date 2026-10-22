import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Flame,
  Apple,
  Dumbbell,
  Calculator,
  BookOpen,
  MessageCircle,
  Star,
  CheckCircle2,
  Quote,
} from 'lucide-react';
import {
  CATEGORIES,
  PRODUCTS,
  TRANSFORMATIONS,
  TESTIMONIALS,
} from '../data/storeData';
import { ProductCard } from '../components/ProductCard';
import { PackagesSection } from '../components/PackagesSection';

export const HomePage: React.FC = () => {
  const [activeProductTab, setActiveProductTab] = useState<string>('all');

  const filteredFeatured =
    activeProductTab === 'all'
      ? PRODUCTS.slice(0, 8)
      : PRODUCTS.filter((p) => p.category === activeProductTab).slice(0, 4);

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="space-y-4">
      {/* 1. High-Contrast Hero Section (Fixed Light Mode Contrast!) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F9E8EC] via-[#FDF6F7] to-[#FAF7F8] border-b border-[#EADCE0] pt-10 pb-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Copy Column */}
            <div className="lg:col-span-7 text-right space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-extrabold text-[#B02E49] bg-white px-3.5 py-1.5 rounded-xl border border-[#EBCFD6] shadow-2xs">
                <Flame className="w-4 h-4 text-[#C83E5B]" />
                <span>نمط حياة صحي ومتكامل بإشراف طبي متخصص</span>
              </div>

              <div className="space-y-2">
                <span className="block text-sm font-extrabold tracking-widest text-[#C83E5B]">
                  BELLA STORE & WELLNESS
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E1115] leading-tight text-balance">
                  صحة، لياقة، <span className="text-[#C83E5B]">وجمال</span> في مكان واحد
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#4A2E35] leading-relaxed max-w-2xl font-medium">
                كل الأدوات والمنتجات الأصلية التي تحتاجينها لحياة صحية أفضل: منتجات التخسيس الفعالة، خطط التغذية العلاجية، الوجبات الصحية المحسوبة، والعناية بالبشرة مع متابعة يومية مع دكتور بيلا.
              </p>

              {/* Primary & Secondary Actions */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-sm font-extrabold shadow-md transition-all cursor-pointer"
                >
                  <span>اكتشفي المنتجات ({PRODUCTS.length})</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link
                  to="/packages"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1E1115] hover:bg-[#331D24] text-white text-sm font-bold transition-all"
                >
                  <span>باقات المتابعة</span>
                </Link>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-[#FDF2F4] text-[#1E1115] border border-[#DEC8CE] text-sm font-bold transition-all"
                >
                  <span>اقرئي المدونة</span>
                </Link>
              </div>

              {/* Quick Interactive Navigation Links */}
              <div className="pt-4 border-t border-[#EADCE0]/80 flex flex-wrap items-center gap-3">
                <Link
                  to="/packages"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#EADCE0] text-xs font-bold text-[#2A181D] hover:border-[#C83E5B] hover:text-[#C83E5B] transition-colors"
                >
                  <Flame className="w-3.5 h-3.5 text-[#C83E5B]" />
                  <span>برامج تخسيس</span>
                </Link>
                <Link
                  to="/healthy-meals"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#EADCE0] text-xs font-bold text-[#2A181D] hover:border-[#C83E5B] hover:text-[#C83E5B] transition-colors"
                >
                  <Apple className="w-3.5 h-3.5 text-[#C83E5B]" />
                  <span>خطط ووجبات غذائية</span>
                </Link>
                <Link
                  to="/shop?category=fitness"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#EADCE0] text-xs font-bold text-[#2A181D] hover:border-[#C83E5B] hover:text-[#C83E5B] transition-colors"
                >
                  <Dumbbell className="w-3.5 h-3.5 text-[#C83E5B]" />
                  <span>تمارين وأدوات رياضية</span>
                </Link>
                <Link
                  to="/calorie-calculator"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#EADCE0] text-xs font-bold text-[#2A181D] hover:border-[#C83E5B] hover:text-[#C83E5B] transition-colors"
                >
                  <Calculator className="w-3.5 h-3.5 text-[#C83E5B]" />
                  <span>حاسبة السعرات المجانية</span>
                </Link>
              </div>
            </div>

            {/* Hero Showcase Visual Column */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-7 bg-white p-3 rounded-3xl shadow-lg border border-[#EADCE0]">
                  <img
                    src="/assets/extracted/dr-bella.png"
                    alt="دكتور بيلا — أخصائي التغذية العلاجية"
                    className="w-full h-80 object-cover rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                  <div className="pt-3 px-1 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-[#1E1115]">مع دكتور بيلا</p>
                      <p className="text-xs text-[#6E5058]">متابعة يومية وخطط مخصصة</p>
                    </div>
                    <span className="text-xs font-extrabold text-[#C83E5B] tabular-nums">95% نجاح</span>
                  </div>
                </div>

                <div className="col-span-5 space-y-4">
                  <div className="bg-white p-3 rounded-2xl shadow-md border border-[#EADCE0]">
                    <img
                      src="/assets/extracted/product-3.png"
                      alt="فات بوم للتخسيس"
                      className="w-full h-32 object-cover rounded-xl mb-2"
                      referrerPolicy="no-referrer"
                    />
                    <p className="text-xs font-extrabold text-[#1E1115] truncate">فات بوم لسد الشهية</p>
                    <p className="text-xs font-bold text-[#C83E5B] tabular-nums">850 ج.م</p>
                  </div>

                  <div className="bg-[#1E1115] text-white p-4 rounded-2xl shadow-md space-y-1.5">
                    <p className="text-2xl font-extrabold text-[#F26B8A] tabular-nums">+500</p>
                    <p className="text-xs font-bold text-white">قصة تحول ناجحة</p>
                    <p className="text-[11px] text-[#D3B8C0] leading-snug">
                      نتائج حقيقية ومضمونة بدون حرمان
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Pillar Feature Strip */}
          <div className="mt-12 pt-8 border-t border-[#EADCE0] grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: Flame,
                title: 'برامج تخسيس',
                desc: 'برامج مخصصة لطبيعة جسمك',
                to: '/packages',
              },
              {
                icon: Apple,
                title: 'تغذية صحية',
                desc: 'خطط ووجبات غذائية متكاملة',
                to: '/healthy-meals',
              },
              {
                icon: Dumbbell,
                title: 'تمارين رياضية',
                desc: 'تمارين منزلية يومية فعالة',
                to: '/shop?category=fitness',
              },
              {
                icon: Calculator,
                title: 'حاسبة السعرات',
                desc: 'احسبي احتياجاتك اليومية بدقة',
                to: '/calorie-calculator',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.to}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#EADCE0] hover:border-[#C83E5B] transition-colors shadow-2xs"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FDF2F4] text-[#C83E5B] flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold text-[#1E1115]">{item.title}</h2>
                    <p className="text-xs text-[#6E5058]">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Browse Categories Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1115] mb-2">
            تصفح الأقسام
          </h2>
          <p className="text-sm text-[#5E434B]">
            اختاري من بين مجموعة متكاملة من الفئات الصحية والجمالية المعتمدة
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${cat.id}`}
              className="group relative h-60 rounded-2xl overflow-hidden border border-[#EADCE0] shadow-xs block"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1115]/90 via-[#1E1115]/35 to-transparent flex flex-col justify-end p-4 text-right">
                <span className="text-[11px] font-bold text-[#F9C6D1] tabular-nums">
                  {cat.count} منتجات
                </span>
                <h3 className="text-base font-extrabold text-white leading-snug">
                  {cat.name}
                </h3>
                <span className="text-xs font-bold text-white/90 group-hover:text-[#F9C6D1] inline-flex items-center gap-1 mt-1">
                  <span>تسوقي الآن</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. Featured Products Section with Interactive Category Tabs */}
      <section className="py-12 bg-white border-y border-[#EADCE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold text-[#C83E5B] mb-1">منتجات أصلية ومضمونة</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1115]">
                منتجاتنا المختارة
              </h2>
            </div>

            {/* Interactive Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF7F8] p-1.5 rounded-2xl border border-[#EADCE0]">
              {[
                { id: 'all', label: 'الكل' },
                { id: 'slimming', label: 'منتجات التخسيس' },
                { id: 'skincare', label: 'العناية بالبشرة' },
                { id: 'supplements', label: 'المكملات الغذائية' },
                { id: 'drinks', label: 'مشروبات صحية' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveProductTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    activeProductTab === tab.id
                      ? 'bg-[#C83E5B] text-white shadow-2xs'
                      : 'text-[#4A2E35] hover:text-[#C83E5B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredFeatured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FAF0F2] hover:bg-[#C83E5B] text-[#C83E5B] hover:text-white text-sm font-extrabold transition-colors"
            >
              <span>عرض جميع المنتجات في المتجر ({PRODUCTS.length} منتج)</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Services Showcase ("كل اللي محتاجه في مكان واحد") */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold text-[#C83E5B] mb-1">خدماتنا المتكاملة</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1115] mb-2">
            كل اللي محتاجاه في مكان واحد
          </h2>
          <p className="text-sm text-[#5E434B]">
            مع Bella هتلاقي كل الأدوات والبرامج الصحية اللي تساعدك تحققي أهدافك بأمان
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="relative h-80 rounded-3xl overflow-hidden border border-[#EADCE0] group">
            <img
              src="/assets/extracted/clean-service-programs.png"
              alt="برامج التخسيس"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1115]/90 via-[#1E1115]/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <h3 className="text-2xl font-extrabold text-white mb-2">برامج التخسيس المتخصصة</h3>
              <p className="text-sm text-white/90 mb-4 max-w-md">
                برامج مخصصة لكل جسم وهدف مع متابعة يومية مستمرة ونتائج مضمونة
              </p>
              <div>
                <Link
                  to="/packages"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-xs font-extrabold transition-colors"
                >
                  <span>اكتشفي البرامج</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="relative h-80 rounded-3xl overflow-hidden border border-[#EADCE0] group">
            <img
              src="/assets/extracted/clean-service-meals.png"
              alt="خطط غذائية ووجبات صحية"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E1115]/90 via-[#1E1115]/40 to-transparent flex flex-col justify-end p-6 sm:p-8">
              <h3 className="text-2xl font-extrabold text-white mb-2">خطط غذائية ووجبات صحية</h3>
              <p className="text-sm text-white/90 mb-4 max-w-md">
                خطط غذائية متكاملة ولذيذة تناسب نمط حياتك اليومي وأهدافك الصحية بدون حرمان
              </p>
              <div>
                <Link
                  to="/healthy-meals"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-xs font-extrabold transition-colors"
                >
                  <span>شوفي الوجبات والخطط</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Service Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Dumbbell,
              title: 'تمارين رياضية',
              sub: 'تمارين منزلية وجيم لكل المستويات',
              to: '/shop?category=fitness',
            },
            {
              icon: Calculator,
              title: 'حاسبة السعرات',
              sub: 'احسبي سعراتك اليومية بسهولة',
              to: '/calorie-calculator',
            },
            {
              icon: BookOpen,
              title: 'مدونة صحية',
              sub: 'نصائح ومقالات عن الصحة والتغذية',
              to: '/blog',
            },
            {
              icon: MessageCircle,
              title: 'استشارة مجانية',
              sub: 'تواصلي معنا للحصول على استشارة',
              to: '/contact',
            },
          ].map((srv, i) => {
            const Icon = srv.icon;
            return (
              <Link
                key={i}
                to={srv.to}
                className="bg-white p-5 rounded-2xl border border-[#EADCE0] hover:border-[#C83E5B] text-center space-y-2 transition-colors shadow-2xs"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FDF2F4] text-[#C83E5B] flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-extrabold text-[#1E1115]">{srv.title}</h4>
                <p className="text-xs text-[#6E5058]">{srv.sub}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5. Dr. Bella Feature Spotlight */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EADCE0] p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex justify-center">
              <img
                src="/assets/extracted/dr-bella.png"
                alt="دكتور بيلا"
                className="w-64 sm:w-72 rounded-3xl shadow-md object-cover border-2 border-[#F3DCE2]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lg:col-span-7 space-y-5 text-right">
              <span className="inline-block text-xs font-extrabold text-[#C83E5B] bg-[#FDF2F4] px-3 py-1 rounded-lg">
                مع دكتور بيلا
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1115] text-balance">
                رحلتك للصحة والرشاقة تبدأ هنا
              </h2>
              <p className="text-base text-[#4A2E35] leading-relaxed">
                متابعة متخصصة وخطط تغذية علاجية مصممة خصيصاً لطبيعة جسمك ومعدل حرقك لتحقيق أهدافك الصحية بأمان. ندمج بين التغذية المتوازنة، المكملات الطبيعية الآمنة، والدعم اليومي المباشر.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  'أنظمة غذائية مرنة من أكل البيت بدون حرمان',
                  'علاج مقاومة الإنسولين وثبات الوزن العنيد',
                  'متابعة يومية على الواتساب وتعديل مستمر للخطة',
                  'برامج خاصة لتثبيت الوزن ومنع رجوعه مرة أخرى',
                ].map((pt, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#2A181D]">
                    <CheckCircle2 className="w-4 h-4 text-[#C83E5B] shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-3">
                <Link
                  to="/packages"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-xs font-extrabold transition-colors"
                >
                  <span>باقات التخسيس</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link
                  to="/healthy-meals"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAF0F2] hover:bg-[#F3DCE2] text-[#1E1115] text-xs font-bold transition-colors"
                >
                  <span>وجبات صحية</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Best Sellers Section */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-bold text-[#C83E5B] mb-1">الأعلى تقييماً وطلباً</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1115]">الأكثر مبيعاً</h2>
          </div>
          <Link
            to="/shop?sort=popular"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#C83E5B] hover:underline"
          >
            <span>عرض الكل</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Coaching Packages Section */}
      <PackagesSection />

      {/* 8. Client Transformations Preview */}
      <section className="py-14 bg-white border-y border-[#EADCE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-bold text-[#C83E5B] mb-1">قصص نجاح حقيقية</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1115] mb-2">
              تحولات عملائنا
            </h2>
            <p className="text-sm text-[#5E434B]">
              شاهدي النتائج الحقيقية لعملائنا مع باقات المتابعة ومنتجات Bella الأصلية
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {TRANSFORMATIONS.slice(0, 8).map((item) => (
              <Link
                key={item.id}
                to="/transformations"
                className="group bg-[#FAF7F8] rounded-2xl border border-[#EADCE0] overflow-hidden hover:shadow-md transition-all"
              >
                <div className="aspect-square overflow-hidden bg-white">
                  <img
                    src={item.image}
                    alt={`تحول ${item.clientName}`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-3.5 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-extrabold text-[#1E1115]">{item.clientName}</p>
                    <p className="text-[#6E5058]">{item.duration}</p>
                  </div>
                  <span className="font-extrabold text-[#C83E5B] tabular-nums" dir="ltr">
                    {item.weightDelta} kg
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/transformations"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border border-[#DEC8CE] bg-white hover:bg-[#FDF2F4] text-[#1E1115] text-xs font-extrabold transition-colors"
            >
              <span>شاهد كل التحولات ({TRANSFORMATIONS.length} قصة نجاح)</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. New Arrivals & High-Contrast Promotional Banners */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-[#C83E5B] mb-1">أحدث الإضافات</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1115]">وصل حديثاً</h2>
            </div>
            <Link
              to="/shop?sort=newest"
              className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#C83E5B] hover:underline"
            >
              <span>عرض الكل</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* High-Contrast Promotional Grid (Fixes low-contrast text on promo banners!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-gradient-to-l from-[#A82843] to-[#D44463] text-white p-6 sm:p-8 flex items-center justify-between gap-6 shadow-md">
            <div className="space-y-3">
              <span className="inline-block text-xs font-extrabold bg-white/20 text-white px-3 py-1 rounded-lg">
                عروض خاصة · كود BELLA20
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                خصومات تصل إلى 50% على باقات المتابعة
              </h3>
              <p className="text-xs sm:text-sm text-white/90">
                لا تفوتي فرصة التوفير وابدئي رحلة التحول الصحي اليوم
              </p>
              <Link
                to="/packages"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-white text-[#A82843] text-xs font-extrabold hover:bg-[#FFF5F7] transition-colors"
              >
                <span>تسوقي العروض</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
            <img
              src="/assets/extracted/blog-weightloss.png"
              alt="عروض التغذية"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover shrink-0 border-2 border-white/30 hidden sm:block"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="rounded-3xl bg-[#261519] text-white p-6 sm:p-8 flex items-center justify-between gap-6 shadow-md">
            <div className="space-y-3">
              <span className="inline-block text-xs font-extrabold bg-[#C83E5B] text-white px-3 py-1 rounded-lg">
                منتجات العناية بالبشرة
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                عروض مميزة حتى 40% على كورس شد الترهلات
              </h3>
              <p className="text-xs sm:text-sm text-[#E5D4D8]">
                أمبولات وكولاجين طبيعي لبشرة مشدودة ونضرة أثناء التخسيس
              </p>
              <Link
                to="/shop?category=skincare"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-extrabold hover:bg-[#B0304B] transition-colors"
              >
                <span>تسوقي العناية بالبشرة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
            <img
              src="/assets/extracted/blog-skincare.png"
              alt="عروض العناية بالبشرة"
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover shrink-0 border-2 border-white/20 hidden sm:block"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 10. Customer Testimonials & Final Conversion Banner */}
      <section className="py-14 bg-white border-t border-[#EADCE0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div>
            <div className="text-center max-w-xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1115] mb-2">
                آراء عملائنا
              </h2>
              <p className="text-sm text-[#5E434B]">ماذا يقول عملاؤنا عن تجربتهم الحقيقية معنا</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="bg-[#FAF7F8] p-6 rounded-2xl border border-[#EADCE0] flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-0.5 text-[#E59819]">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <Quote className="w-5 h-5 text-[#DEC8CE]" />
                    </div>
                    <p className="text-sm text-[#2A181D] leading-relaxed">"{t.text}"</p>
                  </div>
                  <div className="pt-3 border-t border-[#EADCE0]">
                    <p className="text-sm font-extrabold text-[#1E1115]">{t.name}</p>
                    <p className="text-xs text-[#6E5058]">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Stats CTA Banner */}
          <div className="rounded-3xl bg-gradient-to-b from-[#FDF2F4] to-[#F9E5EA] border border-[#EBCFD6] p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-extrabold text-[#C83E5B]">قوتك في إصرارك</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1115] text-balance">
                كل خطوة بتقربك <span className="text-[#C83E5B]">من حلمك</span>
              </h2>
              <p className="text-sm sm:text-base text-[#4A2E35] max-w-xl mx-auto">
                مع Bella، مش بس هتخسي وزن، هتكسبي ثقة، طاقة، وحياة أحلى. فريقنا معاكي في كل خطوة.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto tabular-nums">
              <div className="bg-white p-4 rounded-2xl border border-[#EADCE0]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#C83E5B]">+500</p>
                <p className="text-xs font-bold text-[#4A2E35] mt-1">عميلة سعيدة</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#EADCE0]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#C83E5B]">+50</p>
                <p className="text-xs font-bold text-[#4A2E35] mt-1">برنامج تخسيس</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#EADCE0]">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#C83E5B]">95%</p>
                <p className="text-xs font-bold text-[#4A2E35] mt-1">نسبة النجاح</p>
              </div>
            </div>

            <div>
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-sm font-extrabold shadow-md transition-colors"
              >
                <span>ابدئي رحلتك دلوقتي</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
