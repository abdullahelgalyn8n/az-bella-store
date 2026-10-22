import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
  Calculator,
  PhoneCall,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/storeData';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const navLinks = [
    { to: '/', label: 'الرئيسية', end: true },
    { to: '/shop', label: 'المتجر' },
    { to: '/packages', label: 'الباقات' },
    { to: '/healthy-meals', label: 'وجبات صحية' },
    { to: '/transformations', label: 'التحولات' },
    { to: '/calorie-calculator', label: 'حاسبة السعرات' },
    { to: '/blog', label: 'المدونة' },
    { to: '/about', label: 'عن Bella' },
    { to: '/contact', label: 'تواصل معنا' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchInput.trim())}`);
      setSearchOpen(false);
      setSearchInput('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EADCE0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Right Zone (in RTL): Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 group focus:outline-none"
          aria-label="Bella Store الرئيسية"
        >
          <img
            src="/assets/extracted/logo.png"
            alt="Bella Logo"
            className="w-12 h-12 rounded-full object-cover border-2 border-[#C83E5B]/30 group-hover:border-[#C83E5B] transition-colors"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-[#1E1115] leading-none">
              Bella
            </span>
            <span className="text-xs font-medium text-[#7A5C64] mt-1">
              صحة، لياقة، وجمال
            </span>
          </div>
        </Link>

        {/* Center Zone: Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-bold text-[#3D262C]" aria-label="القائمة الرئيسية">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `py-2 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                  isActive
                    ? 'text-[#C83E5B] border-[#C83E5B]'
                    : 'text-[#3D262C] border-transparent hover:text-[#C83E5B]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Categories Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setCategoriesOpen(true)}
            onMouseLeave={() => setCategoriesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCategoriesOpen((prev) => !prev)}
              aria-expanded={categoriesOpen}
              className="flex items-center gap-1 py-2 text-[#3D262C] hover:text-[#C83E5B] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>التصنيفات</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {categoriesOpen && (
              <div className="absolute right-0 top-full pt-2 w-64 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-[#EADCE0] p-2 grid gap-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.id}
                      to={`/shop?category=${cat.id}`}
                      onClick={() => setCategoriesOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-[#2A181D] hover:bg-[#FDF2F4] hover:text-[#C83E5B] transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-[#7A5C64] tabular-nums">{cat.count}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Left Zone (in RTL): Search, Cart, & CTA */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={() => setSearchOpen((prev) => !prev)}
            aria-label="بحث عن منتجات"
            className="p-2.5 rounded-xl text-[#2A181D] hover:bg-[#FAF0F2] hover:text-[#C83E5B] transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            aria-label="سلة التسوق"
            className="relative p-2.5 rounded-xl text-[#2A181D] hover:bg-[#FAF0F2] hover:text-[#C83E5B] transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span
                data-testid="cart-badge-count"
                className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-[#C83E5B] text-white text-xs font-bold flex items-center justify-center tabular-nums"
              >
                {cartCount}
              </span>
            )}
          </button>

          <Link
            to="/packages"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <span>احجزي باقتك</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="xl:hidden p-2.5 rounded-xl text-[#2A181D] hover:bg-[#FAF0F2] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Bar */}
      {searchOpen && (
        <div className="border-t border-[#EADCE0] bg-[#FAF7F8] py-3 px-4">
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#7A5C64] absolute right-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="ابحثي عن منتج (مثل: فات بوم، قهوة خضراء، كولاجين، قوام)..."
                aria-label="ابحثي عن منتج"
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-white border border-[#DEC8CE] text-sm text-[#1E1115] placeholder:text-[#7A5C64] focus:outline-none focus:border-[#C83E5B]"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#C83E5B] hover:bg-[#B0304B] text-white text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
            >
              بحث
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#EADCE0] bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? 'bg-[#FDF2F4] text-[#C83E5B]'
                      : 'text-[#2A181D] hover:bg-[#FAF7F8]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div className="pt-2 border-t border-[#EADCE0] flex items-center gap-2">
            <Link
              to="/calorie-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FAF0F2] text-[#C83E5B] text-xs font-bold"
            >
              <Calculator className="w-4 h-4" />
              <span>حاسبة السعرات</span>
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#C83E5B] text-white text-xs font-bold"
            >
              <PhoneCall className="w-4 h-4" />
              <span>استشارة مجانية</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
