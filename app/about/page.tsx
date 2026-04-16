import Image from 'next/image';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <div className="inline-block text-8xl mb-6">👤</div>

        <h1 className="text-5xl font-semibold mb-4">
          About Me
        </h1>

        <p className="text-xl text-muted">
          Systems & Full-Stack Developer
        </p>
      </div>

      <div className="max-w-none text-lg leading-relaxed space-y-6">
        <p>It's me!</p>

        <h2 className="text-2xl font-semibold mt-12">Skills</h2>

        <ul className="grid grid-cols-2 gap-4 text-muted">
          <li>Java</li>
          <li>Next.js & TypeScript</li>
          <li>Tailwind CSS</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-12">My Story</h2>

        <p>It's been tough...</p>
      </div>
    </div>
  );
}