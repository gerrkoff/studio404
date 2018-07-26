import DateService from './DateService'

const HourCostService = {
    adjustHourCostIntervals (bookingCostInfo) {
        let hourCostIntervals = bookingCostInfo.intervalCosts.map(x => ({
            from: new Date(x.from),
            to: new Date(x.to),
            cost: x.cost
        }))

        const withinOneDay = hourCostIntervals
            .every(x => x.from.getDate() === hourCostIntervals[0].from.getDate())

        let intervalCosts = hourCostIntervals.map(x => {
            let datePrefix = withinOneDay ? '' : DateService.toDateString(x.from) + ' '
            return `${datePrefix}${DateService.toTimeString(x.from)} - ${DateService.toTimeString(x.to, true)} = ${x.cost}₽`
        })

        return {
            totalCost: `${bookingCostInfo.totalCost}₽`,
            promoCodeInfo: bookingCostInfo.promoCode.info,
            intervalCosts
        }
    }
}

export default HourCostService
