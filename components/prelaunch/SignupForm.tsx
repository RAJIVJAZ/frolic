'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { SIGNUP_INTENTS, type SignupIntent } from '@/lib/company';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * One form, five audiences. The intent decides the copy, the extra field and
 * what gets tagged on the submission.
 *
 * Posts to /api/signup, which writes to Supabase. A failure is surfaced to the
 * visitor rather than swallowed — a waitlist form that silently drops
 * submissions is worse than no form, because you do not find out.
 */
export function SignupForm({
  intent = 'waitlist',
  className,
  compact = false,
}: {
  intent?: SignupIntent;
  className?: string;
  compact?: boolean;
}) {
  const config = SIGNUP_INTENTS[intent];
  const pathname = usePathname();
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');
  const [already, setAlready] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    setMessage('');
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, intent, source_path: pathname }),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json.ok) {
        setMessage(json.error || 'Something went wrong. Please try again.');
        setState('error');
        return;
      }
      setAlready(Boolean(json.alreadySignedUp));
      setState('done');
    } catch {
      setMessage('Could not reach the server. Please check your connection and try again.');
      setState('error');
    }
  }

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {state === 'done' ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-card border-2 border-mint bg-mint-50 p-6"
          >
            <p className="font-display text-step-1 font-bold text-mint-900">
              {already ? 'You were already on the list.' : "You're on the list."}
            </p>
            <p className="mt-2 text-step--1 text-mint-700">
              We&apos;ll write when there is something real to say — a pilot batch, a launch date, a
              tasting. Not before.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className={cn('relative space-y-3', compact && 'sm:flex sm:flex-wrap sm:gap-2 sm:space-y-0')}
            aria-label={config.label}
          >
            {/* Honeypot. Hidden from people, irresistible to bots. */}
            <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor={`${intent}-company-website`}>Company website</label>
              <input
                id={`${intent}-company-website`}
                name="company_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className={cn(compact && 'flex-1')}>
              <label htmlFor={`${intent}-email`} className={cn('eyebrow mb-2 block', compact && 'sr-only')}>
                Email address
              </label>
              <input
                id={`${intent}-email`}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={compact ? 'you@email.com' : undefined}
                className="min-h-[3rem] w-full rounded-card border-2 border-charcoal/12 bg-cream px-4 focus:border-charcoal focus:outline-none"
              />
            </div>

            {!compact && (
              <div>
                <label htmlFor={`${intent}-name`} className="eyebrow mb-2 block">
                  Your name
                </label>
                <input
                  id={`${intent}-name`}
                  name="name"
                  required
                  autoComplete="name"
                  className="min-h-[3rem] w-full rounded-card border-2 border-charcoal/12 bg-cream px-4 focus:border-charcoal focus:outline-none"
                />
              </div>
            )}

            {!compact && config.extraField && (
              <div>
                <label htmlFor={`${intent}-extra`} className="eyebrow mb-2 block">
                  {config.extraField.label}
                </label>
                {config.extraField.type === 'textarea' ? (
                  <textarea
                    id={`${intent}-extra`}
                    name={config.extraField.name}
                    rows={3}
                    className="w-full rounded-card border-2 border-charcoal/12 bg-cream p-4 focus:border-charcoal focus:outline-none"
                  />
                ) : (
                  <input
                    id={`${intent}-extra`}
                    name={config.extraField.name}
                    className="min-h-[3rem] w-full rounded-card border-2 border-charcoal/12 bg-cream px-4 focus:border-charcoal focus:outline-none"
                  />
                )}
              </div>
            )}

            <Button
              type="submit"
              size={compact ? 'md' : 'lg'}
              disabled={state === 'sending'}
              className={cn(!compact && 'w-full', compact && 'shrink-0')}
            >
              {state === 'sending' ? 'Sending…' : config.cta}
            </Button>

            {state === 'error' && (
              <p
                role="alert"
                className={cn(
                  'rounded-card border-2 border-tangerine-400 bg-tangerine-50 px-4 py-3 text-step--1 text-tangerine-700',
                  compact && 'sm:w-full',
                )}
              >
                {message}
              </p>
            )}

            {!compact && (
              <p className="text-[0.72rem] leading-relaxed text-charcoal-muted">
                We use your address only to contact you about FROLIC. No list sharing, unsubscribe
                any time.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
