import Image from 'next/image';
import Collaborators from '../components/collaborators';
import SkillsTable from '../components/skills-table';

export default function Beatnik() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h1 className="text-6xl font-bold tracking-tighter leading-none mb-4">
              Beatnik
            </h1>
            <p className="text-2xl text-muted">
            A live audio mixer, built to make a complicated tool easy to use, and available to the masses.
            </p>
          </div>

          <Collaborators
            title="Collaborators:"
            collaborators={[
              {
                name: "Max Koste",
                image: "/collaborators/max_koste.jpg",
              },
            ]}
          />

          <p className="text-muted max-w-md">
            Control EQ-levels, preview songs on a seperate "CUE" audio channel, 
            crossfade between two tracks, and apply custom effects. Runs on Windows, Mac, and Linux
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-lg rounded-3xl overflow-hidden bg-surface p-3 shadow-2xl border border-border">
            <video
              src="/beatnik/beatnik_fullscreen.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>
        </div>
      </div>

      <div className="columns-1 md:columns-2 gap-10 space-y-20">

        <div className="break-inside-avoid">
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-lg rounded-2xl overflow-hidden bg-surface p-2 shadow-xl border border-border">
              <video
                src="/beatnik/beatnik_waveform.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>

          <div className="text-center max-w-md mx-auto">
            <h2 className="text-3xl font-semibold mb-3">Living Waveform</h2>
            <p className="text-muted leading-relaxed">
              Watch your sound move, linked the the actual audio output, changing as you 
              tweak the levels in real-time.
            </p>
          </div>
        </div>

        <div className="break-inside-avoid">
          <div className="flex flex-row gap-6 items-center">
            <div className="flex-shrink-0 w-full max-w-md rounded-2xl overflow-hidden bg-surface p-2 shadow-xl border border-border">
              <Image
                src="/beatnik/beatnik_soundboard.png"
                alt="Beatnik Soundboard"
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-semibold mb-3">Soundboard</h2>
              <p className="text-muted leading-relaxed">
                Trigger samples and sound effects in a pop-up window, 
                with its own audio control.
              </p>
            </div>
          </div>
        </div>

        <div className="break-inside-avoid">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-shrink-0 w-full max-w-sm rounded-2xl overflow-hidden bg-surface p-2 shadow-xl border border-border">
              <Image
                src="/beatnik/beatnik_selector.png"
                alt="Beatnik Selector"
                width={1200}
                height={800}
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
            <div className="text-center md:text-left max-w-md">
              <h2 className="text-3xl font-semibold mb-3">Song & Playlist Selector</h2>
              <p className="text-muted leading-relaxed">
                Create and run different auto-playing playlists, and switch the active song on either track.
              </p>
            </div>
          </div>
        </div>

        <div className="break-inside-avoid">
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-[180px] rounded-2xl overflow-hidden bg-surface p-2 shadow-xl border border-border">
              <video
                src="/beatnik/beatnik_mixer.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>

          <div className="text-center max-w-md mx-auto mb-6">
            <h2 className="text-3xl font-semibold mb-3">Live Mixer</h2>
            <p className="text-muted leading-relaxed">
              Fine-tune your levels on the fly. Smooth bass and treble, speed up or slow down playback.
            </p>
          </div>
        </div>

      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-semibold mb-8 text-center">
          Tech &amp; Tools Used
        </h2>

        <SkillsTable
          skills={[
            { category: "Frontend", items: "JavaFX, CSS" },
            { category: "Backend", items: "Java" },
            { category: "Audio", items: "TarsosDSP, ffmpeg" },
            { category: "Other", items: "Gradle, Git, IntelliJ" },
          ]}
        />
      </div>
    </div>
  );
}