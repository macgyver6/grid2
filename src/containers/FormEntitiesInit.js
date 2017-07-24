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
        {this.props.store.model.form[0] ? <p>There is stuff {this.props.store.model.form.length}</p> : null}
        {this.props.store.model.form.map((element, i) => {
          return <p>{element._name}</p>
        })}

        {this.props.store.model.form.map((element, i) =>
          <p>{element._width}</p>)}

        {/* {this.props.store.model.form.map((element, i) => {

          if(element._name === 'TextInput') {
            return <TextInput key = {i} model = {element} />
          } else if(element._name === 'TextArea') {
            return <TextArea key = {i} model = {element}/>
          }
            })} */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { store: state };
}

FormEntityInit = connect(mapStateToProps, actions)(FormEntityInit)

export default FormEntityInit;