const DateService = {

    getDayOfWeekLabel(date) {
        return weekday[date.getDay()];
    },

    getMonday(date) {
        let day = date.getDay(),
            diff = date.getDate() - day + (day == 0 ? -6:1);
        return new Date(date.setDate(diff));
    },

    addDaysToDate(date, days) {
        let result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },

    toDateString(date) {
        var options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };

        return date.toLocaleString("ru", options);
    },

    convertHourToLabel(hour) {
        return `${hour}:00`;
    },

    convertHourIntervalToLabel(hourStart, hourEnd){
        return `${this.convertHourToLabel(hourStart)} – ${this.convertHourToLabel(hourEnd + 1)}`
    },

    convertHoursToLabels(hours) {
        let labels = [];

        if(hours.length === 0) return labels;
        
        hours.sortNumbers();
        let start = hours[0]
        hours.forEach((value, index, array) => {
            if(index === 0)
                return;

            let previous = array[index - 1];
            if(value === previous || value === previous + 1)
                return;

            labels.push(this.convertHourIntervalToLabel(start, previous));
            start = value;
        });
        labels.push(this.convertHourIntervalToLabel(start, hours[hours.length-1]));

        return labels;
    }
}

let weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

export default DateService;