'use server';

import { revalidatePath } from 'next/cache';
import { LEAD_STATUSES, type LeadStatus } from '@/lib/leads';
import { LEADS_TABLE, leadAdmin } from '@/lib/supabase';

/** Runs under /admin, so middleware.ts has already checked Basic Auth. */
export async function updateLead(formData: FormData) {
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '') as LeadStatus;
  const notes = String(formData.get('notes') ?? '').slice(0, 4000);
  if (!/^[0-9a-f-]{36}$/.test(id) || !LEAD_STATUSES.includes(status)) return;
  const { error } = await leadAdmin().from(LEADS_TABLE).update({ status, notes: notes || null }).eq('id', id);
  if (error) console.error('[mithaiwallah] lead update failed', error.message);
  revalidatePath('/admin/leads');
}
