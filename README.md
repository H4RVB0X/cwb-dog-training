# CWB Dog Training website

A fast static site built with [Astro](https://astro.build). Course dates, prices, reviews, gallery photos and contact details can be edited without touching code through [Pages CMS](https://pagescms.org).

## Pages

| URL | Page |
| --- | --- |
| `/` | Home |
| `/about/` | Chris's story (timeline) |
| `/1-1-training/` | 1-1 training, packages, puppy home visits |
| `/courses/` | All courses with filters, plus 1-1 prices |
| `/scentwork/` | Scent detection benefits and Bronze, Silver, Gold pathway |
| `/reviews/` | Google reviews and photo gallery |
| `/contact/` | Enquiry form (links like `/contact/?course=scent-bronze` pre-select the course) |
| `/privacy/` | Privacy note |

## Where the content lives

| What | File(s) |
| --- | --- |
| Courses (price, dates, status, image) | `src/content/courses/*.md` |
| Reviews | `src/content/reviews/*.md` |
| Phone, email, hours, socials, rating, form key | `src/data/settings.json` |
| 1-1 packages | `src/data/packages.json` |
| Gallery photos | `src/data/gallery.json` |
| Images | `public/images/` |

Course `status` controls the badge and button text:
- `open`: "Booking now" / "Book a place"
- `coming-soon`: "Register interest"
- `enquire`: "Enquire"
- `one-to-one`: "1-1 option"

Set `hidden: true` to take a course off the site without deleting it, and `featured: true` to show it on the home page.

## Preview on GitHub Pages

Every push to `main` deploys a preview to GitHub Pages via `.github/workflows/deploy.yml`.
The preview is served from a subfolder (`/<repo-name>/`), so the build runs `scripts/rebase.mjs`
to prefix links with `BASE_PATH`, and `NOINDEX=true` keeps it out of Google.
When moving to the real domain, delete those two `env` lines from the workflow.

## Going live (one-time setup)

1. **GitHub**: push this folder to a new GitHub repository.
2. **Hosting**: connect the repo to Netlify or Cloudflare Pages (both free).
   - Build command: `npm run build`
   - Output folder: `dist`
3. **Domain**: in GoDaddy DNS, point `cwbdogtraining.co.uk` at the new host by following the host's "add custom domain" steps. Cancel the GoDaddy Website Builder plan only once the new site is live.
4. **Contact form**: go to [web3forms.com](https://web3forms.com), enter `info.cwbdogtraining@gmail.com` to get a free access key, and paste it into `web3formsKey` in `src/data/settings.json` (or in Pages CMS under *Contact details & settings*). Until a key is set, the form opens the visitor's email app instead.
5. **Editing**: Chris signs in at [app.pagescms.org](https://app.pagescms.org) with a GitHub account and opens the repo. Every save rebuilds the site automatically in about a minute.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
```

## Design notes

- The "field kit" look uses navy, olive and tan, with the red of the lead from the CWB logo as the accent colour. The background texture is topographic contour lines (`public/topo.svg`).
- Fonts: Barlow Condensed for headings, Barlow for body text and IBM Plex Mono for labels. They are self-hosted through Fontsource, so there are no Google Fonts requests and no cookies.
- There's no cookie banner because the site sets no cookies and uses no analytics. If analytics are added later, use a cookieless option such as Plausible or Cloudflare Web Analytics to keep it that way.
- The review quotes are the opening lines Google shows publicly. Paste the full text into each review file and set `excerpt: false` to drop the "Read the full review" link.
