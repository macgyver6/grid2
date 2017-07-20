import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextInput  from './FormEntities/TextInput/TextInput';
import FormEntitiesList  from './FormEntities/index';
import SimpleComponent from './SimpleComponent'
import * as actions from '../actions/index';

class App extends Component {

  render() {
    return (
      <div className="container">
        <p>Value: <span>{ this.props.value }</span></p>
          <button
          className="btn btn-success"
          onClick={ this.props.onIncrement }
        >+</button>
        <button
          className="btn btn-success"
          onClick={ this.props.onDecrement }
        >-</button>
        <div className="components">
           <button
          className="btn btn-success"
          onClick={ this.props.addFormEntity }
        >Add Text Input</button>
        {/* {this.props.form.length > 0 ? 
        <FormEntitiesList form={this.props.form}/> :
        
        <p>no form entities</p> */}
        <SimpleComponent stuff={this.props}/>
        }
          
        </div> 
      </div> 

    )
  }
}

const mapStateToProps = (state) => {
  return { data: state };
}

export default connect(mapStateToProps, actions)(App);