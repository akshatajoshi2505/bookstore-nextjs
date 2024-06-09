'use client';

import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { BookOpenIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function NovelNestLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" /> */}
      <BookOpenIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">NovelNest</p>
    </div>
  );
}
