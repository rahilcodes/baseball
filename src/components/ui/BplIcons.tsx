/**
 * BplIcons — Bespoke baseball-specific SVG icon set for Baseball Premier League.
 * All icons are stroke-style with consistent 2px stroke width, matching Lucide's visual weight.
 * Drop-in compatible: accepts `size`, `className`, `style`, and `aria-hidden` props.
 */

import type { CSSProperties } from "react";

interface IconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
  "aria-hidden"?: "true" | "false";
}

const defaults = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: "1.75",
};

// ⚾ Stitched Baseball — classic ball with two curved stitch arcs
export function BaseballIcon({ size = 24, className, style, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <svg {...defaults} width={size} height={size} className={className} style={style} aria-hidden={ariaHidden} stroke="currentColor">
      <circle cx="12" cy="12" r="9" />
      {/* Left stitch curve */}
      <path d="M8.5 4.5 C7 7 7 10 8 12 C7 14 7 17 8.5 19.5" />
      {/* Right stitch curve */}
      <path d="M15.5 4.5 C17 7 17 10 16 12 C17 14 17 17 15.5 19.5" />
      {/* Horizontal stitch marks */}
      <path d="M8 10 L9.5 10.5" />
      <path d="M14.5 10.5 L16 10" />
      <path d="M8 13.5 L9.5 13" />
      <path d="M14.5 13 L16 13.5" />
    </svg>
  );
}

// 🏏 Bat & Ball — bat making contact, angled at 45°
export function BatIcon({ size = 24, className, style, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <svg {...defaults} width={size} height={size} className={className} style={style} aria-hidden={ariaHidden} stroke="currentColor">
      {/* Bat — thin handle tapering to barrel */}
      <line x1="5" y1="19" x2="18" y2="6" strokeWidth="1.75" />
      {/* Barrel width hint at top */}
      <path d="M15 4.5 C16.5 4 18 5 18.5 6.5 C19 8 18 9.5 16.5 9.5" strokeWidth="1.75" />
      {/* Ball */}
      <circle cx="7.5" cy="16.5" r="3" />
      <path d="M6 15 C6.5 14.5 7.5 15 7.5 15.5" strokeWidth="1.25" />
      <path d="M7.5 17.5 C8 17 9 17.5 9 18" strokeWidth="1.25" />
    </svg>
  );
}

// 💎 Baseball Diamond — bird's-eye infield with bases at corners
export function DiamondIcon({ size = 24, className, style, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <svg {...defaults} width={size} height={size} className={className} style={style} aria-hidden={ariaHidden} stroke="currentColor">
      {/* Diamond outline: home → 1B → 2B → 3B → home */}
      <polygon points="12,20 20,12 12,4 4,12" />
      {/* Base dots */}
      <circle cx="12" cy="20" r="1.25" fill="currentColor" stroke="none" /> {/* Home */}
      <circle cx="20" cy="12" r="1" fill="currentColor" stroke="none" />   {/* 1B */}
      <circle cx="12" cy="4"  r="1" fill="currentColor" stroke="none" />   {/* 2B */}
      <circle cx="4"  cy="12" r="1" fill="currentColor" stroke="none" />   {/* 3B */}
      {/* Pitcher's mound */}
      <circle cx="12" cy="12" r="1.5" />
    </svg>
  );
}

// ⛑ Batter's Helmet — profile view of batting helmet
export function HelmetIcon({ size = 24, className, style, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <svg {...defaults} width={size} height={size} className={className} style={style} aria-hidden={ariaHidden} stroke="currentColor">
      {/* Dome of helmet */}
      <path d="M5 14 C5 8.477 8.134 4 12 4 C15.866 4 19 8.477 19 14" />
      {/* Brim extending forward */}
      <path d="M5 14 L3 14 L3 15.5 L19 15.5 L19 14" />
      {/* Ear flap */}
      <path d="M5 14 L5 18 C5 18.5 5.4 19 6 19 L8 19 L8 15.5" />
    </svg>
  );
}

// 🏠 Home Plate — pentagon home plate with a subtle star above it
export function HomeBaseIcon({ size = 24, className, style, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <svg {...defaults} width={size} height={size} className={className} style={style} aria-hidden={ariaHidden} stroke="currentColor">
      {/* Home plate pentagon */}
      <polygon points="12,19 18,15 18,9 6,9 6,15" />
      {/* Star above plate */}
      <path d="M12 3 L13 6 L16 6 L13.5 8 L14.5 11 L12 9.5 L9.5 11 L10.5 8 L8 6 L11 6 Z" strokeWidth="1" />
    </svg>
  );
}

