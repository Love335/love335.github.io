import Feature from "../components/project/feature";
import FeatureGrid from "../components/project/feature-grid";
import { Screenshot, Video } from "../components/project/media";
import ProjectHero from "../components/project/project-hero";
import ProjectPage from "../components/project/project-page";
import TechSection from "../components/project/tech-section";
import { COLLABORATORS } from "../lib/collaborators";

export default function Beatnik() {
  return (
    <ProjectPage theme="beatnik">
      <ProjectHero
        title="Beatnik"
        tagline="A live audio mixer, built to make a complicated tool easy to use, and available to the masses."
        collaborators={[COLLABORATORS.max]}
        media={<Video src="/beatnik/beatnik_fullscreen.mp4" />}
      >
        Control EQ-levels, preview songs on a separate &quot;CUE&quot; audio channel,
        crossfade between two tracks, and apply custom effects. Runs on Windows, Mac, and Linux.
      </ProjectHero>

      <FeatureGrid>
        <Feature title="Living Waveform" media={<Video src="/beatnik/beatnik_waveform.mp4" />}>
          Watch your sound move, data cached at app start to minimize computing costs.
        </Feature>

        <Feature
          title="Soundboard"
          layout="side"
          mediaWidth="md"
          media={<Screenshot src="/beatnik/beatnik_soundboard.png" alt="Beatnik Soundboard" />}
        >
          Trigger samples and sound effects in a pop-up window, with its own audio control.
        </Feature>

        <Feature
          title="Song & Playlist Selector"
          layout="side"
          mediaWidth="sm"
          media={<Screenshot src="/beatnik/beatnik_selector.png" alt="Beatnik Selector" />}
        >
          Create and run different auto-playing playlists, and switch the active song on either track.
        </Feature>

        <Feature title="Live Mixer" mediaWidth="xs" media={<Video src="/beatnik/beatnik_mixer.mp4" />}>
          Fine-tune your levels on the fly. Smooth bass and treble, speed up or slow down playback.
        </Feature>
      </FeatureGrid>

      <TechSection
        skills={[
          { category: "Frontend", items: "JavaFX, CSS" },
          { category: "Backend", items: "Java" },
          { category: "Audio", items: "TarsosDSP, ffmpeg" },
          { category: "Other", items: "Gradle, Git, IntelliJ" },
        ]}
      />
    </ProjectPage>
  );
}
