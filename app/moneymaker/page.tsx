import Feature from "../components/project/feature";
import FeatureGrid from "../components/project/feature-grid";
import { Screenshot, Video } from "../components/project/media";
import ProjectHero from "../components/project/project-hero";
import ProjectPage from "../components/project/project-page";
import TechSection from "../components/project/tech-section";

export default function MoneyMaker() {
  return (
    <ProjectPage theme="moneymaker">
      <ProjectHero
        title="MoneyMaker"
        tagline="An automated trading bot, built to watch the market and act on it faster than you can, placed into an always-on Rasberry Pi."
        media={<Video src="/moneymaker/moneymaker_fullscreen.mp4" />}
      >
        Connects to Avanza to track prices and execute trades automatically, with
        multiple trading algorithms, structured logging, and a robust test suite.
      </ProjectHero>

      <FeatureGrid>
        <Feature
          title="Wiring"
          layout="media-bottom"
          media={<Screenshot src="/moneymaker/moneymaker_wiring.jpg" alt="MoneyMaker Wiring" />}
        >
          A MAX7219 8-digit display, WS2812D RGB LED, three metal pushbuttons, and a power switch,
          are all soldered and wired to the Pi&apos;s GPIO header using a verified pin map
        </Feature>

        <Feature
          title="Event Bus"
          layout="media-bottom"
          media={<Screenshot src="/moneymaker/moneymaker_eventbus.png" alt="MoneyMaker Event Bus" />}
        >
          All inter-component communication is routed through a thread-safe publish-subscribe event bus.
          Hardware never directly calls business logic and trading logic never directly calls hardware.
        </Feature>

        <Feature
          title="Logging"
          media={<Screenshot src="/moneymaker/moneymaker_logging.png" alt="MoneyMaker Logging" />}
        >
          A general application log and a dedicated trade log records every signal,
          execution, price, and outcome. All in a consistently formatted structure.
        </Feature>

        <Feature
          title="Test Suite"
          layout="media-bottom"
          media={<Screenshot src="/moneymaker/moneymaker_testsuite.png" alt="MoneyMaker Test Suite" />}
        >
          The project includes four test modules covering algorithm logic,
          paper broker correctness, market data validation, and live Avanza API integration.
        </Feature>
      </FeatureGrid>

      <TechSection
        skills={[
          { category: "Backend", items: "Python, systemd, libs (ex. avanza-api, yfinance)" },
          { category: "Hardware", items: "Raspberry Pi 3B, components (ex. MAX7219 8-digit 7-segment display)" },
          { category: "Tools", items: "Remote SSH, Git, Soldering station" },
        ]}
      />
    </ProjectPage>
  );
}
