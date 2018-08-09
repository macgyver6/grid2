import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/index';
import FormEntityInit from '../containers/FormEntitiesInit.js';
import formReducer from '../reducers/form.reducer';
import { validateImport } from '../validation/val.index';

class App extends Component {
  constructor() {
    super();
    this.clickHandler = this.clickHandler.bind(this);
  }
  clickHandler(event) {
    /* attempt 1
  const masterActionValidation = resultingState => {
    const result = resultingState.reduce(function (accumulator, singleStateChange) {
      return { ...accumulator, ...singleStateChange };
    });

    console.log(result);

    if (validateImport(result).length === 0) {
      return Object.assign({}, (this.props.form: result));
    }
  };

  const resulting = masterActionValidation([
    // formReducer({ type: 'increment' }),
    formReducer(this.props.store.model, { type: 'remove', path: [0, 0, 3] }),
    formReducer(this.props.store.model, { type: 'remove', path: [0, 0, 1] }),
  ]);
*/
    /** attempt 2 */
    // const batchActions2 = (state, resultingState) => {
    //   const resultingState2 = (state, resultingState) =>
    //     // console.log(state);
    //     resultingState.length >= 1
    //       ? resultingState2(formReducer(state, resultingState[0]), resultingState.slice(1, resultingState.length))
    //       : state;

    //   // console.log(resultingState2(this.props.store.model, resultingState));

    //   if (validateImport(resultingState2(this.props.store.model, resultingState).form).length === 0) {
    //     // return Object.assign({}, (this.props.form: result));
    //     // dispatch the masterAction
    //     return resultingState2(this.props.store.model, resultingState).form;
    //   }
    // };

    const actionsArr = [actions.remove([0, 0, 1]), actions.remove([0, 0, 2])];

    this.props.actions.batchActions(actionsArr);
    // this.props.actions.batchActions(batchActions2(this.props.store.model, actionsArr));
  }
  render() {
    return (
      <div>
        {/* {saveStatus ?
          <h4><span className="badge badge-success">Changes Saved</span></h4> :
          <h4><span className="badge badge-danger">Unsaved Changes</span></h4>
        } */}

        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.props.actions.savestate}>
          Save Model State
        </button>
        <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.props.actions.loadstate}>
          Load Model State
        </button>
        <button type="button" className="btn btn-success btn-lg btn-block" onClick={this.clickHandler}>
          Test State Change
        </button>
        <FormEntityInit />
      </div>
    );
  }
}
const mapStateToProps = state => ({ store: state });

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch), dispatch: dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
