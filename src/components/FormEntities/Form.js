import React from 'react';
import FormSectionComponent from './FormSection'
import { utility } from '../../utility';
import { aux } from '../../constants/aux';
import { defaultPropsFE } from '../../constants/defaultPropsFE';

const FormComponent = (props) => {
  const round = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

  let source = null
  const resize = {
    init: null,
    changed: null
  }

  let drag_handler = function (event) {
    const model = utility.findEntityByPath(props.form, [0, props.activeTab])

    console.log(event, model, props.form, resize, props)
    // aux.drag_handler(event, props.model, props.form, resize, props)
  }

  const drop_handler = (event) => {
    // event.preventDefault();
    // event.stopPropagation();
    // aux.dropMove_handler(event, props, resize)

    let data = JSON.parse(event.dataTransfer.getData("address"));
    console.log(data)

    let bgrndGrdWidth = (document.getElementById('0.bgrndGrd').clientWidth + 8)
    const offsetE1 = data.dragInit;
    const appendGrids = round(((event.clientX - event.target.getBoundingClientRect().left - offsetE1) / bgrndGrdWidth), 0)
    if (data && data.action === 'addEntity') {
      let location = utility.findNode(props.form, props.form)
      // adding to tab FormSection
      // let parentPx = document.getElementById(`${props.model.UUID()}.${props.model.type()}`).clientWidth
      let bgrndGrdWidth = document.getElementById('0.bgrndGrd').clientWidth + 8
      const appendGrids = round(((event.clientX - event.target.getBoundingClientRect().left) / bgrndGrdWidth), 0)
      console.log(appendGrids)
      let entityToAdd = utility.resurrectEntity(
        Object.assign({},
          data.model, {
            prepend: defaultPropsFE[data.model.type].prepend,
            width: defaultPropsFE[data.model.type].width,
            append: defaultPropsFE[data.model.type].append
          })
      )
      const whereToAdd = [0, props.form.children()[props.activeTab - 1].children().length]
      // whereToAdd.concat(props.activeTab)
      console.log(whereToAdd, entityToAdd)
      // @hack - only adds to position 0 at this point
      // location.push(0)
      props.addformentity(entityToAdd, whereToAdd)

      // const div = document.getElementById(props.model.UUID());
      // div.style.backgroundColor = 'rgba(243, 234, 95, 0.7)'
      // event.target.style.backgroundColor = 'rgba(243, 234, 95, 0.7)'
    }

    if (data && data.action === 'move') {
      let draggedEntity = utility.findEntityByPath(props.form, data.address)
      let location = utility.findNode(props.model, props.form)
      let entityToAdd = utility.resurrectEntity(
        Object.assign({},
          draggedEntity.properties(), {
            prepend: appendGrids,
            append: (props.model.width() - (draggedEntity.prepend() + draggedEntity.width() + appendGrids))
          })
      )
      // @hack - only adds to position 0 at this point
      location.push(0)
      props.addformentity(entityToAdd, location)
      // let initLocation = utility.findNode(utility.resurrectEntity(data.model), props.form)
      props.removeformentity(data.address)
    }
  }

  const dragover_handler = (event) => {
    event.preventDefault();
  }

  const dragleave_handler = (event) => {
    event.preventDefault();
  }

  const click_handler = (event) => {
    console.log('click')
  }

  const divStyle = {
    // backgroundColor: 'blue',
    margin: '20px',
    position: 'relative',
    gridTemplateColumns: `repeat(24, [col] 1fr)`,
    gridTemplateRows: `[row] auto`,
    gridGap: '8px',
    zIndex: '10',
    minHeight: '800px'
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
    bgColumns.push(<div
      id={i+'.'+'bgrndGrd'}
      style={bgrndGrd}>{i + 1}</div>)
  }
  // onMouseDown = {(e) => mouseDownHandler(e, props)}
  return (
    <div
      className='wrapper'
      id="FormComponent"
      style={divStyle}
      onClick={click_handler}
      onDrop={drop_handler}
      onDrag={drag_handler}
      onDragOver={dragover_handler}
    >
      {/*

      onDragLeave={dragleave_handler} */}

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
              mutateformentity={props.mutateformentity}
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