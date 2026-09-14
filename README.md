# Zyntaverse Technologies — Landing Page

A full-stack B2B agency landing page: dark SaaS aesthetic, animated hero,
live project-cost calculator, tabbed solutions matrix, and a contact section
with QR/WhatsApp connect.

## Project structure

```
zyntaverse-website/
├── index.html          Main page markup
├── css/
│   └── style.css        All styles (design tokens as CSS variables at the top)
├── js/
│   └── main.js           Hero animation, calculator logic, tabs, marquee, AI copilot, QR generation
├── assets/
│   ├── logo.png                    Full logo lockup (mark + wordmark)
│   ├── logo-mark.png                Cropped Z-mark only, used in header/footer
│   ├── favicon-32.png                Favicon (32x32)
│   ├── favicon-64.png                Favicon (64x64)
│   └── video/
│       ├── hero-loop.mp4              Muted looping background clip, hero panel
│       ├── hero-loop-poster.jpg        Poster frame for hero-loop.mp4
│       ├── cinematic-loop.mp4          Muted looping background clip, Showcase section
│       ├── cinematic-loop-poster.jpg    Poster frame for cinematic-loop.mp4
│       ├── showcase-ai-ops.mp4          Full original brand reel #1 (lightbox modal)
│       ├── showcase-ai-ops-poster.jpg    Poster frame for the above
│       ├── showcase-dev-workflow.mp4     Full original brand reel #2 (lightbox modal)
│       └── showcase-dev-workflow-poster.jpg  Poster frame for the above
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
- **Showcase section** (new, linked from the nav) — a full-bleed cinematic
  video background with a headline and two buttons that open a lightbox
  modal playing the **full, original** reels with sound controls.

The looping background clips (`hero-loop.mp4`, `cinematic-loop.mp4`) are
trimmed, muted, and downscaled copies of your original videos — this keeps
page weight down since they never need audio or full resolution. The two
`showcase-*.mp4` files are your original videos, re-encoded for the web but
otherwise untouched, used only in the lightbox.

All modern browsers (Chrome, Firefox, Safari, Edge) play H.264 MP4 natively,
so no plugins or extra setup are needed. If you swap in new video clips,
avoid using the very first frame as a poster/thumbnail without checking it
first — some export tools (including WhatsApp's) bake in a preview-montage
frame at timestamp 0 that isn't representative of the actual video.

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
