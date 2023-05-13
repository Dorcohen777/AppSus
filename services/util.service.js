export const utilService = {
    makeId,
    makeLorem,
    padNum,
    getRandomIntInclusive,
    getRandomColor,
    getDayName,
    getMonthName,
    getCurrentDate,
    getRandomFutureTimestamp,
    getRandomPastTimestamp,
    getCurrencySymbol,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    debounce,
}



function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function padNum(num) {
    return (num > 9) ? num + '' : '0' + num
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}

function getDayName(date, locale) {
    date = new Date(date)
    return date.toLocaleDateString(locale, { weekday: 'long' })
}


function getMonthName(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]
    return monthNames[date.getMonth()]
}

// return current date
function getCurrentDate() {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are zero-indexed, so we add 1 and pad with a leading zero if needed
    const day = date.getDate().toString().padStart(2, '0') // Pad with a leading zero if needed
    return `${year}-${month}-${day}`
}

function getRandomFutureTimestamp() {
    const now = Date.now() // Get the current timestamp
    const maxOffset = 1000 * 60 * 60 * 24 * 365 // Maximum offset of 1 year (in milliseconds)
    const randomOffset = Math.floor(Math.random() * maxOffset) // Generate a random offset between 0 and maxOffset
    const futureTimestamp = now + randomOffset // Add the offset to the current timestamp to get a future timestamp
    return futureTimestamp
}

function getRandomPastTimestamp() {
    const now = Date.now() // Get the current timestamp
    const maxOffset = 1000 * 60 * 60 * 24 * 365 // Maximum offset of 1 year (in milliseconds)
    const randomOffset = Math.floor(Math.random() * maxOffset) // Generate a random offset between 0 and maxOffset
    const pastTimestamp = now - randomOffset // Add the offset to the current timestamp to get a past timestamp
    return pastTimestamp
}


function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function getCurrencySymbol(currencyCode) {
    switch (currencyCode) {
        case 'EUR':
            return '€'
        case 'ILS':
            return '₪'
        case 'USD':
            return '$'
    }
}

function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}


function debounce(func, wait) {
    let timeout
  
    return function (...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
  
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }