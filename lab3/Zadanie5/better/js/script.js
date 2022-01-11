"use strict";

(() => {
// DOM Selectors
const jelloBigEl    = document.querySelector('.jellos__jello--1')
const jelloMediumEl = document.querySelector('.jellos__jello--2')
const jelloSmallEl  = document.querySelector('.jellos__jello--3')
const jellosEls     = [jelloBigEl, jelloMediumEl, jelloSmallEl]

const propagationBtnEl = document.querySelector('.jellos__btn--propagation')
const resetBtnEl       = document.querySelector('.jellos__btn--reset')
const pointsCounterEl  = document.querySelector('.jellos__points')
const messagesBoxEl    = document.querySelector('.messages__list--added')

// Class names
const pointsClassStr      = 'point'
const pointsSignClassStr  = 'point__sign'
const pointsValueClassStr = 'point__value'
const messageClassStr     = 'messages__item'

// Variables
const deltaDelay = 200
const maxDelay = 400
const jelloAnimDuration = 600
const pointAnimDuration = 2000
const messagesClearDelay = 400
const jelloEventHandlers = []

let thresholdIdx = 0
const thresholds = [[30, jelloMediumEl], [50, jelloSmallEl]] // Must be in an ascending order

let counter = 0
let animDelay = 0
let isPropagationEnabled = false
let lastClearTime = 0
let messagesClearTimeout = null


// Functions
const handleJelloClick = targetEl => {
    const color   = targetEl.getAttribute('data-color')
    const points  = parseInt(targetEl.getAttribute('data-points'))
    const message = `You pressed the <span class="${color}">${color}</span> 
                     jello that has a value of <strong>${points}</strong>`

    return e => {
        // Clear message box if haven't been cleared yet
        if (messagesClearTimeout && Date.now() - lastClearTime <= messagesClearDelay) {
            clearTimeout(messagesClearTimeout)
            messagesClearTimeout = null
            messagesBoxEl.innerHTML = ''
        }

        displayMessage(message)
        animateJello(targetEl)
        updateState(parseInt(targetEl.getAttribute('data-points')))

        if (!isPropagationEnabled) {
            e.stopPropagation()
        } else {
            animDelay = Math.min(animDelay + deltaDelay, maxDelay)
        }
    }
}

const setupEventHandlers = jellosElsArr => {
    jellosElsArr.forEach(jelloEl => jelloEventHandlers.push(['click', handleJelloClick(jelloEl)]))
}
setupEventHandlers(jellosEls)

const createPointsEl = value => {
    // Create elements
    const pointsEl = document.createElement('div')
    const pointsSignEl = document.createElement('span')
    const pointsValueEl = document.createElement('span')
    
    // Add necessary data to elements
    pointsEl.classList.add(pointsClassStr)
    pointsSignEl.classList.add(pointsSignClassStr)
    pointsValueEl.classList.add(pointsValueClassStr)

    pointsSignEl.innerText = '+'
    pointsValueEl.innerText = value

    // Link elements together
    pointsEl.appendChild(pointsSignEl)
    pointsEl.appendChild(pointsValueEl)

    // Return the point element
    return pointsEl
}

const randomPositionInsideEl = targetEl => {
    const {width, height} = targetEl.getBoundingClientRect()

    return [
        Math.random() * width,
        Math.random() * height,
    ]
}

const animateJello = targetEl => {
    // Add new timeouts
    setTimeout(() => {
        targetEl.classList.remove('animate')
        targetEl.classList.add('animate')
        displayPoints(targetEl)

        setTimeout(() => {
            targetEl.classList.remove('animate')
            animDelay = 0
        }, jelloAnimDuration)
    }, animDelay)
}

const displayPoints = jelloEl => {
    const points = parseInt(jelloEl.getAttribute('data-points'))
    const pointsEl = createPointsEl(points)

    const {x: jelloWindowX, y: jelloWindowY} = jelloEl.getBoundingClientRect()
    const [deltaX, deltaY] = randomPositionInsideEl(jelloEl)
    const windowH = window.innerHeight
    const windowW = window.innerWidth

    pointsEl.style.left = `${(jelloWindowX + deltaX / 3) / windowW * 100}%`
    pointsEl.style.top  = `${(jelloWindowY + deltaY / 3) / windowH * 100}%`

    document.body.appendChild(pointsEl)
    setTimeout(() => {
        pointsEl.remove()
    }, pointAnimDuration);
}

const updateCounter = () => {
    pointsCounterEl.innerText = counter
}

const updateState = points => {
    counter += points
    updateCounter()

    if (thresholdIdx < thresholds.length && counter >= thresholds[thresholdIdx][0]) {
        disableJello(thresholds[thresholdIdx++][1])
    }
}

const disableJello = jelloEl => {
    jelloEl.classList.add('disabled')
    const i = jellosEls.indexOf(jelloEl)
    if (i >= 0) jelloEl.removeEventListener(...jelloEventHandlers[i])
}

const changePropagation = () => {
    isPropagationEnabled = !isPropagationEnabled
    propagationBtnEl.querySelector('span').innerText = `${isPropagationEnabled ? 'stop' : 'start'} propagation`
}

const setupEventListeners = () => {
    jellosEls.forEach((jelloEl, i) => jelloEl.addEventListener(...jelloEventHandlers[i]))
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

const handleReset = () => {
    thresholdIdx = counter = 0
    jellosEls.forEach(jelloEl => jelloEl.classList.remove('disabled'))
    setupEventListeners()
    updateCounter()

    messagesBoxEl.parentElement.scrollTo({
        top: 0,
        behavior: 'smooth'
    })

    lastClearTime = Date.now()
    messagesClearTimeout = messagesClearTimeout = setTimeout(() => {
        messagesBoxEl.innerHTML = ''
    }, messagesClearDelay);
}

// Event listeners
setupEventListeners()

propagationBtnEl.addEventListener('click', changePropagation)
resetBtnEl.addEventListener('click', handleReset)
})()
