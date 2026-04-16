import Image from 'next/image';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <div className="inline-block text-8xl mb-6">👤</div>
        <h1 className="text-6xl font-bold mb-4">About Me</h1>
        <p className="text-2xl text-zinc-400">Systems & Full-Stack Developer</p>
      </div>

      <div className="prose prose-invert max-w-none text-lg leading-relaxed">
        <p>
          It's me!
        </p>

        <h2 className="text-3xl font-semibold mt-12">Skills</h2>
        <ul className="grid grid-cols-2 gap-4 text-zinc-300">
          <li>Java</li>
          <li>Next.js & TypeScript</li>
          <li>Tailwind CSS</li>
        </ul>

        <h2 className="text-3xl font-semibold mt-12">My Story</h2>
        <p>
          It's been tough...
        </p>
      </div>

      <div className="mt-16 flex justify-center">
        <div className="relative w-80 h-80 rounded-3xl overflow-hidden border border-zinc-700">
          <Image
            src="https://picsum.photos/id/64/800/800"
            alt="Me"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}