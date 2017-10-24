import React from 'react';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append';
import { styles } from './feStyles';

const CheckboxComponent = (props) => {

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
  styles.defaultEntity['gridColumn'] = 'span ' + (props.model.width() + props.model.append())
  // 2. # of grid columns within the CheckBox
  styles.defaultEntity['gridTemplateColumns'] = 'repeat(' + (props.model.width() + props.model.append()) + ', [col] 1fr)'


  return (
    <div
      style={styles.defaultEntity}
      draggable="true"
      onDragEnd={dragend_handler}
      onDragStart={dragstart_handler}
    >
      <div style={cbStyle}
      >
        <input type={props.model.type()} onChange={props.handleInputChange} checked={props.model.defaultState()}>
        </input>
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

export default CheckboxComponent;