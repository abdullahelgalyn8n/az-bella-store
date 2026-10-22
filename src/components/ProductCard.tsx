import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../data/storeData';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setQuickViewProduct } = useStore();

  return (
    <article className="group bg-white rounded-2xl border border-[#EADCE0] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-4/3 bg-[#F6EFF1] overflow-hidden">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </Link>

          {product.discountPercent && product.discountPercent > 0 && (
            <span
              dir="ltr"
              className="absolute top-2 right-2 px-3 py-1 rounded-lg bg-[#C83E5B] text-white text-xs font-extrabold tabular-nums shadow-sm"
            >
              -{product.discountPercent}%
            </span>
          )}

          <button
            type="button"
            onClick={() => setQuickViewProduct(product)}
            aria-label={`معاينة سريعة لمنتج ${product.name}`}
            className="absolute bottom-3 left-3 p-2 rounded-xl bg-white/95 text-[#1E1115] hover:bg-[#C83E5B] hover:text-white shadow-sm transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4">
          {/* Unboxed Metadata Line */}
          <div className="flex items-center justify-between text-xs text-[#6E5058] mb-1.5">
            <span>{product.categoryLabel}</span>
            <span className="inline-flex items-center gap-1 font-bold text-[#2A181D] tabular-nums">
              <Star className="w-3.5 h-3.5 fill-[#E59819] text-[#E59819]" />
              {product.rating}
              <span className="font-normal text-[#6E5058]">({product.reviewsCount})</span>
            </span>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="block text-base font-bold text-[#1E1115] hover:text-[#C83E5B] transition-colors line-clamp-1 mb-1"
          >
            {product.name}
          </Link>

          <p className="text-xs text-[#5E434B] line-clamp-2 leading-relaxed min-h-[2.25rem]">
            {product.shortDesc}
          </p>
        </div>
      </div>

      {/* Price & Add to Cart Footer */}
      <div className="px-4 pb-4 pt-2 border-t border-[#F3E9EC] flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2 tabular-nums">
          <span className="text-lg font-extrabold text-[#1E1115]">
            {product.price} <span className="text-xs font-bold">ج.م</span>
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
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>أضف للسلة</span>
        </button>
      </div>
    </article>
  );
};
