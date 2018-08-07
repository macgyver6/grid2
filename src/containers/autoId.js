import React, { Component } from 'react';
import { connect } from 'react-redux';
import { address } from '../address';
import { utility } from '../utility';
import * as actions from '../actions/index';
import { FormInput } from '../data/FormInput';
import InputItem from './InputItem';
import { getExternalIdentifier, indent, unindent, changeOrder, assignAllNames, assignAllNamesBatch } from './autoName';
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
    this.reorderHandler = this.reorderHandler.bind(this);
    this.state = {
      selected: null,
      indexCurrent: null,
      checked: [],
    };
  }

  collectSelected(input) {
    // console.log(input);
    // const result = [...this.state.selected];
    // result.push(input);
    // console.log({ selected: result });

    const arrAllInputs = utility.findAll(this.props.model.form, e => e instanceof FormInput).sort(function(a, b) {
      return a.tabOrder() > b.tabOrder() ? 1 : b.tabOrder() > a.tabOrder() ? -1 : 0;
    });

    const indexCurrent = arrAllInputs.indexOf(input);
    // const addressOfEntity = address.bySample(input, this.props.model.form);

    if (this.state.selected !== indexCurrent) {
      this.setState({
        selected: input,
        indexCurrent,
      });
    } else if (this.state.selected === indexCurrent) {
      this.setState({
        selected: null,
        indexCurrent: null,
      });
    }
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
      selected: null,
    });
  }

  indentHandler() {
    const arrAllInputs = utility.findAll(this.props.model.form, e => e instanceof FormInput).sort(function(a, b) {
      return a.tabOrder() > b.tabOrder() ? 1 : b.tabOrder() > a.tabOrder() ? -1 : 0;
    });
    const result = indent(arrAllInputs[this.state.indexCurrent].autoNumberRule());
    console.log(result);
    const addressOfEntity = address.bySample(this.state.selected, this.props.model.form);

    const previousEntity = () => {
      const _currentAddress = [...addressOfEntity];

      _currentAddress.splice(addressOfEntity.length - 1, 1, addressOfEntity[addressOfEntity.length - 1] - 1);
      console.log(addressOfEntity, _currentAddress, this.props.model.form);
      return address.byPath(this.props.model.form, _currentAddress);
    };
    console.log(previousEntity());
    console.log(address.byPath(this.props.model.form, addressOfEntity));

    const indexCurrent = this.state.indexCurrent;
    arrAllInputs[indexCurrent] = address.rehydrate(
      Object.assign({}, arrAllInputs[indexCurrent].properties(), {
        autoNumberRule: result,
      })
    );
    var actionsArr = utility.flatten([
      actions.mutate(addressOfEntity, {
        autoNumberRule: result,
      }),
      assignAllNamesBatch(arrAllInputs, this.props.model.form, this.props.mutate),
    ]);
    console.log(actionsArr);
    this.props.batchActions(actionsArr);
  }

  unindentHandler() {
    const arrAllInputs = utility.findAll(this.props.model.form, e => e instanceof FormInput).sort(function(a, b) {
      return a.tabOrder() > b.tabOrder() ? 1 : b.tabOrder() > a.tabOrder() ? -1 : 0;
    });
    console.log(arrAllInputs[this.state.indexCurrent]);
    const result = unindent(arrAllInputs[this.state.indexCurrent].autoNumberRule());
    console.log(result);
    const addressOfEntity = address.bySample(this.state.selected, this.props.model.form);
    const previousEntity = () => {
      const _currentAddress = [...addressOfEntity];

      _currentAddress.splice(addressOfEntity.length - 1, 1, addressOfEntity[addressOfEntity.length - 1] - 1);
      console.log(addressOfEntity, _currentAddress, this.props.model.form, result);
      return address.byPath(this.props.model.form, _currentAddress);
    };

    const indexCurrent = this.state.indexCurrent;
    arrAllInputs[indexCurrent] = address.rehydrate(
      Object.assign({}, arrAllInputs[indexCurrent].properties(), {
        autoNumberRule: result,
      })
    );
    var actionsArr = utility.flatten([
      actions.mutate(addressOfEntity, {
        autoNumberRule: result,
      }),
      assignAllNamesBatch(arrAllInputs, this.props.model.form, this.props.mutate),
    ]);
    this.props.batchActions(actionsArr);
    // this.setState({ selected: null });  }
  }

  moveUpHandler() {
    console.log('moveUp');
    const addressOfEntity = address.bySample(this.state.selected, this.props.model.form);
    const ruleArr = this.state.selected.autoNumberRule().split(',');
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
      const arrAllInputs = utility.findAll(this.props.model.form, e => e instanceof FormInput).sort(function(a, b) {
        return a.tabOrder() > b.tabOrder() ? 1 : b.tabOrder() > a.tabOrder() ? -1 : 0;
      });

      const indexCurrent = this.state.indexCurrent;

      arrAllInputs[indexCurrent] = address.rehydrate(
        Object.assign({}, arrAllInputs[indexCurrent].properties(), {
          autoNumberRule: result[0],
        })
      );
      var actionsArr = utility.flatten([
        actions.mutate(addressOfEntity, {
          autoNumberRule: result[0],
        }),
        assignAllNamesBatch(arrAllInputs, this.props.model.form, this.props.mutate),
      ]);
      this.props.batchActions(actionsArr);
    }
    // this.setState({ selected: null, checked: [] });
  }

  moveDownHandler() {
    const addressOfEntity = address.bySample(this.state.selected, this.props.model.form);

    const ruleArr = this.state.selected.autoNumberRule().split(',');
    console.log('moveDown', ruleArr);
    if (ruleArr[ruleArr.length - 1] === 'N+' && this.state.selected.externalIdentifier !== '1') {
      const previousEntity = () => {
        const _currentAddress = [...addressOfEntity];

        _currentAddress.splice(addressOfEntity.length - 1, 1, addressOfEntity[addressOfEntity.length - 1] - 1);
        console.log(addressOfEntity, _currentAddress, this.props.model.form, result);
        return address.byPath(this.props.model.form, _currentAddress);
      };
      const result = [...ruleArr];
      result.pop();
      result.push('N');
      console.log('ran');
      const arrAllInputs = utility.findAll(this.props.model.form, e => e instanceof FormInput).sort(function(a, b) {
        return a.tabOrder() > b.tabOrder() ? 1 : b.tabOrder() > a.tabOrder() ? -1 : 0;
      });
      console.log(this.state.selected);
      const indexCurrent = this.state.indexCurrent;
      console.log({
        autoNumberRule: result[0],
        // externalIdentifier: getExternalIdentifier(result[0], arrAllInputs[indexCurrent - 1].externalIdentifier()),
      });
      console.log(arrAllInputs, indexCurrent);
      arrAllInputs[indexCurrent] = address.rehydrate(
        Object.assign({}, arrAllInputs[indexCurrent].properties(), {
          autoNumberRule: result[0],
        })
      );
      console.log(assignAllNamesBatch(arrAllInputs, this.props.model.form, this.props.mutate));
      var actionsArr = utility.flatten([
        actions.mutate(addressOfEntity, {
          autoNumberRule: result[0],
        }),
        assignAllNamesBatch(arrAllInputs, this.props.model.form, this.props.mutate),
      ]);
      this.props.batchActions(actionsArr);
    }
    // this.setState({ selected: null, checked: [] });
  }

  reorderHandler(event, destinationInput) {
    event.stopPropagation();
    const inputModels = utility.findAll(this.props.model.form, e => e instanceof FormInput).sort(function(a, b) {
      return a.tabOrder() > b.tabOrder() ? 1 : b.tabOrder() > a.tabOrder() ? -1 : 0;
    });
    console.log(event.target);
    const sourceInput = inputModels[Number(event.dataTransfer.getData('tabOrder')) - 1];
    const sourceIndex = Number(event.dataTransfer.getData('tabOrder'));
    const destinationIndex = destinationInput.tabOrder();
    console.log('sourceInput', sourceInput.type(), sourceInput.tabOrder(), { tabOrder: destinationIndex });
    console.log('destinationInput', destinationInput.type(), destinationInput.tabOrder(), { tabOrder: sourceIndex });
    // console.log(event.dataTransfer.getData('tabOrder'));
    // this.props.mutate(address.bySample(sourceInput, this.props.model.form), { tabOrder: destinationIndex });
    // this.props.mutate(address.bySample(destinationInput, this.props.model.form), {
    //   tabOrder: sourceIndex,
    // });
    // const destination = this.props.;
    const result = changeOrder(sourceIndex, destinationIndex, inputModels);
    console.log(result);
    result.forEach((input, index) =>
      this.props.mutate(address.bySample(input, this.props.model.form), { tabOrder: index + 1 })
    );

    const indexCurrent = this.state.indexCurrent;

    var actionsArr = utility.flatten([assignAllNamesBatch(result, this.props.model.form, this.props.mutate)]);
    this.props.batchActions(actionsArr);
    this.setState({ indexCurrent: null, selected: null });
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
          <label forHTML="form-separator">Separator: </label>
          <input
            type="text"
            name="form-separator"
            id="separator"
            onChange={this.props.autoId_change_handler}
            value={this.props.separator}
            // style={cbInputStyle}
          />
        </p>
        <i className="fas fa-chevron-circle-left" style={{ fontSize: '30px' }} onClick={this.unindentHandler} />
        <i className="fas fa-chevron-circle-right" style={{ fontSize: '30px' }} onClick={this.indentHandler} />
        <i className="fas fa-chevron-circle-up" style={{ fontSize: '30px' }} onClick={this.moveUpHandler} />
        <i className="fas fa-chevron-circle-down" style={{ fontSize: '30px' }} onClick={this.moveDownHandler} />
        <ul
          style={{
            listStyleType: 'none',
          }}
        >
          {utility
            .findAll(this.props.model.form, e => e instanceof FormInput)
            .sort(function(a, b) {
              return a.tabOrder() > b.tabOrder() ? 1 : b.tabOrder() > a.tabOrder() ? -1 : 0;
            })
            .map((input, index) => (
              <InputItem
                key={index}
                index={index}
                input={input}
                collectSelected={this.collectSelected}
                reorderHandler={this.reorderHandler}
                // checkHandler={this.checkHandler}
                checked={this.state.selected ? this.state.selected.UUID() === input.UUID() : false}
              />
            ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({ model: { ...state.model } });
AutoId = connect(mapStateToProps, actions)(AutoId);

export default AutoId;
