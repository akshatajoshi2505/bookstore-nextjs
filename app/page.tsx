
import React from 'react';

import { auth } from '@/app/auth';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';


const HomePage: React.FC = async () => {
  const session = await auth();
  return (
      <main className="flex min-h-screen flex-col p-6">
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <p className="text-xl text-blue-700 md:text-3xl md:leading-normal">
              <strong>Welcome to NovelNest.</strong> Dive into our world of endless stories and{' '}
              <a href="/browse" className="text-amber-500">
                explore our collection
              </a>
              . Let your next adventure begin here!
            </p>
            <Link
              href="/login"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              {session?.user ? (
                  <><span>Log in {JSON.stringify(session.user)}</span><ArrowRightIcon className="w-5 md:w-6" /></>
                ) : (
                  <div>Signed Out</div>
              )}
            </Link>
          </div>
          <div className="flex items-center justify-center p-6 md:w-3/5 md:py-12">
            <Image
              src="/book-library-homepage.jpg"
              width={1000}
              height={760}
              className="hidden md:block"
              alt="Homepage Image Bookstore"
            />
          </div>
        </div>
      </main>
  );
}

export default HomePage;
