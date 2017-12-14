import React from 'react';
import { utility } from '../../utility';
import Resizer from './subentities/Resizer';
import Mover from './subentities/Mover';
import Append from './subentities/Append';
import { styles } from './feStyles';
import Prepend from './subentities/Prepend.js';

const CheckBoxComponent = (props) => {

  let handleChange = (event, props) => {
    console.log(event.target.value)
    let result = utility.findNode(props.model, props.form)
    props.removeformentity(result)
    props.addformentity(
      props.model.mutate({ defaultState: event.target.value }), result)
  }

  let dragstart_handler = function (event) {
    console.log('CheckBox dragStart')
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", JSON.stringify({
      action: 'move',
      model: props.model.properties()
    }));
  }

  const cbStyle = {
    backgroundColor: '#ff48c4',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    height: '100px'
  }

  // return actual style values
  // 1. # of grid columns the CheckBox and Append will fill
  styles.defaultEntity['gridColumn'] = 'span ' + (props.model.prepend() + props.model.width() + props.model.append())
  // 2. # of grid columns within the CheckBox
  styles.defaultEntity['gridTemplateColumns'] = 'repeat(' + (props.model.prepend() + props.model.width() + props.model.append()) + ', [col] 1fr)'

  return (
    <div
      style={styles.defaultEntity}
      onDragStart={dragstart_handler}
      draggable="true"
    >
      {(props.model.prepend() > 0) ?
        <Prepend
          prepend={props.model.prepend()} /> :
        null
      }
      <div style={cbStyle}
        // data-action={`mover.${props.model.UUID()}.CheckBox`}
        id={props.model.UUID()}
      >
        <input type={props.model.type()} onChange={(e) => handleChange(e, props)} >
        </input>
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
  );
}

export default CheckBoxComponent;