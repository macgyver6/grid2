import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import defaultProps from '../constants/defaultPropsFE';
import { utility } from '../utility';

class FormEntityInit extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {

  }

  /* 
  1. Set the default spec as consts for each type
  2. dispatches action 'initformentity'
  3. action sends properties as payload to API - input
  4. API output is TextInput Object
  5. Add TextInput Object to store
  6. FormEntitiesRender is the template for the inputs
*/

  render() {
    return (
      <div>
        <h1>FormEntitiesInit</h1>

        <button
          className="btn btn-success"
          onClick={this.props.addformentity.bind(this, defaultProps.TextInput)}>
          Add Text Input
        </button>

        <button
          className="btn btn-danger"
          onClick={this.props.addformentity.bind(this, defaultProps.TextArea)}>
          Add Text Area
        </button>

        {this.props.store.model.form.map((element, i) =>
          React.createElement(utility.lookup(element), { key: i, model: element }))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { store: state };
}

FormEntityInit = connect(mapStateToProps, actions)(FormEntityInit)

export default FormEntityInit;