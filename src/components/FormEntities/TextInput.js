import React from 'react';
import { helpers } from '../../helpers';
import { movers } from '../../movers';
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

  const mouseDownToMove_handler = (event) => {
    movers.mouseDownToMove_handler(event, props, 'move');
  }

  let dragLeave_handler = (event) => {
    event.stopPropagation();
   movers.dragLeave_handler(event)
  }

  let dragstart_handler = (event) => {
    event.stopPropagation();
    helpers.dragStart_handler(event, props.model, props.form, 'move')
  }

  // let dragOver_handler = function (event) {
  //   event.preventDefault();
  // }

  // let drop_handler = function (event) {
  //   helpers.dropMove_handler(event, props, resize)
  // }

  // let drag_handler = function (event) {
  //   helpers.drag_handler(event, props.model, props.form, resize, props)
  // }

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
      onDragLeave ={dragLeave_handler}
      // onClick={clickParent_handler}
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