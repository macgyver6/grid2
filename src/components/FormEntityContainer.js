import React, { Component } from 'react';
import { connect } from 'react-redux';
// import Pend from './subentities/Pend';
import Prompt from './subentities/Prompt';
import AddToEnd from './subentities/AddToEnd';
import Wrapper from './Wrapper';
import { DraggableCore } from './DraggableCore';
import { EntityTypes } from '../model/types';
import {
  entitySelected,
  dragStart,
  dragEnd,
  drop,
} from '../redux-modules/actions';
import { address } from '../lib/address';
import FormEntityFragment from './input_fragments/FormEntityFragment';
import { utility } from '../lib/utility';
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
        <DraggableCore uuid={this.props.model.uuid}>
          {React.createElement(address.lookupFragment(this.props.model.type), {
            model: this.props.model,
            sectionUUID: this.props.sectionUUID,
            children:
              this.props.model.type === EntityTypes.FormSection
                ? this.props.children.map(child => (
                    <ConnectedFormEntityContainer
                      key={`${child.id}.${
                        this.props.model.uuid
                      }.renderedFromSection`}
                      id={child.id}
                      sectionUUID={this.props.model.uuid}
                    />
                  ))
                : null,
          })}
        </DraggableCore>
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
  ...(state.app.gridWidth ? { gridWidth: state.app.gridWidth } : 0),
  //   isDragging: state.dnd.isDragging,
  // ...(state.form.byId[ownProps.sectionUUID]
  //   ? { sectionWidth: state.form.byId[ownProps.sectionUUID] }
  //   : {}),
  // ...(ownProps.sectionUUID !== 0 &&
  // utility.lastInRow(
  //   state.form.byId[ownProps.sectionUUID].width,
  //   state.form.byId[ownProps.id],
  //   state.form.byId[ownProps.sectionUUID].children.map(childUUID => ({
  //     id: childUUID,
  //     width: state.form.byId[childUUID].width,
  //   }))
  // )
  //   ? {
  //       lastInRow: true,
  //       parentWidth: state.form.byId[ownProps.sectionUUID].width,
  //     }
  //   : null),
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
