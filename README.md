# Zyntaverse Technologies — Landing Page

A full-stack B2B agency landing page: dark SaaS aesthetic, animated hero,
live project-cost calculator, tabbed solutions matrix, and a contact section
with QR/WhatsApp connect.

## Project structure

```
zyntaverse-website/
├── index.html              Main landing page
├── 404.html                 Custom "not found" page
├── thank-you.html            Shown after a successful form submission
├── privacy-policy.html        Template — needs your real business details
├── terms.html                 Template — needs your real business details
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── logo.png, logo-mark.png, favicon-32/64.png
│   ├── og-image.jpg           Social share preview image
│   └── video/                 (see "Video sections" below)
└── README.md
```

## Running it locally

No build step required — it's plain HTML/CSS/JS.

1. Unzip the folder.
2. Open `index.html` directly in a browser, **or** serve it locally for the most
   reliable behavior (some browsers restrict local file requests):
   ```bash
   cd zyntaverse-website
   python3 -m http.server 8080
   ```
   Then visit `http://localhost:8080`.

## Deploying

This is a static site — drag-and-drop the whole folder into any of:
- **Netlify** (drag the folder onto app.netlify.com/drop)
- **Vercel** (`vercel deploy` from inside the folder)
- **GitHub Pages** (push the folder to a repo and enable Pages)
- Any standard web host / cPanel `public_html`

## Content source

The core services grid (12 items), additional services checklist, tech stack
list, "Why choose us" copy, and the logo are all pulled directly from the
Zyntaverse flyer/brochure. Edit them the same way as any other copy — see
"Editing content" below.

## Video sections

Two of your brand reels are wired into the site:

- **Hero background** — a muted, looping 4s clip plays behind the hero panel.
- **Showcase section** (linked from the nav) — a full-bleed cinematic
  video background with a headline and two buttons that open a lightbox
  modal playing the **full, original** reels with sound controls.

The looping background clips (`hero-loop.mp4`, `cinematic-loop.mp4`) are
trimmed, muted, and downscaled copies of your original videos. The two
`showcase-*.mp4` files are your original videos, re-encoded for the web but
otherwise untouched, used only in the lightbox. All modern browsers play
H.264 MP4 natively — no plugins needed.

## Launch-readiness checklist

Before this goes live, here's what's done vs. what still needs you:

**Done for you:**
- Custom 404 page, thank-you page, robots.txt, sitemap.xml
- Open Graph + Twitter Card tags with a real share image (`assets/og-image.jpg`)
- Cookie consent banner (analytics only load after Accept)
- Sticky mobile "Book a Discovery Call" bar
- Inline form validation with error messages, loading spinners, and both
  forms actually submit — via FormSubmit.co to `zyntaversetechnologies@gmail.com`
- Compressed images (and fixed a transparency bug in the source logo files)

**You still need to do:**
1. **Activate form delivery** — the first submission through either form
   triggers a one-time confirmation email from FormSubmit to
   `zyntaversetechnologies@gmail.com`. Click the link in that email once,
   or nothing will get delivered.
2. **Swap the domain placeholder** — `robots.txt`, `sitemap.xml`, and the
   Open Graph tags in `index.html` all use `https://www.zyntaverse.com/` as
   a placeholder. Replace with your real deployed domain.
3. **Add your real business address** — shown as a highlighted placeholder
   in the Contact section, and required in `privacy-policy.html` /
   `terms.html`.
4. **Have a lawyer review** `privacy-policy.html` and `terms.html` — they're
   real, usable templates, not legal advice. Every business-specific fact
   (your entity name, address, jurisdiction, data retention period) is
   marked in pink and needs to be filled in.
5. **Add your real Google Analytics ID** — search `main.js` for
   `__GA_MEASUREMENT_ID__` and replace `G-XXXXXXXXXX` with your real GA4
   Measurement ID. Analytics won't load at all until you do this, and even
   then only after a visitor accepts cookies.
6. **Replace the Calendly placeholder** in the Contact section with your
   real embed/link.

## What's live vs. what needs your own accounts

**Fully functional out of the box:**
- Hero canvas node animation
- Project cost & scope calculator (real-time estimate + lead form)
- Hover-expand service cards
- Tabbed solutions matrix
- Auto-scrolling tech stack marquee
- Contact form UI (drag-and-drop file field included)
- Client-side generated WhatsApp QR code (`js/main.js`, uses a CDN QR library
  with an inline SVG fallback so it never renders blank)
- Floating AI copilot widget with a small set of scripted quick-answers

**Needs your own setup to go fully live:**
- **Contact form submission** — currently does not send anywhere. Wire it to
  a form backend (e.g. Formspree, Resend, your own API endpoint) inside
  `js/main.js` or as a `<form action="...">`.
- **Calendly / Cal.com booking** — the contact section has a placeholder
  card. Replace it with your real embed script and booking link.
- **AI copilot** — answers are hardcoded in `js/main.js`
  (`copilotAnswers` object). To make it a real AI assistant, connect it to
  an LLM API from your backend (never call an API key directly from
  client-side JS).

## Editing content

- Copy (headlines, service descriptions, pricing tiers) lives directly in
  `index.html`.
- Design tokens (colors, fonts, spacing) are CSS variables at the top of
  `css/style.css` under `:root` — change them once to reskin the whole site.
- Calculator pricing logic (base costs, multipliers) is in `js/main.js`
  inside the `data-cost` / `data-mult` / `data-add` attributes on the chip
  buttons in `index.html`, and the `updateCalc()` function in `js/main.js`.
