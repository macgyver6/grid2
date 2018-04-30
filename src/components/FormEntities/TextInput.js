import React from 'react';
import { helpers } from '../../helpers';
import { drop } from '../../drop';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append.js';
import Prepend from './subentities/Prepend.js';
import PrePrompt from './subentities/PrePrompt.js';
import PostPrompt from './subentities/PostPrompt.js';
import { styleDefaultEntity } from './feStyles';

import { log } from 'util';
import { address } from '../../address';
import RegexColorizer from 'regex-colorizer';

RegexColorizer.colorizeAll();

const TextInputComponent = props => {
  console.log(props.model.defaultContent());
  /** Handle adding/subtracing prepend or append */
  const mouseDown_handler = event => {
    drop.mouseDown_handler(event, props, 'move');
  };

  /** Set dataTransfer in the case the entity is dropped on target:
   * 1. Moving to different form section
   * 2. Deleting a form section
   */
  let dragstart_handler = event => {
    //  event.stopPropagation();
    //  helpers.dragStart_handler(event, props.model, props.form, 'move');
    return false; // to prevent a drag image from appearing
  };

  let dragOver_handler = event => {
    event.preventDefault();
  };

  let drop_handler = event => {
    drop.drop_handler(event, props);
  };

  let dragleave_handler = event => {
    event.stopPropagation();
    //   console.log(event.target.id)
    // if (event.target.id === `${props.model.UUID()}.${props.model.type()}.wrapper`) {
    //   console.log('event.currentTarget')
    // }
  };

  const click_handler = event => {
    event.stopPropagation();
    props.temporalStateChange({
      currententity: address.bySample(props.model, props.form)
    });
  };

  const tiWrapperStyle = {
    display: 'grid',
    gridColumn:
      'span ' +
      (props.model.prepend() +
        props.model.prePromptWidth() +
        props.model.width() +
        props.model.postPromptWidth() +
        props.model.append()),
    gridTemplateColumns:
      'repeat(' +
      (props.model.prepend() +
        props.model.prePromptWidth() +
        props.model.width() +
        props.model.postPromptWidth() +
        props.model.append()) +
      ', [col] 1fr)',
    gridGap: '8px',
    draggable: 'true',
    margin: '10px 0px 10px 0px',
    maxHeight: '40px',
    zIndex: '40',
    cursor: 'move'
  }; // maxHeight: '100px',

  const tiStyle = {
    // //     margin: helpers.marginCalc(props),
    backgroundColor: '#6C788F',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    minHeight: '40px',
    cursor: 'move',
    // gridGap: '8px',
    // border: '1px solid red',
    padding: '4px',
    borderRadius: '2px'
  };

  const tiInputStyle = {
    height: '20px',
    width: '80%'
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
      draggable="true"
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
        backgroundColor='rgb(108, 120, 143)'
      />

      <div
        style={tiStyle}
        id={`${props.model.UUID()}.${props.model.type()}`}
        className="TextInput"
        // onMouseDown={mouseDown_handler}
        // onDragStart={dragstart_handler}
        // draggable="true"
      >
        <br />
        <input
          style={tiInputStyle}
          className="form-control"
          type={props.model.type()} // maxLength={props.model.length()}
          value={props.model.defaultContent()}
          placeholder='default content'
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
        backgroundColor='rgb(108, 120, 143)'
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
    </div>
  );
};

export default TextInputComponent;
