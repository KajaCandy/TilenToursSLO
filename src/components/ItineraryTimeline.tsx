"use client";

import { useTranslations } from "next-intl";

const ICONS = ["🚗", "💧", "🌊", "🌿", "🍽️", "🛣️", "🏖️", "🌅", "🏁"];

export default function ItineraryTimeline() {
  const t = useTranslations("itinerary");
  const steps = t.raw("steps") as { time: string; name: string; duration: string; desc: string }[];

  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-px bg-forest-200" />
      <div className="space-y-0">
        {steps.map((step, i) => (
          <div key={i} className="relative flex gap-6 pb-10 last:pb-0">
            <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-forest-50 border-2 border-forest-300 flex items-center justify-center text-2xl z-10">
              {ICONS[i]}
            </div>
            <div className="pt-2 pb-2">
              <span className="text-xs font-medium text-forest-500 uppercase tracking-wider">{step.time}</span>
              <h3 className="font-display text-xl text-forest-900 mt-1 mb-0.5">{step.name}</h3>
              <span className="text-xs text-beige-500 font-medium">{step.duration}</span>
              <p className="text-forest-600 text-sm mt-2 leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
