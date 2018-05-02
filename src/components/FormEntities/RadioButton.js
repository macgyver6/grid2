import React from 'react';
import {helpers} from '../../helpers';
import {drop} from '../../drop';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append';
import {styleDefaultEntity} from './feStyles';
import Prepend from './subentities/Prepend.js';
import {address} from '../../address';
import PrePrompt from './subentities/PrePrompt.js';
import PostPrompt from './subentities/PostPrompt.js';
import {entityActions} from './actions.entities';
// import './default-stylesheet.css' import './index.js'

const RadioButtonComponent = props => {
  const mouseDown_handler = event => entityActions.mouseDown_handler(event, props);

  let dragstart_handler = event => entityActions.dragstart_handler(event, props);

  let dragOver_handler = event => entityActions.dragOver_handler(event, props);

  let drop_handler = event => entityActions.drop_handler(event, props);

  let dragleave_handler = event => entityActions.dragleave_handler(event, props);

  const click_handler = event => entityActions.click_handler(event, props);

  const rbStyle = {
    backgroundColor: '#304061',
    position: 'relative',
    gridColumn: `span ${props
      .model
      .width()}`,
    height: '40px',
    //     margin: helpers.marginCalc(props),
    borderRadius: '2px',
    padding: '4px'
  };

  return (
    <div
      id={`${props
      .model
      .UUID()}.${props
      .model
      .type()}.wrapper`}
      style={styleDefaultEntity(props.model)}
      onDragOver={dragOver_handler}
      onDrop={drop_handler}
      onClick={click_handler}
      onDragStart={dragstart_handler}
      >
      {props
        .model
        .prepend() > 0
        ? (<Prepend
          id={`${props
          .model
          .UUID()}.prepend`}
          prepend={props
          .model
          .prepend()}
          uuid={props
          .model
          .UUID()}
          className="prepend"
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
          mutate={props.mutate}/>)
        : null}
      <PrePrompt
        id={`${props
        .model
        .UUID()}.prepend`}
        prePromptWidth={props
        .model
        .prePromptWidth()}
        uuid={props
        .model
        .UUID()}
        className="prepend"
        model={props.model}
        form={props.form}
        remove={props.remove}
        add={props.add}
        mutate={props.mutate}
        backgroundColor="rgb(48, 64, 97)"/>

      <div id={`${props
        .model
        .UUID()}.${props
        .model
        .type()}`} style={rbStyle} className="RadioButton" onMouseDown={mouseDown_handler}
        onDragStart={dragstart_handler}
        // draggable="true"
      >
        <form action="">
          {/* <input type="radio" name="_value" value="yes" /> Yes<br />
    <input type="radio" name="_value" value="no" /> No<br /> */}
          <div className="fancy-radio-wrapper">
            <div className="fancy-radio-inner">
              <input type="radio" id="gl1" name="good_language" value="js"/>

              <label className="label" for="gl1">Javascript</label>
              <input type="radio" id="gl2" name="good_language" value="scheme"/>
              <label className="label" for="gl2">Scheme</label>

              <input type="radio" id="gl3" name="good_language" value="clojure"/>
              <label className="label" for="gl3">Clojure</label>
            </div>
          </div>
        </form>
        <Resizer
          id={`${props
          .model
          .UUID()}.resizer`}
          element="FormEntity"
          uuid={props
          .model
          .UUID()}
          className="resizer"
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
          mutate={props.mutate}
          resizeType="width"/>
      </div>
      {props
        .model
        .postPromptWidth() > 0
        ? (<PostPrompt
          id={`${props
          .model
          .UUID()}.prepend`}
          postPromptWidth={props
          .model
          .postPromptWidth()}
          uuid={props
          .model
          .UUID()}
          className="prepend"
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
          mutate={props.mutate}
          backgroundColor="rgb(48, 64, 97)"/>)
        : null}
      {props
        .model
        .append() > 0
        ? (<Append
          id={`${props
          .model
          .UUID()}.append`}
          append={props
          .model
          .append()}
          uuid={props
          .model
          .UUID()}
          className="append"
          model={props.model}
          form={props.form}
          remove={props.remove}
          add={props.add}
          mutate={props.mutate}/>)
        : null}
    </div>
  );
};

export default RadioButtonComponent;
