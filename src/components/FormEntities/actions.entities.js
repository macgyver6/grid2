import { helpers } from '../../helpers';
import { address } from '../../address';
import { drop } from '../../drop';

export const entityActions = {
  mouseDown_handler: (event, props) => {
    event.stopPropagation();
    document.getElementById(
      `${props.model.UUID()}.${props.model.type()}.wrapper`
    ).draggable = true;
    drop.mouseDown_handler(event, props, 'move');
  },

  /** Set dataTransfer in the case the entity is dropped on target:
   * 1. Moving to different form section
   * 2. Deleting a form section
   */
  dragstart_handler: (event, props) => {
    event.stopPropagation();
    console.log(event.target.id);
    helpers.dragStart_handler(event, props.model, props.form, 'move');
  },

  dragOver_handler: (event, props) => {
    event.preventDefault();
  },

  drop_handler: (event, props) => {
    event.stopPropagation();
    console.log(event.dataTransfer.getData('address'));
    drop.drop_handler(event, props);
  },

  dragleave_handler: (event, props) => {
    event.stopPropagation();
    //   console.log(event.target.id)
    // if (event.target.id === `${props.model.UUID()}.${props.model.type()}.wrapper`) {
    //   console.log('event.currentTarget')
    // }
  },

  click_handler: (event, props) => {
    event.stopPropagation();
    // event.target.draggable = true;
    props.temporalStateChange({
      currententity: address.bySample(props.model, props.form)
    });
  }
};
