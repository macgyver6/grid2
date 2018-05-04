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
import { entityActions } from './actions.entities';

const CheckBoxComponent = props => {
  console.log(props.model)
  const mouseDown_handler = event =>
    entityActions.mouseDown_handler(event, props);

  let dragstart_handler = event =>
    entityActions.dragstart_handler(event, props);

  let dragOver_handler = event => entityActions.dragOver_handler(event, props);

  let drop_handler = event => entityActions.drop_handler(event, props);

  let dragleave_handler = event =>
    entityActions.dragleave_handler(event, props);

  const click_handler = event => entityActions.click_handler(event, props);

  const cbStyle = {
    backgroundColor: 'green',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    height: '40px',
    // //     margin: helpers.marginCalc(props),
    padding: '4px',
    borderRadius: '2px'
  };

  const cbInputStyle = {
    height: '25px',
    width: '25px'
  };

  return (
    <div
      id={`${props.model.UUID()}.${props.model.type()}.wrapper`}
      style={styleDefaultEntity(props.model)}
      onDragOver={dragOver_handler}
      onDrop={drop_handler}
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
        backgroundColor="green"
      />

      <div
        id={`${props.model.UUID()}.${props.model.type()}`}
        style={cbStyle}
        className="CheckBox"
        data-type="CheckBox"
        onMouseDown={mouseDown_handler}
        onDragStart={dragstart_handler}
        draggable="false"
      >
        {/* onChange={(e) => handleChange(e, props)} */}
        <input type={props.model.type()} style={cbInputStyle} />
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
          backgroundColor="green"
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

export default CheckBoxComponent;
