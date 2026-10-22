import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCaloriePlan,
  filterAndSortProducts,
  calculateCartTotals,
} from './nutrition';
import { PRODUCTS } from '../data/storeData';

test('calculateCaloriePlan computes accurate BMR, TDEE, and weight-loss macros for female', () => {
  const res = calculateCaloriePlan({
    gender: 'female',
    age: 28,
    weightKg: 75,
    heightCm: 165,
    activity: 'moderate',
    goal: 'lose',
  });

  // BMR = 10*75 + 6.25*165 - 5*28 - 161 = 750 + 1031.25 - 140 - 161 = 1480
  assert.equal(res.bmr, 1480);
  // TDEE = round(1480 * 1.55) = 2294
  assert.equal(res.tdee, 2294);
  // Lose = 2294 - 500 = 1794
  assert.equal(res.targetCalories, 1794);
  assert.ok(res.proteinGrams > 140);
  assert.equal(res.bmi, 27.5);
  assert.equal(res.bmiCategoryAr, 'زيادة في الوزن');
});

test('calculateCaloriePlan recommends bulking products when goal is gain', () => {
  const res = calculateCaloriePlan({
    gender: 'female',
    age: 24,
    weightKg: 48,
    heightCm: 164,
    activity: 'light',
    goal: 'gain',
  });

  assert.equal(res.targetCalories, res.tdee + 400);
  assert.ok(res.recommendedProductIds.includes('qawam-herbal-weight-gain'));
});

test('filterAndSortProducts filters by category, price range, and sorts accurately', () => {
  const slimmingOnly = filterAndSortProducts(PRODUCTS, {
    category: 'slimming',
    minPrice: 600,
    maxPrice: 900,
    sortBy: 'price-asc',
  });

  assert.ok(slimmingOnly.length >= 4);
  assert.ok(slimmingOnly.every((p) => p.category === 'slimming'));
  assert.ok(slimmingOnly[0].price <= slimmingOnly[slimmingOnly.length - 1].price);
});

test('calculateCartTotals applies promo codes and free shipping threshold >= 1000 EGP', () => {
  const items = [
    {
      id: 'fat-boom-capsules',
      name: 'فات بوم',
      price: 850,
      quantity: 2,
      image: '/assets/extracted/product-3.png',
      categoryLabel: 'منتجات التخسيس',
    },
  ];

  const totals = calculateCartTotals(items, 'BELLA20');
  assert.equal(totals.subtotal, 1700);
  assert.equal(totals.discountAmount, 340);
  assert.equal(totals.shippingFee, 0);
  assert.equal(totals.total, 1360);
  assert.equal(totals.appliedPromo, 'BELLA20');
});
