import Feature from "../components/project/feature";
import FeatureGrid from "../components/project/feature-grid";
import { Screenshot, Video } from "../components/project/media";
import ProjectHero from "../components/project/project-hero";
import ProjectPage from "../components/project/project-page";
import TechSection from "../components/project/tech-section";
import { COLLABORATORS } from "../lib/collaborators";

export default function BreakEven() {
  return (
    <ProjectPage theme="breakeven">
      <ProjectHero
        title="BreakEven"
        tagline="Take the role of Mike, a gambler spending his last $250 in Vegas, trying to Break Even."
        collaborators={[COLLABORATORS.max, COLLABORATORS.linn]}
        media={<Video src="/breakeven/breakeven_fullscreen.mp4" />}
      >
        Your starsign and the constellations above divine your luck, and grant you power-ups
        to beat your lackluster odds.
      </ProjectHero>

      <FeatureGrid>
        <Feature
          title="Split Hands"
          media={<Screenshot src="/breakeven/breakeven_split.png" alt="BreakEven Split View" />}
        >
          Split your hand and play as many as your luck and your chips will allow.
        </Feature>

        <Feature
          title="Celestial Guidance"
          media={<Screenshot src="/breakeven/breakeven_guidance.png" alt="BreakEven Guidance System" />}
        >
          Real-time astrological data is combined with your starsign to grant you power-ups.
        </Feature>

        <Feature
          title="Power-ups"
          layout="media-bottom"
          mediaWidth="sm"
          media={<Screenshot src="/breakeven/breakeven_powerup.png" alt="BreakEven Powerups" />}
        >
          Use celestial bodies to turn the game on its head. Multiply your earnings,
          destroy the dealer&apos;s cards, and more.
        </Feature>

        <Feature
          title="APIs"
          layout="media-bottom"
          media={<Screenshot src="/breakeven/breakeven_api.png" alt="BreakEven API" />}
        >
          APIs collect the shuffled deck and astrological data to keep the game tamper-free,
          dynamic, and technologically impressive ;)
        </Feature>
      </FeatureGrid>

      <TechSection
        skills={[
          { category: "Frontend", items: "JavaScript, HTML, CSS" },
          { category: "Backend", items: "Python, Flask" },
          { category: "Tools", items: "APIs, Git, VSCode" },
        ]}
      />
    </ProjectPage>
  );
}
