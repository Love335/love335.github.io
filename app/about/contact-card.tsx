"use client";

import { useState } from "react";
import Card from "../components/card";
import { cn } from "../lib/cn";
import { RANDOM_CONTACTS } from "./random-contacts";

const CONTACTS = [
  {
    text: "loveskon335@gmail.com",
    href: "mailto:loveskon335@gmail.com",
    copy: "loveskon335@gmail.com",
  },
  {
    text: "+46 76 312 79 36",
    href: "tel:+46763127936",
    copy: "+46763127936",
  },
  {
    text: "Ryttaregatan 5b, Malmö",
    href: "https://www.google.com/maps/search/?api=1&query=Ryttaregatan+5b,+Malm%C3%B6",
    copy: "Ryttaregatan 5b, Malmö",
    external: true,
  },
];

function CopyButton({
  size = "md",
  onClick,
  children,
}: {
  size?: "md" | "sm";
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 cursor-pointer border border-border bg-surface-elevated font-mono text-xs transition-all hover:bg-background",
        size === "md" ? "rounded-2xl px-5 py-3 sm:px-6" : "rounded-xl px-4 py-2",
      )}
    >
      {children}
    </button>
  );
}

export default function ContactCard() {
  const [copied, setCopied] = useState<string | null>(null);
  const [random, setRandom] = useState<{ number: string; flag: string } | null>(null);

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied((current) => (current === text ? null : current)), 2000);
    });
  };

  const copyLabel = (text: string) => (copied === text ? "✅ COPIED!" : "COPY");

  const generateRandom = () => {
    const country = RANDOM_CONTACTS[Math.floor(Math.random() * RANDOM_CONTACTS.length)];
    let number = country.code;
    for (let i = 0; i < country.length; i++) number += Math.floor(Math.random() * 10);
    setRandom({ number, flag: country.flag });
  };

  return (
    <Card className="h-full p-6 sm:p-8">
      <h3 className="mb-6 text-2xl font-semibold tracking-[-1px] text-primary sm:mb-8 sm:text-3xl">
        Get in touch with me!
      </h3>

      <div className="space-y-6 text-foreground sm:space-y-7">
        {CONTACTS.map((contact) => (
          <div key={contact.copy} className="flex items-center justify-between gap-4">
            <a
              href={contact.href}
              {...(contact.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="min-w-0 break-words text-lg font-medium transition-colors hover:text-primary"
            >
              {contact.text}
            </a>
            <CopyButton onClick={() => copy(contact.copy)}>{copyLabel(contact.copy)}</CopyButton>
          </div>
        ))}

        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted">
            OR with someone else!
          </span>
          <CopyButton size="sm" onClick={generateRandom}>
            RANDOM
          </CopyButton>
        </div>

        {random && (
          <div className="flex items-center justify-between gap-4">
            <a
              href={`tel:${random.number}`}
              className="flex min-w-0 items-center gap-3 text-lg font-medium transition-colors hover:text-primary"
            >
              <span className="text-2xl">{random.flag}</span>
              <span className="break-all">{random.number}</span>
            </a>
            <CopyButton size="sm" onClick={() => copy(random.number)}>
              {copyLabel(random.number)}
            </CopyButton>
          </div>
        )}
      </div>
    </Card>
  );
}
