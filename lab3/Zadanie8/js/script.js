"use strict";

(() => {
// Helper functions
const $ = selector => document.querySelector(selector)

// DOM Selectors
const infoBtnEl       = $('.info__button')
const infoPopupEl     = $('.info-popup')
const balloonEl       = $('.balloon')
const inflationCurrEl = $('.menu__value--current')
const inflationMinEl  = $('.menu__value--min')
const inflationMaxEl  = $('.menu__value--max')
const progressBarEl   = $('.menu__progress > span')
const contextMenuEl   = $('.menu')

// Class Strings
const disableAnimClassName = 'anim-disabled'
const explodedBalloonClassName = 'exploded'
const hiddenClassName = 'hidden'

// Variables
const balloonSizeUnits = 'px'
const minBalloonSize = 50 // px
const maxBalloonSize = Math.min(.5 * window.innerHeight, .8 * window.innerWidth) // px
const percentSizeIncrease = .1
let   currBalloonSize = minBalloonSize

// Functions
const disableInfoPopupAnim = () => {
    infoPopupEl.classList.add(disableAnimClassName)
    infoBtnEl.removeEventListener('mouseenter', disableInfoPopupAnim)
}

const initializeMenu = () => {
    inflationMinEl.innerText = inflationCurrEl.innerText = currBalloonSize.toFixed(2)
    inflationMaxEl.innerText = maxBalloonSize.toFixed(2)
}

const inflateBalloon = () => {
    currBalloonSize = Math.min(maxBalloonSize, (1 + percentSizeIncrease) * currBalloonSize)
    balloonEl.style.fontSize = currBalloonSize + balloonSizeUnits
    if (currBalloonSize === maxBalloonSize) blowBalloon()
}

const blowBalloon = () => {
    window.removeEventListener('keydown', handleKeyPress)
    balloonEl.classList.add(explodedBalloonClassName)
}

const deflateBalloon = () => {
    currBalloonSize = Math.max(minBalloonSize, (1 - percentSizeIncrease) * currBalloonSize)
    balloonEl.style.fontSize = currBalloonSize + balloonSizeUnits
}

const handleContextMenu = e => {
    e.preventDefault()
    if (e.ctrlKey) contextMenuEl.classList.toggle(hiddenClassName)
}

const hideContextMenu = () => contextMenuEl.classList.add(hiddenClassName)

const handleKeyPress = e => {
    if (e.keyCode === 38) { // up arrow
        inflateBalloon()
        updateMenu()
    } else if (e.keyCode === 40) { // down arrow
        deflateBalloon()
        updateMenu()
    }
}

const updateMenu = () => {
    const progress = (currBalloonSize - minBalloonSize) / (maxBalloonSize - minBalloonSize)
    progressBarEl.style.width = progress * 100 + '%'
    inflationCurrEl.innerText = currBalloonSize.toFixed(2)
}

// Event Listeners
initializeMenu()
infoBtnEl.addEventListener('mouseenter', disableInfoPopupAnim)
balloonEl.addEventListener('contextmenu', handleContextMenu)
window.addEventListener('keydown', handleKeyPress)
document.addEventListener('click', hideContextMenu)
})()
