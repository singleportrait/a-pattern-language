'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const titleClasses =
  'px-3 uppercase text-right sm:text-left sm:w-57 sm:bg-accent-200 sm:border-r-4 sm:border-r-white flex items-center';

const Menu = () => {
  const pathname = usePathname();
  return (
    <menu className="fixed z-10 left-0 top-0 bg-accent-200 w-full flex justify-end sm:justify-start text-sm h-10 items-stretch">
      {pathname === '/' ? (
        <h1 className={titleClasses}>A Pattern Language</h1>
      ) : (
        <Link href="/" className={titleClasses}>
          A Pattern Language
        </Link>
      )}
    </menu>
  );
};

export default Menu;
