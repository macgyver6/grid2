import React, { Component } from 'react';
import { inputStyle } from '../feStyles';

class AI_Fragment extends Component {
    render() {
        return (
            <input
                type={this.props.model.type}
                style={inputStyle(this.props.model)}
                disabled
            />
        );
    }
}

export default AI_Fragment;
