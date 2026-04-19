'use client';
import { useState } from 'react';
import Image from 'next/image';
import SkillsTable from '../components/skills-table';
import { ThemeProvider, useTheme } from '../theme-provider';
import { aboutTheme } from '../themes';

function AboutContent() {
  const theme = useTheme();
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);
  const [randomCopied, setRandomCopied] = useState(false);

const copyToClipboard = (text: string, type: 'email' | 'phone' | 'address' | 'random') => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'email') setEmailCopied(true);
      if (type === 'phone') setPhoneCopied(true);
      if (type === 'address') setAddressCopied(true);
      if (type === 'random') setRandomCopied(true);
      setTimeout(() => {
        if (type === 'email') setEmailCopied(false);
        if (type === 'phone') setPhoneCopied(false);
        if (type === 'address') setAddressCopied(false);
        if (type === 'random') setRandomCopied(false);
      }, 2000);
    });
  };

  const skillsData = [
    { category: "Languages", items: "Java, Python, Kotlin, TypeScript, JavaScript, HTML, CSS" },
    { category: "Frameworks & Tools", items: "Next.js, React, Gradle, Git, Linux, Bash" },
    { category: "Systems & DevOps", items: "CI/CD, Unit Testing, Test Automation, Scrum, REST, API, SQL, PostgreSQL" },
    { category: "Core Concepts", items: "OOP, InfoSec, Data Structures, Algorithms, Concurrency, UML" }
  ];

