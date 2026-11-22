import { Heart, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-4 py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="text-center sm:text-right">
          <h3 className="text-lg font-black text-white">🚀 ماجراجویان ریاضی</h3>
          <p className="mt-1 text-sm text-slate-400">
            یاد بگیر، بازی کن، قهرمان شو!
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 text-sm text-slate-400">
          <p className="flex items-center gap-2">
            طراحی و توسعه با
            <Heart size={15} className="fill-rose-500 text-rose-500" />
            توسط
            <span className="font-extrabold text-indigo-300">سینا آقاجانی</span>
          </p>

          <p className="flex items-center gap-2 text-xs">
            <Code2 size={14} />
            طراحی آموزشی و توسعه نرم‌افزار
          </p>
        </div>

        <a
          href="https://github.com/SinaAghajani"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-indigo-400 hover:bg-indigo-500/10 hover:text-white"
        ></a>
      </div>

      <div className="mx-auto mt-7 max-w-7xl border-t border-white/10 pt-5 text-center text-xs text-slate-500">
        © ۲۰۲۶ تمامی حقوق این پروژه محفوظ است.{" "}
      </div>
    </footer>
  );
}
