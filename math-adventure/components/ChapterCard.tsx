import Link from "next/link";
import { Lock, ArrowLeft, CheckCircle2, Gamepad2 } from "lucide-react";
import type { Chapter } from "@/data/chapters";

interface ChapterCardProps {
  chapter: Chapter;
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
  const isLocked = chapter.status === "locked";

  return (
    <article
      className={`group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 ${
        isLocked
          ? "opacity-75"
          : "hover:-translate-y-2 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-100/70"
      }`}
    >
      <div
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ backgroundColor: chapter.color }}
      />

      <div className="flex items-start justify-between">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-2xl text-4xl"
          style={{ backgroundColor: chapter.background }}
        >
          {chapter.icon}
        </div>

        {isLocked ? (
          <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">
            <Lock size={13} />
            به‌زودی
          </div>
        ) : (
          <div className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
            <span className="flex items-center gap-1">
              <CheckCircle2 size={13} />
              قابل دسترس
            </span>
          </div>
        )}
      </div>

      <div className="mt-5">
        <p className="text-xs font-bold" style={{ color: chapter.color }}>
          سرزمین {chapter.id}
        </p>

        <h3 className="mt-2 text-xl font-black text-slate-800">
          {chapter.title}
        </h3>

        <p className="mt-1 text-sm font-bold text-slate-400">
          {chapter.subtitle}
        </p>

        <p className="mt-4 min-h-14 text-sm leading-7 text-slate-500">
          {chapter.description}
        </p>
      </div>

      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-500">پیشرفت مأموریت‌ها</span>
          <span className="font-black text-slate-700">{chapter.progress}٪</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${chapter.progress}%`,
              backgroundColor: chapter.color,
            }}
          />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
          <Gamepad2 size={17} />
          {chapter.games.length} مأموریت
        </div>

        {isLocked ? (
          <span className="text-sm font-bold text-slate-400">
            در انتظار باز شدن
          </span>
        ) : (
          <Link
            href={`/chapters/${chapter.id}`}
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-black transition hover:bg-indigo-50"
            style={{ color: chapter.color }}
          >
            ورود به سرزمین
            <ArrowLeft size={16} />
          </Link>
        )}
      </div>
    </article>
  );
}
