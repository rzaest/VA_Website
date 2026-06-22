var modal = document.querySelector('.modal-overlay');
var modalImg = document.getElementById('full-image');
var imageItems = Array.from(
  document.querySelectorAll('.img-container, .img-container-3x, .zoomable-image'),
);
var images = imageItems
  .map(function (item) {
    return item.matches('img') ? item : item.querySelector('img');
  })
  .filter(Boolean);
var closeBtn = document.querySelector('.close');
var prevBtn = document.querySelector('.prev');
var nextBtn = document.querySelector('.next');
var currentIndex = 0;

if (images.length && !modal) {
  modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.innerHTML =
    '<div class="modal">' +
    '<img class="modal-content" id="full-image" src="" alt="Full Image">' +
    '<span class="close">&times;</span>' +
    '<button class="prev" type="button">&larr;</button>' +
    '<button class="next" type="button">&rarr;</button>' +
    '</div>';
  document.body.appendChild(modal);
  modalImg = modal.querySelector('.modal-content');
  closeBtn = modal.querySelector('.close');
  prevBtn = modal.querySelector('.prev');
  nextBtn = modal.querySelector('.next');
}

function openModal(event) {
  var clickedImage = event.currentTarget.matches('img')
    ? event.currentTarget
    : event.currentTarget.querySelector('img');

  currentIndex = images.indexOf(clickedImage);
  if (currentIndex < 0) return;

  updateModalImage();
  modal.classList.add('is-active');
}

function closeModal() {
  modal.classList.remove('is-active');
}

function updateModalImage() {
  modalImg.src = images[currentIndex].src;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  updateModalImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateModalImage();
}

if (images.length && modal) {
  imageItems.forEach(function (item) {
    item.addEventListener('click', openModal);
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') openModal(event);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  prevBtn.addEventListener('click', prevImage);
  nextBtn.addEventListener('click', nextImage);

  document.addEventListener('keydown', function (event) {
    if (!modal.classList.contains('is-active')) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowRight') nextImage();
    if (event.key === 'ArrowLeft') prevImage();
  });

  modal.addEventListener('click', function (event) {
    if (event.target === modal) closeModal();
  });
}
