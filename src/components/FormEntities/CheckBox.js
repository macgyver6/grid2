import React from 'react';
import { utility } from '../../utility';
import { address } from '../../address';
import { helpers } from '../../helpers';
import { drop } from '../../drop';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append';
import { styles } from './feStyles';
import Prepend from './subentities/Prepend.js';
import { defaultPropsFE } from '../../constants/defaultPropsFE';

const CheckBoxComponent = (props) => {

  const round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

  const resize = {
    mouseMoveStartX: null,
    mouseMoveEndX: null,
    dx: null,
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
    drop.mouseDown_handler(event, props, 'move');
  }

  /** Set dataTransfer in the case the entity is dropped on target:
   * 1. Moving to different form section
   * 2. Deleting a form section
   */
  let dragstart_handler = (event) => {
    // event.stopPropagation();
    console.log(event.target)
    helpers.dragStart_handler(event, props.model, props.form, 'move')
  }

  let dragOver_handler = (event) => {
    event.preventDefault()
  }

  let drop_handler = (event) => {
    drop.drop_handler(event, props)
  }


  const cbStyle = {
    backgroundColor: '#00C5EC',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    height: '100px',
    // margin: helpers.marginCalc(props),
    padding: '4px',
    borderRadius: '2px'
  }

  const cbInputStyle = {
    height: '25px',
    width: '25px'
  }


  // return actual style values
  // 1. # of grid columns the CheckBox and Append will fill
  styles.defaultEntity['gridColumn'] = 'span ' + (props.model.prepend() + props.model.width() + props.model.append())
  // 2. # of grid columns within the CheckBox
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
          remove={props.remove}
          add={props.add} mutate={props.mutate} /> :
        null
      }

      <div
        id={`${props.model.UUID()}.${props.model.type()}`}
        style={cbStyle}
        className='CheckBox'
        data-type='CheckBox'
        onMouseDown={mouseDown_handler}
        onDragStart={dragstart_handler}
        draggable="true"
      >
      {/* onChange={(e) => handleChange(e, props)} */}
        <input type={props.model.type()}  style={cbInputStyle}>
        </input>
        <Resizer
          id={`${props.model.UUID()}.resizer`}
          element='FormEntity'
          uuid={props.model.UUID()}
          className='resizer'
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
          mutate={props.mutate}
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
          remove={props.remove}
          add={props.add}
          mutate={props.mutate}
        /> :
        null
      }
    </div>
  );
}

export default CheckBoxComponent;