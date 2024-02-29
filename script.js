const dayInput = document.querySelector('#day')
const monthInput = document.querySelector('#month')
const yearInput = document.querySelector('#year')

const errorTextDay = document.querySelector('#error-text-day')
const errorTextMonth = document.querySelector('#error-text-month')
const errorTextYear = document.querySelector('#error-text-year')

const nbYears = document.querySelector('#nb-years')
const nbMonths = document.querySelector('#nb-months')
const nbDays = document.querySelector('#nb-days')

const tilteInputDay = document.querySelector('#title-day')
const tilteInputYear = document.querySelector('#title-year')
const tilteInputMonth = document.querySelector('#title-month')

const newDate = new Date()
const yearNow = newDate.getFullYear()

let arrayCalc = []

const goodMonthInput = function() {
    const valueMonth = parseInt(monthInput.value)
    // si l'input n'a pas de valeur, une erreur est envoyer
    if(monthInput.value !== '') {
        // verifie si l'input du mois a une valeur entre 0 et 12, si oui alors on le met dans le tableau
        if(valueMonth > 0 && valueMonth <= 12) {
            errorTextMonth.innerText = ''
            tilteInputMonth.style.color = 'var(--smokey-grey)'
            monthInput.style.border = '1px solid var(--light-grey)'
            arrayCalc.push(valueMonth)
        } else {
            errorTextMonth.innerText = 'Must be a valid month'
            tilteInputMonth.style.color = 'var(--light-red)'
            monthInput.style.border = '1px solid var(--light-red)'
        }
    } else {
        errorTextMonth.innerText = 'This field is required'
        tilteInputMonth.style.color = 'var(--light-red)'
        monthInput.style.border = '1px solid var(--light-red)'
    }
}

const goodYearInput = function() {
    const valueYear = parseInt(yearInput.value)
    // si l'input n'a pas de valeur, une erreur est envoyer
    if(yearInput.value !== '') {
        // verifie si l'input de l'année a une valeur entre 0 et l'année actuelle, si oui alors on le met dans le tableau
        if(valueYear >= 0 && valueYear <= yearNow) {
            errorTextYear.innerText = ''
            tilteInputYear.style.color = 'var(--smokey-grey)'
            yearInput.style.border = '1px solid var(--light-grey)'
            arrayCalc.push(valueYear)
        } else {
            errorTextYear.innerText = 'Must be a valid year'
            tilteInputYear.style.color = 'var(--light-red)'
            yearInput.style.border = '1px solid var(--light-red)'
        }
    } else {
        errorTextYear.innerText = 'This field is required'
        tilteInputYear.style.color = 'var(--light-red)'
        yearInput.style.border = '1px solid var(--light-red)'
    }
}

const goodDayInput = function() {
    const valueMonth = parseInt(monthInput.value) - 1 // permet de mettre l'index du mois
    const valueYear = parseInt(yearInput.value)
    const valueDay = parseInt(dayInput.value)
    // early return pour ne pas mettre d'erreur a jour si un jour et entrer et que le mois non
    if(valueDay > 0 && valueDay <= 31 && monthInput.value === '') {
        errorTextDay.innerText = ''
        tilteInputDay.style.color = 'var(--smokey-grey)'
        dayInput.style.border = '1px solid var(--light-grey)'
        return
    }
    // création de la date de l'utilisateur
    const userDateCalc = new Date(valueYear, valueMonth, valueDay)
    // si l'input n'a pas de valeur, une erreur est envoyer
    if(dayInput.value !== '') {
        // si le jour de la date crée est egal aux jour de l'utilisateur alors on met le jour dans le tableau
        if(userDateCalc.getDate() === valueDay) {
            errorTextDay.innerText = ''
            tilteInputDay.style.color = 'var(--smokey-grey)'
            dayInput.style.border = '1px solid var(--light-grey)'
            arrayCalc.push(valueDay)
        } else {
            errorTextDay.innerText = 'Must be a valid day'
            tilteInputDay.style.color = 'var(--light-red)'
            dayInput.style.border = '1px solid var(--light-red)'
        }
    } else {
        errorTextDay.innerText = 'This field is required'
        tilteInputDay.style.color = 'var(--light-red)'
        dayInput.style.border = '1px solid var(--light-red)'
    }
}

class CalculDate {
    constructor(arrayCalc) {
        this.date = arrayCalc[0] // recupere le jour du tableau
        this.month = arrayCalc[1] // recupere le mois du tableau
        this.year = arrayCalc[2] // recupere l'année du tableau

        this.currentYear = newDate.getFullYear()
        this.currentMonth = newDate.getMonth() + 1
        this.currentDay = newDate.getDate()
    }

    calcYear() {
        if (this.month >= this.currentMonth && this.date > this.currentDay) {
            return this.currentYear - this.year - 1
        } else {
            return this.currentYear - this.year
        }
    }

    calcMonth() {
        if(this.date <= this.currentDay && this.month > this.currentMonth) {
            return 12 - (this.month - this.currentMonth)
        } else if(this.date <= this.currentDay && this.month < this.currentMonth) {
            return this.currentMonth - this.month
        } else if(this.date > this.currentDay && this.month < this.currentMonth) {
            return this.currentMonth - this.month - 1
        } else if(this.date > this.currentDay && this.month > this.currentMonth) {
            return 12 - (this.month - this.currentMonth) - 1
        } else if(this.date > this.currentDay && this.month === this.currentMonth) {
            return 12 - (this.month - this.currentMonth) - 1
        } else if(this.date <= this.currentDay && this.month === this.currentMonth) {
            return 0
        } else {
           throw new Error('erreur lors du calcul du mois')
        }
    }

    calcDay() {
        if (this.date > this.currentDay) {
            const daysInLastMonth = new Date(this.year, this.month, 0).getDate()
            return daysInLastMonth - this.date + this.currentDay
        } else {
            return this.currentDay - this.date
        }
    }
}

const sendBtn = document.querySelector('#send-btn')
sendBtn.addEventListener(('click'), () => {
    // a chaque clic, on réinitialise le tableau et on le remplit grâce aux fonctions
    arrayCalc = []
    goodDayInput()
    goodMonthInput()
    goodYearInput()
    // vérifie que le tableau possède l'année, le mois et le jour
    if(arrayCalc.length === 3) {
        const calculDate = new CalculDate(arrayCalc)
        nbMonths.innerText = calculDate.calcMonth()
        nbYears.innerText = calculDate.calcYear()
        nbDays.innerText = calculDate.calcDay()
    }
})