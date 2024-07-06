'use client';

import React from 'react';
import { useCart } from '@/app/lib/CartContext'; // Adjust import path if needed
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import NovelNestLogo from '@/app/ui/NovelNestLogo';
import * as actions from '@/app/actions';

const Header: React.FC = () => {
    const { cart } = useCart();
    const cartCount = cart.reduce((acc, item) => acc + (item.qty || 0), 0);

    return (
        <header className="flex justify-between items-center py-4 px-6 bg-teal-600 text-white shadow-md">
            <NovelNestLogo />
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="hover:text-yellow-300 transition-colors duration-200">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard" className="hover:text-yellow-300 transition-colors duration-200">
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/orders" className="hover:text-yellow-300 transition-colors duration-200">
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link href="/products" className="hover:text-yellow-300 transition-colors duration-200">
                            Products
                        </Link>
                    </li>
                    <li>
                    <form action={actions.signIn}>
                        <button type='submit'>Sign In </button>
                    </form>
                    <form action={actions.signOut}>
                        <button type='submit'>Sign Out</button>
                    </form>
                    </li>
                    <li>
                        <Link href="/cart" className="relative hover:text-yellow-300 transition-colors duration-200">
                            <ShoppingCartIcon className="w-6 h-6" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex items-center justify-center bg-red-500 text-white rounded-full w-5 h-5 text-xs">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
