// ---------- scroll progress + header shadow ----------
const progressBar = document.getElementById('scroll-progress');
const header = document.getElementById('site-header');
window.addEventListener('scroll', ()=>{
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (docHeight > 0 ? (scrollTop/docHeight)*100 : 0) + '%';
  header.classList.toggle('scrolled', scrollTop > 8);
}, { passive:true });

// ---------- mobile menu ----------
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
navToggle.addEventListener('click', ()=>{
  const isOpen = mobileMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  navToggle.innerHTML = isOpen
    ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
    : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
});
mobileMenu.querySelectorAll('a').forEach(a=>{
  a.addEventListener('click', ()=>{
    mobileMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
  });
});

// ---------- count-up stats ----------
const countEls = document.querySelectorAll('.proof-item .num');
const countIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1100;
    const start = performance.now();
    function frame(now){
      const p = Math.min(1, (now-start)/duration);
      const eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(target*eased) + suffix;
      if(p<1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    countIO.unobserve(el);
  });
}, { threshold:0.6 });
countEls.forEach(el=>countIO.observe(el));

// ---------- QR code (client-side, no external image request) ----------
(function(){
  const mount = document.getElementById('qr-mount');
  const waLink = 'https://wa.me/917992153750';
  function fallbackPattern(){
    // Guaranteed-visible dark-on-light placeholder if the QR library can't load (e.g. offline preview)
    mount.innerHTML = `<svg viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
      <rect width="29" height="29" fill="#fff"/>
      <g fill="#0B0F19">
        <rect x="0" y="0" width="7" height="7"/><rect x="1" y="1" width="5" height="5" fill="#fff"/><rect x="2" y="2" width="3" height="3"/>
        <rect x="22" y="0" width="7" height="7"/><rect x="23" y="1" width="5" height="5" fill="#fff"/><rect x="24" y="2" width="3" height="3"/>
        <rect x="0" y="22" width="7" height="7"/><rect x="1" y="23" width="5" height="5" fill="#fff"/><rect x="2" y="24" width="3" height="3"/>
        <rect x="9" y="2" width="2" height="2"/><rect x="13" y="2" width="2" height="2"/><rect x="17" y="4" width="2" height="2"/>
        <rect x="9" y="9" width="3" height="3"/><rect x="14" y="9" width="2" height="2"/><rect x="18" y="9" width="3" height="3"/>
        <rect x="9" y="13" width="2" height="2"/><rect x="13" y="13" width="3" height="3"/><rect x="19" y="13" width="2" height="2"/>
        <rect x="9" y="17" width="4" height="2"/><rect x="15" y="17" width="2" height="2"/><rect x="19" y="18" width="3" height="3"/>
        <rect x="9" y="20" width="2" height="2"/><rect x="13" y="21" width="2" height="2"/><rect x="17" y="21" width="4" height="2"/>
        <rect x="9" y="24" width="3" height="2"/><rect x="14" y="24" width="2" height="3"/><rect x="19" y="24" width="4" height="2"/>
      </g>
    </svg>`;
  }
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
  script.onload = function(){
    try{
      new QRCode(mount, { text: waLink, width: 84, height: 84, colorDark:'#0B0F19', colorLight:'#ffffff', correctLevel: QRCode.CorrectLevel.M });
    }catch(e){ fallbackPattern(); }
  };
  script.onerror = fallbackPattern;
  document.head.appendChild(script);
})();

// ---------- reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

// ---------- video lightbox (showcase reels) ----------
const lightbox = document.getElementById('video-lightbox');
const lightboxVideo = document.getElementById('lightbox-video');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src, poster){
  lightboxVideo.setAttribute('poster', poster);
  lightboxVideo.querySelector('source')?.remove();
  const source = document.createElement('source');
  source.src = src; source.type = 'video/mp4';
  lightboxVideo.appendChild(source);
  lightboxVideo.load();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
  lightboxVideo.play().catch(()=>{});
}
function closeLightbox(){
  lightboxVideo.pause();
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('open-showcase-1')?.addEventListener('click', ()=>{
  openLightbox('assets/video/showcase-ai-ops.mp4', 'assets/video/showcase-ai-ops-poster.jpg');
});
document.getElementById('open-showcase-2')?.addEventListener('click', ()=>{
  openLightbox('assets/video/showcase-dev-workflow.mp4', 'assets/video/showcase-dev-workflow-poster.jpg');
});
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });

// ---------- pause background videos when off-screen (perf) ----------
document.querySelectorAll('video[autoplay]').forEach(vid=>{
  const vidIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) vid.play().catch(()=>{});
      else vid.pause();
    });
  }, { threshold:0.1 });
  vidIO.observe(vid);
});

// ---------- marquee duplicate for seamless loop ----------
const track = document.getElementById('marquee-track');
track.innerHTML += track.innerHTML;

