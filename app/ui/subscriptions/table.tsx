"use client";
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import { useEffect, useState } from 'react';
import { Button } from '@/app/ui/button';
import { EditSubscription, DeleteSubscription } from '@/app/ui/subscriptions/buttons';

import {
  CustomersTableType,
  FormattedCustomersTable,
} from '@/app/lib/definitions';

type Subscription = {
  _id: string;
  name: string;
  description: string;
  length: number;
  status: string;
};
export default async function SubscriptionsTable()
  // {
//   customers,
// }: {
//   customers: FormattedCustomersTable[];
// }) 
{
  // const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  // useEffect(() => {
  //   const fetchSubscriptions = async () => {
  //     try {
  //       const res = await fetch('../api/subscriptions');
  //       const data = await res.json();
  //       setSubscriptions(data.subscriptions);
  //     } catch (error) {
  //       console.error('Error fetching subscriptions:', error);
  //     }
  //   };

  //   fetchSubscriptions();
  // }, []);
  return (
    <div className="w-full">

      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Duration (Months)
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Price ($)
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium" colSpan={2}>
                      Actions
                    </th>
                    
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                {/* {subscriptions.length === 0 ? (
                  <tr><td colSpan={4}>No data found</td></tr>
                ):(
                subscriptions.map((subscription) => ( */}
                    <tr key="1" className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>Free Version</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        1
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        0
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        Active
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <EditSubscription id={"1"} />
                      
                      </td>
                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <DeleteSubscription id={"1"} />
                      </td>
                     
                    </tr>

                    <tr key="1" className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>3 Months</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        3
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        20
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        Active
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <EditSubscription id={"1"} />
                      
                      </td>
                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <DeleteSubscription id={"1"} />
                      </td>
                    </tr>
                    <tr key="1" className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>6 Months</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        6
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        35
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        Active
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <EditSubscription id={"1"} />
                      
                      </td>
                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <DeleteSubscription id={"1"} />
                      </td>
                     
                    </tr>
                    <tr key="1" className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          <p>1 Year</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        12
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        100
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        Active
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <EditSubscription id={"1"} />
                      
                      </td>
                       <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        <DeleteSubscription id={"1"} />
                      </td>
                     
                    </tr>
                   {/* ))
                  )} */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
