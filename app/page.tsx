import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="text-5xl font-semibold mb-4">
          My Portfolio
        </h1>

        <p className="text-xl text-muted">
          Site in development!
        </p>
      </div>
    </div>
  );
}