// ---------- calculator ----------
const calcState = { type:null, timeline:'standard', platforms:new Set() };
document.querySelectorAll('.chip-row').forEach(row=>{
  const group = row.dataset.group;
  const multi = row.dataset.multi === 'true';
  row.querySelectorAll('.chip').forEach(chip=>{
    chip.addEventListener('click', ()=>{
      if(multi){
        chip.classList.toggle('active');
        if(chip.classList.contains('active')) calcState.platforms.add(chip.dataset.value);
        else calcState.platforms.delete(chip.dataset.value);
      } else {
        row.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
        chip.classList.add('active');
        if(group==='type') calcState.type = chip;
        if(group==='timeline') calcState.timeline = chip;
      }
      updateCalc();
    });
  });
});

function updateCalc(){
  const costEl = document.getElementById('calc-cost');
  const timeEl = document.getElementById('calc-time');
  const summaryEl = document.getElementById('calc-summary');
  const leadForm = document.getElementById('lead-form');

  document.getElementById('step-label-1').classList.toggle('done', !!calcState.type);
  document.getElementById('step-label-3').classList.toggle('done', document.querySelectorAll('[data-group="platform"] .chip.active').length > 0);

  if(!calcState.type){
    costEl.textContent = 'Select an option';
    timeEl.textContent = '';
    summaryEl.textContent = 'Choose a project type, timeline, and platform to see a live estimate build itself.';
    leadForm.classList.remove('show');
    return;
  }
  const base = parseFloat(calcState.type.dataset.cost);
  const baseWeeks = parseFloat(calcState.type.dataset.weeks);
  const timelineChip = calcState.timeline;
  const mult = timelineChip ? parseFloat(timelineChip.dataset.mult) : 1;
  const weeksMult = timelineChip ? parseFloat(timelineChip.dataset.weeksmult) : 1;

  let platformAdd = 0;
  const platformNames = [];
  document.querySelectorAll('[data-group="platform"] .chip.active').forEach(c=>{
    platformAdd += parseFloat(c.dataset.add);
    platformNames.push(c.textContent);
  });

  const low = Math.round(((base*mult)+platformAdd)*0.9/500)*500;
  const high = Math.round(((base*mult)+platformAdd)*1.15/500)*500;
  const weeks = Math.max(2, Math.round(baseWeeks*weeksMult));

  costEl.textContent = `$${low.toLocaleString()} – $${high.toLocaleString()}`;
  timeEl.textContent = `~${weeks} weeks estimated`;
  summaryEl.textContent = `${calcState.type.textContent} project, ${timelineChip ? timelineChip.textContent.toLowerCase() : 'standard'} timeline${platformNames.length ? ', targeting ' + platformNames.join(', ') : ''}.`;
  leadForm.classList.add('show');
}

// ---------- solutions tabs ----------
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.querySelector(`.tab-panel[data-panel="${btn.dataset.tab}"]`).classList.add('active');
  });
});

// ---------- AI copilot ----------
const copBtn = document.getElementById('copilot-toggle');
const copPanel = document.getElementById('copilot-panel');
const copBody = document.getElementById('copilot-body');
copBtn.addEventListener('click', ()=> copPanel.classList.toggle('open'));

const copilotAnswers = {
  pricing: "MVPs typically start around $12k, full web apps around $28k, and enterprise SaaS builds from $65k — the calculator above gives you a live range in seconds.",
  timeline: "Most MVPs ship in 4–8 weeks, standard web apps in 8–14 weeks, and enterprise builds in 3–5 months depending on scope.",
  stack: "We work primarily in React, Next.js, Node.js, and Python, with PostgreSQL/Supabase, Docker, and Kubernetes for infrastructure."
};
document.querySelectorAll('.copilot-quick button').forEach(b=>{
  b.addEventListener('click', ()=>{
    const userMsg = document.createElement('div');
    userMsg.className = 'copilot-msg';
    userMsg.style.alignSelf='flex-end';
    userMsg.style.background = 'linear-gradient(120deg, rgba(99,102,241,.25), rgba(236,72,153,.25))';
    userMsg.textContent = b.textContent;
    copBody.appendChild(userMsg);

    const botMsg = document.createElement('div');
    botMsg.className = 'copilot-msg bot';
    botMsg.textContent = copilotAnswers[b.dataset.q];
    copBody.appendChild(botMsg);
    copBody.scrollTop = copBody.scrollHeight;
  });
});

// ---------- form helpers: validation, loading state, FormSubmit AJAX ----------
// NOTE: Forms POST to FormSubmit.co using the address in FORM_EMAIL below.
// The first submission to a new address triggers a one-time confirmation
// email from FormSubmit that must be approved before messages deliver.
const FORM_EMAIL = 'zyntaversetechnologies@gmail.com';

