(() => {
  const toggler = document.getElementById('global-search-toggler');
  const form = document.querySelector('.header__menu .search-form');
  const input = form.querySelector('.form__input');

  if (window.matchMedia('(min-width: 1024px)').matches) {
    toggler?.addEventListener('click', () => {
      form.classList.toggle('is-open');
      input.focus();
    });

    document.addEventListener('click', (event) => {
      if (!form.contains(event.target) && !toggler.contains(event.target)) {
        form.classList.remove('is-open');
      }
    });
  }
})();
