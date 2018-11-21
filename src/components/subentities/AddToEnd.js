import React, { Component } from 'react';

export const AddToEndRenderModes = {
  entity: 0,
  beginningFormSection: 1,
  endFormSection: 2,
};
class AddToEnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOver: 0,
    };
  }

  dragEnterHandler = event => {
    this.setState({ isOver: this.state.isOver + 1 });
  };

  dragLeaveHandler = event => {
    this.setState({ isOver: this.state.isOver - 1 });
    if (this.state.isOver === 0) {
      this.setState({ canDrop: false });
    }
  };

  render(props) {
    const wrapperStyle = {
      width: '0px',
      // width: this.props.gridWidth * this.props.parentWidth - 14,
      height: '10px',
      position: 'absolute',
      right: '0',
      bottom: '-10px',
      zIndex: '40',
      background: this.state.isOver === 1 ? 'green' : null,
    };

    return (
      <div
        // id={props.model.UUID()}
        className="outer"
        style={wrapperStyle}
        // onDrop={drop_handler}
        onClick={this.clickHandler}
        onDragEnter={this.dragEnterHandler}
        onDragLeave={this.dragLeaveHandler}
      />
    );
  }
}

export default AddToEnd;
