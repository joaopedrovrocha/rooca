import moment from 'moment'

const getDate = () => {
    return moment().format('YYYY-MM-DD')
}

const momentFormat = (date, inPattern, outPattern) => {
    return moment(date, inPattern).format(outPattern)
}

const formatDate = (date, pattern, outPattern) => {
    pattern = pattern || 'YYYY-MM-DD'
    outPattern = outPattern || 'DD/MM/YYYY'

    return momentFormat(date, pattern, outPattern)
}

const formatDateTime = (dateTime, pattern, outPattern) => {
    pattern = pattern || 'YYYY-MM-DD h:mm:ss'
    outPattern = outPattern || 'DD/MM/YYYY h:mm:ss'

    return momentFormat(date, pattern, outPattern)
}

const sumObject = (array, field) => {
    return array.reduce((total, item) => total += item[field], 0)
}

const numberToCurrency = number => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number)
}

const arrayUnique = (arr, field) => {
    return arr.map(el => el[field]).filter((value, index, self) => self.indexOf(value) === index).sort((a, b) => a - b)
}

export {
    getDate,
    formatDate,
    formatDateTime,

    numberToCurrency,

    sumObject,

    arrayUnique
}