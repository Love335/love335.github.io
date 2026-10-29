import Link from "next/link";
import CorkboardGallery from "./components/corkboard-gallery";
import Crt from "./components/crt";

export default function Home() {
  return (
    <div className="flex min-h-page flex-col overflow-hidden bg-background">
      <section className="flex flex-1 items-center justify-center px-4 py-10 sm:px-10 md:py-[clamp(48px,8vh,280px)] lg:px-[clamp(40px,8vw,350px)]">
        <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[3fr_2fr] lg:gap-0">
          <div className="flex items-center justify-center">
            <Crt />
          </div>

          <div className="flex flex-col items-center gap-7 text-center lg:items-start lg:pl-10 lg:text-left">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">
              Love Skön / 2026
            </p>

            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-primary sm:text-5xl lg:text-[clamp(2.4rem,3.2vw,4rem)]">
              Welcome to
              <br />
              my portfolio.
            </h1>

            <div className="h-0.5 w-12 rounded-[1px] bg-accent" />

            <p className="font-heading text-lg font-medium tracking-[-0.01em] text-muted lg:text-[clamp(1rem,1.3vw,1.2rem)]">
              Current project:{" "}
              <Link
                href="/saaf"
                className="border-b-[1.5px] border-surface-elevated pb-px text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                SAAF
              </Link>
            </p>

            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-subtle">
              ↑ plug in the wire to explore
            </p>
          </div>
        </div>
      </section>

      <CorkboardGallery />

      <p className="pb-8 text-center font-mono text-xs tracking-widest text-subtle">
        BUILT WITH NEXT.JS • TAILWIND • REACT • TYPESCRIPT
      </p>
    </div>
  );
}
