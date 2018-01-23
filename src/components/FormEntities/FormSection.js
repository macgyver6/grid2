import React from 'react';
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';
import Resizer from './subentities/Resizer.js';
import Append from './subentities/Append';
import { styles } from './feStyles';
import Prepend from './subentities/Prepend.js';
import { helpers } from '../../helpers';

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
    // event.stopPropagation();
    helpers.dragStart_handler(event, props.model, props.form, 'move')
    console.log('FS DragStart')
  }
  let data = '';

  let dragOver_handler = function (event) {
    // event.stopPropagation();
    // event.preventDefault();
    // document.getElementById(
    //   `${props.model.UUID()}.${props.model.type()}`).style.backgroundColor = 'ightgreen'
  }

  const drop_handler = (event) => {
    event.stopPropagation();
    console.log('formSection drop_handler')
    // event.preventDefault();
    data = JSON.parse(event.dataTransfer.getData("address"));

    let bgrndGrdWidth = (document.getElementById('0.bgrndGrd').clientWidth + 8)
    const offsetE1 = data.dragInit;
    const appendGrids = round(((event.clientX - document.getElementById(`${props.model.UUID()}.${props.model.type()}`).getBoundingClientRect().left - offsetE1) / bgrndGrdWidth), 0)

    if (data && data.action === 'addEntity') {
      console.log('drop FS add: ')
      let location = utility.findNode(props.model, props.form)
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
      console.log('FormSection drop move')
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
      // for dropping entity other than itself onto this form section
      if (draggedEntity.UUID() !== props.model.UUID()) {
        console.log('FormSection drop move, entity dropped on FS')
        console.log('add this: ', entityToAdd, _test)
        console.log('remove this: ', (data.address))
        props.addformentity(entityToAdd, _test)
        props.removeformentity(data.address)
      //   /*
      //   start restore donor
      //   */
        const restoreDonorSiblingAddress = (arr) => {
          const total = (prepend, width, append) => prepend + width + append;
          // get donor's parent
          const donorParent = utility.findEntityByPath(props.form, arr.slice(0, arr.length - 1))
          const entitySelf = utility.findEntityByPath(props.form, arr)
          // console.log(total(0, 8, 0))
          // console.log(typeof(entitySelf.prepend()), typeof(entitySelf.width()), typeof(entitySelf.append()))
          // console.log(total(entitySelf.prepend(), entitySelf.width(), entitySelf.append()),
          //   total(donorParent.prepend() + donorParent.width() + donorParent.append()))
          console.log(total(entitySelf.prepend(), entitySelf.width(), entitySelf.append()),
            total(donorParent.prepend(), donorParent.width(), donorParent.append()))
          if (donorParent.children().length === 1 ||
          total(entitySelf.prepend(), entitySelf.width(), entitySelf.append()) ===
          total(donorParent.prepend(), donorParent.width(), donorParent.append())
        ) {
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
      // for changing prepend/append of a formsection
      if (draggedEntity.UUID() === props.model.UUID()) {
        console.log('dropped on FormSection, moving form section: ', draggedEntity.UUID() , utility.findNode(props.model, props.form),
          {
            prepend: (resize.init_prepend + appendGrids),
            append: (resize.init_append - appendGrids),
          })
        console.log(utility.findNode(props.model, props.form),
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
      console.log('change this: ', element.id + 'to: ' + defaultPropsFE[props.model.type()].render.backgroundColor)
      element.style.backgroundColor = defaultPropsFE[props.model.type()].render.backgroundColor
    }
  }

  let drag_handler = function (event) {
    helpers.drag_handler(event, props.model, props.form, resize, props)
  }

  const fsStyle = {
    display: "grid",
    position: 'relative',
    // border: '2px dotted',
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
      id={`${props.model.UUID()}.${props.model.type()}.wrapper`}
      className="FS"
      style={styles.formSection}
      // onDrop={drop_handler}
      // onDragOver={dragOver_handler}
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
        // onDrag={drag_handler}
        data-action={`mover.${props.model.UUID()}.FormSection`}
        // draggable="true"
        // onDragStart={dragstart_handler}
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