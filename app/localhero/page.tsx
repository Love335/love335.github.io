'use client';

import Image from 'next/image';
import Collaborators from '../components/collaborators';
import SkillsTable from '../components/skills-table';
import { ThemeProvider, useTheme } from '../theme-provider';
import { localheroTheme } from '../themes';

function LocalHeroContent() {
  const theme = useTheme();

  return (
    <div className={`${theme.page.background} ${theme.page.text} min-h-screen`}>
      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className={`text-6xl font-bold tracking-tighter leading-none mb-4 ${theme.text.heading}`}>
                LocalHero
              </h1>
              <p className={`text-2xl ${theme.text.subheading}`}>
                A community forum that helps neighbors start, support, 
                and follow local initiatives.
              </p>
            </div>

            <Collaborators
              title="Collaborators:"
              collaborators={[
                {
                  name: "Max Koste",
                  image: "/collaborators/max_koste.jpg",
                  link: "https://www.linkedin.com/in/maxkoste/",
                },
                {
                  name: "Emmi Masalkovski",
                  image: "/collaborators/emmi_masalkovski.jpg",
                  link: "https://www.linkedin.com/in/emmi-masalkovski-05a89339a/",
                },
                {
                  name: "Linn Otendal",
                  image: "/collaborators/linn_otendal.jpg",
                  link: "https://www.linkedin.com/in/linnotendal/",
                },
                {
                  name: "David Lexe",
                  image: "/collaborators/david_lexe.jpg",
                  link: "https://www.linkedin.com/in/david-lexe-b8a166388/",
                },
              ]}
            />

            <p className={`${theme.text.body} max-w-md`}>
              A simple forum and messaging platform, designed as an 
              initial foray into TypeScript, React, and design patterns.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className={`w-full max-w-lg rounded-3xl overflow-hidden p-3 shadow-2xl ${theme.surfaces.card}`}>
              <video
                src="/localhero/localhero_fullscreen.mp4"
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
            <div className="text-center max-w-md mx-auto mb-6">
              <h2 className={`text-3xl font-semibold mb-3 ${theme.text.sectionTitle}`}>
                Categories
              </h2>
              <p className={`${theme.text.body} leading-relaxed`}>
                Browse initiatives by category or location.
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <div className={`w-full max-w-lg rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                <Image
                  src="/localhero/localhero_categories.png"
                  alt="LocalHero Categories"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="break-inside-avoid">
            <div className="text-center max-w-md mx-auto mb-6">
              <h2 className={`text-3xl font-semibold mb-3 ${theme.text.sectionTitle}`}>
                Initiatives
              </h2>
              <p className={`${theme.text.body} leading-relaxed`}>
                Create and follow local initiatives, choose whether to make accessible to everyone or keep it in your local community.
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <div className={`w-full max-w-lg rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                <Image
                  src="/localhero/localhero_initiative.png"
                  alt="LocalHero Initiative"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>

          <div className="break-inside-avoid">
            <div className="flex justify-center mb-6">
              <div className={`w-full max-w-lg rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                <Image
                  src="/localhero/localhero_comments.png"
                  alt="LocalHero Comments"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
            <div className="text-center max-w-md mx-auto">
              <h2 className={`text-3xl font-semibold mb-3 ${theme.text.sectionTitle}`}>
                Comments
              </h2>
              <p className={`${theme.text.body} leading-relaxed`}>
                Place infinitely nesting comments on updates or initiatives, built using a composite pattern.
              </p>
            </div>
          </div>

          <div className="break-inside-avoid">
            <div className="flex justify-center mb-6">
              <div className={`w-full max-w-lg rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                <Image
                  src="/localhero/localhero_notifications.png"
                  alt="LocalHero Notifications"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
            <div className="text-center max-w-md mx-auto">
              <h2 className={`text-3xl font-semibold mb-3 ${theme.text.sectionTitle}`}>
                Notifications
              </h2>
              <p className={`${theme.text.body} leading-relaxed`}>
                Polling system peroidically detects updates and notifies users.
              </p>
            </div>
          </div>

        </div>

        <div className="mt-24">
          <h2 className={`text-3xl font-semibold mb-8 text-center ${theme.text.sectionTitle}`}>
            Tech &amp; Tools Used
          </h2>
          <SkillsTable
            skills={[
              { category: "Frontend", items: "React, HTML, CSS, MUI" },
              { category: "Backend", items: "TypeScript, .json" },
              { category: "Tools", items: "Design Patterns, Shared Directories, APIs" },
            ]}
          />
        </div>

      </div>
    </div>
  );
}

export default function LocalHero() {
  return (
    <ThemeProvider theme={localheroTheme}>
      <LocalHeroContent />
    </ThemeProvider>
  );
}