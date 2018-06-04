import { connect } from 'react-redux'
import ChangePassPopup from '../components/changePass/ChangePassPopup'
import { openChangePassPopup, closeChangePassPopup, updateChangePassInfo, changePassword } from '../actions/ChangePassPopupActions'

const mapStateToProps = (state) => {
    return {
        ...state.changePassPopup
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        openChangePassPopup: () => dispatch(openChangePassPopup()),
        closeChangePassPopup: () => dispatch(closeChangePassPopup()),
        updateChangePassInfo: (fieldName, fieldValue) => dispatch(updateChangePassInfo(fieldName, fieldValue)),
        changePassword: (info) => dispatch(changePassword(info))
    }
}

const ChangePassPopupContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassPopup)

export default ChangePassPopupContainer
