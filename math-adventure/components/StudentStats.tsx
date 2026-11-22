"use client";

import { useEffect, useState } from "react";
import { Star, Trophy, Target, Flame, Sparkles } from "lucide-react";

const STORAGE_KEY = "math-adventure-progress";

interface ProgressData {
  games: Record<
    string,
    {
      bestScore: number;
      completed: boolean;
    }
  >;
  totalScore: number;
  completedMissions: number;
}

interface StatItemProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  background: string;
}

function StatItem({
  title,
  value,
  description,
  icon,
  color,
  background,
}: StatItemProps) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        style={{ color, backgroundColor: background }}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-bold text-slate-400">{title}</p>
        <p className="mt-1 text-xl font-black text-slate-800">{value}</p>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>
    </div>
  );
}

const initialProgress: ProgressData = {
  games: {},
  totalScore: 0,
  completedMissions: 0,
};

export default function StudentStats() {
  const [progress, setProgress] = useState<ProgressData>(initialProgress);

  useEffect(() => {
    function loadProgress() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) {
          setProgress(initialProgress);
          return;
        }

        const parsed = JSON.parse(saved);

        if (!parsed || typeof parsed.games !== "object") {
          setProgress(initialProgress);
          return;
        }

        setProgress({
          ...initialProgress,
          ...parsed,
        });
      } catch {
        setProgress(initialProgress);
      }
    }

    loadProgress();

    window.addEventListener("storage", loadProgress);
    window.addEventListener("focus", loadProgress);

    return () => {
      window.removeEventListener("storage", loadProgress);
      window.removeEventListener("focus", loadProgress);
    };
  }, []);

  const completedGames = Object.values(progress.games).filter(
    (game) => game.completed,
  ).length;

  const stats = [
    {
      title: "امتیازهای من",
      value: progress.totalScore.toLocaleString("fa-IR"),
      description: "مجموع بهترین امتیاز بازی‌ها",
      icon: <Star size={23} />,
      color: "#D97706",
      background: "#FEF3C7",
    },
    {
      title: "بازی‌های تکمیل‌شده",
      value: completedGames.toLocaleString("fa-IR"),
      description: "بازی‌های با موفقیت به پایان رسیده",
      icon: <Trophy size={23} />,
      color: "#7C3AED",
      background: "#EDE9FE",
    },
    {
      title: "مأموریت‌ها",
      value: `${progress.completedMissions.toLocaleString("fa-IR")} از ۲۹`,
      description: "مأموریت‌های تکمیل‌شده",
      icon: <Target size={23} />,
      color: "#059669",
      background: "#D1FAE5",
    },
    {
      title: "سطح من",
      value: progress.totalScore >= 500 ? "۲" : "۱",
      description:
        progress.totalScore >= 500 ? "ماجراجوی حرفه‌ای" : "ماجراجوی تازه‌کار",
      icon: <Flame size={23} />,
      color: "#EA580C",
      background: "#FFEDD5",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
          <Sparkles size={21} />
        </div>

        <div>
          <h2 className="text-xl font-black text-slate-800">
            وضعیت ماجراجویی من
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            پیشرفت خودت را در دنیای ریاضی دنبال کن.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatItem key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  );
}
