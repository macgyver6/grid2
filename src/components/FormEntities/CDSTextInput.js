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
import { PrismCode } from 'react-prism';
import 'prismjs';
import 'prismjs/themes/prism.css';
import { highlight, languages } from 'prismjs';
import { entityActions } from './actions.entities';

RegexColorizer.colorizeAll();

const CDSTextInputComponent = props => {
  const mouseDown_handler = event =>
    entityActions.mouseDown_handler(event, props);

  let dragstart_handler = event =>
    entityActions.dragstart_handler(event, props);

  let dragOver_handler = event => entityActions.dragOver_handler(event, props);

  let drop_handler = event => entityActions.drop_handler(event, props);

  let dragleave_handler = event =>
    entityActions.dragleave_handler(event, props);

  const click_handler = event => entityActions.click_handler(event, props);

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
    minHeight: '100px',
    zIndex: '40',
    cursor: 'move'
  }; // maxHeight: '100px',

  const tiStyle = {
    // //     margin: helpers.marginCalc(props),
    backgroundColor: 'blue',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    minHeight: '100px',
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
        backgroundColor="blue"
      />

      <div
        style={tiStyle}
        id={`${props.model.UUID()}.${props.model.type()}`}
        className="TextInput"
        onMouseDown={mouseDown_handler}
        onDragStart={dragstart_handler}
        draggable="false"
      >
        <br />

        <PrismCode>
          <p>{props.model.script()}</p>
        </PrismCode>
        {/* <textarea
          className="form-control"
          placeholder="Write something in text area"
          name={props.model.name()}
          rows="5"
          cols="12"
          value={highlight(
            props.model.script(),
            languages.javascript,
            'javascript'
          )}
        /> */}
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
          backgroundColor="blue"
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

export default CDSTextInputComponent;
