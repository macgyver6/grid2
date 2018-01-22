import React from 'react';
import { helpers } from '../../helpers';
import Resizer from './subentities/Resizer';
import Resizer2 from './subentities/Resizer2';
import Append from './subentities/Append';
import { styles } from './feStyles';
import Prepend from './subentities/Prepend.js';

const RadioButtonComponent = (props) => {
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
    helpers.dragStart_handler(event, props.model, props.form, 'move')
  }

  let dragOver_handler = function (event) {
    event.preventDefault();
  }

  let drop_handler = function (event) {
    helpers.dropMove_handler(event, props, resize)
  }

 let drag_handler = function (event) {
    helpers.drag_handler(event, props.model, props.form, resize, props)
  }

  const marginCalc = () => {
    const _margin = [0, 0, 0, 0]
    props.model.append() > 0 ? _margin[1] = 4 : 0
    props.model.prepend() > 0 ? _margin[3] = 4 : 0
    return (((_margin.map((el) => `${el}px`)).toString().replace(/,/g, ' ')))
  }
  const rbStyle = {
    backgroundColor: '#304061',
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
      id={`${props.model.UUID()}.${props.model.type()}`}
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
          addformentity={props.addformentity}            mutateformentity={props.mutateformentity}            /> :
        null
      }

      <div
        id={`${props.model.UUID()}.${props.model.type()}`}
        style={rbStyle}
        className='RadioButton'
        onDragStart={dragstart_handler}
        onDrag={drag_handler}
        draggable="true"
      >
        <form action="">
          <input type="radio" name="_value" value="yes" /> Yes<br />
          <input type="radio" name="_value" value="no" /> No<br />
          <input type="radio" name="_value" value="other" /> Other
        </form>
        <Resizer2
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

export default RadioButtonComponent;