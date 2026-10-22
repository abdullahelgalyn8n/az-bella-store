import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Award,
  TrendingUp,
  Target,
  Eye,
  Heart,
  CheckCircle2,
  ArrowLeft,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-14 pb-16">
      {/* Hero Banner (Matches Screenshot 2 with High Contrast) */}
      <section className="bg-gradient-to-b from-[#F9E6EB] to-[#FAF7F8] border-b border-[#EADCE0] py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#C83E5B] bg-white px-3.5 py-1.5 rounded-xl border border-[#EBCFD6]">
            <Heart className="w-3.5 h-3.5 fill-[#C83E5B]" />
            <span>تعرفي علينا</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E1115] leading-tight">
            <span className="text-[#C83E5B] block mb-1">Bella</span>
            رحلتك نحو حياة أفضل
          </h1>
          <p className="text-base sm:text-lg text-[#4A2E35] leading-relaxed">
            Bella مش بس مكان للتخسيس، ده مجتمع كامل بيدعمك ويساعدك تحققي أهدافك الصحية. بنؤمن إن كل واحدة تستحق تعيش حياة صحية، رشيقة، وسعيدة بدون حرمان.
          </p>
        </div>
      </section>

      {/* 3 Quantitative Stats Strip */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EADCE0] p-8 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center shadow-2xs tabular-nums">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#C83E5B] text-white flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-3xl font-extrabold text-[#C83E5B]">+500</p>
            <p className="text-sm font-bold text-[#3D262C]">عميلة سعيدة</p>
          </div>

          <div className="space-y-2 sm:border-x border-[#EFE5E8]">
            <div className="w-12 h-12 rounded-full bg-[#C83E5B] text-white flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <p className="text-3xl font-extrabold text-[#C83E5B]">+50</p>
            <p className="text-sm font-bold text-[#3D262C]">برنامج تخسيس وتغذية</p>
          </div>

          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-[#C83E5B] text-white flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-3xl font-extrabold text-[#C83E5B]">95%</p>
            <p className="text-sm font-bold text-[#3D262C]">نسبة النجاح والالتزام</p>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values (Matches Screenshot 2) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-[#EADCE0] p-8 text-center space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF2F4] text-[#C83E5B] flex items-center justify-center mx-auto">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-[#1E1115]">مهمتنا</h2>
            <p className="text-sm text-[#4A2E35] leading-relaxed">
              مساعدة كل واحدة تحقق حلمها في الوصول لوزنها المثالي وحياة صحية أفضل من خلال برامج مخصصة ومتابعة مستمرة ومنتجات طبيعية آمنة.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#EADCE0] p-8 text-center space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF2F4] text-[#C83E5B] flex items-center justify-center mx-auto">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-[#1E1115]">رؤيتنا</h2>
            <p className="text-sm text-[#4A2E35] leading-relaxed">
              نكون المنصة الأولى والأوثق في مصر والعالم العربي لبرامج التخسيس العلاجية، منتجات العناية بالجمال، ونمط الحياة الصحي المستدام.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-[#EADCE0] p-8 text-center space-y-4 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#FDF2F4] text-[#C83E5B] flex items-center justify-center mx-auto">
              <Heart className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-[#1E1115]">قيمنا</h2>
            <p className="text-sm text-[#4A2E35] leading-relaxed">
              الشفافية العلمية، الدعم النفسي والغذائي المستمر، الاهتمام بكل عميلة كحالة متفردة، والالتزام بتقديم نتائج حقيقية ومستدامة.
            </p>
          </div>
        </div>
      </section>

      {/* Dr. Bella Story & Methodology */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#EADCE0] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <img
              src="/assets/extracted/dr-bella.png"
              alt="دكتور بيلا"
              className="w-64 rounded-3xl shadow-md object-cover border-2 border-[#F3DCE2]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="lg:col-span-7 space-y-4 text-right">
            <span className="text-xs font-extrabold text-[#C83E5B]">منهجية علمية متكاملة</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1115]">
              لماذا تختارين Bella؟
            </h2>
            <p className="text-sm sm:text-base text-[#4A2E35] leading-relaxed">
              في Bella لا نؤمن بالأنظمة القاسية الموحدة التي تسبب الإرهاق وتساقط الشعر ثم استعادة الوزن سريعاً. نحن نصمم لكل عميلة خطة متكاملة تراعي حالتها الصحية، معدل الحرق، ومواعيد يومها.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'منتجات مسجلة ومختبرة بعناية فائقة',
                'فريق طبي متخصص للرد اليومي عبر واتساب',
                'برامج تثبيت وزن مجانية بعد الوصول للهدف',
                'شحن سريع لباب المنزل في جميع محافظات مصر',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-bold text-[#1E1115]">
                  <CheckCircle2 className="w-4 h-4 text-[#C83E5B] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="pt-3 flex flex-wrap gap-3">
              <Link
                to="/packages"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C83E5B] text-white text-xs font-extrabold"
              >
                <span>تصفحي باقات المتابعة</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FAF0F2] text-[#1E1115] text-xs font-bold"
              >
                <span>تواصلي مع فريقنا</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
