import { cn } from "../../lib/cn";
import MediaFrame from "./media-frame";

const WIDTHS = {
  xs: "max-w-[180px]",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
};

/** Heading and blurb for one feature. */
export function FeatureText({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto max-w-md text-center", className)}>
      <h2 className="mb-3 text-2xl font-semibold text-primary sm:text-3xl">{title}</h2>
      <p className="leading-relaxed text-muted">{children}</p>
    </div>
  );
}

/** One feature of a project: a framed screenshot or video plus its description. */
export default function Feature({
  title,
  media,
  layout = "media-top",
  mediaWidth = "lg",
  children,
}: {
  title: string;
  media: React.ReactNode;
  /** Where the media sits relative to the text. `side` stacks on narrow screens. */
  layout?: "media-top" | "media-bottom" | "side";
  mediaWidth?: keyof typeof WIDTHS;
  children: React.ReactNode;
}) {
  if (layout === "side") {
    return (
      <div className="mb-20 flex break-inside-avoid flex-col items-center gap-6 lg:flex-row">
        <div className={cn("w-full shrink-0 lg:w-[62%]", WIDTHS[mediaWidth])}>
          <MediaFrame>{media}</MediaFrame>
        </div>
        <FeatureText title={title} className="lg:mx-0 lg:text-left">
          {children}
        </FeatureText>
      </div>
    );
  }

  const frame = (
    <div className="flex justify-center">
      <MediaFrame className={WIDTHS[mediaWidth]}>{media}</MediaFrame>
    </div>
  );

  return (
    <div className="mb-20 break-inside-avoid">
      {layout === "media-top" && <div className="mb-6">{frame}</div>}
      <FeatureText title={title} className={cn(layout === "media-bottom" && "mb-6")}>
        {children}
      </FeatureText>
      {layout === "media-bottom" && frame}
    </div>
  );
}
