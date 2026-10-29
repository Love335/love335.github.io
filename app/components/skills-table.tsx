import { cn } from "../lib/cn";

export interface Skill {
  category: string;
  items: string;
}

const cell = "px-4 py-4 sm:px-8 sm:py-6";

export default function SkillsTable({ skills }: { skills: Skill[] }) {
  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-panel sm:rounded-3xl">
      <table className="w-full text-sm sm:text-base">
        <thead>
          <tr className="border-b border-panel-border">
            {["Category", "Technologies"].map((heading) => (
              <th
                key={heading}
                className="px-4 py-4 text-left text-xs font-medium uppercase tracking-widest text-panel-muted sm:px-8 sm:py-5 sm:text-sm"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-panel-border">
          {skills.map((row) => (
            <tr key={row.category} className="transition-colors hover:bg-panel-hover">
              <td className={cn(cell, "font-medium text-panel-foreground sm:whitespace-nowrap")}>
                {row.category}
              </td>
              <td className={cn(cell, "text-panel-muted")}>{row.items}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
