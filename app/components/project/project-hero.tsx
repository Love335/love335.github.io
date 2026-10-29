import { cn } from "../../lib/cn";
import type { Collaborator } from "../../lib/collaborators";
import Collaborators from "../collaborators";
import MediaFrame from "./media-frame";

export default function ProjectHero({
  title,
  tagline,
  collaborators,
  media,
  layout = "wide",
  children,
}: {
  title: string;
  tagline: string;
  collaborators?: Collaborator[];
  media: React.ReactNode;
  /** `wide` puts a large media frame beside the text; `compact` a phone-sized one. */
  layout?: "wide" | "compact";
  /** Short description shown under the collaborators. */
  children: React.ReactNode;
}) {
  const compact = layout === "compact";

  const text = (
    <div className={cn("space-y-6 md:space-y-8", compact && "text-center md:text-left")}>
      <div className="space-y-4">
        <h1 className="text-5xl font-bold leading-none tracking-tighter text-primary sm:text-6xl">
          {title}
        </h1>
        <p className="text-xl text-muted sm:text-2xl">{tagline}</p>
      </div>

      {collaborators && (
        <Collaborators
          collaborators={collaborators}
          className={cn(compact && "justify-center md:justify-start")}
        />
      )}

      <p className={cn("max-w-md text-muted", compact && "mx-auto md:mx-0")}>{children}</p>
    </div>
  );

  if (compact) {
    return (
      <section className="mb-16 flex justify-center md:mb-20">
        <div className="grid w-full max-w-2xl items-center gap-6 md:grid-cols-2 md:gap-4">
          <div className="flex justify-center md:justify-start">
            <MediaFrame size="lg" className="max-w-[220px]">
              {media}
            </MediaFrame>
          </div>
          {text}
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16 grid items-center gap-10 md:mb-20 md:grid-cols-2 md:gap-12">
      {text}
      <div className="flex justify-center md:justify-end">
        <MediaFrame size="lg" className="max-w-lg">
          {media}
        </MediaFrame>
      </div>
    </section>
  );
}
