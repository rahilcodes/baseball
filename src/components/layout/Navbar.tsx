"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/teams", label: "Teams" },
  { href: "/schedule", label: "Schedule" },
  { href: "/standings", label: "Standings" },
  { href: "/rules", label: "Rules" },
  { href: "/sponsorship", label: "Sponsors" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[rgba(2,11,24,0.92)] backdrop-blur-[16px] border-b border-white/[0.06]"
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="section-container">
          <nav
            className="flex items-center justify-between h-16 md:h-20"
            aria-label="Main navigation"
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0"
              aria-label="Baseball Premier League — Home"
            >
              <Image
                src="/images/bpl_logo_with word.png"
                alt="BPL Logo"
                width={150}
                height={40}
                priority
                className="object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-1" role="list">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive = pathname === href || pathname.startsWith(href + "/");
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150",
                        isActive
                          ? "text-white bg-white/10"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.06]"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
              <Button variant="primary" size="sm" asChild>
                <Link href="/register">Register Now</Link>
              </Button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-80 max-w-full glass-card rounded-none rounded-l-2xl",
            "transition-transform duration-300 ease-out p-8 flex flex-col",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/bpl_logo_with word.png" alt="BPL" width={120} height={32} className="object-contain" />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-slate-400 hover:text-white"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <ul className="flex flex-col gap-1 flex-1" role="list">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "text-white bg-crimson-500/20 border border-crimson-500/30"
                        : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
                    )}
                    style={isActive ? { borderColor: "rgba(227,27,35,0.3)", background: "rgba(227,27,35,0.1)" } : {}}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="pt-6 border-t border-white/[0.06] space-y-3">
            <Button variant="outline" size="md" asChild className="w-full">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="primary" size="md" asChild className="w-full">
              <Link href="/register">Register Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
