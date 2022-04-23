function showModal() {
    const modalContainer = document.querySelector('.modal-container');
    document.body.style.overflow = 'hidden';
    modalContainer.style.display = 'block';
    modalContainer.scrollTop = '0px';
    event.stopPropagation();
}

function hideModal() {
    const modalContainer = document.querySelector('.modal-container');
    const pledgeCards = document.querySelectorAll('.modal .pledge-card');
    pledgeCards.forEach(pledgeCard => {
        pledgeCard.classList.remove('active');
        pledgeCard.querySelector('input').checked = false
    })
    document.body.style.overflow = 'scroll';
    modalContainer.style.display = 'none';
}

function showPledgeInput(element) {
    const pledgeCards = document.querySelectorAll('.modal .pledge-card');
    pledgeCards.forEach(pledgeCard => {
        if (pledgeCard == element) {
            pledgeCard.classList.add('active');
            pledgeCard.querySelector('input').checked = true
        } else {
            pledgeCard.classList.remove('active');
            pledgeCard.querySelector('input').checked = false
        }
    })
}

document.addEventListener('click', event => {
    if (!event.target.closest(".modal")) {
        hideModal();
    }

})