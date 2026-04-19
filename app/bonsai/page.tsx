'use client';

import Image from 'next/image';
import SkillsTable from '../components/skills-table';
import Collaborators from '../components/collaborators';
import { ThemeProvider, useTheme } from '../theme-provider';
import { bonsaiTheme } from '../themes';

function BonsaiContent() {
  const theme = useTheme();

  return (
    <div className={`${theme.page.background} ${theme.page.text} min-h-screen`}>

        <div className="max-w-6xl mx-auto px-6 py-12">

            <div className="mb-16 flex justify-center">
                <div className="grid md:grid-cols-2 gap-4 items-center max-w-2xl w-full">

                    <div className="flex justify-center md:justify-start">
                        <div className={`w-full max-w-[220px] rounded-3xl overflow-hidden p-2 shadow-2xl ${theme.surfaces.card}`}>
                            <video
                            src="/bonsai/bonsai_fullscreen.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-auto object-contain rounded-2xl"
                            />
                        </div>
                    </div>

                    <div className="space-y-6 text-center md:text-left">

                    <div className="space-y-4">
                        <h1 className={`text-6xl font-bold tracking-tighter leading-none ${theme.text.heading}`}>
                        Bonsai
                        </h1>

                        <p className={`text-2xl ${theme.text.subheading}`}>
                        A motivating plant-keeping app, where your progress is represented by a tamagochi-style tree.
                        </p>
                    </div>

                    <Collaborators
                        title="Collaborators:"
                        collaborators={[
                        {
                            name: "Emmi Masalkovski",
                            image: "/collaborators/emmi_masalkovski.jpg",
                            link: "https://www.linkedin.com/in/emmi-masalkovski-05a89339a/"
                        },
                        ]}
                    />

                    <p className={`${theme.text.body} max-w-md mx-auto md:mx-0`}>
                        View the water and sunlight needs of your plants, log updates, track overall health, and more.
                    </p>

                    </div>

                </div>
            </div>

            <div className="space-y-24">

                <div className="grid md:grid-cols-3 gap-10 items-center">

                    <div className="flex justify-center md:justify-end">
                        <div className={`w-full max-w-[220px] rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                            <Image
                            src="/bonsai/bonsai_plant.png"
                            alt="Bonsai Plant Growth"
                            width={800}
                            height={1200}
                            className="w-full h-auto object-contain rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="text-center max-w-md mx-auto space-y-30">

                        <div className="space-y-6">
                            <h2 className={`text-3xl font-semibold ${theme.text.sectionTitle}`}>
                            Plant View
                            </h2>
                            <p className={`${theme.text.body} leading-relaxed`}>
                            Keep track of your plant, track progress or defects, view its health and its water needs, 
                            and change the name or image at your leisure.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h2 className={`text-3xl font-semibold ${theme.text.sectionTitle}`}>
                            Bonsai Tree
                            </h2>
                            <p className={`${theme.text.body} leading-relaxed`}>
                            Watch your bonsai stay strong as you take care of your plants, or deteriorate as you don't.
                            </p>
                        </div>

                    </div>

                    <div className="flex justify-center md:justify-start">
                        <div className={`w-full max-w-[220px] rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                            <Image
                            src="/bonsai/bonsai_bonsai.png"
                            alt="Bonsai Core View"
                            width={800}
                            height={1200}
                            className="w-full h-auto object-contain rounded-xl"
                            />
                        </div>
                    </div>

                </div>

            <div className="grid md:grid-cols-3 gap-10 items-center">

                <div className="flex justify-center md:justify-end">
                <div className={`w-full max-w-[220px] rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                    <Image
                    src="/bonsai/bonsai_defects.png"
                    alt="Bonsai Defects System"
                    width={800}
                    height={1200}
                    className="w-full h-auto object-contain rounded-xl"
                    />
                </div>
                </div>

                <div className="text-center max-w-md mx-auto space-y-30">

                <div className="space-y-6">
                    <h2 className={`text-3xl font-semibold ${theme.text.sectionTitle}`}>
                    Imperfections
                    </h2>
                    <p className={`${theme.text.body} leading-relaxed`}>
                    Browse through disease and defect symptoms to get advice on how to better take care of your plant.
                    </p>
                </div>

                <div className="space-y-6">
                    <h2 className={`text-3xl font-semibold ${theme.text.sectionTitle}`}>
                    Garden
                    </h2>
                    <p className={`${theme.text.body} leading-relaxed`}>
                    Organize your plants into collapsable categories, batch-water plants, and sort through your collection.
                    </p>
                </div>

                </div>

                <div className="flex justify-center md:justify-start">
                    <div className={`w-full max-w-[220px] rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                        <Image
                        src="/bonsai/bonsai_garden.png"
                        alt="Bonsai Garden Environment"
                        width={800}
                        height={1200}
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
                { category: "Frontend", items: "Jetpack Compose" },
                { category: "Backend", items: "Kotlin, Java" },
                { category: "CI/CD", items: "YAML, Github Actions" },
                { category: "Tools", items: "Emulators, Git, APIs, Android Studio" },
                ]}
            />
            </div>

        </div>
    </div>
  );
}

export default function Bonsai() {
  return (
    <ThemeProvider theme={bonsaiTheme}>
      <BonsaiContent />
    </ThemeProvider>
  );
}