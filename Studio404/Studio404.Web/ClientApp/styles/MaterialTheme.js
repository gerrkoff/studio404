import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {fade} from 'material-ui/utils/colorManipulator'
import {
    yellow600,
    yellow800,
    grey400,
    blue500,
    grey100,
    grey500,
    white,
    grey300,
    darkBlack,
    fullBlack
} from 'material-ui/styles/colors'

export const muiTheme = getMuiTheme({

    palette: {
        primary1Color: yellow600,
        primary2Color: yellow800,
        primary3Color: grey400,
        accent1Color: blue500,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: yellow600,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack
    }
})
