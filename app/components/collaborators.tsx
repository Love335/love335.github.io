import Image from 'next/image';

interface Collaborator {
  name: string;
  image: string;
}

export default function Collaborators({
  title = "Collaborators",
  collaborators,
}: {
  title?: string;
  collaborators: Collaborator[];
}) {
  return (
    <div className="space-y-4">
      <p className="text-sm uppercase tracking-widest text-muted font-medium">
        {title}
      </p>
      <div className="flex flex-wrap gap-6">
        {collaborators.map((person, index) => (
          <div key={index} className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-border group-hover:border-accent transition-colors">
              <Image
                src={person.image}
                alt={person.name}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="font-medium text-foreground">{person.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}