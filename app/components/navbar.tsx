"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "../lib/cn";
import { PROJECTS } from "../lib/projects";
import { useWire } from "./wire-context";

/** The socket under each tab that the home-page wire plugs into. */
function NavbarJack({ slug, active }: { slug: string; active: boolean }) {
  const { registerJack, pluggedSlug, hoveredSlug, onPlugPointerDown } =
    useWire();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerJack(slug, ref.current);
    return () => registerJack(slug, null);
  }, [slug, registerJack]);

  const isPlugged = active && pluggedSlug === slug;
  const isHovered = active && hoveredSlug === slug;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPlugged) return;
    e.preventDefault();
    e.stopPropagation();
    onPlugPointerDown(e.nativeEvent);
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      onPointerDown={handlePointerDown}
      className={cn(
        "absolute -bottom-[9px] left-1/2 z-20 h-4 w-4 -translate-x-1/2 rounded-full border-2 transition-all duration-150",
        active ? "visible" : "invisible pointer-events-none",
        isPlugged
          ? "cursor-grab touch-none border-crt-amber bg-[#100c00] shadow-[0_0_6px] shadow-crt-amber/50"
          : isHovered
            ? "scale-120 border-[#888] bg-[#2a2a2a]"
            : "border-[#333] bg-[#111]",
      )}
    />
  );
}

function BackArrow() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      <path
        d="M21 8H3M3 8L8 3M3 8L8 13"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="1" y1="2" x2="1" y2="14" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <div className="flex h-nav">
        {PROJECTS.map((project) => {
          const tab = cn(
            "relative flex flex-1 items-center justify-center transition-all duration-200 hover:brightness-110",
            project.navColor,
          );

          if (pathname === project.href) {
            return (
              <button
                key={project.slug}
                type="button"
                onClick={() => router.push("/")}
                aria-label="Back to home"
                title="Back to home"
                className={cn(tab, "cursor-pointer shadow-inner ring-2 ring-white ring-inset")}
              >
                <BackArrow />
              </button>
            );
          }

          return (
            <Link
              key={project.slug}
              href={project.href}
              aria-label={project.label}
              className={tab}
            >
              {project.icon ? (
                <div className="relative h-full w-full">
                  <Image
                    src={project.icon.src}
                    alt=""
                    fill
                    className={cn("object-contain", project.icon.className)}
                  />
                </div>
              ) : (
                <span className="text-xl sm:text-2xl">{project.emoji}</span>
              )}

              <NavbarJack slug={project.slug} active={isHome} />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
