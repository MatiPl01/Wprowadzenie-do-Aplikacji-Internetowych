"use strict";

(() => {
// Helper functions
const $  = selector => document.querySelector(selector)
const $a = selector => document.querySelectorAll(selector)

// DOM Selectors
const menuItemEls  = Array.from($a('.menu__item'))
const menuHelperEl = $('.menu__helper')
const loaderEl = $('.loader')

// Class strings
const resultClassName = 'result'
const detailsRowClassName = 'details__row'
const disableAnimationClassName = 'disable-anim'

const counterClass = '.counter__number'
const outputSectionClass = '.cities__section'
const resultsMoreBtnClass = '.result__more'
const resultsSectionClass = '.cities__results'
const detailsContainerClass = '.details__list'

// Variables
const intervalTime = 4 // This is a minimum value (4ms)
const elementsAddedAtOnce = 20
const disableAnimThreshold = 100
const citiesDataPath = 'http://localhost:3000/cities' // json-server --watch -p 3000 json/cities.json
const templatesPaths = {
    result: 'templates/result.html',
    detailsRow: 'templates/details-row.html'
}

const templates = {}
const filtersFunctions = {}
let citiesData = {}

const dictionary = {
    name: 'nazwa',
    township: 'powiat',
    province: 'województwo',
    area: 'powierzchnia',
    people: 'zaludnienie',
    density: 'gęstość zaludnienia'
}

const filters = {
    a() {
        const res = []
        citiesData.forEach((obj, idx) => {
            if (obj.province === 'małopolskie') res.push([idx, obj])
        })
        return res
    },
    b() {
        const res = []
        citiesData.forEach((obj, idx) => {
            if (Array.from(obj.name).filter(l => l === 'a').length === 2) res.push([idx, obj])
        })
        return res
    },
    c() {
        const obj = [...citiesData].sort((a, b) => b.density - a.density)[5 - 1]
        return [[citiesData.indexOf(obj), obj]]
    },
    d() {
        const res = []
        citiesData.forEach((obj, idx) => {
            if (obj.people > 100_000) obj = {name: obj.name + " city"}
            res.push([idx, obj])
        })
        return res
    }
}

const summaries = {
    e() {
        const calc = citiesData.filter(obj => obj.people > 80_000).length
        const text = `Więcej jest miast, które mają po${ calc > citiesData.length ? 'wy' : 'ni'}żej 80000 mieszkańców`

        return {
            text,
            details: {
                'Liczba miast, liczących powyżej 80000 mieszkańców': calc,
                'Liczba miast, liczących co najwyżej 80000 mieszkańców': citiesData.length - calc,
            }
        }
    },
    f() {
        const filtered = citiesData.filter(obj => obj.township.toLowerCase().startsWith('p'))
        const calc = filtered.reduce((acc, v) => acc + v.people, 0) / filtered.length || 0
        const text = `Średnia powierzchnia miast z powiatów, zaczynających się na literę <i>P</i> wynosi ${calc.toFixed(2)}`

        return {
            text,
            details: {
                'Liczba miast, liczących powyżej 80000 mieszkańców': calc,
                'Liczba miast, liczących poniżej 80000 mieszkańców': citiesData.length - calc,
            }
        }
    }
}

// Functions
const loadTemplates = async callback => {
    Object.entries(templatesPaths).forEach(([key, path]) => {
        fetch(path)
            .then(res => res.text())
            .then(res => templates[key] = res)
            .then(callback())
    })
}

const loadJSON = async callback => {
    fetch(citiesDataPath)
        .then(res => res.json())
        .then(res => {
            citiesData = res
            callback()
        })
}

const callbackInit = () => {
    let counter = 2
    return () => {
        // Run a block of code below only after a callback function was called twice
        if (counter-- <= 0) {
            // Hide the loader
            hideLoader()
            // Event listeners
            menuItemEls.forEach((el, idx) => {
                el.addEventListener('mouseenter', scrollToDetailsInit(el))
                const filterID = el.getAttribute('data-filter')
                if (filters[filterID] !== undefined) {
                    if (idx > 0) {
                        filtersFunctions[filterID] = loadFiltersInit(el, filterID, filters[filterID])
                        el.addEventListener('click', filtersFunctions[filterID])
                    } else {
                        loadFiltersInit(el, filterID, filters[filterID])()
                    }
                } else {
                    loadSummary(filterID)
                }
            })
        }
    }
}
const callback = callbackInit()

const createResultEl = (cityID, filterID, resultID, resultText) => {
    const resultHTML = templates.result
        .replaceAll('{{ID}}', `${filterID}-${resultID}`)
        .replace('{{RESULT}}', resultText)
    const resultEl = document.createElement('li')
    resultEl.setAttribute('data-city-id', cityID)
    resultEl.classList.add(resultClassName)
    resultEl.innerHTML = resultHTML
    return resultEl
}

const scrollToDetailsInit = menuItemEl => {
    return () => {
        const filter = menuItemEl.getAttribute('data-filter')
        const detailsEl = menuHelperEl.querySelector(`[data-filter=${filter}]`)
        menuHelperEl.scrollTo({
            top: detailsEl.offsetTop,
            behavior: 'smooth'
        })
    }
}

const createDetailsRowEl = (name, value) => {
    const rowHTML = templates.detailsRow
        .replace('{{NAME}}', name)
        .replace('{{VALUE}}', value)
    const rowEl = document.createElement('li')
    rowEl.classList.add(detailsRowClassName)
    rowEl.innerHTML = rowHTML
    return rowEl
}

const appendResultsEls = (filterID, resultsSectionEl, data, callback) => {
    let i = 0
    const interval = setInterval(() => {
        // Add more than one element at once
        for (let j = 0; j < elementsAddedAtOnce; j++) {
            if (i >= data.length) {
                clearInterval(interval)
                callback()
                return
            }
            const [cityID, obj] = data[i++]
            const resultEl = createResultEl(cityID, filterID, i, obj.name)
            const moreBtnEl = resultEl.querySelector(resultsMoreBtnClass)
            resultsSectionEl.appendChild(resultEl)
            moreBtnEl.addEventListener('click', loadDetailsOnce)
        }
    }, intervalTime);
}

const loadFiltersInit = (el, filterID, filterFunction) => {
    const sectionEl = $(outputSectionClass + `[data-filter="${filterID}"]`)
    const resultsSectionEl = sectionEl.querySelector(resultsSectionClass)
    const data = filterFunction(citiesData)

    return () => {
        showLoader()
        el.removeEventListener('click', filtersFunctions[filterID])
        appendResultsEls(filterID, resultsSectionEl, data, hideLoader)
        sectionEl.querySelector(counterClass).innerText = data.length
        if (data.length > disableAnimThreshold) resultsSectionEl.classList.add(disableAnimationClassName)
    }
}

const loadDetails = resultEl => {
    const detailsContainerEl = resultEl.querySelector(detailsContainerClass)
    const cityID = parseInt(resultEl.getAttribute('data-city-id'))
    
    Object.entries(citiesData[cityID]).forEach(([key, value]) => {
        detailsContainerEl.appendChild(createDetailsRowEl(dictionary?.[key] || key, value))
    })
}

const loadDetailsOnce = e => {
    const resultEl = e.target.closest(resultsMoreBtnClass)
    resultEl.removeEventListener('click', loadDetailsOnce)
    loadDetails(resultEl.parentElement.parentElement)
}

const loadSummary = filterID => {
    const sectionEl = $(outputSectionClass + `[data-filter="${filterID}"]`)
    const resultsSectionEl = sectionEl.querySelector(resultsSectionClass)
    const {text, details} = summaries[filterID]()
    const resultEl = createResultEl(undefined, filterID, 1, text)
    const detailsContainerEl = resultEl.querySelector(detailsContainerClass)
    resultEl.removeAttribute('data-city-id')
    resultsSectionEl.appendChild(resultEl)
    Object.entries(details).forEach(([key, value]) => {
        detailsContainerEl.appendChild(createDetailsRowEl(key, value))
    })

    if (filterID === 'f') resultEl.querySelector(resultsMoreBtnClass).remove()
    sectionEl.querySelector(counterClass).innerText = 1
}

const showLoader = () => loaderEl.classList.remove('hidden')
const hideLoader = () => loaderEl.classList.add('hidden')

// Loading templates and JSON file
loadTemplates(callback)
loadJSON(callback)
})()
