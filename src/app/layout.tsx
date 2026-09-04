import type { Metadata } from "next";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { BackgroundCanvas } from "@/components/background/BackgroundCanvas";
import "./globals.css";

export const metadata: Metadata = {
  title: "ALEX — Digital Designer & Developer",
  description: "Crafting digital experiences at the intersection of design and technology. Portfolio featuring creative engineering, typography, and motion design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col relative">
        <BackgroundCanvas />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}