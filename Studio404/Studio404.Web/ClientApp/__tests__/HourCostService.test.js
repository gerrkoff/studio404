import HourCostService from '../modules/HourCostService'
import DateService from '../modules/DateService'

jest.mock('../modules/DateService', () => ({
    toDateString: jest.fn(() => '[date]'),
    toTimeString: jest.fn(() => '[time]')
}))

test('simple intervals', () => {
    let result = HourCostService.adjustHourCostIntervals({
        totalCost: 500,
        promoCode: {
            info: 'info'
        },
        intervalCosts: [
            {
                from: new Date(2018, 6, 4, 12, 30),
                to: new Date(2018, 6, 4, 16, 55),
                cost: 100
            },
            {   
                from: new Date(2018, 6, 4, 16, 55),
                to: new Date(2018, 6, 5, 0, 0),
                cost: 250
            },
            {
                from: new Date(2018, 6, 5, 0, 0),
                to: new Date(2018, 6, 5, 12, 0),
                cost: 150
            }
        ]
    })
    expect(result.totalCost).toBe('500₽')
    expect(result.promoCodeInfo).toBe('info')
    expect(result.intervalCosts.length).toBe(3)
    expect(result.intervalCosts[0]).toBe('[date] [time] - [time] = 100₽')
    expect(result.intervalCosts[1]).toBe('[date] [time] - [time] = 250₽')
    expect(result.intervalCosts[2]).toBe('[date] [time] - [time] = 150₽')
})

test('intervals within one day', () => {
    let result = HourCostService.adjustHourCostIntervals({
        totalCost: 0,
        promoCode: {},
        intervalCosts: [
            {
                from: new Date(2018, 6, 4, 12, 30),
                to: new Date(2018, 6, 4, 16, 55),
                cost: 100
            },
            {   
                from: new Date(2018, 6, 4, 16, 55),
                to: new Date(2018, 6, 5, 0, 0),
                cost: 250
            }
        ]
    })
    expect(result.intervalCosts.length).toBe(2)
    expect(result.intervalCosts[0]).toBe('[time] - [time] = 100₽')
    expect(result.intervalCosts[1]).toBe('[time] - [time] = 250₽')
})