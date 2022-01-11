"use strict";

(() => {
// Template strings
const highscoreTemplate = `
<div class="highscore__score">
    <h6 class="highscore__text">Punkty</h6>
    <h3 class="highscore__points">{{POINTS}}</h3>
</div>
<div class="highscore__player">
    <h6 class="highscore__text">Nazwa użytkownika</h6>
    <h3 class="highscore__username">{{USERNAME}}</h3>
</div>
<div class="highscore__date">
    <p class="highscore__date-text">Data osiągnięcia</p>
    <p class="highscore__date-time">{{DATE}}</p>
</div>
`

const loaderHTML = `
<svg class="loader__svg" viewBox="0 0 32 32">
    <circle cx='16' cy='16' r='16' />
</svg>
`

// Helper functions
const $  = selector => document.querySelector(selector)
const $a = selector => document.querySelectorAll(selector)

// DOM selectors
const sliderEls = Array.from($a('.counter__digit-slider'))
const digitsContainerEl = $('.counter__digits')
const crosshairEl = $('.crosshair')
const counterEl = $('.counter')
const mainEl = $('.main')
const hpBarEl = $('.hp-bar')
const popupEl = $('.popup')
const popupFormEl = $('.popup__form')
const highscoresEl = $('.highscores')
const popupInputEl = $('.popup__input')
const playerNameEl = $('.player__name')
const highscoresBtnEl = $('.highscores__button')
const highscoresListEl = $('.highscores__list')
const highscoresCountEl = $('.highscores__count')

// Class names
const zombieClass = '.zombie'
const loaderClass = '.loader'

const digitClassName = 'counter__digit'
const digitBoxClassName = 'counter__digit-box'
const digitSliderClassName = 'counter__digit-slider'
const zombieClassName = 'zombie'
const animateClassName = 'animate'
const removedClassName = 'removed'
const counterShowSignClass = 'show-sign'
const highscoreClassName = 'highscore'
const loaderClassName = 'loader'

const visibleClassName = 'visible'
const overlayClassName = 'overlay'

// Variables
const url = 'https://api.npoint.io'
const hash = '92552a652ec4cc1c8d53'

const thresholds = [{
        requiredPoints: 0,
        spawnInterval: 2,
        maxSpeed: 2,
        maxCount: 10
    }, {
        requiredPoints: 100,
        spawnInterval: 2,
        maxSpeed: 3,
        maxCount: 15
    }, {
        requiredPoints: 350,
        spawnInterval: 1,
        maxSpeed: 4,
        maxCount: 30
    }, {
        requiredPoints: 750,
        spawnInterval: 1,
        maxSpeed: 5,
        maxCount: 50
    }, {
        requiredPoints: 1200,
        spawnInterval: .5,
        maxSpeed: 5,
        maxCount: Infinity
    }, {
        requiredPoints: 2000,
        spawnInterval: .4,
        maxSpeed: 5,
        maxCount: Infinity
    }, {
        requiredPoints: 5000,
        spawnInterval: .3,
        maxSpeed: 5,
        maxCount: Infinity
    },
]
let thresholdIdx = -1
const killPoints = 12
const missedShotPoints = -6
let zombiesCount = 0
let remainingHP = 3
const initialHP = remainingHP
const zombieWalkTimes = [20, 15, 10, 5, 3]
const zombieQueues = []
const crosshairAnimDuration = .1
const loaderTransitionDuration = .5

let counter = 0
const maxCount = 99999
const minDigitsCount = 3
const maxSpawnY = parseInt(window.innerHeight) * .1
let spawnInterval
let username

// Classes
class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class Queue {
    constructor() {
        this.first = this.last = null
        this.length = 0
    }

    enqueue(value) {
        const node = new Node(value)
        if (!this.first) this.first = this.last = node
        else {
            this.last.next = node
            this.last = node
        }
        this.length++
    }

    dequeue() {
        const removed = this.first
        // Return null if there is no node in a queue
        if (!removed) return null
        this.first = this.first.next
        // Set tail to null if removed the last node
        if (!this.first) this.last = null
        this.length--
        return removed.value
    }
}


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
    const count = Math.max(Math.abs(counter).toString().length, minDigitsCount) - 1
    for (let i = 0; i < count; i++) addCounterDigitEl()
    updateCounter()
}

const updateCounter = () => {
    const digits = Math.abs(counter)
                            .toString()
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
    digitBoxEl.classList.add(digitBoxClassName)
    digitSliderEl.classList.add(digitSliderClassName)
    digitSliderEl.classList.add(`${digitSliderClassName}--${sliderEls.length + 1}`)
    digitSliderEl.setAttribute('data-digit', 0)
    digitEl.classList.add(digitClassName)
    
    // Adding elements to DOM
    digitBoxEl.appendChild(digitSliderEl)
    digitEl.innerText = 9
    digitSliderEl.appendChild(digitEl)
    
    for (let i = 0; i <= 9; i++) {
        digitEl = document.createElement('li')
        digitEl.innerText = i
        digitEl.classList.add(digitClassName)
        digitSliderEl.appendChild(digitEl)
    }

    return digitBoxEl
}

const addCounterDigitEl = () => {
    const sliderEl = createSliderEl()
    digitsContainerEl.appendChild(sliderEl)
    sliderEls.push(sliderEl.firstChild)
}

const updateCounterValue = delta => {
    if (counter === maxCount) {
        if (confirm(maxCountMessage)) resetCounter()
    } else {
        counter += delta
        if (counter < 0) counterEl.classList.add(counterShowSignClass)
        else counterEl.classList.remove(counterShowSignClass)
        updateCounter()
    }
}

const updateCrosshairPosition = e => {
    crosshairEl.style.left = e.clientX + 'px'
    crosshairEl.style.top  = e.clientY + 'px'
}

const randInt = (a, b) => { // (b is inclusive)
    return parseInt(a + Math.random() * (b - a + 1))
}

const spawnZombie = maxSpeed => {
    const speed = randInt(1, maxSpeed)
    const zombieEl = document.createElement('div')
    zombieEl.classList.add(zombieClassName)
    zombieEl.setAttribute('data-speed', speed)
    zombieEl.style.bottom = randInt(0, maxSpawnY) + 'px'
    mainEl.appendChild(zombieEl)
    zombiesCount++
    const timeout = setTimeout(() => {
        checkIfZombieSurvived(zombieEl)
    }, zombieWalkTimes[speed - 1] * 1000)
    if (!zombieQueues[speed - 1]) zombieQueues[speed - 1] = new Queue()
    zombieQueues[speed - 1].enqueue([zombieEl, timeout])
    return zombieEl
}

const updateThreshold = () => {
    thresholdIdx++
    if (spawnInterval) clearInterval(spawnInterval)
    const t = thresholds[thresholdIdx]
    spawnInterval = setInterval(() => {
        if (zombiesCount < t.maxCount) spawnZombie(t.maxSpeed)
    }, t.spawnInterval * 1000)
}

const killZombie = zombieEl => {
    zombieEl.remove()
    zombieEl.classList.add(removedClassName)
    zombiesCount--
    updateCounterValue(killPoints)
    updateZombieQueues()
    if (thresholdIdx < thresholds.length - 1 && 
        counter >= thresholds[thresholdIdx].requiredPoints) updateThreshold()
}

const updateZombieQueues = () => {
    zombieQueues.forEach(queue => {
        while (queue.first?.classList?.contains(removedClassName)) {
            clearTimeout(queue.dequeue()[1])
        }
    })
}

const isZombieRemoved = zombieEl => zombieEl.classList.contains(removedClassName)

const checkIfZombieSurvived = zombieEl => {
    if (!isZombieRemoved(zombieEl)) {
        updateZombieQueues()
        zombieEl.remove()
        remainingHP--
        updateHP()
        if (!remainingHP) {
            gameOver()
        }
    }
}

const spawnHPBar = () => {
    for (let i = 0; i < remainingHP; i++) {
        const heartEl = document.createElement('span')
        heartEl.innerText = '❤️'
        hpBarEl.appendChild(heartEl)
    }
}

const updateHP = () => hpBarEl.firstChild?.remove()

const handleClick = e => {
    animateCrosshair()
    if (e.target.matches(zombieClass)) killZombie(e.target)
    else updateCounterValue(missedShotPoints)
}

const animateCrosshair = () => {
    crosshairEl.classList.add(animateClassName)
    setTimeout(() => {
        crosshairEl.classList.remove(animateClassName)
    }, crosshairAnimDuration * 1000);
}

const createHighsoreEl = data => {
    const highscoreEl = document.createElement('li')
    highscoreEl.classList.add(highscoreClassName)
    highscoreEl.innerHTML = highscoreTemplate
        .replace(/{{POINTS}}/g, data.points)
        .replace(/{{USERNAME}}/g, data.user)
        .replace(/{{DATE}}/g, data.date)
    return highscoreEl
}

const fetchJSONFile = async () => {
    const data = await fetch(`${url}/${hash}`, { method: 'GET' })
    return await data.json()
}

const showPopup = () => {
    popupEl.classList.add(visibleClassName)
    mainEl.classList.add(overlayClassName)
}

const hidePopup = () => {
    popupEl.classList.remove(visibleClassName)
    mainEl.classList.remove(overlayClassName)
}

const getTopHighscores = (scoresArr, limit = 7) => {
    scoresArr.sort((a, b) => b.points - a.points)
    return scoresArr.slice(0, limit)
}

const showHighscores = () => {
    highscoresEl.classList.add(visibleClassName)
    mainEl.classList.add(overlayClassName)
}

const loadHighscores = scoresArr => {
    scoresArr.forEach(highscoreData => {
        const highscoreEl = createHighsoreEl(highscoreData)
        highscoresListEl.appendChild(highscoreEl)
    })
    highscoresCountEl.innerText = scoresArr.length
}

const hideHighscores = () => {
    highscoresEl.classList.remove(visibleClassName)
    mainEl.classList.remove(overlayClassName)
    highscoresListEl.innerHTML = ''
}

const getDataWithCurrentScore = async () => {
    const newScore = {
        user: username,
        points: counter,
        date: new Date().toLocaleString()
    }

    let data = await fetchJSONFile()
    if (!data) data = [newScore]
    else data.push(newScore)
    return data
}

const saveTopHighscores = scoresArr => {
    fetch(`${url}/${hash}`, {
        method: 'POST',
        body: JSON.stringify(scoresArr)
    })
}

const initEventListeners = () => {
    window.addEventListener('mousemove', updateCrosshairPosition)
    mainEl.addEventListener('click', handleClick)
}

const removeEventListeners = () => {
    window.removeEventListener('mousemove', updateCrosshairPosition)
    mainEl.removeEventListener('click', handleClick)
}

const removeRemainingZombies = () => {
    zombieQueues.forEach(queue => {
        while (queue.length) {
            const [zombieEl, timeout] = queue.dequeue()
            zombieEl.remove()
            clearTimeout(timeout)
        }
    })
}

const appendLoaderTo = domEl => {
    const loaderEl = document.createElement('div')
    loaderEl.classList.add(loaderClassName)
    loaderEl.classList.add(visibleClassName)
    loaderEl.innerHTML = loaderHTML
    domEl.appendChild(loaderEl)
    return loaderEl
}

const removeLoaderFrom = domEl => {
    const loaderEl = domEl.querySelector(loaderClass)
    loaderEl.classList.remove(visibleClassName)
    setTimeout(() => {
        loaderEl.remove()
    }, loaderTransitionDuration * 1000)
}

const gameOver = async () => {
    removeEventListeners()
    showHighscores()
    appendLoaderTo(highscoresListEl)
    const scoresArr = getTopHighscores(await getDataWithCurrentScore())
    loadHighscores(scoresArr)
    removeLoaderFrom(highscoresListEl)
    saveTopHighscores(scoresArr)
    counter = 0
}

const handleSavePopup = e => {
    e.preventDefault()
    username = popupInputEl.value
    playerNameEl.innerText = username
    initialize()
}

const initialize = () => {
    thresholdIdx = -1
    remainingHP = initialHP
    zombiesCount = 0
    removeRemainingZombies()
    hidePopup()
    spawnHPBar()
    resetCounter()
    updateThreshold()
    initEventListeners()
}

const startNewGame = () => {
    hideHighscores()
    showPopup()
    popupInputEl.value = username
}

// Event listeners
popupFormEl.addEventListener('submit', handleSavePopup)
highscoresBtnEl.addEventListener('click', startNewGame)

// Initialization
setupCounter()
setTimeout(() => {    // This ensures that animation will be displayed 
    showPopup()
}, 0);
})()
