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
    console.log(locEntity[0])
    // let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity.length))

    if (totalWidthNewEntity() <= props.append) {
      console.log('allow')
      props.removeformentity(locEntity[0])
      props.addformentity(utility.resurrectEntity(
        Object.assign({}, Object.assign({}, locEntity[1].properties(), { append: locEntity[1].append() - totalWidthNewEntity() }))), locEntity[0])
      console.log([locEntity[0]])
      locEntity[0][locEntity[0].length - 1] = locEntity[0][locEntity[0].length + 1]
      props.addformentity(utility.resurrectEntity(Object.assign({}, data.model)), locEntity[0])

    } else {
      console.log('reject')
    }
  }
}

  const appendStyle = {
    // border: '2px dashed black',
    gridColumn: `span ${props.append}`,
    // position: 'relative',
    backgroundColor: 'lightgrey'
    // flexDirection: 'row',
    // justifyContent: 'flex-end'
  }

  return (
    <div
      style={appendStyle}
      onDrop={drop_handler}>
    </div>
  )
}

export default Append;