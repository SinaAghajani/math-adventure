import type { Metadata } from "next";

import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/800.css";
import "@fontsource/vazirmatn/900.css";

import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ماجراجویان ریاضی | Math Adventure",
  description:
    "یک ماجراجویی هیجان‌انگیز در دنیای ریاضی پایه پنجم دبستان؛ یادگیری با بازی، مأموریت و چالش.",
  applicationName: "Math Adventure",
  keywords: [
    "بازی ریاضی",
    "ریاضی پنجم",
    "آموزش ریاضی",
    "بازی آموزشی",
    "ماجراجویان ریاضی",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className="min-h-screen bg-slate-50 font-sans antialiased">
        {children}
        <Footer />
      </body>
    </html>
  );
}
