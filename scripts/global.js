function toggleMenu() {
  document.querySelector('.nav-links').classList.toggle('active');
}

function initLoader() {
  var loader = document.querySelector('.site-loader');
  var button = document.querySelector('.loader-mark');

  if (!loader || !button) return;

  if (sessionStorage.getItem('vusalaEntered') === 'true') {
    loader.remove();
    document.body.classList.remove('is-locked');
    return;
  }

  button.addEventListener('click', function () {
    sessionStorage.setItem('vusalaEntered', 'true');
    loader.classList.add('is-open');
    document.body.classList.remove('is-locked');
    window.setTimeout(function () {
      loader.remove();
    }, 900);
  });
}

function initReveals() {
  var targets = document.querySelectorAll(
    '.info, .hero-orbit, .home-card, .works-list .item, .img-container, .img-container-3x, section .content, .image-item, .descriptor',
  );

  targets.forEach(function (target) {
    target.classList.add('revealable');
  });

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (target) {
      target.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  targets.forEach(function (target) {
    observer.observe(target);
  });
}

function initTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  var cards = document.querySelectorAll('.image-item');

  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (event) {
      var rect = card.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width - 0.5;
      var y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform =
        'perspective(900px) rotateX(' +
        y * -5 +
        'deg) rotateY(' +
        x * 5 +
        'deg) translateY(-6px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initLoader();
  initReveals();
  initTilt();
});
