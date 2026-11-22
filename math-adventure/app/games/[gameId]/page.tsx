import { notFound } from "next/navigation";
import { chapters } from "@/data/chapters";
import GamePlayer from "@/components/GamePlayer";

interface GamePageProps {
  params: Promise<{
    gameId: string;
  }>;
}

export function generateStaticParams() {
  return chapters.flatMap((chapter) =>
    chapter.games.map((game) => ({
      gameId: game.id,
    })),
  );
}

export default async function GamePage({ params }: GamePageProps) {
  const { gameId } = await params;

  const chapter = chapters.find((item) =>
    item.games.some((game) => game.id === gameId),
  );

  const game = chapter?.games.find((item) => item.id === gameId);

  if (!chapter || !game) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <GamePlayer
        gameId={game.id}
        gameTitle={game.title}
        chapterId={chapter.id}
      />
    </main>
  );
}
