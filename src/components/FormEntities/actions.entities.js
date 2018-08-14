import { helpers } from '../../helpers';
import { address } from '../../address';
import { drop } from '../../drop';

export const entityActions = {
  mouseDown_handler: (event, props) => {
    event.stopPropagation();
    const entity = document.getElementById(`${props.model.UUID()}.${props.model.type()}.subWrapper`);
    entity.draggable = true;
    drop.mouseDown_handler(event, props, 'move');
  },

  /** Set dataTransfer in the case the entity is dropped on target:
   * 1. Moving to different form section
   * 2. Deleting a form section
   */
  dragstart_handler: (event, props) => {
    event.stopPropagation();
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

  click_handler: (event, props, selected) => {
    event.stopPropagation();
    const prePrompt = document.getElementById(`${props.model.UUID()}.prePrompt`);
    // prePrompt && selected ? (prePrompt.style.boxShadow = '3px 3px blue') : null;
    const postPrompt = document.getElementById(`${props.model.UUID()}.postPrompt`);
    // postPrompt && selected ? (postPrompt.style.boxShadow = '3px 3px blue') : null;
    const inputEntity = document.getElementById(`${props.model.UUID()}.${props.model.type()}`);
    // selected ? (inputEntity.style.boxShadow = '3px 3px blue') : null;
    props.temporalStateChange({
      currententity: address.bySample(props.model, props.form),
    });
  },
};
