import DateService from './DateService'

const HourCostService = {
    adjustHourCostIntervals (hourCostIntervals) {
        hourCostIntervals = hourCostIntervals.map(x => ({
            from: new Date(x.from),
            to: new Date(x.to),
            cost: x.cost
        }))

        const withinOneDay = hourCostIntervals
            .every(x => x.from.getDate() === hourCostIntervals[0].from.getDate())

        let intervalCosts = []
        let totalCost = 0
        hourCostIntervals.forEach(x => {
            let datePrefix = withinOneDay ? '' : DateService.toDateString(x.from) + ' '
            intervalCosts.push(`${datePrefix}${DateService.toTimeString(x.from)} - ${DateService.toTimeString(x.to, true)} | ${x.cost}₽`)
            totalCost += x.cost
        })

        return {
            totalCost: `${totalCost}₽`,
            intervalCosts
        }
    }
}

export default HourCostService
