import Image from "next/image";
import Link from "next/link";
import { cn } from "../lib/cn";
import type { Collaborator } from "../lib/collaborators";

export default function Collaborators({
  title = "Collaborators:",
  collaborators,
  className,
}: {
  title?: string;
  collaborators: Collaborator[];
  /** Extra classes for the row of people, e.g. to centre it. */
  className?: string;
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm font-medium uppercase tracking-widest text-muted">
        {title}
      </p>
      <div className={cn("flex flex-wrap gap-x-6 gap-y-4", className)}>
        {collaborators.map((person) => (
          <div key={person.name} className="group flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-border transition-colors group-hover:border-accent">
              <Image
                src={person.image}
                alt={person.name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            {person.link ? (
              <Link
                href={person.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary hover:underline"
              >
                {person.name}
              </Link>
            ) : (
              <p className="font-medium text-primary">{person.name}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
