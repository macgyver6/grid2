import React from 'react';
import Resizer from './subentities/Resizer';
import Mover from './subentities/Mover';
import Append from './subentities/Append';
import { styles } from './feStyles';
import Prepend from './subentities/Prepend.js';

const TextAreaComponent = (props) => {

  let dragend_handler = function (event) {
    event.preventDefault();
  }

  let dragstart_handler = function (event) {
    event.stopPropagation();
     event.dataTransfer.setData("text/plain", JSON.stringify({
      action: 'move',
      model: props.model.properties()
    }));
  }

  const taStyle = {
    backgroundColor: '#2bd1fc',
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
      draggable="true"
      onDragEnd={dragend_handler}
      onDragStart={dragstart_handler}
    >
      {(props.model.prepend() > 0) ?
        <Prepend
          prepend={props.model.prepend()} /> :
        null
      }
      <div
        style={taStyle}
        data-action={`mover.${props.model.UUID()}.TextArea`}
        id={props.model.UUID()}
      >

        <textarea className="form-control" placeholder="Write something in text area" name={props.model.name()} rows={props.model.numRows()} cols={props.model.numColumns()} type={props.model.type()}>
        </textarea>
        <Mover
          element='FormEntity'
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
        />
        <Resizer
          element='FormEntity'
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
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