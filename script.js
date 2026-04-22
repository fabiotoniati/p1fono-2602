/* ===== JAVASCRIPT — Dra. Ana Luiza Fonoaudióloga ===== */

/* ---------- NAVBAR SCROLL ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---------- MOBILE MENU ---------- */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
  }
});

/* ---------- SCROLL ANIMATIONS ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

// Adicionar CSS de animações ao head
const animStyle = document.createElement('style');
animStyle.textContent = `
  .anim-item {
    opacity: 0;
    transform: translateY(32px);
    transition: opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1), transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .anim-item.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  .anim-delay-1 { transition-delay: 0.1s; }
  .anim-delay-2 { transition-delay: 0.2s; }
  .anim-delay-3 { transition-delay: 0.3s; }
  .anim-delay-4 { transition-delay: 0.4s; }
  .anim-delay-5 { transition-delay: 0.5s; }
`;
document.head.appendChild(animStyle);

// Aplicar animações a elementos
const animTargets = document.querySelectorAll(
  '.trat-card, .dep-card, .step-card, .formacao-item, .info-item, .sobre-content, .sobre-image-col'
);
animTargets.forEach((el, i) => {
  el.classList.add('anim-item');
  if (i % 6 === 1) el.classList.add('anim-delay-1');
  if (i % 6 === 2) el.classList.add('anim-delay-2');
  if (i % 6 === 3) el.classList.add('anim-delay-3');
  if (i % 6 === 4) el.classList.add('anim-delay-4');
  if (i % 6 === 5) el.classList.add('anim-delay-5');
  observer.observe(el);
});

/* ---------- FORMULÁRIO ---------- */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const telefone = document.getElementById('telefone').value.trim();

  if (!nome || !email || !telefone) {
    shakeForm();
    return;
  }

  // Simular envio
  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-text').textContent = 'Enviando...';

  setTimeout(() => {
    form.reset();
    submitBtn.disabled = false;
    submitBtn.querySelector('.btn-text').textContent = 'Enviar Mensagem';
    successMsg.classList.add('visible');
    setTimeout(() => successMsg.classList.remove('visible'), 5000);
  }, 1200);
});

function shakeForm() {
  form.style.animation = 'none';
  const shakeStyle = document.createElement('style');
  shakeStyle.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(shakeStyle);
  form.style.animation = 'shake 0.45s ease';
  form.addEventListener('animationend', () => {
    form.style.animation = '';
  }, { once: true });
}

/* ---------- MÁSCARA TELEFONE ---------- */
const phoneInput = document.getElementById('telefone');
phoneInput.addEventListener('input', (e) => {
  let val = e.target.value.replace(/\D/g, '');
  if (val.length <= 10) {
    val = val.replace(/(\d{2})(\d)/, '($1) $2');
    val = val.replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    val = val.replace(/(\d{2})(\d)/, '($1) $2');
    val = val.replace(/(\d{5})(\d)/, '$1-$2');
  }
  e.target.value = val.slice(0, 15);
});

/* ---------- ACTIVE NAV LINK ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      link.style.color = 'var(--green)';
    }
  });
});

/* ---------- SMOOTH PARALLAX HERO ---------- */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroCard = document.querySelector('.hero-image-card');
  if (heroCard && scrolled < window.innerHeight) {
    heroCard.style.transform = `translateY(${scrolled * 0.08}px)`;
  }
});
