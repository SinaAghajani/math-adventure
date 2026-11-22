import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Compass,
  Crown,
  Gamepad2,
  LockKeyhole,
  Map,
  Sparkles,
  Target,
} from "lucide-react";

import { chapters, getChapterById } from "@/data/chapters";
import GameCard from "@/components/GameCard";

interface ChapterPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return chapters.map((chapter) => ({
    id: String(chapter.id),
  }));
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { id } = await params;
  const chapterId = Number(id);

  if (!Number.isInteger(chapterId)) {
    notFound();
  }

  const chapter = getChapterById(chapterId);

  if (!chapter) {
    notFound();
  }

  const isLocked = chapter.status === "locked";

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(120deg, ${chapter.color}, ${chapter.color}CC)`,
        }}
      >
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-8 md:py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/25"
          >
            <ArrowRight size={17} />
            بازگشت به نقشه اصلی
          </Link>

          <div className="mt-10 grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="text-white">
              <div className="mb-4 flex items-center gap-2 text-sm font-bold text-white/80">
                <Compass size={18} />
                سرزمین شماره {chapter.id}
              </div>

              <h1 className="text-3xl font-black leading-relaxed md:text-5xl">
                {chapter.title}
              </h1>

              <p className="mt-2 text-lg font-bold text-white/80">
                {chapter.subtitle}
              </p>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-white/90 md:text-base">
                {chapter.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-3 text-sm font-bold text-white">
                  <Gamepad2 size={18} />
                  {chapter.games.length} مأموریت
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-white/15 px-4 py-3 text-sm font-bold text-white">
                  <Target size={18} />
                  پیشرفت: {chapter.progress}٪
                </div>
              </div>
            </div>

            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-[2.5rem] border border-white/20 bg-white/15 text-8xl shadow-2xl backdrop-blur-sm md:h-56 md:w-56 md:text-9xl">
              {chapter.icon}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5">
        {isLocked ? (
          <section className="mx-auto mt-12 max-w-xl rounded-3xl border border-amber-200 bg-amber-50 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
              <LockKeyhole size={30} />
            </div>

            <h2 className="mt-5 text-2xl font-black text-slate-800">
              این سرزمین هنوز باز نشده!
            </h2>

            <p className="mt-3 text-sm leading-8 text-slate-600">
              ماجراجوی عزیز، این سرزمین در حال آماده‌سازی است. به‌زودی می‌توانی
              مأموریت‌های جدید آن را تجربه کنی.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 font-bold text-white transition hover:bg-amber-600"
            >
              بازگشت به نقشه
              <ArrowRight size={17} />
            </Link>
          </section>
        ) : (
          <>
            <section className="mt-10 grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Map size={23} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    مقصد ماجراجویی
                  </p>
                  <p className="mt-1 font-black text-slate-800">
                    سرزمین {chapter.id}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Gamepad2 size={23} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400">
                    تعداد مأموریت‌ها
                  </p>
                  <p className="mt-1 font-black text-slate-800">
                    {chapter.games.length} مأموریت
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Crown size={23} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400">هدف نهایی</p>
                  <p className="mt-1 font-black text-slate-800">
                    فتح سرزمین اعداد
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-12">
              <div className="mb-7">
                <div className="mb-3 flex items-center gap-2 text-indigo-600">
                  <Sparkles size={20} />
                  <span className="text-sm font-black">نقشه مأموریت‌ها</span>
                </div>

                <h2 className="text-2xl font-black text-slate-800">
                  آماده شروع مأموریت هستی؟
                </h2>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  هر مأموریت را با دقت انجام بده و برای فتح این سرزمین به مرحله
                  نهایی برس.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {chapter.games.map((game, index) => (
                  <GameCard key={game.id} game={game} index={index} />
                ))}
              </div>
            </section>

            <section className="mt-12 rounded-3xl bg-linear-to-l from-indigo-700 to-violet-700 p-7 text-white md:p-9">
              <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-amber-300">
                    <Crown size={20} />
                    <span className="text-sm font-black">مأموریت نهایی</span>
                  </div>

                  <h3 className="text-xl font-black md:text-2xl">
                    آیا آماده‌ای نگهبان اعداد را شکست بدهی؟
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-indigo-100">
                    همه مهارت‌هایت را به کار بگیر و برای فتح سرزمین آماده شو!
                  </p>
                </div>

                <div className="text-6xl">🐉</div>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
