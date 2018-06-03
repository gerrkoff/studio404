import DateService from './DateService'

const HourCostService = {
    adjustHourCostIntervals (hourCostIntervals) {
        let intervalCosts = []
        let totalCost = 0
        hourCostIntervals.forEach(x => {
            intervalCosts.push(`${DateService.toDateString(x.from)} ${DateService.toTimeString(x.from)} - ${DateService.toTimeString(x.to, true)} | ${x.cost}₽`)
            totalCost += x.cost
        })

        return {
            totalCost: `${totalCost}₽`,
            intervalCosts
        }
    }
}

export default HourCostService
