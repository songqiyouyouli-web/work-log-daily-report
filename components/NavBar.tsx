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
    <nav className="flex gap-2 border-b border-black/10 bg-white px-4 py-3">
      <div className="mx-auto flex w-full max-w-md gap-2 sm:max-w-xl">
        {LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              data-active={isActive}
              className="flex-1 rounded-lg px-4 py-2 text-center text-sm font-semibold text-zinc-600 data-[active=true]:bg-[#2a78d6] data-[active=true]:text-white"
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
