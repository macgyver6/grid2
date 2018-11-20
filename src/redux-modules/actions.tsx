export enum ActionTypes {
  SETGRIDWIDTH = 'SETGRIDWIDTH',
  SETACTIVETAB = 'SETACTIVETAB',
  RESIZESTART = 'RESIZESTART',
  RESIZEEND = 'RESIZEEND',
  ADDSTART = 'ADDSTART',
  DRAGSTART = 'DRAGSTART',
  ADDEND = 'ADDEND',
  DRAGEND = 'DRAGEND',
  SETDROPTARGET = 'SETDROPTARGET',
  ENTITYSELECTED = 'ENTITYSELECTED',
}

import { utility } from '../lib/utility';
import { EntityTypes } from '../model/types';

interface SetGridWidth {
  type: ActionTypes.SETGRIDWIDTH;
  gridWidth: number;
}

export type TSetGridWidth = typeof setGridWidth;
export const setGridWidth = (gridWidth: number): SetGridWidth => ({
  type: ActionTypes.SETGRIDWIDTH,
  gridWidth,
});

export const entitySelected = (uuid: string) => ({
  type: 'ENTITYSELECTED',
  uuid,
});

interface TargetMetaData {
  append: number;
  initWidth: number;
  type: string;
}

export const resizeStart = (targetMetaData: TargetMetaData, uuid: string) => ({
  type: 'RESIZESTART',
  targetMetaData,
  uuid,
});

export const resizeEnd = (uuid: string) => ({ type: 'RESIZEEND', uuid });

interface ResizeUpdatedProps {
  width: number;
  append: number;
}

export const entityResized = (
  entityUUID: string,
  resizeUpdatedProps: ResizeUpdatedProps
) => ({ type: 'ENTITYRESIZED', entityUUID, resizeUpdatedProps });

export const addStart = (entity: EntityTypes) => ({
  type: 'ADDSTART',
  entity: entity,
});

export const addEnd = (entity: EntityTypes) => ({ type: 'ADDEND', entity });

export const dragStart = (
  targetUUID: string,
  sectionUUID: string,
  metaData: object
) => ({
  type: 'DRAGSTART',
  targetUUID,
  sectionUUID,
  metaData,
});

export const dragEnd = (targetUUID: string) => ({
  type: 'DRAGEND',
  targetUUID,
});

interface SetDropTargetMetaData {
  screenX: number;
}

export const setDropTarget = (
  targetUUID: string,
  sectionUUID: string,
  metaData: SetDropTargetMetaData
) => ({
  type: 'SETDROPTARGET',
  targetUUID,
  sectionUUID,
  metaData,
});

interface SetActiveTab {
  type: ActionTypes.SETACTIVETAB;
  formSectionUUID: string;
}

// export type TSetActiveTab = typeof setActiveTab;
export const setActiveTab = (formSectionUUID: string): SetActiveTab => ({
  type: ActionTypes.SETACTIVETAB,
  formSectionUUID,
});

export const reorderFormTabs = (
  draggedTabUUID: string,
  droppedTabUUID: string
) => ({
  type: 'REORDERFORMTABS',
  draggedTabUUID,
  droppedTabUUID,
});

interface DropMetaData {
  screenX: number;
}

export const drop = (
  targetUUID: string,
  sectionUUID: string,
  metaData: DropMetaData
) => (dispatch: Function, getState: Function) => {
  const {
    app: appState,
    form: {
      byId: {
        [sectionUUID]: { children: siblings },
        [targetUUID]: { type: targetType },
      },
    },
  } = getState();

  const dragDistance = utility.round(
    (metaData.screenX - appState.isDragging.metaData.screenX) /
      appState.gridWidth,
    0
  );

  dispatch(setDropTarget(targetUUID, sectionUUID, metaData));

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
  dropTargetUUID: string,
  dragTargetUUID: string,
  sectionUUID: string,
  dragDistance: number
) => ({
  type: 'REFORMAT',
  dropTargetUUID,
  dragTargetUUID,
  sectionUUID,
  dragDistance,
});

export const move = (
  dragTargetUUID: string,
  dropTargetUUID: string,
  dropSectionUUID: string,
  dragSectionUUID: string
) => ({
  type: 'MOVE',
  dragTargetUUID,
  dropTargetUUID,
  dropSectionUUID,
  dragSectionUUID,
});
