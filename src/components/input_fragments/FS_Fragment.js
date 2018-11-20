import React, { Component } from 'react';

class FS_Fragment extends Component {
  render(props) {
    console.log(this.props.sectionUUID);

    const fsStyle = {
      display: 'grid',
      position: 'relative',
      borderRadius: '6px',
      gridTemplateColumns: `repeat(${this.props.model.width}, [col] 1fr)`,
      backgroundColor: this.props.sectionUUID !== 0 ? '#fff45f' : null,
      overflow: this.props.sectionUUID !== 0 ? 'auto' : 'auto',
      maxHeight: this.props.sectionUUID !== 0 ? null : '70vh', // 'rgba(255,244,95, 0.9)', //#fff45f
      minWidth: '100px',
      paddingBottom: '40px',
      gridColumn: `span ${this.props.model.width}`, // gridGap: '8px',
      // zIndex: '30',
      cursor: 'move',
    };
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
