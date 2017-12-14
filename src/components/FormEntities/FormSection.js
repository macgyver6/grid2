import React from 'react';
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';
import Resizer from './subentities/Resizer.js';
import Mover from './subentities/Mover.js';
import Append from './subentities/Append';
import { styles } from './feStyles';
import Prepend from './subentities/Prepend.js';

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

  const fsStyle = {
    display: "grid",
    position: 'relative',
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
  styles.defaultEntity['gridColumn'] = 'span ' + (props.model.prepend() + props.model.width() + props.model.append())
  // 2. # of grid columns within the CheckBox
  styles.defaultEntity['gridTemplateColumns'] = 'repeat(' + (props.model.prepend() + props.model.width() + props.model.append()) + ', [col] 1fr)'

  return (
    <div
    id="FormSectionComponent"
      style={styles.defaultEntity}
      // style={styles.defaultEntity}
      draggable="true"
    >
      {(props.model.prepend() > 0) ?
        <Prepend
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
        className="form-group FS"
        style={fsStyle}
        onDrop={drop_handler}
        id={props.model.UUID()}
        data-action={`mover.${props.model.UUID()}.FormSection`}
        onDragStart={dragstart_handler}
      >
        {props.model.children().map((element, i) => {
          return React.createElement(utility.lookupComponent(element), { key: i, model: element, form: props.form, removeformentity: props.removeformentity, addformentity: props.addformentity })
        })}
        <Mover
          element='FormSection'
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
        />
        <Resizer
          element='FormSection'
          model={props.model}
          form={props.form}
          removeformentity={props.removeformentity}
          addformentity={props.addformentity}
        />
      </div>
        {(props.model.append() > 0) ?
          <Append
            append={props.model.append()}
            uuid={props.model.UUID()}
          /> :
          null
        }
    </div>
  );
}

export default FormSectionComponent;