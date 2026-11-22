import { Compass, MapPinned } from "lucide-react";
import { chapters } from "@/data/chapters";
import ChapterCard from "./ChapterCard";

export default function AdventureMap() {
  return (
    <section
      id="adventure-map"
      className="mx-auto max-w-7xl scroll-mt-24 px-5 py-12"
    >
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 flex items-center gap-2 text-indigo-600">
            <Compass size={21} />
            <span className="text-sm font-black">نقشه گنج ماجراجویی</span>
          </div>

          <h2 className="text-2xl font-black text-slate-800 md:text-3xl">
            هفت سرزمین در انتظار توست!
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            هر فصل یک سرزمین تازه است. مأموریت‌ها را پشت سر بگذار، مهارت‌های
            ریاضی خودت را تقویت کن و به سرزمین‌های بعدی برس.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start rounded-xl bg-indigo-50 px-4 py-3 text-sm font-bold text-indigo-600 sm:self-auto">
          <MapPinned size={18} />۷ سرزمین ماجراجویی
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </section>
  );
}
