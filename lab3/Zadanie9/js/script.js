"use strict";

(() => {
// Cards data
const data = [
    {
        photo: 'images/person-1.jpg',
        name: 'Monika Piotrowska',
        job: 'Architekt systemu',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis id natus est asperiores. Quod nobis velit eius. Dicta sequi voluptas tenetur earum esse possimus tempore. Ad ipsam aspernatur illum quos.'
    },
    {
        photo: 'images/person-2.jpg',
        name: 'Matylda Błaszczyk',
        job: 'Animator 3D',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis id natus est asperiores. Quod nobis velit eius. Dicta sequi voluptas tenetur earum esse possimus tempore. Ad ipsam aspernatur illum quos.'
    },
    {
        photo: 'images/person-3.jpg',
        name: 'Czesław Kaczmarczyk',
        job: 'Back-end Developer',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis id natus est asperiores. Quod nobis velit eius. Dicta sequi voluptas tenetur earum esse possimus tempore. Ad ipsam aspernatur illum quos.'
    },
    {
        photo: 'images/person-4.jpg',
        name: 'Konstancja Kalinowska',
        job: 'Front-end Developer',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis id natus est asperiores. Quod nobis velit eius. Dicta sequi voluptas tenetur earum esse possimus tempore. Ad ipsam aspernatur illum quos.'
    },
    {
        photo: 'images/person-5.jpg',
        name: 'Damian Makowski',
        job: 'Blockchain Engineer',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis id natus est asperiores. Quod nobis velit eius. Dicta sequi voluptas tenetur earum esse possimus tempore. Ad ipsam aspernatur illum quos.'
    },
    {
        photo: 'images/person-6.jpg',
        name: 'Anna Chmielewska',
        job: 'Administrator sieci',
        description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis id natus est asperiores. Quod nobis velit eius. Dicta sequi voluptas tenetur earum esse possimus tempore. Ad ipsam aspernatur illum quos.'
    },
]

// Template strings
const cardTemplateStr = `
<article class="card">
    <figure class="card__figure">
        <div class="card__img-wrapper">
            <div class="card__quote">
                <svg class="card__icon">
                    <use href="svg/icons.svg#icon-quote"></use>
                </svg>
            </div>
            <img src="{{PHOTO}}" alt="Employee photo" class="card__img">
        </div>
        <figcaption class="card__caption">
            <h2 class="card__name">{{NAME}}</h2>
            <h3 class="card__job">{{JOB}}</h3>
        </figcaption>
    </figure>

    <p class="card__description">{{DESCRIPTION}}</p>

    <section class="card__nav">
        <div class="card__slider-buttons">
            <button class="card__button card__button--prev">&#8249;</button>
            <button class="card__button card__button--next">&#8250;</button>
        </div>
        <button class="card__button card__button--random">Losowy pracownik</button>
    </section>
</article>`

// DOM Selectors
const cardsListEl = document.querySelector('.cards__list')

// Class Strings
const showCardClassName = 'show'
const hideCardClassName = 'hide'
const cardItemClassName = 'cards__item'
const btnPrevClass = '.card__button--prev'
const btnNextClass = '.card__button--next'
const btnRandClass = '.card__button--random'
const cardClass = '.card'

const disableAnimClassName = 'no-anim'

// Variables
let showedCardIdx = 0
let hiddenCardIdx = 1

const cardEls = []

// Functions
const createCardItemEl = cardData => {
    const cardItemEl = document.createElement('li')
    cardItemEl.classList.add(cardItemClassName)
    cardItemEl.innerHTML = cardTemplateStr
        .replace('{{PHOTO}}', cardData.photo)
        .replace('{{NAME}}', cardData.name)
        .replace('{{JOB}}', cardData.job)
        .replace('{{DESCRIPTION}}', cardData.description)
    return cardItemEl
}

const loadCards = () => {
    cardsListEl.classList.add(disableAnimClassName)
    data.forEach((cardData, idx) => {
        const cardItemEl = createCardItemEl(cardData)
        const cardEl = cardItemEl.querySelector(cardClass)
        cardEls.push(cardEl)
        cardsListEl.appendChild(cardItemEl)
        cardEl.setAttribute('data-idx', idx)
    })
    cardEls[showedCardIdx].classList.add(showCardClassName)
    cardEls[hiddenCardIdx].classList.add(hideCardClassName)
}

const slideCards = (hideCardIdx, showCardIdx) => {
    cardsListEl.classList.remove(disableAnimClassName)
    // Remove classes from previous cards
    cardEls[hiddenCardIdx].classList.remove(hideCardClassName)
    cardEls[showedCardIdx].classList.remove(showCardClassName)
    // Add classes to new cards
    cardEls[hideCardIdx].classList.add(hideCardClassName)
    cardEls[showCardIdx].classList.add(showCardClassName)
    // Update helper variables
    hiddenCardIdx = hideCardIdx
    showedCardIdx = showCardIdx
}

const randInt = (a, b) => { // (b is inclusive)
    return parseInt(a + Math.random() * (b - a + 1))
}

const randomCardIdx = currCardIdx => {
    let rand
    do {
        rand = randInt(0, cardEls.length - 1)
    } while (rand === currCardIdx)
    return rand
}

const handleCardClick = e => {
    const currCardEl = e.target.closest(cardClass)
    const idx = parseInt(currCardEl.getAttribute('data-idx'))
    if (e.target.matches(btnPrevClass)) {
        slideCards(idx, (cardEls.length + idx - 1) % cardEls.length)
    } else if (e.target.matches(btnNextClass)) {
        slideCards(idx, (idx + 1) % cardEls.length)
    } else if (e.target.matches(btnRandClass)) {
        slideCards(idx, randomCardIdx(idx))
    }
}

const setupEventListeners = () => {
    document.querySelectorAll(cardClass)
        .forEach(cardEl => cardEl
            .addEventListener('click', handleCardClick))
}

// Event listeners
loadCards()
setupEventListeners()
})()
