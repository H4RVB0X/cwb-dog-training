# Launch checklist: cwbdogtraining.co.uk

Do these in order at the visit. It takes about an hour, plus up to an hour for the domain to switch over.

**Bring:** a laptop. **Chris needs:** his GoDaddy login, his phone (for security codes) and access to `info.cwbdogtraining@gmail.com`.

The examples assume the organisation is called `cwbdogtraining` (available at the time of writing). If you use another name, swap it in everywhere below.

---

## 1. Chris's GitHub account (5 min)

- [x] Chris signs up at <https://github.com/signup> using `info.cwbdogtraining@gmail.com`
- [ ] Turn on two-factor authentication: *profile photo → Settings → Password and authentication*

## 2. Create the organisation and move the website into it (10 min)

- [x] You (H4RVB0X) go to <https://github.com/organizations/plan> → **Free** → name it `cwbdogtraining`
- [x] *Organisation → People → Invite member* → Chris's username → role **Owner**. Chris accepts the email.
- [x] Open the old repo (was `H4RVB0X/cwb-dog-training`) → *Settings → General → Danger zone → Transfer* → to `cwbdogtraining`
- [x] In the moved repo: *Settings → Pages → Build and deployment → Source* = **GitHub Actions** (re-select it if it's blank)
- [x] Tell Claude: *"The repo has moved to cwbdogtraining"*. Done: new home is <https://github.com/cwbdogtraining/cwb-dog-training>, preview at <https://cwbdogtraining.github.io/cwb-dog-training/>

> Chris is now the owner and you're an owner too. If you ever step away, he just removes you and the site keeps working.

## 3. Contact form (5 min)

- [x] Go to <https://web3forms.com> → enter `info.cwbdogtraining@gmail.com` → the access key arrives in Chris's inbox
- [x] Paste it into **Contact details & settings → Web3Forms access key** in Pages CMS (step 6), or tell Claude to add it

## 3b. Live Google reviews (10 min)

- [ ] Sign up free at <https://justreview.co> (no card needed) and connect the **CWB Dog Training** Google listing
- [ ] Set the widget to show **5-star reviews only** (anything above 4.5) and sort by **most recent**; choose a layout that shows the **overall rating** at the top
- [ ] Copy the embed code and paste it into Pages CMS → **Contact details & settings → Live Google reviews: paste the widget embed code** (or tell Claude to add it)
- [ ] Check the site: a cookie pop-up appears; **Accept** shows the live reviews, **Reject** keeps the hand-picked reviews

## 4. Point the domain at the new site

**4a. In GitHub first**

- [ ] *Organisation → Settings → Pages → Add a domain* → `cwbdogtraining.co.uk` → GitHub shows a **TXT record**. Keep this page open. (This verification stops anyone else claiming the domain on GitHub.)
- [x] *Repo → Settings → Secrets and variables → Actions → **Variables** → New repository variable*
  - Name: `CUSTOM_DOMAIN`
  - Value: `cwbdogtraining.co.uk`

  This switches the build from preview mode to the live site. No code change is needed.

**4b. In GoDaddy** (Chris logs in → *My Products → cwbdogtraining.co.uk → DNS*)

- [ ] **Screenshot the current DNS records first**, so anything can be undone
- [x] Delete the existing **A** record(s) for `@` and the existing **CNAME** for `www` (they point at the old Website Builder site)
- [x] Add these records:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | 1 hour |
| A | `@` | `185.199.109.153` | 1 hour |
| A | `@` | `185.199.110.153` | 1 hour |
| A | `@` | `185.199.111.153` | 1 hour |
| CNAME | `www` | `cwbdogtraining.github.io` | 1 hour |
| TXT | *(name from GitHub, e.g. `_github-pages-challenge-cwbdogtraining`)* | *(value from GitHub)* | 1 hour |

- [ ] **Don't touch** any MX or other TXT records (there shouldn't be email on this domain, but leave them if they exist)
- [ ] If GoDaddy asks whether to disconnect the Website Builder or turn off **Forwarding**, say yes

**4c. Back in GitHub**

- [ ] *Organisation → Settings → Pages* → **Verify** the domain (try again in a few minutes if it isn't ready)
- [x] *Repo → Settings → Pages → Custom domain* → `cwbdogtraining.co.uk` → Save
- [x] Wait for the DNS check to go green (usually 10–60 minutes), then tick **Enforce HTTPS**
- [x] *Repo → Actions → Deploy to GitHub Pages → Run workflow* to rebuild in live mode

## 5. Check it's live

- [x] <https://cwbdogtraining.co.uk> and <https://www.cwbdogtraining.co.uk> both load the new site with the padlock
- [ ] Click through every page on a phone, and press a Bookwhen "Book" button and the WhatsApp button
- [ ] Send a test enquiry through the contact form and check it arrives
- [ ] In Chris's BetterDog account, change his trainer map link to `https://cwbdogtraining.co.uk/betterdog/` (it currently points at the old GoDaddy site)

## 6. Set up Pages CMS and teach Chris (20 min)

- [ ] Chris goes to <https://app.pagescms.org> → **Sign in with GitHub** → *Install the GitHub app* → choose the `cwbdogtraining` organisation → only the `cwb-dog-training` repo
- [ ] Open the repo in Pages CMS and walk through:
  - [ ] **Courses:** change a date and a Bookwhen link → Save → refresh the site about a minute later
  - [ ] **Blog posts:** hide or delete the sample post, or write his first one
  - [ ] **Reviews:** add one by copying it from Google
  - [ ] **Star rating:** update the rating and number of reviews in *Contact details & settings* when they change on Google
  - [ ] **Gallery and About timeline:** upload a photo
  - [ ] **Partners and FAQs:** add one
- [ ] Bookmark app.pagescms.org on his phone and laptop

## 7. Tidy up (after a few days of the new site working)

- [ ] Cancel the GoDaddy **Website Builder / Websites + Marketing** plan. **Keep the domain registration and auto-renew on.**
- [ ] Google Business Profile already links to cwbdogtraining.co.uk, so nothing to change there

---

## How it works afterwards

- **Chris** edits in Pages CMS → the site updates in about 1 minute
- **You** ask Claude for design or code changes in the same repo. Claude fetches Chris's latest edits first, so nothing gets overwritten.
- **GoDaddy** only renews the domain
- **No secrets** are needed. The contact form key is designed to be public, and nothing private is in the code.

**If something goes wrong:** put the DNS records back from your screenshot (step 4b) and the old site returns within the hour, as long as the Website Builder plan hasn't been cancelled yet.
