"use client";

import { useEffect, useRef, useState } from "react";

export function StickyHeadshotLabel() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    function updateIsFixed() {
      const anchor = anchorRef.current;

      if (!anchor) {
        return;
      }

      setIsFixed(anchor.getBoundingClientRect().top <= 24);
    }

    updateIsFixed();
    window.addEventListener("scroll", updateIsFixed, { passive: true });
    window.addEventListener("resize", updateIsFixed);

    return () => {
      window.removeEventListener("scroll", updateIsFixed);
      window.removeEventListener("resize", updateIsFixed);
    };
  }, []);

  return (
    <div className="z-10 col-start-1 row-start-1 m-5 justify-self-end self-start sm:m-6" ref={anchorRef}>
      <div
        className={
          isFixed
            ? "fixed right-5 top-6 z-50 rounded-xl bg-surface-canvas/90 px-5 py-4 text-right text-brand-600 shadow-sm backdrop-blur sm:right-6"
            : "rounded-xl bg-surface-canvas/90 px-5 py-4 text-right text-brand-600 shadow-sm backdrop-blur"
        }
      >
        <p className="text-base font-black uppercase leading-none">Chloe Patterson</p>
        <p className="mt-2 text-xs font-bold uppercase">Project Manager</p>
      </div>
    </div>
  );
}
