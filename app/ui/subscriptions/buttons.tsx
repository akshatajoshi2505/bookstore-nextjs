import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export function CreateSubscription() {
  return (
    <Link
      href="/dashboard/subscriptions/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Subscription</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function EditSubscription({ id }: { id: string }) {
  return (
    <Link
    href={`/dashboard/subscriptions/${id}/edit`}
      className="flex items-center rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

// export function DeleteSubscription({ id }: { id: string }) {
//   // const router = useRouter();

//   const handleDelete = async () => {
//     const confirmation = window.confirm('Are you sure you want to delete this subscription?');
//     if (!confirmation) return;

//     try {
//       const response = await fetch(`/api/subscriptions/${id}`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await response.json();
//       console.log(data);
//       // if (!response.ok || !data.success) {
//       //   throw new Error(data.message || 'Failed to delete subscription');
//       // }

//       if (!response.ok) {
//         throw new Error('Failed to delete subscription');
//       }

//       alert('Subscription deleted successfully');
//       // router.push("/dashboard/subscriptions");

//       // Optionally, you can trigger a state update or navigation here to reflect the deletion
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <button
//       onClick={handleDelete}
//       className="rounded-md border p-2 hover:bg-gray-100"
//     >
//       <span className="sr-only">Delete</span>
//       <TrashIcon className="w-5" />
//     </button>
//   );
// }
