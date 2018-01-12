import React from 'react';
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';
import Resizer from './subentities/Resizer.js';
import Append from './subentities/Append';
import { styles } from './feStyles';
import Prepend from './subentities/Prepend.js';
import MovePrior from './subentities/MovePrior.js';
import { aux } from '../../constants/aux';

let FormSectionComponent = (props) => {

  const round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

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

  let dragstart_handler = (event) => {
    event.stopPropagation();
    aux.dragStart_handler(event, props.model, props.form, 'move')
  }
  let data = '';

  let dragOver_handler = function (event) {
    event.preventDefault();
  }

  const drop_handler = (event) => {
    console.log('drop_handler')
    // event.preventDefault();
    event.stopPropagation();
    data = JSON.parse(event.dataTransfer.getData("address"));

    let bgrndGrdWidth = (document.getElementById('0.bgrndGrd').clientWidth + 8)
    const offsetE1 = data.dragInit;
    const appendGrids = round(((event.clientX - event.target.getBoundingClientRect().left - offsetE1) / bgrndGrdWidth), 0)

    if (data && data.action === 'addEntity') {
      console.log('drop FS: ')
      let location = utility.findNode(props.model, props.form)
      let parentPx = document.getElementById(`${props.model.UUID()}.${props.model.type()}`).clientWidth
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8
      const appendGrids = round(((event.clientX - event.target.getBoundingClientRect().left) / bgrndGrdWidth), 0)
      let entityToAdd = utility.resurrectEntity(
        Object.assign({},
          data.model, {
            prepend: appendGrids,
            append: (props.model.width() - (appendGrids + data.model.width))
          })
      )
      console.log(entityToAdd)
      // @hack - only adds to position 0 at this point
      let addressNewEntity = [...location]
      addressNewEntity[addressNewEntity.length] = props.model.children().length
      props.addformentity(entityToAdd, addressNewEntity)

    const div = document.getElementById(props.model.UUID());
    // div.style.backgroundColor = 'rgba(243, 234, 95, 0.7)'
    // event.target.style.backgroundColor = 'rgba(243, 234, 95, 0.7)'
  }

    if (data && data.action === 'move') {
      let draggedEntity = utility.findEntityByPath(props.form, data.address)
      let location = utility.findNode(props.model, props.form)
      let entityToAdd = utility.resurrectEntity(
        Object.assign({},
          draggedEntity.properties(), {
            prepend: appendGrids,
            append: (props.model.width() - (draggedEntity.prepend() + draggedEntity.width() + appendGrids))
          })
      )
      // for moving a FormSection
      console.log(resize.init_prepend, resize.init_append, appendGrids)
      if (draggedEntity.UUID() === entityToAdd.UUID()) {
        console.log({
            prepend: (resize.init_prepend + appendGrids),
            append: (resize.init_append - appendGrids),
          })

        props.mutateformentity(location,
          {
            prepend: (resize.init_prepend + appendGrids),
            append: (resize.init_append - appendGrids),
          })
      }
      // @hack - only adds to position 0 at this point
      const element = document.getElementById(`${props.model.UUID()}.${props.model.type()}`)
      element.style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor
    }
  }

  let drag_handler = function (event) {
    console.log(event.target)
    aux.drag_handler(event, props.model, props.form, resize, props)
  }

  const fsStyle = {
    display: "grid",
    position: 'relative',
    gridTemplateColumns: `repeat(${props.model.width()}, [col] 1fr)`,
    backgroundColor: "rgba(243, 234, 95, 0.7)",
    minHeight: "120px",
    minWidth: "100px",
    gridColumn: `span ${props.model.width()}`,
    gridGap: "8px",
    zIndex: "30",
    cursor: 'move'
  }

  // return actual style values
  // 1. # of grid columns the CheckBox and Append will fill
  styles.formSection['gridColumn'] = 'span ' + (props.model.prepend() + props.model.width() + props.model.append())
  // 2. # of grid columns within the CheckBox
  styles.formSection['gridTemplateColumns'] = 'repeat(' + (props.model.prepend() + props.model.width() + props.model.append()) + ', [col] 1fr)'

  return (
    <div
      id="FormSectionComponent"
      style={styles.formSection}
      onDrop={drop_handler}
      onDragOver={dragOver_handler}
      // style={styles.defaultEntity}
    >
      {(props.model.prepend() > 0) ?
        <Prepend
          id={`${props.model.UUID()}.prepend`}
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
        id={`${props.model.UUID()}.${props.model.type()}`}
        className="form-group FS"
        style={fsStyle}
        onDrag={drag_handler}
        data-action={`mover.${props.model.UUID()}.FormSection`}
        draggable="true"
        onDragStart={dragstart_handler}
      >
        {/* <MovePrior
          element='FormEntity'
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
        /> */}
        {props.model.children().map((element, i) => {
          return React.createElement(utility.lookupComponent(element), { key: i, model: element, form: props.form, removeformentity: props.removeformentity, addformentity: props.addformentity, mutateformentity: props.mutateformentity })
        })}
        <Resizer
          id={`${props.model.UUID()}.resizer`}
          element='FormSection'
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

export default FormSectionComponent;