import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  ShoppingBag,
  CheckCircle2,
  ShieldCheck,
  Truck,
  MessageCircle,
  Plus,
  Minus,
} from 'lucide-react';
import { PRODUCTS } from '../data/storeData';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);

  const product = PRODUCTS.find((p) => p.id === id || p.slug === id);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-extrabold text-[#1E1115]">المنتج غير موجود</h1>
        <p className="text-sm text-[#5E434B]">ربما تم نقل هذا المنتج أو تعديل رابطه.</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-3 rounded-xl bg-[#C83E5B] text-white text-xs font-extrabold"
        >
          العودة إلى المتجر
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
      {/* Breadcrumb */}
      <nav aria-label="مسار الصفحة" className="text-xs font-semibold text-[#6E5058] flex items-center gap-2">
        <Link to="/" className="hover:text-[#C83E5B]">الرئيسية</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-[#C83E5B]">المتجر</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-[#C83E5B]">
          {product.categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-[#1E1115] font-bold truncate">{product.name}</span>
      </nav>

      {/* Main Contiguous Purchase Module */}
      <div className="bg-white rounded-3xl border border-[#EADCE0] p-6 sm:p-10 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Image Gallery Column */}
        <div className="lg:col-span-5 relative rounded-2xl overflow-hidden bg-[#F6EFF1] border border-[#EADCE0]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-4/3 object-cover"
            referrerPolicy="no-referrer"
          />
          {product.discountPercent && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-[#C83E5B] text-white text-xs font-extrabold tabular-nums">
              خصم {product.discountPercent}%
            </span>
          )}
        </div>

        {/* Details & Purchase Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#6E5058]">
              <span className="font-bold text-[#C83E5B]">{product.categoryLabel}</span>
              <span>·</span>
              <span className="inline-flex items-center gap-1 font-bold text-[#1E1115] tabular-nums">
                <Star className="w-4 h-4 fill-[#E59819] text-[#E59819]" />
                {product.rating} ({product.reviewsCount} تقييم موثق)
              </span>
              <span>·</span>
              <span className="text-[#18794E] font-bold">متوفر في المخزون</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1E1115] leading-snug">
              {product.name}
            </h1>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-[#EFE5E8] tabular-nums">
            <span className="text-3xl font-extrabold text-[#C83E5B]">
              {product.price} <span className="text-base">ج.م</span>
            </span>
            {product.originalPrice && (
              <span className="text-base text-[#8C6D76] line-through">
                {product.originalPrice} ج.م
              </span>
            )}
            <span className="text-xs text-[#5E434B] mr-auto">{product.size}</span>
          </div>

          <p className="text-sm sm:text-base text-[#3D262C] leading-relaxed">
            {product.description}
          </p>

          {/* Key Benefits */}
          <div className="space-y-2.5 bg-[#FAF7F8] p-5 rounded-2xl border border-[#EADCE0]">
            <h2 className="text-sm font-extrabold text-[#1E1115]">أهم الفوائد والمميزات:</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[#2A181D] font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-[#C83E5B] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Usage & Ingredients */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-white border border-[#EADCE0]">
              <strong className="text-[#1E1115] block mb-1">طريقة الاستخدام المقترحة:</strong>
              <p className="text-[#5E434B] leading-relaxed">{product.usage}</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#EADCE0]">
              <strong className="text-[#1E1115] block mb-1">المكونات الفعالة:</strong>
              <p className="text-[#5E434B] leading-relaxed">{product.ingredients}</p>
            </div>
          </div>

          {/* Quantity & Add to Cart Actions */}
          <div className="pt-4 border-t border-[#EFE5E8] flex flex-wrap items-center gap-4">
            <div className="flex items-center border border-[#DEC8CE] rounded-xl bg-[#FAF7F8] p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="تقليل الكمية"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#1E1115] hover:bg-white cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-extrabold tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="زيادة الكمية"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#1E1115] hover:bg-white cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                addToCart(
                  {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    categoryLabel: product.categoryLabel,
                  },
                  quantity
                )
              }
              className="flex-1 min-w-[180px] py-3.5 px-6 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-sm font-extrabold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>أضف إلى السلة ({product.price * quantity} ج.م)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                addToCart(
                  {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    categoryLabel: product.categoryLabel,
                  },
                  quantity
                );
                navigate('/cart');
              }}
              className="py-3.5 px-5 rounded-xl bg-[#1E1115] hover:bg-[#331D24] text-white text-xs font-extrabold transition-colors cursor-pointer"
            >
              شراء فوري
            </button>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-3 gap-3 pt-2 text-[11px] font-bold text-[#5E434B]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C83E5B] shrink-0" />
              <span>منتج أصلي مضمون 100%</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#C83E5B] shrink-0" />
              <span>شحن سريع لجميع المحافظات</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-[#C83E5B] shrink-0" />
              <span>متابعة مجانية مع الطلب</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold text-[#1E1115]">منتجات مشابهة قد تهمك</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
