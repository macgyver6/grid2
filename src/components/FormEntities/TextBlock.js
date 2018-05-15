import React from 'react';
import { helpers } from '../../helpers';
import { drop } from '../../drop';
import { styleDefaultEntity } from './feStyles';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append.js';
import Prepend from './subentities/Prepend.js';
import { log } from 'util';
import { address } from '../../address';
import { entityActions } from './actions.entities';

const TextBlockComponent = props => {
  const mouseDown_handler = event => entityActions.mouseDown_handler(event, props);

  const dragstart_handler = event => entityActions.dragstart_handler(event, props);

  const dragOver_handler = event => entityActions.dragOver_handler(event, props);

  const drop_handler = event => entityActions.drop_handler(event, props);

  const dragleave_handler = event => entityActions.dragleave_handler(event, props);

  const click_handler = event => entityActions.click_handler(event, props);

  const tBStyle = {
    //     margin: helpers.marginCalc(props),
    backgroundColor: 'purple',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    height: '40px',
    cursor: 'move',
    // border: '1px solid red',
    padding: '4px',
    borderRadius: '2px',
  };

  const tBInputStyle = { height: '60%', width: '80%' };

  return (
    <div
      id={`${props.model.UUID()}.${props.model.type()}.wrapper`}
      style={styleDefaultEntity(props.model)}
      onDragOver={dragOver_handler}
      onDrop={drop_handler}
      onDragLeave={dragleave_handler}
      onClick={click_handler}
      onDragStart={dragstart_handler}
      draggable="false"
    >
      {props.model.prepend() > 0 ? (
        <Prepend
          id={`${props.model.UUID()}.prepend`}
          prepend={props.model.prepend()}
          uuid={props.model.UUID()}
          className="prepend"
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
          mutate={props.mutate}
        />
      ) : null}

      <div
        style={tBStyle}
        id={`${props.model.UUID()}.${props.model.type()}`}
        className="TextInput"
        onMouseDown={mouseDown_handler}
      >
        <br />
        <textarea
          style={tBInputStyle}
          className="form-control"
          type={props.model.type()}
          value={props.model.content()}
          cols="20"
          rows="5"
        />
        <Resizer
          id={`${props.model.UUID()}.resizer`}
          element="FormEntity"
          uuid={props.model.UUID()}
          className="resizer"
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
          mutate={props.mutate}
          resizeType="width"
        />
      </div>

      {props.model.append() > 0 ? (
        <Append
          id={`${props.model.UUID()}.append`}
          append={props.model.append()}
          className="append"
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
          mutate={props.mutate}
        />
      ) : null}
    </div>
  );
};

export default TextBlockComponent;
