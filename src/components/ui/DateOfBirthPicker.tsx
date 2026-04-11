"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(month: number, year: number) {
  if (!month || !year) return 31;
  return new Date(year, month, 0).getDate(); // month is 1-indexed here
}

interface DateOfBirthPickerProps {
  /** Called with "YYYY-MM-DD" when all three parts are selected, or "" when incomplete */
  onChange: (value: string) => void;
  hasError?: boolean;
  id?: string;
}

export function DateOfBirthPicker({ onChange, hasError, id }: DateOfBirthPickerProps) {
  const [month, setMonth] = useState("");
  const [day, setDay]     = useState("");
  const [year, setYear]   = useState("");

  const currentYear = new Date().getFullYear();
  // Show years from 1940 to current year - 10 (youngest = 10 years, oldest = ~84)
  const years = Array.from({ length: currentYear - 1939 }, (_, i) => currentYear - i);
  const daysInMonth = getDaysInMonth(Number(month), Number(year));
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    if (month && day && year) {
      const mm = String(month).padStart(2, "0");
      const dd = String(day).padStart(2, "0");
      onChange(`${year}-${mm}-${dd}`);
    } else {
      onChange("");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month, day, year]);

  // If day is out of range after month change, reset it
  useEffect(() => {
    if (day && Number(day) > daysInMonth) setDay("");
  }, [daysInMonth, day]);

  const selectClass = cn(
    "form-field",
    hasError && "form-field-error",
  );

  return (
    <div className="grid grid-cols-3 gap-2" role="group" aria-label="Date of birth">
      {/* MONTH */}
      <select
        id={id}
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className={selectClass}
        aria-label="Month"
      >
        <option value="">Month</option>
        {MONTHS.map((name, idx) => (
          <option key={name} value={String(idx + 1).padStart(2, "0")}>
            {name}
          </option>
        ))}
      </select>

      {/* DAY */}
      <select
        value={day}
        onChange={(e) => setDay(e.target.value)}
        className={selectClass}
        aria-label="Day"
      >
        <option value="">Day</option>
        {days.map((d) => (
          <option key={d} value={String(d).padStart(2, "0")}>
            {d}
          </option>
        ))}
      </select>

      {/* YEAR */}
      <select
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className={selectClass}
        aria-label="Year"
      >
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={String(y)}>{y}</option>
        ))}
      </select>
    </div>
  );
}
