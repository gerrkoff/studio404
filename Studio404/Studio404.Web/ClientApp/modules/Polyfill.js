import $ from 'jQuery'

Array.prototype.sortNumbers = function () {
    return this.sort((a, b) => a - b)
}

$.fn.goTo = function () {
    $('html, body').animate({
        scrollTop: $(this).offset().top + 'px'
    }, 'fast')
    return this
}
