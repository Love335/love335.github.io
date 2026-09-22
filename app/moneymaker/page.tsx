'use client';

import Image from 'next/image';
import SkillsTable from '../components/skills-table';
import { ThemeProvider, useTheme } from '../theme-provider';
import { moneymakerTheme } from '../themes'; // TODO: add moneymakerTheme to themes

function MoneyMakerContent() {
  const theme = useTheme();

  return (
    <div className={`${theme.page.background} ${theme.page.text} min-h-screen`}>
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* HERO */}
        <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h1 className={`text-6xl font-bold tracking-tighter leading-none mb-4 ${theme.text.heading}`}>
                MoneyMaker
              </h1>
              <p className={`text-2xl ${theme.text.subheading}`}>
                An automated trading bot, built to watch the market and act on it faster than you can, placed into an always-on Rasberry Pi.
              </p>
            </div>

            <p className={`${theme.text.body} max-w-md`}>
              Connects to Avanza to track prices and execute trades automatically, with 
              multiple trading algorithms, structured logging, and a robust test suite.
            </p>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className={`w-full max-w-lg rounded-3xl overflow-hidden p-3 shadow-2xl ${theme.surfaces.card}`}>
              <video
                src="/moneymaker/moneymaker_fullscreen.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-contain rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* FEATURES */}
        <div className="columns-1 md:columns-2 gap-10 space-y-20">

          {/* WIRING */}
          <div className="break-inside-avoid">
            <div className="text-center max-w-md mx-auto mb-6">
              <h2 className={`text-3xl font-semibold mb-3 ${theme.text.sectionTitle}`}>
                Wiring
              </h2>
              <p className={`${theme.text.body} leading-relaxed`}>
                A MAX7219 8-digit display, WS2812D RGB LED, three metal pushbuttons, and a power switch,
                are all soldered and wired to the Pi&apos;s GPIO header using a verified pin map
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <div className={`w-full max-w-lg rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                <Image
                  src="/moneymaker/moneymaker_wiring.jpg"
                  alt="MoneyMaker Wiring"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* EVENT BUS */}
          <div className="break-inside-avoid">
            <div className="text-center max-w-md mx-auto mb-6">
              <h2 className={`text-3xl font-semibold mb-3 ${theme.text.sectionTitle}`}>
                Event Bus
              </h2>
              <p className={`${theme.text.body} leading-relaxed`}>
                All inter-component communication is routed through a thread-safe publish-subscribe event bus. 
                Hardware never directly calls business logic and trading logic never directly calls hardware.
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <div className={`w-full max-w-lg rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                <Image
                  src="/moneymaker/moneymaker_eventbus.png"
                  alt="MoneyMaker Event Bus"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* LOGGING */}
          <div className="break-inside-avoid">
            <div className="flex justify-center mb-6">
              <div className={`w-full max-w-lg rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                <Image
                  src="/moneymaker/moneymaker_logging.png"
                  alt="MoneyMaker Logging"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
            <div className="text-center max-w-md mx-auto">
              <h2 className={`text-3xl font-semibold mb-3 ${theme.text.sectionTitle}`}>
                Logging
              </h2>
              <p className={`${theme.text.body} leading-relaxed`}>
                A general application log and a dedicated trade log records every signal, 
                execution, price, and outcome. All in a consistently formatted structure.
              </p>
            </div>
          </div>

          {/* TEST SUITE */}
          <div className="break-inside-avoid">
            <div className="text-center max-w-md mx-auto mb-6">
              <h2 className={`text-3xl font-semibold mb-3 ${theme.text.sectionTitle}`}>
                Test Suite
              </h2>
              <p className={`${theme.text.body} leading-relaxed`}>
                The project includes four test modules covering algorithm logic, 
                paper broker correctness, market data validation, and live Avanza API integration.
              </p>
            </div>
            <div className="flex justify-center mb-6">
              <div className={`w-full max-w-lg rounded-2xl overflow-hidden p-2 shadow-xl ${theme.surfaces.card}`}>
                <Image
                  src="/moneymaker/moneymaker_testsuite.png"
                  alt="MoneyMaker Test Suite"
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain rounded-xl"
                />
              </div>
            </div>
          </div>

        </div>

        {/* TECH */}
        <div className="mt-24">
          <h2 className={`text-3xl font-semibold mb-8 text-center ${theme.text.sectionTitle}`}>
            Tech &amp; Tools Used
          </h2>
          <SkillsTable
            skills={[
              { category: "Backend", items: "Python, systemd, libs (ex. avanza-api, yfinance)" },
              { category: "Hardware", items: "Raspberry Pi 3B, components (ex. MAX7219 8-digit 7-segment display)" },
              { category: "Tools", items: "Remote SSH, Git, Soldering station" },
            ]}
          />
        </div>

      </div>
    </div>
  );
}

export default function MoneyMaker() {
  return (
    <ThemeProvider theme={moneymakerTheme}>
      <MoneyMakerContent />
    </ThemeProvider>
  );
}