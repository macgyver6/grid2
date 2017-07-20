import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput from './FormEntities/TextInput/TextInput';
import FormEntitiesList from './FormEntities/index';
import SimpleComponent from './SimpleComponent'
import * as actions from '../actions/index';
import FormEntityInit from '../containers/FormEntitiesInit.js';

class App extends Component {
  render() {

    return (
      <div className="container">
        <p>Value: <span>{this.props.data.formData.value}</span></p>
        <button
          className="btn btn-success"
          onClick={this.props.increment}
        >+</button>
        <button
          className="btn btn-success"
          onClick={this.props.decrement}
        >-</button>
        <div className="components">


          <SimpleComponent stuff={this.props} />

          <FormEntityInit />

          {this.props.data.formData.form.length > 0 ?
            <FormEntitiesList form={this.props.data.formData.form} /> :

            <p>no form entities</p>}

        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
  return { data: state };
}

export default connect(mapStateToProps, actions)(App);