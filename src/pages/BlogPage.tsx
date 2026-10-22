import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, ArrowLeft, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data/storeData';

export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Skincare', 'Healthy Drinks', 'Supplements', 'Weight Loss'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      return (
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.categoryAr.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Blog Hero Banner (Matches Screenshot 7 with High Contrast) */}
      <section className="bg-gradient-to-b from-[#F9E6EB] to-[#FAF7F8] border-b border-[#EADCE0] py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#C83E5B] bg-white px-3.5 py-1.5 rounded-xl border border-[#EBCFD6]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>مدونة Bella الطبية</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E1115]">
            <span className="text-[#C83E5B] block mb-1">مقالات</span>
            عن الصحة والتغذية والجمال
          </h1>
          <p className="text-sm sm:text-base text-[#4A2E35]">
            اكتشفي أحدث المقالات والنصائح العلمية عن التغذية الصحية، التخسيس، والعناية بالبشرة بإشراف دكتور بيلا
          </p>

          {/* Search Input */}
          <div className="relative max-w-lg mx-auto pt-2">
            <Search className="w-4 h-4 text-[#7A5C64] absolute right-4 top-1/2 -translate-y-1/2 mt-1" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحثي في المقالات..."
              aria-label="ابحثي في المقالات"
              className="w-full pr-11 pl-4 py-3 rounded-2xl bg-white border border-[#DEC8CE] text-sm text-[#1E1115] placeholder:text-[#7A5C64] focus:outline-none focus:border-[#C83E5B] shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* Category Filter & Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#C83E5B] text-white'
                  : 'bg-white text-[#2A181D] border border-[#EADCE0] hover:border-[#C83E5B]'
              }`}
            >
              {cat === 'all' ? 'جميع المقالات' : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-[#EADCE0] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-all"
            >
              <div>
                <Link to={`/blog/${post.slug}`} className="block aspect-16/10 bg-[#F6EFF1] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                </Link>

                <div className="p-6 space-y-3 text-right">
                  <div className="flex items-center justify-between text-xs text-[#6E5058]">
                    <span className="font-extrabold text-[#C83E5B]">
                      {post.category} · {post.categoryAr}
                    </span>
                    <span>{post.readTime}</span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="block text-xl font-extrabold text-[#1E1115] hover:text-[#C83E5B] transition-colors leading-snug"
                  >
                    {post.title}
                  </Link>

                  <p className="text-xs sm:text-sm text-[#4A2E35] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-[#EFE5E8] flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1.5 text-[#6E5058]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </span>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 font-extrabold text-[#C83E5B] hover:underline"
                >
                  <span>اقرئي المزيد</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
