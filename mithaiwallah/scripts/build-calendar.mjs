/**
 * Builds the Instagram launch documents from content/instagram.mjs:
 *
 *   docs/03b-instagram-first-30-posts.md   every field of the first 30 posts
 *   docs/04-content-calendar-90-days.md    the 90-day calendar, week by week
 *   docs/content-calendar.csv              the same calendar for Sheets / Notion / Meta Business Suite
 *
 *   npm run calendar                       # starts 2026-10-01
 *   npm run calendar -- --start 2026-10-15
 *
 * Cadence follows the 12-month roadmap:
 *   Days  1–30  the 30 launch posts, one a day
 *   Days 31–60  one feed post a day, two a day in the Diwali window
 *   Days 61–90  Phase 2: two Reels and one Carousel every day
 * Pillars are chosen by deficit against the target mix, so the running mix
 * converges on 40 / 20 / 15 / 10 / 10 / 5 whatever the start date.
 */
import { writeFileSync } from 'node:fs';
import {
  BANK,
  CTA_BY_PILLAR,
  FESTIVALS,
  FIRST_30,
  HANDLE,
  PILLARS,
  TAGSET_BY_PILLAR,
  tags,
} from '../content/instagram.mjs';

const argStart = process.argv.indexOf('--start');
const START = argStart > -1 ? process.argv[argStart + 1] : '2026-10-01';
const DEFAULT_START = '2026-10-01';

const day = (n) => {
  const d = new Date(`${START}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d;
};
const iso = (d) => d.toISOString().slice(0, 10);
const human = (d) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', timeZone: 'UTC' });

const DIWALI_WINDOW = ['2026-11-01', '2026-11-10'];

/** Posting times (IST) that suit Indian Instagram audiences; test and adjust after week 3. */
const TIMES = { 1: ['19:30'], 2: ['12:30', '20:00'], 3: ['08:30', '13:00', '20:00'] };

const STORIES = {
  1: 'Poll: “Which sweet are you?” + link sticker to /sweets',
  2: 'Behind the scenes: kitchen clips, halwai at work',
  3: 'Question box: “Ask us anything about mithai / gifting”',
  4: 'Order reminder + link sticker; countdown sticker near festivals',
  5: 'Reshare customer stories and unboxings (with permission)',
  6: 'Founder takeover: 3–5 frames, face to camera',
  0: 'Family & festive moments; weekend order cut-off reminder',
};

const FESTIVAL_POSTS = {
  'Navratri begins': { format: 'Carousel', title: 'Navratri gifting, nine ways', hook: 'Nine days of visits. Here’s what to take.' },
  Dussehra: { format: 'Carousel', title: 'Dussehra: who are you sharing this box with?', hook: 'Victory tastes sweeter shared.' },
  'Karva Chauth': { format: 'Carousel', title: 'Karva Chauth + last week for branded Diwali orders', hook: 'Karva Chauth today. Diwali soon. Have you ordered?' },
  Dhanteras: { format: 'Reel', title: 'Dhanteras: the gold in every box', hook: 'The only gold you can eat.' },
  Diwali: { format: 'Reel', title: 'Happy Diwali from the Mithaiwallah kitchen', hook: 'From our kadhai to your thali — Happy Diwali.' },
  'Bhai Dooj (10–11 Nov by region)': { format: 'Photo', title: 'Bhai Dooj sibling box', hook: 'For the sibling who still steals your sweets.' },
  Christmas: { format: 'Carousel', title: 'Christmas & New Year client gifting', hook: 'The year-end gift your clients will actually open.' },
};

/* ── Schedule ─────────────────────────────────────────────────────────── */

const counts = Object.fromEntries(Object.keys(PILLARS).map((k) => [k, 0]));
const uses = new Map(); // idea → times used
const rows = [];

const inSeason = (i, date) => (!i.from || date >= i.from) && (!i.to || date <= i.to);

function pickPillar() {
  const total = Object.values(counts).reduce((a, b) => a + b, 0) + 1;
  return Object.entries(PILLARS)
    .map(([k, v]) => [k, v.target * total - counts[k]])
    .sort((a, b) => b[1] - a[1])[0][0];
}

/**
 * Least-used in-season idea first; among equals prefer the slot's format.
 * An idea used in another format is re-cut (a Reel becomes a Carousel of
 * stills, and so on) rather than repeated verbatim.
 */
function takeIdea(pillar, format, date) {
  const pool = BANK[pillar].filter((i) => inSeason(i, date));
  pool.sort((a, b) => (uses.get(a) ?? 0) - (uses.get(b) ?? 0) || (a.format === format ? -1 : 0) - (b.format === format ? -1 : 0));
  const item = pool[0];
  const n = uses.get(item) ?? 0;
  uses.set(item, n + 1);
  const recut = item.format !== format ? ` (as ${format.toLowerCase()})` : '';
  return { ...item, format, title: `${item.title}${recut}${n ? ` — take ${n + 1}` : ''}` };
}

function push(n, slot, post) {
  const d = day(n);
  counts[post.pillar]++;
  rows.push({
    day: n + 1,
    date: iso(d),
    human: human(d),
    slot,
    time: post.time,
    format: post.format,
    pillar: post.pillar,
    title: post.title,
    hook: post.hook,
    cta: post.cta ?? CTA_BY_PILLAR[post.pillar],
    hashtags: post.hashtags ?? tags(...TAGSET_BY_PILLAR[post.pillar]),
    festival: post.festival ?? '',
    stories: slot === 1 ? STORIES[d.getUTCDay()] : '',
    launch: post.launch ?? '',
  });
}

for (let n = 0; n < 90; n++) {
  const date = iso(day(n));
  const festival = FESTIVALS.find((f) => f.date === date);

  if (n < 30) {
    const p = FIRST_30[n];
    push(n, 1, { ...p, time: TIMES[1][0], launch: `#${n + 1}`, festival: festival?.name });
    continue;
  }

  const inDiwali = date >= DIWALI_WINDOW[0] && date <= DIWALI_WINDOW[1];
  const formats = n >= 60 ? ['Reel', 'Reel', 'Carousel'] : inDiwali ? ['Reel', 'Carousel'] : [n % 3 === 0 ? 'Carousel' : n % 3 === 1 ? 'Reel' : 'Photo'];
  const times = TIMES[formats.length];

  formats.forEach((format, i) => {
    if (i === 0 && festival && FESTIVAL_POSTS[festival.name]) {
      const fp = FESTIVAL_POSTS[festival.name];
      push(n, 1, { ...fp, pillar: festival.pillar, time: times[0], festival: festival.name, hashtags: tags(...TAGSET_BY_PILLAR[festival.pillar], 'festive') });
      return;
    }
    const pillar = pickPillar();
    push(n, i + 1, { ...takeIdea(pillar, format, date), pillar, time: times[i], festival: i === 0 ? festival?.name : undefined });
  });
}

