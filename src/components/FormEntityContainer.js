import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Pend from './subentities/Pend';
import Prompt from './subentities/Prompt';
import Wrapper from './Wrapper';
import DraggableCore from './DraggableCore';
import { EntityTypes } from '../model/types';
import {
  entitySelected,
  dragStart,
  dragEnd,
  drop,
} from '../redux-modules/actions';
import { address } from '../lib/address';
import FormEntityFragment from './input_fragments/FormEntityFragment';

class FormEntityContainer extends Component {
  constructor(props) {
    super(props);

    this.dropHandler = this.dropHandler.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  mouseUpHandler(event) {
    this.props.saveProperty({ isResizing: false });
  }

  clickHandler(event) {
    console.log(event.target);
  }

  dropHandler(event) {
    event.stopPropagation();
    this.props.drop(this.props.model.uuid, this.props.sectionUUID, {
      screenX: event.screenX,
    });
  }

  dragOverHandler(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  dragStartHandler = event => {
    const {
      model: { uuid },
      dragStart,
      sectionUUID,
    } = this.props;
    event.stopPropagation();
    dragStart(uuid, sectionUUID, {
      screenX: event.screenX,
    });
  };

  render() {
    return (
      <Wrapper model={this.props.model}>
        {/* {this.props.model.prepend > 0 ? (
          <Pend
            id={this.props.id}
            mode="prepend"
            width={this.props.model['prepend']}
            idStart={helpers.calcStart(this.props.model, 'prepend')}
          />
        ) : null} */}

        <DraggableCore
          active={this.props.active}
          uuid={this.props.model.uuid}
          model={this.props.model}
          isResizing={this.props.isResizing}
          dragStartHandler={this.dragStartHandler}
          entitySelected={this.props.entitySelected}
          // mouseDownHandler={this.mouseDownHandler}
          dropHandler={this.dropHandler}
          // dragEndHandler = {this.props.dragend}
        >
          {'prePromptWidth' in this.props.model &&
          this.props.model.prePromptWidth > 0 ? (
            <Prompt
              id={`${this.props.model.type}.${this.props.model.id}.prePrompt`}
              mode="prePrompt"
              width={this.props.model.prePromptWidth}
              prompt={this.props.model.prePrompt}
              type={this.props.model.type}
              externalIdentifier={this.props.model.externalIdentifier}
              model={this.props.model}
            />
          ) : null}
          <FormEntityFragment
            entityComponent={address.lookupFragment(this.props.model.type)}
            model={this.props.model}
          >
            {this.props.model.type === EntityTypes.FormSection
              ? this.props.children.map(child => (
                  <ConnectedFormEntityContainer
                    key={`${child.id}.${
                      this.props.model.uuid
                    }.renderedFromSection`}
                    id={child.id}
                    sectionUUID={this.props.model.uuid}
                  />
                ))
              : null}
          </FormEntityFragment>

          {'postPromptWidth' in this.props.model &&
          this.props.model.postPromptWidth > 0 ? (
            <Prompt
              id="postPrompt"
              mode="postPrompt"
              width={this.props.model.postPromptWidth}
              prompt={this.props.model.prePrompt}
              type={this.props.model.type}
              externalIdentifier={this.props.model.externalIdentifier}
              model={this.props.model}
            />
          ) : null}
        </DraggableCore>

        {/* {this.props.model.append > 0 ? (
          <Pend
            id={this.props.id}
            mode="append"
            width={this.props.model['append']}
            idStart={helpers.calcStart(this.props.model, 'append')}
            model={this.props}
          />
        ) : null} */}

        {/*lastInRow(entityAddress) ? (
        <AddToEnd
          model={this.props.model}
          form={this.props.form}
          add={this.props.add}
          remove={this.props.remove}
          mutate={this.props.mutate}
          temporalStateChange={this.props.temporalStateChange}
          addToEndAction="insertInPlace"
          appState={this.props.appState}
        />
      ) : null*/}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  model: state.form.byId[ownProps.id],
  ...(state.form.byId[ownProps.id].type === EntityTypes.FormSection
    ? {
        children: state.form.byId[ownProps.id].children.map(child => ({
          id: child,
          type: state.form.byId[child].type,
        })),
      }
    : {}),
  id: ownProps.id,
  active: state.app.activeEntityUUID === ownProps.id,
  // activeEntity: state.app.activeEntity,
  isResizing: state.app.isResizing,
  //   isDragging: state.dnd.isDragging,
});

const ConnectedFormEntityContainer = connect(
  mapStateToProps,
  {
    entitySelected,
    dragStart,
    dragEnd,
    drop,
  }
)(FormEntityContainer);

export default ConnectedFormEntityContainer;
