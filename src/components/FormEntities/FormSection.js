import React from 'react';
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';
import Resizer from './subentities/Resizer.js';

let FormSectionComponent = (props) => {

  let dragstart_handler = (event) => {
    console.log('dragStart FormSection')
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", JSON.stringify({
      action: 'move',
      model: props.model.properties()
    }));
  }

  let drop_handler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    let data = JSON.parse(event.dataTransfer.getData("text"));
    if (data && data.action === 'addEntity') {
      event.preventDefault();
      event.stopPropagation();
      let location = utility.findNode(props.model, props.form)
      let entityToAdd = utility.resurrectEntity(
        Object.assign({},
          data.model, {
            append: (props.model.width() - (data.model.prepend + data.model.width))
          })
      )
      // @hack - only adds to position 0 at this point
      location.push(0)
      props.addformentity(entityToAdd, location)
    }
  }

  const divStyle = {
    "display": "grid",
    position: 'relative',
    "gridTemplateColumns": `repeat(${props.model.width()}, [col] 1fr)`,
    "backgroundColor": "rgba(243, 234, 95, 0.7)",
    // "marginTop": "10px",
    "minHeight": "120px",
    "minWidth": "100px",
    "gridColumn": `col 1 / span ${props.model.width()}`,
    "gridGap": "8px",
    "zIndex": "30",
    cursor: 'move'
  }
  return (
    <div
      className="form-group FS"
      style={divStyle}
      onDrop={drop_handler}
      draggable="true"
      id={props.model.UUID()}
      data-action={`mover.${props.model.UUID()}.FormSection`}
      onDragStart={dragstart_handler}
   >
      {props.model.children().map((element, i) => {
        return React.createElement(utility.lookupComponent(element), { key: i, model: element, form: props.form, removeformentity: props.removeformentity, addformentity: props.addformentity })
      })}
      <Resizer
        uuid={props.model.UUID()}
        element='FormSection'
      />
    </div>
  );
}

export default FormSectionComponent;