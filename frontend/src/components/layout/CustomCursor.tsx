"use client";

import React, { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer")
      );
      setIsHovered(isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  // Smooth lagging follower
  useEffect(() => {
    let animationFrameId: number;

    const followCursor = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.18,
        y: prev.y + (pos.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(followCursor);
    };

    animationFrameId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos]);

  if (!isVisible) return null;

  return (
    <>
      {/* Precision Center Dot */}
      <div
        className="pointer-events-none fixed z-index: 99998 rounded-full background-color: #dfff1a transition-transform duration-75 ease-out"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: isHovered ? "12px" : "6px",
          height: isHovered ? "12px" : "6px",
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 12px #dfff1a",
        }}
      />

      {/* Trailing Outer Ring with 3D Aura */}
      <div
        className="pointer-events-none fixed z-index: 99998 rounded-full border transition-all duration-300 ease-out"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovered ? "56px" : "36px",
          height: isHovered ? "56px" : "36px",
          transform: "translate(-50%, -50%)",
          borderColor: isHovered ? "rgba(223, 255, 26, 0.8)" : "rgba(255, 255, 255, 0.25)",
          backgroundColor: isHovered ? "rgba(223, 255, 26, 0.08)" : "transparent",
          backdropFilter: isHovered ? "blur(2px)" : "none",
          boxShadow: isHovered ? "0 0 25px rgba(223, 255, 26, 0.2)" : "none",
        }}
      />
    </>
  );
}