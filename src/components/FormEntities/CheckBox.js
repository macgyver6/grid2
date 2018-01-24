import React from 'react';
import { utility } from '../../utility';
import { helpers } from '../../helpers';
import { movers } from '../../movers';
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
    movers.mouseDownToMove_handler(event, props, 'move');
  }

    /** Handle adding/subtracing prepend or append */
  let dragstart_handler = function (event) {
    event.stopPropagation();
    helpers.dragStart_handler(event, props.model, props.form, 'move')
  }

  // let drop_handler = function (event) {
  //   helpers.dropMove_handler(event, props, resize)
  // }

  const marginCalc = () => {
    const _margin = [0, 0, 0, 0]
    props.model.append() > 0 ? _margin[1] = 4 : 0
    props.model.prepend() > 0 ? _margin[3] = 4 : 0
    return (((_margin.map((el) => `${el}px`)).toString().replace(/,/g, ' ')))
  }

  const cbStyle = {
    backgroundColor: '#00C5EC',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    height: '100px',
    margin: marginCalc()
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
      // onDragStart={dragstart_handler}
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
          addformentity={props.addformentity} mutateformentity={props.mutateformentity} /> :
        null
      }

      <div
        id={`${props.model.UUID()}.${props.model.type()}`}
        style={cbStyle}
        className='CheckBox'
        data-type='CheckBox'
        onMouseDown={mouseDown_handler}
        onDragStart={dragstart_handler}
        // onDrag={drag_handler}
        draggable="true"
      >
      {/* onChange={(e) => handleChange(e, props)} */}
        <input type={props.model.type()}  >
        </input>
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
  );
}

export default CheckBoxComponent;