import React from 'react';
import FormSectionComponent from './FormSection'
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';

const FormComponent = (props) => {
  let type = null
  const resize = {
    init: null,
    changed: null
  }
  let mouseDownHandler = (event) => {
    type = (event.target.className).split('.');
    if (type[0] === 'resizer' || type[0] === 'mover') {
      event.preventDefault();
      event.stopPropagation();
      resize.init = event.screenX;
      document.getElementById(type[1]).addEventListener('mouseup', mouseUpHandler);
    }
  }
  function mouseUpHandler(event) {
    let locEntity = utility.findEntityUuid(type[1], props.form)
    console.log(locEntity)
    resize.changed = event.screenX;
    let initGrid = {
      width: null,
      append: null,
      prepend: null
    }
    if (type[2] === 'FormSection') {
      initGrid.width = locEntity[1].width()
      initGrid.prepend = locEntity[1].prepend()
      initGrid.append = locEntity[1].append()
    } else {
      initGrid.width = props.model.children()[locEntity[locEntity.length - 1]].width(),
        initGrid.append = props.model.children()[locEntity[locEntity.length - 1]].append(),
        initGrid.prepend = props.model.children()[locEntity[locEntity.length - 1]].prepend()
    }

    let initDiff = resize.changed - resize.init
    let fsWidth = parseInt((document.getElementById(type[1]).clientWidth / locEntity[1].width()), 10)
    let diffGrid = (parseInt(((Math.abs(initDiff)) / fsWidth), 10) + 1)
    if (type[0] === 'resizer' & (Math.abs(initDiff)) > 20) {
      var calcOpp = {
        FormEntity: {
          '+': (a, b) => Object.assign({}, { width: initGrid.width + diffGrid, append: initGrid.append - diffGrid }),
          '-': (a, b) => Object.assign({}, { width: initGrid.width - diffGrid, append: initGrid.append + diffGrid })
        },
        FormSection: {
          '+': (a, b) => Object.assign({}, { width: initGrid.width + diffGrid }),
          '-': (a, b) => Object.assign({}, { width: initGrid.width - diffGrid })
        }
      }
      const calc = ((newWidth) => {
        let entityToChange = null
        type[2] === 'FormSection' ?
          entityToChange = locEntity[1] :
          entityToChange = locEntity[1].children()[locEntity[locEntity.length - 1]]
          console.log(entityToChange.properties)
        props.removeformentity(locEntity[0])
        return props.addformentity(utility.resurrectEntity(
          Object.assign({},
            entityToChange.properties(), newWidth)
        ), locEntity[0])
      })
      if (initDiff > 0) {
        calc(calcOpp[type[2]]['+'](initGrid, diffGrid))
      } else {
        calc(calcOpp[type[2]]['-'](initGrid, diffGrid))
      }
    }
    if (type[0] === 'mover' & (Math.abs(initDiff)) > 20) {
      var calcOpp = {
        '+': (a, b) => Object.assign({}, { prepend: initGrid.prepend + diffGrid, append: initGrid.append - diffGrid }),
        '-': (a, b) => Object.assign({}, { prepend: initGrid.prepend - diffGrid, append: initGrid.append + diffGrid }),
      }
      const calcMover = ((newWidth) => {
        let entityToChange = props.model.children()[locEntity[locEntity.length - 1]]

        props.removeformentity(locEntity[0])
        return props.addformentity(utility.resurrectEntity(
          Object.assign({},
            entityToChange.properties(), newWidth)
        ), locEntity)
      })
      if (initDiff > 0) {
        calcMover(calcOpp['+'](initGrid, diffGrid))
      } else {
        calcMover(calcOpp['-'](initGrid, diffGrid))
      }
    }
    document.getElementById(type[1]).removeEventListener('mouseup', mouseUpHandler);
  }

  const drop_handler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let data = event.dataTransfer.getData("text");
    let entityToAdd = utility.resurrectEntity(defaultPropsFE[data])
    let location = utility.findNode(props.form, props.form)
    location.push(props.activeTab - 1)
    // @hack - only adds to position 0 at this point
    location.push(0)
    console.log(location)
    props.addformentity(entityToAdd, location)
  }

  const dragover_handler = (event) => {
    event.preventDefault();
  }

  const dragleave_handler = (event) => {
    event.preventDefault();
  }

  const divStyle = {
    margin: '20px',
    position: 'relative',
    gridTemplateColumns: `repeat(24, [col] 1fr)`,
    gridTemplateRows: `[row] auto`,
    gridGap: '8px',
    zIndex: '10',
  }

  const bgrndGrd = {
    "padding": "0px",
    "margin": "0px",
    "fontSize": "12",
    "color": "grey",
    "textAlign": "center",
    "backgroundColor": "lightgrey",
    "zIndex": "15",
    "height": "100vh"
  }

  const bgColumns = []

  for (var i = 0; i < 24; i++) {
    bgColumns.push(<div style={bgrndGrd}>{i+1}</div>)
  }

  return (
    <div
      className='wrapper'
      style={divStyle}
      onDrop={drop_handler}
      onDragOver={dragover_handler}
      onDragLeave={dragleave_handler}
      onMouseDown={(e) => mouseDownHandler(e, props)}
    >
      <div className="grid" >
        {/* if sectionTabs are turned on - map through and render the FormSection */}

        {props.form.sectionTabs() === true ?
          props.form.children()[props.activeTab - 1].children().map((formSection, i) => {
            return <FormSectionComponent
              key={i}
              model={formSection}
              form={props.form}
              removeformentity={props.removeformentity}
              addformentity={props.addformentity}
            />
          })
      // if sectionTabs are turned off - map through and render the element
          : props.form.children().map((element, i) => {
            return React.createElement(FormSectionComponent, { key: i, model: element, form: props.form, removeformentity: props.removeformentity, addformentity: props.addformentity })
          })}
      </div>
      <div className="grid grid_background">
        {bgColumns}
      </div>
    </div>
  );
}

export default FormComponent;