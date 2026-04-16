import Image from 'next/image';

export default function Beatnik() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="relative h-[420px] rounded-3xl overflow-hidden mb-12">
        <Image
          src="https://picsum.photos/id/1015/1200/600"
          alt="Beatnik"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 flex items-end p-10">
          <div>
            <span className="text-6xl">🚀</span>
            <h1 className="text-6xl font-bold text-white mt-3">Beatnik</h1>
          </div>
        </div>
      </div>

      <div className="prose prose-invert max-w-none mb-16 text-lg">
        <p>Music and stuff.</p>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-semibold mb-6">Demo Video</h2>
        <div className="aspect-video rounded-3xl overflow-hidden border border-zinc-800 bg-black">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/RXJKdh1KZ0w"
            title="Demo vid"
            allowFullScreen
          />
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-semibold mb-6">Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image src="https://picsum.photos/id/1015/800/600" alt="" fill className="object-cover" />
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden">
            <Image src="https://picsum.photos/id/102/800/600" alt="" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}