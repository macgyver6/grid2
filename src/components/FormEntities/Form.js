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

    let bgrndGrdWidth = (document.getElementById('0.bgrndGrd').clientWidth + 8)
    const offsetE1 = data.dragInit;
    const appendGrids = round(((event.clientX - document.getElementById('form').getBoundingClientRect().left) / bgrndGrdWidth), 0)
    if (data && data.action === 'addEntity') {
      console.log('addEntity to top level formsection: ', data)
      let formEntity = utility.findNode(props.form, props.form)
      // adding to tab FormSection
      // let parentPx = document.getElementById(`${props.model.UUID()}.${props.model.type()}`).clientWidth
      console.log(bgrndGrdWidth, event.clientX, appendGrids)
      // const appendGrids = round(((event.clientX - document.getElementById('form').left) / bgrndGrdWidth), 0)
      let entityToAdd = utility.resurrectEntity(
        Object.assign({},
          data.model, {
            prepend: appendGrids,
            width: defaultPropsFE[data.model.type].width,
            append: props.form.children()[props.activeTab].width() - appendGrids - defaultPropsFE[data.model.type].width
          })
      )
      const whereToAdd = [props.activeTab, props.form.children()[props.activeTab].children().length]
      // whereToAdd.concat(props.activeTab)
      console.log(whereToAdd, entityToAdd)
      // @hack - only adds to position 0 at this point
      // formEntity.push(0)

      props.addformentity(entityToAdd, whereToAdd)

      // const div = document.getElementById(props.model.UUID());
      // div.style.backgroundColor = 'rgba(243, 234, 95, 0.7)'
      // event.target.style.backgroundColor = 'rgba(243, 234, 95, 0.7)'
    }

    if (data && data.action === 'move') {
      const appendGridsEOffset = round(((event.clientX - document.getElementById('form').getBoundingClientRect().left - offsetE1) / bgrndGrdWidth), 0)

      let draggedEntity = utility.findEntityByPath(props.form, data.address)

      let entityToAdd = utility.resurrectEntity(
        Object.assign({},
          draggedEntity.properties(), {
            prepend: appendGridsEOffset,
            append: (24 - appendGridsEOffset - draggedEntity.width())
          })
      )
      const whereToAdd = [props.activeTab, props.form.children().length]

      props.addformentity(entityToAdd, whereToAdd)
      props.removeformentity(data.address)
    }
  }

  const dragover_handler = (event) => {
    event.preventDefault();
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
      id={i + '.' + 'bgrndGrd'}
      style={bgrndGrd}>{i + 1}</div>)
  }

  return (
    <div
      className='wrapper'
      id={`form`}
      style={divStyle}
      onDrop={drop_handler}
      onDrag={drag_handler}
      onDragOver={dragover_handler}
    >

      <div className="grid" >
      {/* loop through and render all children entities of top level section */}
      {console.log(props.form.children())}
        {
          props.form.children()[props.activeTab].children().map((element, i) => {
            return React.createElement(utility.lookupComponent(element),
              {
                key: i,
                model: element,
                form: props.form,
                removeformentity: props.removeformentity,
                addformentity: props.addformentity,
                mutateformentity: props.mutateformentity
              }
            )
          })
        }
      </div>
      <div className="grid grid_background">
        {bgColumns}
      </div>
    </div>
  );
}

export default FormComponent;