// Theme toggle (persisted)
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') root.classList.add('dark');

if (themeToggle) {
themeToggle.addEventListener('click', () => {
root.classList.toggle('dark');
localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
});
}

// Year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Contact form: client-side validation, then submit to Netlify Forms
const form = document.getElementById('contactForm');
if (form) {
form.addEventListener('submit', (e) => {
e.preventDefault();

const fields = ['name', 'email', 'message'];
let ok = true;

fields.forEach((id) => {
  const input = document.getElementById(id);
  if (!input) return;
  const error = input.parentElement.querySelector('.error');
  if (!input.checkValidity()) {
    if (error) error.textContent = input.validationMessage || 'Please fill out this field';
    ok = false;
  } else {
    if (error) error.textContent = '';
  }
});

if (!ok) return;

// Optional: disable submit button to prevent double submits
const submitBtn = form.querySelector('button[type="submit"]');
if (submitBtn) submitBtn.disabled = true;

// Native submit so Netlify captures it (requires proper form attributes in HTML)
form.submit();
});
}