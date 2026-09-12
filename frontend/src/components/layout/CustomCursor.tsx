"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const pos = useRef({
    x: -100,
    y: -100,
    rx: -100,
    ry: -100,
  });

  const rafRef = useRef<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Mouse movement
    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;

      dot.style.left = `${e.clientX}px`;
      dot.style.top = `${e.clientY}px`;
    };

    // Smooth ring animation
    const animate = () => {
      pos.current.rx +=
        (pos.current.x - pos.current.rx) * 0.11;

      pos.current.ry +=
        (pos.current.y - pos.current.ry) * 0.11;

      ring.style.left = `${pos.current.rx}px`;
      ring.style.top = `${pos.current.ry}px`;

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Hover effect
    const onEnter = () => {
      ring.style.width = "54px";
      ring.style.height = "54px";
      ring.style.borderColor = "#DFFF1A";
      ring.style.opacity = "1";
    };

    const onLeave = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(255,255,255,0.5)";
      ring.style.opacity = "0.6";
    };

    // Click effect
    const onClick = () => {
      dot.style.transform =
        "translate(-50%, -50%) scale(2)";

      window.setTimeout(() => {
        dot.style.transform =
          "translate(-50%, -50%) scale(1)";
      }, 150);
    };

    // Add hover listeners
    const addHoverListeners = () => {
      document
        .querySelectorAll<HTMLElement>(
          "a, button, [data-hover]"
        )
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);

          el.addEventListener("mouseenter", onEnter);
          el.addEventListener("mouseleave", onLeave);
        });
    };

    // Window enter / leave
    const onLeaveWindow = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onEnterWindow = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "0.6";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("click", onClick);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    addHoverListeners();

    // Watch dynamically added elements
    const observer = new MutationObserver(() => {
      addHoverListeners();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("click", onClick);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);

      document
        .querySelectorAll<HTMLElement>(
          "a, button, [data-hover]"
        )
        .forEach((el) => {
          el.removeEventListener("mouseenter", onEnter);
          el.removeEventListener("mouseleave", onLeave);
        });

      observer.disconnect();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          width: "8px",
          height: "8px",
          background: "#DFFF1A",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99999,
          left: "-100px",
          top: "-100px",
          transform: "translate(-50%, -50%)",
          transition: "transform 0.15s ease",
          mixBlendMode: "difference",
        }}
      />

      {/* Cursor Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          width: "36px",
          height: "36px",
          border: "1.5px solid rgba(255,255,255,0.5)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          left: "-100px",
          top: "-100px",
          transform: "translate(-50%, -50%)",
          transition:
            "width 0.25s ease, height 0.25s ease, border-color 0.2s ease, opacity 0.2s ease",
          opacity: 0.6,
        }}
      />
    </>
  );
}