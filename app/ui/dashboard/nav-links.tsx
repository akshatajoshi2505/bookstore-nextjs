'use client';

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { BookOpenIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
  {name: 'Subscriptions', href: '/dashboard/subscriptions', icon: RocketLaunchIcon},
  {name:'Books' ,href:'/dashboard/Books', icon:BookOpenIcon},
  {name:'Categories' ,href:'/dashboard/categories', icon:BookOpenIcon},
  {name:'Orders' ,href:'/dashboard/orders', icon:ShoppingBagIcon}
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-teal-700 p-3 text-sm font-medium hover:bg-teal-800 hover:text-yellow-300 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-teal-800 text-yellow-300': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
