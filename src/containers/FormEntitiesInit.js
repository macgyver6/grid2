import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { defaultPropsFE } from '../constants/defaultPropsFE';
import FormComponent from '../components/FormEntities/Form';
import { FormSection } from '../data/FormSection';
import { TextInput } from '../data/TextInput';
import { TextArea } from '../data/TextArea';
import { Checkbox } from '../data/Checkbox';

class FormEntityInit extends Component {
  constructor(props) {
    super();
    // this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <h1>FormEntitiesInit</h1>

        <button
          className="btn btn-info"
          onClick={this.props.addformentity.bind(this, new FormSection(defaultPropsFE.FormSection), [0])}>
          Add Form Section
        </button>

        <button
          className="btn btn-info"
          onClick={this.props.addformentity.bind(this,
            new Checkbox(defaultPropsFE.Checkbox), [0, 0])}>
          Add Checkbox
        </button>

        <button
          className="btn btn-success"
          onClick={this.props.addformentity.bind(this, new TextInput(defaultPropsFE.TextInput), [0, 0])}>
          Add Text Input
        </button>

        <button
          className="btn btn-danger"
          onClick={this.props.addformentity.bind(this, new TextArea(defaultPropsFE.TextArea), [0, 0])}>
          Add Text Area
        </button>

        <button
          className="btn btn-info"
          onClick={this.props.removeformentity.bind(this, [0, 0])}>
          Remove Entity
        </button>

        {/* <button
          className="btn btn-info"
          onClick={this.handleChange.bind(this, [0, 0])}>
          Modify Entity
        </button> */}

        <FormComponent form={this.props.store.model.form} removeformentity={this.props.removeformentity}
          addformentity={this.props.addformentity}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { store: state };
}

FormEntityInit = connect(mapStateToProps, actions)(FormEntityInit)

export default FormEntityInit;