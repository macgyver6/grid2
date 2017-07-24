import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import FormEntityInit from '../containers/FormEntitiesInit.js';

class App extends Component {

  render() {

    return (
      <div className="container">
        <p>Value: <span>{this.props.store.model.value}</span></p>
        <button
          className="btn btn-success"
          onClick={this.props.increment}
        >+</button>
        <button
          className="btn btn-success"
          onClick={this.props.decrement}
        >-</button>
        <FormEntityInit />
        <button 
          type="button" 
          className="btn btn-primary btn-lg btn-block"
          onClick={this.props.savestate}>
          Save Model State
          </button>
        <button 
          type="button" 
          className="btn btn-success btn-lg btn-block"
          onClick={this.props.loadstate}>
          Load Model State
          </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { store: state };
}

export default connect(mapStateToProps, actions)(App);