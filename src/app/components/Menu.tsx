'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const titleClasses = 'px-3 uppercase text-right flex items-center';

const Menu = () => {
  const pathname = usePathname();
  return (
    <menu className="fixed z-10 left-0 top-0 bg-accent-200 w-full flex justify-end text-sm h-11 items-stretch border-b-4 border-white">
      {pathname === '/' ? (
        <h1 className={titleClasses}>A Pattern Language</h1>
      ) : (
        <Link href="/" className={classNames(titleClasses, 'underline underline-offset-2')}>
          A Pattern Language
        </Link>
      )}
    </menu>
  );
};

export default Menu;
