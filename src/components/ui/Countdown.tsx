"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { getCountdown } from "@/lib/utils";

interface CountdownProps {
  targetDate: Date;
  label?: string;
}

export function Countdown({ targetDate, label = "Season 1 begins" }: CountdownProps) {
  // Start as null so server and initial client render both output "--"
  // preventing the SSR/hydration time mismatch
  const [time, setTime] = useState<ReturnType<typeof getCountdown> | null>(null);

  useEffect(() => {
    // Set immediately on mount, then tick every second
    setTime(getCountdown(targetDate));
    const interval = setInterval(() => {
      setTime(getCountdown(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { value: time?.days ?? null, label: "Days" },
    { value: time?.hours ?? null, label: "Hours" },
    { value: time?.minutes ?? null, label: "Min" },
    { value: time?.seconds ?? null, label: "Sec" },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-medium uppercase tracking-widest" style={{ color: "var(--slate-500)" }}>
        {label}
      </p>
      <div
        className="flex items-center gap-2 sm:gap-4"
        role="timer"
        aria-live="polite"
        aria-label={
          time
            ? `Countdown: ${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`
            : "Countdown loading"
        }
      >
        {units.map(({ value, label: unitLabel }, i) => (
          <React.Fragment key={unitLabel}>
            <div className="flex flex-col items-center">
              <div
                className="glass-card w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center"
                aria-hidden="true"
              >
                <span
                  className="font-heading font-bold text-2xl sm:text-3xl tabular-nums"
                  style={{ color: "var(--slate-50)" }}
                  suppressHydrationWarning
                >
                  {value === null ? "--" : String(value).padStart(2, "0")}
                </span>
              </div>
              <span
                className="text-xs mt-2 font-medium uppercase tracking-widest"
                style={{ color: "var(--slate-500)" }}
              >
                {unitLabel}
              </span>
            </div>
            {i < units.length - 1 && (
              <span
                className="font-heading font-bold text-2xl sm:text-3xl mb-5 select-none"
                style={{ color: "var(--crimson-400)" }}
                aria-hidden="true"
              >
                :
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
