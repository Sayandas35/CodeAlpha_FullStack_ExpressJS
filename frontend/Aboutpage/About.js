document.querySelectorAll('.reveal').forEach(el => {
  function revealOnScroll() {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
      window.removeEventListener('scroll', revealOnScroll);
    }
  }
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});
