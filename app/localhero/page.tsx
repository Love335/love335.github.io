import Feature from "../components/project/feature";
import FeatureGrid from "../components/project/feature-grid";
import { Screenshot, Video } from "../components/project/media";
import ProjectHero from "../components/project/project-hero";
import ProjectPage from "../components/project/project-page";
import TechSection from "../components/project/tech-section";
import { COLLABORATORS } from "../lib/collaborators";

export default function LocalHero() {
  return (
    <ProjectPage theme="localhero">
      <ProjectHero
        title="LocalHero"
        tagline="A community forum that helps neighbors start, support, and follow local initiatives."
        collaborators={[COLLABORATORS.max, COLLABORATORS.emmi, COLLABORATORS.linn, COLLABORATORS.david]}
        media={<Video src="/localhero/localhero_fullscreen.mp4" />}
      >
        A simple forum and messaging platform, designed as an initial foray into TypeScript,
        React, and design patterns.
      </ProjectHero>

      <FeatureGrid>
        <Feature
          title="Categories"
          layout="media-bottom"
          media={<Screenshot src="/localhero/localhero_categories.png" alt="LocalHero Categories" />}
        >
          Browse initiatives by category or location.
        </Feature>

        <Feature
          title="Initiatives"
          layout="media-bottom"
          media={<Screenshot src="/localhero/localhero_initiative.png" alt="LocalHero Initiative" />}
        >
          Create and follow local initiatives, choose whether to make accessible to everyone
          or keep it in your local community.
        </Feature>

        <Feature
          title="Comments"
          media={<Screenshot src="/localhero/localhero_comments.png" alt="LocalHero Comments" />}
        >
          Place infinitely nesting comments on updates or initiatives, built using a composite pattern.
        </Feature>

        <Feature
          title="Notifications"
          media={<Screenshot src="/localhero/localhero_notifications.png" alt="LocalHero Notifications" />}
        >
          Polling system periodically detects updates and notifies users.
        </Feature>
      </FeatureGrid>

      <TechSection
        skills={[
          { category: "Frontend", items: "React, HTML, CSS, MUI" },
          { category: "Backend", items: "TypeScript, .json" },
          { category: "Tools", items: "Design Patterns, Shared Directories, APIs" },
        ]}
      />
    </ProjectPage>
  );
}
