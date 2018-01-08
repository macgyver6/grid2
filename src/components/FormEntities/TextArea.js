import React from 'react';
import { utility } from '../../utility';
import { aux } from '../../constants/aux';
import Resizer from './subentities/Resizer';
import Mover from './subentities/Mover';
import Append from './subentities/Append';
import MovePrior from './subentities/MovePrior';
import { styles } from './feStyles';
import Prepend from './subentities/Prepend.js';

const TextAreaComponent = (props) => {
  let source = null
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

  let dragstart_handler = function (event) {
    aux.dragStart_handler(event, props.model, props.form)
  }

  let dragend_handler = function (event) {
    aux.dragEnd_handler(event, props, resize)
  }

  let drag_handler = function (event) {
    aux.drag_handler(event, props.model, props.form, resize, props)
  }

  // let drop_handler = function (event) {
  //   event.stopPropagation();
  //   let data = event.dataTransfer.getData("address");
  //   aux.drop_handler(event, props.model, props.form, props.addformentity, props.removeformentity)
  // }

  const taStyle = {
    backgroundColor: 'lightgrey',
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
      style={styles.defaultEntity}
      onDragEnd={dragend_handler}
    >
      {(props.model.prepend() > 0) ?
        <Prepend
          prepend={props.model.prepend()}
          uuid={props.model.UUID()}
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
          /> :
        null
      }
      <div
        style={taStyle}
        data-action={`mover.${props.model.UUID()}.TextArea`}
        id={props.model.UUID()}
        onDragStart={dragstart_handler}
        onDragEnd={dragend_handler}
        onDrag={drag_handler}
        draggable="true"      >
        <textarea className="form-control" placeholder="Write something in text area" name={props.model.name()} rows={props.model.numRows()} cols={props.model.numColumns()} type={props.model.type()}>
        </textarea>
        <MovePrior
          element='FormEntity'
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
        />
        {/* <Mover
          element='FormEntity'
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
        /> */}
        <Resizer
          element='FormEntity'
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
          mutateformentity={props.mutateformentity}
        />
      </div>
      {(props.model.append() > 0) ?
        <Append
          append={props.model.append()}
          uuid={props.model.UUID()}
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
        /> :
        null
      }
    </div>
  )
}

export default TextAreaComponent;