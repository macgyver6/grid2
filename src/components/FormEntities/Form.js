import React from 'react';
import FormSectionComponent from './FormSection'
import { utility } from '../../utility';
import { defaultPropsFE } from '../../constants/defaultPropsFE';

const FormComponent = (props) => {
  let source = null
  const resize = {
    init: null,
    changed: null
  }
  let mouseDownHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    source = (event.target.className).split('.');
    if (source[0] === 'resizer' || source[0] === 'mover') {
      resize.init = event.screenX;
      document.getElementById('FormComponent').addEventListener('mouseup', mouseUpHandler);
    }
    document.getElementById('FormComponent').addEventListener('mouseup', mouseUpHandler);
  }
  function mouseUpHandler(event) {
    let locEntity = utility.findEntityUuid(source[1], props.form)
    let parentEntity = utility.findEntityByPath(props.form, locEntity[0].slice(0, locEntity.length))
    resize.changed = event.screenX;
    let initGrid = {
      width: null,
      append: null,
      prepend: null
    }
    console.log(source)
    if (source[2] === 'FormSection') {
      initGrid.width = parentEntity.width()
      initGrid.prepend = parentEntity.prepend()
      initGrid.append = parentEntity.append()
    } else {
        initGrid.width = locEntity[1].width(),
        initGrid.append = locEntity[1].append(),
        initGrid.prepend = locEntity[1].prepend()
    }
    let fsWidth2 = document.getElementById(parentEntity.UUID())

    let initDiff = resize.changed - resize.init
    let fsWidth = parseInt((document.getElementById(parentEntity.UUID()).clientWidth / parentEntity.width()), 10)
    let diffGrid = (parseInt(((Math.abs(initDiff)) / fsWidth), 10) + 1)
    if (source[0] === 'resizer' & (Math.abs(initDiff)) > 20) {
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
        source[2] === 'FormSection' ?
          entityToChange = parentEntity :
          entityToChange = locEntity[1]
        props.removeformentity(locEntity[0])
        return props.addformentity(utility.resurrectEntity(
          Object.assign({},
            entityToChange.properties(), newWidth)
        ), locEntity[0])
      })
      if (initDiff > 0) {
        calc(calcOpp[source[2]]['+'](initGrid, diffGrid))
      } else {
        calc(calcOpp[source[2]]['-'](initGrid, diffGrid))
      }
    }
    if (source[0] === 'mover' & (Math.abs(initDiff)) > 20) {
      var calcOpp = {
        '+': (a, b) => Object.assign({}, { prepend: initGrid.prepend + diffGrid, append: initGrid.append - diffGrid }),
        '-': (a, b) => Object.assign({}, { prepend: initGrid.prepend - diffGrid, append: initGrid.append + diffGrid }),
      }
      const calcMover = ((newWidth) => {
        let entityToChange = locEntity[1]
        props.removeformentity(locEntity[0])
        return props.addformentity(utility.resurrectEntity(
          Object.assign({},
            entityToChange.properties(), newWidth)
        ), locEntity[0])
      })
      if (initDiff > 0) {
        calcMover(calcOpp['+'](initGrid, diffGrid))
      } else {
        calcMover(calcOpp['-'](initGrid, diffGrid))
      }
    }
    document.getElementById('FormComponent').removeEventListener('mouseup', mouseUpHandler);
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
      id="FormComponent"
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