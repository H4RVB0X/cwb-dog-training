# Launch checklist: cwbdogtraining.co.uk

Do these in order at the visit. It takes about an hour, plus up to an hour for the domain to switch over.

**Bring:** a laptop. **Chris needs:** his GoDaddy login, his phone (for security codes), access to `info.cwbdogtraining@gmail.com`, and a bank card for Google (step 4).

The examples assume the organisation is called `cwbdogtraining` (available at the time of writing). If you use another name, swap it in everywhere below.

---

## 1. Chris's GitHub account (5 min)

- [ ] Chris signs up at <https://github.com/signup> using `info.cwbdogtraining@gmail.com`
- [ ] Turn on two-factor authentication: *profile photo → Settings → Password and authentication*

## 2. Create the organisation and move the website into it (10 min)

- [ ] You (H4RVB0X) go to <https://github.com/organizations/plan> → **Free** → name it `cwbdogtraining`
- [ ] *Organisation → People → Invite member* → Chris's username → role **Owner**. Chris accepts the email.
- [ ] Open <https://github.com/H4RVB0X/cwb-dog-training> → *Settings → General → Danger zone → Transfer* → to `cwbdogtraining`
- [ ] In the moved repo: *Settings → Pages → Build and deployment → Source* = **GitHub Actions** (re-select it if it's blank)
- [ ] On your laptop, point your copy at the new home:
  ```
  git remote set-url origin https://github.com/cwbdogtraining/cwb-dog-training.git
  ```

> Chris is now the owner and you're an owner too. If you ever step away, he just removes you and the site keeps working.

## 3. Contact form (5 min)

- [ ] Go to <https://web3forms.com> → enter `info.cwbdogtraining@gmail.com` → the access key arrives in Chris's inbox
- [ ] Paste it into **Contact details & settings → Web3Forms access key** in Pages CMS (step 7), or tell Claude to add it

## 4. Google rating, automatic (10 min)

Do this signed in to **Chris's** Google account, so it belongs to the business.

- [ ] <https://console.cloud.google.com/> → create a project called `CWB website`
- [ ] Add billing (Google requires a card; one check a day is tiny) → *Billing → Budgets & alerts* → create a **£1 budget alert**
- [ ] *APIs & Services → Library* → enable **Places API (New)**
- [ ] *APIs & Services → Credentials → Create credentials → API key*, then **Edit key** → *API restrictions* → **Restrict key** → tick only *Places API (New)* → Save
- [ ] Optional extra safety: *Places API (New) → Quotas* → cap requests per day at 50
- [ ] Copy the key. In GitHub: *repo → Settings → Secrets and variables → Actions → **Secrets** → New repository secret*
  - Name: `GOOGLE_PLACES_API_KEY`
  - Value: the key
- [ ] Don't paste the key anywhere else (email, chat, the code). Once saved in GitHub, nobody can view it again, only replace it.

## 5. Point the domain at the new site

**5a. In GitHub first**

- [ ] *Organisation → Settings → Pages → Add a domain* → `cwbdogtraining.co.uk` → GitHub shows a **TXT record**. Keep this page open. (This verification stops anyone else claiming the domain on GitHub.)
- [ ] *Repo → Settings → Secrets and variables → Actions → **Variables** → New repository variable*
  - Name: `CUSTOM_DOMAIN`
  - Value: `cwbdogtraining.co.uk`

  This switches the build from preview mode to the live site. No code change is needed.

**5b. In GoDaddy** (Chris logs in → *My Products → cwbdogtraining.co.uk → DNS*)

- [ ] **Screenshot the current DNS records first**, so anything can be undone
- [ ] Delete the existing **A** record(s) for `@` and the existing **CNAME** for `www` (they point at the old Website Builder site)
- [ ] Add these records:

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

**5c. Back in GitHub**

- [ ] *Organisation → Settings → Pages* → **Verify** the domain (try again in a few minutes if it isn't ready)
- [ ] *Repo → Settings → Pages → Custom domain* → `cwbdogtraining.co.uk` → Save
- [ ] Wait for the DNS check to go green (usually 10–60 minutes), then tick **Enforce HTTPS**
- [ ] *Repo → Actions → Deploy to GitHub Pages → Run workflow* to rebuild in live mode

## 6. Check it's live

- [ ] <https://cwbdogtraining.co.uk> and <https://www.cwbdogtraining.co.uk> both load the new site with the padlock
- [ ] Click through every page on a phone, and press a Bookwhen "Book" button and the WhatsApp button
- [ ] Send a test enquiry through the contact form and check it arrives
- [ ] *Repo → Actions → latest run → build step* shows `[rating] Google: 5.0 from …`, plus a **Place ID**. Paste that into **Google Place ID** in the Pages CMS settings.

## 7. Set up Pages CMS and teach Chris (20 min)

- [ ] Chris goes to <https://app.pagescms.org> → **Sign in with GitHub** → *Install the GitHub app* → choose the `cwbdogtraining` organisation → only the `cwb-dog-training` repo
- [ ] Open the repo in Pages CMS and walk through:
  - [ ] **Courses:** change a date and a Bookwhen link → Save → refresh the site about a minute later
  - [ ] **Blog posts:** hide or delete the sample post, or write his first one
  - [ ] **Reviews:** add one by copying it from Google
  - [ ] **Gallery and About timeline:** upload a photo
  - [ ] **Partners and FAQs:** add one
- [ ] Bookmark app.pagescms.org on his phone and laptop

## 8. Tidy up (after a few days of the new site working)

- [ ] Cancel the GoDaddy **Website Builder / Websites + Marketing** plan. **Keep the domain registration and auto-renew on.**
- [ ] Google Business Profile already links to cwbdogtraining.co.uk, so nothing to change there

---

## How it works afterwards

- **Chris** edits in Pages CMS → the site updates in about 1 minute
- **You** change the design or code in the same repo. Run `git pull` before starting, because Chris's edits go straight to `main`.
- **GoDaddy** only renews the domain
- **The site rebuilds every morning**, so the Google rating stays current
- **Secrets** (the Google key) live only in GitHub Secrets. They're never in the code and never sent to visitors.

**If something goes wrong:** put the DNS records back from your screenshot (step 5b) and the old site returns within the hour, as long as the Website Builder plan hasn't been cancelled yet.
