"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "../lib/cn";
import styles from "./corkboard-gallery.module.css";

interface Photo {
  src: string;
  label: string;
}

const PHOTOS: Photo[] = [
  { src: "/code/code_semaphore.png", label: "my first semaphore <3" },
  { src: "/code/code_threads.png", label: "fighting with TarsosDSP" },
  { src: "/code/code_slider.png", label: "nightmare UI component >:(" },
  { src: "/code/code_api.png", label: "gratuitous APIs" },
  { src: "/code/code_python.png", label: "random python code" },
  { src: "/code/code_api_service.png", label: "sophisticated APIs ;)" },
  { src: "/code/code_tests.png", label: "2 out of a trillion tests" },
  { src: "/code/code_ui.png", label: "it is hard to make UI code interesting" },
];

const PIN_COLORS = ["#e03535", "#3068d6", "#22a559", "#e09535", "#9b35d1", "#35b8c8"];

const ROTATIONS = [-5.2, 3.8, -2.1, 6.4, -4.7, 2.3, -6.9, 4.1];

export default function CorkboardGallery() {
  const [selected, setSelected] = useState<Photo | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <>
      <div
        className={cn(
          styles.cork,
          "m-4 px-6 pb-12 pt-10 sm:m-[clamp(40px,6vw,100px)] sm:px-[clamp(40px,6vw,100px)] sm:pb-14",
        )}
      >
        <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {PHOTOS.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setSelected(photo)}
              aria-label={`View ${photo.label}`}
              className={cn(styles.item, "relative flex cursor-pointer flex-col items-center")}
              style={{ rotate: `${ROTATIONS[i] ?? 0}deg` }}
            >
              <div className="absolute -top-2.5 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center">
                <div
                  className={cn(styles.pinHead, "h-[15px] w-[15px] rounded-full")}
                  style={{ background: PIN_COLORS[i % PIN_COLORS.length] }}
                />
                <div className={cn(styles.pinNeedle, "h-[9px] w-0.5 rounded-b-[1px]")} />
              </div>

              <div className={cn(styles.polaroid, "w-full rounded-[2px] px-2 pt-2")}>
                <div className={cn(styles.photo, "relative aspect-[8/7] w-full overflow-hidden rounded-[1px]")}>
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 260px"
                    className="select-none object-cover"
                    draggable={false}
                  />
                </div>
                <div className="px-1 pb-4 pt-2.5 text-center">
                  <span className={cn(styles.caption, "font-hand text-base font-semibold tracking-[0.02em]")}>
                    {photo.label}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-6"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.label}
        >
          <div className="flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <div className={cn(styles.polaroid, "w-[min(520px,90vw)] rounded-[2px] px-3.5 pt-3.5")}>
              <div className={cn(styles.photo, "relative aspect-[8/7] w-full overflow-hidden rounded-[1px]")}>
                <Image src={selected.src} alt={selected.label} fill sizes="520px" className="object-contain" />
              </div>
              <div className="px-2 pb-6 pt-4 text-center">
                <span className={cn(styles.caption, "font-hand text-2xl font-semibold tracking-[0.02em]")}>
                  {selected.label}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelected(null)}
              className="mt-5 cursor-pointer rounded-full border-[1.5px] border-white/35 px-6 py-1.5 font-hand text-[17px] font-semibold tracking-[0.04em] text-white"
            >
              close ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
