function showModal() {
    const modalContainer = document.querySelector('.modal-container');
    document.body.style.overflow = 'hidden';
    modalContainer.style.display = 'block';
    event.stopPropagation();
}

function hideModal() {
    const modalContainer = document.querySelector('.modal-container');
    document.body.style.overflow = 'scroll';
    modalContainer.style.display = 'none';
}

document.addEventListener('click', event => {
    if (!event.target.closest(".modal")) {
        hideModal();
    }

})