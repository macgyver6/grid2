import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../node_modules/react-tabs/style/react-tabs.css';
import { properties } from './properties';
import { TextInputProperty } from './TextInputProperty';
import { _TextInputProperty } from './_TextInputProperty';
import { FormProperty } from './FormProperties';
import { address } from '../address';

import { _dataDefined, userDefined } from './_validations';
import DateValidationUI from './validations/dateValidationUI';
import StringValidationUI from './validations/stringValidationUI';
import IntegerValidationUI from './validations/integerValidationUI';
import FloatValidationUI from './validations/floatValidationUI';
import { Collapse } from 'react-collapse';
import Expand from '../assets/expand.js';
import { calcTotal } from '../components/FormEntities/feStyles';
import { utility } from '../validation/val.utility';
import { FormInput } from '../data/FormInput';
import PatternValidator from './validations/PatternValidation';
import ValidationWrapper from './validations/ValidationWrapper';
import DependencyWrapper from './validations/DependencyWrapper';

const PropertiesPanelStyle = {
  width: '40%',
  height: '100%',
  backgroundColor: 'lightgrey',
  border: '4px solid green',
};

export const PropertiesPanel = props => {
  const change_handler = event =>
    props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: event.target.value,
    });

  const layoutChange_handler = event => {
    props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: parseFloat(event.target.value),
      append:
        24 -
        props.model.prepend() -
        (event.target.id === 'prePromptWidth' ? parseFloat(event.target.value) : props.model.prePromptWidth()) -
        props.model.width() -
        (event.target.id === 'postPromptWidth' ? parseFloat(event.target.value) : props.model.postPromptWidth()),
      // function that calcs total width and subtracts all OTHER elements, returningt what the value should be
    });
  };

  const validationSelector_handler = event =>
    // return {
    //   validations: {
    //     ...props.model.validations(),
    //     [event.target.id]: event.target.value
    //   }
    // };

    props.mutate(address.bySample(props.model, props.form), {
      ...props.model,
      [event.target.id]: event.target.value,
    });
  // props.mutate(address.bySample(props.model, props.form), {
  //   validations: {
  //     ...props.model.validations(),
  //     [event.target.id]: event.target.value,
  //   },
  // });

  const collapse_handler = event => {
    props.temporalStateChange({
      [event.target.id]: !props.appState[event.target.id],
    });
  };

  // const dataDefined = {
  //   String: ['Pattern', 'NoOp', 'Enumeration', 'SubjectInputValidation'],
  //   Date: ['NoOp', 'Enumeration', 'Range'],
  //   Integer: ['Pattern', 'NoOp', 'Enumeration', 'Range'],
  //   Float: ['Pattern', 'NoOp', 'Enumeration', 'Range']
  // };

  const userDefinedValOptionsArr = Object.keys(_dataDefined).map(userDefinedValOption => (
    <option value={userDefinedValOption}>{userDefinedValOption}</option>
  ));

  let currentSelectedValidator = 'PatternValidator';
  const validationSelector_handler2 = event => (currentSelectedValidator = event.target.value);

  console.log(currentSelectedValidator);

  // return {
  //   validations: {
  //     ...props.model.validations(),
  //     [event.target.id]: event.target.value
  //   }
  // };

  // const collapse_handler = event => {
  //   props.temporalStateChange({
  //     [event.target.id]: !props.appState[event.target.id],
  //   });
  // };

  const tabPanelStyle = {
    padding: '10px',
  };

  return <h1> Properties Panel</h1>;
};
