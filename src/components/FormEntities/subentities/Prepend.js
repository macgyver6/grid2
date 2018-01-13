import React from 'react';
import Resizer from './Resizer';
import { utility } from '../../../utility';
import { aux } from '../../../constants/aux';
import { defaultPropsFE } from '../../../constants/defaultPropsFE';

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
    // minWidth: '20px',
    // minHeight: '100px',
    gridColumn: `span ${props.prepend}`,
    // border: '1px dashed black',
    // position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }

  const drop_handler = (event) => {
    aux.dropPrepend_handler(event, props)
  }

  let dragover_handler = (event) => {
    event.preventDefault();
  }

  let dragEnterHandler
  dragEnterHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // @hack hard coded width
    if (props.model.width() >= 5) {
      event.target.style.backgroundColor = 'rgba(63, 191, 63, 0.8)'
    }
  }

  return (
    <div
      style={prependStyle}
      id={`${props.model.UUID()}.prepend`}
      onDrop={drop_handler}
      onDragOver ={dragover_handler}
    >
      {/* onDragEnter={dragEnterHandler} */}
    </div>
  )
}

export default Prepend;