import { FeatureText } from "../components/project/feature";
import { Screenshot, Video } from "../components/project/media";
import MediaFrame from "../components/project/media-frame";
import ProjectHero from "../components/project/project-hero";
import ProjectPage from "../components/project/project-page";
import TechSection from "../components/project/tech-section";
import { cn } from "../lib/cn";
import { COLLABORATORS } from "../lib/collaborators";

interface Panel {
  src: string;
  alt: string;
  title: string;
  text: string;
}

function Phone({ panel, className }: { panel: Panel; className?: string }) {
  return (
    <div className={cn("flex justify-center", className)}>
      <MediaFrame className="max-w-[220px]">
        <Screenshot src={panel.src} alt={panel.alt} portrait />
      </MediaFrame>
    </div>
  );
}

/**
 * Two phone screenshots with their descriptions between them. On narrow
 * screens each description follows its own screenshot instead.
 */
function Triptych({ left, right }: { left: Panel; right: Panel }) {
  return (
    <section className="grid items-center gap-8 md:grid-cols-3 md:gap-10">
      <Phone panel={left} className="md:col-start-1 md:row-span-2 md:justify-end" />
      <FeatureText title={left.title} className="md:col-start-2">
        {left.text}
      </FeatureText>
      <Phone panel={right} className="md:col-start-3 md:row-span-2 md:row-start-1 md:justify-start" />
      <FeatureText title={right.title} className="md:col-start-2">
        {right.text}
      </FeatureText>
    </section>
  );
}

export default function Bonsai() {
  return (
    <ProjectPage theme="bonsai">
      <ProjectHero
        layout="compact"
        title="Bonsai"
        tagline="A motivating plant-keeping app, where your progress is represented by a tamagochi-style tree."
        collaborators={[COLLABORATORS.emmi]}
        media={<Video src="/bonsai/bonsai_fullscreen.mp4" />}
      >
        View the water and sunlight needs of your plants, log updates, track overall health, and more.
      </ProjectHero>

      <div className="space-y-16 md:space-y-24">
        <Triptych
          left={{
            src: "/bonsai/bonsai_plant.png",
            alt: "Bonsai Plant Growth",
            title: "Plant View",
            text: "Keep track of your plant, track progress or defects, view its health and its water needs, and change the name or image at your leisure.",
          }}
          right={{
            src: "/bonsai/bonsai_bonsai.png",
            alt: "Bonsai Core View",
            title: "Bonsai Tree",
            text: "Watch your bonsai stay strong as you take care of your plants, or deteriorate as you don't.",
          }}
        />

        <Triptych
          left={{
            src: "/bonsai/bonsai_defects.png",
            alt: "Bonsai Defects System",
            title: "Imperfections",
            text: "Browse through disease and defect symptoms to get advice on how to better take care of your plant.",
          }}
          right={{
            src: "/bonsai/bonsai_garden.png",
            alt: "Bonsai Garden Environment",
            title: "Garden",
            text: "Organize your plants into collapsable categories, batch-water plants, and sort through your collection.",
          }}
        />
      </div>

      <TechSection
        skills={[
          { category: "Frontend", items: "Jetpack Compose" },
          { category: "Backend", items: "Kotlin, Java" },
          { category: "CI/CD", items: "YAML, Github Actions" },
          { category: "Tools", items: "Emulators, Git, APIs, Android Studio" },
        ]}
      />
    </ProjectPage>
  );
}
