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

test('simple intervals', () => {
    let result = HourCostService.default.adjustHourCostIntervals([
        {
            from: new Date(2018, 6, 4, 12, 30),
            to: new Date(2018, 6, 4, 16, 0),
            cost: 100
        },
        {   
            from: new Date(2018, 6, 4, 16, 0),
            to: new Date(2018, 6, 4, 18, 25),
            cost: 250
        },
        {
            from: new Date(2018, 6, 4, 18, 25),
            to: new Date(2018, 6, 5, 0, 0),
            cost: 150
        },
        {
            from: new Date(2018, 6, 5, 0, 0),
            to: new Date(2018, 6, 5, 12, 0),
            cost: 150
        }
    ])
    expect(result.bookingCost).toBe(500)
    expect(result.intervalCosts[0]).toBe('4 июня 2018г. 12:30 - 16:00 | 100₽')
    expect(result.intervalCosts[1]).toBe('4 июня 2018г. 16:00 - 18:25 | 250₽')
    expect(result.intervalCosts[2]).toBe('4 июня 2018г. 12:30 - 24:00 | 150₽')
    expect(result.intervalCosts[3]).toBe('5 июня 2018г. 00:00 - 12:00 | 150₽')
})