const randomContacts = [
  { country: 'Sweden', code: '+46', flag: '🇸🇪', length: 9 },
  { country: 'USA', code: '+1', flag: '🇺🇸', length: 10 },
  { country: 'UK', code: '+44', flag: '🇬🇧', length: 10 },
  { country: 'Germany', code: '+49', flag: '🇩🇪', length: 10 },
  { country: 'France', code: '+33', flag: '🇫🇷', length: 9 },
  { country: 'Japan', code: '+81', flag: '🇯🇵', length: 10 },
  { country: 'Australia', code: '+61', flag: '🇦🇺', length: 9 },
  { country: 'Canada', code: '+1', flag: '🇨🇦', length: 10 },
  { country: 'Brazil', code: '+55', flag: '🇧🇷', length: 11 },
  { country: 'India', code: '+91', flag: '🇮🇳', length: 10 },
  { country: 'China', code: '+86', flag: '🇨🇳', length: 11 },
  { country: 'Mexico', code: '+52', flag: '🇲🇽', length: 10 },
  { country: 'Italy', code: '+39', flag: '🇮🇹', length: 10 },
  { country: 'Spain', code: '+34', flag: '🇪🇸', length: 9 },
  { country: 'South Korea', code: '+82', flag: '🇰🇷', length: 10 },
  { country: 'Netherlands', code: '+31', flag: '🇳🇱', length: 9 },
  { country: 'Switzerland', code: '+41', flag: '🇨🇭', length: 9 },
  { country: 'Norway', code: '+47', flag: '🇳🇴', length: 8 },
  { country: 'Denmark', code: '+45', flag: '🇩🇰', length: 8 },
  { country: 'Finland', code: '+358', flag: '🇫🇮', length: 9 },
  { country: 'Poland', code: '+48', flag: '🇵🇱', length: 9 },
  { country: 'Portugal', code: '+351', flag: '🇵🇹', length: 9 },
  { country: 'Belgium', code: '+32', flag: '🇧🇪', length: 9 },
  { country: 'Austria', code: '+43', flag: '🇦🇹', length: 10 },
  { country: 'Russia', code: '+7', flag: '🇷🇺', length: 10 },
  { country: 'Turkey', code: '+90', flag: '🇹🇷', length: 10 },
  { country: 'South Africa', code: '+27', flag: '🇿🇦', length: 9 },
  { country: 'Nigeria', code: '+234', flag: '🇳🇬', length: 10 },
  { country: 'Egypt', code: '+20', flag: '🇪🇬', length: 10 },
  { country: 'Kenya', code: '+254', flag: '🇰🇪', length: 9 },
  { country: 'Argentina', code: '+54', flag: '🇦🇷', length: 10 },
  { country: 'Colombia', code: '+57', flag: '🇨🇴', length: 10 },
  { country: 'Chile', code: '+56', flag: '🇨🇱', length: 9 },
  { country: 'Peru', code: '+51', flag: '🇵🇪', length: 9 },
  { country: 'Venezuela', code: '+58', flag: '🇻🇪', length: 10 },
  { country: 'Thailand', code: '+66', flag: '🇹🇭', length: 9 },
  { country: 'Vietnam', code: '+84', flag: '🇻🇳', length: 9 },
  { country: 'Indonesia', code: '+62', flag: '🇮🇩', length: 11 },
  { country: 'Malaysia', code: '+60', flag: '🇲🇾', length: 9 },
  { country: 'Philippines', code: '+63', flag: '🇵🇭', length: 10 },
  { country: 'Singapore', code: '+65', flag: '🇸🇬', length: 8 },
  { country: 'New Zealand', code: '+64', flag: '🇳🇿', length: 9 },
  { country: 'Greece', code: '+30', flag: '🇬🇷', length: 10 },
  { country: 'Czech Republic', code: '+420', flag: '🇨🇿', length: 9 },
  { country: 'Hungary', code: '+36', flag: '🇭🇺', length: 9 },
  { country: 'Romania', code: '+40', flag: '🇷🇴', length: 9 },
  { country: 'Ukraine', code: '+380', flag: '🇺🇦', length: 9 },
  { country: 'Pakistan', code: '+92', flag: '🇵🇰', length: 10 },
  { country: 'Bangladesh', code: '+880', flag: '🇧🇩', length: 10 },
  { country: 'Sri Lanka', code: '+94', flag: '🇱🇰', length: 9 },
  { country: 'Morocco', code: '+212', flag: '🇲🇦', length: 9 },
  { country: 'Ghana', code: '+233', flag: '🇬🇭', length: 9 },
  { country: 'Ethiopia', code: '+251', flag: '🇪🇹', length: 9 },
  { country: 'Tanzania', code: '+255', flag: '🇹🇿', length: 9 },
  { country: 'Iran', code: '+98', flag: '🇮🇷', length: 10 },
  { country: 'Iraq', code: '+964', flag: '🇮🇶', length: 10 },
];

  const [randomContact, setRandomContact] = useState<{
    number: string;
    flag: string;
  } | null>(null);

  function generateRandomNumber() {
    const country =
      randomContacts[Math.floor(Math.random() * randomContacts.length)];

    let number = country.code;

    for (let i = 0; i < country.length; i++) {
      number += Math.floor(Math.random() * 10);
    }

    setRandomContact({
      number,
      flag: country.flag,
    });
  }

  return (
    <div className={`${theme.page.background} ${theme.page.text} min-h-screen font-sans antialiased`}>
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-[var(--about-primary)]/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="mb-24 grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--about-surface)] border border-[var(--about-border)] rounded-2xl text-sm font-mono tracking-[0.5px] text-[var(--about-muted)]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--about-accent)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--about-accent)]"></span>
              </span>
              SECOND-YEAR SYSTEMS DEVELOPER • MALMÖ UNIVERSITY
            </div>

            <h1 className={`${theme.text.heading} text-7xl md:text-8xl font-black tracking-[-2px] leading-none`}>
              Love Skön
            </h1>
            
            <p className={`${theme.text.subheading} text-3xl max-w-xl`}>
              Systems Development student hoping to put his skills to the test!
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.linkedin.com/in/love-sk%C3%B6n-4626273a6/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-x-3 px-7 py-4 bg-[var(--about-primary)] hover:bg-[var(--about-primary-hover)] text-[var(--about-highlight)] rounded-2xl font-medium transition-all active:scale-95"
              >
                <span className="text-lg">LinkedIn</span>
                <span className="text-2xl transition-transform group-active:rotate-12">🔗</span>
              </a>

              <a
                href="https://github.com/Love335"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-x-3 px-7 py-4 bg-[var(--about-primary)] hover:bg-[var(--about-primary-hover)] text-[var(--about-highlight)] rounded-2xl font-medium transition-all active:scale-95"
              >
                <span className="text-lg">GitHub</span>
                <span className="text-2xl transition-transform group-active:-rotate-12">🟩</span>
              </a>

              <a
                href="/threat_assessment.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-x-3 px-7 py-4 bg-[var(--about-primary)] hover:bg-[var(--about-primary-hover)] text-[var(--about-highlight)] rounded-2xl font-medium transition-all active:scale-95"
              >
                <span className="text-lg">Threat Assessment</span>
                <span className="text-2xl transition-transform group-active:-rotate-12">🔬</span>
              </a>
            </div>

            <p className={`${theme.text.body} max-w-md text-lg leading-relaxed`}>
              Driven problem-solver ready to construct and document elegant IT systems, efficiently contribute to DevOps, 
              write code, fix your printer, or whatever else you might need.
            </p>
          </div>
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="w-full max-w-[380px] aspect-square rounded-3xl overflow-hidden p-3 shadow-2xl bg-gradient-to-br from-[var(--about-surface)] to-[var(--about-surface-elevated)] border border-[var(--about-border)]">
                <div className="group relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/collaborators/love_skon.jpg"
                    alt="Love Skön"
                    fill
                    className="object-cover transition-all duration-500 group-hover:blur-[2px]"
                    priority
                  />
                  <div className="absolute -top-20 left-0 w-43 h-43 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl overflow-hidden group-hover:blur-[1px]">
                    <div
                      className="w-full h-full bg-contain bg-no-repeat bg-center"
                      style={{ backgroundImage: "url('/unregistered_hypercam.png')" }}
                    />
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className="mb-24">
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <div className={`${theme.surfaces.card} rounded-3xl p-10 md:p-12 shadow-xl h-full transition-all hover:-translate-y-1 hover:shadow-2xl`}>                
                <h2 className={`${theme.text.sectionTitle} text-4xl font-semibold mb-8 tracking-[-1px]`}>About Me</h2>
                <div className={`${theme.text.body} text-[21px] leading-relaxed space-y-8`}>
                  <p>Second-year student of Systems Development at Malmö University, with skills in programming and integrated systems. My primary experiences are listed below, but I&apos;m always looking to learn new techniques.</p>
                  <p>I&apos;m a driven problem-solver, and I love navigating complex tasks and finding ways to make things work. IT is infinite and constantly evolving, I never back down from diving into another rabbit hole.</p>
                  <p className="italic text-[var(--about-muted)]">Outside of work I have a passion for cooking, TTRPGs, hiking, instant photography, creative writing, and of course computers!</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 space-y-8">
              <div className={`${theme.surfaces.card} rounded-3xl p-8 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-4 py-1.5 bg-[var(--about-primary)] text-[var(--about-highlight)] text-sm font-mono rounded-2xl">BACHELOR&apos;S</span>
                    <h3 className="text-3xl font-semibold mt-4">Systems Development</h3>
                    <p className="text-[var(--about-muted)] text-xl">Malmö University</p>
                  </div>
                  <div className="text-right font-mono text-sm text-[var(--about-muted)]">2024 — PRESENT</div>
                </div>
                <p className={`${theme.text.body} text-lg`}>Focused on programming, integrated systems, software architecture, and real-world development practices.</p>
              </div>

              <div className={`${theme.surfaces.card} rounded-3xl p-8 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl`}>
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-4 py-1.5 bg-[var(--about-accent)] text-[var(--about-6)] text-sm font-mono rounded-2xl">UPPER SECONDARY</span>
                    <h3 className="text-3xl font-semibold mt-4">Science Program</h3>
                    <p className="text-[var(--about-muted)] text-xl">Tycho Brahe Gymnasium</p>
                  </div>
                  <div className="text-right font-mono text-sm text-[var(--about-muted)]">2018 — 2021</div>
                </div>
                <p className={`${theme.text.body} text-lg`}>Strong foundation in mathematics, natural sciences, and early programming that sparked my systems development journey.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className={`${theme.text.sectionTitle} text-4xl font-semibold tracking-[-1px]`}>Skills &amp; Tools</h2>
            <span className="font-mono text-xs uppercase tracking-widest text-[var(--about-muted)]">I can also make corn tortillas from scratch</span>
          </div>
          
          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <SkillsTable skills={skillsData} />
            </div>

            <div className="md:col-span-5">
              <div className={`${theme.surfaces.card} rounded-3xl p-8 h-full`}>
                <h3 className={`${theme.text.sectionTitle} text-3xl font-semibold mb-8 tracking-[-1px]`}>Get in touch with me!</h3>
                
                <div className="space-y-7 text-[var(--about-foreground)]">
                  
                  {/* Email */}
                  <div className="flex items-center justify-between">
                    <a 
                      href="mailto:loveskon335@gmail.com" 
                      className="font-medium text-lg hover:text-[var(--about-primary)] transition-colors"
                    >
                      loveskon335@gmail.com
                    </a>
                    <button
                      onClick={() => copyToClipboard('loveskon335@gmail.com', 'email')}
                      className="text-xs font-mono px-6 py-3 bg-[var(--about-surface-elevated)] hover:bg-[var(--about-row-hover-primary)] border border-[var(--about-border)] rounded-2xl transition-all"
                    >
                      {emailCopied ? '✅ COPIED!' : 'COPY'}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between">
                    <a 
                      href="tel:+46763127936" 
                      className="font-medium text-lg hover:text-[var(--about-primary)] transition-colors"
                    >
                      +46 76 312 79 36
                    </a>
                    <button
                      onClick={() => copyToClipboard('+46763127936', 'phone')}
                      className="text-xs font-mono px-6 py-3 bg-[var(--about-surface-elevated)] hover:bg-[var(--about-row-hover-primary)] border border-[var(--about-border)] rounded-2xl transition-all"
                    >
                      {phoneCopied ? '✅ COPIED!' : 'COPY'}
                    </button>
                  </div>

                  {/* Address */}
                  <div className="flex items-center justify-between">
                    <a 
                      href="https://www.google.com/maps/search/?api=1&query=Ryttaregatan+5b,+Malm%C3%B6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-lg hover:text-[var(--about-primary)] transition-colors"
                    >
                      Ryttaregatan 5b, Malmö
                    </a>
                    <button
                      onClick={() => copyToClipboard('Ryttaregatan 5b, Malmö', 'address')}
                      className="text-xs font-mono px-6 py-3 bg-[var(--about-surface-elevated)] hover:bg-[var(--about-row-hover-primary)] border border-[var(--about-border)] rounded-2xl transition-all"
                    >
                      {addressCopied ? '✅ COPIED!' : 'COPY'}
                    </button>
                  </div>

                  {/* Random */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs uppercase tracking-widest text-[var(--about-muted)]">
                        OR with someone else!
                      </span>
                      <button
                        onClick={generateRandomNumber}
                        className="text-xs font-mono px-4 py-2 bg-[var(--about-surface-elevated)] hover:bg-[var(--about-row-hover-primary)] border border-[var(--about-border)] rounded-xl transition-all"
                      >
                        RANDOM
                      </button>
                    </div>

                    {randomContact && (
                      <div className="flex items-center justify-between">
                        <a
                          href={`tel:${randomContact.number}`}
                          className="font-medium text-lg hover:text-[var(--about-primary)] transition-colors flex items-center gap-3"
                        >
                          <span className="text-2xl">{randomContact.flag}</span>
                          {randomContact.number}
                        </a>

                        <button
                          onClick={() =>
                            copyToClipboard(randomContact.number, 'random')
                          }
                          className="text-xs font-mono px-4 py-2 bg-[var(--about-surface-elevated)] hover:bg-[var(--about-row-hover-primary)] border border-[var(--about-border)] rounded-xl transition-all"
                        >
                          {randomCopied ? '✅ COPIED!' : 'COPY'}
                        </button>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <ThemeProvider theme={aboutTheme}>
      <AboutContent />
    </ThemeProvider>
  );
}