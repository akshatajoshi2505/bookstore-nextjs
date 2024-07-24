'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';

type PropsSubscription = {
    subscription: SubscriptionType;
};
type SubscriptionType = {
    _id: string;
    title: string;
    duration: number;
    status: string;
    amount: number;
   
};

const SubscriptionsPage = () => {
    const [subscriptions, setSubscription] = useState<SubscriptionType[]>([]);

    const sendGetRequest = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const response = await axios.get('/api/subscriptions', config);

            setSubscription(response.data.data);
            console.log('aaa', response.data);
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    };

    useEffect(() => {
        sendGetRequest();
    }, []);

    return (
        <main className="min-h-screen flex flex-col p-8 bg-teal-50">
            <h1 className="text-4xl font-extrabold text-teal-900 mb-12 text-center">Explore Our Subscription Packages</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {subscriptions.length > 0 ? (
                    subscriptions.map((subscription) => (
                        <Subscription subscription={subscription} key={subscription._id.toString()} />
                    ))
                ) : (
                    <div className="col-span-3 text-center text-gray-600">Loading...</div>
                )}
            </div>
        </main>
    );
};

const Subscription = ({ subscription }: PropsSubscription) => {
    return (
        <Link
            href={``}
            className="group relative bg-white border border-teal-200 rounded-lg shadow-md overflow-hidden flex flex-col"
        >
            <div className="relative h-40 w-full flex items-center justify-center overflow-hidden rounded-t-lg">
            <Image
              src="/subscription1.png"
              width={400}
              height={400}
              className="hidden md:block"
              alt="Homepage Image Bookstore"
            />
            </div>
            <div className="flex flex-col p-6 flex-grow">
                <h2 className="text-2xl font-bold text-teal-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">{subscription.title}</h2>
                <p className="text-lg text-yellow-600 font-semibold mb-2">${subscription.amount.toFixed(2)}</p>
                <p className="text-sm text-gray-700 mb-4">{subscription.duration} Month(s)</p>
                <button
                    className="mt-auto bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onClick={(e) => e.stopPropagation()}  // Prevent Link from triggering
                >
                    Buy Now
                </button>
            </div>
        </Link>
    );
};

export default SubscriptionsPage;
