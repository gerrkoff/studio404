import { connect } from 'react-redux'
import LoginPopup from '../components/login/LoginPopup'
import { login, openLoginPopup, closeLoginPopup, register, toggleRegistration, updateLoginInfo, updateRegisterInfo } from '../actions/LoginPopupActions'

const mapStateToProps = (state) => {
    return {
        ...state.loginPopup
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register: (registerInfo) => dispatch(register(registerInfo)),
        login: (loginInfo) => dispatch(login(loginInfo)),
        openPopup: () => dispatch(openLoginPopup()),
        closePopup: () => dispatch(closeLoginPopup()),
        toggleRegistration: (registration) => dispatch(toggleRegistration(registration)),
        updateLoginInfo: (fieldName, fieldValue) => dispatch(updateLoginInfo(fieldName, fieldValue)),
        updateRegisterInfo: (fieldName, fieldValue) => dispatch(updateRegisterInfo(fieldName, fieldValue))
    }
}

const LoginPopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPopup)

export default LoginPopupContainer
