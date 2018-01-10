import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {fade} from 'material-ui/utils/colorManipulator'
import {
    // yellow600,
    // yellow800,
    // blue500,
    grey500,
    grey400,
    grey300,
    // grey100,
    white,
    darkBlack,
    fullBlack
} from 'material-ui/styles/colors'

const colorMain1 = '#FEDAB8'
const colorMain2 = '#B18F6F'
// const colorMain3 = ''
const colorSec1 = '#5D9FB1'
const colorSec2 = '#B8EFFE'

export const muiTheme = getMuiTheme({

    palette: {
        primary1Color: colorMain1,
        primary2Color: colorMain2,
        primary3Color: grey400,
        accent1Color: colorSec1,
        accent2Color: colorSec2,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: colorMain1,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack
    }
})
