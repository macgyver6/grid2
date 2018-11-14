import { helpers } from '../lib/helpers';
export const reorderTabs = (state, action) => {
  const { draggedTabUUID, droppedTabUUID } = action;

  const dragIndex = state.topLevelIds.indexOf(draggedTabUUID);
  const dropIndex = state.topLevelIds.indexOf(droppedTabUUID);

  return {
    topLevelIds: helpers.reorderArray(dragIndex, dropIndex, state.topLevelIds),
  };
};
