import React from 'react';
import { helpers } from '../../helpers';
import Resizer from './subentities/Resizer';
import { styles } from './feStyles';
import Append from './subentities/Append.js';
import Prepend from './subentities/Prepend.js';
import { utility } from '../../utility';

const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

const TextInputComponent = (props) => {
  const resize = {
    init: null,
    init_grids: null,
    init_append: null,
    init_prepend: null,
    changed: null,
    grids: null,
    reset: null,
    address: null
  }

  const move = {
    mouseDownStartX: null,
    dX: null,
    mouseDownStopX: null,
    offsetInit: null,
    init_prepend: null,
    init_append: null,
    address: null
  }

  const mouseDownToMove_handler = (event, model, form, action) => {
    console.log(event, model, form, action)
    move.mouseDownStartX = event.clientX;

    const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`)
    element.addEventListener('mousemove', mouseMove_handler)
    element.addEventListener('dragend', mouseUp_handler)

    move.init_prepend = props.model.prepend()
    move.init_append = props.model.append()
    move.address = utility.findNode(props.model, props.form)

    move.offsetInit = utility.findNode(props.model, props.form).length > 1 ?
      round((event.clientX - document.getElementById(`${props.model.UUID()}.${props.model.type()}`).getBoundingClientRect().left), 3) :
      null

    // if (action === "move") {
    //   event.dataTransfer.setData("address", JSON.stringify({
    //     action: action,
    //     address: utility.findNode(model, form),
    // define initial click position to offset grids if not a topLevelFormSection, or if adding a new entity
    //   dragInit: action === 'move' && utility.findNode(model, form).length > 1 ? round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3) : null
    // }));
    // }
  }

  let mouseMove_handler = (event) => {
    const canMove = () => true;
    console.log('mouseMove')
    move.dX = canMove() ? event.clientX - move.mouseDownStartX : null;
    // if (action === "move") {
    //   event.dataTransfer.setData("address", JSON.stringify({
    //     action: action,
    //     address: utility.findNode(model, form),
    //     // define initial click position to offset grids if not a topLevelFormSection, or if adding a new entity
    //     dragInit: action === 'move' && utility.findNode(model, form).length > 1 ? round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3) : null
    //   }));
    // }

  }

  let mouseUp_handler = (event) => {
    // console.log(event, model, form, action)
    move.mouseDownStopX = event.clientX;
    console.log('mouseUp: ', move)

    let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8

    const grid = () => {
      console.log(event.clientX, move.mouseDownStartX)
      var calc = event.clientX - move.mouseDownStartX;
      if (calc > 0) {
        return round(((calc / bgrndGrdWidth)), 0)
      } else {
        return round(((calc / bgrndGrdWidth)), 0)
      }
    }
    console.log(move, bgrndGrdWidth)
    console.log(grid())

    console.log({
      prepend: move.init_prepend + grid(),
      append: move.init_append - grid()
    })
    props.mutateformentity(move.address, {
      prepend: move.init_prepend + grid(),
      append: move.init_append - grid()
    })

    const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`)
    element.removeEventListener('mousemove', mouseMove_handler)
    element.removeEventListener('dragend', mouseUp_handler)

    // const element = document.getElementById(`${model.UUID()}.${model.type()}.wrapper`)

    // element.removeEventListener('mousemove', helpers.mouseMove_handler)
    // element.removeEventListener('mouseup', helpers.mouseUp_handler)
    // if (action === "move") {
    //   event.dataTransfer.setData("address", JSON.stringify({
    //     action: action,
    //     address: utility.findNode(model, form),
    //     // define initial click position to offset grids if not a topLevelFormSection, or if adding a new entity
    //     dragInit: action === 'move' && utility.findNode(model, form).length > 1 ? round((event.clientX - document.getElementById(`${model.UUID()}.${model.type()}`).getBoundingClientRect().left), 3) : null
    //   }));
    // }
  }

  // let mousedown_handler = function (event) {
  //   helpers.mouseDownToMove_handler(event, props.model, props.form, 'move')
  // }

  let dragstart_handler = (event) => {
    event.stopPropagation();
    // event.preventDefault();
  }

  let dragOver_handler = function (event) {
    event.preventDefault();
  }

  let drop_handler = function (event) {
    helpers.dropMove_handler(event, props, resize)
  }

  let drag_handler = function (event) {
    helpers.drag_handler(event, props.model, props.form, resize, props)
  }

  const marginCalc = () => {
    const _margin = [0, 0, 0, 0]
    props.model.append() > 0 ? _margin[1] = 4 : 0
    props.model.prepend() > 0 ? _margin[3] = 4 : 0
    return (((_margin.map((el) => `${el}px`)).toString().replace(/,/g, ' ')))
  }

  const tiStyle = {
    margin: marginCalc(),
    backgroundColor: '#6C788F',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    height: '100px',
    cursor: 'move'
  }

  const clickParent_handler = (event) => {
    console.log('parent clicked')
  }

  const clickChild_handler = (event) => {
    console.log('child clicked')
  }

  // return actual style values
  // 1. # of grid columns the TextArea and Append will fill
  styles.defaultEntity['gridColumn'] = 'span ' + (props.model.prepend() + props.model.width() + props.model.append())
  // 2. # of grid columns within the TextArea
  styles.defaultEntity['gridTemplateColumns'] = 'repeat(' + (props.model.prepend() + props.model.width() + props.model.append()) + ', [col] 1fr)'

  console.log(props.model)

  return (
    <div
      id={`${props.model.UUID()}.${props.model.type()}.wrapper`}
      style={styles.defaultEntity}
      onClick={clickParent_handler}
      // onMouseMove={mouseMove_handler}
      // onMouseUp={mouseUpToMove_handler}

      // onDragOver={dragOver_handler}
      // onDrop={drop_handler}
      >
      {(props.model.prepend() > 0) ?
        <Prepend
        id={`${props.model.UUID()}.prepend`}
        prepend={props.model.prepend()}
        uuid={props.model.UUID()}
        className='prepend'
        model={props.model}
        form={props.form}
        removeformentity={props.removeformentity}
        addformentity={props.addformentity}
        mutateformentity={props.mutateformentity}
        /> :
        null
      }
      <div style={tiStyle}
        id={`${props.model.UUID()}.${props.model.type()}`}
        className='TextInput'
        onClick={clickChild_handler}
        // onMouseDown={mouseDownToMove_handler}
        // onMouseMove={helpers.mouseMove_handler}
        // onDrag={drag_handler}
        onMouseDown={mouseDownToMove_handler}
        onDragStart={dragstart_handler}
        draggable="true"
      >
        <input className="form-control" type={props.model.type()}
          defaultValue={props.model.defaultContent()}
        />
        <Resizer
          id={`${props.model.UUID()}.resizer`}
          element='FormEntity'
          uuid={props.model.UUID()}
          className='resizer'
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
          mutateformentity={props.mutateformentity}
        />
      </div>
      {(props.model.append() > 0) ?
        <Append
          id={`${props.model.UUID()}.append`}
          append={props.model.append()}
          className='append'
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
          mutateformentity={props.mutateformentity}
        /> :
        null
      }
    </div>
  );
}

export default TextInputComponent;