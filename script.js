/* Portfolio interactions: menu, active link, reveal, back-to-top, form */
document.documentElement.classList.add('js');

const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
const topBtn = document.getElementById('top');
const links = [...menu.querySelectorAll('a')];

/* Mobile menu */
function setMenu(open) {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  burger.firstElementChild.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
links.forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* Nav background and back-to-top button on scroll */
function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 20);
  topBtn.classList.toggle('show', window.scrollY > 500);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* Highlight the nav link for the section in view */
const sections = [...document.querySelectorAll('main section[id]')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

/* Scroll reveal */
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); } });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
}

/* Contact form: validate, then open the visitor's email app (no backend needed) */
const form = document.getElementById('form');
const status = document.getElementById('status');
const OWNER_EMAIL = 'sharnikaj.mca25@rathinam.in';

function check(field) {
  const v = field.value.trim();
  let msg = '';
  if (!v) msg = 'This field is required.';
  else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = 'Enter a valid email address.';
  else if (field.name === 'message' && v.length < 10) msg = 'Write at least 10 characters.';
  document.getElementById('err-' + field.name).textContent = msg;
  field.classList.toggle('invalid', !!msg);
  field.setAttribute('aria-invalid', !!msg);
  return !msg;
}
const fields = [...form.querySelectorAll('input, textarea')];
fields.forEach(f => f.addEventListener('blur', () => check(f)));

form.addEventListener('submit', e => {
  e.preventDefault();
  const ok = fields.map(check).every(Boolean);   // run all checks
  if (!ok) { status.textContent = 'Fix the highlighted fields and try again.'; fields.find(f => f.classList.contains('invalid')).focus(); return; }
  const d = Object.fromEntries(new FormData(form));
  const body = `${d.message}\n\nFrom: ${d.name} (${d.email})`;
  window.location.href = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = 'Opening your email app. Send the draft to finish.';
  form.reset();
});

document.getElementById('year').textContent = new Date().getFullYear();
