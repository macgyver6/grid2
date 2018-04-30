import React from 'react';
import { helpers } from '../../helpers';
import { drop } from '../../drop';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append';

import { styleDefaultEntity } from './feStyles';
import Prepend from './subentities/Prepend.js';
import PrePrompt from './subentities/PrePrompt.js';
import PostPrompt from './subentities/PostPrompt.js';
import { address } from '../../address';

const TextAreaComponent = props => {
  /** Handle adding/subtracing prepend or append */
  const mouseDown_handler = event => {
    drop.mouseDown_handler(event, props, 'move');
  };

  /** Set dataTransfer in the case the entity is dropped on target:
   * 1. Moving to different form section
   * 2. Deleting a form section
   */
  let dragstart_handler = function(event) {
    helpers.dragStart_handler(event, props.model, props.form, 'move');
  };

  let dragOver_handler = event => {
    event.preventDefault();
  };

  let drop_handler = event => {
    drop.drop_handler(event, props);
  };

  const taStyle = {
    //     margin: helpers.marginCalc(props),
    backgroundColor: '#205EE2',
    opacity: '1',
    gridColumn: `span ${props.model.width()}`,
    position: 'relative',
    height: '40px',
    borderRadius: '2px',
    padding: '4px'
  };

  const click_handler = event => {
    event.stopPropagation();
    props.temporalStateChange({
      currententity: address.bySample(props.model, props.form)
    });
  };

  return (
    <div
      id={`${props.model.UUID()}.${props.model.type()}.wrapper`}
      style={styleDefaultEntity(props.model)}
      onDragOver={dragOver_handler}
      onDrop={drop_handler}
      onClick={click_handler}
      onDragStart={dragstart_handler}
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
      />

      <div
        id={`${props.model.UUID()}.${props.model.type()}`}
        style={taStyle}
        className="TextArea"
        onMouseDown={mouseDown_handler}
        // onDragStart={dragstart_handler}
        // draggable="true"
      >
        <textarea
          className="form-control"
          placeholder="Write something in text area"
          name={props.model.name()}
          rows={props.model.numRows()}
          cols={props.model.numColumns()}
          type={props.model.type()}
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
      />
    ) : null}

      {props.model.append() > 0 ? (
        <Append
          id={`${props.model.UUID()}.append`}
          append={props.model.append()}
          uuid={props.model.UUID()}
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

export default TextAreaComponent;
