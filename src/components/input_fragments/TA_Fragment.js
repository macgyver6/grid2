import React, { Component } from 'react';
import { inputStyle } from '../feStyles';

class TA_Fragment extends Component {
  render() {
    return (
      <textarea
        style={{
          ...inputStyle(this.props.model),
          height: 'auto',
          resize: 'none',
          background: 'white',
        }}
        className="form-control"
        type={this.props.model.type}
        // cols={this.props.model.numColumns}
        rows={this.props.model.numRows}
        // value={this.props.model.defaultContent}
        disabled
      />
    );
  }
}

export default TA_Fragment;
