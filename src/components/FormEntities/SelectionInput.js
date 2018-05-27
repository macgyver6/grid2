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
import { entityActions } from './actions.entities';

const SelectionInputComponent = props => {
  const mouseDown_handler = event => entityActions.mouseDown_handler(event, props);

  const dragstart_handler = event => entityActions.dragstart_handler(event, props);

  const dragOver_handler = event => entityActions.dragOver_handler(event, props);

  const drop_handler = event => entityActions.drop_handler(event, props);

  const dragleave_handler = event => entityActions.dragleave_handler(event, props);

  const click_handler = event => entityActions.click_handler(event, props);

  const siStyle = {
    //     margin: helpers.marginCalc(props),
    backgroundColor: 'red',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    maxHeight: '40px',
    cursor: 'move',
    padding: '4px',
    borderRadius: '2px',
  };

  const siInputStyle = {
    position: 'absolute',
    // right: 16,
    bottom: '7',
    height: '30px',
    width: '98%',
  };

  const fancyRadioStyle = {
    position: 'absolute',
    // right: 16,
    bottom: '12.5',
    height: '30px',
    width: '98%',
  };

  const SelectionRender = () => {
    <select style={siInputStyle} className="form-control" type={props.model.type()}>
      {props.model.options().map(option => <option value={option.value}>{option.label}</option>)}
      {/* <option value="value1">Value 1</option>
    <option value="value2" selected>
      Value 2
    </option>
    <option value="value3">Value 3</option> */}
    </select>;
  };

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
      {props.model.prepend() > 1 ? (
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
      {props.model.prePromptWidth() > 1 ? (
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
          backgroundColor="red"
        />
      ) : null}

      <div
        style={siStyle}
        id={`${props.model.UUID()}.${props.model.type()}`}
        className="SelectionInput"
        onMouseDown={mouseDown_handler}
      >
        <br />
        {props.model.renderMode() === 'selection' ? (
          <select style={siInputStyle} className="form-control" type={props.model.type()}>
            {props.model.options().map(option => <option value={option.value}>{option.label}</option>)}
          </select>
        ) : (
          <div className="fancy-radio-wrapper" style={fancyRadioStyle}>
            <div className="fancy-radio-inner">
              {props.model.options().map(option => [
                <input type="radio" id={option.value} name={option.value} value={option.value} />,
                <label className="label" for="gl1">
                  {option.label}
                </label>,
              ])}
            </div>
          </div>
        )}

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
      {props.model.postPromptWidth() > 1 ? (
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
          backgroundColor="red"
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

export default SelectionInputComponent;
