'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';

import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import LatestBooks from '@/app/ui/dashboard/latest-books';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import CardWrapper from '@/app/ui/dashboard/cards';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export default function Page() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session?.user) {
      // Redirect to login if not authenticated
      console.log("Redirecting to login because user is not authenticated."); // Debugging log
      window.location.href = '/login';
    }
  }, [session, status]);

  if (status === 'loading' || !session?.user) {
    return <div>Loading...</div>; // Show a loading indicator while checking session
  }

export default function Page() {
  // const {
  //   numberOfInvoices,
  //   numberOfCustomers,
  //   totalPaidInvoices,
  //   totalPendingInvoices,
  // } = await fetchCardData();

  const [count, setCount] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalCategories: 0,
  });
  const [orders, setOrders] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    
    const fetchCounts = async () => {
      try {
        const [resBooks, resOrders, resCustomers, resCategories] = await Promise.all([
          fetch('/api/books?countOnly=true'),
          fetch('/api/orders?countOnly=true'),
          fetch('/api/customers?countOnly=true'),
          fetch('/api/categories?countOnly=true'),
        ]);

        if (!resBooks.ok || !resOrders.ok || !resCustomers.ok || !resCategories.ok) {
          throw new Error('Failed to fetch counts');
        }

        const [resultBooks, resultOrders, resultCustomers, resultCategories] = await Promise.all([
          resBooks.json(),
          resOrders.json(),
          resCustomers.json(),
          resCategories.json(),
        ]);

        setCount({
          totalBooks: resultBooks.data.totalBooks,
          totalOrders: resultOrders.data.totalOrders,
          totalCustomers: resultCustomers.data.totalCustomers,
          totalCategories: resultCategories.data.totalCategories,
        });
      } catch (error) {
      } finally {
      }
    };
    const fetchLatestOrders = async () => {

      try {
        const resOrders = await fetch(`/api/orders`);
        if (!resOrders.ok) {
          throw new Error('Failed to fetch subscription');
        }
        const orders = await resOrders.json();
        console.log(orders.orders);
        setOrders(orders.orders || []);
      } catch (error: any) {
        console.error('Error fetching subscription:', error.message );
      } finally {
        // setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    const fetchLatestBooks = async () => {

      try {
        const resBooks = await fetch(`/api/books`);
        if (!resBooks.ok) {
          throw new Error('Failed to fetch subscription');
        }
        const books = await resBooks.json();
        console.log(books.data);
        setBooks(books.data || []);
      } catch (error: any) {
        console.error('Error fetching subscription:', error.message );
      } finally {
        // setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };
    fetchCounts();

    fetchLatestOrders();
    fetchLatestBooks();
  }, []);



  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

        <Card title="Total Orders" value={count.totalOrders} type="collected" /> 
        <Card title="Total Books" value={count.totalBooks} type="pending" />
        <Card title="Total Categories" value={count.totalCategories} type="invoices" />
         <Card
          title="Total Customers"
          value={count.totalCustomers}
          type="customers"
        />
         <Suspense fallback={<CardsSkeleton />}>

          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

      <Suspense fallback={<RevenueChartSkeleton />}>
            <LatestInvoices orders={orders}/>
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestBooks  books={books}/>
        </Suspense>
      </div>
    </main>
  );
}
