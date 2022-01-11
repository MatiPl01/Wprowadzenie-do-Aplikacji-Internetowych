"use strict";

(() => {
// Function helpful for selecting items
const $ = selector => document.querySelector(selector)

// DOM selectors
const box1El = $('.propagation__box--1')
const box2El = $('.propagation__box--2')
const box3El = $('.propagation__box--3')
const boxEls = [box1El, box2El, box3El]

const btnPropagationEl = $('.jellos__btn--propagation')
const btnResetEl       = $('.jellos__btn--reset')
const messagesBoxEl    = $('.propagation__messages-list--added')
const counterEl        = $('.propagation__points')

// Class names
const messageClassStr = 'propagation__message'

// Variables
let counter = 0
let isPropagationEnabled = false
const eventHandlers = []

// Functions
const handleBoxClick = targetEl => {
    const color   = targetEl.getAttribute('data-color')
    const points  = parseInt(targetEl.getAttribute('data-points'))
    const message = `You pressed the <span class="${color}">${color}</span> 
                     button that has a value of <strong>${points}</strong>`
    const threshold = parseInt(targetEl.getAttribute('data-threshold')) || Infinity
    
    return e => {
        counter += points

        if (!isPropagationEnabled) e.stopPropagation()
    
        // Add a timeout to the callback queue in order to wait for counter
        // updates made by boxes for which a propagation fired a 'click' event
        setTimeout(() => {
            if (counter >= threshold) disableBox(targetEl)
        }, 0)
        
        displayMessage(`[${counter}]`.padEnd(5) + message)
        updateCounter()
    }
}

const addEventHandlers = boxElsArr => {
    boxElsArr.forEach(boxEl => eventHandlers.push(['click', handleBoxClick(boxEl)]))
}
addEventHandlers(boxEls)

const togglePropagation = () => {
    isPropagationEnabled = !isPropagationEnabled
    btnPropagationEl.innerText = `${isPropagationEnabled ? 'Stop' : 'Start'} propagation`
}

const disableBox = targetEl => {
    const i = boxEls.indexOf(targetEl)
    if (i >= 0) targetEl.removeEventListener(...eventHandlers[i])
    targetEl.classList.add('disabled')
}

const displayMessage = message => {
    const messageEl = document.createElement('li')
    messageEl.classList.add(messageClassStr)
    messageEl.innerHTML = message
    messagesBoxEl.appendChild(messageEl)

    messagesBoxEl.parentElement.scrollTo({
        top: messageEl.offsetTop ,
        behavior: 'smooth'
    })
}

const updateCounter = () => {
    counterEl.innerText = counter
}

const setupEventListeners = () => {
    boxEls.forEach((boxEl, i) => boxEl.addEventListener(...eventHandlers[i]))
}

const handleReset = () => {
    counter = 0
    messagesBoxEl.innerHTML = ''
    boxEls.forEach(boxEl => boxEl.classList.remove('disabled'))
    setupEventListeners()
    updateCounter()

    messagesBoxEl.parentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

// Setup event listeners
setupEventListeners()
btnPropagationEl.addEventListener('click', togglePropagation)
btnResetEl.addEventListener('click', handleReset)
})()
