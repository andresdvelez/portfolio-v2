"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    ...(pathname === "/work" ? [{ label: "Projects", href: "/work" }] : []),
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="pb-6 pt-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/45 sm:text-xs"
    >
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index > 0 && <span className="mx-2 text-white/25">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-white/70" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-white/45 transition-colors hover:text-white/90"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
