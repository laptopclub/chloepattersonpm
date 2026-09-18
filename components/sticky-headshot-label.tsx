"use client";

import { useEffect, useRef, useState } from "react";

type FixedLabelLayout = {
  isFixed: boolean;
  left: number;
  width: number;
};

export function StickyHeadshotLabel() {
  const anchorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [fixedLayout, setFixedLayout] = useState<FixedLabelLayout>({ isFixed: false, left: 0, width: 0 });

  useEffect(() => {
    function updateFixedLayout() {
      const anchor = anchorRef.current;
      const label = labelRef.current;

      if (!anchor || !label) {
        return;
      }

      const shouldFix = anchor.getBoundingClientRect().top <= 24;

      if (!shouldFix) {
        setFixedLayout({ isFixed: false, left: 0, width: 0 });
        return;
      }

      const labelRect = label.getBoundingClientRect();
      setFixedLayout({ isFixed: true, left: labelRect.left, width: labelRect.width });
    }

    updateFixedLayout();
    window.addEventListener("scroll", updateFixedLayout, { passive: true });
    window.addEventListener("resize", updateFixedLayout);

    return () => {
      window.removeEventListener("scroll", updateFixedLayout);
      window.removeEventListener("resize", updateFixedLayout);
    };
  }, []);

  return (
    <div className="z-10 col-start-1 row-start-1 m-5 justify-self-end self-start sm:m-6" ref={anchorRef}>
      <div
        className={
          fixedLayout.isFixed
            ? "fixed top-6 z-50 rounded-xl bg-surface-muted/50 px-5 py-4 text-right text-brand-600 shadow-sm backdrop-blur"
            : "rounded-xl bg-surface-muted/50 px-5 py-4 text-right text-brand-600 shadow-sm backdrop-blur"
        }
        ref={labelRef}
        style={fixedLayout.isFixed ? { left: fixedLayout.left, width: fixedLayout.width } : undefined}
      >
        <p className="text-base font-black uppercase leading-none">Chloe Patterson</p>
        <p className="mt-2 text-xs font-bold uppercase">Project Manager</p>
      </div>
    </div>
  );
}
