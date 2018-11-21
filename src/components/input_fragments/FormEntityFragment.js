import React, { Component } from 'react';
import { helpers } from '../../lib/helpers';
import { entityStyle } from '../styles/formEntityStyles';
import Resizer from '../subentities/Resizer';
import { address } from '../../lib/address';

class FormEntityFragment extends Component {
  render(props) {
    return (
      <div
        style={{ ...entityStyle(this.props.model.width), maxHeight: '' }}
        id={`${this.props.model.id}.${this.props.model.type}`}
        className="TextInput"
      >
        {React.createElement(
          address.lookupFragment(this.props.entityComponent),
          {
            model: this.props.model,
            sectionUUID: this.props.sectionUUID,
            children: this.props.children,
          }
        )}

        {/* <this.props.entityComponent model={this.props.model} sectionUUID={this.props.sectionUUID}>
          {this.props.children}
        </this.props.entityComponent> */}
      </div>
    );
  }
}

export default FormEntityFragment;
