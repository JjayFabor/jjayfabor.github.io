---
title: "A Year in Japanese"
slug: "a-year-in-japanese"
description: "A twenty-four chapter book that teaches a complete beginner to read Japanese, one chapter per Japanese micro-season, with romaji that fades away as each character is learned."
category: "Full-Stack Application"
status: "completed"
featured: false
date: "2026-07-30"
image: "projects/a-year-in-japanese.png"
screenshots:
  - "projects/a-year-in-japanese-practice.png"
link: "https://github.com/JjayFabor/a-year-in-japanese"
preview: "https://nihongo.jjayfabor.com"
techStack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Web Audio API", "Vercel"]
---

二十四節気 is a book I wrote for one person who wanted to learn Japanese. Japan
divides the year into twenty-four *sekki* — micro-seasons of about fifteen days
each: the start of autumn, white dew, frost descending, greater cold. The book
has one chapter for each of them. It opens in August at 立秋 and closes the
following July, and by the end of it a total beginner can read kana.

Anyone can read it. Only one person has the copy that remembers her.

## Problem

Beginner Japanese material tends to fail in one of two directions. Apps
gamify the language into streaks and points, which measures showing up rather
than reading. Textbooks hand over a kana chart on page one and expect it
memorised by page two. Both leave romaji propped underneath the Japanese
forever, so the training wheels never come off — you keep reading the letters
you already know and never the characters you're supposedly learning.

I wanted something that read like a book rather than a course, and that could
prove it was working: a reader should be able to *see* the romaji leaving.

## Approach

Romaji sits beneath the Japanese and fades as each character is learned — per
mora, so あお can lose its romaji entirely while あき keeps the `ki` until the
か-row is earned. Nothing sets that opacity by hand; it's derived from progress,
so getting a character wrong later brings its romaji back. The book can't
flatter you.

Underneath that is a deliberately conservative model of "learned". A character's
strength rises on a correct recall, but at most once per sitting — getting the
same character right four times in one evening proves nothing about tomorrow.
Full disappearance has to be earned across separate visits, so the book never
claims to know a reader better than she knows herself.

For pronunciation there's a record-and-compare view instead of a score. She
hears a native clip, records herself, and sees both waveforms on a *shared time
axis*, where width is proportional to duration — because length is meaning in
Japanese (おばさん is an aunt, おばあさん a grandmother). Silence is trimmed
before measuring and amplitude is normalised, so tapping stop a beat late or
holding the phone further away doesn't show up as a difference. There is no
speech recognition and no grade: her ear does the judging.

## Key features

- Twenty-four chapters across four volumes, each tied to a real *sekki* that
  supplies its palette, its vocabulary and its culture material
- Per-mora romaji decay derived from progress, reversible when recall slips
- Practice that resurfaces weak characters from earlier chapters, oldest first,
  and accepts Kunrei spellings (`si`, `tu`, `hu`, `sya`) alongside Hepburn
- Mnemonics that hook a character's *shape*, naming the confusable pairs
  outright (あ/お, さ/き, シ/ツ, ソ/ン) and giving the test, not just the warning
- 355 pronunciation clips generated at build time and committed, so a phone
  with no signal still works
- Record-and-compare waveforms on a shared time axis, with no score
- Public book, private copy: the password gates persistence, not content

## Tech stack & role

Built solo. Next.js 16, React 19, TypeScript and Tailwind 4, deployed on Vercel
at [nihongo.jjayfabor.com](https://nihongo.jjayfabor.com).

Almost all of it is static. Chapters are prerendered and audio is synthesised at
build time through `edge-tts`, so the entire server-side surface is two routes:
one to claim a copy with a password, one to read and write a single private JSON
blob. Progress lands in local state first and syncs on a 1.5-second debounce, so
a tap never waits on the network, and an ETag conflict re-reads and *merges*
rather than overwriting — taking the higher strength and the more recent
timestamp per character, so a merge can never cost her ground.

The privacy model is enforced rather than promised. The password and the
dedication name live only in environment variables; the name appears in no
prerendered HTML and arrives only over the authenticated API after hydration.
Leave the password unset and the deployment fails closed — everyone is a
visitor, nothing is stored, and every chapter still reads.

## Outcome & what I learned

All twenty-four chapters are written and live: 141 distinct characters, 192
words and phrases, 355 audio clips. Chapter 18 teaches ぜんぶよめます — *I can
read all of it* — and chapter 24 closes with ぜんぶよめました in the past tense
learned one chapter earlier, then links back to chapter 1: begin again. The book
loops rather than dead-ends.

Two things stuck with me. The first was that derived state beats stored state
almost every time — romaji opacity computed from progress meant there was no
"mark as learned" path to keep in sync, and no way for the display to disagree
with what the reader had actually earned.

The second was about being honest in the build. Every word and sentence in the
book carries a citation field pointing at a dictionary or corpus entry, and
`npm run verify` fails while any of them is still `pending`. They currently all
are — the vocabulary is common and I expect it to hold up, but the composed
example sentences genuinely want a native reader before I claim otherwise. It
was tempting to make the check pass. Leaving it red is the more useful choice:
the build tracks the debt instead of pretending it doesn't exist.
