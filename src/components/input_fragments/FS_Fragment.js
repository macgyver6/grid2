import React, { Component } from 'react';
const fsStyle = {
  display: 'grid',
  position: 'relative',
  borderRadius: '6px',
  gridTemplateColumns: `repeat(24, [col] 1fr)`,
  backgroundColor: '#fff45f',
  overflow: 'auto',
  maxHeight: '70vh', // 'rgba(255,244,95, 0.9)', //#fff45f
  minWidth: '100px',
  paddingBottom: '40px',
  gridColumn: `span 24`, // gridGap: '8px',
  // zIndex: '30',
  cursor: 'move',
};
class FS_Fragment extends Component {
  render(props) {
    // border: '1px solid #222629'
    return (
      <div
        style={fsStyle}
        // className="form-control"
        type={this.props.model.type}
        // size="8"
        value={this.props.model.id}
        readOnly={true}
      >
        {this.props.children}
      </div>
    );
  }
}

export default FS_Fragment;
