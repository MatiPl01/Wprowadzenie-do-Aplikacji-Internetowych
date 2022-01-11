"use strict";

(() => {
// Variables
const noteTemplatePath = 'templates/note.html'
let template = null
let firstNotRemovedNote = null

// Selectors
const $ = selector => document.querySelector(selector)

const btnEl = {
    noteAdd:     $('#note-add-btn'),
    noteRemove:  $('#note-rm-btn'),
    popupClose:  $('#popup-close-btn'),
    popupCancel: $('#popup-cancel-btn'),
    popupSave:   $('#popup-save-btn')
}

const popupEl   = $('#popup');
const titleEl   = $("#note-title")
const contentEl = $('#note-content')
const notesEl   = $('#notes')

// Functions
const closePopup = () => {
    popupEl.classList.add('hidden')
    document.body.classList.remove('fullscreen')
}

const handleClosePopup = e => {
    e.preventDefault()
    const closeEls = [document.body, btnEl.popupClose, btnEl.popupCancel]
    if (closeEls.includes(e.target)) {
        clearPopup()
        closePopup()
    }
}

const openPopup = () => {
    popupEl.classList.remove('hidden')
    titleEl.value = getNextTitle()
    document.body.classList.add('fullscreen')
}

const getNextTitle = () => {
    let count = 1
    document.querySelectorAll('.notebook__item').forEach(note => {
        if (!note.classList.contains('hidden')) count++
    })
    return `Moja notatka ${count}`
}

const getPopupData = () => {
    return {
        title:   titleEl.value,
        content: contentEl.value
    }
}

const clearPopup = () => {
    titleEl.value = ''
    contentEl.value = ''
}

const loadNoteTemplate = async () => {
    if (template === null) {
        const response = await fetch(noteTemplatePath)
        template = await response.text()
    }
    return template
}

const parseText = text => {
    return text.split('\n').map(line => line ? `<p>${line}</p>` : '<br>').join('')
}

const createNoteHTML = async data => {
    const template = await loadNoteTemplate()
    const currDate = new Date()
    return template.replace('{{HEADING}}', data.title)
                    .replace('{{CONTENT}}', parseText(data.content))
                    .replace('{{TIME}}', currDate.toLocaleString())
                    .replace('{{DATETIME}}', currDate.toISOString())
}


const createNoteEl = noteHTML => {
    const noteEl = document.createElement('li')
    noteEl.className = 'notebook__item'
    noteEl.innerHTML = noteHTML
    return noteEl
}

const handleSavePopup = async e => {
    e.preventDefault()
    const data = getPopupData()

    if (data.title) {
        const noteHTML = await createNoteHTML(data)
        clearPopup()
        closePopup()
        const noteEl = createNoteEl(noteHTML)
        notesEl.appendChild(noteEl)
        noteEl.scrollIntoView()
    }
}

const nextNoteToRemove = () => {
    if (!firstNotRemovedNote) {
        for (let noteEl of notesEl.children) {
            if (!noteEl.classList.contains('hidden')) {
                firstNotRemovedNote = noteEl
                break
            }
        }
    }
    
    const toRemove = firstNotRemovedNote
    firstNotRemovedNote = firstNotRemovedNote?.nextElementSibling

    return toRemove
}

const handleRemoveNote = () => {
    const noteEl = nextNoteToRemove()

    if (noteEl) {
        noteEl.scrollIntoView()
        noteEl.classList.add('hidden')
        
        setTimeout(() => {
            notesEl.removeChild(noteEl)
            // or notesEl.children[0].remove() but is less supported    
        }, 1000);
        
    } else {
        alert('Brak notatek do usunięcia. Dodaj nową notatkę.')
    }
}

// Event listeners
document.body.addEventListener('click', handleClosePopup)
btnEl.noteAdd.addEventListener('click', openPopup)
btnEl.popupSave.addEventListener('click', handleSavePopup)
btnEl.noteRemove.addEventListener('click', handleRemoveNote)
})()
