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
│   ├── logo.png           Full logo lockup (mark + wordmark), used as source
│   ├── logo-mark.png       Cropped Z-mark only, used in header/footer
│   ├── favicon-32.png      Favicon (32x32)
│   └── favicon-64.png      Favicon (64x64)
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
