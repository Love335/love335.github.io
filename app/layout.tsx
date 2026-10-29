import type { Metadata } from "next";
import { Caveat, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/navbar";
import ScrollIndicator from "./components/scroll-indicator";
import { WireProvider } from "./components/wire-context";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const cabinet = localFont({
  src: "../public/fonts/cabinet/CabinetGrotesk-Variable.woff2",
  weight: "100 900",
  variable: "--font-cabinet",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
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
    <html
      lang="en"
      className={`${jakarta.variable} ${cabinet.variable} ${caveat.variable}`}
    >
      <body>
        <WireProvider>
          <Navbar />
          <main className="pt-nav">{children}</main>
          <ScrollIndicator />
        </WireProvider>
      </body>
    </html>
  );
}
