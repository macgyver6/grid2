import React, { Component } from 'react';
import { helpers } from '../../lib/helpers';
import { entityStyle } from '../styles/formEntityStyles';
import Resizer from '../subentities/Resizer';

class FormEntityFragment extends Component {
  render(props) {
    return (
      <div
        style={{
          ...entityStyle(this.props.model.width),
          maxHeight: '',
        }}
        id={`${this.props.model.id}.${this.props.model.type}`}
        className="TextInput"
      >
        <this.props.entityComponent model={this.props.model}>
          {this.props.children}
        </this.props.entityComponent>{' '}
        <Resizer
          id={`${this.props.model.uuid}.resizer`}
          element="FormEntity"
          uuid={this.props.model.uuid}
          className="resizer"
          model={this.props.model}
          clickGrid={helpers.calcResizerColumn(this.props.model, 'width')}
          resizeType="width"
          style={{
            width: '5px',
            padding: '0px',
          }}
        />
      </div>
    );
  }
}

export default FormEntityFragment;
