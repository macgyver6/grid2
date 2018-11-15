import React, { Component } from 'react';
import { entitySubWrapperStyle } from './styles/formEntityStyles';
import { _styles } from './styles/_styles';

class DraggableCore extends Component {
  constructor() {
    super();
    this.dragOverHandler = this.dragOverHandler.bind(this);
  }

  dragOverHandler(event) {
    event.preventDefault();
  }

  mouseDownHandler = event => {
    const {
      model: { uuid },
    } = this.props;
    event.stopPropagation();
    this.props.entitySelected(uuid);
  };

  render(props) {
    return (
      <div
        id={`${this.props.model.uuid}.${this.props.model.type}`}
        style={{
          ...entitySubWrapperStyle(this.props.model),
          ...(this.props.active
            ? {
                boxShadow: `0 0 2px 3px ${
                  _styles[`${this.props.model.type}`].render.backgroundColor
                }`,
              }
            : {}),
        }}
        onMouseDown={this.mouseDownHandler}
        onDragStart={
          this.props.dragStartHandler // to set intitial
        }
        onDragOver={this.dragOverHandler}
        onDrop={this.props.dropHandler}
        draggable={!this.props.isResizing}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DraggableCore;
