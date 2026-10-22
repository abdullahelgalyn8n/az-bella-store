import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Star,
  LayoutGrid,
  List,
  ShoppingBag,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/storeData';
import { filterAndSortProducts } from '../utils/nutrition';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';
  const initialSort = (searchParams.get('sort') as any) || 'popular';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyDiscounted, setOnlyDiscounted] = useState<boolean>(false);
  const [onlyFeatured, setOnlyFeatured] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular'>(initialSort);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { addToCart } = useStore();

  useEffect(() => {
    const cat = searchParams.get('category');
    const q = searchParams.get('q');
    if (cat) setSelectedCategory(cat);
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const next = new URLSearchParams(searchParams);
    if (catId === 'all') next.delete('category');
    else next.set('category', catId);
    setSearchParams(next);
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setMaxPrice(1500);
    setMinRating(0);
    setOnlyDiscounted(false);
    setOnlyFeatured(false);
    setSortBy('popular');
    setSearchParams({});
  };

  const filteredProducts = filterAndSortProducts(PRODUCTS, {
    category: selectedCategory,
    searchQuery,
    minPrice: 0,
    maxPrice,
    minRating,
    onlyDiscounted,
    onlyFeatured,
    sortBy,
  });

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Header & Search */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1E1115]">جميع المنتجات</h1>
        <p className="text-sm text-[#5E434B]">
          تصفحي تشكيلة متكاملة من منتجات التخسيس، المكملات الغذائية، العناية بالبشرة، والوجبات الصحية الأصلية
        </p>

        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-[#7A5C64] absolute right-4 top-1/2 -translate-y-1/2" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحثي عن منتج بالاسم أو المكونات..."
            aria-label="ابحثي عن منتج"
            className="w-full pr-12 pl-4 py-3.5 rounded-2xl bg-white border border-[#DEC8CE] text-sm text-[#1E1115] placeholder:text-[#7A5C64] shadow-2xs focus:outline-none focus:border-[#C83E5B]"
          />
        </div>
      </div>

      {/* Main Layout: Sidebar (Right in RTL) + Products Grid (Left in RTL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filter Sidebar */}
        <aside className="lg:col-span-3 bg-white rounded-3xl border border-[#EADCE0] p-5 space-y-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#EFE5E8]">
            <div className="flex items-center gap-2 text-base font-extrabold text-[#1E1115]">
              <SlidersHorizontal className="w-4 h-4 text-[#C83E5B]" />
              <span>فلترة المنتجات</span>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#C83E5B] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>مسح الفلاتر</span>
            </button>
          </div>

          {/* Categories Filter */}
          <div className="space-y-2.5">
            <h2 className="text-xs font-extrabold text-[#2A181D]">الفئة</h2>
            <div className="space-y-1.5">
              <button
                type="button"
                onClick={() => handleCategoryChange('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#C83E5B] text-white'
                    : 'text-[#3D262C] hover:bg-[#FAF0F2]'
                }`}
              >
                <span>جميع الفئات</span>
                <span className="tabular-nums">{PRODUCTS.length}</span>
              </button>

              {CATEGORIES.map((cat) => {
                const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#C83E5B] text-white'
                        : 'text-[#3D262C] hover:bg-[#FAF0F2]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="tabular-nums">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="pt-4 border-t border-[#EFE5E8] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-extrabold text-[#2A181D]">نطاق السعر</h2>
              <span className="text-xs font-bold text-[#C83E5B] tabular-nums">
                0 - {maxPrice} ج.م
              </span>
            </div>
            <input
              type="range"
              min={250}
              max={1500}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="الحد الأقصى للسعر"
              className="w-full accent-[#C83E5B] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#6E5058] tabular-nums">
              <span>250 ج.م</span>
              <span>1500 ج.م</span>
            </div>
          </div>

          {/* Minimum Rating Filter */}
          <div className="pt-4 border-t border-[#EFE5E8] space-y-2.5">
            <h2 className="text-xs font-extrabold text-[#2A181D]">التقييم</h2>
            {[4.8, 4.7, 4.5, 0].map((rt) => (
              <button
                key={rt}
                type="button"
                onClick={() => setMinRating(rt)}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  minRating === rt
                    ? 'bg-[#FDF2F4] text-[#C83E5B] font-extrabold'
                    : 'text-[#4A2E35] hover:bg-[#FAF7F8]'
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  {rt === 0 ? (
                    'جميع التقييمات'
                  ) : (
                    <>
                      <Star className="w-3.5 h-3.5 fill-[#E59819] text-[#E59819]" />
                      <span className="tabular-nums">{rt}+</span> وأكثر
                    </>
                  )}
                </span>
              </button>
            ))}
          </div>

          {/* Special Filters */}
          <div className="pt-4 border-t border-[#EFE5E8] space-y-2.5">
            <h2 className="text-xs font-extrabold text-[#2A181D]">فلاتر خاصة</h2>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-[#3D262C] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyDiscounted}
                onChange={(e) => setOnlyDiscounted(e.target.checked)}
                className="rounded accent-[#C83E5B] w-4 h-4"
              />
              <span>عروض وتخفيضات فقط</span>
            </label>
            <label className="flex items-center gap-2.5 text-xs font-semibold text-[#3D262C] cursor-pointer">
              <input
                type="checkbox"
                checked={onlyFeatured}
                onChange={(e) => setOnlyFeatured(e.target.checked)}
                className="rounded accent-[#C83E5B] w-4 h-4"
              />
              <span>منتجات مميزة ومختارة</span>
            </label>
          </div>
        </aside>

        {/* Products Column */}
        <div className="lg:col-span-9 space-y-6">
          {/* Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-[#EADCE0] flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-bold text-[#1E1115] tabular-nums">
              عرض <span className="text-[#C83E5B]">{filteredProducts.length}</span> منتج
            </p>

            <div className="flex items-center gap-3">
              <label htmlFor="sort-select" className="text-xs font-bold text-[#5E434B]">
                ترتيب حسب:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3.5 py-2 rounded-xl bg-[#FAF7F8] border border-[#DEC8CE] text-xs font-bold text-[#1E1115] focus:outline-none focus:border-[#C83E5B]"
              >
                <option value="popular">الأكثر مبيعاً وشعبية</option>
                <option value="newest">الأحدث</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="rating">الأعلى تقييماً</option>
              </select>

              <div className="hidden sm:flex items-center gap-1 bg-[#FAF7F8] p-1 rounded-xl border border-[#EADCE0]">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  aria-label="عرض شبكي"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-[#C83E5B] text-white' : 'text-[#5E434B]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  aria-label="عرض قائمة"
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    viewMode === 'list' ? 'bg-[#C83E5B] text-white' : 'text-[#5E434B]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Results */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#EADCE0] p-12 text-center space-y-4">
              <p className="text-lg font-extrabold text-[#1E1115]">
                لم نجد منتجات مطابقة لخيارات البحث الحالية
              </p>
              <p className="text-xs text-[#6E5058]">
                جربي تغيير الفئة أو توسيع نطاق السعر لعرض المزيد من المنتجات.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-bold cursor-pointer"
              >
                إعادة ضبط جميع الفلاتر
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-[#EADCE0] p-4 flex flex-col sm:flex-row items-center gap-5"
                >
                  <Link
                    to={`/product/${product.id}`}
                    className="w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-[#F6EFF1] shrink-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <div className="flex-1 space-y-2 text-right">
                    <div className="flex items-center gap-2 text-xs text-[#6E5058]">
                      <span>{product.categoryLabel}</span>
                      <span>·</span>
                      <span className="font-bold text-[#1E1115] tabular-nums">
                        ★ {product.rating} ({product.reviewsCount} تقييم)
                      </span>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="text-lg font-extrabold text-[#1E1115] hover:text-[#C83E5B] block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-[#4A2E35] leading-relaxed">{product.description}</p>
                  </div>
                  <div className="sm:border-r border-[#EFE5E8] sm:pr-5 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0">
                    <div className="tabular-nums text-left sm:text-right">
                      <span className="text-xl font-extrabold text-[#1E1115] block">
                        {product.price} ج.م
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#8C6D76] line-through">
                          {product.originalPrice} ج.م
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                          categoryLabel: product.categoryLabel,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-xs font-extrabold cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>أضف للسلة</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
