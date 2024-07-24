'use client';
import Form from '@/app/ui/subscriptions/create-form';
import Breadcrumbs from '@/app/ui/subscriptions/breadcrumbs';
// import { fetchCustomers } from '@/app/lib/data';
 
export default function Page() {
//   const customers = await fetchCustomers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Subscriptions', href: '/dashboard/subscriptions' },
          {
            label: 'Create Subscription',
            href: '/dashboard/subscriptions/create',
            active: true,
          },
        ]}
      />
      <Form  />
    </main>
  );
}