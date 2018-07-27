import React from 'react';
import { connect } from 'react-redux';
import { address } from '../address';
// import { utility } from '../utility';
import * as actions from '../actions/index';
import { FormInput } from '../data/FormInput';
import InputItem from './InputItem';

const utility = {
  findAll: (e, testFn) => {
    let result = testFn.call({}, e) ? [e] : [];
    if (!e.children) {
      return result;
    }
    return result.concat(
      e
        .children()
        .map(e => utility.flatten(utility.findAll(e, testFn)))
        .reduce((a, b) => [...a, ...b], [])
    );
  },

  /**
   * flatten the given array or array-like such that any members
   * which are themselves array-likes will be inserted into the
   * resulting array at the position of their parent's occurrence.
   *
   * Ex: [1, [2, 3], 4, [5, [6]]] => [1, 2, 3, 4, 5, 6]
   *
   * @param {Array} arr array to flatter, not undefined
   * @returns {Array} utility.flattened array
   */
  flatten: arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? utility.flatten(b) : b), []),
  total: entity => entity.prepend() + entity.width() + entity.append(),
};

let AutoId = props => {
  const change_handler = event => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    console.log({
      [event.target.id]: value,
    });
    return props.formmutate({
      [event.target.id]: value,
    });
  };

  const formPropertiesStyle = {
    height: '900px',
    border: '2px solid',
  };

  const cbInputStyle = { height: '25px', width: '25px', margin: '8px' };
  console.log(props.model);
  const inputModels = utility.findAll(props.model.form, e => e instanceof FormInput);
  return (
    <div style={formPropertiesStyle}>
      <h1>Auto Id</h1>
      <i className="fas fa-chevron-circle-left" style={{ fontSize: '30px' }} />
      <i className="fas fa-chevron-circle-right" style={{ fontSize: '30px' }} />
      <i className="fas fa-chevron-circle-up" style={{ fontSize: '30px' }} />
      <i className="fas fa-chevron-circle-down" style={{ fontSize: '30px' }} />
      <ul>{}</ul>
      {utility
        .findAll(props.model.form, e => e instanceof FormInput)
        .map((input, index) => <InputItem key={index} input={input} />)}
    </div>
  );
};

const mapStateToProps = props => ({ model: { ...props.model } });
AutoId = connect(mapStateToProps, actions)(AutoId);

export default AutoId;
