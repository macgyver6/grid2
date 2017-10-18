import React from 'react';
import { utility } from '../../utility';

let handleDelete = function (event, props) {
  let address = utility.findNode(props.model, props.form)
  props.removeformentity(address)
}



class TextAreaComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resize: {
        init: null,
        changed: null
      }
    }
    this.handleChange = this.handleChange.bind(this);
    this.dragend_handler = this.dragend_handler.bind(this);
    this.dragstart_handle = this.dragstart_handle.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
  }

  handleChange(event, props) {
    let address = utility.findNode(props.model, props.form)
    props.removeformentity(address)
    props.addformentity(
      props.model.mutate({ width: props.model.width() - 1 }), address)
  }

  dragend_handler(event) {
    this.event.preventDefault();
  }

  dragstart_handle(event) {
    this.event.stopPropagation();
    this.event.dataTransfer.setData("text/plain", JSON.stringify(this.props.model.properties()));
  }

  mouseDownHandler(event) {
    if (event.target.className === 'resizer') {
      event.preventDefault();
      event.stopPropagation();
      const resize = this.state.resize;
      resize.init = event.screenX;
      this.setState({ resize })
      window.addEventListener('mouseup', this.mouseUpHandler);
    }
  }

  mouseUpHandler(event) {
    const resize = this.state.resize;
    resize.changed = event.screenX;
    let initX = this.state.resize.init
    let initGrid = this.props.model.width()
    let resizeX = event.screenX
    let address = utility.findNode(this.props.model, this.props.form)
    let initDiff = resizeX - initX
    console.log(initDiff)
    let diffGrid = parseInt(((Math.abs(initDiff)) / 24), 10)
    console.log(diffGrid)
    if ((Math.abs(initDiff)) > 20) {
      this.setState({ resize })
      var calcOpp = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b
      }
      if (initDiff > 0) {
        calc.call(this, calcOpp['+'](initGrid, diffGrid))
      } else {
        calc.call(this, calcOpp['-'](initGrid, diffGrid))
      }
    }

    function calc(newWidth) {
      this.props.removeformentity(address)
      this.props.addformentity(
        this.props.model.mutate({ width: (newWidth) }), address
      )
    }
  }

  componentDidMount() {
    window.addEventListener('mousedown', this.mouseDownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this.mouseDownHandler);
    window.removeEventListener('mouseup', this.mouseUpHandler);
  }

  render() {
    const taStyle = {
      border: '6px dashed #c04df9',
      backgroundColor: '#2bd1fc',
      margin: '20px',
      padding: '20px',
      gridColumn: `span ${this.props.model.width()}`,
      position: 'relative'
    }
    const resizeStyle = {
      width: '20px',
      height: '20px',
      backgroundColor: 'yellow',
      position: 'absolute',
      right: 0,
      bottom: 0,
      cursor: 'w-resize'
    }

    let Resizer = () =>
      <div
        className="resizer"
        style={resizeStyle}
        ref={elem => this.resizer = elem}
      >
      </div>

    return (
      <div style={taStyle}
        ref={elem => this.TA = elem}
        draggable="true"
        onDragEnd={this.dragend_handler}
        onDragStart={this.dragstart_handler}
        onClick={(e) => this.handleChange(e, this.props)}
      >
        <p>{this.props.model.width()}</p>
        <textarea className="form-control" placeholder="Write something in text area" name={this.props.model.name()} rows={this.props.model.numRows()} cols={this.props.model.numColumns()} type={this.props.model.type()}>
        </textarea>
        <Resizer />
      </div>
    )
  }
}

export default TextAreaComponent;