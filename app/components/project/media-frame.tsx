import { cn } from "../../lib/cn";

const SIZES = {
  md: "rounded-2xl p-2 shadow-xl *:rounded-xl",
  lg: "rounded-3xl p-3 shadow-2xl *:rounded-2xl",
};

/** The card that frames a screenshot or video. */
export default function MediaFrame({
  size = "md",
  className,
  children,
}: {
  size?: keyof typeof SIZES;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden border border-border bg-surface",
        SIZES[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
