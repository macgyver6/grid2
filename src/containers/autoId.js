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
    this.indentHandler = this.indentHandler.bind(this);
    this.unindentHandler = this.unindentHandler.bind(this);
    this.checkHandler = this.checkHandler.bind(this);
    this.state = {
      selected: [],
      checked: [],
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

  checkHandler(index) {
    console.log(index);
    const previouslyChecked = [...this.state.checked];
    previouslyChecked.push(index);
    this.setState({
      checked: previouslyChecked,
    });
  }

  indentHandler() {
    const result = indent(this.state.selected[0].autoNumberRule());
    console.log(result);
    const addressOfEntity = address.bySample(this.state.selected[0], this.props.model.form);
    const previousEntity = () => {
      const _currentAddress = [...addressOfEntity];

      _currentAddress.splice(addressOfEntity.length - 1, 1, addressOfEntity[addressOfEntity.length - 1] - 1);
      console.log(addressOfEntity, _currentAddress, this.props.model.form);
      return address.byPath(this.props.model.form, _currentAddress);
    };
    console.log(previousEntity());
    this.props.mutate(addressOfEntity, {
      autoNumberRule: result,
      externalIdentifier: autoNumberRuleResult(result, previousEntity().externalIdentifier()),
    });
    this.setState({ selected: [], checked: [] });
  }

  unindentHandler() {
    console.log(this.state.selected[0].autoNumberRule());
    const result = unindent(this.state.selected[0].autoNumberRule());
    console.log(result);
    const addressOfEntity = address.bySample(this.state.selected[0], this.props.model.form);
    const previousEntity = () => {
      const _currentAddress = [...addressOfEntity];

      _currentAddress.splice(addressOfEntity.length - 1, 1, addressOfEntity[addressOfEntity.length - 1] - 1);
      console.log(addressOfEntity, _currentAddress, this.props.model.form);
      return address.byPath(this.props.model.form, _currentAddress);
    };
    console.log(previousEntity());
    this.props.mutate(addressOfEntity, {
      autoNumberRule: result,
      externalIdentifier: autoNumberRuleResult(result, previousEntity().externalIdentifier()),
    });
    this.setState({ selected: [], checked: [] });
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
        <i className="fas fa-chevron-circle-left" style={{ fontSize: '30px' }} onClick={this.unindentHandler} />
        <i className="fas fa-chevron-circle-right" style={{ fontSize: '30px' }} onClick={this.indentHandler} />
        <i className="fas fa-chevron-circle-up" style={{ fontSize: '30px' }} />
        <i className="fas fa-chevron-circle-down" style={{ fontSize: '30px' }} />
        <ul>{}</ul>
        {utility
          .findAll(this.props.model.form, e => e instanceof FormInput)
          .map((input, index) => (
            <InputItem
              key={index}
              index={index}
              input={input}
              collectSelected={this.collectSelected}
              checkHandler={this.checkHandler}
              checked={this.state.checked.includes(index)}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({ model: { ...state.model } });
AutoId = connect(mapStateToProps, actions)(AutoId);

export default AutoId;
