import React, { Component } from 'react';
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';

class FormSectionComponent extends Component {
  constructor(props) {
    super()
    this.drop_handler = this.drop_handler.bind(this);
    this.dragleave_handler = this.dragleave_handler.bind(this);
    this.dragover_handler = this.dragover_handler.bind(this);
    this.dragend_handler = this.dragend_handler.bind(this);
    this.dragstart_handler = this.dragstart_handler.bind(this);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);

    this.state = {
      resize: {
        init: null,
        changed: null
      }
    }
  }

  mouseDownHandler(event) {
    if (event.target.className === 'resizer') {
      event.preventDefault();
      event.stopPropagation();
      const resize = this.state.resize;
      resize.init = event.screenX;
      this.setState({ resize })
      // window.addEventListener('mouseup', this.mouseUpHandler);
    }
  }

  mouseUpHandler(event) {
    const resize = this.state.resize;
    resize.changed = event.screenX;
    let initX = this.state.resize.init
    let initGrid = this.props.model.children()[0].width()
    let resizeX = event.screenX
    let address = utility.findNode(this.props.model.children()[0], this.props.form)
    let initDiff = resizeX - initX
    let fsWidth = parseInt((document.getElementById(this.props.model.UUID()).clientWidth / 24), 10)
    let diffGrid = (parseInt(((Math.abs(initDiff)) / fsWidth), 10))
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
      let entityToChange = this.props.model.children()[0]
      this.props.removeformentity(address)
      this.props.addformentity(
        entityToChange.mutate({ width: (newWidth) }), address
      )
    }
  }

  handleDelete = function (event, props) {
    let result = utility.findNode(props.model, props.form)
    props.removeformentity(result)
  }

  dragend_handler = function (event) {
    event.preventDefault();
  }

  dragstart_handler = function (event) {
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", JSON.stringify(this.props.model.properties()));
  }

  drop_handler(event) {
    event.preventDefault();
    event.stopPropagation();
    let data = event.dataTransfer.getData("text");
    let entityToAdd = utility.resurrectEntity(defaultPropsFE[data])
    let location = utility.findNode(this.props.model, this.props.form)
    // @hack - only adds to position 0 at this point
    location.push(0)
    this.props.addformentity(entityToAdd, location)
  }

  dragover_handler(event) {
    event.preventDefault();
  }

  dragleave_handler(event) {
    event.preventDefault();
  }

  dragend_handler(event) {
    event.preventDefault();
  }

  render() {
    const divStyle = {
      border: '6px dashed #c04df9',
      backgroundColor: '#f3ea5f',
      margin: '20px',
      minHeight: '100px',
      gridTemplateColumns: 'repeat(24, 1fr)'
    }
    return (
        <div className="grid form-group"
        style={divStyle}
        onDrop={this.drop_handler}
        draggable="true"
        onDragEnd={this.dragend_handler}
        onDragStart={this.dragstart_handler}
        onMouseDown={(e) => this.mouseDownHandler(e, this.props)}
        onMouseUp={(e) => this.mouseUpHandler(e, this.props)}
        id={this.props.model.UUID()}
        >
        {this.props.model.children().map((element, i) => {
          return React.createElement(utility.lookupComponent(element), { key: i, model: element, form: this.props.form, removeformentity: this.props.removeformentity, addformentity: this.props.addformentity })
        })}
      </div>
    );
  }
}

export default FormSectionComponent;