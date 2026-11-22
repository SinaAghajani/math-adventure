"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Map, Trophy, UserRound, Sparkles } from "lucide-react";

const navItems = [
  { label: "خانه", href: "/", icon: Home },
  { label: "نقشه ماجراجویی", href: "/#adventure-map", icon: Map },
  { label: "افتخارات", href: "/#achievements", icon: Trophy },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-indigo-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-2xl text-white shadow-lg shadow-indigo-200">
            🧭
          </div>

          <div>
            <h1 className="text-lg font-black text-slate-800">
              ماجراجویان ریاضی
            </h1>
            <p className="text-xs font-medium text-slate-400">Math Adventure</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-sm font-bold text-slate-600 transition hover:text-indigo-600"
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-600">
            <Sparkles size={17} />
            <span>ماجراجوی تازه‌کار</span>
          </div>

          <button
            type="button"
            aria-label="پروفایل دانش‌آموز"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 transition hover:bg-indigo-200"
          >
            <UserRound size={21} />
          </button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "بستن منو" : "باز کردن منو"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl bg-slate-100 p-2 text-slate-700 md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-100 bg-white px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                >
                  <Icon size={19} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
