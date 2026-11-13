# Deploying to Vercel

## 1. Place the files

| File | Goes to |
|---|---|
| `vercel.json` | project root (next to `package.json`) |
| `index.html` | project root — replace existing |
| `favicon.svg` | `public/favicon.svg` — replace the Vite default |
| `robots.txt` | `public/robots.txt` |

## 2. Fill the blanks in `src/data.js`

Empty values render nothing, so the site works without them — but Contact
will be an empty page until at least the email is set.

```js
  email: "abel@example.com",
  socials: {
    github: "",
    linkedin: "https://www.linkedin.com/in/...",
    ...
  },
```

## 3. Check `public/`

```powershell
dir public
dir public\logos
```

Confirm these exist, with exactly matching capitalisation:

- `CV.pdf` — must match `PROFILE.cv` in data.js (`/CV.pdf`)
- `favicon.svg`
- `robots.txt`
- `logos/imo.png`, `mercor.png`, `sophie-fellowship.png`,
  `inmo.png`, `deva-matha.png`, `vedic-mathrix.png`

Windows ignores capitalisation; Vercel's Linux servers do not. A file named
`cv.pdf` referenced as `/CV.pdf` works locally and 404s in production.

Missing logos render as broken images on the Research page. If you don't have
one, delete the `logo` line from that entry in `data.js`.

## 4. Test the production build locally

```powershell
npm run build
npm run preview
```

This catches errors the dev server hides. Open the preview URL and click
through every page.

## 5. Push to GitHub

```powershell
git init
git add .
git commit -m "Initial commit"
```

Create an empty repo on github.com (no README, no .gitignore), then:

```powershell
git remote add origin https://github.com/YOURNAME/REPO.git
git branch -M main
git push -u origin main
```

Verify `node_modules` was NOT committed — Vite's default `.gitignore`
excludes it. `git status` should not list it.

## 6. Deploy

1. vercel.com → sign in with GitHub
2. Add New → Project → import the repo
3. Framework preset should auto-detect as **Vite**
4. Build command `npm run build`, output directory `dist`
5. Deploy

Every `git push` to `main` redeploys automatically.

## 7. After the first deploy

- Visit `/about` directly and refresh — if it 404s, `vercel.json` isn't in
  the root.
- Add `og-image.png` (1200×630) to `public/` for link previews.
- Custom domain: Project → Settings → Domains, then point DNS at the records
  Vercel provides. Afterwards add these two lines back into `index.html`
  inside `<head>`, using the real domain:

```html
<link rel="canonical" href="https://yourdomain.com/" />
<meta property="og:url" content="https://yourdomain.com/" />
```
