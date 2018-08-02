import React, { Component } from 'react';
import { connect } from 'react-redux';
import { address } from '../address';
import { utility } from '../utility';
import * as actions from '../actions/index';
import { FormInput } from '../data/FormInput';
import InputItem from './InputItem';
import { autoNumberRuleResult, indent, unindent, changeOrder, assignAllNames } from './autoName';
class AutoId extends Component {
  constructor(props) {
    super(props);
    this.change_handler = this.change_handler.bind(this);
    this.collectSelected = this.collectSelected.bind(this);
    this.indentHandler = this.indentHandler.bind(this);
    this.unindentHandler = this.unindentHandler.bind(this);
    this.moveUpHandler = this.moveUpHandler.bind(this);
    this.moveDownHandler = this.moveDownHandler.bind(this);
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
    if (this.state.checked.includes(index)) {
      // add to the array
      previouslyChecked.splice(previouslyChecked.indexOf(index), 1);
    } else {
      previouslyChecked.push(index);
    }
    this.setState({
      checked: previouslyChecked,
      selected: [],
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
      // externalIdentifier: autoNumberRuleResult(result, previousEntity().externalIdentifier()),
    });

    const arrAllInputs = utility.findAll(this.props.model.form, e => e instanceof FormInput);
    assignAllNames(arrAllInputs, this.props.model.form, this.props.mutate);
    this.props.mutate(addressOfEntity, {
      // autoNumberRule: result,
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
      console.log(addressOfEntity, _currentAddress, this.props.model.form, result);
      return address.byPath(this.props.model.form, _currentAddress);
    };
    // console.log(autoNumberRuleResult(result, previousEntity().externalIdentifier()));
    this.props.mutate(addressOfEntity, {
      autoNumberRule: result,
      // externalIdentifier: autoNumberRuleResult(result, previousEntity().externalIdentifier()),
    });
    console.log(
      this.props.model.form
        .children()[0]
        .children()[0]
        .children()[1]
    );
    const arrAllInputs = utility.findAll(this.props.model.form, e => e instanceof FormInput);
    assignAllNames(arrAllInputs, this.props.model.form, this.props.mutate);
    console.log(
      this.props.model.form
        .children()[0]
        .children()[0]
        .children()[1]
    );
    this.props.mutate(addressOfEntity, {
      // autoNumberRule: result,
      externalIdentifier: autoNumberRuleResult(result, previousEntity().externalIdentifier()),
    });
    this.setState({ selected: [], checked: [] });
  }

  moveUpHandler() {
    console.log('moveUp');
    const addressOfEntity = address.bySample(this.state.selected[0], this.props.model.form);
    const ruleArr = this.state.selected[0].autoNumberRule().split(',');
    if (ruleArr[ruleArr.length - 1] === 'N') {
      const previousEntity = () => {
        const _currentAddress = [...addressOfEntity];

        _currentAddress.splice(addressOfEntity.length - 1, 1, addressOfEntity[addressOfEntity.length - 1] - 1);
        console.log(addressOfEntity, _currentAddress, this.props.model.form, result);
        return address.byPath(this.props.model.form, _currentAddress);
      };
      const result = [...ruleArr];
      result.pop();
      result.push('N+');
      console.log(result);
      this.props.mutate(addressOfEntity, {
        autoNumberRule: result[0],
        externalIdentifier: autoNumberRuleResult(result[0], previousEntity().externalIdentifier()),
      });
    }
    this.setState({ selected: [], checked: [] });
  }

  moveDownHandler() {
    console.log('moveUp');
    const addressOfEntity = address.bySample(this.state.selected[0], this.props.model.form);

    const ruleArr = this.state.selected[0].autoNumberRule().split(',');
    if (ruleArr[ruleArr.length - 1] === 'N+') {
      const previousEntity = () => {
        const _currentAddress = [...addressOfEntity];

        _currentAddress.splice(addressOfEntity.length - 1, 1, addressOfEntity[addressOfEntity.length - 1] - 1);
        console.log(addressOfEntity, _currentAddress, this.props.model.form, result);
        return address.byPath(this.props.model.form, _currentAddress);
      };
      const result = [...ruleArr];
      result.pop();
      result.push('N');
      console.log(result);
      this.props.mutate(addressOfEntity, {
        autoNumberRule: result[0],
        externalIdentifier: autoNumberRuleResult(result[0], previousEntity().externalIdentifier()),
      });
    }
    this.setState({ selected: [], checked: [] });
  }

  // inputModels= utility.findAll(props.model.form, e => e instanceof FormInput);
  render() {
    const formPropertiesStyle = {
      height: '900px',
      border: '2px solid',
    };
    const cbInputStyle = { height: '25px', width: '25px', margin: '8px' };
    // const arrAllInputs = utility.findAll(this.props.model.form, e => e instanceof FormInput);
    // assignAllNames(arrAllInputs, this.props.model.form, this.props.mutate);

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
        <i className="fas fa-chevron-circle-up" style={{ fontSize: '30px' }} onClick={this.moveUpHandler} />
        <i className="fas fa-chevron-circle-down" style={{ fontSize: '30px' }} onClick={this.moveDownHandler} />
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
