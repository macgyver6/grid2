import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../../node_modules/react-tabs/style/react-tabs.css';
import { _TextInputProperty } from './_TextInputProperty';
import FormProperty from './FormProperties';
import { address } from '../address';
import { utility } from '../utility';

import { _dataDefined, userDefined, inputDefinedValidator, dataDefinedByInput, _validations } from './_validations';
import DateValidationUI from './validations/DateValidationUI';
import StringValidationUI from './validations/stringValidationUI';
import IntegerValidationUI from './validations/integerValidationUI';
import FloatValidationUI from './validations/floatValidationUI';
import Expand from '../assets/expand.js';
import { calcTotal } from '../components/FormEntities/feStyles';
import { valUtility } from '../validation/val.utility';
import { FormInput } from '../data/FormInput';
import PatternValidator from './validations/PatternValidation';
import ValidationWrapper from './validations/ValidationWrapper';
import DependencyWrapper from './validations/DependencyWrapper';
import { defaultPropsFE, initFE } from '../constants/defaultPropsFE';
import { TabStyle } from '../components/layout/styles/DesignBox';

class PropertiesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentAddress: null,
      tabIndex: 0,
      // ...(props.selected ? { boxShadow: `3px 3px ${initFE[`${props.model.type()}`].render.backgroundColor} ` } : {}),
      // ...(!inputDefinedValidator[`${this.props.model.type()}`] ? { tabIndex: 0 } : {}),
    };
    console.log(!inputDefinedValidator[`${this.props.model.type()}`] ? { tabIndex: 0 } : {});
    // inputDefinedValidator[`${this.props.model.type()}`] ? null : 0;

    this.change_handler = this.change_handler.bind(this);
    this.validationSelector_handler = this.validationSelector_handler.bind(this);
    this.collapse_handler = this.collapse_handler.bind(this);
  }

  change_handler(event) {
    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      [event.target.id]: event.target.value,
    });
  }

  componentWillReceiveProps(props) {
    console.log(utility.arraysEqual(this.state.currentAddress, props.appState.currententity));
    if (this.state.currentAddress === null) {
      this.setState({
        // tabIndex: 0,
        currentAddress: props.appState.currententity,
      });
    } else if (!utility.arraysEqual(this.state.currentAddress, props.appState.currententity)) {
      console.log(this.state.currentAddress, props.appState.currententity);
      this.setState({
        tabIndex: 0,
        currentAddress: props.appState.currententity,
      });
    }
  }

  layoutChange_handler(event) {
    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      [event.target.id]: parseFloat(event.target.value),
      append:
        24 -
        this.props.model.prepend() -
        (event.target.id === 'prePromptWidth' ? parseFloat(event.target.value) : this.props.model.prePromptWidth()) -
        this.props.model.width() -
        (event.target.id === 'postPromptWidth' ? parseFloat(event.target.value) : this.props.model.postPromptWidth()),
      // function that calcs total width and subtracts all OTHER elements, returningt what the value should be
    });
  }

  validationSelector_handler(event) {
    // return {
    //   validations: {
    //     ...this.props.model.validations(),
    //     [event.target.id]: event.target.value
    //   }
    // };

    this.props.mutate(address.bySample(this.props.model, this.props.form), {
      ...this.props.model,
      [event.target.id]: event.target.value,
    });
    // this.props.mutate(address.bySample(this.props.model, this.props.form), {
    //   validations: {
    //     ...this.props.model.validations(),
    //     [event.target.id]: event.target.value,
    //   },
    // });
  }

  collapse_handler(event) {
    this.props.temporalStateChange({
      [event.target.id]: !this.props.appState[event.target.id],
    });
  }

  render() {
    const PropertiesPanelStyle = model => ({
      width: '40%',
      height: '100%',
      backgroundColor: 'white',
      // border: '4px solid lightgrey',
      ...(this.props.currententity ? { border: `1px solid ${initFE[`${model.type()}`].render.backgroundColor}` } : {}),
    });

    const userDefinedValOptionsArr = Object.keys(_dataDefined).map(userDefinedValOption => (
      <option value={userDefinedValOption}>{userDefinedValOption}</option>
    ));

    let currentSelectedValidator = 'PatternValidator';
    const validationSelector_handler2 = event => (currentSelectedValidator = event.target.value);

    const tabPanelStyle = {
      padding: '10px',
    };

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
    return (
      <div style={PropertiesPanelStyle(this.props.model)}>
        {/* <p>{JSON.stringify(this.state.currentAddress)}</p>
        <p>{JSON.stringify(this.state.tabIndex)}</p> */}
        {this.props.currententity ? (
          <Tabs dtLocalFilesSaved={this.props.dtLocalFilesSaved}>
            <TabList>
              <Tab>Entity</Tab>
              <Tab dtLocalFilesSaved={this.props.dtLocalFilesSaved}>Form</Tab>
            </TabList>

            <TabPanel style={tabPanelStyle}>
              <div>
                <Tabs
                  /*temporary - dev validation */
                  // selectedIndex={
                  //   inputDefinedValidator[`${this.props.model.type()}`] ? null : 0
                  // }
                  // selectedIndex={1}
                  selectedIndex={this.state.tabIndex}
                  onSelect={tabIndex => this.setState({ tabIndex })}
                >
                  <TabList>
                    <Tab>{address.getHumanName(this.props.model.type())} Properties</Tab>
                    {this.props.model instanceof FormInput &&
                    this.props.model.type() !== 'autoSuggest' &&
                    this.props.model.type() !== 'TextArea' &&
                    this.props.model.type() !== 'SelectionInput' &&
                    this.props.model.type() !== 'CheckBox' &&
                    this.props.model.type() !== 'autoSuggest' ? (
                      <Tab key="0">{address.getHumanName(this.props.model.type())} Validations</Tab>
                    ) : null}
                    {this.props.model instanceof FormInput && this.props.model.type() !== 'autoSuggest' ? (
                      <Tab key="1">{address.getHumanName(this.props.model.type())} Dependencies</Tab>
                    ) : null}
                  </TabList>
                  <TabPanel add={this.props.add} style={tabPanelStyle}>
                    {React.createElement(
                      address.whichEntity(address.byPath(this.props.form, this.props.currententity)),
                      {
                        model: address.byPath(this.props.form, this.props.currententity),
                        form: this.props.form,
                        currententity: this.props.currententity,
                        mutate: this.props.mutate,
                        appState: this.props.appState,
                        temporalStateChange: this.props.temporalStateChange,
                        add: this.props.add,
                      }
                    )}
                  </TabPanel>
                  {this.props.model instanceof FormInput &&
                  this.props.model.type() !== 'autoSuggest' &&
                  this.props.model.type() !== 'TextArea' &&
                  this.props.model.type() !== 'SelectionInput' &&
                  this.props.model.type() !== 'CheckBox' &&
                  this.props.model.type() !== 'autoSuggest' ? (
                    <TabPanel style={tabPanelStyle}>
                      <ValidationWrapper
                        form={this.props.form}
                        model={this.props.model}
                        currententity={this.props.appState.currententity}
                        mutate={this.props.mutate}
                        tabIndex={this.state.tabIndex}
                      />
                    </TabPanel>
                  ) : null}

                  {this.props.model instanceof FormInput && this.props.model.type() !== 'autoSuggest' ? (
                    <TabPanel>
                      <DependencyWrapper
                        form={this.props.form}
                        model={this.props.model}
                        currententity={this.props.appState.currententity}
                        mutate={this.props.mutate}
                      />
                    </TabPanel>
                  ) : null}
                </Tabs>
              </div>
            </TabPanel>
            <TabPanel dtLocalFilesSaved={this.props.dtLocalFilesSaved} style={tabPanelStyle}>
              <FormProperty
                mutate={this.props.mutate}
                model={this.props.form}
                dtLocalFilesSaved={this.props.dtLocalFilesSaved}
              />
            </TabPanel>
          </Tabs>
        ) : (
          <Tabs dtLocalFilesSaved={this.props.dtLocalFilesSaved}>
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
  }
}

export default PropertiesPanel;
