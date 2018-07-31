import React, { Component } from 'react';
import { connect } from 'react-redux';
import { address } from '../address';
import { utility } from '../utility';
import * as actions from '../actions/index';
import { FormInput } from '../data/FormInput';
import InputItem from './InputItem';
import { autoNumberRuleResult, indent, unindent, changeOrder } from './autoName';
class AutoId extends Component {
  constructor(props) {
    super(props);
    this.change_handler = this.change_handler.bind(this);
    this.collectSelected = this.collectSelected.bind(this);
    this.state = {
      selected: [],
    };
  }

  collectSelected(input) {
    const result = [...this.state.selected];
    result.push(input);
    this.setState({ selected: result });
  }
  change_handler(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    console.log({
      [event.target.id]: value,
    });
    return this.props.formmutate({
      [event.target.id]: value,
    });
  }

  // inputModels= utility.findAll(props.model.form, e => e instanceof FormInput);
  render() {
    const formPropertiesStyle = {
      height: '900px',
      border: '2px solid',
    };
    const cbInputStyle = { height: '25px', width: '25px', margin: '8px' };
    return (
      <div style={formPropertiesStyle}>
        <h1>Auto Id</h1>
        <p>
          <label forHTML="form-prefix">Prefix: </label>
          <input
            type="text"
            name="form-prefix"
            id="prefix"
            onChange={this.props.autoId_change_handler}
            value={this.props.prefix}
            // style={cbInputStyle}
          />
        </p>
        <p>
          <label forHTML="form-seperator">Seperator: </label>
          <input
            type="text"
            name="form-seperator"
            id="separator"
            onChange={this.props.autoId_change_handler}
            value={this.props.seperator}
            // style={cbInputStyle}
          />
        </p>
        <i className="fas fa-chevron-circle-left" style={{ fontSize: '30px' }} />
        <i className="fas fa-chevron-circle-right" style={{ fontSize: '30px' }} />
        <i className="fas fa-chevron-circle-up" style={{ fontSize: '30px' }} />
        <i className="fas fa-chevron-circle-down" style={{ fontSize: '30px' }} />
        <ul>{}</ul>
        {utility
          .findAll(this.props.model.form, e => e instanceof FormInput)
          .map((input, index) => <InputItem key={index} input={input} collectSelected={this.collectSelected} />)}
      </div>
    );
  }
}

const mapStateToProps = state => ({ model: { ...state.model } });
AutoId = connect(mapStateToProps, actions)(AutoId);

export default AutoId;
