import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import ScrollIndicator from "./components/scroll-indicator";
import { WireProvider } from "./components/wire-context";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Systems & Full-Stack Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} antialiased`}>
      <body className="bg-background text-foreground font-sans min-h-screen">
        {/*
          WireProvider must wrap both Navbar and children so they share
          the same pluggedLabel / hoveredLabel / jack-registration state.
          It is a client component but layout.tsx itself stays a server component —
          Next.js handles this correctly.
        */}
        <WireProvider>
          <Navbar />
          <main className="pt-12">
            {children}
            <ScrollIndicator />
          </main>
        </WireProvider>
      </body>
    </html>
  );
}
