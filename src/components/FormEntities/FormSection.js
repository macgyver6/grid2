import React from 'react';
import { utility } from '../../utility';
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
    // event.preventDefault();
    data = JSON.parse(event.dataTransfer.getData("address"));
    console.log(data)

    let bgrndGrdWidth = (document.getElementById('0.bgrndGrd').clientWidth + 8)
    const offsetE1 = data.dragInit;
    const offsetGrids = round(((event.clientX - document.getElementById(`${props.model.UUID()}.${props.model.type()}`).getBoundingClientRect().left - offsetE1) / bgrndGrdWidth), 0)

    if (data && data.action === 'addEntity') {
      console.log('drop FS add: ')
      let location = utility.findNode(props.model, props.form)
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8
      const offsetGrids = round(((event.clientX - event.target.getBoundingClientRect().left) / bgrndGrdWidth), 0)
      let entityToAdd = utility.resurrectEntity(
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
      props.addformentity(entityToAdd, addressNewEntity)

      const div = document.getElementById(props.model.UUID());
      // div.style.backgroundColor = 'rgba(243, 234, 95, 0.7)'
      // event.target.style.backgroundColor = 'rgba(243, 234, 95, 0.7)'
    }

    if (data && data.action === 'move') {
      console.log('FormSection drop move')
      console.log(data.address)
      let draggedEntity = utility.findEntityByPath(props.form, data.address)
      let entityToAdd = utility.resurrectEntity(
        Object.assign({},
          draggedEntity.properties(), {
            prepend: offsetGrids,
            append: (props.model.width() - offsetGrids - draggedEntity.width())
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

        console.log(helpers.restoreDonorSiblingAddress(data.address, props))
        if (helpers.restoreDonorSiblingAddress(data.address, props)) {
          console.log(helpers.restoreDonorSiblingAddress(data.address, props).address, helpers.restoreDonorSiblingAddress(data.address, props).properties)

          props.mutateformentity(helpers.restoreDonorSiblingAddress(data.address, props).address, helpers.restoreDonorSiblingAddress(data.address, props).properties)
        }
        /*
        end restore donor
        */
      }
      // for changing prepend/append of a formsection
      if (draggedEntity.UUID() === props.model.UUID()) {
        console.log('dropped on FormSection, moving form section: ', draggedEntity.UUID(), utility.findNode(props.model, props.form),
          {
            prepend: (resize.init_prepend + offsetGrids),
            append: (resize.init_append - offsetGrids),
          })
        console.log(utility.findNode(props.model, props.form),
          {
            prepend: (resize.init_prepend + offsetGrids),
            append: (resize.init_append - offsetGrids),
          })
        props.mutateformentity(utility.findNode(props.model, props.form),
          {
            prepend: (resize.init_prepend + offsetGrids),
            append: (resize.init_append - offsetGrids),
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
      onDrop={drop_handler}
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
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
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
        <AddToEnd
          model={props.model}
          form={props.form}
          addformentity={props.addformentity}
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