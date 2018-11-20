import { EntityTypes } from '../model/types';

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
  type: 'SETGRIDWIDTH';
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
  type: 'SETACTIVETAB';
  formSectionUUID: string;
}
interface ENTITYSELECTED {
  type: 'ENTITYSELECTED';
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

const app = (state: AppState = defaultAppState, action: Actions): AppState => {
  switch (action.type) {
    case 'SETGRIDWIDTH': {
      return { ...state, gridWidth: action.gridWidth };
    }
    case 'RESIZESTART':
      return { ...state, isResizing: true };

    case 'RESIZEEND':
      return { ...state, isResizing: false };
    case 'ADDSTART':
      return { ...state, isAddingInput: action.entity };

    case 'DRAGSTART':
      return {
        ...state,
        isDragging: {
          targetUUID: action.targetUUID,
          sectionUUID: action.sectionUUID,
          metaData: action.metaData,
        },
      };
    case 'ADDEND':
      return { ...state, isAddingInput: false };
    case 'DRAGEND':
      return { ...state, isDragging: false };
    case 'SETDROPTARGET':
      return {
        ...state,
        dropTarget: {
          targetUUID: action.targetUUID,
          sectionUUID: action.sectionUUID,
          metaData: action.metaData,
        },
      };
    case 'SETACTIVETAB': {
      return {
        ...state,
        activeTab: action.formSectionUUID,
      };
    }
    case 'ENTITYSELECTED': {
      return { ...state, activeEntityUUID: action.uuid };
    }
    default:
      return state;
  }
  // const actions = {
  //   default: state,
  //   SETGRIDWIDTH: {return ({ ...state, gridWidth: action.gridWidth })},
  //   RESIZESTART: { ...state, isResizing: true },
  //   RESIZEEND: { ...state, isResizing: false },
  //   ADDSTART: { ...state, isAddingInput: action.entity },
  //   DRAGSTART: {
  //     ...state,
  //     isDragging: {
  //       targetUUID: action.targetUUID,
  //       sectionUUID: action.sectionUUID,
  //       metaData: action.metaData,
  //     },
  //   },
  //   ADDEND: { ...state, isAddingInput: false },
  //   DRAGEND: { ...state, isDragging: false },
  //   SETDROPTARGET: {
  //     ...state,
  //     dropTarget: {
  //       targetUUID: action.targetUUID,
  //       sectionUUID: action.sectionUUID,
  //       metaData: action.metaData,
  //     },
  //   },
  //   SETACTIVETAB: {
  //     ...state,
  //     activeTab: action.formSectionUUID,
  //     activeEntityUUID: null,
  //   },
  //   ENTITYSELECTED: { ...state, activeEntityUUID: action.uuid },
  // };

  // return actions[action.type] || actions.default;
};

export default app;
