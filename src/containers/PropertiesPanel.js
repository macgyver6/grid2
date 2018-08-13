import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../node_modules/react-tabs/style/react-tabs.css';
import { _TextInputProperty } from './_TextInputProperty';
import FormProperty from './FormProperties';
import { address } from '../address';

import { _dataDefined, userDefined } from './_validations';
import DateValidationUI from './validations/DateValidationUI';
import StringValidationUI from './validations/stringValidationUI';
import IntegerValidationUI from './validations/integerValidationUI';
import FloatValidationUI from './validations/floatValidationUI';
import Expand from '../assets/expand.js';
import { calcTotal } from '../components/FormEntities/feStyles';
import { utility } from '../validation/val.utility';
import { FormInput } from '../data/FormInput';
import PatternValidator from './validations/PatternValidation';
import ValidationWrapper from './validations/ValidationWrapper';
import DependencyWrapper from './validations/DependencyWrapper';
import { defaultPropsFE, initFE } from '../constants/defaultPropsFE';
import { TabStyle } from '../components/layout/styles/DesignBox';

export const PropertiesPanel = props => {
  console.log(props.currententity);
  const PropertiesPanelStyle = model => ({
    width: '40%',
    height: '100%',
    backgroundColor: 'white',
    // border: '4px solid lightgrey',
    ...(props.currententity ? { border: `1px solid ${initFE[`${model.type()}`].render.backgroundColor}` } : {}),
  });

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

  const showValidator = entity => {
    console.log(entity);
    switch (entity) {
      case 'TextArea':
        return false;
        break;
      case 'CheckBox':
        return false;
        break;
      case 'SelectionInput':
        return false;
        break;
      default:
        return true;
    }
  };

  const tabPanelStyle = {
    padding: '10px',
  };

  return (
    <div style={PropertiesPanelStyle(props.model)}>
      {props.currententity ? (
        <Tabs dtLocalFilesSaved={props.dtLocalFilesSaved}>
          <TabList>
            <Tab>Entity</Tab>
            <Tab dtLocalFilesSaved={props.dtLocalFilesSaved}>Form</Tab>
          </TabList>

          <TabPanel style={tabPanelStyle}>
            <div>
              <Tabs /*temporary - dev validation selectedIndex={1}*/>
                <TabList>
                  <Tab>{address.getHumanName(props.model.type())} Properties</Tab>
                  {props.model instanceof FormInput && props.model.type() !== 'autoSuggest' ? (
                    <Tab key="0">{address.getHumanName(props.model.type())} Validations</Tab>
                  ) : null}
                  {console.log(props.model.type())}
                  {props.model instanceof FormInput && props.model.type() !== 'autoSuggest' ? (
                    <Tab key="1">{address.getHumanName(props.model.type())} Dependencies</Tab>
                  ) : null}
                </TabList>
                <TabPanel add={props.add} style={tabPanelStyle}>
                  {React.createElement(address.whichEntity(address.byPath(props.form, props.currententity)), {
                    model: address.byPath(props.form, props.currententity),
                    form: props.form,
                    currententity: props.currententity,
                    mutate: props.mutate,
                    appState: props.appState,
                    temporalStateChange: props.temporalStateChange,
                    add: props.add,
                  })}
                </TabPanel>
                {props.model instanceof FormInput ? (
                  <TabPanel style={tabPanelStyle}>
                    <ValidationWrapper
                      form={props.form}
                      model={props.model}
                      currententity={props.appState.currententity}
                      mutate={props.mutate}
                    />
                  </TabPanel>
                ) : null}
                {props.model instanceof FormInput ? (
                  <TabPanel>
                    <DependencyWrapper
                      form={props.form}
                      model={props.model}
                      currententity={props.appState.currententity}
                      mutate={props.mutate}
                    />
                  </TabPanel>
                ) : null}
              </Tabs>
            </div>
          </TabPanel>
          <TabPanel dtLocalFilesSaved={props.dtLocalFilesSaved} style={tabPanelStyle}>
            <FormProperty mutate={props.mutate} model={props.form} dtLocalFilesSaved={props.dtLocalFilesSaved} />
          </TabPanel>
        </Tabs>
      ) : (
        <Tabs dtLocalFilesSaved={props.dtLocalFilesSaved}>
          <TabList>
            <Tab>Entity</Tab>
          </TabList>
          <TabPanel>
            <h2>Select Form Entity to Access Properties</h2>
          </TabPanel>
        </Tabs>
      )}
    </div>
  );
};
