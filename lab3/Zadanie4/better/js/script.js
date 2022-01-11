"use strict";

(() => {

// DOM selectors
const btnLinkEl      = document.querySelector('.counter__btn--link')
const btnUnlinkEl    = document.querySelector('.counter__btn--unlink')
const btnIncrementEl = document.querySelector('.counter__btn--increment')
const sliderEls      = Array.from(document.querySelectorAll('.counter__digit-slider'))

const digitsContainerEl = document.querySelector('.counter__digits')

// Class names
const digitBoxClass = 'counter__digit-box'
const digitSliderClass = 'counter__digit-slider'
const digitClass = 'counter__digit'

// Other variables
let counter = 99998 // <-- Change to 0 (99998 is set only for demonstration purposes)
const maxCount = 99999
const minDigitsCount = 3
const maxCountMessage = 'Counter has reached the maximum number. Press OK button to reset.'

// Functions
const resetCounter = () => {
    counter = 0
    const count = sliderEls.length - minDigitsCount
    for (let i = 0; i < count; i++) {
        sliderEls.pop().parentElement.remove()
    }
    sliderEls.forEach(sliderEl => {
        sliderEl.setAttribute('data-digit', 0)
    })
}

const setupCounter = () => {
    const count = Math.max(counter.toString().length, minDigitsCount) - 1
    for (let i = 0; i < count; i++) addCounterDigitEl()
    updateCounter()
}

const updateCounter = () => {
    const digits = (counter).toString()
                            .padStart(Math.max(sliderEls.length, minDigitsCount), '0')
    // If there are not enough digit boxes, crate a new one
    if (sliderEls.length < digits.length) addCounterDigitEl()
    // Update displayed digits
    sliderEls.forEach((sliderEl, i) => {
        sliderEl.setAttribute('data-digit', digits[i])
    })
}

const createSliderEl = () => {
    // Creating elements
    const digitBoxEl = document.createElement('li')
    const digitSliderEl = document.createElement('ul')
    let digitEl = document.createElement('li')

    // Setting elements classes and attributes
    digitBoxEl.classList.add(digitBoxClass)
    digitSliderEl.classList.add(digitSliderClass)
    digitSliderEl.classList.add(`${digitSliderClass}--${sliderEls.length + 1}`)
    digitSliderEl.setAttribute('data-digit', 0)
    digitEl.classList.add(digitClass)
    
    // Adding elements to DOM
    digitBoxEl.appendChild(digitSliderEl)
    digitEl.innerText = 9
    digitSliderEl.appendChild(digitEl)
    
    for (let i = 0; i <= 9; i++) {
        digitEl = document.createElement('li')
        digitEl.innerText = i
        digitEl.classList.add(digitClass)
        digitSliderEl.appendChild(digitEl)
    }

    return digitBoxEl
}

const addCounterDigitEl = () => {
    const sliderEl = createSliderEl()
    digitsContainerEl.appendChild(sliderEl)
    sliderEls.push(sliderEl.firstChild)
}

const incrementCounter = () => {
    if (counter === maxCount) {
        if (confirm(maxCountMessage)) resetCounter()
    } else {
        counter++
        updateCounter()
    }
}

const handleLink = () => {
    btnIncrementEl.addEventListener('click', incrementCounter)
    btnIncrementEl.classList.remove('disabled')
}

const handleUnlink = () => {
    btnIncrementEl.removeEventListener('click', incrementCounter)
    btnIncrementEl.classList.add('disabled')
    resetCounter()
}

// Main
btnLinkEl.addEventListener('click', handleLink)
btnUnlinkEl.addEventListener('click', handleUnlink)
setupCounter()
})()
