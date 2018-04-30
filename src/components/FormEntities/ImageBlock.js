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

const ImageBlockComponent = props => {
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
    helpers.dragStart_handler(event, props.model, props.form, 'move');
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

  const tBStyle = {
    //     margin: helpers.marginCalc(props),
    backgroundColor: 'brown',
    position: 'relative',
    gridColumn: `span ${props.model.width()}`,
    minHeight: '100px',
    cursor: 'move',
    // border: '1px solid red',
    padding: '4px',
    borderRadius: '2px'
  };

  const tBInputStyle = {
    height: '40px'
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

      <div
        style={tBStyle}
        id={`${props.model.UUID()}.${props.model.type()}`}
        className="TextInput"
        onMouseDown={mouseDown_handler}
        onDragStart={dragstart_handler}
        draggable="true"
      >
        <br />
        {props.model.title() === '' ? (
          <p>Please select an image from Image Block Property Panel</p>
        ) : (
          <img
            src={localStorage.getItem(props.model.title())}
            alt={localStorage.getItem(props.model.title())}
          />
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

export default ImageBlockComponent;