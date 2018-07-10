import React from 'react';
import Resizer from './Resizer';
import { entityActions } from '../actions.entities';
import { entityStyle, inputStyle } from '../feStyles';
import { defaultPropsFE, initFE } from '../../../constants/defaultPropsFE';
// import TextareaAutosize from 'react-autosize-textarea';

const PrePrompt = props => {
  const prePromptStyle = {
    ...entityStyle(props.model),
    gridTemplateColumns: 'repeat(' + `${props.model.prePromptWidth()}` + ', [col] 1fr)',
    gridColumn: `span ${props.model.prePromptWidth()}`,
    // backgroundColor: ''white'',
    // padding: '4px',
    border: `1px solid ${initFE[`${props.model.type()}`].render.backgroundColor}`,
    // backgroundColor: `${initFE[`${props.model.type()}`].render.backgroundColor}`,
    borderRadius: '2px',
    maxHeight: '',
    wordBreak: 'break-all',
    minHeight: '18px',
    alignSelf: 'start',
  };

  const mouseDown_handler = event => entityActions.mouseDown_handler(event, props);

  return (
    <div
      style={prePromptStyle}
      id={`${props.model.UUID()}.prePrompt`}
      onMouseDown={mouseDown_handler} // to set intitial mouse click loc
    >
      {/* {props.model.prePromptWidth() < 2 ? null : (
        <p
          style={{
            height: '20px',
            // paddingTop: '8px',
            overflow: 'hide',
            margin: '0px',
            gridColumn: `span ${props.model.prePromptWidth()}`,
          }}
          className="form-control"
        >
          {props.model.prePrompt()}
        </p>
      )} */}

      {props.model.prePrompt()}

      {/* <TextareaAutosize
        style={{
          ...inputStyle(props.model),
          resize: 'none',
          background: '',
          // disabled: true,
        }}
        value={props.model.prePrompt()}
        readonly
      /> */}
      <Resizer
        id="prePrompt"
        element="FormEntity"
        uuid={props.model.UUID()}
        className="resizer"
        model={props.model}
        form={props.form}
        remove={props.remove}
        add={props.add}
        mutate={props.mutate}
        resizeType="prePromptWidth"
      />
    </div>
  );
};

export default PrePrompt;
