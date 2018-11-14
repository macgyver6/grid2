import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  resizeStart,
  resizeEnd,
  entityResized,
} from '../../redux-modules/actions';
import { utility } from '../../lib/utility';

const resizeStyle = {
  // width: '30px',
  height: '100%',
  // padding: `4px`,
  // backgroundColor: 'purple',
  position: 'absolute',
  right: 0,
  bottom: 0,
  zIndex: 99,
  // cursor: 'w-resize',
  // borderRadius: '2px',
};

class Resizer extends Component {
  constructor(props) {
    super(props);
    this.mousemovehandler = this.mousemovehandler.bind(this);
    this.mouseuphandler = this.mouseuphandler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.state = {
      initialMousePosition: '',
      appendInitialWidth: '',
      resizeTargetInitWidth: '',
    };
  }
  mousemovehandler(event) {
    const offset = 0.4; // offset so mouse movement qualifies to advance to next column at natural feeling time
    const currentMousePosition = event.clientX;
    const timestamp = Date.now();

    if (timestamp - this.state.timeInitResize > 80 || false) {
      const numGridsMoved = utility.round(
        (currentMousePosition - this.state.initialMousePosition) /
          this.props.gridWidth +
          offset,
        0
      );

      /**
       * check to see if numGridsMoved justifies dispatching an action
       */
      if (
        this.state.resizeTargetInitWidth + numGridsMoved !==
        this.props.model[this.props.resizeType]
      ) {
        this.setState({
          timeInitResize: Date.now(),
        });

        const newProps = {
          [this.props.resizeType]:
            this.state.resizeTargetInitWidth + numGridsMoved,
          append: this.state.appendInitialWidth - numGridsMoved,
        };
        this.props.entityResized(this.props.model.uuid, newProps);
      }
    }
  }

  mouseuphandler(event) {
    // this.props.saveProperty({
    //   isResizing: false,
    //   resizingType: '',
    // });
    this.props.resizeEnd();
    document.removeEventListener('mousemove', this.mousemovehandler);
    document.removeEventListener('mouseup', this.mouseuphandler);
  }
  mouseDownHandler(event) {
    this.props.resizeStart({
      resizeTarget: {
        type: [this.props.resizeType],
        initWidth: this.props.model[this.props.resizeType],
        append: this.props.model.append,
      },
    });

    this.setState({
      initialMousePosition: event.clientX,
      timeInitResize: Date.now(),
      appendInitialWidth: this.props.model.append,
      resizeTargetInitWidth: this.props.model[this.props.resizeType],
    });
    document.addEventListener('mousemove', this.mousemovehandler);
    document.addEventListener('mouseup', this.mouseuphandler);
  }

  render() {
    return (
      <div
        id={`${this.props.clickGrid}`}
        className="resizer"
        style={{ ...resizeStyle, ...this.props.style }}
        onMouseDown={this.mouseDownHandler}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  gridWidth: state.app.gridWidth,
});

Resizer = connect(
  mapStateToProps,
  { resizeStart, resizeEnd, entityResized }
)(Resizer);

export default Resizer;
