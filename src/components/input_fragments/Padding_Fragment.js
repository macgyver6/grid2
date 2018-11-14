import React, { Component } from 'react';

class Padding_Fragment extends Component {
  render() {
    return (
      <div
        style={{
          gridColumn: `span ${this.props.model.width}`,
          // border: '1px solid lightgreen',
          // backgroundColor: 'rgba(255,255,255, 0.3)',
          minHeight: '22px',
        }}
      />
    );
  }
}

export default Padding_Fragment;
