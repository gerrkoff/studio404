import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'

class UserTitle extends Component {
    render () {
        return (
            <AppBar
                title={this.props.title}
                showMenuIconButton={false}
                titleStyle={{
                    height: '50px',
                    fontSize: '18px',
                    lineHeight: '50px'
                }}/>
        )
    }
}

export default UserTitle
