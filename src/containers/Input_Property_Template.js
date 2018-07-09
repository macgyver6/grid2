import React from 'react';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import { address } from '../address';
import { utility } from '../validation/val.utility';
import { Form } from '../data/Form';
import { FormInput } from '../data/FormInput';
import { calcTotal } from '../components/FormEntities/feStyles';
import { _dataDefined, userDefined } from './_validations';
import { entityActions } from '../components/FormEntities/actions.entities';

// const form = new Form(defaultPropsFE.Form);

export const Input_Property_Template = props => {
  const change_handler = event => {
    // console.log(event.target.value);
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    return props.mutate(address.bySample(props.model, props.form), {
      [event.target.id]: value,
    });
  };

  const resize = {
    init_grids: null,
    init_append: null,
    grids: null,
  };

  const layoutChange_handler = event => {
    // const calcAppend = () => {
    //   event.target.value < 0 ? null :
    //   {
    //     append :
    //   }
    // }
    resize.init_grids = props.model[`${event.target.id}`]();
    resize.init_append = props.model.append();
    resize.grids = event.target.value - resize.init_grids;
    console.log(props.model.prepend() === 1, event.target.value < 1);
    const layout_result = {
      [event.target.id]: props.model.prepend() === 1 && event.target.value < 1 ? 0 : resize.init_grids + resize.grids,
      append: resize.init_append - resize.grids,
      // calcTotal(props.model) -
      // props.model.prepend() -
      // (event.target.id === 'prePromptWidth' ? event.target.value : props.model.prePromptWidth()) -
      // props.model.width() -
      // (event.target.id === 'postPromptWidth' ? event.target.value : props.model.postPromptWidth()),
      // function that calcs total width and subtracts all OTHER elements, returningt what the value should be
    };
    console.log(address.bySample(props.model, props.form), layout_result);
    props.mutate(address.bySample(props.model, props.form), layout_result);
  };

  const copyHandler = event => {
    event.preventDefault();
    console.log('copyHandler');

    const entityAddress = address.bySample(props.model, props.form);
    let sectionAddress = entityAddress.slice(0, entityAddress.length - 1);
    const howManyChildren = address.byPath(props.form, sectionAddress).children().length;
    const combinedAddress = sectionAddress.concat(howManyChildren);
    props.add(combinedAddress, props.model);
    console.log(combinedAddress);
  };

  return (
    <div>
      <p style={{ fontSize: 8, margin: '0px' }}>{props.model.UUID()}</p>
      <p style={{ fontSize: 8, margin: '0px 0px 4px 0px' }}>
        prePromptWidth: {props.model.prePromptWidth()} Append: Total width: {calcTotal(props.model)} PrePend:
        {props.model.prePrompt()} Width: {props.model.width()} Append:
        {props.model.append()}
      </p>
      <button onClick={copyHandler}>📋 Copy This Input</button>
      <div>
        <p>
          <label htmlFor="textInput-name">Name</label>
          <br />
          <input
            type="text"
            id="name"
            name="textInput-name"
            onChange={change_handler}
            value={props.model.name()}
            size="40"
          />
        </p>
        <p>
          <label htmlFor="externalIdentifier">Field Identifier</label>
          <br />
          <input
            type="text"
            id="externalIdentifier"
            name="externalIdentifier"
            onChange={change_handler}
            value={props.model.externalIdentifier()}
            size="40"
          />
        </p>

        <label htmlFor="prePromptWidth">Prompt Width: </label>
        <input
          name="prePromptWidth"
          type="number"
          id="prePromptWidth"
          onChange={layoutChange_handler}
          value={props.model.prePromptWidth()}
        />

        <label htmlFor="prePrompt">Prompt (optional): </label>
        <textarea
          disabled={props.model.prePromptWidth() < 1 ? true : false}
          name="prePrompt"
          type="text"
          id="prePrompt"
          onChange={change_handler}
          value={props.model.prePrompt()}
        />
        <br />

        <label htmlFor="postPromptWidth"> Post Prompt Width: </label>
        <input
          name="postPromptWidth"
          type="number"
          id="postPromptWidth"
          onChange={layoutChange_handler}
          value={props.model.postPromptWidth()}
        />

        <label htmlFor="postPrompt">Post Prompt (optional): </label>
        <textarea
          disabled={props.model.postPromptWidth() < 1 ? true : false}
          value={props.model.postPrompt()}
          name="posPrompt"
          type="text"
          id="postPrompt"
          onChange={change_handler}
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
            onChange={change_handler}
            value={props.model.tabOrder()}
          />
        </p>
        <p>
          <label htmlFor="textInput-sasCodeLabel">Field Label: </label>
          <br />

          <textarea
            type="text"
            name="textInput-sasCodeLabel"
            className="form-control"
            type={props.model.type()}
            // cols={props.model.numColumns()}
            rows="3"
            cols="50"
            id="sasCodeLabel"
            onChange={change_handler}
            value={props.model.sasCodeLabel()}
          />

          {/* <input
            type="text"
            name="textInput-sasCodeLabel"
            id="sasCodeLabel"
            onChange={change_handler}
            value={props.model.sasCodeLabel()}
          /> */}
        </p>
        <div>
          <label htmlFor="textInput-QxQ">QxQ Content</label>
          <br /> <br />
          <textarea
            name="textInput-QxQ"
            type="text"
            id="QxQ"
            onChange={change_handler}
            value={props.model.QxQ()}
            rows="3"
            cols="50"
          />
          <br /> <br />
        </div>
      </div>
    </div>
  );
};
