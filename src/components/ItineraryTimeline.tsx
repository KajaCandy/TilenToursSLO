"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

const STROKE = "stroke-current fill-none";

// Each entry is a JSX node rendering inside a 28px SVG.
const ICONS: ReactNode[] = [
  // 1. Pickup - car
  <g key="car">
    <path d="M3 13h18l-2-6H5l-2 6Z" />
    <path d="M3 13v5h2v-2h14v2h2v-5" />
    <circle cx="7.5" cy="16" r="1.25" className="fill-current" />
    <circle cx="16.5" cy="16" r="1.25" className="fill-current" />
  </g>,
  // 2. Gorge - water drop
  <g key="drop">
    <path d="M12 3.5c3 4 5.5 6.7 5.5 10a5.5 5.5 0 1 1-11 0c0-3.3 2.5-6 5.5-10Z" />
  </g>,
  // 3. Viewpoint - mountain peaks
  <g key="mountain">
    <path d="M3 19h18L15 8l-3 5-2-3L3 19Z" />
    <circle cx="17" cy="6.5" r="1.5" />
  </g>,
  // 4. Relax - sun
  <g key="sun">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4" />
  </g>,
  // 5. Lunch - fork & knife
  <g key="utensils">
    <path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v4a2 2 0 0 0 2 2M9 3v4a2 2 0 0 1-2 2" />
    <path d="M17 3c-1.5 0-3 1-3 4s1.5 4 3 4v10" />
  </g>,
  // 6. Drive - winding road
  <g key="road">
    <path d="M6 21c0-3 4-3 4-6s-4-3-4-6 4-3 4-6" />
    <path d="M14 3c0 3 4 3 4 6s-4 3-4 6 4 3 4 6" />
  </g>,
  // 7. Coast - sun + waves
  <g key="coast">
    <circle cx="12" cy="9" r="3" />
    <path d="M3 17c2 0 2-1.5 4.5-1.5S10 17 12 17s2-1.5 4.5-1.5S19 17 21 17" />
    <path d="M3 20c2 0 2-1.5 4.5-1.5S10 20 12 20s2-1.5 4.5-1.5S19 20 21 20" />
  </g>,
  // 8. Return - sunset (sun half on horizon)
  <g key="sunset">
    <path d="M3 18h18" />
    <path d="M7 18a5 5 0 0 1 10 0" />
    <path d="M12 5v3M5 8.5l1.7 1.7M19 8.5l-1.7 1.7M3 14h2M19 14h2" />
  </g>,
  // 9. Drop-off - map pin
  <g key="pin">
    <path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </g>,
];

interface Step {
  time: string;
  name: string;
  duration: string;
  desc: string;
  more?: string;
}

export default function ItineraryTimeline() {
  const t = useTranslations("itinerary");
  const steps = t.raw("steps") as Step[];
  const readMore = t("readMore");
  const showLess = t("showLess");

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-px bg-forest-200" />
      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
            <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-forest-50 border-2 border-forest-300 flex items-center justify-center text-forest-700 z-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={STROKE}
                aria-hidden
              >
                {ICONS[i] ?? ICONS[ICONS.length - 1]}
              </svg>
            </div>
            <div className="pt-2 pb-2 flex-1 min-w-0">
              <span className="text-xs font-medium text-forest-500 uppercase tracking-wider">{step.time}</span>
              <h3 className="font-display text-xl text-forest-900 mt-1 mb-0.5">{step.name}</h3>
              <span className="text-xs text-beige-500 font-medium">{step.duration}</span>
              <p className="text-forest-600 text-sm mt-2 leading-relaxed">{step.desc}</p>
              {step.more && (
                <details className="group mt-3">
                  <summary className="cursor-pointer list-none inline-flex items-center gap-1 text-xs font-medium text-forest-700 hover:text-forest-900 transition-colors">
                    <span className="group-open:hidden">{readMore}</span>
                    <span className="hidden group-open:inline">{showLess}</span>
                    <svg
                      className="w-3 h-3 transition-transform group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-forest-600 text-sm leading-relaxed border-l-2 border-forest-200 pl-4">
                    {step.more}
                  </p>
                </details>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
