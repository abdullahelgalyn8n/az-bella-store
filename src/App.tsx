/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ModalsAndDrawers } from './components/ModalsAndDrawers';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { PackagesPage } from './pages/PackagesPage';
import { HealthyMealsPage } from './pages/HealthyMealsPage';
import { TransformationsPage } from './pages/TransformationsPage';
import { CalorieCalculatorPage } from './pages/CalorieCalculatorPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { CartCheckoutPage } from './pages/CartCheckoutPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div dir="rtl" className="min-h-screen flex flex-col bg-[#FAF7F8] text-[#1E1115]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/healthy-meals" element={<HealthyMealsPage />} />
              <Route path="/transformations" element={<TransformationsPage />} />
              <Route path="/calorie-calculator" element={<CalorieCalculatorPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartCheckoutPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <ModalsAndDrawers />
        </div>
      </BrowserRouter>
    </StoreProvider>
  );
}
