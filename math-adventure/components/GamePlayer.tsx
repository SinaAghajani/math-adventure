"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Maximize2,
  Trophy,
  Star,
  CheckCircle2,
} from "lucide-react";

const STORAGE_KEY = "math-adventure-progress";

interface GamePlayerProps {
  gameId: string;
  gameTitle: string;
  chapterId: number;
}

interface GameResult {
  type: "GAME_COMPLETED";
  gameId: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  completed: boolean;
}

interface StoredGameResult {
  bestScore: number;
  correctCount: number;
  totalQuestions: number;
  completed: boolean;
  attempts: number;
  lastPlayed: string;
}

interface ProgressData {
  games: Record<string, StoredGameResult>;
  totalScore: number;
  completedMissions: number;
  updatedAt: string;
}

function readProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {
        games: {},
        totalScore: 0,
        completedMissions: 0,
        updatedAt: new Date().toISOString(),
      };
    }

    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed.games !== "object") {
      throw new Error("Invalid progress data");
    }

    return parsed as ProgressData;
  } catch {
    return {
      games: {},
      totalScore: 0,
      completedMissions: 0,
      updatedAt: new Date().toISOString(),
    };
  }
}

function saveGameResult(result: GameResult) {
  const progress = readProgress();
  const previous = progress.games[result.gameId];

  progress.games[result.gameId] = {
    bestScore: Math.max(previous?.bestScore ?? 0, result.score),
    correctCount: Math.max(previous?.correctCount ?? 0, result.correctCount),
    totalQuestions: result.totalQuestions,
    completed: Boolean(previous?.completed || result.completed),
    attempts: (previous?.attempts ?? 0) + 1,
    lastPlayed: new Date().toISOString(),
  };

  progress.totalScore = Object.values(progress.games).reduce(
    (sum, game) => sum + game.bestScore,
    0,
  );

  progress.completedMissions = Object.values(progress.games).filter(
    (game) => game.completed,
  ).length;

  progress.updatedAt = new Date().toISOString();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));

  return progress.games[result.gameId];
}

export default function GamePlayer({
  gameId,
  gameTitle,
  chapterId,
}: GamePlayerProps) {
  const router = useRouter();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [result, setResult] = useState<StoredGameResult | null>(null);

  const gameUrl = `/games/${gameId}/index.html`;

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;

      if (event.source !== iframeRef.current?.contentWindow) return;

      const data = event.data;

      if (!data || typeof data !== "object") return;

      if (data.gameId !== gameId) return;

      if (data.type === "GAME_COMPLETED") {
        const validScore =
          Number.isFinite(data.score) &&
          data.score >= 0 &&
          data.score <= 100000;

        const validCounts =
          Number.isInteger(data.correctCount) &&
          Number.isInteger(data.totalQuestions) &&
          data.correctCount >= 0 &&
          data.totalQuestions > 0 &&
          data.correctCount <= data.totalQuestions;

        if (!validScore || !validCounts) return;

        const savedResult = saveGameResult({
          type: "GAME_COMPLETED",
          gameId,
          score: data.score,
          correctCount: data.correctCount,
          totalQuestions: data.totalQuestions,
          completed: data.completed === true,
        });

        setResult(savedResult);
      }

      if (data.type === "GAME_EXIT") {
        router.push(`/chapters/${chapterId}`);
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [gameId, chapterId, router]);

  async function toggleFullscreen() {
    const iframe = iframeRef.current;

    if (!iframe) return;

    try {
      if (!document.fullscreenElement) {
        await iframe.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen(false);
    }
  }

  useEffect(() => {
    function handleFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  function goBack() {
    router.push(`/chapters/${chapterId}`);
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-3 py-4 sm:px-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <button
            type="button"
            onClick={goBack}
            className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-indigo-600"
          >
            <ArrowRight size={17} />
            بازگشت به فصل {chapterId}
          </button>

          <h1 className="text-lg font-black text-slate-800 sm:text-xl">
            🏭 {gameTitle}
          </h1>
        </div>

        <button
          type="button"
          onClick={toggleFullscreen}
          className="flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-100"
        >
          <Maximize2 size={17} />
          {isFullscreen ? "خروج از تمام‌صفحه" : "تمام‌صفحه"}
        </button>
      </header>

      {result && (
        <section className="mb-4 grid gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <Trophy className="text-amber-500" size={23} />
            <div>
              <p className="text-xs font-bold text-slate-500">
                بهترین امتیاز این بازی
              </p>
              <strong className="text-lg text-slate-800">
                {result.bestScore.toLocaleString("fa-IR")}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-emerald-600" size={23} />
            <div>
              <p className="text-xs font-bold text-slate-500">پاسخ‌های درست</p>
              <strong className="text-lg text-slate-800">
                {result.correctCount.toLocaleString("fa-IR")} از{" "}
                {result.totalQuestions.toLocaleString("fa-IR")}
              </strong>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Star className="text-amber-500" size={23} />
            <div>
              <p className="text-xs font-bold text-slate-500">
                تعداد دفعات بازی
              </p>
              <strong className="text-lg text-slate-800">
                {result.attempts.toLocaleString("fa-IR")}
              </strong>
            </div>
          </div>
        </section>
      )}

      <section className="relative min-h-150 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <iframe
          ref={iframeRef}
          src={gameUrl}
          title={gameTitle}
          className="absolute inset-0 h-full min-h-150 w-full border-0"
          allow="fullscreen"
          sandbox="allow-scripts allow-same-origin"
        />
      </section>

      <p className="mt-3 text-center text-xs text-slate-400">
        🧭 ماجراجویان ریاضی | بازی کن، یاد بگیر و امتیاز بگیر!
      </p>
    </div>
  );
}
