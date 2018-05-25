import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {fade} from 'material-ui/utils/colorManipulator'
import {
    // yellow600,
    // yellow800,
    // blue500,
    // grey500,
    // grey400,
    grey300,
    // grey100,
    white,
    darkBlack,
    fullBlack
} from 'material-ui/styles/colors'

// const colorMain1 = '#FEDAB8'
// const colorMain2 = '#B18F6F'
// const colorMain3 = ''
// const colorSec1 = '#5D9FB1'
// const colorSec2 = '#B8EFFE'

export const muiTheme = getMuiTheme({

    palette: {
        primary1Color: '#76cdd8',
        primary2Color: '#a9ffff',
        primary3Color: '#429ca7',
        accent1Color: '#d35c47',
        accent2Color: '#ff8c73',
        accent3Color: '#9c2c1e',
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: '#76cdd8',
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack
    }
})