/* ── Output: first 30 in full ─────────────────────────────────────────── */

const pillarLabel = (k) => PILLARS[k].label;
const first30 = [
  '# 03b · Instagram — The First 30 Posts',
  '',
  `> Generated from \`content/instagram.mjs\` by \`npm run calendar\`. Edit the data file, not this document.`,
  '',
  `Account: **${HANDLE}** · 10 Reels · 10 Carousels · 10 Photo posts · one a day from ${human(day(0))}.`,
  '',
  'Anything in **[square brackets]** must be replaced with something true before posting — the founder’s own words, a real halwai’s name (with consent), real order numbers. Never stage volume, reviews or reactions that did not happen.',
  '',
  START !== DEFAULT_START
    ? `> ⚠️ Start date moved to ${START}. Posts #11, #20, #29 and #30 are written for Navratri (11 Oct), Dussehra (20 Oct), Karva Chauth (29 Oct) and “nine days to Diwali” — move them to those dates.\n`
    : '',
  '| # | Date | Format | Pillar | Post |',
  '|---|---|---|---|---|',
  ...FIRST_30.map((p, i) => `| ${i + 1} | ${human(day(i))} | ${p.format} | ${pillarLabel(p.pillar)} | [${p.title}](#${i + 1}) |`),
  '',
  ...FIRST_30.flatMap((p, i) => [
    '---',
    '',
    `<a id="${i + 1}"></a>`,
    `## ${i + 1}. ${p.title}`,
    '',
    `**${human(day(i))} · ${p.format} · ${pillarLabel(p.pillar)}**`,
    '',
    `**Hook** — ${p.hook}`,
    '',
    `**${p.format === 'Reel' ? 'Script & shot list' : p.format === 'Carousel' ? 'Slides' : 'Shot'}**`,
    '',
    ...p.script.map((s) => `- ${s}`),
    '',
    '**Caption**',
    '',
    ...p.caption.split('\n').map((l) => (l ? `> ${l}` : '>')),
    '',
    `**CTA** — ${p.cta}`,
    '',
    `**Hashtags** — ${p.hashtags}`,
    '',
  ]),
].join('\n');

/* ── Output: 90-day calendar ──────────────────────────────────────────── */

const total = rows.length;
const mix = Object.keys(PILLARS)
  .map((k) => `| ${pillarLabel(k)} | ${Math.round(PILLARS[k].target * 100)}% | ${counts[k]} | ${Math.round((counts[k] / total) * 100)}% |`)
  .join('\n');
const byFormat = ['Reel', 'Carousel', 'Photo'].map((f) => `${f}s: ${rows.filter((r) => r.format === f).length}`).join(' · ');

