import React, { Component } from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class LoaderContent extends Component {
    render() {
        return (
            <RefreshIndicator
                size={40}
                left={10}
                top={0}
                status="loading"
                style={{
                    display: 'inline-block',
                    position: 'relative',
                }}
            />
        );
    }
}

export default LoaderContent;