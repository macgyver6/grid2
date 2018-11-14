import React, { Component } from 'react';
import { inputStyle } from '../feStyles';
import showdown from 'showdown';

const tBInputStyle = {
    height: '60%',
    width: '80%',
    position: 'absolute',
    right: 16,
    bottom: 7,
};

class IB_Fragment extends Component {
    render() {
        return this.props.model.title === '' ? (
            <p>️️🖼️ Please select an image from Image Block Property Panel</p>
        ) : (
            <img
                src={localStorage.getItem(this.props.model.title)}
                alt={localStorage.getItem(this.props.model.title)}
            />
        );
    }
}

export default IB_Fragment;
