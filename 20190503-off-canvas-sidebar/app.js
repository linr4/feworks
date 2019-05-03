const hamburgerEl = document.querySelector('.hamburger');
const navEl = document.querySelector('nav');
const contentEl = document.querySelector('.content');
const barsEl = document.getElementsByTagName('span');

hamburgerEl.addEventListener('click', () => {
  navEl.classList.toggle('open');
  contentEl.classList.toggle('shift');
  for (let item of barsEl) {
    item.classList.toggle('change');
  }
});