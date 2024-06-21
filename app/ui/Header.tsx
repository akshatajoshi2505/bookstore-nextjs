'use client';

import React from 'react';
import { useCart } from '@/app/lib/CartContext'; // Adjust import path if needed
import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import NovelNestLogo from '@/app/ui/NovelNestLogo';

const Header: React.FC = () => {
    const { cart } = useCart();
    const cartCount = cart.reduce((acc, item) => acc + (item.qty || 0), 0);

    return (
        <header className="flex justify-between items-center py-4 px-6 bg-blue-600 text-white">

            <NovelNestLogo />
            <nav>
                <ul className="flex space-x-4">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/dashboard">Dashboard</Link></li>
                    <li><Link href="/orders" className="mr-4">Orders</Link></li>
                    <li><Link href="/products">Product</Link></li>
                    <li><Link href="/category">Category</Link></li>
                    <li>
                        <Link href="/cart">
                            <div className="relative">
                                <ShoppingCartIcon className="w-6 h-6" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 flex items-center justify-center bg-red-500 text-white rounded-full w-5 h-5 text-xs">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
