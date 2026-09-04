import type { Metadata } from "next";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { BackgroundCanvas } from "@/components/background/BackgroundCanvas";
import { CursorTrail } from "@/components/background/CursorTrail";
import { DotMatrixShader } from "@/components/background/DotMatrixShader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fauzya Shubhi Nalendrasidi — Software Developer & Backend Specialist",
  description: "Portfolio of Fauzya Shubhi Nalendrasidi (Nalendr). Final-year Informatics student with experience in software development, backend systems, RESTful APIs, and system integration.",
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