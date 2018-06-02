const DateService = require('../modules/DateService')

test('adds 3 days to 2018-06-04 equals to 2018-06-07', () => {
    let date = new Date(2018, 6, 4)
    let result = DateService.default.addDaysToDate(date, 4)
    expect(result.getTime()).toBe(new Date(2018, 6, 7).getTime())
});