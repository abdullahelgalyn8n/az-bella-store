import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { BLOG_POSTS, PRODUCTS } from '../data/storeData';
import { ProductCard } from '../components/ProductCard';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug || p.id === slug) || BLOG_POSTS[0];

  const relatedProducts = PRODUCTS.filter((p) => p.category === 'skincare' || p.isFeatured).slice(0, 3);

  return (
    <div className="pb-16 space-y-12">
      {/* Wide Banner Image (Matches Screenshot 5) */}
      <div className="w-full h-64 sm:h-80 lg:h-96 bg-[#3D262C] overflow-hidden relative">
        <img
          src={post.heroImage || post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1115]/60 via-transparent to-transparent" />
      </div>

      {/* Article Container */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="مسار المقال" className="text-xs font-semibold text-[#6E5058] flex items-center gap-2">
          <Link to="/" className="hover:text-[#C83E5B]">الرئيسية</Link>
          <span>/</span>
          <Link to="/blog" className="hover:text-[#C83E5B]">المدونة</Link>
          <span>/</span>
          <span className="text-[#1E1115] font-bold">{post.title}</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 border-b border-[#EADCE0] pb-6">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#C83E5B]">
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.categoryAr}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E1115] leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#5E434B]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#C83E5B]" />
              <span>{post.date}</span>
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C83E5B]" />
              <span>{post.readTime}</span>
            </span>
            <span>·</span>
            <span className="font-bold text-[#1E1115]">{post.author} — {post.authorRole}</span>
          </div>
        </header>

        {/* Article Lead Intro */}
        <p className="text-base sm:text-lg text-[#2A181D] font-medium leading-relaxed bg-white p-6 rounded-2xl border border-[#EADCE0]">
          {post.intro}
        </p>

        {/* Formatted Sections (Replaces raw ## / ### markdown from original screenshot!) */}
        <div className="space-y-6">
          {post.sections.map((sec, idx) => (
            <section
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EADCE0] space-y-3 shadow-2xs"
            >
              <h2 className="text-xl font-extrabold text-[#1E1115]">{sec.heading}</h2>
              <p className="text-sm sm:text-base text-[#3D262C] leading-relaxed">{sec.body}</p>
              {sec.bullets && (
                <ul className="space-y-2 pt-2">
                  {sec.bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#2A181D]">
                      <CheckCircle2 className="w-4 h-4 text-[#C83E5B] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Extra Golden Tips Box */}
        <div className="bg-[#FDF2F4] rounded-3xl border border-[#F3DCE2] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-[#C83E5B]">
            <Sparkles className="w-5 h-5" />
            <h3 className="text-lg font-extrabold text-[#1E1115]">نصائح إضافية من دكتور بيلا</h3>
          </div>
          <ul className="space-y-2.5">
            {post.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm font-semibold text-[#2A181D]">
                <CheckCircle2 className="w-4 h-4 text-[#C83E5B] shrink-0 mt-1" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Back to Blog Link */}
        <div className="pt-6 border-t border-[#EADCE0] flex items-center justify-between">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#C83E5B] hover:underline"
          >
            <ArrowRight className="w-4 h-4" />
            <span>العودة للمدونة</span>
          </Link>

          <Link
            to="/packages"
            className="px-5 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-extrabold hover:bg-[#B0304B]"
          >
            احجزي استشارتك مع د. بيلا
          </Link>
        </div>
      </article>

      {/* Related Store Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-[#EADCE0]">
        <h2 className="text-2xl font-extrabold text-[#1E1115] mb-6">
          منتجات موصى بها من متجر Bella
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};
