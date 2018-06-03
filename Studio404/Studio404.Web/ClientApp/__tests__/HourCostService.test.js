const HourCostService = require('../modules/HourCostService')

test('sum 3 intervals [100, 250, 150] equals to 500', () => {
    let result = HourCostService.default.adjustHourCostIntervals([
        {
            cost: 100
        },
        {
            cost: 250
        },
        {
            cost: 150
        }
    ])
    expect(result.bookingCost).toBe(500)
})