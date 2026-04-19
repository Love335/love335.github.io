'use client';

import Image from 'next/image';
import Collaborators from '../components/collaborators';
import SkillsTable from '../components/skills-table';
import { ThemeProvider, useTheme } from '../theme-provider';
import { breakevenTheme } from '../themes';

function BreakEvenContent() {
  const theme = useTheme();

  return (
    <div className={`${theme.page.background} ${theme.page.text} min-h-screen`}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className={`text-6xl font-bold tracking-tighter leading-none mb-4 ${theme.text.heading}`}>
                BreakEven
              </h1>
              <p className={`text-2xl ${theme.text.subheading}`}>
                Take the role of Mike, a gambler spending his last $250 in Vegas, trying to Break Even.
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
                  name: "Linn Otendal",
                  image: "/collaborators/linn_otendal.jpg",
                  link: "https://www.linkedin.com/in/linnotendal/"
                }
              ]}
            />

            <p className={`${theme.text.body} max-w-md`}>
              Your starsign and the constellations above divine your luck, and grant you power-ups
              to beat your lackluster odds.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className={`w-full max-w-lg rounded-3xl overflow-hidden p-3 shadow-2xl ${theme.surfaces.card}`}>
              <video
                src="/breakeven/breakeven_fullscreen.mp4"
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
              <div className={`w-full max-w-lg rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                <Image
                  src="/breakeven/breakeven_split.png"
                  alt="BreakEven Split View"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
            <div className="text-center max-w-md mx-auto">
              <h2 className={`text-3xl font-semibold mb-3 ${theme.text.sectionTitle}`}>
                Split Hands
              </h2>
              <p className={`${theme.text.body} leading-relaxed`}>
                Split your hand and play as many as your luck and your chips will allow.
              </p>
            </div>
          </div>

          <div className="break-inside-avoid">
            <div className="flex justify-center mb-6">
              <div className={`w-full max-w-lg rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                <Image
                  src="/breakeven/breakeven_guidance.png"
                  alt="BreakEven Guidance System"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
            <div className="text-center max-w-md mx-auto">
              <h2 className={`text-3xl font-semibold mb-3 ${theme.text.sectionTitle}`}>
                Celestial Guidance
              </h2>
              <p className={`${theme.text.body} leading-relaxed`}>
                Real-time astrological data is combined with your starsign to grant you power-ups.
              </p>
            </div>
          </div>

          <div className="break-inside-avoid">
            <div className="text-center max-w-md mx-auto mb-6">
              <h2 className={`text-3xl font-semibold mb-3 ${theme.text.sectionTitle}`}>
                Power-ups
              </h2>
              <p className={`${theme.text.body} leading-relaxed`}>
                Use celestial bodies to turn the game on its head. Multiply your earnings, 
                destroy the dealer&apos;s cards, and more.
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <div className={`w-full max-w-sm rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                <Image
                  src="/breakeven/breakeven_powerup.png"
                  alt="BreakEven Powerups"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* API */}
          <div className="break-inside-avoid">
            <div className="text-center max-w-md mx-auto mb-6">
              <h2 className={`text-3xl font-semibold mb-3 ${theme.text.sectionTitle}`}>
                APIs
              </h2>
              <p className={`${theme.text.body} leading-relaxed`}>
                APIs collect the shuffled deck and astrological data to keep the game tamper-free, 
                dynamic, and technologically impressive ;)
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <div className={`w-full max-w-lg rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                <Image
                  src="/breakeven/breakeven_api.png"
                  alt="BreakEven API"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="mt-24">
          <h2 className={`text-3xl font-semibold mb-8 text-center ${theme.text.sectionTitle}`}>
            Tech & Tools Used
          </h2>
          <SkillsTable
            skills={[
              { category: "Frontend", items: "JavaScript, HTML, CSS" },
              { category: "Backend", items: "Python, Flask" },
              { category: "Tools", items: "APIs, Git, VSCode" },
            ]}
          />
        </div>

      </div>
    </div>
  );
}

export default function BreakEven() {
  return (
    <ThemeProvider theme={breakevenTheme}>
      <BreakEvenContent />
    </ThemeProvider>
  );
}