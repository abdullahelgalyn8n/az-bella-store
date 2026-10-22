import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, X, CheckCircle2 } from 'lucide-react';
import { TRANSFORMATIONS, TransformationStory } from '../data/storeData';

export const TransformationsPage: React.FC = () => {
  const [filterGoal, setFilterGoal] = useState<'all' | 'weight-loss' | 'toning'>('all');
  const [selectedStory, setSelectedStory] = useState<TransformationStory | null>(null);

  const filteredStories =
    filterGoal === 'all'
      ? TRANSFORMATIONS
      : TRANSFORMATIONS.filter((t) => t.goalType === filterGoal);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section (Matches Screenshot 8) */}
      <section className="bg-gradient-to-b from-[#F9E6EB] to-[#FAF7F8] border-b border-[#EADCE0] py-12 lg:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 text-right space-y-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#C83E5B] bg-white px-3.5 py-1.5 rounded-xl border border-[#EBCFD6]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>نتائج حقيقية وموثقة</span>
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E1115]">
                قصص التحول والنجاح
              </h1>
              <p className="text-base sm:text-lg text-[#4A2E35] leading-relaxed">
                اكتشفي كيف غيرت منتجاتنا وباقات المتابعة حياة عملائنا — نتائج حقيقية من أشخاص حقيقيين التزموا معنا ووصلوا للوزن المثالي.
              </p>
            </div>
            <div className="md:col-span-5 flex justify-center">
              <img
                src="/assets/extracted/dr-bella.png"
                alt="دكتور بيلا — قصص التحول والنجاح"
                className="w-60 sm:w-68 rounded-3xl shadow-xl object-cover border-4 border-white"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar & Transformations Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: `جميع التحولات (${TRANSFORMATIONS.length})` },
              { id: 'weight-loss', label: 'خسارة الوزن الكبير' },
              { id: 'toning', label: 'نحت القوام وشد البطن' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterGoal(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
                  filterGoal === tab.id
                    ? 'bg-[#C83E5B] text-white'
                    : 'bg-white text-[#2A181D] border border-[#EADCE0] hover:border-[#C83E5B]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <p className="text-xs font-semibold text-[#5E434B]">
            اضغطي على أي بطاقة لعرض تفاصيل القصة والباقة المستخدمة
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredStories.map((story) => (
            <button
              key={story.id}
              type="button"
              onClick={() => setSelectedStory(story)}
              className="group text-right bg-white rounded-3xl border border-[#EADCE0] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="aspect-square bg-[#F6EFF1] overflow-hidden relative">
                  <img
                    src={story.image}
                    alt={`تحول ${story.clientName}`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span
                    dir="ltr"
                    className="absolute bottom-3 left-3 px-2.5 py-1 rounded-xl bg-[#1E1115]/90 text-white text-xs font-extrabold tabular-nums"
                  >
                    {story.weightDelta} kg
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#6E5058]">
                    <span className="font-extrabold text-[#1E1115]">{story.clientName}</span>
                    <span className="tabular-nums">خلال {story.duration}</span>
                  </div>

                  <p className="text-xs text-[#C83E5B] font-bold tabular-nums">
                    من {story.beforeWeight} كجم إلى {story.afterWeight} كجم
                  </p>

                  <p className="text-xs text-[#4A2E35] line-clamp-2 leading-relaxed">
                    "{story.quote}"
                  </p>
                </div>
              </div>

              <div className="px-4 py-2.5 bg-[#FAF7F8] border-t border-[#EFE5E8] text-[11px] font-bold text-[#5E434B] flex items-center justify-between w-full">
                <span>{story.packageUsed}</span>
                <span className="text-[#C83E5B]">التفاصيل ←</span>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-white rounded-3xl border border-[#EADCE0] p-8 text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-[#1E1115]">
            هل أنتِ مستعدة لتكوني قصة النجاح القادمة؟
          </h2>
          <p className="text-sm text-[#5E434B]">
            اختاري باقة المتابعة المناسبة لكِ أو تواصلي معنا للحصول على تقييم مجاني لحالتك
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-xs font-extrabold"
            >
              <span>اشتركي في باقات المتابعة</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAF0F2] text-[#1E1115] text-xs font-bold"
            >
              <span>تسوقي منتجات التخسيس</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Story Detail Lightbox Modal */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs">
          <div
            role="dialog"
            aria-label={`قصة تحول ${selectedStory.clientName}`}
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#EADCE0]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-[#F6EFF1] aspect-square">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.clientName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#C83E5B]">قصة نجاح موثقة</span>
                    <button
                      type="button"
                      onClick={() => setSelectedStory(null)}
                      aria-label="إغلاق"
                      className="p-1.5 rounded-lg text-[#5E434B] hover:bg-[#FAF0F2] cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <h3 className="text-2xl font-extrabold text-[#1E1115]">
                    {selectedStory.clientName} ({selectedStory.age} سنة)
                  </h3>

                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#FDF2F4] border border-[#F3DCE2] text-center tabular-nums">
                    <div>
                      <span className="text-xs text-[#6E5058] block">الوزن السابق</span>
                      <span className="text-base font-extrabold text-[#1E1115]">
                        {selectedStory.beforeWeight} كجم
                      </span>
                    </div>
                    <div className="border-x border-[#F3DCE2]">
                      <span className="text-xs text-[#6E5058] block">الوزن الحالي</span>
                      <span className="text-base font-extrabold text-[#18794E]">
                        {selectedStory.afterWeight} كجم
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-[#6E5058] block">المدة</span>
                      <span className="text-base font-extrabold text-[#C83E5B]">
                        {selectedStory.duration}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[#2A181D] leading-relaxed">
                    "{selectedStory.quote}"
                  </p>

                  <div className="flex items-center gap-2 text-xs font-bold text-[#1E1115] pt-1">
                    <CheckCircle2 className="w-4 h-4 text-[#C83E5B]" />
                    <span>البرنامج المستخدم: {selectedStory.packageUsed}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#EFE5E8] flex gap-2">
                  <Link
                    to="/packages"
                    onClick={() => setSelectedStory(null)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#C83E5B] text-white text-xs font-extrabold text-center"
                  >
                    ابدئي نفس البرنامج الآن
                  </Link>
                  <button
                    type="button"
                    onClick={() => setSelectedStory(null)}
                    className="py-3 px-4 rounded-xl bg-[#FAF0F2] text-[#1E1115] text-xs font-bold cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
