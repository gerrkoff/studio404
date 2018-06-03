const HourCostService = {
    adjustHourCostIntervals (hourCostIntervals) {
        return {
            bookingCost: hourCostIntervals.map(x => x.cost).reduce((acc, val) => acc + val)
        }
    }
}

export default HourCostService
