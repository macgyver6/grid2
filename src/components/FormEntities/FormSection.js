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
    console.log('formSection drop_handler')
    // event.preventDefault();
    // event.stopPropagation();
    data = JSON.parse(event.dataTransfer.getData("address"));

    let bgrndGrdWidth = (document.getElementById('0.bgrndGrd').clientWidth + 8)
    const offsetE1 = data.dragInit;
    const appendGrids = round(((event.clientX - document.getElementById(`${props.model.UUID()}.${props.model.type()}`).getBoundingClientRect().left - offsetE1) / bgrndGrdWidth), 0)

    if (data && data.action === 'addEntity') {
      console.log('drop FS add: ')
      let location = utility.findNode(props.model, props.form)
      let parentPx = document.getElementById(`${props.model.UUID()}.${props.model.type()}`).clientWidth
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8
      const appendGrids = round(((event.clientX - event.target.getBoundingClientRect().left) / bgrndGrdWidth), 0)
      let entityToAdd = utility.resurrectEntity(
        Object.assign({},
          data.model, {
            prepend: appendGrids,
            append: (props.model.width() - (appendGrids + data.model.width))  // addressNewEntity[addressNewEntity.length] = props.model.children().length
          })
      )
      console.log('here')
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
      let entityToAdd = utility.resurrectEntity(
        Object.assign({},
          draggedEntity.properties(), {
            prepend: appendGrids,
            append: (props.model.width() - appendGrids - draggedEntity.width()  )
          })
      )

      let test = utility.findEntityUuid(props.model.UUID(), props.form)[0]
      let _test = [...test]
      _test[test.length] = props.model.children().length
      // for dropping entity other than form section onto this form section
      if (draggedEntity.UUID() != props.model.UUID()) {
        props.addformentity(entityToAdd, _test)
        props.removeformentity(data.address)
        /*
        start restore donor
        */
        const restoreDonorSiblingAddress = (arr) => {
          // get donor's parent
          const donorParent = utility.findEntityByPath(props.form, arr.slice(0, arr.length - 1))

          if (donorParent.children().length === 1) {
            console.log('entity being removed from formSection is the last child')
            return false
          } else {
            console.log('donor formSection is not an empty nester')
            const toLeft = (arr) => {
              const _toLeft = [...arr]
              if (_toLeft[arr.length - 1] < 1) {
                return false
              } else {
                _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1
                return ({ address: _toLeft, entity: utility.findEntityByPath(props.form, _toLeft) })
              }
            }
            const toRight = (arr) => {
              const _toRight = [...arr]
              _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1
              return ({
                address: arr,
                entity: utility.findEntityByPath(props.form, _toRight)
              })
            }

            if (toLeft(arr)) {
              console.log('previous entity exists, adding to append: ', toLeft(arr).address)
              return ({
                address: toLeft(arr).address,
                properties: {
                  append: toLeft(arr).entity.append() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append()
                }
              })
            } else {
              console.log('no previous entity exists, adding to prepend, ', utility.findEntityByPath(props.form, toRight(arr).address), {
                address: toRight(arr).address,
                properties:
                  { prepend: toRight(arr).entity.prepend() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append() }
              })
              return ({
                address: toRight(arr).address,
                properties:
                  { prepend: toRight(arr).entity.prepend() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append() }
              })
            }
          }
        }
        if (restoreDonorSiblingAddress(data.address)) {
          console.log(restoreDonorSiblingAddress(data.address).address, restoreDonorSiblingAddress(data.address).properties)

          props.mutateformentity(restoreDonorSiblingAddress(data.address).address, restoreDonorSiblingAddress(data.address).properties)
        }
        /*
        end restore donor
        */
      }
      // for moving a FormSection
      if (draggedEntity.UUID() === props.model.UUID()) {
        console.log(draggedEntity.UUID() , utility.findNode(props.model, props.form),
          {
            prepend: (resize.init_prepend + appendGrids),
            append: (resize.init_append - appendGrids),
          })

        props.mutateformentity(utility.findNode(props.model, props.form),
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
        {/* generalize to map through any type entity*/}
        {props.model.type() === 'FormSection' ?
        props.model.children().map((element, i) => {
          return React.createElement(utility.lookupComponent(element), { key: i, model: element, form: props.form, removeformentity: props.removeformentity, addformentity: props.addformentity, mutateformentity: props.mutateformentity })
        }) : null
        }

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