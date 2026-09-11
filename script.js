const nav = document.getElementById('mainNav');
const links = document.querySelectorAll('.navbar .nav-link');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

const sections = [...document.querySelectorAll('main section[id]')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach((section) => spy.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

document.querySelectorAll('.navbar-collapse .nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('navbarContent');
    const instance = bootstrap.Collapse.getInstance(menu);
    if (instance) instance.hide();
  });
});
