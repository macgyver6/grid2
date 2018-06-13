import { helpers } from '../../helpers';
import { address } from '../../address';
import { drop } from '../../drop';

export const entityActions = {
  mouseDown_handler: (event, props) => {
    event.stopPropagation();
    const entity = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`);
    entity.draggable = true;
    drop.mouseDown_handler(event, props, 'move');
  },

  /** Set dataTransfer in the case the entity is dropped on target:
   * 1. Moving to different form section
   * 2. Deleting a form section
   */
  dragstart_handler: (event, props) => {
    event.stopPropagation();
    const entity = document.getElementById(`${props.model.UUID()}.${props.model.type()}.wrapper`);
    // entity.style.border = '';
    // event.dataTransfer.setDragImage(entity, -20, -20);
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
    const prePrompt = document.getElementById(`${props.model.UUID()}.prePrompt`);
    prePrompt.style.boxShadow = '3px 3px blue';
    // prePrompt.style.borderTop = '4px 4px blue';
    // prePrompt.style.borderBottom = '4px 4px blue';
    const inputEntity = document.getElementById(`${props.model.UUID()}.${props.model.type()}`);
    inputEntity.style.boxShadow = '3px 3px blue';
    // inputEntity.style.b = '4px 4px blue';
    // inputEntity.style.borderTop = '4px 4px blue';
    // inputEntity.style.borderBottom = '4px 4px blue';
    props.temporalStateChange({
      currententity: address.bySample(props.model, props.form),
    });
  },
};
