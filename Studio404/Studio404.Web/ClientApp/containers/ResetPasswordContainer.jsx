import { connect } from 'react-redux'
import ResetPassword from '../components/resetPassword/ResetPassword'
import { updateResetPassInfo, sendResetPassToken, resetPass } from '../actions/ResetPasswordActions'

const mapStateToProps = (state) => {
    return {
        ...state.resetPassword
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateResetPassInfo: (fieldName, fieldValue) => dispatch(updateResetPassInfo(fieldName, fieldValue)),
        sendResetPassToken: (userId) => dispatch(sendResetPassToken(userId)),
        resetPass: (info) => dispatch(resetPass(info))
    }
}

const ResetPasswordContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword)

export default ResetPasswordContainer
