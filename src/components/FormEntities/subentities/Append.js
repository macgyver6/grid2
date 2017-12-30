import React from 'react';
import Resizer from './Resizer';
import { utility } from '../../../utility';
import { aux } from '../../../constants/aux';

const Append = (props) => {
  const drop_handler = (event) => {
    aux.dropAppend_handler(event, props.model, props.form, props.addformentity, props.removeformentity)
    // console.log('yolo')
    // event.stopPropagation();
    // console.log(event.dataTransfer.getData("address"))
    // // let data = JSON.parse(event.dataTransfer.getData("address"));
    // event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    // if (data.action === 'addEntity') {
    //   const totalWidthNewEntity = () => data.model.prepend + data.model.width + data.model.append
    //   let existingEntity = utility.findEntityUuid(props.model.UUID(), props.form)
    //   console.log(existingEntity)
    //   let parentEntity = utility.findEntityByPath(props.form, existingEntity[0].slice(0, existingEntity.length))
    //   console.log(parentEntity)

    //   if (data.model.width <= props.append) {
    //     console.log('allow')
    //     // props.removeformentity([...existingEntity[0]])
    //     // props.addformentity(utility.resurrectEntity(
    //     //   Object.assign({}, existingEntity[1].properties(), { append: 0 })), [...existingEntity[0]])

    //     let loc = [...existingEntity[0]]
    //     loc[loc.length - 1] = (existingEntity[0][existingEntity[0].length - 1] + 1)
    //     // props.addformentity(utility.resurrectEntity(Object.assign({}, data.model, { append: (parentEntity.width() - existingEntity[1].width() - data.model.width)})), loc)

    //   } else {
    //     console.log('reject')
    //   }
    // }
    // console.log(data.address)
    // let existingEntity = utility.findEntityUuid(props.model.UUID(), props.form)
    // let entityOnMove = utility.findEntityByPath(props.form, data.address)
    // console.log('existing: ', existingEntity, 'onMove: ', entityOnMove)
    // let parentEntity = utility.findEntityByPath(props.form, existingEntity[0].slice(0, existingEntity.length))
    // console.log(parentEntity)
    /*
      @entry
    */
    // if (data.model.width <= props.append) {
    //   console.log('allow')
    //   // props.removeformentity([...existingEntity[0]])
    //   // props.addformentity(utility.resurrectEntity(
    //   //   Object.assign({}, existingEntity[1].properties(), { append: 0 })), [...existingEntity[0]])

    //   let loc = [...existingEntity[0]]
    //   loc[loc.length - 1] = (existingEntity[0][existingEntity[0].length - 1] + 1)
    //   // props.addformentity(utility.resurrectEntity(Object.assign({}, data.model, { append: (parentEntity.width() - existingEntity[1].width() - data.model.width)})), loc)

    // } else {
    //   console.log('reject')
    // }
  }

  let dragLeaveHandler = (event) => {
    event.stopPropagation();
  }

  const appendStyle = {
    // border: '1px dashed black',
    gridColumn: `span ${props.append}`,
    // position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0)'
    // flexDirection: 'row',
    // justifyContent: 'flex-end'
  }

  return (
    <div
      style={appendStyle}
      onDrop={drop_handler}
      onDragLeave={dragLeaveHandler}
      onDragLeave={dragLeaveHandler}
    >
    </div>
  )
}

export default Append;