import React from 'react';
import { utility } from '../../utility';
import { address } from '../../address';
import { drop } from '../../drop';
import { defaultPropsFE } from '../../constants/defaultPropsFE';
import Resizer from './subentities/Resizer.js';
import AddToEnd from './subentities/AddToEnd.js';
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
    event.preventDefault();
    // document.getElementById(
    //   `${props.model.UUID()}.${props.model.type()}`).style.backgroundColor = 'ightgreen'
  }

  const drop_handler = (event) => {
    event.stopPropagation();
    console.log('formSection drop_handler')
    console.log(data)
    // event.preventDefault();
    data = JSON.parse(event.dataTransfer.getData("address"));
    console.log(event.dataTransfer.getData("address"), data)

    let bgrndGrdWidth = (document.getElementById('0.bgrndGrd').clientWidth + 8)
    const offsetE1 = data.dragInit;
    const offsetGrids = round(((event.clientX - document.getElementById(`${props.model.UUID()}.${props.model.type()}`).getBoundingClientRect().left - offsetE1) / bgrndGrdWidth), 0)

    if (data && data.action === 'addEntity') {
      console.log('drop FS add: ')
      let location = address.bySample(props.model, props.form)
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8
      const offsetGrids = round(((event.clientX - event.target.getBoundingClientRect().left) / bgrndGrdWidth), 0)
      let entityToAdd = address.resurrectEntity(
        Object.assign({},
          data.model, {
            prepend: offsetGrids,
            append: (props.model.width() - (offsetGrids + data.model.width))  // addressNewEntity[addressNewEntity.length] = props.model.children().length
          })
      )
      console.log('here')
      // @hack - only adds to position 0 at this point
      let addressNewEntity = [...location]
      addressNewEntity[addressNewEntity.length] = props.model.children().length
      console.log(location)
      props.add(addressNewEntity, entityToAdd)

      const div = document.getElementById(props.model.UUID());
      // div.style.backgroundColor = 'rgba(243, 234, 95, 0.7)'
      // event.target.style.backgroundColor = 'rgba(243, 234, 95, 0.7)'
    }
    // rearranging by moving one entity from one section to another
    if (data && data.action === 'move') {
      console.log('FormSection drop move')
      console.log(data.address)
      let draggedEntity = address.byPath(props.form, data.address)
      let entityToAdd = address.resurrectEntity(
        Object.assign({},
          draggedEntity.properties(), {
            prepend: offsetGrids,
            append: (props.model.width() - offsetGrids - draggedEntity.width())
          })
      )

      const total = (entity) => entity.prepend() + entity.width() + entity.append();

      // const _parentChildren = [...parentEntity.children()]
      /**returns true if entity path provided is firstInRow; false if not
       * * @param {array} before - Path of the current entity
      */
      const firstInRow = (entityAddress) => {
        const section = address.byPath(props.form, entityAddress.slice(0, entityAddress.length - 1))
        // console.log(entityAddress )
        const _entityAddress = (entityAddress.slice(entityAddress.length - 1, entityAddress.length + 1) - 1)
        var runningTotal = 0;
        // console.log(_entityAddress, section.children())
        for (var i = 0; i <= _entityAddress; ++i) {
          // console.log(section)
          runningTotal += total(section.children()[i]);
        }
        return (runningTotal % section.width() === 0) ? true : false;
      }


      const restoreDonorSiblingAddress = (arr, props, draggedEntity) => {
        // get donor's parent
        const donorParent = address.byPath(props.form, arr.slice(0, arr.length - 1))
        console.log(arr, props, draggedEntity)
        const toLeft = (arr) => {
          const _toLeft = [...arr]
          console.log({ address: _toLeft, entity: address.byPath(props.form, _toLeft) })
          _toLeft[arr.length - 1] = _toLeft[arr.length - 1] - 1
          return ({ address: _toLeft, entity: address.byPath(props.form, _toLeft) })
        }
        const toRight = (arr) => {
          const _toRight = [...arr]
          _toRight[arr.length - 1] = _toRight[arr.length - 1] + 1
          return ({
            address: _toRight,
            entity: address.byPath(props.form, _toRight)
          })
        }
        console.log((donorParent.children().length - 1 === arr[arr.length - 1]) && firstInRow(arr))
        /** if only 1 child in section or the donor entity is the last entity in section */
        if (donorParent.children().length === 1 || (donorParent.children().length - 1 === arr[arr.length - 1]) && firstInRow(arr)) {
          // if (donorParent.children().length === 1 || (donorParent.children().length - 1 === arr[arr.length - 1])) {
          return false
        } else if (firstInRow(arr)) {
          console.log('firstInRow: ', toRight(arr))
          return ({
            address: toRight(arr).address,
            properties:
              { prepend: toRight(arr).entity.prepend() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append() }
          })
        } else {
          return ({
            address: toLeft(arr).address,
            properties: {
              append: toLeft(arr).entity.append() + draggedEntity.prepend() + draggedEntity.width() + draggedEntity.append()
            }
          })
        }
      }

      console.log(restoreDonorSiblingAddress(data.address, props, draggedEntity))

      const toBeMutatedRestore = restoreDonorSiblingAddress(data.address, props, draggedEntity);

      if (toBeMutatedRestore) {
        props.mutate(toBeMutatedRestore.address, toBeMutatedRestore.properties)
      }

      let test = address.byUuid(props.model.UUID(), props.form)[0]
      let _test = [...test]
      _test[test.length] = props.model.children().length
      // for dropping entity other than itself onto this form section
      if (draggedEntity.UUID() !== props.model.UUID()) {
        console.log('FormSection drop move, entity dropped on FS')
        console.log('add this: ', entityToAdd, _test)
        console.log('remove this: ', (data.address))
        props.add(_test, entityToAdd)
        props.remove(data.address)
        //   /*
        //   start restore donor
        //   */

        console.log(helpers.restoreDonorSiblingAddress(data.address, props))
        if (helpers.restoreDonorSiblingAddress(data.address, props)) {
          console.log(helpers.restoreDonorSiblingAddress(data.address, props).address, helpers.restoreDonorSiblingAddress(data.address, props).properties)

          // props.mutate(helpers.restoreDonorSiblingAddress(data.address, props).address, helpers.restoreDonorSiblingAddress(data.address, props).properties)
        }
        /*
        end restore donor
        */
      }
      // for changing prepend/append of a formsection
      if (draggedEntity.UUID() === props.model.UUID()) {
        console.log('dropped on FormSection, moving form section: ', offsetGrids,
          {
            prepend: (props.model.prepend() + offsetGrids),
            append: (props.model.append() - offsetGrids),
          })

        props.mutate(address.bySample(props.model, props.form),
          {
            prepend: (props.model.prepend() + offsetGrids),
            append: (props.model.append() - offsetGrids),
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

  const click_handler = (event) => {
    console.log('click')
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
      onDrop={drop_handler} // adding a new entity to section
      onDragOver={dragOver_handler}
      onClick={click_handler}
    // style={styles.defaultEntity}
    >
      {(props.model.prepend() > 0) ?
        <Prepend
          id={`${props.model.UUID()}.prepend`}
          prepend={props.model.prepend()}
          uuid={props.model.UUID()}
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
        /> :
        null
      }
      <div
        id={`${props.model.UUID()}.${props.model.type()}`}
        className="form-group FS"
        style={fsStyle}
        data-action={`mover.${props.model.UUID()}.FormSection`}
        draggable="true"
        onDragStart={dragstart_handler}
      >

        {props.model.type() === 'FormSection' ?
          props.model.children().map((element, i) => {
            return React.createElement(address.lookupComponent(element), { key: i, model: element, form: props.form, remove: props.remove, add: props.add, mutate: props.mutate })
          }) : null
        }

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
        <AddToEnd
          model={props.model}
          form={props.form}
          add={props.add}
        />
      </div>
      {(props.model.append() > 0) ?
        <Append
          id={`${props.model.UUID()}.append`}
          append={props.model.append()}
          uuid={props.model.UUID()}
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

export default FormSectionComponent;