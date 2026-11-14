"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "記録" },
  { href: "/summary", label: "集計" },
];

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-black/5 bg-[#fbfaf7] px-4 py-3 shadow-sm">
      <div className="mx-auto flex w-full max-w-md gap-2 sm:max-w-xl">
        {LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              data-active={isActive}
              className="flex-1 rounded-xl px-4 py-2 text-center text-sm font-semibold text-[#5e5953] transition-colors data-[active=true]:bg-[#5a7389] data-[active=true]:text-white data-[active=true]:shadow-sm"
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
