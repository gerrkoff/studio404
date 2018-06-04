const DateService = {

    toWeekdayWithDate (date) {
        var options = {
            weekday: 'long',
            month: '2-digit',
            day: 'numeric'
        }

        return date.toLocaleString('ru', options)
    },

    getMonday (date) {
        let day = date.getDay()
        let diff = date.getDate() - day + (day === 0 ? -6 : 1)
        return new Date(date.setDate(diff))
    },

    addDaysToDate (date, days) {
        let result = new Date(date)
        result.setDate(result.getDate() + days)
        return result
    },

    toDateString (date) {
        date = convertToDateIfString(date)

        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }

        return date.toLocaleString('ru', options)
    },

    toTimeString (date, midnightAs24h) {
        date = convertToDateIfString(date)
        let time = date.toTimeString().substr(0, 5)
        if (time === '00:00' && midnightAs24h) {
            return '24:00'
        }
        else {
            return time
        }
    },

    convertHourToLabel (hour) {
        return `${hour}:00`
    },

    convertHourIntervalToLabel (hourStart, hourEnd) {
        return `${this.convertHourToLabel(hourStart)} – ${this.convertHourToLabel(hourEnd + 1)}`
    },

    convertHoursToLabels (hours) {
        let labels = []

        if (hours.length === 0) return labels

        hours.sortNumbers()
        let start = hours[0]
        hours.forEach((value, index, array) => {
            if (index === 0) {
                return
            }

            let previous = array[index - 1]
            if (value === previous || value === previous + 1) {
                return
            }

            labels.push(this.convertHourIntervalToLabel(start, previous))
            start = value
        })
        labels.push(this.convertHourIntervalToLabel(start, hours[hours.length - 1]))

        return labels
    },

    dateLessToday (date) {
        return date < today
    }
}

const today = new Date()
today.setHours(0, 0, 0, 0)

function convertToDateIfString (date) {
    return typeof date === 'string'
        ? new Date(date.substr(0, 19))
        : date
}

export default DateService
