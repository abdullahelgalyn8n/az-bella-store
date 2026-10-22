import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calculator,
  RotateCcw,
  Flame,
  Droplets,
  Scale,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import {
  calculateCaloriePlan,
  Gender,
  ActivityLevel,
  CalorieGoal,
  CalorieResult,
} from '../utils/nutrition';
import { COACHING_PACKAGES, PRODUCTS } from '../data/storeData';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export const CalorieCalculatorPage: React.FC = () => {
  const [gender, setGender] = useState<Gender>('female');
  const [age, setAge] = useState<string>('25');
  const [weightKg, setWeightKg] = useState<string>('75');
  const [heightCm, setHeightCm] = useState<string>('165');
  const [activity, setActivity] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<CalorieGoal>('lose');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalorieResult | null>(() =>
    calculateCaloriePlan({
      gender: 'female',
      age: 25,
      weightKg: 75,
      heightCm: 165,
      activity: 'moderate',
      goal: 'lose',
    })
  );

  const { setBookingPackage } = useStore();

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const plan = calculateCaloriePlan({
        gender,
        age: Number(age),
        weightKg: Number(weightKg),
        heightCm: Number(heightCm),
        activity,
        goal,
      });
      setResult(plan);
    } catch (err: any) {
      setError(err.message || 'يرجى التأكد من إدخال القيم بشكل صحيح');
      setResult(null);
    }
  };

  const handleReset = () => {
    setGender('female');
    setAge('');
    setWeightKg('');
    setHeightCm('');
    setActivity('moderate');
    setGoal('lose');
    setError(null);
    setResult(null);
  };

  const recommendedPackage = result
    ? COACHING_PACKAGES.find((p) => p.id === result.recommendedPackageId) || COACHING_PACKAGES[1]
    : null;

  const recommendedProducts = result
    ? PRODUCTS.filter((p) => result.recommendedProductIds.includes(p.id))
    : [];

  return (
    <div className="space-y-12 pb-16">
      {/* Header Banner (Matches Screenshot 4 with High Contrast) */}
      <section className="bg-gradient-to-b from-[#F9E6EB] to-[#FAF7F8] border-b border-[#EADCE0] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#C83E5B] bg-white px-3.5 py-1.5 rounded-xl border border-[#EBCFD6]">
            <Calculator className="w-3.5 h-3.5" />
            <span>أداة مجانية دقيقة</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E1115]">
            حاسبة السعرات الحرارية والماكروز
          </h1>
          <p className="text-sm sm:text-base text-[#4A2E35]">
            احسبي احتياجاتك اليومية من السعرات الحرارية، البروتين، والماء بناءً على جسمك ونشاطك وأهدافك
          </p>
        </div>
      </section>

      {/* Calculator Form Card */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleCalculate}
          className="bg-white rounded-3xl border border-[#EADCE0] p-6 sm:p-10 shadow-sm space-y-6"
        >
          {/* Gender Selection */}
          <div>
            <label className="block text-xs font-extrabold text-[#1E1115] mb-2.5">الجنس</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-3 px-4 rounded-xl text-sm font-extrabold border transition-colors cursor-pointer ${
                  gender === 'female'
                    ? 'bg-[#FDF2F4] border-[#C83E5B] text-[#C83E5B]'
                    : 'bg-white border-[#DEC8CE] text-[#3D262C] hover:bg-[#FAF7F8]'
                }`}
              >
                أنثى
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-3 px-4 rounded-xl text-sm font-extrabold border transition-colors cursor-pointer ${
                  gender === 'male'
                    ? 'bg-[#FDF2F4] border-[#C83E5B] text-[#C83E5B]'
                    : 'bg-white border-[#DEC8CE] text-[#3D262C] hover:bg-[#FAF7F8]'
                }`}
              >
                ذكر
              </button>
            </div>
          </div>

          {/* Age & Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="calc-age" className="block text-xs font-extrabold text-[#1E1115] mb-2">
                العمر (سنة)
              </label>
              <input
                id="calc-age"
                type="number"
                min={12}
                max={100}
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="مثال: 25"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-sm font-bold text-[#1E1115] placeholder:text-[#8C6D76] focus:outline-none focus:border-[#C83E5B] focus:bg-white tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="calc-weight" className="block text-xs font-extrabold text-[#1E1115] mb-2">
                الوزن (كجم)
              </label>
              <input
                id="calc-weight"
                type="number"
                min={25}
                max={300}
                step="0.5"
                required
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                placeholder="مثال: 70"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-sm font-bold text-[#1E1115] placeholder:text-[#8C6D76] focus:outline-none focus:border-[#C83E5B] focus:bg-white tabular-nums"
              />
            </div>
          </div>

          {/* Height & Activity Level */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="calc-height" className="block text-xs font-extrabold text-[#1E1115] mb-2">
                الطول (سم)
              </label>
              <input
                id="calc-height"
                type="number"
                min={100}
                max={240}
                required
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder="مثال: 165"
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-sm font-bold text-[#1E1115] placeholder:text-[#8C6D76] focus:outline-none focus:border-[#C83E5B] focus:bg-white tabular-nums"
              />
            </div>

            <div>
              <label htmlFor="calc-activity" className="block text-xs font-extrabold text-[#1E1115] mb-2">
                مستوى النشاط
              </label>
              <select
                id="calc-activity"
                value={activity}
                onChange={(e) => setActivity(e.target.value as ActivityLevel)}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-sm font-bold text-[#1E1115] focus:outline-none focus:border-[#C83E5B] focus:bg-white"
              >
                <option value="sedentary">خامل (قليل الحركة / عمل مكتبي)</option>
                <option value="light">نشاط خفيف (1-2 يوم تمرين/أسبوع)</option>
                <option value="moderate">نشاط متوسط (3-5 أيام/أسبوع)</option>
                <option value="active">نشاط عالي (6-7 أيام/أسبوع)</option>
                <option value="very_active">نشاط شاق جداً (تمارين مكثفة يومياً)</option>
              </select>
            </div>
          </div>

          {/* Goal Selection */}
          <div>
            <label className="block text-xs font-extrabold text-[#1E1115] mb-2.5">هدفك</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'lose', label: 'خسارة وزن' },
                { id: 'maintain', label: 'تثبيت الوزن' },
                { id: 'gain', label: 'زيادة وزن' },
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id as CalorieGoal)}
                  className={`py-3 px-3 rounded-xl text-xs sm:text-sm font-extrabold border transition-colors cursor-pointer ${
                    goal === g.id
                      ? 'bg-[#FDF2F4] border-[#C83E5B] text-[#C83E5B]'
                      : 'bg-white border-[#DEC8CE] text-[#3D262C] hover:bg-[#FAF7F8]'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <div
              role="alert"
              className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700"
            >
              {error}
            </div>
          )}

          {/* Submit & Reset Row */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              <span>احسبي الآن</span>
            </button>

            <button
              type="button"
              onClick={handleReset}
              aria-label="إعادة تعيين الحاسبة"
              className="p-3.5 rounded-xl bg-[#FAF7F8] hover:bg-[#FAF0F2] border border-[#DEC8CE] text-[#3D262C] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </form>
      </section>

      {/* Results Dashboard */}
      {result && (
        <section
          data-testid="calorie-results"
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
        >
          <div className="bg-white rounded-3xl border border-[#EADCE0] p-6 sm:p-10 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EFE5E8]">
              <div>
                <span className="text-xs font-extrabold text-[#C83E5B]">تقريرك الغذائي اليومي</span>
                <h2 className="text-2xl font-extrabold text-[#1E1115]">
                  نتائج حساب السعرات والماكروز
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FDF2F4] border border-[#F3DCE2] text-xs font-extrabold text-[#C83E5B]">
                <Scale className="w-4 h-4" />
                <span>
                  مؤشر كتلة الجسم (BMI): {result.bmi} — {result.bmiCategoryAr}
                </span>
              </div>
            </div>

            {/* Key Calorie Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 tabular-nums">
              <div className="p-5 rounded-2xl bg-[#C83E5B] text-white space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#FFE4EA]">
                  <span>السعرات المستهدفة يومياً</span>
                  <Flame className="w-4 h-4" />
                </div>
                <p className="text-3xl font-extrabold">{result.targetCalories}</p>
                <p className="text-xs text-[#FFE4EA]">سعرة حرارية / يوم لتحقيق هدفك</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F8] border border-[#EADCE0] space-y-1">
                <span className="text-xs font-bold text-[#6E5058] block">
                  إجمالي حرقك اليومي (TDEE)
                </span>
                <p className="text-2xl font-extrabold text-[#1E1115]">{result.tdee} سعرة</p>
                <p className="text-xs text-[#5E434B]">
                  معدل الحرق الأساسي (BMR): {result.bmr} سعرة
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF7F8] border border-[#EADCE0] space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#6E5058]">
                  <span>احتياج الماء اليومي</span>
                  <Droplets className="w-4 h-4 text-[#C83E5B]" />
                </div>
                <p className="text-2xl font-extrabold text-[#1E1115]">{result.waterLiters} لتر</p>
                <p className="text-xs text-[#5E434B]">ما يعادل {Math.round(result.waterLiters * 4)} أكواب ماء يومياً</p>
              </div>
            </div>

            {/* Daily Macros Breakdown */}
            <div>
              <h3 className="text-sm font-extrabold text-[#1E1115] mb-3">
                توزيع العناصر الغذائية اليومية (الماكروز):
              </h3>
              <div className="grid grid-cols-3 gap-4 tabular-nums">
                <div className="p-4 rounded-2xl bg-[#FDF2F4] border border-[#F3DCE2] text-center">
                  <span className="text-xs font-bold text-[#6E5058] block">البروتين اليومي</span>
                  <span className="text-2xl font-extrabold text-[#C83E5B] block mt-1">
                    {result.proteinGrams} جم
                  </span>
                  <span className="text-[11px] text-[#5E434B]">لبناء العضلات والشبع</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F8] border border-[#EADCE0] text-center">
                  <span className="text-xs font-bold text-[#6E5058] block">الكربوهيدرات</span>
                  <span className="text-2xl font-extrabold text-[#1E1115] block mt-1">
                    {result.carbsGrams} جم
                  </span>
                  <span className="text-[11px] text-[#5E434B]">للطاقة والنشاط</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF7F8] border border-[#EADCE0] text-center">
                  <span className="text-xs font-bold text-[#6E5058] block">الدهون الصحية</span>
                  <span className="text-2xl font-extrabold text-[#1E1115] block mt-1">
                    {result.fatsGrams} جم
                  </span>
                  <span className="text-[11px] text-[#5E434B]">لتوازن الهرمونات</span>
                </div>
              </div>
            </div>

            {/* Tailored Package Recommendation */}
            {recommendedPackage && (
              <div className="p-6 rounded-2xl bg-[#1E1115] text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-right">
                  <span className="text-xs font-extrabold text-[#F26B8A]">
                    ترشيح دكتور بيلا المخصص لحالتك
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    ننصحك بالاشتراك في: {recommendedPackage.name} ({recommendedPackage.duration})
                  </h3>
                  <p className="text-xs text-[#D3B8C0] max-w-xl leading-relaxed">
                    {recommendedPackage.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-1">
                    {recommendedPackage.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="inline-flex items-center gap-1 text-xs text-[#FFE4EA]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F26B8A]" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <div className="text-2xl font-extrabold text-white tabular-nums">
                    {recommendedPackage.price} ج.م
                  </div>
                  <button
                    type="button"
                    onClick={() => setBookingPackage(recommendedPackage)}
                    className="px-6 py-3 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>احجزي الباقة الآن</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Recommended Products for this Goal */}
          {recommendedProducts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-extrabold text-[#1E1115]">
                  منتجات مساندة مقترحة لهدفك
                </h3>
                <Link to="/shop" className="text-xs font-bold text-[#C83E5B] hover:underline">
                  تصفحي المتجر بالكامل ←
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendedProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
