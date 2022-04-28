/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const modalContainer = document.getElementById('pledge-modal-container')
const thankModalContainer = document.getElementById('thank-modal-container')
const fundingNode = document.getElementById('funding-info')
const backersNode = document.getElementById('backers-info')
const bambooQtyNodes = document.getElementsByClassName('bamboo-qty')
const blackQtyNodes = document.getElementsByClassName('black-qty')
const mahoganyQtyNodes = document.getElementsByClassName('mahogany-qty')
const noPledgeCard = document.getElementById('noPledgeCard')
const bambooPledgeCard = document.getElementById('bambooPledgeCard')
const blackPledgeCard = document.getElementById('blackPledgeCard')
const mahoganyPledgeCard = document.getElementById('mahoganyPledgeCard')
const bambooInput = document.getElementById('bamboo-input')
const blackInput = document.getElementById('black-input')
const mahoganyInput = document.getElementById('mahogany-input')
const backersInfo = document.getElementById('backers-info')
const fundingInfo = document.getElementById('funding-info')

function showModal(cardId) {
    document.body.style.overflow = 'hidden'
    modalContainer.style.display = 'block'
    modalContainer.scrollTop = '0px'
    if (cardId) {
        const card = document.getElementById(cardId)
        card.classList.add('active')
        document.getElementById(cardId).scrollIntoView()
    }
    event.stopPropagation()
}

function hideModal() {
    const pledgeCards = document.querySelectorAll('.modal .pledge-card')
    pledgeCards.forEach((pledgeCard) => {
        pledgeCard.classList.remove('active')
        const input = pledgeCard.querySelector('input')
        input.checked = false
        const pledgeInput = pledgeCard.querySelector('.pledge-input')
        pledgeInput.style.display = 'none'
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
            const numInput = pledgeCard.querySelector('.input1')
            if (numInput) numInput.classList.remove('error')
            const pledgeInput = pledgeCard.querySelector('.pledge-input')
            pledgeInput.style.display = 'none'
        }
    })
}

function thankYou() {
    thankModalContainer.style.display = 'none'
}

document.addEventListener('click', (event) => {
    if (!event.target.closest('.modal')) {
        hideModal()
    }
})

const _store = {
    backers: 5007,
    fundingGoal: 100000,
    fundingMet: 89914,
    products: {
        1: { name: 'Bamboo Stand', qty: 101, amt: 25 },
        2: { name: 'Black Edition Stand', qty: 64, amt: 75 },
        3: { name: 'Mahogany Special Edition', qty: 0, amt: 200 },
    },
}

function refreshBackers() {
    backersInfo.innerHTML = _store.backers
}

function refreshFunding() {
    fundingInfo.innerHTML = _store.fundingMet
}

const store = new Proxy(_store, {
    set(obj, prop, val) {
        obj[prop] = val
        if (prop === 'backers') {
            refreshBackers()
        } else if (prop === 'fundingMet') {
            refreshFunding()
        }
    },
})

function back(productId, amount) {
    if (!productId && !amount) {
        store.backers += 1
        return true
    }
    const product = store.products[productId]
    const amtNum = Number(amount)
    if (amtNum && amtNum >= product.amt) {
        product.qty -= 1
        store.backers += 1
        store.fundingMet += amtNum
        return true
    }
    return false
}

const backProject = new Proxy(back, {
    apply(target, that, args) {
        const response = target(...args)
        if (response) {
            modalContainer.style.display = 'none'
            thankModalContainer.style.display = 'block'
            document.body.style.overflow = 'auto'
        } else {
            ;[...args[2].parentNode.childNodes]
                .filter((node) => node.id)
                .forEach((node) => node.classList.add('error'))
        }
        return response
    },
})

fundingNode.innerHTML = store.fundingMet
backersNode.innerHTML = store.backers

for (let index = 0; index < bambooQtyNodes.length; index += 1) {
    bambooQtyNodes[index].childNodes[0].textContent = store.products[1].qty
    if (store.products[1].qty === 0) {
        bambooQtyNodes[index].closest('.card').classList.add('disabled')
    }
}

for (let index = 0; index < blackQtyNodes.length; index += 1) {
    blackQtyNodes[index].childNodes[0].textContent = store.products[2].qty
    if (store.products[1].qty === 0) {
        blackQtyNodes[index].closest('.card').classList.add('disabled')
    }
}

for (let index = 0; index < mahoganyQtyNodes.length; index += 1) {
    mahoganyQtyNodes[index].childNodes[0].textContent = store.products[3].qty
    if (store.products[3].qty === 0) {
        const card = mahoganyQtyNodes[index].closest('.pledge-card')
        card.classList.add('disabled')
        card.style.pointerEvents = 'none'
    }
}
