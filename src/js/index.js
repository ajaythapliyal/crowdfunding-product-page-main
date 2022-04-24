/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
function showModal() {
    const modalContainer = document.querySelector('.modal-container')
    document.body.style.overflow = 'hidden'
    modalContainer.style.display = 'block'
    modalContainer.scrollTop = '0px'
    event.stopPropagation()
}

function hideModal() {
    const modalContainer = document.querySelector('.modal-container')
    const pledgeCards = document.querySelectorAll('.modal .pledge-card')
    pledgeCards.forEach((pledgeCard) => {
        pledgeCard.classList.remove('active')
        const input = pledgeCard.querySelector('input')
        input.checked = false
    })
    document.body.style.overflow = 'scroll'
    modalContainer.style.display = 'none'
}

function showPledgeInput(element) {
    const pledgeCards = document.querySelectorAll('.modal .pledge-card')
    pledgeCards.forEach((pledgeCard) => {
        if (pledgeCard === element) {
            pledgeCard.classList.add('active')
            const input = pledgeCard.querySelector('input')
            input.checked = true
            const pledgeInput = pledgeCard.querySelector('.pledge-input')
            pledgeInput.style.display = 'flex'
        } else {
            pledgeCard.classList.remove('active')
            const input = pledgeCard.querySelector('input')
            input.checked = false
            const pledgeInput = pledgeCard.querySelector('.pledge-input')
            pledgeInput.style.display = 'none'
        }
    })
}

document.addEventListener('click', (event) => {
    if (!event.target.closest('.modal')) {
        hideModal()
    }
})

const store = (() => ({
    backers: 5007,
    fundingGoal: 100000,
    fundingMet: 89914,
    products: {
        1: { name: 'Bamboo Stand', qty: 101 },
        2: { name: 'Black Edition Stand', qty: 64 },
        3: { name: 'Mahogany Special Edition', qty: 0 },
    },
    back(productId, amount) {
        if (productId) {
            this.products[productId].qty -= 1
        }
        this.backers += 1
        if (amount) this.fundingMet += amount
    },
}))()

const project = new Proxy(store.back, {
    apply(target, that, args) {
        const response = target.call(that, ...args)
        return response
    },
})
