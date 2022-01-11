"use strict";

(() => {
const getName = () => prompt('Wpisz swoje imię:')

const showName = (name, nameEl) => nameEl.innerText = name

const nameEl = document.querySelector('.header__name')
const btnEl  = document.querySelector('#btn-name')

btnEl.addEventListener('click', () => {
    showName(getName(), nameEl)
})
})()