// 📋 Scoreboard — classic inning-grid scoreboard
export function ScoreboardIcon({ size = 24, className, style, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <svg {...defaults} width={size} height={size} className={className} style={style} aria-hidden={ariaHidden} stroke="currentColor">
      {/* Board outline */}
      <rect x="2" y="4" width="20" height="16" rx="2" />
      {/* Horizontal divider */}
      <line x1="2" y1="10" x2="22" y2="10" />
      {/* Vertical dividers for innings */}
      <line x1="7" y1="4" x2="7" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="17" y1="4" x2="17" y2="20" />
      {/* Sample score dots in cells */}
      <circle cx="4.5"  cy="15" r="1" fill="currentColor" stroke="none" />
      <circle cx="9.5"  cy="15" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="15" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// 🤾 Pitcher — simplified throwing-arm silhouette
export function PitcherIcon({ size = 24, className, style, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <svg {...defaults} width={size} height={size} className={className} style={style} aria-hidden={ariaHidden} stroke="currentColor">
      {/* Head */}
      <circle cx="14" cy="4.5" r="2" />
      {/* Body */}
      <line x1="14" y1="6.5" x2="12" y2="14" />
      {/* Pitching arm raised */}
      <path d="M14 9 C16 7 19 5 21 4" />
      {/* Ball at release */}
      <circle cx="21" cy="4" r="1.5" />
      {/* Glove arm down and forward */}
      <path d="M13 10 C10 11 8 13 7 15" />
      {/* Stride leg */}
      <path d="M12 14 L10 20 L8 20" />
      {/* Pivot leg */}
      <path d="M12 14 L14 20 L16 20" />
    </svg>
  );
}

// 🧤 Fielder's Glove — classic catcher/fielder mitt outline
export function GloveIcon({ size = 24, className, style, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <svg {...defaults} width={size} height={size} className={className} style={style} aria-hidden={ariaHidden} stroke="currentColor">
      {/* Palm / mitt body */}
      <path d="M5 20 C4 20 3 19 3 18 L3 12 C3 10.5 4.5 9.5 6 10 L6 8 C6 6.9 6.9 6 8 6 L8 7 C9 7 9 8 9 8 L9 6.5 C9 5.4 9.9 4.5 11 4.5 C12.1 4.5 13 5.4 13 6.5 L13 8 C14 8 14 7 15 7 L15 6 C16.1 6 17 6.9 17 8 L17 12 C19 12 21 13.5 21 16 C21 18.5 19 20 17 20 Z" />
      {/* Web between thumb and forefinger */}
      <path d="M8 8 C9 10 13 10 13 8" />
    </svg>
  );
}

// 👕 Jersey — sleeveless baseball jersey outline
export function JerseyIcon({ size = 24, className, style, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <svg {...defaults} width={size} height={size} className={className} style={style} aria-hidden={ariaHidden} stroke="currentColor">
      {/* Jersey body */}
      <path d="M8 3 L4 7 L7 9 L7 21 L17 21 L17 9 L20 7 L16 3" />
      {/* Collar V-neck */}
      <path d="M8 3 L12 7 L16 3" />
      {/* Number hint lines */}
      <line x1="10" y1="13" x2="14" y2="13" strokeWidth="1.5" />
      <line x1="10" y1="16" x2="14" y2="16" strokeWidth="1.5" />
    </svg>
  );
}

// 🎯 Strike Zone — rectangle over home plate marking the hitting zone
export function StrikeZoneIcon({ size = 24, className, style, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <svg {...defaults} width={size} height={size} className={className} style={style} aria-hidden={ariaHidden} stroke="currentColor">
      {/* Home plate */}
      <polygon points="12,22 17,18 17,16 7,16 7,18" />
      {/* Strike zone box */}
      <rect x="7" y="5" width="10" height="11" rx="1" />
      {/* Center cross-hair */}
      <line x1="12" y1="5"  x2="12" y2="16" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="7"  y1="10.5" x2="17" y2="10.5" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

// 🏃 Base Runner — simplified runner silhouette on basepath
export function BaseRunnerIcon({ size = 24, className, style, "aria-hidden": ariaHidden }: IconProps) {
  return (
    <svg {...defaults} width={size} height={size} className={className} style={style} aria-hidden={ariaHidden} stroke="currentColor">
      {/* Head */}
      <circle cx="16" cy="4" r="1.75" />
      {/* Torso leaning forward */}
      <path d="M16 5.75 L13 11" />
      {/* Lead arm forward */}
      <path d="M15.5 8 L12 9.5" />
      {/* Trail arm back */}
      <path d="M14.5 8.5 L17 10.5" />
      {/* Stride leg forward */}
      <path d="M13 11 L11 17 L9 19" />
      {/* Drive leg back */}
      <path d="M13 11 L15 16 L17 18" />
      {/* Base corner */}
      <rect x="6" y="18" width="3" height="3" rx="0.5" />
      {/* Base path line */}
      <line x1="9" y1="21" x2="20" y2="21" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}
