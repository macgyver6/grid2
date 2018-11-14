import React, { Component } from 'react';
import { inputStyle } from '../feStyles';
import showdown from 'showdown';

const converter = new showdown.Converter({ simpleLineBreaks: true });
const text = '# hello, markdown!';

const fancyRadioStyle = {
    position: 'absolute',
    // right: 16,
    bottom: '12.5',
    height: '30px',
    width: '98%',
};
class SI_Fragment extends Component {
    render() {
        return this.props.model.renderMode === 'selection' ? (
            <select
                style={{ ...inputStyle(this.props.model), height: '18px' }}
                className="form-control"
                type={this.props.model.type}
            >
                {this.props.model.options.map(option => (
                    <option value={option.value}>{option.label}</option>
                ))}
            </select>
        ) : (
            <div className="fancy-radio-wrapper" style={fancyRadioStyle}>
                <div className="fancy-radio-inner">
                    {this.props.model.options.map(option => [
                        <input
                            type="radio"
                            id={option.value}
                            name={option.value}
                            value={option.value}
                        />,
                        <label className="label" for="gl1">
                            {option.label}
                        </label>,
                    ])}
                </div>
            </div>
        );
    }
}

export default SI_Fragment;
