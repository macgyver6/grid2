import React from 'react';
import { helpers } from '../../helpers';
import { drop } from '../../drop';
import Resizer from './subentities/Resizer';
import Append from './subentities/Append';
import { styles } from './feStyles';
import Prepend from './subentities/Prepend.js';
import { address } from '../../address';
import PrePrompt from './subentities/PrePrompt.js';
import PostPrompt from './subentities/PostPrompt.js';

const RadioButtonComponent = props => {
  /** Handle adding/subtracing prepend or append */
  const mouseDown_handler = event => {
    drop.mouseDown_handler(event, props, 'move');
  };

  /** Set dataTransfer in the case the entity is dropped on target:
   * 1. Moving to different form section
   * 2. Deleting a form section
   */
  let dragstart_handler = event => {
    // event.stopPropagation();
    console.log(event.target);
    helpers.dragStart_handler(event, props.model, props.form, 'move');
  };

  let dragOver_handler = event => {
    event.preventDefault();
  };

  let drop_handler = event => {
    drop.drop_handler(event, props);
  };

  const click_handler = event => {
    event.stopPropagation();
    props.changeentity(address.bySample(props.model, props.form));
  };

  const rbStyle = {
    backgroundColor: '#304061',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    height: '100px',
    margin: helpers.marginCalc(props),
    borderRadius: '2px',
    padding: '4px'
  };

  // return actual style values
  // 1. # of grid columns the CheckBox and Append will fill
  styles.defaultEntity['gridColumn'] =
    'span ' +
    (props.model.prepend() +
      props.model.prePromptWidth() +
      props.model.width() +
      props.model.postPromptWidth() +
      props.model.append());
  // 2. # of grid columns within the TextArea
  styles.defaultEntity['gridTemplateColumns'] =
    'repeat(' +
    (props.model.prepend() +
      props.model.prePromptWidth() +
      props.model.width() +
      props.model.postPromptWidth() +
      props.model.append()) +
    ', [col] 1fr)';

  return (
    <div
      id={`${props.model.UUID()}.${props.model.type()}.wrapper`}
      style={styles.defaultEntity}
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
      />

      <div
        id={`${props.model.UUID()}.${props.model.type()}`}
        style={rbStyle}
        className="RadioButton"
        onMouseDown={mouseDown_handler}
        onDragStart={dragstart_handler}
        draggable="true"
      >
        <form action="">
          <input type="radio" name="_value" value="yes" /> Yes<br />
          <input type="radio" name="_value" value="no" /> No<br />
          <input type="radio" name="_value" value="other" /> Other
        </form>
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
        />
      </div>
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

export default RadioButtonComponent;
