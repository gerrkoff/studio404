import { connect } from 'react-redux'
import ResetPassword from '../components/resetPassword/ResetPassword'
import { updateStep1Info, updateStep2Info, sendResetPassToken, resetPass, stepBack } from '../actions/ResetPasswordActions'

const mapStateToProps = (state) => {
    return {
        ...state.resetPassword
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStep1Info: (fieldName, fieldValue) => dispatch(updateStep1Info(fieldName, fieldValue)),
        updateStep2Info: (fieldName, fieldValue) => dispatch(updateStep2Info(fieldName, fieldValue)),
        sendResetPassToken: (userId) => dispatch(sendResetPassToken(userId)),
        resetPass: (info) => dispatch(resetPass(info)),
        stepBack: () => dispatch(stepBack())
    }
}

const ResetPasswordContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword)

export default ResetPasswordContainer
