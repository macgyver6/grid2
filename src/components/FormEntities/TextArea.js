import React from 'react';
import { utility } from '../../utility';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append';
import { styles } from './feStyles';

const TextAreaComponent = (props) => {
  let handleDelete = function (event, props) {
    let address = utility.findNode(props.model, props.form)
    props.removeformentity(address)
  }

  let handleChange = function (event, props) {
    let address = utility.findNode(props.model, props.form)
    props.removeformentity(address)
    props.addformentity(
      props.model.mutate({ width: props.model.width() - 1 }), address)
  }

  let dragend_handler = function (event) {
    event.preventDefault();
  }

  let dragstart_handler = function (event) {
    event.stopPropagation();
    event.dataTransfer.setData("text/plain", JSON.stringify(props.model.properties()));
  }
  const width = (props.model.width() + props.model.append())
  const taStyle = {
    // border: '6px dashed #c04df9',
    backgroundColor: '#2bd1fc',
    opacity: '1',
    gridColumn: `span ${props.model.width()}`,
    position: 'relative',
    maxHeight: '100px',
  }

  // return actual style values
    // 1. # of grid columns the TextArea and Append will fill
  styles.defaultEntity['gridColumn'] = 'span ' + (props.model.width() + props.model.append())
    // 2. # of grid columns within the TextArea
  styles.defaultEntity['gridTemplateColumns'] = 'repeat(' + (props.model.width() + props.model.append()) + ', [col] 1fr)'

  return (
    <div style={styles.defaultEntity}>
      <div style={taStyle}
        /* ref={elem => TA = elem} */
        draggable="true"
        onDragEnd={dragend_handler}
        onDragStart={dragstart_handler}
      >
        {/* onClick={(e) => handleChange(e, props)} */}
        <textarea className="form-control" placeholder="Write something in text area" name={props.model.name()} rows={props.model.numRows()} cols={props.model.numColumns()} type={props.model.type()}>
        </textarea>
        <Resizer />
      </div>
      <Append append={props.model.append()} />
    </div>
  )
}

export default TextAreaComponent;