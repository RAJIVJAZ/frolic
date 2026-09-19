'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { reviews, reviewStats, communityPosts, press } from '@/lib/reviews';
import { getProduct } from '@/lib/products';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Marquee } from '@/components/ui/Marquee';
import { Badge } from '@/components/ui/Badge';
import { worldVars } from '@/lib/utils';

export function SocialProof() {
  return (
    <section className="py-section" aria-label="Reviews and community">
      <Marquee
        items={press}
        speed={52}
        className="border-y border-charcoal-line py-4"
        itemClassName="font-display text-step-2 font-black text-charcoal/25"
        separator="✳"
      />

      <div className="shell mt-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="What people say"
              title={<>2,847 reviews and a 4.7.</>}
              body="We ask every buyer seven days after delivery — long enough to have actually finished a pack."
            />

            <div className="mt-8 space-y-2" aria-hidden>
              {reviewStats.distribution.map((d, i) => (
                <div key={d.stars} className="flex items-center gap-3">
                  <span className="w-10 shrink-0 font-mono text-[0.7rem] text-charcoal-muted">
                    {d.stars}★
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-pill bg-charcoal/[0.07]">
                    <motion.div
                      className="h-full rounded-pill bg-charcoal"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${d.share * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="w-10 shrink-0 text-right font-mono text-[0.7rem] tabular-nums text-charcoal-muted">
                    {Math.round(d.share * 100)}%
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-step--1 text-charcoal-muted">
              {Math.round(reviewStats.wouldRecommend * 100)}% would recommend FROLIC to a friend.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {reviews.slice(0, 4).map((review, i) => {
              const product = getProduct(review.flavour);
              return (
                <Reveal as="li" key={review.id} delay={i}>
                  <figure
                    className="flex h-full flex-col rounded-card border border-charcoal-line bg-cream p-6 transition-shadow hover:shadow-lift"
                    style={product ? worldVars(product.world) : undefined}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Stars rating={review.rating} />
                      {review.verified && <Badge tone="mint">Verified</Badge>}
                    </div>
                    <blockquote className="mt-4 flex-1">
                      <p className="font-display text-step-1 font-bold leading-snug">
                        {review.title}
                      </p>
                      <p className="mt-3 text-step--1 leading-relaxed text-charcoal-muted">
                        {review.body}
                      </p>
                    </blockquote>
                    <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-charcoal-line/70 pt-4">
                      <span className="text-step--1 font-semibold">
                        {review.name}
                        <span className="ml-2 font-normal text-charcoal-muted">{review.location}</span>
                      </span>
                      {product && (
                        <Link
                          href={`/products/${product.handle}`}
                          className="chip shrink-0 transition hover:border-charcoal/40"
                        >
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: product.world.base }}
                            aria-hidden
                          />
                          {product.shortName}
                        </Link>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </ul>
        </div>

        {/* ——— Community grid ————————————————————————————————— */}
        <div className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">The community</p>
              <h3 className="mt-3 text-step-3">#SipDifferent</h3>
            </div>
            <a
              href="https://instagram.com/drinkfrolic"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-charcoal/25 decoration-2 underline-offset-[6px] transition hover:decoration-charcoal"
            >
              Follow @drinkfrolic
            </a>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {communityPosts.map((post, i) => {
              const product = getProduct(post.flavour);
              return (
                <Reveal as="li" key={post.id} delay={i}>
                  <article
                    className="group relative aspect-[4/5] overflow-hidden rounded-card"
                    style={{
                      background: product
                        ? `linear-gradient(155deg, ${product.world.base}, ${product.world.deep})`
                        : undefined,
                    }}
                  >
                    {/* Placeholder for the UGC image — the production build
                        swaps this for a next/image from the Sanity asset. */}
                    <div className="absolute inset-0 grid place-items-center opacity-20" aria-hidden>
                      <span className="font-display text-step-3 font-black" style={{ color: product?.world.ink }}>
                        FROLIC
                      </span>
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent p-3 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                      <p className="text-[0.7rem] font-semibold text-cream">{post.handle}</p>
                      <p className="mt-0.5 text-[0.66rem] leading-snug text-cream/75">{post.caption}</p>
                    </div>
                    <span className="absolute right-2 top-2 rounded-pill bg-charcoal/55 px-2 py-0.5 font-mono text-[0.6rem] font-semibold text-cream backdrop-blur">
                      ♥ {post.likes.toLocaleString('en-IN')}
                    </span>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={className} aria-label={`${rating} out of 5 stars`}>
      <span aria-hidden className="text-step--1 tracking-[0.1em] text-charcoal">
        {'★'.repeat(rating)}
        <span className="text-charcoal/20">{'★'.repeat(5 - rating)}</span>
      </span>
    </span>
  );
}
