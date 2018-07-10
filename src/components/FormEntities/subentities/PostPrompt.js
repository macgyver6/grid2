import React from 'react';
import Resizer from './Resizer';
import { entityActions } from '../actions.entities';
import { entityStyle, inputStyle } from '../feStyles';
import { defaultPropsFE, initFE } from '../../../constants/defaultPropsFE';

const PostPrompt = props => {
  const postPromptStyle = {
    ...entityStyle(props.model),
    gridTemplateColumns: 'repeat(' + `${props.model.postPromptWidth()}` + ', [col] 1fr)',
    gridColumn: `span ${props.model.postPromptWidth()}`,
    // backgroundColor: 'white',
    // padding: '4px',
    border: `1px solid ${initFE[`${props.model.type()}`].render.backgroundColor}`,
    // backgroundColor: `${initFE[`${props.model.type()}`].render.backgroundColor}`,
    borderRadius: '2px',
    maxHeight: '',
    wordBreak: 'break-all',
  };

  const postPromptInputStyle = {
    position: 'absolute',
    // right: 16,
    bottom: 7,
    height: '20px',
    width: '80%',
  };

  const mouseDown_handler = event => entityActions.mouseDown_handler(event, props);

  return (
    <div
      style={postPromptStyle}
      id={`${props.model.UUID()}.postPrompt`}
      onMouseDown={mouseDown_handler} // to set intitial mouse click loc
    >
      {/*props.model.prePromptWidth() < 2 ? null : (
        <p
          style={{
            // paddingTop: '8px',
            margin: '0px',
            gridColumn: `span ${props.model.postPromptWidth()}`,
          }}
          className="form-control"
        >
          {props.model.postPrompt()}
        </p>
      )*/}
      {props.model.postPrompt()}
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
        resizeType="postPromptWidth"
      />
    </div>
  );
};

export default PostPrompt;
