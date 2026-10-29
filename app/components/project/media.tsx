import Image from "next/image";

export function Video({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="h-auto w-full object-contain"
    />
  );
}

export function Screenshot({
  src,
  alt,
  portrait = false,
}: {
  src: string;
  alt: string;
  /** Phone screenshots are taller than they are wide. */
  portrait?: boolean;
}) {
  const [width, height] = portrait ? [800, 1200] : [1200, 800];
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className="h-auto w-full object-contain"
    />
  );
}
