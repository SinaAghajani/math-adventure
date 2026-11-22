"use client";

import Link from "next/link";
import { ArrowLeft, Play, Star, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-indigo-700 to-violet-800">
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-violet-400/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
        <div className="text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-indigo-100">
            <Sparkles size={16} />
            یادگیری ریاضی با بازی و ماجراجویی
          </div>

          <h2 className="max-w-xl text-4xl leading-normal font-black md:text-5xl">
            قهرمان دنیای
            <span className="block text-amber-300">ماجراجویی ریاضی</span>
            باش!
          </h2>

          <p className="mt-6 max-w-lg text-base leading-9 text-indigo-100 md:text-lg">
            آماده‌ای؟ هفت سرزمین شگفت‌انگیز منتظر تو هستند. مأموریت‌ها را انجام
            بده، معماها را حل کن، امتیاز بگیر و به یک قهرمان ریاضی تبدیل شو!
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="#adventure-map"
              className="inline-flex items-center gap-3 rounded-2xl bg-amber-400 px-7 py-4 font-black text-indigo-950 shadow-xl shadow-indigo-950/20 transition hover:-translate-y-1 hover:bg-amber-300"
            >
              <Play size={20} fill="currentColor" />
              شروع ماجراجویی
              <ArrowLeft size={18} />
            </Link>

            <div className="flex items-center gap-2 text-sm font-bold text-indigo-100">
              <Star size={19} className="fill-amber-300 text-amber-300" />
              <span>۷ سرزمین هیجان‌انگیز</span>
            </div>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center">
          <div className="absolute h-72 w-72 rounded-full border border-dashed border-white/30 md:h-96 md:w-96" />
          <div className="absolute h-60 w-60 rounded-full border border-white/10 md:h-80 md:w-80" />

          <div className="relative flex h-64 w-64 items-center justify-center rounded-[3rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md md:h-80 md:w-80">
            <div className="absolute -top-7 -right-5 rotate-12 rounded-2xl bg-amber-400 p-4 text-4xl shadow-xl">
              ⭐
            </div>

            <div className="absolute -bottom-5 -left-5 -rotate-12 rounded-2xl bg-emerald-400 p-4 text-4xl shadow-xl">
              💎
            </div>

            <div className="text-center">
              <div className="animate-bounce text-8xl md:text-9xl">🧙🏻‍♂️</div>
              <div className="mt-4 rounded-full bg-white/15 px-5 py-2 text-sm font-black text-white">
                قهرمان ریاضی!
              </div>
            </div>
          </div>

          <div className="absolute top-10 left-0 -rotate-12 text-4xl">
            ✨
          </div>
          <div className="absolute right-0 bottom-10 rotate-12 text-4xl">
            🪄
          </div>
        </div>
      </div>
    </section>
  );
}
