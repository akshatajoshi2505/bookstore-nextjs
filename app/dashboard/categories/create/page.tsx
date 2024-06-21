import Form from '@/app/ui/categories/create-form';
import Breadcrumbs from '@/app/ui/categories/breadcrumbs'; // Ensure correct import path

export default function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Categories', href: '/dashboard/categories' },
          {
            label: 'Create Category', // Corrected label for context
            href: '/dashboard/categories/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