function setFieldError(fieldEl, show){
  fieldEl.classList.toggle('has-error', show);
}
function isValidEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function setBtnLoading(btn, loading){
  btn.classList.toggle('is-loading', loading);
}
function showStatus(el, message, type){
  el.textContent = message;
  el.className = 'form-status show ' + type;
}

// ---------- main contact form ----------
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  const nameField = document.getElementById('cf-name-field');
  const emailField = document.getElementById('cf-email-field');
  const msgField = document.getElementById('cf-message-field');
  const submitBtn = document.getElementById('contact-submit');
  const statusEl = document.getElementById('contact-form-status');

  contactForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    let valid = true;
    setFieldError(nameField, name.length === 0); if(name.length===0) valid = false;
    setFieldError(emailField, !isValidEmail(email)); if(!isValidEmail(email)) valid = false;
    setFieldError(msgField, message.length === 0); if(message.length===0) valid = false;
    if (!valid) return;

    setBtnLoading(submitBtn, true);
    statusEl.className = 'form-status';

    try {
      const fileInput = document.getElementById('file-upload');
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', message);
      formData.append('_subject', `New project inquiry from ${name}`);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');
      if (fileInput.files[0]) formData.append('attachment', fileInput.files[0]);

      const res = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      if (!res.ok) throw new Error('Request failed');

      contactForm.reset();
      window.location.href = 'thank-you.html';
    } catch (err) {
      setBtnLoading(submitBtn, false);
      showStatus(statusEl, "Something went wrong sending that — please email us directly instead.", 'error');
    }
  });

  // clear error state as user types
  ['cf-name','cf-email','cf-message'].forEach(id=>{
    document.getElementById(id).addEventListener('input', (e)=>{
      e.target.closest('.field').classList.remove('has-error');
    });
  });

  // show chosen filename in the drop label
  const fileInput = document.getElementById('file-upload');
  const fileDropLabel = document.getElementById('file-drop-label');
  fileInput.addEventListener('change', ()=>{
    if (fileInput.files[0]) {
      fileDropLabel.childNodes[0].textContent = fileInput.files[0].name;
    }
  });
}

// ---------- calculator lead form ----------
const calcSubmitBtn = document.getElementById('calc-lead-submit');
if (calcSubmitBtn) {
  const calcNameField = document.getElementById('calc-name-field');
  const calcEmailField = document.getElementById('calc-email-field');
  const calcStatus = document.getElementById('calc-lead-status');

  calcSubmitBtn.addEventListener('click', async ()=>{
    const name = document.getElementById('calc-name').value.trim();
    const email = document.getElementById('calc-email').value.trim();

    let valid = true;
    setFieldError(calcNameField, name.length === 0); if(name.length===0) valid = false;
    setFieldError(calcEmailField, !isValidEmail(email)); if(!isValidEmail(email)) valid = false;
    if (!valid) return;

    setBtnLoading(calcSubmitBtn, true);
    calcStatus.className = 'form-status';

    try {
      const estimate = document.getElementById('calc-cost').textContent;
      const timeframe = document.getElementById('calc-time').textContent;
      const summary = document.getElementById('calc-summary').textContent;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('estimate', estimate);
      formData.append('timeframe', timeframe);
      formData.append('project_summary', summary);
      formData.append('_subject', `New scope estimate request from ${name}`);
      formData.append('_captcha', 'false');
      formData.append('_template', 'table');

      const res = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      if (!res.ok) throw new Error('Request failed');

      setBtnLoading(calcSubmitBtn, false);
      showStatus(calcStatus, "Sent! We'll follow up at that email shortly.", 'success');
      document.getElementById('calc-name').value = '';
      document.getElementById('calc-email').value = '';
    } catch (err) {
      setBtnLoading(calcSubmitBtn, false);
      showStatus(calcStatus, "Something went wrong — please try again or email us directly.", 'error');
    }
  });

  ['calc-name','calc-email'].forEach(id=>{
    document.getElementById(id).addEventListener('input', (e)=>{
      e.target.closest('.field').classList.remove('has-error');
    });
  });
}

// ---------- cookie consent + conditional analytics ----------
(function(){
  const banner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const declineBtn = document.getElementById('cookie-decline');
  if (!banner) return;

  function loadAnalytics(){
    const id = window.__GA_MEASUREMENT_ID__;
    if (!id || id.indexOf('XXXX') !== -1) return; // placeholder not yet replaced
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s1);
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', id);
  }

  const consent = localStorage.getItem('zv_cookie_consent');
  if (consent === 'accepted') {
    loadAnalytics();
  } else if (consent !== 'declined') {
    banner.classList.add('show');
  }

  acceptBtn.addEventListener('click', ()=>{
    localStorage.setItem('zv_cookie_consent', 'accepted');
    banner.classList.remove('show');
    loadAnalytics();
  });
  declineBtn.addEventListener('click', ()=>{
    localStorage.setItem('zv_cookie_consent', 'declined');
    banner.classList.remove('show');
  });
})();
