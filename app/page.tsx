import React from 'react';

import { auth } from '@/app/auth';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import * as actions from '@/app/actions';

const HomePage: React.FC = async () => {
  const session = await auth();
  return (
      <main className="flex min-h-screen flex-col p-6 bg-teal-50">
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-teal-700 px-6 py-10 md:w-2/5 md:px-20 text-white">
            <p className="text-xl md:text-3xl md:leading-normal">
              <strong>Welcome to NovelNest.</strong> Dive into our world of endless stories and{' '}
              <Link href="/products" className="text-yellow-300">
                explore our collection
              </Link>
              . Let your next adventure begin here!
            </p>
            
              <form action={actions.signIn}>
                <button type='submit' className="flex items-center gap-5 self-start rounded-lg bg-teal-800 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-900 hover:text-yellow-300 md:text-base">Sign In </button>
              </form>
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
