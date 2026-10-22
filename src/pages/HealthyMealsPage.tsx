import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame, ShoppingBag, Calculator, CheckCircle2 } from 'lucide-react';
import { HEALTHY_MEALS, HealthyMeal } from '../data/storeData';
import { useStore } from '../context/StoreContext';

export const HealthyMealsPage: React.FC = () => {
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const { addToCart } = useStore();

  const filteredMeals =
    selectedDiet === 'all'
      ? HEALTHY_MEALS
      : HEALTHY_MEALS.filter((m) => m.category === selectedDiet);

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#F9E6EB] to-[#FAF7F8] border-b border-[#EADCE0] py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block text-xs font-extrabold text-[#C83E5B] bg-white px-3.5 py-1.5 rounded-xl border border-[#EBCFD6]">
            محسوبة السعرات والماكروز بدقة
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E1115]">
            الوجبات الصحية واشتراكات الدايت
          </h1>
          <p className="text-base text-[#4A2E35] max-w-2xl mx-auto leading-relaxed">
            وجبات صحية طازجة محضرة يومياً بزيت الزيتون البكر والمكونات الطبيعية 100%، محسوبة السعرات والبروتين لتسهيل التزامك بالدايت بدون مجهود الطبخ.
          </p>
        </div>
      </section>

      {/* Diet Category Filter & Meals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'جميع الوجبات' },
            { id: 'high-protein', label: 'عالي البروتين' },
            { id: 'keto', label: 'كيتو دايت' },
            { id: 'low-carb', label: 'لو كارب' },
            { id: 'balanced', label: 'متوازن السعرات' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedDiet(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
                selectedDiet === tab.id
                  ? 'bg-[#C83E5B] text-white shadow-xs'
                  : 'bg-white text-[#2A181D] border border-[#EADCE0] hover:border-[#C83E5B]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal: HealthyMeal) => (
            <article
              key={meal.id}
              className="bg-white rounded-3xl border border-[#EADCE0] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-all"
            >
              <div>
                <div className="relative aspect-16/10 bg-[#F6EFF1] overflow-hidden">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-[#1E1115]/90 text-white text-xs font-extrabold flex items-center gap-1 tabular-nums">
                    <Flame className="w-3.5 h-3.5 text-[#F26B8A]" />
                    <span>{meal.calories} سعرة</span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div>
                    <span className="text-xs font-bold text-[#C83E5B] block mb-1">
                      {meal.categoryLabel} · {meal.tags.join(' · ')}
                    </span>
                    <h2 className="text-lg font-extrabold text-[#1E1115] leading-snug">
                      {meal.name}
                    </h2>
                    <p className="text-xs text-[#5E434B] mt-1 leading-relaxed">{meal.subtitle}</p>
                  </div>

                  {/* Macros Bar */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#FAF7F8] border border-[#EADCE0] text-center tabular-nums">
                    <div>
                      <span className="text-sm font-extrabold text-[#1E1115] block">
                        {meal.protein}g
                      </span>
                      <span className="text-[11px] text-[#6E5058]">بروتين</span>
                    </div>
                    <div className="border-x border-[#EADCE0]">
                      <span className="text-sm font-extrabold text-[#1E1115] block">
                        {meal.carbs}g
                      </span>
                      <span className="text-[11px] text-[#6E5058]">كارب</span>
                    </div>
                    <div>
                      <span className="text-sm font-extrabold text-[#1E1115] block">
                        {meal.fats}g
                      </span>
                      <span className="text-[11px] text-[#6E5058]">دهون صحية</span>
                    </div>
                  </div>

                  {/* Ingredients List */}
                  <ul className="space-y-1 text-xs text-[#4A2E35]">
                    {meal.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C83E5B] shrink-0" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-[#EFE5E8] flex items-center justify-between">
                <div className="tabular-nums">
                  <span className="text-xl font-extrabold text-[#1E1115]">{meal.price} ج.م</span>
                  {meal.originalPrice && (
                    <span className="text-xs text-[#8C6D76] line-through mr-2">
                      {meal.originalPrice} ج.م
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    addToCart({
                      id: meal.id,
                      name: meal.name,
                      price: meal.price,
                      image: meal.image,
                      categoryLabel: 'وجبات صحية',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-xs font-extrabold transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>اطلبي الوجبة</span>
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Calorie Calculator Callout */}
        <div className="bg-white rounded-3xl border border-[#EADCE0] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-right">
            <h3 className="text-lg font-extrabold text-[#1E1115]">
              محتارة تختاري الوجبة المناسبة لاحتياجك اليومي؟
            </h3>
            <p className="text-xs text-[#5E434B]">
              احسبي سعراتك الحرارية والماكروز اليومية في ثوانٍ باستخدام حاسبة السعرات المجانية
            </p>
          </div>
          <Link
            to="/calorie-calculator"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1E1115] hover:bg-[#C83E5B] text-white text-xs font-extrabold transition-colors shrink-0"
          >
            <Calculator className="w-4 h-4" />
            <span>جربي حاسبة السعرات الآن</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
