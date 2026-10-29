import Image from "next/image";
import Card from "../components/card";
import ProjectPage from "../components/project/project-page";
import SkillsTable from "../components/skills-table";
import { cn } from "../lib/cn";
import ContactCard from "./contact-card";

const SKILLS = [
  { category: "Languages", items: "Java, C++, Python, Kotlin, TypeScript, JavaScript, PHP, HTML, CSS" },
  { category: "Frameworks & Tools", items: "Next.js, React, Gradle, Maven, Git, Linux, FreeBSD, Raspberry Pi, Bash" },
  { category: "Systems & DevOps", items: "CI/CD, Unit Testing, Test Automation, Scrum, REST, API, SQL, PostgreSQL" },
  { category: "Core Concepts", items: "OOP, InfoSec, Data Structures, Computer Hardware, Design Patterns, Algorithms, Concurrency, UML" },
];

const LINKS = [
  {
    label: "LinkedIn",
    emoji: "🔗",
    href: "https://www.linkedin.com/in/love-sk%C3%B6n-4626273a6/",
    spin: "group-active:rotate-12",
  },
  {
    label: "GitHub",
    emoji: "🟩",
    href: "https://github.com/Love335",
    spin: "group-active:-rotate-12",
  },
  {
    label: "Threat Assessment",
    emoji: "🔬",
    href: "/threat_assessment.pdf",
    spin: "group-active:-rotate-12",
  },
];

const EDUCATION = [
  {
    badge: "BACHELOR'S",
    badgeClass: "bg-primary text-foreground",
    title: "Systems Development",
    school: "Malmö University",
    years: "2024 — PRESENT",
    text: "Focused on programming, integrated systems, software architecture, and real-world development practices.",
  },
  {
    badge: "UPPER SECONDARY",
    badgeClass: "bg-accent text-background",
    title: "Science Program",
    school: "Tycho Brahe Gymnasium",
    years: "2018 — 2021",
    text: "Strong foundation in mathematics, natural sciences, and early programming that sparked my systems development journey.",
  },
];

export default function About() {
  return (
    <ProjectPage
      theme="about"
      decoration={
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-linear-to-b from-primary/10 to-transparent" />
      }
    >
      {/* Intro */}
      <section className="mb-16 grid items-center gap-10 md:mb-24 md:grid-cols-12 md:gap-12">
        <div className="space-y-6 md:col-span-7 md:space-y-8">
          <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-2 font-mono text-xs tracking-[0.5px] text-muted sm:px-5 sm:py-2.5 sm:text-sm">
            <span className="relative flex h-3 w-3 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
            </span>
            THIRD-YEAR SYSTEMS DEVELOPER • MALMÖ UNIVERSITY
          </div>

          <h1 className="text-6xl font-black leading-none tracking-[-2px] text-primary sm:text-7xl md:text-8xl">
            Love Skön
          </h1>

          <p className="max-w-xl text-2xl text-muted sm:text-3xl">
            Systems Development student hoping to put his skills to the test!
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-x-3 rounded-2xl bg-primary px-5 py-3 font-medium text-foreground transition-all hover:bg-primary-hover active:scale-95 sm:px-7 sm:py-4"
              >
                <span className="text-base sm:text-lg">{link.label}</span>
                <span className={cn("text-xl transition-transform sm:text-2xl", link.spin)}>
                  {link.emoji}
                </span>
              </a>
            ))}
          </div>

          <p className="max-w-md text-lg leading-relaxed text-muted">
            Driven problem-solver ready to construct and document elegant IT systems, efficiently
            contribute to DevOps, write code, fix your printer, or whatever else you might need.
          </p>
        </div>

        <div className="flex justify-center md:col-span-5 md:justify-end">
          <div className="aspect-square w-full max-w-[380px] overflow-hidden rounded-3xl border border-border bg-linear-to-br from-surface to-surface-elevated p-3 shadow-2xl">
            <div className="group relative h-full w-full overflow-hidden rounded-2xl">
              <Image
                src="/collaborators/love_skon.jpg"
                alt="Love Skön"
                fill
                sizes="380px"
                className="object-cover transition-all duration-500 group-hover:blur-[2px]"
                priority
              />
              <div className="absolute -top-20 left-0 h-43 w-43 overflow-hidden rounded-xl opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:blur-[1px]">
                <Image src="/unregistered_hypercam.png" alt="" fill sizes="172px" className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About + education */}
      <section className="mb-16 grid gap-6 md:mb-24 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <Card lift className="h-full p-6 sm:p-10 md:p-12">
            <h2 className="mb-6 text-3xl font-semibold tracking-[-1px] text-primary sm:mb-8 sm:text-4xl">
              About Me
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-muted sm:space-y-8 sm:text-[21px]">
              <p>
                Third-year student of Systems Development at Malmö University, with skills in
                programming and integrated systems. My primary experiences are listed below, but
                I&apos;m always looking to learn new techniques.
              </p>
              <p>
                I&apos;m a driven problem-solver, and I love navigating complex tasks and finding
                ways to make things work. IT is infinite and constantly evolving, I never back down
                from diving into another rabbit hole.
              </p>
              <p className="italic">
                Outside of work I have a passion for cooking, TTRPGs, hiking, instant photography,
                creative writing, and of course computers!
              </p>
            </div>
          </Card>
        </div>

        <div className="space-y-6 md:col-span-5 md:space-y-8">
          {EDUCATION.map((item) => (
            <Card key={item.title} lift className="p-6 sm:p-8">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className={cn("rounded-2xl px-4 py-1.5 font-mono text-sm", item.badgeClass)}>
                    {item.badge}
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold sm:text-3xl">{item.title}</h3>
                  <p className="text-lg text-muted sm:text-xl">{item.school}</p>
                </div>
                <div className="font-mono text-sm text-muted sm:text-right">{item.years}</div>
              </div>
              <p className="text-lg text-muted">{item.text}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills + contact */}
      <section>
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
          <h2 className="text-3xl font-semibold tracking-[-1px] text-primary sm:text-4xl">
            Skills &amp; Tools
          </h2>
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            I can also make corn tortillas from scratch
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <SkillsTable skills={SKILLS} />
          </div>
          <div className="md:col-span-5">
            <ContactCard />
          </div>
        </div>
      </section>
    </ProjectPage>
  );
}
