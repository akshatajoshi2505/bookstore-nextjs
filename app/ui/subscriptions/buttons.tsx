import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function CreateSubscription() {
  return (
    <Link
      href="/dashboard/subscriptions/create"
      className="flex items-center rounded-lg bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-600"
    >
      <PlusIcon className="h-5 w-5 mr-2" />
      <span>Create Subscription</span>
    </Link>
  );
}

export function EditSubscription({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/subscriptions/${id}/edit`}
      className="flex items-center justify-center rounded-md p-2 text-teal-600 hover:bg-teal-100 hover:text-teal-900"
    >
      <PencilIcon className="w-5" />
      <span className="sr-only">Edit Subscription</span>
    </Link>
  );
}

export function DeleteSubscription({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
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

      alert('Subscription deleted successfully');
      router.push('/dashboard/subscriptions');
    } catch (error) {
      alert((error as Error).message);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="flex items-center justify-center rounded-md p-2 text-teal-600 hover:bg-teal-100 hover:text-teal-900"
    >
      <TrashIcon className="w-5" />
      <span className="sr-only">Delete Subscription</span>
    </button>
  );
}
