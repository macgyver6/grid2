import React from 'react';
import Resizer from './Resizer';
import { utility } from '../../../utility';
import { defaultPropsFE } from '../../../constants/defaultPropsFE';

const MovePrior = (props) => {
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

  const MovePrior = {
    width: '30px',
    height: '100px',
    backgroundColor: 'orange',
  }

  const drop_handler = (event) => {
    event.stopPropagation();
    let data = JSON.parse(event.dataTransfer.getData("text"));
    console.log(data)
    const totalWidthNewEntity = () => data.model.prepend + data.model.width + data.model.append
    let locEntity = utility.findEntityUuid(props.model.UUID(), props.form)

    let loc = [...locEntity[0]]
    loc[loc.length - 1] = (locEntity[0][locEntity[0].length - 1] + 1)


    if (data.action === 'move') {
      // console.log(utility.findNode(utility.resurrectEntity(data.model), props.form))
      // console.log(loc)
      props.removeformentity(utility.findNode(utility.resurrectEntity(data.model), props.form))
      // props.removeformentity(utility.findEntityByPath(data.model.uuid))
    }
    props.addformentity(utility.resurrectEntity(Object.assign({}, data.model)), locEntity[0])
    event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
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
      style={MovePrior}
      onDrop={drop_handler}
    >
      {/* onDragEnter={dragEnterHandler} */}
    </div>
  )
}

export default MovePrior;