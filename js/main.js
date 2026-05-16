// Initialize AOS
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 2px 30px rgba(0,0,0,0.12)';
  } else {
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  }
});

// MVV Tabs
const tabs = document.querySelectorAll('.mvv-tabs button');
const contents = document.querySelectorAll('.mvv-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    contents.forEach(c => {
      c.style.display = c.id === target ? 'block' : 'none';
    });
  });
});

// Form submission
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('input[name="name"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const message = form.querySelector('textarea[name="message"]').value;
    const text = `Olá! Meu nome é ${name}. ${message} Meu telefone: ${phone}`;
    const url = `https://wa.me/5511991083235?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  });
}

// Counter animation
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const increment = target / 60;
    let current = 0;
    const update = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + '+';
      }
    };
    update();
  });
}

// Trigger counters when section is visible
const statsSection = document.querySelector('.stats-row');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  observer.observe(statsSection);
}
