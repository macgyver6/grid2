import * as model from '../model/FormEntities';
import { reformat } from './reformat';
import { move } from './move';
import { reorderTabs } from './reorderTabs';
const test = model.generateEchoInput({});
console.log(test);

const defaultState = {
  byId: {
    1: model.generateFormSection({
      uuid: '1',
      children: ['4', '5'],
      legend: 'First Tab',
    }),
    2: model.generateFormSection({
      uuid: '2',
      children: [],
      legend: 'Second Tab',
    }),
    3: model.generateFormSection({
      uuid: '3',
      children: [],
      legend: 'Third Tab',
    }),
    4: model.generateFormSection({ uuid: '4', children: ['6', '8', '9'] }),
    5: model.generateTextInput({ uuid: '5' }),
    6: model.generateTextInput({ uuid: '6' }),
    7: model.generateTextInput({ uuid: '7' }),
    8: model.generateTextArea({ uuid: '8' }),
    9: model.generateCheckBox({ uuid: '9' }),
    // 2: model.generateTextInput({
    //   uuid: '2',
    //   prePromptWidth: 3,
    //   postPromptWidth: 4,
    //   prePrompt: 'this is a preprompt',
    //   postPrompt: 'this is a postprompt',
    // }),

    // 3: model.generatePadding({ uuid: '3', width: 1 }),
    // 4: model.generateTextInput({ uuid: '4' }),
    // 5: model.generatePadding({ uuid: '5', width: 24 }),
  },
  topLevelIds: ['1', '2', '3'],
};

const reducers: any = {
  ENTITYRESIZED: (state: any, action: any) => {
    // console.log(state, action);

    return {
      ...state,
      [action.entityId]: { ...state[action.entityId], ...action.newProps },
    };
  },
  REFORMAT: (state: any, action: any) => ({
    ...state,
    ...reformat(state, action),
  }),
  MOVE: (state: any, action: any) => ({ ...state, ...move(state, action) }),
  REORDERFORMTABS: (state: any, action: any) => ({
    ...state,
    ...reorderTabs(state, action),
  }),
};
export default function form(state = defaultState, action: any = '') {
  /* tslint:disable */
  const nextReducer = reducers[action.type];

  return nextReducer ? nextReducer(state, action) : state;
}
