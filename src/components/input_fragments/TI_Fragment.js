import React, { Component } from 'react';
import { EntityTypes } from '../../model/types';

const label = entityType => {
  const types = {
    [EntityTypes.TextInput]: 'Text Input',
    [EntityTypes.AutoSuggestInput]: 'Auto Suggest Input',
    [EntityTypes.EchoInput]: 'Echo Input',
    [EntityTypes.CDSTextInput]: 'CDS Text Input',
  };
  return types[entityType];
};
class TI_Fragment extends Component {
  render() {
    return (
      // <input
      //   style={{
      //     ...inputStyle(this.props.model),
      //     // gridRowStart: 1
      //   }}
      //   // className="form-control"
      //   type={this.props.model.type}
      //   // size="8"
      //   value={this.props.model.id}
      //   readOnly="true"
      // />
      <div
        style={{
          minHeight: '28px',
          width: '100%',
          border: '1px solid grey',
          borderRadius: '6px',
        }}
      >
        <p style={{ display: 'grid', placeItems: 'center' }}>
          {label(this.props.model.type)}
        </p>
      </div>
    );
  }
}

export default TI_Fragment;
