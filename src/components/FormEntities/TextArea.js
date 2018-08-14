import React from 'react';
import { helpers } from '../../helpers';
import { drop } from '../../drop';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append';
import AddToEnd from './subentities/AddToEnd.js';
import { entityWrapperStyle, entitySubWrapperStyle, entityStyle, inputStyle, calcTotal } from './feStyles';
import Prepend from './subentities/Prepend.js';
import PrePrompt from './subentities/PrePrompt.js';
import PostPrompt from './subentities/PostPrompt.js';
import { address } from '../../address';
import { entityActions } from './actions.entities';
import { initFE } from '../../constants/defaultPropsFE';

const TextAreaComponent = props => {
  const mouseDown_handler = event => entityActions.mouseDown_handler(event, props);

  const dragstart_handler = event => entityActions.dragstart_handler(event, props);

  const dragOver_handler = event => entityActions.dragOver_handler(event, props);

  const drop_handler = event => entityActions.drop_handler(event, props);

  const dragleave_handler = event => entityActions.dragleave_handler(event, props);

  const click_handler = event => entityActions.click_handler(event, props);

  const taInputStyle = {
    position: 'absolute',
    right: 16,
    bottom: 7,
    height: '20px',
    width: '82%',
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
          id={`${props.model.UUID()}.${props.model.type()}`}
          style={{
            ...entityStyle(props.model),

            maxHeight: '',
          }}
          // style={{
          //   ...entityStyle(props.model),
          //   //     margin: helpers.marginCalc(props),
          //   position: 'relative',
          //   gridColumn: `span ${props.model.width()}`,
          //   minHeight: '40px',
          //   cursor: 'move',
          //   // border: '1px solid red',
          //   padding: '4px',
          //   borderRadius: '2px',
          //   backgroundColor: '#205EE2',
          // }}
          className="TextArea"
          onMouseDown={mouseDown_handler}
        >
          <textarea
            style={{
              ...inputStyle(props.model),
              height: 'auto',
              resize: 'none',
              background: 'white',
            }}
            className="form-control"
            type={props.model.type()}
            // cols={props.model.numColumns()}
            rows={props.model.numRows()}
            // value={props.model.defaultContent()}
            disabled
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
          uuid={props.model.UUID()}
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

export default TextAreaComponent;
