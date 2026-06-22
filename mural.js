
var modal = document.querySelector('.modal-overlay');
var modalImg = document.getElementById('full-image');
var images = document.querySelectorAll('.img-container img');
var closeBtn = document.querySelector('.close');
function openModal(event) {
    modal.style.display = 'flex';
    modalImg.src = event.target.src;
}
function closeModal() {
    modal.style.display = 'none';
}

images.forEach(function(image) {
    image.addEventListener('click', openModal);
});
closeBtn.addEventListener('click', closeModal);

modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});
