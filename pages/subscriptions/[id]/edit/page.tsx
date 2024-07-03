'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Form from '@/app/ui/subscriptions/edit-form';
import Breadcrumbs from '@/app/ui/subscriptions/breadcrumbs';

const SubscriptionsEdit = () => {
  const router = useRouter();
  const { id } = router.query; // Get ID from URL query parameters

  const [subscription, setSubscription] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!id) return; // If no ID is available, exit early

      try {
        const res = await fetch(`/api/subscriptions/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch subscription');
        }
        const subscriptionData = await res.json();
        setSubscription(subscriptionData);
      } catch (error: any) {
        console.error('Error fetching subscription:', error.message);
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    fetchSubscription();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>; // Display loading state while fetching data
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Subscriptions', href: '/dashboard/subscriptions' },
          {
            label: 'Edit Subscription',
            href: `/dashboard/subscriptions/edit/${id}`,
            active: true,
          },
        ]}
      />
      <Form subscription={subscription} />
    </main>
  );
};

export default SubscriptionsEdit;
