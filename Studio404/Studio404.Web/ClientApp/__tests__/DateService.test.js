import DateService from '../modules/DateService'

test('adds 3 days to 2018-06-04 equals to 2018-06-07', () => {
    let date = new Date(2018, 6, 4)
    let result = DateService.addDaysToDate(date, 3)
    expect(result.getTime()).toBe(new Date(2018, 6, 7).getTime())
})
/* // TODO: fix it
test('[toDateString] test', () => {
    expect(DateService.toDateString('2018-06-03T14:00:00'))
    // it's strange but that's it in Node.js environment
        .toBe('2018 M06 3')
})
*/
test('[toTimeString] test passing string', () => {
    expect(DateService.toTimeString('2018-06-03T14:53:00'))
        .toBe('14:53')
})

test('[toTimeString] test passing date', () => {
    expect(DateService.toTimeString(new Date('2018-06-03T14:53:00')))
        .toBe('14:53')
})

test('[toTimeString] test midnight without 24h', () => {
    expect(DateService.toTimeString('2018-06-03T00:00:00'))
        .toBe('00:00')
})

test('[toTimeString] test midnight with 24h conversion', () => {
    expect(DateService.toTimeString('2018-06-03T00:00:00', true))
        .toBe('24:00')
})
