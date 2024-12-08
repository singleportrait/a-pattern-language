"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();
  return (
    <menu className="fixed z-10 left-0 top-0 bg-accent w-full px-3 flex justify-end text-sm h-10 items-center">
      {pathname === "/" ? (
        <h1 className="uppercase text-right">A Pattern Language</h1>
      ) : (
        <Link href="/" className="uppercase text-right">
          A Pattern Language
        </Link>
      )}
    </menu>
  );
};

export default Menu;
