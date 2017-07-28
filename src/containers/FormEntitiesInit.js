import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import Form  from '../components/FormEntities/Form';

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
          className="btn btn-info"
          onClick={this.props.addformentity.bind(this, defaultPropsFE.FormSection, [0])}>
          Add Form Section
        </button>

        <button
          className="btn btn-success"
          onClick={this.props.addformentity.bind(this, defaultPropsFE.TextInput, [0, 1])}>
          Add Text Input
        </button>

        <button
          className="btn btn-danger"
          onClick={this.props.addformentity.bind(this, defaultPropsFE.TextArea, [1, 0])}>
          Add Text Area
        </button>
        
        <Form form={this.props.store.model.form}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { store: state };
}

FormEntityInit = connect(mapStateToProps, actions)(FormEntityInit)

export default FormEntityInit;