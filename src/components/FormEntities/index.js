import React, { Component } from 'react';
import { connect } from'react-redux';
import TextInput  from './TextInput/TextInput';
import store from '../../store';

const mapStateToProps = state => {
  return { form: state.form }
}

const FormEntitiesList = connect(
  mapStateToProps
)(TextInput)

// class FormEntitiesContainer extends Component {

//   render() {
//     // console.log(this.props)
//     return (
//       <p>FormEntitiesContainer</p>
//     )
//   }
// }

export default FormEntitiesList;