'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { readAttribution } from '@/components/layout/Attribution';
import { Icon } from '@/components/ui/Icon';
import { whatsappLink } from '@/lib/business';
import { LEAD_TYPES, LEAD_TYPE_KEYS, isLeadType, type LeadType } from '@/lib/leads';
import { cn } from '@/lib/utils';

type Status =
  | { state: 'idle' }
  | { state: 'submitting' }
  | { state: 'success'; reference: string; name: string; summary: string; type: LeadType }
  | { state: 'error'; message: string };

const BROCHURE: Partial<Record<LeadType, { href: string; label: string }>> = {
  corporate: { href: '/brochure/corporate', label: 'Open the corporate catalogue' },
  wedding: { href: '/brochure/wedding', label: 'Open the wedding catalogue' },
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * The one enquiry form, used on every page. The type tabs change which
 * questions appear; the field definitions live in lib/leads.ts and are the
 * same allow-list the API validates against.
 */
export function InquiryForm({
  defaultType = 'corporate',
  lockType = false,
  className,
}: {
  defaultType?: LeadType;
  /** Hide the tabs — for pages that are about one kind of enquiry. */
  lockType?: boolean;
  className?: string;
}) {
  const [type, setType] = useState<LeadType>(defaultType);
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const [prefill, setPrefill] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const def = LEAD_TYPES[type];

  // Deep links: /contact?type=wedding&product=kalakand&collection=The%20Royal%20Trunk
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const t = q.get('type');
    if (!lockType && isLeadType(t)) setType(t);
    const bits = [q.get('collection') && `Interested in ${q.get('collection')}.`, q.get('product') && `Sweet: ${q.get('product')!.replace(/-/g, ' ')}.`]
      .filter(Boolean)
      .join(' ');
    if (bits) setPrefill(bits);
  }, [lockType]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus({ state: 'submitting' });

    const details: Record<string, string> = {};
    for (const f of def.fields) if (data[f.name] && f.name !== 'event_date') details[f.name] = data[f.name];

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_type: type,
          name: data.name,
          phone: data.phone,
          email: data.email,
          company: data.company,
          city: data.city,
          event_date: data.event_date,
          message: data.message,
          details,
          consent: data.consent === 'on',
          marketing_opt_in: data.marketing_opt_in === 'on',
          company_website: data.company_website, // honeypot
          source_path: window.location.pathname,
          ...readAttribution(),
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; reference?: string; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong. Please try again.');

      const qty = details.quantity || details.volume;
      const summary = [
        `${def.whatsappIntro} (ref ${json.reference}).`,
        data.company && `Company: ${data.company}.`,
        qty && `Quantity: ${qty}.`,
        data.event_date && `Date: ${data.event_date}.`,
        data.city && `City: ${data.city}.`,
      ]
        .filter(Boolean)
        .join(' ');

      window.dataLayer?.push({ event: 'generate_lead', lead_type: type, lead_reference: json.reference });
      setStatus({ state: 'success', reference: json.reference ?? '', name: data.name.split(' ')[0], summary, type });
      form.reset();
    } catch (err) {
      setStatus({ state: 'error', message: err instanceof Error ? err.message : 'Something went wrong.' });
    }
  }

  if (status.state === 'success') {
    const wa = whatsappLink(status.summary);
    const brochure = BROCHURE[status.type];
    return (
      <div className={cn('rounded-[2rem] border border-gold-300/60 bg-cream-50 p-8 text-center shadow-card sm:p-12', className)} role="status">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-maroon text-gold-200">
          <Icon name="check" className="h-7 w-7" />
        </span>
        <h3 className="mt-6 font-display text-3xl font-semibold text-maroon">Thank you, {status.name}.</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-ink-soft">
          Your enquiry is with our gifting team. We will call or WhatsApp you within one working day.
        </p>
        {status.reference && (
          <p className="mt-4 text-sm text-ink-muted">
            Reference <span className="font-semibold tracking-wider text-ink">{status.reference}</span>
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#1F7A4D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#186540]">
              <Icon name="whatsapp" /> Continue on WhatsApp
            </a>
          )}
          {brochure && (
            <Link href={brochure.href} className="inline-flex items-center gap-2 rounded-full border border-maroon/30 px-6 py-3 text-sm font-semibold text-maroon hover:border-maroon">
              <Icon name="download" className="h-4 w-4" /> {brochure.label}
            </Link>
          )}
        </div>
        <button type="button" onClick={() => setStatus({ state: 'idle' })} className="mt-8 text-sm text-ink-muted underline underline-offset-4">
          Send another enquiry
        </button>
      </div>
    );
  }

  const id = (n: string) => `${uid}-${n}`;

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate={false}
      className={cn('rounded-[2rem] border border-gold-300/60 bg-cream-50 p-6 shadow-card sm:p-10', className)}
    >
      {!lockType && (
        <fieldset>
          <legend className="label">I am enquiring about</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {LEAD_TYPE_KEYS.map((k) => (
              <label
                key={k}
                className={cn(
                  'cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300',
                  type === k ? 'border-maroon bg-maroon text-cream' : 'border-gold-300/70 bg-cream text-ink-soft hover:border-maroon/40',
                )}
              >
                <input type="radio" name="lead_type" value={k} checked={type === k} onChange={() => setType(k)} className="sr-only" />
                {LEAD_TYPES[k].short}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <p className={cn('text-[0.95rem] text-ink-muted', !lockType && 'mt-5')}>{def.pitch}</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id('name')} className="label">
            Full name <span className="text-maroon">*</span>
          </label>
          <input id={id('name')} name="name" required maxLength={120} autoComplete="name" className="field" />
        </div>
        <div>
          <label htmlFor={id('phone')} className="label">
            Mobile / WhatsApp <span className="text-maroon">*</span>
          </label>
          <input
            id={id('phone')}
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            pattern="\+?[0-9][0-9\s\-]{8,16}"
            placeholder="+91"
            className="field"
          />
        </div>
        <div>
          <label htmlFor={id('email')} className="label">
            Email
          </label>
          <input id={id('email')} name="email" type="email" maxLength={254} autoComplete="email" className="field" />
        </div>
        <div>
          <label htmlFor={id('city')} className="label">
            City
          </label>
          <input id={id('city')} name="city" maxLength={120} autoComplete="address-level2" className="field" />
        </div>
        {def.companyLabel && (
          <div className="sm:col-span-2">
            <label htmlFor={id('company')} className="label">
              {def.companyLabel}
            </label>
            <input id={id('company')} name="company" maxLength={160} autoComplete="organization" className="field" />
          </div>
        )}

        {def.fields.map((f) => (
          <div key={`${type}-${f.name}`} className={cn(f.wide && 'sm:col-span-2')}>
            <label htmlFor={id(f.name)} className="label">
              {f.label} {f.required && <span className="text-maroon">*</span>}
            </label>
            {f.type === 'select' ? (
              <select id={id(f.name)} name={f.name} required={f.required} defaultValue="" className="field field-select">
                <option value="" disabled>
                  Select…
                </option>
                {f.options?.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={id(f.name)}
                name={f.name}
                type={f.type}
                required={f.required}
                placeholder={f.placeholder}
                maxLength={160}
                min={f.type === 'date' ? new Date().toISOString().slice(0, 10) : undefined}
                className="field"
              />
            )}
          </div>
        ))}

        <div className="sm:col-span-2">
          <label htmlFor={id('message')} className="label">
            Anything else we should know?
          </label>
          <textarea
            id={id('message')}
            name="message"
            rows={3}
            maxLength={2000}
            defaultValue={prefill}
            key={prefill}
            placeholder="Preferred sweets, delivery cities, branding ideas…"
            className="field resize-y"
          />
        </div>

        {/* Honeypot — hidden from people, irresistible to bots. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>
            Company website
            <input name="company_website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>
      </div>

      <div className="mt-6 space-y-3 text-[0.85rem] leading-relaxed text-ink-muted">
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consent" required className="mt-1 h-4 w-4 shrink-0 accent-maroon" />
          <span>
            I agree to Mithaiwallah contacting me by phone, WhatsApp or email about this enquiry, as described in the{' '}
            <Link href="/privacy" className="text-maroon underline underline-offset-2">
              privacy notice
            </Link>
            . <span className="text-maroon">*</span>
          </span>
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="marketing_opt_in" className="mt-1 h-4 w-4 shrink-0 accent-maroon" />
          <span>Send me festive collections and early-booking offers (optional, unsubscribe any time).</span>
        </label>
      </div>

      {status.state === 'error' && (
        <p role="alert" className="mt-5 rounded-xl bg-maroon-50 px-4 py-3 text-sm text-maroon">
          {status.message}
        </p>
      )}

      <button
        type="submit"
        disabled={status.state === 'submitting'}
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-maroon px-7 py-4 font-semibold text-cream shadow-[0_12px_30px_-14px_rgba(107,16,36,0.8)] transition hover:bg-maroon-700 disabled:opacity-60 sm:w-auto"
      >
        {status.state === 'submitting' ? 'Sending…' : 'Send enquiry'}
        {status.state !== 'submitting' && <Icon name="arrow" className="h-4 w-4" />}
      </button>
      <p className="mt-4 text-xs text-ink-muted">We reply within one working day. Your details are never shared or sold.</p>
    </form>
  );
}
