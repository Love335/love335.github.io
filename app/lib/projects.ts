/**
 * The single source of truth for every project on the site: its route, navbar
 * tab, colour theme and the text the home-page CRT types out for it. The navbar,
 * the CRT and the pages all read from here.
 */

export type ThemeName =
  | "about"
  | "beatnik"
  | "breakeven"
  | "bonsai"
  | "localhero"
  | "moneymaker";

export interface Project {
  slug: string;
  label: string;
  href: string;
  /** Colour theme for the project page (see styles/themes.css). Omit to use the default. */
  theme?: ThemeName;
  /** Tailwind background classes for the navbar tab. */
  navColor: string;
  /** Icon image for the navbar tab; `emoji` is used when there is none. */
  icon?: { src: string; className?: string };
  emoji?: string;
  /** Lines the CRT types out when the wire is plugged into this tab. */
  terminal: string[];
}

export const PROJECTS: readonly Project[] = [
  {
    slug: "about",
    label: "About Me",
    href: "/about",
    theme: "about",
    navColor: "bg-rose-600 hover:bg-rose-700",
    emoji: "👤",
    terminal: [
      "LOADING PROFILE...",
      "",
      "USER: love_sk%C3%83%C2%B6n",
      "STATUS: available for work",
      "",
      "→ systems developer, full-stack developer...",
      "→ gets things done...",
      "→ focused and determined...",
      "",
      "INTERESTS: systems, code, hardware, IT, the wire, owls",
      "LOCATION: malm%C3%83%C2%B6",
      "",
    ],
  },
  {
    slug: "beatnik",
    label: "Beatnik",
    href: "/beatnik",
    theme: "beatnik",
    navColor: "bg-[#1e3a8a] hover:bg-[#1e40af]",
    icon: { src: "/icons/icon_beatnik.png" },
    terminal: [
      "LOADING BEATNIK.APP...",
      "",
      "A music app for the common",
      "folk, easy and accessible.",
      "",
      "STACK: Java, JavaFX, CSS",
      "PLATFORM: Windows, Mac, Linux",
      "STATUS: finished",
      "",
      "→ OS interaction...",
      "→ uses semaphores...",
      "→ scalable GUI...",
      "",
    ],
  },
  {
    slug: "breakeven",
    label: "BreakEven",
    href: "/breakeven",
    theme: "breakeven",
    navColor: "bg-emerald-600 hover:bg-emerald-700",
    icon: { src: "/icons/icon_breakeven.png", className: "rotate-90 [image-rendering:pixelated]" },
    terminal: [
      "LOADING BREAKEVEN.APP...",
      "",
      "A blackjack game.",
      "Make your money back.",
      "",
      "STACK: Python, JavaScript, HTML, CSS",
      "PLATFORM: Browser",
      "STATUS: on indefinite hold",
      "",
      "→ API interaction...",
      "→ JSON interpretation...",
      "→ addicting (though less than gambling)...",
      "",
    ],
  },
  {
    slug: "bonsai",
    label: "Bonsai",
    href: "/bonsai",
    theme: "bonsai",
    navColor: "bg-green-600 hover:bg-green-700",
    icon: { src: "/icons/icon_bonsai.png", className: "rounded-sm" },
    terminal: [
      "LOADING BONSAI.APP...",
      "",
      "A tamagotchi-style plant",
      "keeping app.",
      "",
      "STACK: Kotlin, Jetpack Compose",
      "PLATFORM: Android",
      "STATUS: finished",
      "",
      "→ emulator technology...",
      "→ SQL database...",
      "→ large CI/CD pipeline...",
      "",
    ],
  },
  {
    slug: "localhero",
    label: "Local Hero",
    href: "/localhero",
    theme: "localhero",
    navColor: "bg-sky-600 hover:bg-sky-700",
    icon: { src: "/icons/icon_localhero.png" },
    terminal: [
      "LOADING LOCALHERO.APP...",
      "",
      "Discover your neighborhood.",
      "Support sustainability.",
      "",
      "STACK: TypeScript, React",
      "PLATFORM: Browser",
      "STATUS: finished",
      "",
      "→ functional messaging system...",
      "→ large user capacity...",
      "→ high use of design patterns...",
      "",
    ],
  },
  {
    slug: "moneymaker",
    label: "moneymaker",
    href: "/moneymaker",
    theme: "moneymaker",
    navColor: "bg-amber-500 hover:bg-amber-600",
    emoji: "💵",
    terminal: [
      "LOADING MONEYMAKER.APP...",
      "",
      "Always-on raspberry pi server.",
      "Runs stock-trading algorithms.",
      "",
      "STACK: Python, Linux",
      "PLATFORM: Raspberry Pi",
      "STATUS: finished",
      "",
      "→ physical soldered components...",
      "→ switch algorithms on the fly...",
      "→ ssh to change config...",
      "",
    ],
  },
  {
    slug: "saaf",
    label: "SAAF",
    href: "/saaf",
    navColor: "bg-violet-700 hover:bg-violet-800",
    emoji: "🔭",
    terminal: [
      "LOADING SAAF.APP...",
      "",
      "Building web-tech for SAAF.",
      "Supports a remote access telescope.",
      "",
      "STACK: PHP, JavaScript, Python, Wordpress",
      "PLATFORM: Browser/Server",
      "STATUS: in development",
      "",
      "→ project lead over 8 members...",
      "→ working for an external client...",
      "→ server running on FreeBSD...",
      "",
    ],
  },
  {
    slug: "uconsole",
    label: "uConsole",
    href: "/uconsole",
    navColor: "bg-slate-700 hover:bg-slate-800",
    emoji: "🖥️",
    terminal: [
      "LOADING UCONSOLE...",
      "",
      "A pocket-sized computer.",
      "Portable and powerful.",
      "",
      "PLATFORM: hardware mod",
      "STATUS: waiting on components :(",
      "",
      "→ custom Linux environment...",
      "→ computer assembly...",
      "→ modified for RTL-SDR, GPS, ETC...",
      "→ supports monitor mode...",
      "",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
