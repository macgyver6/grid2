import * as model from "../model/FormEntities";

export const move = (state, action) => {
  const {
    dragTargetUUID,
    dropTargetUUID,
    dropSectionUUID,
    dragSectionUUID
  } = action;

  // const direction = dragDistance > 0 ? 1 : -1;
  const siblings = state[dropSectionUUID].children;
  const dragTargetIndex = siblings.indexOf(dragTargetUUID);
  const dropTargetIndex = siblings.indexOf(dropTargetUUID);
  const dragSection = state[dragSectionUUID];
  const dragTarget = state[dragTargetUUID];
  const dropTarget = state[dropTargetUUID];

  // const acceptanceCriteria = [
  //   dropTarget.type === 'Padding',
  //   dropTarget.width >= dragTarget.width,
  // ].every(e => e === true);

  const getNewPadding = new model.generatePadding({ width: dragTarget.width });
  const replaceDragTargetWithPadding = () => {
    return Object.assign([], [...dragSection.children], {
      [dragTargetIndex]: getNewPadding.uuid,
      [dropTargetIndex]: dragTarget.uuid,
      [dropTargetIndex + 1]: dropTarget.uuid
    });
  };

  const result = {
    [dragSectionUUID]: {
      ...dragSection,
      children: replaceDragTargetWithPadding()
    },
    [getNewPadding.uuid]: getNewPadding,
    [dropTargetUUID]: {
      ...dropTarget,
      width: dropTarget.width - dragTarget.width
    }
  };

  return result;
};
