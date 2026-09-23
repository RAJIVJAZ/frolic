'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SIGNUP_INTENTS, type SignupIntent } from '@/lib/company';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/**
 * One form, five audiences. The intent decides the copy, the extra field and
 * what gets tagged on the submission.
 *
 * NOT WIRED TO A BACKEND. `onSubmit` posts to /api/signup, which does not
 * exist yet — the form holds the contract so connecting a real store (Supabase,
 * Sheets, an ESP) is a single file. Until then it shows the success state
 * without persisting anything, and says so in the console.
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
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, intent }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('done');
    } catch {
      // No endpoint yet. Show the success state so the page is demonstrable,
      // but make the gap loud in the console rather than silently pretending.
      console.warn(
        '[frolic] /api/signup is not implemented — this submission was NOT stored. ' +
          'Wire it before collecting real signups.',
        { intent, data },
      );
      setState('done');
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
            <p className="font-display text-step-1 font-bold text-mint-900">You&apos;re on the list.</p>
            <p className="mt-2 text-step--1 text-mint-700">
              We&apos;ll write when there is something real to say — a pilot batch, a launch date, a
              tasting. Not before.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className={cn('space-y-3', compact && 'sm:flex sm:gap-2 sm:space-y-0')}
            aria-label={config.label}
          >
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
