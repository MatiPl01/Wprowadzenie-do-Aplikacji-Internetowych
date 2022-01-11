"use strict";

(() => {
const toggleImgInit = (figureEl, imageEl) => {
    const images = ['beach.jpg', 'mountains.jpg']
    const alts   = ['Plaża', 'Góry']
    const colors = ['blue', 'red']

    let i = 1

    return () => {
        i = (i + 1) % images.length
        figureEl.style.borderColor = colors[i]
        imageEl.setAttribute('src', `img/${images[i]}`)
        imageEl.setAttribute('alt', alts[i])
    }
}

const figureEl = document.querySelector('.figure')
const imageEl  = figureEl.querySelector('.figure__img')
const btnEl    = document.querySelector('#btn-change')

const toggleImg = toggleImgInit(figureEl, imageEl)

btnEl.addEventListener('click', toggleImg)
})()
