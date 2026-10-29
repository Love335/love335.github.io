import { cn } from "../lib/cn";

export default function Card({
  lift = false,
  className,
  children,
}: {
  /** Raise the card slightly on hover. */
  lift?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border bg-surface shadow-xl",
        lift && "transition-all hover:-translate-y-1 hover:shadow-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
