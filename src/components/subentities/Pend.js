import React, { Component } from 'react';
import Resizer from '../subentities/Resizer';
import { helpers } from '../../lib/helpers';
// import { get } from '../../../redux-modules/form/actions';
import { connect } from 'react-redux';

class Pend extends Component {
  constructor(props) {
    super();
    this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
    this.dragEnterHandler = this.dragEnterHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
    this.state = {
      isOver: 0,
      canDrop: false,
    };
  }
  dragEnterHandler(event) {
    this.setState({ isOver: this.state.isOver + 1 });

    if (this.props.width >= this.props.subWrapperWidth) {
      this.setState({ canDrop: true });
    } else {
      this.setState({ canDrop: false });
    }
  }

  dragLeaveHandler(event) {
    this.setState({ isOver: this.state.isOver - 1 });
    if (this.state.isOver === 0) {
      this.setState({ canDrop: false });
    }
  }

  dropHandler(event) {
    this.setState({
      isOver: 0,
      canDrop: false,
    });
  }

  render() {
    const backgroundColor = () => {
      if (
        this.state.isOver &&
        this.state.canDrop &&
        !`${this.props.id}.${this.props.mode}`.includes(
          this.props.currententity
        )
      ) {
        return '#4CAF50';
      } else if (
        this.state.isOver &&
        !this.state.canDrop &&
        !`${this.props.id}.${this.props.mode}`.includes(
          this.props.currententity
        )
      ) {
        return 'red';
      } else {
        return 'rgba(0, 0, 0, 0)';
      }
    };
    const pendStyle = {
      display: 'grid',
      gridColumn: `span ${this.props.width}`,
      backgroundColor: backgroundColor(),
      gridTemplateColumns: `repeat(${this.props[this.props.mode]}, [col] 1fr)`,
      border:
        this.props.isDragging &&
        this.props.width >= this.props.subWrapperWidth &&
        !`${this.props.id}.${this.props.mode}`.includes(
          this.props.currententity
        )
          ? '1px dashed #4CAF50'
          : null,
      // border: `1px dashed ${this.props.mode === 'prepend' ? 'blue' : 'green'}`,
    };
    return (
      <div
        style={pendStyle}
        id={`${this.props.id}.${this.props.mode}`}
        onDragEnter={this.dragEnterHandler}
        onDragLeave={this.dragLeaveHandler}
        onDrop={this.dropHandler}
      >
        <Resizer
          // id={`${this.props.model.uuid}.resizer`}
          element="FormEntity"
          // uuid={this.props.model.uuid}
          className="resizer"
          model={this.props.model}
          clickGrid={helpers.calcStart(this.props, 'append')}
          resizeType="width"
          style={{
            width: '5px',
            padding: '0px',
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //   currententity: state.app.currententity,
  //   subWrapperWidth: state.dnd.subWrapperWidth,
  //   isDragging: state.dnd.isDragging,
});

Pend = connect(mapStateToProps)(Pend);

export default Pend;
