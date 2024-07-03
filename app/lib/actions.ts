'use server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  title: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  duration: z.string(),
});
 
// const CreateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function createSubscription(formData: FormData) {
    // const { title, duration, status, amount } = CreateInvoice.parse({
    //   title: formData.get('title'),
    //   amount: formData.get('amount'),
    //   status: formData.get('status'),
    //   duration: formData.get('duration'),
    // });
    // const amountInCents = amount * 100;
    revalidatePath('/dashboard/subscriptions');
    redirect('/dashboard/subscriptions');

  }
  // const UpdateInvoice = FormSchema.omit({ id: true, date: true });


  // export async function updateSubscription(id: string, formData: FormData) {
    // const { customerId, amount, status } = UpdateInvoice.parse({
    //   customerId: formData.get('customerId'),
    //   amount: formData.get('amount'),
    //   status: formData.get('status'),
    // });
   
    // const amountInCents = amount * 100;
   
    // await sql`
    //   UPDATE invoices
    //   SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    //   WHERE id = ${id}
    // `;
   
    // revalidatePath('/dashboard/invoices');
    // redirect('/dashboard/invoices');
  //}