import React from 'react';
import { helpers } from '../../helpers';
import { movers } from '../../movers';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append';
import { styles } from './feStyles';
import Prepend from './subentities/Prepend.js';

const TextAreaComponent = (props) => {

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

  /** Handle adding/subtracing prepend or append */
  const mouseDown_handler = (event) => {
    movers.mouseDownToMove_handler(event, props, 'move');
  }

  /** Set dataTransfer in the case the entity is dropped on target:
   * 1. Moving to different form section
   * 2. Deleting a form section
   */
  let dragstart_handler = function (event) {
    helpers.dragStart_handler(event, props.model, props.form, 'move')
  }

  let dragOver_handler = (event) => {
    event.preventDefault()
  }

  let drop_handler = (event) => {
    movers.drop_handler(event, props)
  }

  const taStyle = {
    margin: helpers.marginCalc(props),
    backgroundColor: '#205EE2',
    opacity: '1',
    gridColumn: `span ${props.model.width()}`,
    position: 'relative',
    height: '100px'
  }

  // return actual style values
  // 1. # of grid columns the TextArea and Append will fill
  styles.defaultEntity['gridColumn'] = 'span ' + (props.model.prepend() + props.model.width() + props.model.append())
  // 2. # of grid columns within the TextArea
  styles.defaultEntity['gridTemplateColumns'] = 'repeat(' + (props.model.prepend() + props.model.width() + props.model.append()) + ', [col] 1fr)'

  return (
    <div
      id={`${props.model.UUID()}.${props.model.type()}.wrapper`}
      style={styles.defaultEntity}
      onDragOver={dragOver_handler}
      onDrop={drop_handler}
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
          addformentity={props.addformentity} mutateformentity={props.mutateformentity} /> :
        null
      }
      <div
        id={`${props.model.UUID()}.${props.model.type()}`}
        style={taStyle}
        className="TextArea"
        onMouseDown={mouseDown_handler}
        onDragStart={dragstart_handler}
        draggable="true"
      >
        <textarea className="form-control" placeholder="Write something in text area" name={props.model.name()} rows={props.model.numRows()} cols={props.model.numColumns()} type={props.model.type()}>
        </textarea>

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
          uuid={props.model.UUID()}
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
  )
}

export default TextAreaComponent;