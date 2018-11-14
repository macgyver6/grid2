import React, { Component } from 'react';
import { entityWrapperStyle } from './styles/formEntityStyles';

class Wrapper extends Component {
  render(props) {
    return (
      <div
        id={`${this.props.id}.${this.props.model.type}.wrapper`}
        style={{
          ...entityWrapperStyle(this.props.model),
          margin: this.props.model.type !== 'FormSection' && this.props.model.type !== 'Padding' ? '20px 4px 0px 4px' : '20px 0px 0px 0px',
          //   ...(this.props.currententity === `${this.props.id}` &&
          //   this.props.isDragging
          //     ? {
          //         backgroundColor: 'orange',
          //         border: '1px solid blue',
          //       }
          //     : {}),
        }}
        onDragOver={this.dragOverHandler}
        onDrop={this.dropHandler}
        onMouseUp={this.mouseUp_Section}
        onDragStart={!this.props.isResizing ? this.dragstart_handler : null}
        draggable="false"
      >
        {this.props.children}
      </div>
    );
  }
}

export default Wrapper;
