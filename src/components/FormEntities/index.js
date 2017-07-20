import React, { Component } from 'react';
import { connect } from'react-redux';
import TextInput  from './TextInput/TextInput';
import store from '../../store';

const FormEntitiesList = (props) => {
  return (
    <TextInput form={props.form} />
    // <h1>FormEntitiesList</h1>
  )
}

// class FormEntitiesContainer extends Component {

//   render() {
//     // console.log(this.props)
//     return (
//       <p>FormEntitiesContainer</p>
//     )
//   }
// }

export default FormEntitiesList;