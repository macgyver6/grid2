import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import defaultProps from '../constants/defaultPropsFI';
import TextInputComponent from '../components/FormEntities/TextInput';
import TextAreaComponent from '../components/FormEntities/TextArea';
import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';

class FormEntityInit extends Component {
  constructor(props) {
    super();
    // this.mapComponent = this.mapComponent.bind(this);
  }

  mapComponent(modelInstance)
  {
    console.log('mapComponent hit modelInstance ', modelInstance)
    if (modelInstance instanceof TextInput)
    {
      console.log('TextInputComponent')
      return TextInputComponent;
    }
    else if (modelInstance instanceof TextArea) {
      return TextAreaComponent;
    }
  }

  /* 
  1. Set the default spec as consts for each type
  2. dispatches action 'initformentity'
  3. action sends properties as payload to API - input
  4. API output is TextInput Object
  5. Add TextInput Object to store
  6. FormEntitiesRender is the template for the inputs
*/
  componentDidMount() {

  }

  // clickHandler(input, event) {
  //   // event.preventDefault()
  //   this.props.addformentity(input)
  //   // console.log(payload)
  // }

  render() {
    return (
      <div>
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
        React.createElement(this.mapComponent(element), { key: i, model: element }))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { store : state };
}

FormEntityInit = connect(mapStateToProps, actions)(FormEntityInit)

export default FormEntityInit;