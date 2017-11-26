import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    amberA200, amberA400
} from 'material-ui/styles/colors';

export const muiTheme = getMuiTheme({
    
    palette: {
        primary1Color: amberA200,
        primary2Color: amberA400/*,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: cyan500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,*/
    }
});