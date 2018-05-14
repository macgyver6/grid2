import React from 'react';
import { helpers } from '../../helpers';
import { drop } from '../../drop';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append.js';
import Prepend from './subentities/Prepend.js';
import PrePrompt from './subentities/PrePrompt.js';
import PostPrompt from './subentities/PostPrompt.js';
import { styleDefaultEntity } from './feStyles';
import { entityActions } from './actions.entities';
import AddToEnd from './subentities/AddToEnd.js';

import { log } from 'util';
import { address } from '../../address';
import RegexColorizer from 'regex-colorizer';

RegexColorizer.colorizeAll();

const TextInputComponent = props => {
  const mouseDown_handler = event => entityActions.mouseDown_handler(event, props);

  let dragstart_handler = event => entityActions.dragstart_handler(event, props);

  let dragOver_handler = event => entityActions.dragOver_handler(event, props);

  let drop_handler = event => entityActions.drop_handler(event, props);

  let dragleave_handler = event => entityActions.dragleave_handler(event, props);

  const click_handler = event => entityActions.click_handler(event, props);

  const tiStyle = {
    // //     margin: helpers.marginCalc(props),
    backgroundColor: '#6C788F',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    maxHeight: '40px',
    cursor: 'move',
    // gridGap: '8px',
    // border: '1px solid red',
    padding: '4px',
    borderRadius: '2px',
  };

  const tiInputStyle = {
    position: 'absolute',
    right: 16,
    bottom: 7,
    height: '20px',
    width: '82%',
  };

  const mouseUp_handler = event => {
    event.stopPropagation();
    console.log('mouseUp_handler');
  };

  return (
    <div
      id={`${props.model.UUID()}.${props.model.type()}.wrapper`}
      style={styleDefaultEntity(props.model)}
      onDragOver={dragOver_handler}
      onDrop={drop_handler}
      onDragLeave={dragleave_handler}
      onClick={click_handler} // to select the current entity for properties panel
      onMouseDown={mouseDown_handler} // to set intitial mouse click loc
      onDragStart={dragstart_handler} // returns false to prevent drag image
      onMouseUp={mouseUp_handler}
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
      <PrePrompt
        id={`${props.model.UUID()}.prepend`}
        prePromptWidth={props.model.prePromptWidth()}
        uuid={props.model.UUID()}
        className="prepend"
        model={props.model}
        form={props.form}
        remove={props.remove}
        add={props.add}
        mutate={props.mutate}
        backgroundColor="rgb(108, 120, 143)"
      />

      <div style={tiStyle} id={`${props.model.UUID()}.${props.model.type()}`} className="TextInput">
        <br />
        <input
          style={tiInputStyle}
          className="form-control"
          type={props.model.type()}
          size="8"
          value={props.model.defaultContent()}
          placeholder="default content"
        />
        <Resizer
          id="width"
          // id={`${props.model.UUID()}.resizer`}
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
      {props.model.postPromptWidth() > 0 ? (
        <PostPrompt
          id={`${props.model.UUID()}.prepend`}
          postPromptWidth={props.model.postPromptWidth()}
          uuid={props.model.UUID()}
          className="prepend"
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
          mutate={props.mutate}
          backgroundColor="rgb(108, 120, 143)"
        />
      ) : null}

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
      <AddToEnd
        model={props.model}
        form={props.form}
        add={props.add}
        remove={props.remove}
        mutate={props.mutate}
        temporalStateChange={props.temporalStateChange}
        addToEndAction="insertInPlace"
      />
    </div>
  );
};

export default TextInputComponent;
