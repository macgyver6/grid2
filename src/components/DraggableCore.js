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


  mouseDownHandler = (event) => {
    console.log(this.props);

    const { model: {  uuid } } = this.props
    event.stopPropagation();
    this.props.entitySelected(
      uuid,
    );
  }

  render(props) {
    console.log(this.props.uuid, this.props.active)
    return (
      <div
        id={`${this.props.model.uuid}.${this.props.model.type}`}
        style={{
          ...entitySubWrapperStyle(this.props.model),
          ...(this.props.active
            ? {
                boxShadow: `3px 3px blue`,
              }
            : {}),
          // ...(this.props.active
          //   ? {
          //       boxShadow: `3px 3px ${
          //         _styles[`${this.props.model.type}`].render.backgroundColor
          //       } `,
          //     }
          //   : {}),
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
