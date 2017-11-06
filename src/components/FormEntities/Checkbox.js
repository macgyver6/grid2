import React from 'react';
import { utility } from '../../utility';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append';
import { styles } from './feStyles';
import Prepend from './subentities/Prepend.js';

const CheckboxComponent = (props) => {

  let handleChange = (event, props) => {
    console.log(event.target.value)
    let result = utility.findNode(props.model, props.form)
    props.removeformentity(result)
    props.addformentity(
      props.model.mutate({ defaultState: event.target.value }), result)
  }

  let dragend_handler = function (event) {
    event.preventDefault();
  }

  let dragstart_handler = function (event) {
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", JSON.stringify(props.model.properties()));
  }

  const cbStyle = {
    backgroundColor: '#ff48c4',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    maxHeight: '100px',
  }

  // return actual style values
  // 1. # of grid columns the CheckBox and Append will fill
  styles.defaultEntity['gridColumn'] = 'span ' + (props.model.prepend() + props.model.width() + props.model.append())
  // 2. # of grid columns within the CheckBox
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
      <div style={cbStyle}
      className={`mover.${props.model.UUID()}.CheckBox`}
      >
        <input type={props.model.type()} onChange={(e) => handleChange(e, props)} >
        </input>
        <Resizer
          uuid={props.model.UUID()}
          element='width'
        />
      </div>
      {(props.model.append() > 0) ?
      <Append
        append={props.model.append()}
        uuid={props.model.UUID()}
      /> :
        null
      }
    </div>
  );
}

export default CheckboxComponent;