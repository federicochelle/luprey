"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { site, whatsappUrl } from "@/content/site";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header data-tone="crema" className="fixed inset-x-0 top-0 z-50 border-b border-tone-line bg-crema/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6 sm:h-20">
        <Logo />

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {site.menu.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "text-sm font-bold uppercase tracking-wide underline-offset-8 hover:underline",
                    isActive(item.href) && "underline",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <Button href={whatsappUrl()} external>
            Hablemos
          </Button>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex size-11 items-center justify-center md:hidden"
        >
          <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
          <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </Container>

      <nav
        id={menuId}
        aria-label="Menú móvil"
        hidden={!open}
        className="border-t border-tone-line bg-crema md:hidden"
      >
        <Container className="flex flex-col gap-1 py-4">
          {site.menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "py-3 text-xl font-bold uppercase",
                isActive(item.href) ? "text-tone-fg underline underline-offset-8" : "text-tone-accent",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button href={whatsappUrl()} external className="mt-3">
            Hablemos
          </Button>
        </Container>
      </nav>
    </header>
  );
}
