"use client";

import { Fragment, useEffect, useState } from "react";

const LAYERS = [
  { src: "/media/Parallax/optimized/5.webp", rate: 0.5 },
  { src: "/media/Parallax/optimized/4.webp", rate: 0.36 },
  { src: "/media/Parallax/optimized/3.webp", rate: 0.24 },
  { src: "/media/Parallax/optimized/2.webp", rate: 0.12 },
  { src: "/media/Parallax/optimized/1.webp", rate: 0 },
];

export default function HeroParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const fadeMask =
    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.4) 8%, #000 18%)";

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #81A2A7 0%, #8eb4bb 35%, #7fb9c9 65%, #5bb6d3 100%)",
      }}
    >
      {LAYERS.map((l, i) => {
        const isFurthest = i === 0;
        const isLayer4 = i === 1;
        return (
          <Fragment key={l.src}>
            <img
              src={l.src}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover object-bottom select-none pointer-events-none"
              style={{
                transform: `translate3d(0, ${scrollY * l.rate}px, 0)`,
                willChange: "transform",
                ...(isFurthest && {
                  WebkitMaskImage: fadeMask,
                  maskImage: fadeMask,
                }),
              }}
              loading="eager"
              fetchPriority={i < 2 ? "high" : "auto"}
              draggable={false}
            />
            {/* Vignette sits in front of layers 5 and 4, behind 3/2/1,
                so it tints sky + distant ridges without muddying the foreground. */}
            {isLayer4 && (
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-2/3 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(20,28,38,0.55) 0%, rgba(20,28,38,0.22) 45%, transparent 100%)",
                }}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
