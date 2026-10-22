import { Product } from '../data/storeData';

export type Gender = 'female' | 'male';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
export type CalorieGoal = 'lose' | 'maintain' | 'gain';

export interface CalorieInput {
  gender: Gender;
  age: number;
  weightKg: number;
  heightCm: number;
  activity: ActivityLevel;
  goal: CalorieGoal;
}

export interface CalorieResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  bmi: number;
  bmiCategoryAr: string;
  waterLiters: number;
  recommendedPackageId: string;
  recommendedProductIds: string[];
}

const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export function calculateCaloriePlan(input: CalorieInput): CalorieResult {
  const { gender, age, weightKg, heightCm, activity, goal } = input;
  if (
    !Number.isFinite(age) ||
    !Number.isFinite(weightKg) ||
    !Number.isFinite(heightCm) ||
    age < 12 ||
    age > 100 ||
    weightKg < 25 ||
    weightKg > 300 ||
    heightCm < 100 ||
    heightCm > 240
  ) {
    throw new Error('يرجى إدخال قيم صحيحة للعمر والوزن والطول.');
  }

  // Mifflin-St Jeor Equation
  const baseBmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = Math.round(gender === 'male' ? baseBmr + 5 : baseBmr - 161);
  const tdee = Math.round(bmr * ACTIVITY_MULTIPLIERS[activity]);

  let targetCalories = tdee;
  if (goal === 'lose') {
    const minSafe = gender === 'male' ? 1400 : 1200;
    targetCalories = Math.max(minSafe, tdee - 500);
  } else if (goal === 'gain') {
    targetCalories = tdee + 400;
  }

  // Macro distribution
  let proteinRatio = 0.3;
  let carbsRatio = 0.4;
  let fatsRatio = 0.3;

  if (goal === 'lose') {
    proteinRatio = 0.35;
    carbsRatio = 0.35;
    fatsRatio = 0.3;
  } else if (goal === 'gain') {
    proteinRatio = 0.25;
    carbsRatio = 0.5;
    fatsRatio = 0.25;
  }

  const proteinGrams = Math.round((targetCalories * proteinRatio) / 4);
  const carbsGrams = Math.round((targetCalories * carbsRatio) / 4);
  const fatsGrams = Math.round((targetCalories * fatsRatio) / 9);

  const heightMeters = heightCm / 100;
  const bmi = Number((weightKg / (heightMeters * heightMeters)).toFixed(1));

  let bmiCategoryAr = 'وزن مثالي وصحي';
  if (bmi < 18.5) {
    bmiCategoryAr = 'نحافة / أقل من الوزن المثالي';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategoryAr = 'زيادة في الوزن';
  } else if (bmi >= 30) {
    bmiCategoryAr = 'سمنة — ينصح بمتابعة علاجية';
  }

  const waterLiters = Number(Math.max(2.0, weightKg * 0.035).toFixed(1));

  let recommendedPackageId = 'transformation-3m';
  let recommendedProductIds = ['fat-boom-capsules', 'bella-green-coffee-cardamom'];

  if (goal === 'gain' || bmi < 18.5) {
    recommendedPackageId = 'starter-1m';
    recommendedProductIds = ['qawam-herbal-weight-gain', 'qawam-royal-pack'];
  } else if (bmi >= 30) {
    recommendedPackageId = 'stardom-6m';
    recommendedProductIds = ['fat-boom-capsules', 'cla-konjac-slimming-tabs', 'lipotrofin-skin-firming'];
  } else if (goal === 'maintain') {
    recommendedPackageId = 'starter-1m';
    recommendedProductIds = ['bella-omega3-vitamin-d3', 'bella-protein-oat-bars'];
  }

  return {
    bmr,
    tdee,
    targetCalories,
    proteinGrams,
    carbsGrams,
    fatsGrams,
    bmi,
    bmiCategoryAr,
    waterLiters,
    recommendedPackageId,
    recommendedProductIds,
  };
}

export interface ProductFilterOptions {
  category?: string;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  onlyInStock?: boolean;
  onlyDiscounted?: boolean;
  onlyFeatured?: boolean;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'popular';
}

export function filterAndSortProducts(
  products: Product[],
  options: ProductFilterOptions
): Product[] {
  const {
    category = 'all',
    searchQuery = '',
    minPrice = 0,
    maxPrice = 5000,
    minRating = 0,
    onlyInStock = false,
    onlyDiscounted = false,
    onlyFeatured = false,
    sortBy = 'popular',
  } = options;

  const query = searchQuery.trim().toLowerCase();

  const filtered = products.filter((p) => {
    if (category && category !== 'all' && p.category !== category) return false;
    if (query) {
      const hay = `${p.name} ${p.shortDesc} ${p.categoryLabel} ${p.ingredients}`.toLowerCase();
      if (!hay.includes(query)) return false;
    }
    if (p.price < minPrice || p.price > maxPrice) return false;
    if (p.rating < minRating) return false;
    if (onlyInStock && !p.inStock) return false;
    if (onlyDiscounted && (!p.discountPercent || p.discountPercent <= 0)) return false;
    if (onlyFeatured && !p.isFeatured) return false;
    return true;
  });

  const sorted = [...filtered];
  if (sortBy === 'price-asc') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    sorted.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
  } else if (sortBy === 'newest') {
    sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  } else {
    // popular
    sorted.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviewsCount - a.reviewsCount);
  }

  return sorted;
}

export interface CartItemEntry {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  categoryLabel: string;
}

export interface CartTotals {
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  appliedPromo: string | null;
}

const PROMO_CODES: Record<string, number> = {
  BELLA20: 0.2,
  DRBELLA15: 0.15,
  FIRST10: 0.1,
};

export function calculateCartTotals(items: CartItemEntry[], promoCode?: string): CartTotals {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  if (subtotal === 0) {
    return { subtotal: 0, discountAmount: 0, shippingFee: 0, total: 0, appliedPromo: null };
  }

  const normalizedPromo = promoCode ? promoCode.trim().toUpperCase() : '';
  const discountRate = PROMO_CODES[normalizedPromo] || 0;
  const discountAmount = Math.round(subtotal * discountRate);
  const afterDiscount = subtotal - discountAmount;
  const shippingFee = afterDiscount >= 1000 ? 0 : 60;
  const total = afterDiscount + shippingFee;

  return {
    subtotal,
    discountAmount,
    shippingFee,
    total,
    appliedPromo: discountRate > 0 ? normalizedPromo : null,
  };
}
