import { connect } from 'react-redux'
import ResetPassword from '../components/resetPassword/ResetPassword'
import { } from '../actions/ResetPasswordActions'

const mapStateToProps = (state) => {
    return {
        ...state.resetPassword
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const ResetPasswordContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword)

export default ResetPasswordContainer
