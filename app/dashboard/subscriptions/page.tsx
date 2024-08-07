'use client';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import { CreateSubscription } from '@/app/ui/subscriptions/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import SubscriptionsTable from '@/app/ui/subscriptions/table';
import { useEffect, useState } from 'react';

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch('/api/subscriptions');
        if (!res.ok) {
          throw new Error('Failed to fetch subscriptions');
        }
        const { data: subscriptionsData } = await res.json(); // Destructure subscriptions from API response
        setSubscriptions(subscriptionsData);
      } catch (error: any) {
        console.error('Error fetching subscriptions:', (error as Error).message);
      }
    };

    fetchSubscriptions();
  }, []); 

  const handleDelete = async (id: string) => {
    const confirmation = window.confirm('Are you sure you want to delete this subscription?');
    if (!confirmation) return;

    try {
      const response = await fetch(`/api/subscriptions/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete subscription');
      }

      const data = await response.json();

      alert(data.message || 'Subscription deleted successfully');

      // Remove the deleted subscription from the state
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.filter((subscription) => subscription.id !== id)
      );
    } catch (error) {
      alert((error as Error).message);
    }
  };


  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Subscription</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search subscription..." />
        <CreateSubscription />
      </div>
      <SubscriptionsTable subscriptions={subscriptions} onDelete={handleDelete}></SubscriptionsTable>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
};


export default SubscriptionsPage;