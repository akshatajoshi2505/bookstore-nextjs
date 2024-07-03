'use client';
import { useState, useEffect } from 'react';
 import { useRouter, useParams } from 'next/navigation'
// import { useRouter } from 'next/router';
import Form from '@/app/ui/subscriptions/edit-form';
import Breadcrumbs from '@/app/ui/subscriptions/breadcrumbs';

const SubscriptionsEdit = () => {
  const router = useRouter();
  
  // const params: any = useSearchParams(); 
  // const id = params.get("id");
  const   params   = useParams();
   const jsonString = JSON.stringify(params);
   const parsedObject = JSON.parse(jsonString);
   const id = parsedObject.id;
   console.log(id);
  // const { id } = router.query; // Get ID from URL query parameters
// console.log(JSON.stringify(id));
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
        console.log(subscriptionData.data);
        setSubscription(subscriptionData.data);
      } catch (error: any) {
        console.error('Error fetching subscription:', error.message );
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
            href: `/dashboard/subscriptions/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form subscription={subscription} />
    </main>
  );
}; 

export default SubscriptionsEdit;
