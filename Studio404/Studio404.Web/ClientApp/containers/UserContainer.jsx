import { connect } from 'react-redux'
import User from '../components/user/User'

const mapStateToProps = (state) => {
    return {
        ...state.account
    }
}

const UserContainer = connect(
    mapStateToProps
)(User)

export default UserContainer
