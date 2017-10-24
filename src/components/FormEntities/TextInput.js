import React from 'react';
import { utility } from '../../utility';
import Resizer from './subentities/Resizer.js';
import { styles } from './feStyles';
import Append from './subentities/Append.js';

const TextInputComponent = (props) => {

  let handleChange = (event, props) => {
    let result = utility.findNode(props.model, props.form)
    props.removeformentity(result)
    props.addformentity(
      props.model.mutate({ defaultContent: event.target.value }), result)
  }

  let dragend_handler = (event) => {
    event.preventDefault();
  }

  let dragstart_handler = (event) => {
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", JSON.stringify(props.model.properties()));
  }

  const tiStyle = {
    backgroundColor: '#ff3f3f',
    position: 'relative',
    maxHeight: '100px'
  }

  // return actual style values
  // 1. # of grid columns the TextArea and Append will fill
  styles.defaultEntity['gridColumn'] = 'span ' + (props.model.width() + props.model.append())
  // 2. # of grid columns within the TextArea
  styles.defaultEntity['gridTemplateColumns'] = 'repeat(' + (props.model.width() + props.model.append()) + ', [col] 1fr)'

  return (
    <div style={styles.defaultEntity}
      draggable="true"
      onDragEnd={dragend_handler}
      onDragStart={dragstart_handler}
    >
      <div style={tiStyle}
      >
        <input className="form-control" type={props.model.type()}
          value={props.model.defaultContent()}
          onChange={(e) => handleChange(e, props)} />
        <Resizer
          uuid={props.model.UUID()}
          element='width'
        />
      </div>
      <Append
        append={props.model.append()}
        uuid={props.model.UUID()}
      />
    </div>
  );
}

export default TextInputComponent;