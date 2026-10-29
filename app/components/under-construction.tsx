import Image from "next/image";

export default function UnderConstruction() {
  return (
    <div className="relative flex min-h-page items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 bg-surface-elevated/80 backdrop-blur-3xl" />

      <div className="relative z-10 max-w-2xl px-6 py-12 text-center">
        <div className="mb-10 flex justify-center">
          <Image
            src="/under_construction.png"
            alt="Under Construction"
            width={600}
            height={400}
            className="h-auto w-full max-w-[600px] drop-shadow-2xl"
            priority
          />
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Coming Soon
        </h1>

        <p className="mx-auto max-w-md text-xl text-muted">
          This project is still under construction.
        </p>

        <div className="mt-12 text-sm uppercase tracking-widest text-muted">
          Check back later, stay tuned!
        </div>
      </div>
    </div>
  );
}
