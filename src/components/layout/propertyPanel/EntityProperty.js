import React, { Component } from 'react';

const entityProperties = {
  marginBottom: '16px',
  marginLeft: '20px',
  border: '1px solid green',
  padding: '6px'
};


class EntityProperty extends Component {

  render() {
    return (
      <div style={entityProperties}>
        <p>Here Entity Property</p>
      </div>
    );
  }
}


export default EntityProperty;
