"use strict";

(() => {
    // DOM selectors
    const btnIncrementEl = document.querySelector('.counter__btn--increment')
    const btnLinkEl      = document.querySelector('.counter__btn--link')
    const btnUnlinkEl    = document.querySelector('.counter__btn--unlink')
    const numberEl       = document.querySelector('.counter__number')

    // Variables
    let count = 0

    // Functions
    const handleIncrement = () => numberEl.innerText = ++count
    const resetCounter = () => numberEl.innerText = count = 0

    // Main
    btnLinkEl.addEventListener('click', () => {
        btnIncrementEl.addEventListener('click', handleIncrement)
        btnIncrementEl.classList.remove('disabled')
    })

    btnUnlinkEl.addEventListener('click', () => {
        btnIncrementEl.removeEventListener('click', handleIncrement)
        btnIncrementEl.classList.add('disabled')
        resetCounter()
    })
})()
