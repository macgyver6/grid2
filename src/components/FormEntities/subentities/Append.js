import React from 'react';
import Resizer from './Resizer';
import {utility} from '../../../utility';

const Append = (props) => {
const drop_handler = (event) => {
  event.stopPropagation();
/*
  look here ->
    the last position of the locEnity[0] is undefined. It should be +1 of the append it was dropped in
*/
  let data = JSON.parse(event.dataTransfer.getData("text"));
  console.log(data)
  if (data.action === 'addEntity') {
    const totalWidthNewEntity = () => data.model.prepend + data.model.width + data.model.append
    let locEntity = utility.findEntityUuid(props.model.UUID(), props.form)
    console.log(locEntity)
    let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity.length))
    console.log(parentEntity)

    if (data.model.width <= props.append) {
      console.log('allow')
      props.removeformentity([...locEntity[0]])
      props.addformentity(utility.resurrectEntity(
        Object.assign({}, locEntity[1].properties(), { append: 0 })), [...locEntity[0]])

      let loc = [...locEntity[0]]
      loc[loc.length - 1] = (locEntity[0][locEntity[0].length - 1] + 1)
      props.addformentity(utility.resurrectEntity(Object.assign({}, data.model, { append: (parentEntity.width() - locEntity[1].width() - data.model.width)})), loc)
      event.target.style.backgroundColor = 'rgba(0, 0, 0, 0)'
    } else {
      console.log('reject')
    }
  }
}

  let dragEnterHandler
  dragEnterHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // @hack hard coded width
    if (props.model.width() >= 5) {
      event.target.style.backgroundColor= 'rgba(63, 191, 63, 0.8)'
      // const div = document.getElementById(props.model.UUID());
      // div.style.backgroundColor = 'rgba(63, 191, 63, 0.8)';
    }
  }

  const appendStyle = {
    border: '1px dashed black',
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
      onDragEnter={dragEnterHandler}
>
    </div>
  )
}

export default Append;