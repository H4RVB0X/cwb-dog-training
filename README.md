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
| FAQs (shown on Contact page) | `src/data/faq.json` |
| About page timeline | `src/data/timeline.json` |
| Partners (home page) | `src/data/partners.json` |
| Blog posts | `src/content/blog/*.md` |
| Images | `public/images/` |

Course `status` controls the badge and button text:
- `open`: "Booking now" / "Book a place"
- `coming-soon`: "Register interest"
- `enquire`: "Enquire"
- `one-to-one`: "1-1 option"

The Blog menu link and the home page "From the blog" section only appear once at least one post is published (`draft: false`).

Set `hidden: true` to take a course off the site without deleting it, and `featured: true` to show it on the home page.

## Preview vs live

Every push to `main` (and a daily scheduled run) builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

- **Preview mode** (default): served from `https://<owner>.github.io/<repo>/`. `scripts/rebase.mjs` prefixes links with `BASE_PATH`, and `NOINDEX` keeps it out of Google.
- **Live mode**: set the Actions **variable** `CUSTOM_DOMAIN` to `cwbdogtraining.co.uk` and the build targets the real domain. No code change is needed.

## Going live

Follow **[LAUNCH-CHECKLIST.md](LAUNCH-CHECKLIST.md)**. It covers moving the repo into a GitHub organisation Chris owns, the contact form, the Google rating key, the GoDaddy DNS records, and Pages CMS.

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
