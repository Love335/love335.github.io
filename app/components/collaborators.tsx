'use client';

import Image from 'next/image';
import { useTheme } from '../theme-provider';

export default function Collaborators({
  title = "Collaborators",
  collaborators,
}: {
  title?: string;
  collaborators: { name: string; image: string }[];
}) {
  const theme = useTheme();

  return (
    <div className="space-y-4">
      <p className={`text-sm uppercase tracking-widest font-medium ${theme.collaborators.title}`}>
        {title}
      </p>

      <div className="flex flex-wrap gap-6">
        {collaborators.map((person, index) => (
          <div key={index} className="flex items-center gap-3 group">
            <div
              className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-colors ${theme.collaborators.border} ${theme.collaborators.borderHover}`}
            >
              <Image
                src={person.image}
                alt={person.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>

            {/* 👇 NAME = HEADING COLOR */}
            <p className={`font-medium ${theme.collaborators.name}`}>
              {person.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}