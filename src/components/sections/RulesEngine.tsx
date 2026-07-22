"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp, MoonStar } from "lucide-react";
import { LEAGUE_RULES } from "@/lib/data";
import { cn } from "@/lib/utils";

const CATEGORIES = ["All", "Format", "Players", "Pitching", "Conduct", "Safety", "Cultural"];
const CATEGORY_MAP: Record<string, string[]> = {
  "Format": ["format", "innings", "time limit", "mercy rule", "tiebreaker", "playoff", "forfeit"],
  "Players": ["roster", "players", "substitution", "DH", "designated hitter", "minimum"],
  "Pitching": ["pitching", "pitch count", "balk", "hit by pitch"],
  "Conduct": ["conduct", "fighting", "alcohol", "uniform", "sportsmanship", "discipline", "ejection", "suspension", "ban", "umpire"],
  "Safety": ["weather", "lightning", "rain", "heat", "safety", "equipment"],
  "Cultural": ["azan", "prayer", "cultural", "pause"],
};

function RuleCard({ rule }: { rule: typeof LEAGUE_RULES[0] }) {
  const [open, setOpen] = useState(false);
  const isAzan = rule.tags.includes("azan");

  return (
    <div
      className={cn(
        "glass-card overflow-hidden transition-all duration-200",
        isAzan && "border-amber-500/25",
        open && "border-white/12"
      )}
      style={isAzan ? { border: "1px solid rgba(245,166,35,0.25)", background: "rgba(245,166,35,0.02)" } : {}}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-5 sm:p-6 text-left hover:bg-white/[0.02] transition-colors"
        aria-expanded={open}
        aria-controls={`rule-${rule.section.replace(".", "-")}-${rule.title.replace(/\s+/g, "-")}`}
      >
        <div className="flex items-start gap-3 min-w-0">
          {isAzan && (
            <MoonStar
              size={16}
              className="shrink-0 mt-0.5"
              style={{ color: "var(--gold-400)" }}
              aria-label="Cultural protocol"
            />
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span
                className="text-xs font-bold font-heading uppercase tracking-widest shrink-0"
                style={{ color: isAzan ? "var(--gold-400)" : "var(--crimson-400)" }}
              >
                §{rule.section}
              </span>
              <h3 className="font-heading font-semibold text-base sm:text-lg" style={{ color: "var(--slate-50)" }}>
                {rule.title}
              </h3>
            </div>
            {!open && (
              <p
                className="text-sm line-clamp-1 truncate"
                style={{ color: "var(--slate-500)" }}
              >
                {rule.content}
              </p>
            )}
          </div>
        </div>
        <div className="shrink-0 mt-1" aria-hidden="true">
          {open
            ? <ChevronUp size={16} style={{ color: "var(--slate-400)" }} />
            : <ChevronDown size={16} style={{ color: "var(--slate-400)" }} />
          }
        </div>
      </button>
      {open && (
        <div
          id={`rule-${rule.section.replace(".", "-")}-${rule.title.replace(/\s+/g, "-")}`}
          className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0"
        >
          <div className="divider mb-4" />
          <p className="text-sm sm:text-base leading-relaxed mb-4" style={{ color: "var(--slate-300)" }}>
            {rule.content}
          </p>
          <div className="flex flex-wrap gap-2">
            {rule.tags.map((tag) => (
              <span key={tag} className="badge badge-navy" style={{ fontSize: "0.7rem" }}>{tag}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function RulesEngine() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredRules = useMemo(() => {
    let rules = LEAGUE_RULES;

    if (category !== "All" && CATEGORY_MAP[category]) {
      const catTags = CATEGORY_MAP[category];
      rules = rules.filter((r) => r.tags.some((t) => catTags.includes(t)));
    }

    if (query.trim()) {
      const lq = query.toLowerCase();
      rules = rules.filter(
        (r) =>
          r.title.toLowerCase().includes(lq) ||
          r.content.toLowerCase().includes(lq) ||
          r.section.includes(lq) ||
          r.tags.some((t) => t.includes(lq))
      );
    }

    return rules;
  }, [query, category]);

  return (
    <div>
      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "var(--slate-500)" }}
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="form-field pl-11"
            placeholder="Search rules — e.g. DH, mercy rule, azan..."
            aria-label="Search rules"
          />
        </div>
      </div>

      {/* Category pills */}
      <div
        className="flex flex-wrap gap-2 mb-8"
        role="group"
        aria-label="Filter rules by category"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "badge transition-all cursor-pointer",
              category === cat ? "badge-crimson" : "badge-navy hover:border-white/20"
            )}
            aria-pressed={category === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm mb-6" style={{ color: "var(--slate-500)" }} aria-live="polite">
        Showing <strong style={{ color: "var(--slate-200)" }}>{filteredRules.length}</strong> of {LEAGUE_RULES.length} rules
      </p>

      {/* Rules list */}
      <div className="space-y-3" role="list" aria-label="League rules">
        {filteredRules.length === 0 ? (
          <div className="glass-card p-10 text-center">
            <p style={{ color: "var(--slate-400)" }}>No rules matched &ldquo;{query}&rdquo;. Try different keywords.</p>
          </div>
        ) : (
          filteredRules.map((rule) => (
            <div key={`${rule.section}-${rule.title}`} role="listitem">
              <RuleCard rule={rule} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
