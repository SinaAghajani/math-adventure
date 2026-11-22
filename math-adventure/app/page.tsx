import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StudentStats from "@/components/StudentStats";
import AdventureMap from "@/components/AdventureMap";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50" dir="rtl">
      <Header />

      <Hero />

      <StudentStats />

      <AdventureMap />
    </main>
  );
}