const weeks = [];
for (let w = 0; w < Math.ceil(90 / 7); w++) {
  const wk = rows.filter((r) => r.day > w * 7 && r.day <= (w + 1) * 7);
  if (!wk.length) continue;
  weeks.push(
    [
      `### Week ${w + 1} · ${wk[0].human} – ${wk[wk.length - 1].human}`,
      '',
      '| Day | Date | Time (IST) | Format | Pillar | Post | Hook | Stories |',
      '|---|---|---|---|---|---|---|---|',
      ...wk.map(
        (r) =>
          `| ${r.day} | ${r.human}${r.festival ? ` ✦ **${r.festival}**` : ''} | ${r.time} | ${r.format} | ${pillarLabel(r.pillar)} | ${r.launch ? `**${r.launch}** ` : ''}${r.title} | ${r.hook} | ${r.stories} |`,
      ),
      '',
    ].join('\n'),
  );
}

const calendar = [
  '# 04 · 90-Day Content Calendar',
  '',
  `> Generated from \`content/instagram.mjs\` by \`npm run calendar\`${START !== DEFAULT_START ? ` (start ${START})` : ''}. Import \`docs/content-calendar.csv\` into Google Sheets, Notion or Meta Business Suite’s planner.`,
  '',
  `**${human(day(0))} → ${human(day(89))}** · ${total} feed posts · ${byFormat} · daily Stories`,
  '',
  '## Cadence',
  '',
  '| Days | Phase (roadmap) | Feed | Stories |',
  '|---|---|---|---|',
  '| 1–30 | Foundation | The 30 launch posts (doc 03b), one a day | 3–5 frames daily |',
  '| 31–60 | Foundation → awareness | One post a day; **two a day 1–10 Nov** (Diwali window) | 5+ frames daily |',
  '| 61–90 | Brand awareness | **2 Reels + 1 Carousel daily** | 5+ frames daily |',
  '',
  'Every Reel is also published as a **YouTube Short** and a **Facebook Reel** the same day (native upload, no watermark). Carousels go to the Facebook page as albums.',
  '',
  '## Content mix achieved',
  '',
  '| Pillar | Target | Posts | Actual |',
  '|---|---|---|---|',
  mix,
  '',
  'The ten content pillars from the brief map into these six buckets: *sweet-making process, behind the scenes, factory tours, product close-ups* → Sweet-making; *packaging videos* → Packaging; *festival campaigns* → whichever bucket the post serves (festive packaging, corporate festive, etc.); *customer reactions* → Testimonials.',
  '',
  '## Festival anchors in this window',
  '',
  ...FESTIVALS.filter((f) => f.date >= iso(day(0)) && f.date <= iso(day(89))).map((f) => `- **${f.name}** — ${new Date(f.date + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}`),
  '',
  'Dates checked against published 2026 panchang calendars; confirm locally (Bhai Dooj falls on 10 or 11 November by region). Wedding-season content ramps up after Dev Uthani Ekadashi in late November.',
  '',
  '## Weekly rhythm for the team',
  '',
  '- **Monday** — plan the week, confirm shoots, write captions (use doc 03b as the template).',
  '- **Tuesday** — batch-shoot 6–10 Reels in the kitchen (morning light, clean set).',
  '- **Wednesday** — edit; schedule the week in Meta Business Suite.',
  '- **Daily** — reply to every comment and DM within 2 hours during business hours; DMs with “DIWALI”, “WEDDING”, “LOGO”, “CHECKLIST”, “ROYAL” get the matching catalogue link and a lead-form link (see doc 05).',
  '- **Friday** — review the week’s numbers (reach, saves, shares, profile visits, link taps, DMs, leads).',
  '',
  '## Calendar',
  '',
  ...weeks,
].join('\n');

/* ── Output: CSV ──────────────────────────────────────────────────────── */

const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const csv = [
  ['day', 'date', 'time_ist', 'slot', 'format', 'pillar', 'title', 'hook', 'cta', 'hashtags', 'festival', 'stories', 'launch_post', 'status'].join(','),
  ...rows.map((r) => [r.day, r.date, r.time, r.slot, r.format, pillarLabel(r.pillar), r.title, r.hook, r.cta, r.hashtags, r.festival, r.stories, r.launch, 'planned'].map(csvCell).join(',')),
].join('\n');

writeFileSync('docs/03b-instagram-first-30-posts.md', first30.replace(/\n{3,}/g, '\n\n'));
writeFileSync('docs/04-content-calendar-90-days.md', calendar);
writeFileSync('docs/content-calendar.csv', csv);
console.log(`calendar: ${total} posts from ${iso(day(0))}; ${byFormat}`);
console.log(Object.entries(counts).map(([k, v]) => `${k} ${Math.round((v / total) * 100)}%`).join(' · '));
