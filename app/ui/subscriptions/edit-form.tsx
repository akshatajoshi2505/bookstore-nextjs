import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';

// Define the Subscription interface
interface Subscription {
  id: number;
  title: string;
  duration: number;
  amount: number;
  status: 'pending' | 'paid';
}

interface Props {
  subscription: Subscription; // Specify the type of subscription prop
}

export default function Form({ subscription }: Props) {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('pending');
  
  const router = useRouter();

  useEffect(() => {
    console.log(subscription);
    if (subscription) {
      setTitle(subscription.title || '');
      setDuration(subscription.duration.toString() || '');
      setAmount(subscription.amount.toString() || '');
      setStatus(subscription.status || 'pending');
    }
  }, [subscription]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const subscriptionData = {
        id: subscription.id,
        title,
        duration: parseInt(duration),
        amount: parseFloat(amount),
        status,
      };
      // console.log("SUBBB"+subscription._id);
      const response = await fetch(`/api/subscriptions/${subscription.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      if (!response.ok) {
        throw new Error('Failed to update subscription');
      }

      console.log('Subscription updated successfully');
      router.push("/dashboard/subscriptions");
      // Handle success scenario (e.g., redirect or show success message)
    } catch (error: any) {
      console.error('Error updating subscription:', error.message);
      // Handle error state or show error message to user
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-teal-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-teal-800">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="peer block w-full rounded-md border border-teal-200 py-2 pl-10 text-sm text-teal-900 outline-2 placeholder:text-teal-500"
              />
              <DocumentTextIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-teal-500 peer-focus:text-teal-900" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="duration" className="mb-2 block text-sm font-medium text-teal-800">
            Duration in months
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="duration"
                name="duration"
                type="number"
                placeholder="Enter duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="peer block w-full rounded-md border border-teal-200 py-2 pl-10 text-sm text-teal-900 outline-2 placeholder:text-teal-500"
              />
              <ClockIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-teal-500 peer-focus:text-teal-900" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium text-teal-800">
            Price
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="peer block w-full rounded-md border border-teal-200 py-2 pl-10 text-sm text-teal-900 outline-2 placeholder:text-teal-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-teal-500 peer-focus:text-teal-900" />
            </div>
          </div>
        </div>

        <fieldset>
          <legend className="mb-2 block text-sm font-medium text-teal-800">
            Set the status
          </legend>
          <div className="rounded-md border border-teal-200 bg-teal-50 px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="statusPending"
                  name="status"
                  type="radio"
                  value="pending"
                  checked={status === 'pending'}
                  onChange={() => setStatus('pending')}
                  className="h-4 w-4 cursor-pointer border-teal-300 bg-teal-100 text-teal-600 focus:ring-2"
                />
                <label
                  htmlFor="statusPending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-teal-100 px-3 py-1.5 text-xs font-medium text-teal-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="statusPaid"
                  name="status"
                  type="radio"
                  value="paid"
                  checked={status === 'paid'}
                  onChange={() => setStatus('paid')}
                  className="h-4 w-4 cursor-pointer border-teal-300 bg-teal-100 text-teal-600 focus:ring-2"
                />
                <label
                  htmlFor="statusPaid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-teal-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Active <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/subscriptions"
          className="flex h-10 items-center rounded-lg bg-teal-100 px-4 text-sm font-medium text-teal-600 transition-colors hover:bg-teal-200"
        >
          Cancel
        </Link>
        <Button type="submit">Update Subscription</Button>
      </div>
    </form>
  );
}
