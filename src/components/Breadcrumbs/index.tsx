"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();

  // No mostrar breadcrumbs en la página principal
  if (pathname === "/") {
    return null;
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    ...(pathname === "/work" ? [{ label: "Projects", href: "/work" }] : []),
  ];

  return (
    <nav aria-label="Breadcrumb" className="content-container pt-24 pb-4">
      <ol className="flex items-center gap-2 text-sm text-white/60">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-white/90 font-medium" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-white/90 transition-colors"
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


