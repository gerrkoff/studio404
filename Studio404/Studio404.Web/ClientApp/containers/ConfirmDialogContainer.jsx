import { connect } from 'react-redux'
import ConfirmDialog from '../components/common/ConfirmDialog'
import { hide } from '../actions/ConfirmDialogActions'

const mapStateToProps = (state) => {
    return {
        ...state.confirmDialog
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        hide: () => dispatch(hide())
    }
}

const ConfirmDialogContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmDialog)

export default ConfirmDialogContainer
