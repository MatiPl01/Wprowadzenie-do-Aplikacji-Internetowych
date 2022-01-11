"use strict";

(() => {
const $  = selector => document.querySelector(selector)
const $a = selector => document.querySelectorAll(selector)

// DOM Selectors
const btnAddEl = $('#btn-submit')
const btnClearPhoneEl = $('#btn-clear-phone')

const phoneInputEl = $('#form-phone')
const nameInputEl  = $('#form-name')
const formEl = $('.form')

const phoneBookListEl = $('.phone-book__list')

// Class strings
const contactItemClassStr = 'phone-book__item'
const checkboxClass = '.phone-book__checkbox'

// Variables
const removeDelay = 5000
const removeDuration = 600
const contactTemplatePath = 'templates/contact.html'
let contactTemplate = null

let prevCorrectPhone = ''
let currContactID = 1

// Functions
const loadContactTemplate = async () => {
    if (contactTemplate === null) {
        const response = await fetch(contactTemplatePath)
        contactTemplate = await response.text()
    }
    return contactTemplate
}

const createContactHTML = async data => {
    const template = await loadContactTemplate()
    return template.replace('{{NAME}}', data.name)
                   .replace('{{PHONE}}', data.phone)
                   .replace(/{{ID}}/g, data.id)
}

const handlePhoneInputInit = () => {
    const re = new RegExp(`
        (^[+]\\d{0,2}$)|
        (^([+]\\d{2}\\s?)?\\d{0,3}$)|
        (^([+]\\d{2}\\s?)?\\d{3}[-\\s]?\\d{0,3}$)|
        (^([+]\\d{2}\\s?)?(\\d{3}[-\\s]?){2}\\d{0,3}$)
    `.split('\n').map(part => part.trim()).join(''))

    return e => {
        let value = e.target.value

        if (!value.match(re)) {
            e.target.value = prevCorrectPhone
        } else prevCorrectPhone = value

        if (isValidPhone(cleanPhone(value))) {
            btnAddEl.focus()
        }
    }
}

const cleanPhone = phone => phone.replace(/[\s-]/g, '')

const isValidPhone = phone => {
    if (phone.startsWith('+')) return phone.length === 12
    return phone.length === 9
}

const formatPhoneNumber = () => {
    const value = cleanPhone(phoneInputEl.value)

    if (!isValidPhone(value)) return

    let countryCode, part1, part2, part3
    countryCode = part1 = part2 = part3 = ''

    if (value.startsWith('+')) {
        countryCode = `${value.slice(0, 3)} `
        part1 = value.slice(3, 6)
        part2 = value.slice(6, 9)
        part3 = value.slice(9, 12)
    } else {
        part1 = value.slice(0, 3)
        part2 = value.slice(3, 6)
        part3 = value.slice(6, 9)
    }

    prevCorrectPhone = phoneInputEl.value = `${countryCode}${part1}-${part2}-${part3}`
}

const clearPhoneInput = e => {
    e.preventDefault()
    phoneInputEl.value = ''
}

const capitalize = text => text.split(' ').map(part => part[0].toUpperCase() + part.slice(1)).join(' ')

const getInputData = () => {
    return {
        id:    currContactID++,
        name:  capitalize(nameInputEl.value),
        phone: phoneInputEl.value,
    }
}

const clearInput = () => {
    phoneInputEl.value = nameInputEl.value = ''
    phoneInputEl.blur()
    nameInputEl.focus()
}

const createContactEl = (contactHTML, id) => {
    const contactEl = document.createElement('li')
    contactEl.setAttribute('data-id', id)
    contactEl.className = contactItemClassStr
    contactEl.innerHTML = contactHTML
    return contactEl
}

const removeContact = contactEl => {
    contactEl.remove()
    localStorage.removeItem(parseInt(contactEl.getAttribute('data-id')))
}

const addContactEventListener = contactEl => {
    let timeout = null
    const checkboxEl = contactEl.querySelector(checkboxClass)

    checkboxEl.addEventListener('change', () => {
        if (timeout) {
            clearTimeout(timeout)
            timeout = null
        }
        if (checkboxEl.checked) {
            timeout = setTimeout(() => {
                contactEl.classList.add('removed')
                setTimeout(() => removeContact(contactEl), removeDuration)
            }, removeDelay)
        }
    })
}

const addContactElement = async data => {
    const contactHTML = await createContactHTML(data)
    const contactEl = createContactEl(contactHTML, data.id)
    phoneBookListEl.appendChild(contactEl)
    addContactEventListener(contactEl)
    contactEl.scrollIntoView()
    localStorage.setItem(data.id, JSON.stringify(data))
}

const handleContactSave = async e => {
    e.preventDefault()
    const data = getInputData()
    addContactElement(data)
    clearInput()
}

const loadStoredContacts = () => {
    currContactID = Math.max(Math.max(...Object.keys(localStorage).map(key => parseInt(key))), 0) + 1
    Object.values(localStorage).forEach(data => addContactElement(JSON.parse(data)))
}

// Loading contacts
loadStoredContacts()

// Event listeners
phoneInputEl.addEventListener('input', handlePhoneInputInit())
phoneInputEl.addEventListener('blur', formatPhoneNumber)
btnClearPhoneEl.addEventListener('click', clearPhoneInput)
formEl.addEventListener('submit', handleContactSave)
Array.from($a(`.${contactItemClassStr}`)).forEach(el => addContactEventListener(el))
})()
