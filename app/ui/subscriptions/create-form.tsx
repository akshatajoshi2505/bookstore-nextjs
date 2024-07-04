import { useState } from 'react';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useRouter } from 'next/navigation';

export default function CreateSubscriptionForm() {
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('pending');

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('/api/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, duration, amount, status }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to create subscription');
        }
        return response.json();
      })
      .then(() => {
        router.push('/dashboard/subscriptions');
      })
      .catch(error => {
        console.error('Error creating subscription:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-lg bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Create Subscription</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">Title</label>
            <div className="relative mt-2">
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="block w-full rounded-lg border border-gray-300 p-2 pl-10 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <DocumentTextIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-semibold text-gray-700">Duration in months</label>
            <div className="relative mt-2">
              <input
                id="duration"
                name="duration"
                type="number"
                placeholder="Enter duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 p-2 pl-10 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <ClockIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-700">Price</label>
            <div className="relative mt-2">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 p-2 pl-10 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <CurrencyDollarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <fieldset>
            <legend className="block text-sm font-semibold text-gray-700">Set the status</legend>
            <div className="mt-2 flex gap-4">
              <div className="flex items-center">
                <input
                  id="statusPending"
                  name="status"
                  type="radio"
                  value="pending"
                  checked={status === 'pending'}
                  onChange={() => setStatus('pending')}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <label htmlFor="statusPending" className="ml-2 text-sm text-gray-600 flex items-center gap-1.5 bg-gray-100 rounded-lg px-3 py-1.5">
                  Pending
                  <ClockIcon className="h-4 w-4" />
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
                  className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                />
                <label htmlFor="statusPaid" className="ml-2 text-sm text-gray-600 flex items-center gap-1.5 bg-green-100 rounded-lg px-3 py-1.5">
                  Active
                  <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Link
          href="/dashboard/subscriptions"
          className="flex items-center px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Subscription</Button>
      </div>
    </form>
  );
}
