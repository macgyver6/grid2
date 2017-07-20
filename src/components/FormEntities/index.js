import React, { Component } from 'react';
import { connect } from'react-redux';
import TextInput  from './TextInput/TextInput';
import store from '../../store';

const FormEntitiesList = (props) => {

   let formEntities = 
    props.form.map((element, i) => {
       return <TextInput key={i} element = {element}/>
    })
  return <div>{ formEntities }</div>
}

export default FormEntitiesList;