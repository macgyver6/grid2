import * as model from '../model/FormEntities';
import { utility } from '../lib/utility';
export const setGridWidth = gridWidth => ({
  type: 'SETGRIDWIDTH',
  gridWidth,
});

export const entitySelected = entity => ({
  type: 'ENTITYSELECTED',
  currentEntity: entity,
});

export const resizeStart = resizeTarget => ({
  type: 'RESIZESTART',
  resizeTarget,
});

export const resizeEnd = entity => ({ type: 'RESIZEEND' });

export const entityResized = (entityId, newProps) => ({
  type: 'ENTITYRESIZED',
  entityId,
  newProps,
});

export const addStart = entity => ({
  type: 'ADDSTART',
  entity: model[entity](),
});

export const addEnd = entity => ({
  type: 'ADDEND',
  entity,
});

export const dragStart = (targetUUID, sectionUUID, metaData) => ({
  type: 'DRAGSTART',
  targetUUID,
  sectionUUID,
  metaData,
});

export const dragEnd = entity => ({
  type: 'DRAGEND',
  entity,
});

export const setDropTarget = (targetUUID, sectionUUID) => ({
  type: 'SETDROPTARGET',
  targetUUID,
  sectionUUID,
});

export const setActiveTab = formSectionUUID => ({
  type: 'SETACTIVETAB',
  formSectionUUID,
});
export const reorderFormTabs = (draggedTabUUID, droppedTabUUID) => ({
  type: 'REORDERFORMTABS',
  draggedTabUUID,
  droppedTabUUID,
});

export const drop = (targetUUID, sectionUUID, metaData) => (
  dispatch,
  getState
) => {
  const {
    app: appState,
    form: {
      [sectionUUID]: { children: siblings },
      [targetUUID]: { type: targetType },
    },
  } = getState();

  const dragDistance = utility.round(
    (metaData.screenX - appState.isDragging.metaData.screenX) /
      appState.gridWidth,
    0
  );

  dispatch(setDropTarget({ targetUUID, sectionUUID, metaData }));

  if (
    ((siblings.indexOf(appState.isDragging.targetUUID) ===
      siblings.indexOf(targetUUID) - 1 ||
      siblings.indexOf(appState.isDragging.targetUUID) ===
        siblings.indexOf(targetUUID) + 1) && // are the drag target and drop target next to one another?
      targetType === 'Padding') || // is this a padding?
    targetUUID === appState.isDragging.targetUUID
  ) {
    dispatch(
      reformat(
        targetUUID,
        appState.isDragging.targetUUID,
        sectionUUID,
        dragDistance
      )
    );
  } else if (targetType === 'Padding') {
    dispatch(
      move(
        appState.isDragging.targetUUID,
        targetUUID,
        sectionUUID,
        appState.isDragging.sectionUUID
      )
    );
  }
};

export const reformat = (
  dropTargetUUID,
  dragTargetUUID,
  sectionUUID,
  dragDistance
) => ({
  type: 'REFORMAT',
  dropTargetUUID,
  dragTargetUUID,
  sectionUUID,
  dragDistance,
});

export const move = (
  dragTargetUUID,
  dropTargetUUID,
  dropSectionUUID,
  dragSectionUUID
) => ({
  type: 'MOVE',
  dragTargetUUID,
  dropTargetUUID,
  dropSectionUUID,
  dragSectionUUID,
});
