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

  let dragend_handler = function (event) {
    event.stopPropagation();
    resize.changed = event.screenX;
    console.log(props)
    let locEntity = utility.findEntityUuid(props.model.UUID(), props.form)
    let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity.length))
    resize.changed = event.screenX;
    let initGrid = {
      width: null,
      append: null,
      prepend: null
    }
    if (props.model._type === 'FormSection') {
      initGrid.width = parentEntity.width()
      initGrid.prepend = parentEntity.prepend()
      initGrid.append = parentEntity.append()
      console.log(initGrid)
    } else {
      initGrid.width = locEntity[1].width(),
        initGrid.append = locEntity[1].append(),
        initGrid.prepend = locEntity[1].prepend()
    }

    let initDiff = resize.changed - resize.init
    let fsWidth = parseInt((document.getElementById(parentEntity.UUID()).clientWidth / parentEntity.width()), 10)
    let diffGrid = (parseInt(((Math.abs(initDiff)) / fsWidth), 10) + 1)
    if (Math.abs(initDiff) > 20) {
      var calcOpp = {
        '+': (a, b) => Object.assign({}, { prepend: initGrid.prepend + diffGrid, append: initGrid.append - diffGrid }),
        '-': (a, b) => Object.assign({}, { prepend: initGrid.prepend - diffGrid, append: initGrid.append + diffGrid }),
      }
      const calcMover = ((newWidth) => {
        console.log(newWidth)
        let entityToChange = locEntity[1]
        props.removeformentity(locEntity[0])
        console.log(newWidth)
        console.log((utility.resurrectEntity(
          Object.assign({},
            entityToChange.properties(), newWidth)
        ), locEntity[0])
        )
        return props.addformentity(utility.resurrectEntity(
          Object.assign({},
            entityToChange.properties(), newWidth)
        ), locEntity[0])
      })
      if (initDiff > 0) {
        calcMover(calcOpp['+'](initGrid, diffGrid))
      } else {
        calcMover(calcOpp['-'](initGrid, diffGrid))
      }
    }
    // document.getElementById('FormComponent').removeEventListener('mouseup', mouseUpHandler);
    // document.getElementById('FormComponent').removeEventListener('mousedown', mouseUpHandler);
  }

  let source = null
  const resize = {
    init: null,
    changed: null
  }

  let dragstart_handler = function (event) {
    aux.dragStart_handler(event, props.model, props.form)
  }

  let drop_handler = function (event) {
    event.stopPropagation();
    let data = event.dataTransfer.getData("address");
    aux.drop_handler(event, props.model, props.form, props.addformentity, props.removeformentity)
  }

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
        draggable="true"
        onDragStart={dragstart_handler}
        // onDrop={drop_handler}
      >
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