import React from 'react';
import { utility } from '../../../utility';
import { defaultPropsFE } from '../../../constants/defaultPropsFE';

const AddToEnd = (props) => {

  const wrapperStyle = {
    width: '100%',
    height: '20px',
    position: 'absolute',
    right: '0',
    bottom: '-20px',
  }

  const drop_handler = (event) => {
    event.stopPropagation();
    let data = JSON.parse(event.dataTransfer.getData("address"));
    let locEntity = utility.findEntityUuid(props.model.UUID(), props.form)
    let loc = [...locEntity[0]]
    loc = loc.concat(locEntity[1].children().length)
    const parentEntity = [...locEntity[0]].slice(0, locEntity.length - 1)
    console.log([...locEntity[0]])
    props.addformentity(utility.resurrectEntity(
      Object.assign({}, data.model, {
        append: locEntity[1].width() - data.model.width
      })), loc)
    event.target.style.backgroundColor = ''
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
    event.target.style.backgroundColor = ''
  }

  return (
    <div
      id={props.model.UUID()}
      className="outer"
      style={wrapperStyle}
      onDrop={drop_handler}
      onDragEnter={dragEnter_handler}
      onDragLeave={dragLeave_handler}
    >

    </div>
  )
}

export default AddToEnd;