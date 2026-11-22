import Link from "next/link";
import { ArrowLeft, Clock3, LockKeyhole, Play, Star } from "lucide-react";
import type { Game } from "@/data/chapters";

interface GameCardProps {
  game: Game;
  index: number;
  locked?: boolean;
}

export default function GameCard({
  game,
  index,
  locked = false,
}: GameCardProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-3xl border bg-white p-5 transition-all duration-300 ${
        locked
          ? "border-slate-100 opacity-60"
          : "border-indigo-100 shadow-sm hover:-translate-y-1 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-100/60"
      }`}
    >
      <div className="absolute right-0 top-0 h-1 w-full bg-linear-to-l from-indigo-500 to-violet-400" />

      <div className="flex items-start justify-between">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-4xl">
          {game.icon}
        </div>

        <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-black text-indigo-600">
          مأموریت {index + 1}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-black text-slate-800">{game.title}</h3>

      <p className="mt-2 min-h-14 text-sm leading-7 text-slate-500">
        {game.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500">
        <span className="flex items-center gap-1.5">
          <Clock3 size={15} />
          {game.duration} دقیقه
        </span>

        <span className="flex items-center gap-1.5">
          <Star size={15} className="text-amber-500" />
          {game.difficulty}
        </span>
      </div>

      <div className="mt-5 border-t border-slate-100 pt-4">
        {locked ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-400">
            <LockKeyhole size={17} />
            این مأموریت هنوز باز نشده است
          </div>
        ) : (
          <Link
            href={`/games/${game.id}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-black text-white transition hover:bg-indigo-700"
          >
            <Play size={17} fill="currentColor" />
            شروع مأموریت
            <ArrowLeft size={16} />
          </Link>
        )}
      </div>
    </article>
  );
}
