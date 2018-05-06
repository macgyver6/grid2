import React from 'react';
import { helpers } from '../../helpers';
import { drop } from '../../drop';
import Resizer from './subentities/Resizer';
import { styleDefaultEntity } from './feStyles';
import Append from './subentities/Append.js';
import Prepend from './subentities/Prepend.js';
import PrePrompt from './subentities/PrePrompt.js';
import PostPrompt from './subentities/PostPrompt.js';
import { log } from 'util';
import { address } from '../../address';
import { utility } from '../../validation/val.utility';
import { FormInput } from '../../data/FormInput';
import { entityActions } from './actions.entities';

const EchoComponent = props => {
  const mouseDown_handler = event =>
    entityActions.mouseDown_handler(event, props);

  let dragstart_handler = event =>
    entityActions.dragstart_handler(event, props);

  let dragOver_handler = event => entityActions.dragOver_handler(event, props);

  let drop_handler = event => entityActions.drop_handler(event, props);

  let dragleave_handler = event =>
    entityActions.dragleave_handler(event, props);

  const click_handler = event => entityActions.click_handler(event, props);

  const tBStyle = {
    //     margin: helpers.marginCalc(props),
    backgroundColor: 'orange',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    height: '40px',
    cursor: 'move',
    // border: '1px solid red',
    padding: '4px',
    borderRadius: '2px'
  };

  const tBInputStyle = {
    height: '25px',
    width: '80%'
  };

  return (
    <div
      id={`${props.model.UUID()}.${props.model.type()}.wrapper`}
      style={styleDefaultEntity(props.model)}
      onDragOver={dragOver_handler}
      onDrop={drop_handler}
      onDragLeave={dragleave_handler}
      onClick={click_handler}
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
        onDragStart={dragstart_handler}
        draggable="false"
      >
        <br />
        <input
          style={tBInputStyle}
          className="form-control"
          type={props.model.type()}
          disabled="disabled"
          value={
            props.model.sourceInput() !== ''
              ? props.model.sourceInput() + ` value`
              : ''
          }
        />
        {/*console.log(
          props.model.sourceInput() === ''
            ? ''
            : utility
                .findAll(
                  props.form,
                  e =>
                    typeof e.promptNumber === 'function' &&
                    e.promptNumber() === props.model.sourceInput()
                )[0]
                .defaultContent()
        )} */}
        <Resizer
        resizeType="width"
        element="FormEntity"
          uuid={props.model.UUID()}
          className="resizer"
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
          mutate={props.mutate}
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

export default EchoComponent;
