import React from 'react';
import { helpers } from '../../helpers';
import { drop } from '../../drop';
import Resizer from './subentities/Resizer';
import { entityWrapperStyle, entitySubWrapperStyle, entityStyle, inputStyle } from './feStyles';
import Append from './subentities/Append.js';
import Prepend from './subentities/Prepend.js';
import PrePrompt from './subentities/PrePrompt.js';
import PostPrompt from './subentities/PostPrompt.js';
import { log } from 'util';
import { address } from '../../address';
import { entityActions } from './actions.entities';
import AddToEnd from './subentities/AddToEnd.js';
import { initFE } from '../../constants/defaultPropsFE';

const SelectionInputComponent = props => {
  const mouseDown_handler = event => entityActions.mouseDown_handler(event, props);

  const dragstart_handler = event => entityActions.dragstart_handler(event, props);

  const dragOver_handler = event => entityActions.dragOver_handler(event, props);

  const drop_handler = event => entityActions.drop_handler(event, props);

  const dragleave_handler = event => entityActions.dragleave_handler(event, props);

  const click_handler = event => entityActions.click_handler(event, props);

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

  const total = entity =>
    entity.prepend() +
    (entity.prePromptWidth ? entity.prePromptWidth() : 0) +
    entity.width() +
    entity.append() +
    (entity.postPromptWidth ? entity.postPromptWidth() : 0);
  const entityAddress = address.bySample(props.model, props.form);

  const lastInRow = entityAddress => {
    const section = address.byPath(props.form, entityAddress.slice(0, entityAddress.length - 1));
    // console.log(entityAddress )
    const _entityAddress = entityAddress[entityAddress.length - 1];
    const entity = address.byPath(props.form, entityAddress);
    // if (entityAddress[entityAddress.length - 1] === 0 && total(entity) !== props.model.width()) {
    //   return false;
    // }
    var runningTotal = 0;
    // console.log(_entityAddress, section.children())
    for (var i = 0; i <= _entityAddress; ++i) {
      // console.log(section)
      runningTotal += total(section.children()[i]);
    }
    console.log(runningTotal % section.width());
    return runningTotal % section.width() === 0 ? true : false;
  };

  return (
    <div
      id={`${props.model.UUID()}.${props.model.type()}.wrapper`}
      style={entityWrapperStyle(props.model)}
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
        id={`${props.model.UUID()}.${props.model.type()}.subWrapper`}
        style={{
          ...entitySubWrapperStyle(props.model),
          ...(props.selected
            ? { boxShadow: `3px 3px ${initFE[`${props.model.type()}`].render.backgroundColor} ` }
            : {}),
          // border: 'solid green 1px',
        }}
        onMouseDown={mouseDown_handler} // to set intitial
        draggable="false"
      >
        {props.model.prePromptWidth() > 0 ? (
          <PrePrompt
            id={`${props.model.UUID()}.prepend`}
            prePromptWidth={props.model.prePromptWidth()}
            temporalStateChange={props.temporalStateChange}
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
          style={{
            ...entityStyle(props.model),
            // minHeight: '20px',
          }}
          id={`${props.model.UUID()}.${props.model.type()}`}
          className="SelectionInput"
          onMouseDown={mouseDown_handler}
        >
          {props.model.renderMode() === 'selection' ? (
            <select
              style={{ ...inputStyle(props.model), height: '18px' }}
              className="form-control"
              type={props.model.type()}
            >
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
        {props.model.postPromptWidth() > 0 ? (
          <PostPrompt
            id={`${props.model.UUID()}.prepend`}
            postPromptWidth={props.model.postPromptWidth()}
            temporalStateChange={props.temporalStateChange}
            uuid={props.model.UUID()}
            className="prepend"
            model={props.model}
            form={props.form}
            remove={props.remove}
            add={props.add}
            mutate={props.mutate}
          />
        ) : null}
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
      {lastInRow(entityAddress) ? (
        <AddToEnd
          model={props.model}
          form={props.form}
          add={props.add}
          remove={props.remove}
          mutate={props.mutate}
          temporalStateChange={props.temporalStateChange}
          addToEndAction="insertInPlace"
          appState={props.appState}
        />
      ) : null}
    </div>
  );
};

export default SelectionInputComponent;
