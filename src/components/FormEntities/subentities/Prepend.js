import React from 'react';
import Resizer from './Resizer';
import { utility } from '../../../utility';
import { defaultPropsFE } from '../../../constants/defaultPropsFE';

// prepend

const Prepend = (props) => {
  // let drop_handler = (event) => {
  //   let data = event.dataTransfer.getData("text");
  //   event.preventDefault();
  //   event.stopPropagation();
  //   console.log(data)
  //   // 1. ) reduce the current append length
  //   // chunk 1 [nFE.length FE.length ]
  //   let location = utility.findNode(props.model, props.form)
  //   props.removeformentity(location)

  //   let existingEntity = utility.resurrectEntity(
  //     Object.assign({},
  //       defaultPropsFE[props.model.type()], {
  //         append: (12 - props.model.width())
  //       })
  //   )
  //   props.addformentity(existingEntity, location)
  //   // @hack - only adds to position 0 at this point
  //   // 2.) add new entity behind the current entity
  //   let newEntityToAdd = utility.resurrectEntity(
  //     Object.assign({},
  //       defaultPropsFE[data], {
  //         append: (12 - defaultPropsFE[data].width)
  //       })
  //   )
  //   // const newLocation = [...location].splice(location[location.length - 1], 1, (location[location.length - 1] + 1))
  //   const newLocation = [...location]
  //   newLocation.splice([location.length - 1], 1, (location[location.length - 1] + 1))
  //   props.addformentity(newEntityToAdd, newLocation)
  // }

  // let dragend_handler = () => {
  //   console.log('dragend_handler')
  // }
  // let dragstart_handler = () => {
  //   console.log('dragstart_handler')
  // }

  const prependStyle = {
    // border: '2px dashed black',
    gridColumn: `span ${props.prepend}`,
    position: 'relative',
    backgroundColor: 'lightgreen'
    // flexDirection: 'row',
    // justifyContent: 'flex-end'
  }

  return (
    // <div
    //   style={appendStyle}
    //   onDrop={drop_handler}
    //   onDragEnd={dragend_handler}
    //   onDragStart={dragstart_handler}
    // >
    <div
      style={prependStyle}
    >
      <Resizer
        uuid={props.uuid}
        element='prepend' />
    </div>
  )
}

export default Prepend;