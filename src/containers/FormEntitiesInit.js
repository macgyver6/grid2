import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment } from '../actions/index';
import * as actions from '../actions/index';

class FormEntityInit extends Component {

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

  clickHandler(input, event) {
    // event.preventDefault()
    this.props.addformentity(input)
    // console.log(payload)
  }

  render() {
    return (
      <div>
      <button
        className="btn btn-success"
        onClick={this.clickHandler.bind(this, 'TextInput')}>
        Add Text Input
        </button>

        <button
        className="btn btn-danger"
        onClick={this.clickHandler.bind(this, 'TextArea')}>
        Add Text Area
        </button>
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  return { state };
}

FormEntityInit = connect(mapStateToProps, actions)(FormEntityInit)

export default FormEntityInit;