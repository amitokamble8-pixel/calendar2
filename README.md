# Application Deadlines Calendar

Interactive calendar for tracking university application deadlines. Everything is in a single index.html (styles and script inlined) — no build step, no dependencies.

## Features
- Month view (Monday-first) and a List view grouped by month, with countdowns ("in 12d", red when ≤ 7 days)
- "Coming up" sidebar showing the next 8 open deadlines
- Search, plus filters by country, type and "hide completed"
- Add / edit / delete / mark complete (click a day, a chip, or **+ Add deadline**)
- Import CSV (accepts `YYYY-MM-DD` or `DD/MM/YYYY`), export CSV, export `.ics` (with a 7-day reminder) for Google Calendar / Outlook / Apple Calendar
- Keyboard: ← / → change month, `T` today, `N` new deadline

## Data
- **Default data** lives in `deadlines.json`. It's loaded the first time someone opens the site.
- After that, each person's edits are saved **in their own browser** (localStorage). They are not shared with other users.
- To publish a list for the whole team: export CSV → edit → convert/paste into `deadlines.json` → redeploy. Users click **Data ▸ Reset to default data** to pick up the new list.

CSV columns: `title, institution, country, type, date, time, timezone, priority, link, notes, done`
(`title` and `date` required; `university`/`school` are accepted for `institution`, `deadline` for `date`.)

## Deploy to Vercel
**Option A — CLI**
```bash
npm i -g vercel
cd deadline-calendar
vercel          # preview
vercel --prod   # production
```
When asked for framework, choose **Other**; leave build command and output directory empty.

**Option B — GitHub**
Push this folder to a GitHub repo → vercel.com ▸ Add New ▸ Project ▸ import repo → Framework preset **Other** → Deploy.

## Run locally
```bash
npx serve .      # or: python3 -m http.server 8000
```
(Opening `index.html` directly from disk won't load `deadlines.json` in most browsers — use a local server.)
