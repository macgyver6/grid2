import React from 'react';
// import Resizer from './Resizer';
import { utility } from '../../../utility';
// import { defaultPropsFE } from '../../../constants/defaultPropsFE';

const AddToEnd = (props) => {
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

  // const AddToEnd = {
  //   width: '30px',
  //   height: '100px',
  //   position: 'absolute',
  //   top: '-100px',
  //   left: '0px'
  // }
  // const bgrndGrdWidth = (document.getElementById('0.bgrndGrd'))
  // console.log(bgrndGrdWidth)
  // const bgrndGrdWidth = (document.getElementById('0.bgrndGrd').clientWidth + 8)

  const wrapperStyle = {
    width: '100%',
    height: '20px',
    position: 'absolute',
    right: 0,
    bottom: -20,
  }

  const drop_handler = (event) => {
    event.stopPropagation();
    let data = JSON.parse(event.dataTransfer.getData("address"));
    console.log(data)
    // const totalWidthNewEntity = () => data.model.prepend + data.model.width + data.model.append
    let locEntity = utility.findEntityUuid(props.model.UUID(), props.form)
    let loc = [...locEntity[0]]
    loc.concat(1)
    loc = loc.concat(locEntity[1].children().length)
    console.log(loc)

    props.addformentity(utility.resurrectEntity(Object.assign({}, data.model)), loc)
    event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
  }

  let dragEnter_handler = (event) => {
    event.target.style.backgroundColor = 'lightgreen'

    // const div = document.createElement('div');
    // // div.style = AddToEnd;
    // // div.style.width = '10px',
    // // div.style.height = '100px',
    // // div.style.position = 'absolute',

    // div.className = 'arrow_box';

    // event.target.appendChild(div);
    // div.innerHTML = `<h4 class="logo">Move before <strong>${props.model._type}</strong></h1>`
  }

  let dragLeave_handler = (event) => {
    // event.target.removeChild(event.target.children[0])
    // event.target.style.borderLeft = ''
  }
  let clickHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(event.target)
  }

  return (
    <div
      id={props.model.UUID()}
      className="outer"
      style={wrapperStyle}
      onDrop={drop_handler}
      onDragEnter={dragEnter_handler}
      onDragLeave={dragLeave_handler}
      onClick={clickHandler}
    >

    </div>
  )
}

export default AddToEnd;