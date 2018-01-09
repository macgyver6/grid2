import React from 'react';
import { utility } from '../../utility';
import { aux } from '../../constants/aux';
import Resizer from './subentities/Resizer.js';
import Mover from './subentities/Mover.js';
import { styles } from './feStyles';
import Append from './subentities/Append.js';
import Prepend from './subentities/Prepend.js';
import MovePrior from './subentities/MovePrior.js';

const TextInputComponent = (props) => {
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

  let dragOver_handler = function (event) {
    event.preventDefault();
  }

  let drop_handler = function (event) {
    aux.dropMove_handler(event, props, resize)
  }

  let drag_handler = function (event) {
    aux.drag_handler(event, props.model, props.form, resize, props)
  }

  const tiStyle = {
    backgroundColor: 'lightgrey',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    height: '100px',
    cursor: 'move'
  }

  // return actual style values
  // 1. # of grid columns the TextArea and Append will fill
  styles.defaultEntity['gridColumn'] = 'span ' + (props.model.prepend() + props.model.width() + props.model.append())
  // 2. # of grid columns within the TextArea
  styles.defaultEntity['gridTemplateColumns'] = 'repeat(' + (props.model.prepend() + props.model.width() + props.model.append()) + ', [col] 1fr)'

  return (
    <div
      style={styles.defaultEntity}
      onDragOver={dragOver_handler}
      onDrop={drop_handler}
    >
      {(props.model.prepend() > 0) ?
        <Prepend
          prepend={props.model.prepend()}
          uuid={props.model.UUID()}
          className='prepend'
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity} /> :
        null
      }
      <div style={tiStyle}
        id={props.model.UUID()}
        className='TextInput'
        onDragStart={dragstart_handler}
        onDrag={drag_handler}
        draggable="true"
      >
        <input className="form-control" type={props.model.type()}
          value={props.model.defaultContent()}
        />
        <Resizer
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
  );
}

export default TextInputComponent;