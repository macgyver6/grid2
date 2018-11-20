import { EntityTypes } from '../model/types';
import { ActionTypes } from './actions';

const defaultAppState = {
  activeTab: '1',
  activeEntityUUID: null,
  gridWidth: null,
  isResizing: false,
  isDragging: false,
  isAddingInput: false,
  dropTarget: {},
};

interface SETGRIDWIDTH {
  type: ActionTypes.SETGRIDWIDTH;
  gridWidth: number;
}

interface RESIZESTART {
  type: 'RESIZESTART';
  isResizing: boolean;
}

interface RESIZEEND {
  type: 'RESIZEEND';
  isResizing: boolean;
}

interface ADDSTART {
  type: 'ADDSTART';
  entity: EntityTypes;
}

interface DRAGSTART {
  type: 'DRAGSTART';
  targetUUID: string;
  sectionUUID: string;
  metaData: object;
}

interface ADDEND {
  type: 'ADDEND';
  isAddingInput: boolean;
}

interface SETDROPTARGET {
  type: 'SETDROPTARGET';
  targetUUID: string;
  sectionUUID: string;
  metaData: object;
}

interface DRAGEND {
  type: 'DRAGEND';
  isDragging: boolean;
}

interface SETACTIVETAB {
  type: SETACTIVETAB;
  formSectionUUID: string;
}
interface ENTITYSELECTED {
  type: 'ENTITYSELECTED';
  activeEntityUUID: string;
  uuid: string;
  testing: boolean;
}

type Actions =
  | SETGRIDWIDTH
  | RESIZESTART
  | RESIZEEND
  | ADDSTART
  | DRAGSTART
  | ADDEND
  | SETDROPTARGET
  | DRAGEND
  | SETACTIVETAB
  | ENTITYSELECTED;

interface AppState {
  activeTab: string | null;
  activeEntityUUID: string | null;
  gridWidth: number | null;
  isResizing: boolean;
  isDragging: boolean | object;
  isAddingInput: EntityTypes | boolean;
  dropTarget: object;
}

const app = (state: AppState = defaultAppState, action: any): AppState => {
  switch (action.type) {
    case ActionTypes.SETGRIDWIDTH: {
      return { ...state, gridWidth: action.gridWidth };
    }
    case ActionTypes.RESIZESTART:
      return { ...state, isResizing: true };
    case ActionTypes.RESIZEEND:
      return { ...state, isResizing: false };
    case ActionTypes.ADDSTART:
      return { ...state, isAddingInput: action.entity };
    case ActionTypes.DRAGSTART:
      return {
        ...state,
        isDragging: {
          targetUUID: action.targetUUID,
          sectionUUID: action.sectionUUID,
          metaData: action.metaData,
        },
      };
    case ActionTypes.ADDEND:
      return { ...state, isAddingInput: false };
    case ActionTypes.DRAGEND:
      return { ...state, isDragging: false };
    case ActionTypes.SETDROPTARGET:
      return {
        ...state,
      };
    //   case ActionTypes.dropTarget: return {
    // targetUUID: action.targetUUID,
    //   sectionUUID: action.sectionUUID,
    //     metaData: action.metaData,
    //   }

    case ActionTypes.ENTITYSELECTED:
      console.log(action);
      return { ...state, activeEntityUUID: action.uuid };

    case ActionTypes.SETACTIVETAB: {
      return {
        ...state,
        activeTab: action.formSectionUUID,
      };
    }

    default:
      return state;
  }
};

export default app;
