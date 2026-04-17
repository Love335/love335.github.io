import Image from 'next/image';

export default function UnderConstruction() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-surface-elevated/80 backdrop-blur-3xl z-0" />

      <div className="relative z-10 text-center px-6 max-w-2xl">
        <div className="mb-10 flex justify-center">
          <Image
            src="/under_construction.png"
            alt="Under Construction"
            width={600}
            height={400}
            className="drop-shadow-2xl"
            priority
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6">
          Coming Soon
        </h1>
        
        <p className="text-xl text-muted max-w-md mx-auto">
          This project is still under construction. 
        </p>

        <div className="mt-12 text-sm uppercase tracking-widest text-muted">
          Check back later, stay tuned!
        </div>
      </div>
    </div>
  );
}