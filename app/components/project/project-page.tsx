import type { ThemeName } from "../../lib/projects";

/**
 * Root of a project page. Setting `theme` switches every semantic colour
 * utility inside (bg-background, text-primary, …) to that project's palette.
 */
export default function ProjectPage({
  theme,
  decoration,
  children,
}: {
  theme?: ThemeName;
  /** Full-width backdrop rendered behind the content, e.g. a gradient. */
  decoration?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div data-theme={theme} className="relative min-h-page bg-background text-foreground">
      {decoration}
      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {children}
      </div>
    </div>
  );
}
