import React, { Component } from 'react';
import { RenderModes } from '../../model/types';
// import { inputStyle } from '../feStyles';

// import showdown from 'showdown';

// const converter = new showdown.Converter({ simpleLineBreaks: true });
// const text = '# hello, markdown!';

// const fancyRadioStyle = {
//   position: 'absolute',
//   // right: 16,
//   bottom: '12.5',
//   height: '30px',
//   width: '98%',
// };
class SI_Fragment extends Component {
  render() {
    return this.props.model.renderMode === RenderModes.selection ? (
      <select
        style={{
          // ...inputStyle(this.props.model),
          height: '18px',
        }}
        className="form-control"
        type={this.props.model.type}
      >
        {this.props.model.options.map((option, key) => (
          <option key={`${option.value}.${key}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <div
        className="fancy-radio-wrapper"
        //  style={fancyRadioStyle}
      >
        <div className="fancy-radio-inner">
          {this.props.model.options.map((option, key) => [
            <input
              key={`${option.value}.${key}.input`}
              type="radio"
              id={option.value}
              name={option.value}
              value={option.value}
            />,
            <label className="label" key={`${option.value}.${key}.label`}>
              {option.label}
            </label>,
          ])}
        </div>
      </div>
    );
  }
}

export default SI_Fragment;
