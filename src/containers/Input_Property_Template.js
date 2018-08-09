import React, { Component } from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';
import { entityActions } from '../components/FormEntities/actions.entities';
import { debounce } from './debounce';
// import _ from 'lodash';

// const form = new Form(defaultPropsFE.Form);

class Input_Property_Template extends Component {
  constructor(props) {
    super(props);
    this.layoutChange_handler = this.layoutChange_handler.bind(this);
    this.copyHandler = this.copyHandler.bind(this);
    this.change_handler = this.change_handler.bind(this);
    // this.change_handler = this.change_handler.bind(this);
    this.debounceRedux = debounce.debounce(this.debounceRedux, 250);
    this.state = {
      init_grids: null,
      init_append: null,
      grids: null,
      name: '' || this.props.model.name(),
      externalIdentifier: '' || this.props.model.externalIdentifier(),
      prePromptWidth: '' || this.props.model.prePromptWidth(),
      prePrompt: '' || this.props.model.prePrompt(),
      postPromptWidth: '' || this.props.model.postPromptWidth(),
      postPrompt: '' || this.props.model.postPrompt(),
      tabOrder: '' || this.props.model.tabOrder(),
      sasCodeLabel: '' || this.props.model.sasCodeLabel(),
      QxQ: '' || this.props.model.QxQ(),
    };
  }

  change_handler(event) {
    // const value = ref.type === 'checkbox' ? ref.checked : ref.value;
    this.setState({
      [event.target.id]: event.target.value,
    });
    this.debounceRedux(event.target);
  }

  debounceRedux(target) {
    return this.props.mutate(address.bySample(this.props.model, this.props.form), {
      [target.id]: target.value,
    });
  }

  layoutChange_handler(event) {
    // const calcAppend = () => {
    //   event.target.value < 0 ? null :
    //   {
    //     append :
    //   }
    // }
    const resize = {
      init_grids: null,
      init_append: null,
      grids: null,
    };

    resize.init_grids = this.props.model[`${event.target.id}`]();
    resize.init_append = this.props.model.append();
    resize.grids = event.target.value - resize.init_grids;
    console.log(this.props.model.prepend() === 1, event.target.value < 1);
    const layout_result = {
      [event.target.id]:
        this.props.model.prepend() === 1 && event.target.value < 1 ? 0 : resize.init_grids + resize.grids,
      append: resize.init_append - resize.grids,
      // calcTotal(this.props.model) -
      // this.props.model.prepend() -
      // (event.target.id === 'prePromptWidth' ? event.target.value : this.props.model.prePromptWidth()) -
      // this.props.model.width() -
      // (event.target.id === 'postPromptWidth' ? event.target.value : this.props.model.postPromptWidth()),
      // function that calcs total width and subtracts all OTHER elements, returningt what the value should be
    };
    console.log(address.bySample(this.props.model, this.props.form), layout_result);
    this.props.mutate(address.bySample(this.props.model, this.props.form), layout_result);
  }

  copyHandler(event) {
    event.preventDefault();
    console.log('copyHandler');

    const entityAddress = address.bySample(this.props.model, this.props.form);
    let sectionAddress = entityAddress.slice(0, entityAddress.length - 1);
    const howManyChildren = address.byPath(this.props.form, sectionAddress).children().length;
    const combinedAddress = sectionAddress.concat(howManyChildren);
    const properties = this.props.model.properties();
    const entityToAdd = Object.assign({}, this.props.model.properties(), { UUID: null });
    this.props.add(combinedAddress, address.rehydrate(entityToAdd));
    console.log(combinedAddress);
  }

  render() {
    console.log(utility);
    return (
      <div>
        <p style={{ fontSize: 8, margin: '0px' }}>{this.props.model.UUID()}</p>
        <p style={{ fontSize: 8, margin: '0px 0px 4px 0px' }}>
          prePromptWidth: {this.props.model.prePromptWidth()} Append: Total width: {calcTotal(this.props.model)}{' '}
          PrePend:
          {this.props.model.prePrompt()} Width: {this.props.model.width()} Append:
          {this.props.model.append()}
        </p>
        <button onClick={this.copyHandler}>📋 Copy This Input</button>
        <div>
          <p>
            <label htmlFor="textInput-name">Name</label>
            <br />
            <input id="name" size="40" onChange={this.change_handler} type="text" value={this.state.name} />
          </p>
          <p>
            <label htmlFor="externalIdentifier">Field Identifier</label>
            <br />
            <input
              type="text"
              id="externalIdentifier"
              name="externalIdentifier"
              onChange={this.change_handler}
              value={this.state.externalIdentifier}
              size="40"
            />
          </p>

          <label htmlFor="prePromptWidth">Prompt Width: </label>
          <input
            name="prePromptWidth"
            type="number"
            id="prePromptWidth"
            onChange={this.layoutChange_handler}
            value={this.props.model.prePromptWidth()}
          />

          <label htmlFor="prePrompt">Prompt (optional): </label>
          <textarea
            disabled={this.props.model.prePromptWidth() < 1 ? true : false}
            name="prePrompt"
            type="text"
            id="prePrompt"
            onChange={this.change_handler}
            value={this.state.prePrompt}
          />
          <br />

          <label htmlFor="postPromptWidth"> Post Prompt Width: </label>
          <input
            name="postPromptWidth"
            type="number"
            id="postPromptWidth"
            onChange={this.layoutChange_handler}
            value={this.props.model.postPromptWidth()}
          />

          <label htmlFor="postPrompt">Post Prompt (optional): </label>
          <textarea
            disabled={this.props.model.postPromptWidth() < 1 ? true : false}
            name="posPrompt"
            type="text"
            id="postPrompt"
            onChange={this.change_handler}
            value={this.state.postPrompt}
          />
        </div>
        <div>
          <p>
            <label htmlFor="textInput-tabOrder">Tab Order</label>
            <br />
            <input
              type="number"
              name="textInput-tabOrder"
              id="tabOrder"
              size="2"
              onChange={this.change_handler}
              value={this.state.tabOrder}
            />
          </p>
          <p>
            <label htmlFor="textInput-sasCodeLabel">Field Label: </label>
            <br />

            <textarea
              type="text"
              name="textInput-sasCodeLabel"
              className="form-control"
              type={this.props.model.type()}
              // cols={this.props.model.numColumns()}
              rows="3"
              cols="50"
              id="sasCodeLabel"
              onChange={this.change_handler}
              value={this.state.sasCodeLabel}
            />

            {/* <input
            type="text"
            name="textInput-sasCodeLabel"
            id="sasCodeLabel"
            onChange={change_handler}
            value={this.props.model.sasCodeLabel()}
          /> */}
          </p>
          <div>
            <label htmlFor="textInput-QxQ">QxQ Content</label>
            <br /> <br />
            <textarea
              name="textInput-QxQ"
              type="text"
              id="QxQ"
              onChange={this.change_handler}
              value={this.state.QxQ}
              rows="3"
              cols="50"
            />
            <br /> <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Input_Property_Template;
